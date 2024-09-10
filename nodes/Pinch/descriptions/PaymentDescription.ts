import type { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment',
				action: 'Get a payment',
			},
			{
				name: 'For Payer',
				value: 'for-payer',
				description: 'Get Payments for Payer',
				action: 'Get payments for payer',
			},
		],
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
	},
];

export const paymentFields: INodeProperties[] = [
	// ----------------------------------
	//          payment: get
	// ----------------------------------
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the payment to retrieve (string identifier starting with pmt_)',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['get'],
			},
		},
	},
	// ----------------------------------
	//          payment: for-payer
	// ----------------------------------
	{
		displayName: 'Payer ID',
		name: 'payerId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the payer to retrieve payment for (string identifier starting with pyr_)',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['for-payer'],
			},
		},
	},
];