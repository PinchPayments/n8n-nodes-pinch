import type {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
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
		url: `https://api.getpinch.com.au/${credentials.environment}/${endpoint}`,
		json: true,
		headers: headers,
	} satisfies IHttpRequestOptions;

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

	return await this.helpers.httpRequestWithAuthentication.call(this, 'pinchApi', options);
};