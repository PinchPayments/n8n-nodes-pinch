import type { INodeProperties } from 'n8n-workflow';

export const payerOperations: INodeProperties[] = [
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
				description: 'Create a payer',
				action: 'Create a payer',
			},
		],
		displayOptions: {
			show: {
				resource: ['payer'],
			},
		},
	},
];