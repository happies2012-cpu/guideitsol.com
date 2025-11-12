# PayPal Integration Guide

This document explains how to set up and configure PayPal integration for the Guidesoft website.

## Prerequisites

1. PayPal Business Account
2. PayPal REST API credentials (Client ID and Secret)
3. PayPal Webhook configuration

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_WEBHOOK_ID="your-paypal-webhook-id"
VITE_PAYPAL_CLIENT_ID="your-paypal-client-id"
```

## PayPal Account Setup

1. Create a PayPal Business Account at https://www.paypal.com/business
2. Navigate to the PayPal Developer Dashboard at https://developer.paypal.com/
3. Create a new application to get your Client ID and Secret
4. Configure webhook settings in your PayPal application dashboard

## Webhook Configuration

The application listens for PayPal webhooks at the endpoint:
`/api/paypal/webhook`

Configure your PayPal webhook to send notifications to:
`https://yourdomain.com/api/paypal/webhook`

Supported webhook events:
- PAYMENT.CAPTURE.COMPLETED
- PAYMENT.CAPTURE.REFUNDED
- PAYMENT.CAPTURE.REVERSED

## Testing PayPal Integration

1. Use PayPal's sandbox environment for testing
2. Create sandbox buyer and seller accounts in the PayPal Developer Dashboard
3. Update your environment variables to use sandbox credentials

## Payment Flow

1. User selects PayPal as payment method
2. PayPal SDK loads and displays payment buttons
3. User completes payment on PayPal
4. Webhook receives payment confirmation
5. Enrollment status is updated in the database
6. User receives confirmation

## Security Considerations

- Always verify webhook signatures in production
- Use HTTPS for all payment-related endpoints
- Store sensitive credentials securely
- Implement proper error handling and logging

## Troubleshooting

Common issues:
1. PayPal SDK not loading - Check Client ID and network connectivity
2. Payment not completing - Verify webhook configuration
3. CORS errors - Ensure proper domain configuration in PayPal dashboard

For more information, refer to the PayPal Developer Documentation:
https://developer.paypal.com/docs/