import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import {
	payerOperations,
	tokenFields,
	tokenOperations,
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
					{
						name: 'Merchant',
						value: 'merchant',
					},
					{
						name: 'Payer',
						value: 'payer',
					},
					{
						name: 'Payment',
						value: 'payment',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Token',
						value: 'token',
					},
					{
						name: 'Transfer',
						value: 'transfer',
					},
				],
				default: 'payment',
			},
			...tokenOperations,
			...tokenFields,
			...payerOperations
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

					// https://docs.getpinch.com.au/reference/save-payer

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
					}
				} else if (resource === 'source') {
					// *********************************************************************
					//                             source
					// *********************************************************************

					// https://stripe.com/docs/api/sources

					// if (operation === 'create') {
					// 	// ----------------------------------
					// 	//         source: create
					// 	// ----------------------------------

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

					// https://stripe.com/docs/api/tokens

					if (operation === 'create') {
						// ----------------------------------
						//          token: create
						// ----------------------------------

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
