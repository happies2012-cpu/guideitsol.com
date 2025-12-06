# Payment Systems Deployment Guide

This guide provides step-by-step instructions for deploying and configuring payment systems (PayU, Razorpay, PayPal) in both development and production environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Development Environment Setup](#development-environment-setup)
3. [Production Environment Setup](#production-environment-setup)
4. [Testing Payment Flows](#testing-payment-flows)
5. [Deployment Process](#deployment-process)
6. [Verification and Monitoring](#verification-and-monitoring)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying payment systems, ensure you have:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **Database** (SQLite for development, PostgreSQL for production)
4. **Domain** with SSL certificate (for production)
5. **Accounts** with payment providers:
   - PayU merchant account
   - Razorpay merchant account
   - PayPal business account

## Development Environment Setup

### 1. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-token-with-at-least-32-characters-long"

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

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Run database migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

### 4. Start Development Servers

```bash
# Start both frontend and backend servers
npm run start:all
```

## Production Environment Setup

### 1. Environment Configuration

Create a `.env.production` file with production credentials:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/guidesoft"

# JWT Configuration
JWT_SECRET="your-production-jwt-token-with-at-least-32-characters-long"

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

# Server Configuration
PORT=3000
NODE_ENV=production

# HTTPS Configuration
FORCE_HTTPS=true

# CORS Configuration
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"

# Production URLs
PRODUCTION_URLS="https://yourdomain.com,https://www.yourdomain.com"

# Frontend URL
FRONTEND_URL="https://yourdomain.com"
```

### 2. Build Application

```bash
# Build for production
npm run build:prod
```

### 3. Start Production Server

```bash
# Start production server
npm run server
```

## Testing Payment Flows

### 1. PayU Testing

Use the following test card details:

- **Card Number**: 5123456789012346
- **Expiry**: 05/2027
- **CVV**: 123
- **Name**: Test
- **OTP**: 123456

Test URLs:
- **Success URL**: `http://localhost:3000/api/payu/success`
- **Failure URL**: `http://localhost:3000/api/payu/failure`

### 2. Razorpay Testing

Use the following test card details:

- **Card Number**: 4111 1111 1111 1111
- **Expiry**: 02/27
- **CVV**: 123
- **Name**: Test

### 3. PayPal Testing

Create sandbox accounts in the PayPal developer portal for testing.

## Deployment Process

### 1. Pre-deployment Checklist

- [ ] Update all environment variables with production credentials
- [ ] Verify webhook URLs are accessible
- [ ] Test all payment methods in sandbox
- [ ] Ensure SSL certificate is installed
- [ ] Verify domain is whitelisted in payment gateway dashboards
- [ ] Update success/failure redirect URLs
- [ ] Test webhook delivery
- [ ] Verify tax and fee calculations
- [ ] Confirm refund process

### 2. Deployment Steps

1. **Build Application**:
   ```bash
   npm run build:prod
   ```

2. **Deploy Files**:
   Deploy the built files to your hosting provider.

3. **Configure Environment**:
   Set up environment variables on your hosting platform.

4. **Start Services**:
   ```bash
   npm run server
   ```

5. **Verify Deployment**:
   Run the payment verification script:
   ```bash
   npm run check:payments
   ```

## Verification and Monitoring

### 1. Automated Verification

Run the payment verification script:

```bash
npm run check:payments
```

This script will:
- Check for environment files
- Validate required variables
- Verify payment gateway configurations

### 2. Manual Verification

1. **Check Logs**:
   Monitor server logs for payment-related activities.

2. **Database Records**:
   Verify payment records are being created and updated correctly.

3. **Webhook Delivery**:
   Check payment gateway dashboards for successful webhook deliveries.

### 3. Monitoring Setup

Set up monitoring for:
- Payment success rates
- Failed payment attempts
- Webhook delivery failures
- API response times

## Troubleshooting

### Common Issues

1. **Payment Gateway Not Loading**
   - Check CSP headers
   - Ensure script sources are allowed
   - Verify environment variables

2. **Hash Verification Failures**
   - Ensure merchant key/salt are correct
   - Match environment between frontend and backend

3. **Webhook Not Firing**
   - Verify URL accessibility
   - Check SSL certificate validity
   - Ensure proper headers are sent

4. **Currency Issues**
   - Ensure currency codes match between frontend and backend
   - Verify supported currencies for each payment gateway

### Debugging Steps

1. **Check Browser Console**
   Look for JavaScript errors related to payment SDKs.

2. **Monitor Network Tab**
   Check for failed API requests to payment endpoints.

3. **Enable Logging**
   Add detailed logging in webhook handlers and payment processing functions.

4. **Use Payment Gateway Dashboards**
   Trace transactions through provider dashboards.

5. **Verify Environment Variables**
   Ensure all required variables are loaded correctly.

### Contact Support

If issues persist:
- PayU Support: support@payu.in
- Razorpay Support: support@razorpay.com
- PayPal Support: https://www.paypal.com/support

For development issues, contact the development team or refer to the official documentation of each payment gateway.