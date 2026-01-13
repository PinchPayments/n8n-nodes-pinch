# n8n-nodes-pinch

This is an n8n community node. It lets you use Pinch Payments in your n8n workflows.

Pinch Payments is a PCI Compliant, Australian payments platform offering automated bank account, direct debit, and credit card payments for standard and repeating payments through a REST API Gateway.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Use the package at `n8n-nodes-pinch`.

## Operations

This package includes two nodes:

### Pinch Node

The main action node for interacting with the Pinch Payments API.

#### Payer Operations

| Operation | Description |
|-----------|-------------|
| **Create** | Create a new payer with full name, email, mobile number, and metadata |
| **Get** | Retrieve a payer by their ID (pyr_*) |
| **List** | List payers with pagination and optional search filter by name or email |

#### Payment Operations

| Operation | Description |
|-----------|-------------|
| **Get** | Retrieve a payment by its ID (pmt_*) |
| **For Payer** | Get all payments associated with a specific payer |

#### Payment Link Operations

| Operation | Description |
|-----------|-------------|
| **Create** | Create a payment link with amount, description, return URL, allowed payment methods (credit card/bank account), optional surcharging, currency, and expiry date |
| **Get** | Retrieve a payment link by its ID (plk_*) |
| **Get All** | List all payment links with pagination |
| **Get By Payer** | List payment links for a specific payer with pagination |

### Pinch Trigger Node

A webhook trigger node that listens for real-time events from Pinch.

| Event | Description |
|-------|-------------|
| **All** | Listen to all event types |
| **Payer Created** | Triggered when a new payer record is created |
| **Payer Updated** | Triggered when a payer record is updated |
| **Subscription Created** | Triggered when a subscription is created for a payer |
| **Subscription Cancelled** | Triggered when a subscription is cancelled |
| **Subscription Complete** | Triggered when a subscription runs to completion |
| **Payment Created** | Triggered when a payment is created (via API or subscription) |
| **Realtime Payment** | Triggered when a realtime payment is executed |
| **Scheduled Process** | Triggered when scheduled payments are processed (daily on business days) |
| **Bank Results** | Triggered when bank account transactions return (may include dishonour status) |
| **Transfer** | Triggered when a transfer is created to settle funds to a merchant |
| **Refund Created** | Triggered when a refund is created |
| **Refund Updated** | Triggered when a refund status is updated |
| **Dispute Created** | Triggered when a dispute is created |
| **Dispute Updated** | Triggered when a dispute is updated |
| **Compliance Updated** | Triggered when merchant compliance information changes (e.g., bank account update, document upload) |

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

### Using the Pinch Node

1. Add the **Pinch** node to your workflow
2. Select a resource (Payer, Payment, or Payment Link)
3. Choose the operation you want to perform
4. Fill in the required fields
5. Execute the workflow

### Using the Pinch Trigger Node

1. Add the **Pinch Trigger** node as the starting node of your workflow
2. Select the events you want to listen for (or choose "All" for all events)
3. Activate the workflow - this will automatically register a webhook with Pinch
4. When events occur in Pinch, your workflow will be triggered with the event data

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Pinch API Docs](https://docs.getpinch.com.au)
* [Pinch Developer Pricing](https://getpinch.com.au/features/payments-api-for-developers#pricing)

## Development

- Open folder in VS Code devcontainer
- Make code changes
- Run `npm run dev` to run locally (will start up an n8n instance with custom nodes installed)
- Run `npm run build` to build package
- Publish to npm with `npm run releaseit` (required npm auth)

## Version history

* v0.2.0 - Added support for Payment Links
* v0.1.0 - First release of the Pinch node with the webhook trigger node and the credentials.
