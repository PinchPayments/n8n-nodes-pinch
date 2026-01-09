import type { INodeProperties } from 'n8n-workflow';

export const payerOperations: INodeProperties[] = [
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
				description: 'Create a payer',
				action: 'Create a payer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payer',
				action: 'Get a payer',
			},
		],
		displayOptions: {
			show: {
				resource: ['payer'],
			},
		},
	},
];

export const payerFields: INodeProperties[] = [
	// ----------------------------------
	//          payer: get
	// ----------------------------------
	{
		displayName: 'Payer ID',
		name: 'payerId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the payer to retrieve (string identifier starting with pyr_)',
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['get'],
			},
		},
	},
	// ----------------------------------
	//          payer: create
	// ----------------------------------
	{
		displayName: 'Full Name',
		name: 'fullName',
		type: 'string',
		required: true,
		default: '',
		description: 'Full name or business name of the payer to create',
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'emailAddress',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		description: 'Email of the payer to create',
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Mobile Number',
		name: 'mobileNumber',
		type: 'string',
		default: '',
		description: 'Mobile Number of the payer to create',
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Metadata',
		name: 'metadata',
		type: 'string',
		default: '',
		description: 'Additional Metadata to provide with the Payer',
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['create'],
			},
		},
	}
];