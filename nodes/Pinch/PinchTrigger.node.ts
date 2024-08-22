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
						description: 'Occurs whenever a new Payer is created',
					},
					{
						name: 'Payer Updated',
						value: 'payer-updated',
						description: 'Occurs whenever a Payer record is updated',
					},
					{
						name: 'Subscription Complete',
						value: 'subscription-complete',
						description: 'Occurs whenever a Subscription is completed',
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
						delete webhookData.webhookEvents;
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

				const endpoint = '/webhook_endpoints';

				const body = {
					uri: webhookUrl,
					//description: webhookDescription,
					//enabled_events: events,
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
					responseData.status !== 'enabled'
				) {
					// Required data is missing so was not successful
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Stripe webhook creation response did not contain the expected data.',
					});
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;
				webhookData.webhookEvents = events;
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
					delete webhookData.webhookEvents;
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
