import type { INodeProperties } from 'n8n-workflow';

export const payerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		options: [
			// {
			// 	name: 'Create',
			// 	value: 'create',
			// 	description: 'Create a payer',
			// 	action: 'Create a payer',
			// },
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
];