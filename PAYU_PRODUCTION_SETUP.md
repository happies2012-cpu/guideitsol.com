# PayU Production Setup Guide

This document provides instructions for setting up PayU payments in production for your application.

## 1. Prerequisites

Before going live with PayU payments, ensure you have:

1. A verified PayU merchant account
2. Production Merchant Key and Salt
3. SSL certificate for your domain
4. Whitelisted IP addresses (if required)
5. Approved business category

## 2. Environment Configuration

Update your environment variables in `.env.production`:

```env
# PayU Production Configuration
PAYU_MERCHANT_KEY="your-production-merchant-key"
PAYU_MERCHANT_SALT="your-production-merchant-salt"
VITE_PAYU_MERCHANT_KEY="your-production-merchant-key"
VITE_PAYU_PAYMENT_URL="https://secure.payu.in/_payment"
```

## 3. Payment URLs

Ensure your success and failure URLs are correctly configured:

- Success URL: `https://yourdomain.com/api/payu/success`
- Failure URL: `https://yourdomain.com/api/payu/failure`

These URLs must be accessible from the internet and should be registered in your PayU dashboard.

## 4. Webhook Configuration

Set up webhooks in your PayU dashboard for real-time payment notifications:

- Webhook URL: `https://yourdomain.com/api/payu/webhook`
- Events to subscribe: Payment Success, Payment Failure, Refunds, Chargebacks

## 5. Security Considerations

1. **Hash Validation**: Always validate payment responses using the provided hash
2. **IP Whitelisting**: Restrict access to webhook endpoints
3. **HTTPS**: Ensure all payment pages are served over HTTPS
4. **CORS**: Configure CORS policies appropriately

## 6. Testing Before Go-Live

1. Perform test transactions using PayU's test environment
2. Verify success and failure flows
3. Test webhook notifications
4. Validate hash generation and verification
5. Check email notifications
6. Confirm settlement processes

## 7. Monitoring and Logging

Implement proper logging for:

1. Payment initiation
2. Success/failure responses
3. Webhook notifications
4. Hash verification results
5. Error conditions

## 8. Customer Support

Ensure your support team is trained on:

1. Common payment issues
2. Refund processes
3. Chargeback handling
4. PayU dashboard navigation

## 9. Compliance

1. Ensure PCI DSS compliance
2. Implement proper data protection measures
3. Follow RBI guidelines for payment processing
4. Maintain transaction records as per regulatory requirements

## 10. Troubleshooting

Common issues and solutions:

1. **Hash Mismatch**: Verify salt and key values
2. **CORS Errors**: Check domain whitelisting
3. **Webhook Failures**: Verify endpoint accessibility
4. **Payment Page Errors**: Check merchant account status

## Support Contacts

- Merchant Support: merchantsupport@payu.in
- Technical Support: techsupport@payu.in
- Phone: +91-124-445-4567
- Support Portal: https://support.payu.in

## Documentation

- [PayU Integration Documentation](https://developer.payu.com)
- [API Reference](https://developer.payu.com/docs/api-reference)
- [Security Guidelines](https://developer.payu.com/docs/security)