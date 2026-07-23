import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	payerFields,
	payerOperations,
	paymentOperations,
	paymentFields,
	// tokenFields,
	// tokenOperations,
	paymentLinkFields,
	paymentLinkOperations
} from './descriptions';

import { pinchApiRequest } from './helpers';

export class Pinch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pinch',
		name: 'pinch',
		icon: 'file:pinchNode.svg',
		group: [],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Node for interacting with the Pinch Payments API',
		documentationUrl: 'https://docs.getpinch.com.au/', // TODO: add n8n docs page
		defaults: {
			name: 'Pinch',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials:[
			{
				name: 'pinchApi',
				required: true,
			}
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					// {
					// 	name: 'Merchant',
					// 	value: 'merchant',
					// },
					{
						name: 'Payer',
						value: 'payer',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Payment Link',
						value: 'payment-link',
					},
					// {
					// 	name: 'Source',
					// 	value: 'source',
					// },
					// {
					// 	name: 'Subscription',
					// 	value: 'subscription',
					// },
					// {
					// 	name: 'Token',
					// 	value: 'token',
					// },
					// {
					// 	name: 'Transfer',
					// 	value: 'transfer',
					// },
				],
				default: 'payment-link',
			},
			// ...tokenOperations,
			// ...tokenFields,
			...payerOperations,
			...payerFields,
			...paymentOperations,
			...paymentFields,
			...paymentLinkOperations,
			...paymentLinkFields
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		let responseData;
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'payer') {
					// *********************************************************************
					//                             payer
					// *********************************************************************

					// https://docs.getpinch.com.au/reference/get-payer

					if (operation === 'get') {
						// ----------------------------------
						//          payer: get
						// ----------------------------------

						const payerId = this.getNodeParameter('payerId', i);
						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payers/${payerId}`,
							{},
							{},
						);
					} else if (operation === 'list') {
						// ----------------------------------
						//          payer: list
						// ----------------------------------
						
						const qs = {} as IDataObject;

						qs.page = this.getNodeParameter('page', i);
						qs.pageSize = this.getNodeParameter('pageSize', i);
						qs.filter = this.getNodeParameter('filter', i);

						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payers`,
							{},
							qs,
						);
					} else if (operation == 'create') {
						// ----------------------------------
						//          payer: create
						// ----------------------------------
						const body = {
							fullName: this.getNodeParameter('fullName', i),
							emailAddress: this.getNodeParameter('emailAddress', i),
							mobileNumber: this.getNodeParameter('mobileNumber', i),
							metadata: this.getNodeParameter('metadata', i),
						} as IDataObject;

						responseData = await pinchApiRequest.call(
							this,
							'POST',
							'/payers/',
							body,
							{},
						);
					}
				} else if (resource === 'payment') {
					// *********************************************************************
					//                             payment
					// *********************************************************************
					
					if (operation === 'get') {
						// ----------------------------------
						//          payment: get
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/get-payment

						const paymentId = this.getNodeParameter('paymentId', i);
						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payments/${paymentId}`,
							{},
							{},
						);
					} else if (operation === 'for-payer') {
						// ----------------------------------
						//          payment: for-payer
						// ----------------------------------

						const payerId = this.getNodeParameter('payerId', i);
						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payments/payer/${payerId}`,
							{},
							{},
						);
					}
				} else if (resource === 'source') {
					// *********************************************************************
					//                             source
					// *********************************************************************

					// if (operation === 'create') {
					// 	// ----------------------------------
					// 	//         source: create
					// 	// ----------------------------------
					// https://docs.getpinch.com.au/reference/create-payment-source

					// 	const customerId = this.getNodeParameter('customerId', i);

					// 	const body = {
					// 		type: this.getNodeParameter('type', i),
					// 		amount: this.getNodeParameter('amount', i),
					// 		currency: this.getNodeParameter('currency', i),
					// 	} as IDataObject;

					// 	const additionalFields = this.getNodeParameter('additionalFields', i);

					// 	if (!isEmpty(additionalFields)) {
					// 		Object.assign(body, adjustMetadata(additionalFields));
					// 	}

					// 	responseData = await pinchApiRequest.call(this, 'POST', '/sources', body, {});

					// 	// attach source to customer
					// 	const endpoint = `/customers/${customerId}/sources`;
					// 	await pinchApiRequest.call(this, 'POST', endpoint, { source: responseData.id }, {});
					// } else if (operation === 'delete') {
					// 	// ----------------------------------
					// 	//          source: delete
					// 	// ----------------------------------

					// 	const sourceId = this.getNodeParameter('sourceId', i);
					// 	const customerId = this.getNodeParameter('customerId', i);
					// 	const endpoint = `/customers/${customerId}/sources/${sourceId}`;
					// 	responseData = await pinchApiRequest.call(this, 'DELETE', endpoint, {}, {});
					// } else if (operation === 'get') {
					// 	// ----------------------------------
					// 	//          source: get
					// 	// ----------------------------------

					// 	const sourceId = this.getNodeParameter('sourceId', i);
					// 	responseData = await pinchApiRequest.call(this, 'GET', `/sources/${sourceId}`, {}, {});
					// }
				} else if (resource === 'token') {
					// *********************************************************************
					//                             token
					// *********************************************************************

					if (operation === 'create') {
						// ----------------------------------
						//          token: create
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/tokenise

						const type = this.getNodeParameter('type', i);
						const body = {} as IDataObject;

						if (type !== 'cardToken') {
							throw new NodeOperationError(
								this.getNode(),
								'Only card token creation implemented.',
								{ itemIndex: i },
							);
						}

						body.card = {
							number: this.getNodeParameter('number', i),
							exp_month: this.getNodeParameter('expirationMonth', i),
							exp_year: this.getNodeParameter('expirationYear', i),
							cvc: this.getNodeParameter('cvc', i),
						};

						responseData = await pinchApiRequest.call(this, 'POST', '/tokens', body, {});
					}
				} else if (resource === 'payment-link') {
					// *********************************************************************
					//                             payment-link
					// *********************************************************************
					if (operation === 'create') {
						// ----------------------------------
						//          payment-link: create
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/create-payment-link
						
						const body = {
							amount: this.getNodeParameter('amount', i),
							payerId: this.getNodeParameter('payerId', i),
							description: this.getNodeParameter('description', i),
							returnUrl: this.getNodeParameter('returnUrl', i),
							currency: this.getNodeParameter('currency', i),
							linkExpiryDate: this.getNodeParameter('linkExpiryDate', i),
							allowedPaymentMethods: this.getNodeParameter('allowedPaymentMethods', i),
							surchargedPaymentMethods: this.getNodeParameter('surchargedPaymentMethods', i),
							metadata: this.getNodeParameter('metadata', i),
						} as IDataObject;

						responseData = await pinchApiRequest.call(this, 'POST', '/payment-links', body, {});
					}
					else if (operation === 'get') {
						// ----------------------------------
						//          payment-links: get
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/get-payment-link

						const paymentLinkId = this.getNodeParameter('paymentLinkId', i);
						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payment-links/${paymentLinkId}`,
							{},
							{},
						);
					}
					else if (operation === 'get-all') {
						// ----------------------------------
						//          payment-links: get-all
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/get-payment-links
						const qs = {} as IDataObject;

						qs.page = this.getNodeParameter('page', i);
						qs.pageSize = this.getNodeParameter('pageSize', i);

						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payment-links`,
							{},
							qs,
						);
					}
					else if (operation === 'get-by-payer') {
						// ----------------------------------
						//          payment-links: get-by-payer
						// ----------------------------------
						// https://docs.getpinch.com.au/reference/get-payment-links-by-payer
						const qs = {} as IDataObject;

						qs.page = this.getNodeParameter('page', i);
						qs.pageSize = this.getNodeParameter('pageSize', i);

						const payerId = this.getNodeParameter('payerId', i);
						responseData = await pinchApiRequest.call(
							this,
							'GET',
							`/payment-links/payer/${payerId}`,
							{},
							qs,
						);
					}
				}
			} catch (error) {
				if (this.continueOnFail(error)) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}

				throw error;
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData as IDataObject[]),
				{ itemData: { item: i } },
			);

			returnData.push(...executionData);
		}

		return [returnData];
	}
}
