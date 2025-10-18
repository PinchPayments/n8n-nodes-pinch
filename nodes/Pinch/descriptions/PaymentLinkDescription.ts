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
			},
			{
				name: 'Get All',
				value: 'get-all',
				description: 'Get payment Links',
				action: 'Get payment links',
			},
			{
				name: 'Get By Payer',
				value: 'get-by-payer',
				description: 'Get payment Links by Payer',
				action: 'Get payment links by Payer',
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
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: '',
		description: 'The Amount (in cents) of the payment link to create',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
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
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		default: '',
		description: 'The description of the payment to be made, this will be shown on the payment link page',
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
	},
	// ----------------------------------
	//          payment-link: get-by-payer
	// ----------------------------------
	{
		displayName: 'Payer ID',
		name: 'payerId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the Payer to get the list of Payment Links for (string identifier starting with pyr_)',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get-by-payer'],
			},
		},
	}
];