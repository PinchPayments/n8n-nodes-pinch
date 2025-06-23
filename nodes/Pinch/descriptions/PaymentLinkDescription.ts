import type { INodeProperties } from 'n8n-workflow';

export const paymentLinkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a payment Link',
				action: 'Create a payment link',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment Link',
				action: 'Get a payment link',
			}
		],
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
	},
];

export const paymentLinkFields: INodeProperties[] = [
	// ----------------------------------
	//          payment-link: create
	// ----------------------------------
	{
		displayName: 'Payer ID',
		name: 'payerId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the payer to create a Payment Link for',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
	// ----------------------------------
	//          payment-link: get
	// ----------------------------------
	{
		displayName: 'Payment Link ID',
		name: 'paymentLinkId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the payment link to retrieve (string identifier starting with plk_)',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get'],
			},
		},
	}
];