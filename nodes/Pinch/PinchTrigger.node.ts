import type {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { pinchApiRequest } from './helpers';

export class PinchTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pinch Trigger',
		name: 'pinchTrigger',
		icon: 'file:pinchNode.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle Pinch events via webhooks',
		documentationUrl: 'https://docs.getpinch.com.au/docs/events', // TODO: add n8n docs page
		defaults: {
			name: 'Pinch Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'pinchApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'The event(s) to listen to',
				// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
				options: [
					{
						name: 'All',
						value: 'all',
						description: 'Any time any type of event is triggered',
					},
					{
						name: 'Payer Created',
						value: 'payer-created',
						description: 'Occurs whenever a new Payer record is created',
					},
					{
						name: 'Payer Updated',
						value: 'payer-updated',
						description: 'Occurs whenever a Payer record is updated',
					},
					{
						name: 'Subscription Cancelled',
						value: 'subscription-cancelled',
						description: 'Occurs whenever a Subscription is cancelled',
					},
					{
						name: 'Subscription Created',
						value: 'subscription-created',
						description: 'Occurs whenever a Subscription is created for a Payer',
					},
					{
						name: 'Subscription Complete',
						value: 'subscription-complete',
						description: 'Occurs whenever a Subscription is run to completion',
					},
					{
						name: 'Bank Results',
						value: 'bank-results',
						description: 'Occurs whenever a bank account transaction return (as these take time to process) and could result in a dishonour status',
					},
					{
						name: 'Scheduled Process',
						value: 'scheduled-process',
						description: 'Occurs whenever scheduled Payments are processed (daily on business days)',
					},
					{
						name: 'Transfer',
						value: 'transfer',
						description: 'Occurs whenever a transfer is created to settle funds to a Merchant',
					},
					{
						name: 'Realtime Payment',
						value: 'realtime-payment',
						description: 'Occurs whenever a realtime payment is executed',
					},
					{
						name: 'Payment Link Attempted',
						value: 'payment-link-attempted',
						description: "Occurs when a customer attempts to pay a payment link, both approved and declined"
					},
					{
						name: 'Payment Created',
						value: 'payment-created',
						description: 'Occurs whenever a Payment is created in Pinch. This could be done through the Save Payment endpoint or when a Subscription creates its payments.',
					},
					{
						name: 'Refund Created',
						value: 'refund-created',
						description: 'Occurs whenever a Refund is created',
					},
					{
						name: 'Refund Updated',
						value: 'refund-updated',
						description: 'Occurs whenever a Refund is updated (such as when the refund status gets updated through its processing)',
					},
					{
						name: 'Compliance Updated',
						value: 'compliance-updated',
						description: 'Occurs whenever a Merchant record is updated that will result in a compliance check (such as updating a Merchants bank account or when a Merchant uploads a document for verification)',
					},
					{
						name: 'Dispute Created',
						value: 'dispute-created',
						description: 'Occurs whenever a Dispute is created',
					},
					{
						name: 'Dispute Updated',
						value: 'dispute-updated',
						description: 'Occurs whenever a Dispute is updated',
					}
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					// No webhook id is set so no webhook can exist
					return false;
				}

				// Webhook got created before so check if it still exists
				const endpoint = `/webhooks/${webhookData.webhookId}`;

				try {
					await pinchApiRequest.call(this, 'GET', endpoint, {});
				} catch (error) {
					if (error.httpCode === '404' || error.message.includes('resource_missing')) {
						// Webhook does not exist
						delete webhookData.webhookId;
						delete webhookData.webhookSecret;

						return false;
					}

					// Some error occured
					throw error;
				}

				// If it did not error then the webhook exists
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');

				//const webhookDescription = `Created by n8n for workflow ID: ${this.getWorkflow().id}`;

				const events = this.getNodeParameter('events', []);

				const endpoint = '/webhooks';

				const body = {
					uri: webhookUrl,
					webhookFormat: 'camel-case',
					//description: webhookDescription,
					eventTypes: events
				};

				let responseData;
				try {
					responseData = await pinchApiRequest.call(this, 'POST', endpoint, body);
				} catch (error) {
					throw error;
				}

				if (
					responseData.id === undefined ||
					responseData.secret === undefined ||
					responseData.uri === undefined
				) {
					// Required data is missing so was not successful
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Pinch webhook creation response did not contain the expected data.',
					});
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;
				webhookData.webhookSecret = responseData.secret as string;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					const endpoint = `/webhooks/${webhookData.webhookId}`;
					const body = {};

					try {
						await pinchApiRequest.call(this, 'DELETE', endpoint, body);
					} catch (error) {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
					delete webhookData.webhookSecret;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const req = this.getRequestObject();

		const events = this.getNodeParameter('events', []) as string[];

		const eventType = bodyData.type as string | undefined;

		if (eventType === undefined || (!events.includes('all') && !events.includes(eventType))) {
			// If not eventType is defined or when one is defined but we are not
			// listening to it do not start the workflow.
			return {};
		}

		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject)],
		};
	}
}
