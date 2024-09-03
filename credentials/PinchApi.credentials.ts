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
    ];

    async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
        const authHeader = 'Basic ' + Buffer.from(credentials.applicationId + ':' + credentials.secret).toString('base64');
        const body: Record<string, string> = {
            grant_type: 'client_credentials',
            scope: 'api1'
        };
        // const formData = new FormData();
        // formData.append('grant_type', 'client_credentials');
        // formData.append('scope', 'api1');
        const { access_token } = (await this.helpers.httpRequest({
            method: 'POST',
            //url: 'https://n8n.dkdevelopment.net:2096/webhook/64da1b6c-ff12-4967-8165-53a0ed67ca6b',
            url: 'https://auth.getpinch.com.au/connect/token',
            body: body,
            // body: {
            //     grant_type: 'client_credentials',
            //     scope: 'api1'
            // },
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
            baseURL: '=https://api.getpinch.com.au/{{$credentials.environment}}/health/auth',
            url: '',
        },
    };
}
