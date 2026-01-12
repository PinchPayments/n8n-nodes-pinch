# n8n-nodes-pinch

This is an n8n community node. It lets you use Pinch Payments in your n8n workflows.

Pinch Payments is a PCI Compliant, Australian payments platform offering automated bank account, direct debit, and credit card payments for standard and repeating payments through a REST API Gateway.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  <!-- delete if no auth needed -->  
[Compatibility](#compatibility)  
[Usage](#usage)  <!-- delete if not using this section -->  
[Resources](#resources)  
[Version history](#version-history)  <!-- delete if not using this section -->  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Use the package at `n8n-nodes-pinch`.

## Operations

_None yet but the credentials can be used to make Rest API calls_

## Credentials

* Add credential in your n8n instance and select **Pinch API**
* Register for a [Pinch Developer Account](https://auth.getpinch.com.au/Register)
* Navigate to the API Keys page
* Create an Application
* Copy Application Id and Secret Key then paste them into n8n credential (Make sure to use the development keys for test API and live keys for live API)
* Click Save (this will test the credentials automatically)

## Compatibility

Tested with v1.57.0 and up but may work in previous versions.

## Usage

Add the Pinch Trigger node to set up webhook events with the Pinch API.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Pinch API Docs](https://docs.getpinch.com.au)
* [Pinch Developer Pricing](https://getpinch.com.au/features/payments-api-for-developers#pricing)

## Development

- Open folder in VS Code devcontainer
- Make code changes
- Run `npm run dev` to run locally (will start up an n8n instance with custom nodes installed)
- Run `npm run build` to build package
- Publish to npm with `npm run releaseit`

## Version history

First release of the Pinch node with the webhook trigger node and the credentials.
* v0.2.0 - Added support for Payment Links