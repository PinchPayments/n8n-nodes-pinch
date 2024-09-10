# n8n-nodes-pinch

This is an n8n community node. It lets you use Pinch Payments in your n8n workflows.

Pinch Payments does payments and junk.

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
* Copy Application Id and Secret Key then paste them into n8n credential
* Click Save (this will test the credentials)
* Account connected

## Compatibility

Tested with v1.57.0 and up but may work in previous versions.

## Usage

Add the Pinch Trigger node to set up webhook events with the Pinch API.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Pinch API Docs](https://docs.getpinch.com.au)
* [Pinch Developer Pricing](https://getpinch.com.au/features/payments-api-for-developers#pricing)

## Version history

First release of the Pinch node with the webhook trigger node and the credentials.