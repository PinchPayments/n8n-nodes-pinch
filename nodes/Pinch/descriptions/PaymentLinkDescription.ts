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
				action: 'Get payment links by payer',
			}
		],
		displayOptions: {
			show: {
				resource: ['payment-link'],
			},
		},
	},
];

export const paymentLinkFields: INodeProperties[] = [
	// ----------------------------------
	//          payment-link: create
	// ----------------------------------
	// https://docs.getpinch.com.au/reference/create-payment-link
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
	{
		displayName: 'Return Url',
		name: 'returnUrl',
		type: 'string',
		required: true,
		default: '',
		description: 'URL to redirect the user to once the payment has been completed. Parameters for paymentLinkId and paymentId will be added to redirected URL.',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: '',
		description: 'Currency to take payment in (Will default to Merchant currency if not specified)',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Link Expiry Date',
		name: 'linkExpiryDate',
		type: 'dateTime',
		default: '',
		description: 'DateTime for the Payment Link to expire',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Allowed Payment Methods',
		name: 'allowedPaymentMethods',
		type: 'multiOptions',
		required: true,
		default: ['credit-card'],
		description: 'List of Payment Methods that can be used to take Payment. (Options are `credit-card` and `bank-account`).',
		options: [
			{
				name: 'Credit Card',
				value: 'credit-card',
			},
			{
				name: 'Bank Account',
				value: 'bank-account',
			},
		],
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Surcharged Payment Methods',
		name: 'surchargedPaymentMethods',
		type: 'multiOptions',
		default: [],
		description: 'List of Payment Methods that will have surcharging applied. (Options are `credit-card` and `bank-account`).',
		options: [
			{
				name: 'Credit Card',
				value: 'credit-card',
			},
			{
				name: 'Bank Account',
				value: 'bank-account',
			},
		],
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
	//          payment-link: get-all
	// ----------------------------------
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The current page number to request',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get-all'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: null,
		description: 'How many items to return for each page. Maximum 500.',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get-all'],
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
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'The current page number to request',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get-by-payer'],
			},
		},
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		default: null,
		description: 'How many items to return for each page. Maximum 500.',
		displayOptions: {
			show: {
				resource: ['payment-link'],
				operation: ['get-by-payer'],
			},
		},
	},
];