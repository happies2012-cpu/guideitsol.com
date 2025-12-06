# Payment Integrations Summary

This document provides a comprehensive overview of all payment gateway integrations implemented in the Guidesoft platform, including setup instructions, testing procedures, and deployment guidelines.

## Overview

The Guidesoft platform supports multiple payment gateways to provide flexibility for users:
1. **PayU** - Primary payment gateway for Indian transactions
2. **Razorpay** - Alternative payment gateway for Indian transactions
3. **PayPal** - International payment processing
4. **UPI** - Direct UPI payments for Indian users

## 1. PayU Integration

### Features Implemented
- Server-to-server REST API integration
- Dynamic order creation
- Secure hash generation for transaction verification
- Success/Failure handling
- Webhook notifications
- Sandbox and Production environment support

### Configuration
- **Sandbox URL**: `https://test.payu.in/_payment`
- **Production URL**: `https://secure.payu.in/_payment`
- **Environment Detection**: Automatically switches based on `NODE_ENV`

### Required Environment Variables
```env
PAYU_MERCHANT_KEY="your-merchant-key"
PAYU_MERCHANT_SALT="your-merchant-salt"
VITE_PAYU_MERCHANT_KEY="your-merchant-key"
```

### Testing Credentials
- **Card Number**: 5123456789012346
- **Expiry**: 05/2027
- **CVV**: 123
- **Name**: Test
- **OTP**: 123456

## 2. Razorpay Integration

### Features Implemented
- Checkout.js integration
- Dynamic order creation
- Payment verification
- Test and Live mode support

### Configuration
- **Test Key Prefix**: `rzp_test_`
- **Live Key Prefix**: `rzp_live_`
- **Environment Detection**: Automatically detects based on key prefix

### Required Environment Variables
```env
RAZORPAY_KEY_ID="rzp_test_your_test_key_id"
RAZORPAY_KEY_SECRET="your_test_key_secret"
VITE_RAZORPAY_KEY_ID="rzp_test_your_test_key_id"
```

### Testing Credentials
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: 02/27
- **CVV**: 123
- **Name**: Test

## 3. PayPal Integration

### Features Implemented
- PayPal JavaScript SDK integration
- Order creation and capture
- Webhook handling
- Sandbox and Production environment support

### Configuration
- **Sandbox URL**: `https://api.sandbox.paypal.com`
- **Production URL**: `https://api.paypal.com`
- **Environment Detection**: Automatically switches based on `NODE_ENV`

### Required Environment Variables
```env
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
VITE_PAYPAL_CLIENT_ID="your-paypal-client-id"
```

### Testing
Create sandbox accounts in the PayPal developer portal for testing.

## 4. UPI Integration

### Features Implemented
- QR code generation
- UPI ID display
- Manual payment confirmation
- Clipboard copy functionality

### Configuration
```env
VITE_UPI_ID="8884162999@ybl"
```

## Environment Setup

### Development (.env)
```env
# PayU Test Configuration
PAYU_MERCHANT_KEY="YOUR_PAYU_TEST_MERCHANT_KEY"
PAYU_MERCHANT_SALT="YOUR_PAYU_TEST_MERCHANT_SALT"
VITE_PAYU_MERCHANT_KEY="YOUR_PAYU_TEST_MERCHANT_KEY"

# PayPal Sandbox Configuration
PAYPAL_CLIENT_ID="YOUR_PAYPAL_SANDBOX_CLIENT_ID"
PAYPAL_CLIENT_SECRET="YOUR_PAYPAL_SANDBOX_CLIENT_SECRET"
VITE_PAYPAL_CLIENT_ID="YOUR_PAYPAL_SANDBOX_CLIENT_ID"

# Razorpay Test Configuration
RAZORPAY_KEY_ID="rzp_test_YOUR_TEST_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_TEST_KEY_SECRET"
VITE_RAZORPAY_KEY_ID="rzp_test_YOUR_TEST_KEY_ID"

# UPI Configuration
VITE_UPI_ID="8884162999@ybl"
```

### Production (.env.production)
```env
# PayU Production Configuration
PAYU_MERCHANT_KEY="YOUR_PAYU_PRODUCTION_MERCHANT_KEY"
PAYU_MERCHANT_SALT="YOUR_PAYU_PRODUCTION_MERCHANT_SALT"
VITE_PAYU_MERCHANT_KEY="YOUR_PAYU_PRODUCTION_MERCHANT_KEY"
VITE_PAYU_PAYMENT_URL="https://secure.payu.in/_payment"

# PayPal Production Configuration
PAYPAL_CLIENT_ID="YOUR_PAYPAL_PRODUCTION_CLIENT_ID"
PAYPAL_CLIENT_SECRET="YOUR_PAYPAL_PRODUCTION_CLIENT_SECRET"
VITE_PAYPAL_CLIENT_ID_PROD="YOUR_PAYPAL_PRODUCTION_CLIENT_ID"

# Razorpay Production Configuration
RAZORPAY_KEY_ID="rzp_live_YOUR_LIVE_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_LIVE_KEY_SECRET"
VITE_RAZORPAY_KEY_ID_PROD="rzp_live_YOUR_LIVE_KEY_ID"
```

## Testing Procedures

### Automated Testing
```bash
# Check payment configurations
npm run check:payments

# Test payment systems
npm run test:payments
```

### Manual Testing
1. Start the development server: `npm run start:all`
2. Navigate to any enrollment page
3. Click "Proceed to Payment"
4. Test each payment method with test credentials
5. Verify success/failure handling

## Deployment

### Pre-deployment Checklist
- [ ] Update all environment variables with production credentials
- [ ] Verify webhook URLs are accessible
- [ ] Test all payment methods in sandbox
- [ ] Ensure SSL certificate is installed
- [ ] Verify domain is whitelisted in payment gateway dashboards
- [ ] Update success/failure redirect URLs
- [ ] Test webhook delivery
- [ ] Verify tax and fee calculations

### Deployment Commands
```bash
# Build for production
npm run build:prod

# Deploy payment configurations
npm run deploy:payments

# Test payment systems
npm run test:payments
```

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always validate webhook payloads** using provided signatures
3. **Use HTTPS** for all payment pages
4. **Implement proper CSRF protection**
5. **Sanitize all user inputs**
6. **Store sensitive data encrypted**
7. **Regularly rotate API keys**
8. **Monitor for suspicious activity**

## Troubleshooting

### Common Issues

1. **Payment gateway not loading**
   - Check CSP headers
   - Ensure script sources are allowed
   - Verify environment variables

2. **Hash verification failures**
   - Ensure merchant key/salt are correct
   - Match environment between frontend and backend

3. **Webhook not firing**
   - Verify URL accessibility
   - Check SSL certificate validity
   - Ensure proper headers are sent

### Debugging Steps

1. Check browser console for JavaScript errors
2. Monitor network tab for failed API requests
3. Enable logging in webhook handlers
4. Use payment gateway dashboards to trace transactions
5. Verify environment variables are loaded correctly

## Related Documentation

- [PAYMENT_GATEWAY_SETUP.md](PAYMENT_GATEWAY_SETUP.md) - Detailed setup instructions
- [DEPLOYMENT_PAYMENTS.md](DEPLOYMENT_PAYMENTS.md) - Deployment guide
- [PAYU_PRODUCTION_SETUP.md](PAYU_PRODUCTION_SETUP.md) - PayU specific production setup

For any issues or questions, contact the development team or refer to the official documentation of each payment gateway.