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
		displayName: 'Name',
		name: 'name',
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'fixedCollection',
				description: 'Address of the payer to create',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Details',
						name: 'details',
						values: [
							{
								displayName: 'Line 1',
								name: 'line1',
								description: 'Address line 1 (e.g. street, PO Box, or company name)',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Line 2',
								name: 'line2',
								description: 'Address line 2 (e.g. apartment, suite, unit, or building)',
								type: 'string',
								default: '',
							},
							{
								displayName: 'City',
								name: 'city',
								description: 'City, district, suburb, town, or village',
								type: 'string',
								default: '',
							},
							{
								displayName: 'State',
								name: 'state',
								description: 'State, county, province, or region',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Country',
								name: 'country',
								description:
									'Two-letter country code (<a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2</a>)',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Postal Code',
								name: 'postal_code',
								description: 'ZIP or postal code',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Arbitrary text to describe the payer to create',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email of the payer to create',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'fixedCollection',
				default: {},
				placeholder: 'Add Metadata Item',
				description: 'Set of key-value pairs to attach to the payer to create',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						displayName: 'Metadata Properties',
						name: 'metadataProperties',
						values: [
							{
								displayName: 'Key',
								name: 'key',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Telephone number of the payer to create',
			}
		],
	},
];