import type { INodeProperties } from 'n8n-workflow';

export const tokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'create',
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a token',
				action: 'Create a token',
			},
		],
		displayOptions: {
			show: {
				resource: ['token'],
			},
		},
	},
];

export const tokenFields: INodeProperties[] = [
	// ----------------------------------
	//          token: create
	// ----------------------------------
	{
		displayName: 'Type',
		name: 'sourceType',
		type: 'options',
		required: true,
		default: 'credit-card',
		description: 'Type of token to create',
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
				resource: ['token'],
				operation: ['create'],
			},
		},
	},
	// Card Tokens
	{
		displayName: 'Card Number',
		name: 'cardNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['credit-card'],
			},
		},
		placeholder: '4242424242424242',
		default: '',
	},
	{
		displayName: 'CVC',
		name: 'cvc',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['credit-card'],
			},
		},
		default: '',
		placeholder: '123',
		description: 'Security code printed on the back of the card',
	},
	{
		displayName: 'Expiration Month',
		description: 'Number of the month when the card will expire',
		name: 'expiryMonth',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['credit-card'],
			},
		},
		default: '',
		placeholder: '01',
	},
	{
		displayName: 'Expiration Year',
		description: 'Year when the card will expire',
		name: 'expiryYear',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['credit-card'],
			},
		},
		default: '',
		placeholder: '2024',
	},
	{
		displayName: 'Expiration Month',
		description: 'Number of the month when the card will expire',
		name: 'expirationMonth',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['credit-card'],
			},
		},
		default: '',
		placeholder: '01',
	},
	// Bank Tokens
	{
		displayName: 'Account Name',
		description: 'The name of the bank account',
		name: 'bankAccountName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['bank-account'],
			},
		},
		default: '',
		placeholder: '123123',
	},
	{
		displayName: 'Routing Number',
		description: 'The routing number of the bank account (BSB)',
		name: 'bankAccountRouting',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['bank-account'],
			},
		},
		default: '',
		placeholder: '123123',
	},
	{
		displayName: 'Account Number',
		description: 'The account number of the bank account',
		name: 'bankAccountNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
				sourceType: ['bank-account'],
			},
		},
		default: '',
		placeholder: '123456789',
	},
];
