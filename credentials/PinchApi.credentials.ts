import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

export class PinchApi implements ICredentialType {
	name = 'pinchApi';
	displayName = 'Pinch API';

	httpRequestNode = {
		name: 'Pinch',
		docsUrl: 'https://docs.getpinch.com.au/',
		apiBaseUrlPlaceholder: 'https://api.getpinch.com.au/',
	};

	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Application Id',
			name: 'applicationId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const { access_token } = (await this.helpers.httpRequest({
			method: 'POST',
			url: `https://auth.getpinch.com.au/connect/token`,
			body: {
				grant_type: 'client_credentials',
				scope: 'api1'
			},
			auth: {
				username: credentials.applicationId as string,
				password: credentials.secret as string,
			},
			headers: {
				'Content-Type': 'application/json'
			},
		})) as { access_token: string };
		return { sessionToken: access_token };
	};

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.sessionToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.getpinch.com.au/test/health/auth',
			url: '',
		},
	};
}
