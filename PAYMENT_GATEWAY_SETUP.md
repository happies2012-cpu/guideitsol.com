# Payment Gateway Setup Guide

This document provides instructions for setting up and configuring payment gateways (PayU, Razorpay, PayPal) for both development (sandbox) and production environments.

## 1. Environment Configuration

### 1.1 Development Environment (.env)

For development/testing, use sandbox/test credentials:

```env
# PayPal Sandbox Configuration
PAYPAL_CLIENT_ID="YOUR_PAYPAL_SANDBOX_CLIENT_ID"
PAYPAL_CLIENT_SECRET="YOUR_PAYPAL_SANDBOX_CLIENT_SECRET"
VITE_PAYPAL_CLIENT_ID="YOUR_PAYPAL_SANDBOX_CLIENT_ID"

# PayU Test Configuration
PAYU_MERCHANT_KEY="YOUR_PAYU_TEST_MERCHANT_KEY"
PAYU_MERCHANT_SALT="YOUR_PAYU_TEST_MERCHANT_SALT"
PAYU_AUTH_HEADER="YOUR_PAYU_TEST_AUTH_HEADER"
VITE_PAYU_MERCHANT_KEY="YOUR_PAYU_TEST_MERCHANT_KEY"

# Razorpay Test Configuration
RAZORPAY_KEY_ID="rzp_test_YOUR_TEST_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_TEST_KEY_SECRET"
VITE_RAZORPAY_KEY_ID="rzp_test_YOUR_TEST_KEY_ID"
```

### 1.2 Production Environment (.env.production)

For production, use live credentials:

```env
# PayPal Production Configuration
PAYPAL_CLIENT_ID="YOUR_PAYPAL_PRODUCTION_CLIENT_ID"
PAYPAL_CLIENT_SECRET="YOUR_PAYPAL_PRODUCTION_CLIENT_SECRET"
VITE_PAYPAL_CLIENT_ID_PROD="YOUR_PAYPAL_PRODUCTION_CLIENT_ID"

# PayU Production Configuration
PAYU_MERCHANT_KEY="YOUR_PAYU_PRODUCTION_MERCHANT_KEY"
PAYU_MERCHANT_SALT="YOUR_PAYU_PRODUCTION_MERCHANT_SALT"
PAYU_AUTH_HEADER="YOUR_PAYU_PRODUCTION_AUTH_HEADER"
VITE_PAYU_MERCHANT_KEY="YOUR_PAYU_PRODUCTION_MERCHANT_KEY"
VITE_PAYU_PAYMENT_URL="https://secure.payu.in/_payment"

# Razorpay Production Configuration
RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_LIVE_KEY_SECRET"
VITE_RAZORPAY_KEY_ID_PROD="rzp_live_YOUR_LIVE_KEY_ID"
```

## 2. PayU Integration

### 2.1 Obtaining Test Credentials

1. Visit [PayU Test Portal](https://test.payu.in/)
2. Register for a test merchant account
3. Navigate to "Manage Account" > "My Account" > "Merchant Key - Salt"
4. Note down your:
   - Merchant Key
   - Merchant Salt

### 2.2 Obtaining Production Credentials

1. Visit [PayU India Portal](https://in.payu.com/)
2. Register for a merchant account
3. Complete the KYC process
4. Navigate to "Manage Account" > "My Account" > "Merchant Key - Salt"
5. Note down your:
   - Merchant Key
   - Merchant Salt

### 2.3 Webhook Configuration

Register the following URLs in your PayU dashboard:

- **Success URL**: `https://yourdomain.com/api/payu/success`
- **Failure URL**: `https://yourdomain.com/api/payu/failure`
- **Webhook URL**: `https://yourdomain.com/api/payu/webhook`

## 3. Razorpay Integration

### 3.1 Obtaining Test Credentials

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Register for a test account
3. Navigate to "Settings" > "API Keys"
4. Generate a new key pair:
   - Key ID (starts with `rzp_test_`)
   - Key Secret

### 3.2 Obtaining Production Credentials

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Upgrade to a live account
3. Navigate to "Settings" > "API Keys"
4. Generate a new key pair:
   - Key ID (starts with `rzp_live_`)
   - Key Secret

### 3.3 Webhook Configuration

Register the following URL in your Razorpay dashboard:

- **Webhook URL**: `https://yourdomain.com/api/ai-enrollments/razorpay-webhook`
- **Events**: Select all payment events

## 4. PayPal Integration

### 4.1 Obtaining Sandbox Credentials

1. Visit [PayPal Developer Portal](https://developer.paypal.com/)
2. Create a sandbox business account
3. Navigate to "My Apps & Credentials"
4. Create a new REST API app
5. Note down your:
   - Client ID
   - Secret

### 4.2 Obtaining Production Credentials

1. Visit [PayPal Business Portal](https://www.paypal.com/businessprofile/mytools/apiaccess/firstparty)
2. Request API credentials
3. Note down your:
   - Client ID
   - Secret

### 4.3 Webhook Configuration

Register the following URL in your PayPal dashboard:

- **Webhook URL**: `https://yourdomain.com/api/paypal/webhook`

## 5. Testing Payments

### 5.1 PayU Test Cards

Use the following test card details for PayU:

- **Card Number**: 5123456789012346
- **Expiry**: 05/2027
- **CVV**: 123
- **Name**: Test
- **OTP**: 123456

### 5.2 Razorpay Test Cards

Use the following test card details for Razorpay:

- **Card Number**: 4111 1111 1111 1111
- **Expiry**: 02/27
- **CVV**: 123
- **Name**: Test

### 5.3 PayPal Sandbox Accounts

Create sandbox accounts in the PayPal developer portal for testing.

## 6. Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables with production credentials
- [ ] Verify webhook URLs are accessible
- [ ] Test all payment methods in sandbox
- [ ] Ensure SSL certificate is installed
- [ ] Verify domain is whitelisted in payment gateway dashboards
- [ ] Update success/failure redirect URLs
- [ ] Test webhook delivery
- [ ] Verify tax and fee calculations
- [ ] Confirm refund process

## 7. Troubleshooting

### 7.1 Common Issues

1. **Payment gateway not loading**: Check CSP headers and ensure script sources are allowed
2. **Hash verification failures**: Ensure merchant key/salt are correct and match environment
3. **Webhook not firing**: Verify URL accessibility and SSL certificate validity
4. **Currency issues**: Ensure currency codes match between frontend and backend

### 7.2 Debugging Tips

1. Check browser console for JavaScript errors
2. Monitor network tab for failed API requests
3. Enable logging in webhook handlers
4. Use payment gateway dashboards to trace transactions
5. Verify environment variables are loaded correctly

## 8. Security Best Practices

1. Never expose secret keys in frontend code
2. Always validate webhook payloads
3. Use HTTPS for all payment pages
4. Implement proper CSRF protection
5. Sanitize all user inputs
6. Store sensitive data encrypted
7. Regularly rotate API keys
8. Monitor for suspicious activity

For any issues or questions, contact the development team or refer to the official documentation of each payment gateway.