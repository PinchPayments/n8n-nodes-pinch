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
        {
            displayName: 'Environment',
            name: 'environment',
            type: 'options',
            options: [
                {
                    name: 'Live',
                    value: 'live',
                },
                {
                    name: 'Test',
                    value: 'test',
                }
            ],
            default: 'live',
        },
        {
            displayName: 'Advanced Options',
            name:'showAdvancedOptions',
            type: 'boolean',
            default: false
        },
        {
            displayName: 'Auth Base Url',
            name: 'authBaseUrl',
            type: 'string',
            default: 'https://auth.getpinch.com.au',
            displayOptions: {
                show: {
                    showAdvancedOptions: [true]
                }
            }
        },
        {
            displayName: 'API Base Url',
            name: 'apiBaseUrl',
            type: 'string',
            default: 'https://api.getpinch.com.au',
            displayOptions: {
                show: {
                    showAdvancedOptions: [true]
                }
            }
        },
    ];

    async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
        const authHeader = 'Basic ' + Buffer.from(credentials.applicationId + ':' + credentials.secret).toString('base64');
        const body: Record<string, string> = {
            grant_type: 'client_credentials',
            scope: 'api1'
        };
        const authBaseUrl = credentials.authBaseUrl ?? 'https://auth.getpinch.com.au';
        const { access_token } = (await this.helpers.httpRequest({
            method: 'POST',
            url: `${authBaseUrl}/connect/token`,
            body: body,
            json: false,
            headers: {
                'Authorization': authHeader,
                'Content-Type':'application/x-www-form-urlencoded'
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
            baseURL: '={{$credentials.apiBaseUrl ?? \'https://api.getpinch.com.au\'}}/{{$credentials.environment}}/health/auth',
            url: '',
        },
    };
}
