import type {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';

/**
 * Make an API request to Pinch
 *
 */
export async function pinchApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject,
	query?: IDataObject,
	headers?: IDataObject,
) {
	const credentials = await this.getCredentials('pinchApi');

	const options = {
		method,
		body: body,
		qs: query,
		//uri: 'https://n8n.dkdevelopment.net:2096/webhook/64da1b6c-ff12-4967-8165-53a0ed67ca6b',
		uri: `https://api.getpinch.com.au/${credentials.environment}/${endpoint}`,
		json: true,
		headers: headers,
	} satisfies IRequestOptions;

	if (options.qs && Object.keys(options.qs).length === 0) {
		delete options.qs;
	}

	if (!options.headers) {
		options.headers = {};
	}

	// Set the version header for all requests
	options.headers['pinch-version'] = "2020.1";

	if (!options.headers['Content-Type']) {
		options.headers['Content-Type'] = 'application/json';
	}

	return await this.helpers.requestWithAuthentication.call(this, 'pinchApi', options);
}