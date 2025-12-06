# Production Deployment Checklist

This checklist guides you through the final steps to deploy the Guidesoft platform with payment systems in production.

## 1. Obtain Production Credentials

### PayU
- [ ] Register for a PayU merchant account at [https://in.payu.com/](https://in.payu.com/)
- [ ] Complete KYC verification process
- [ ] Obtain Production Merchant Key and Salt from "Manage Account" > "My Account" > "Merchant Key - Salt"
- [ ] Note down Auth Header if required

### Razorpay
- [ ] Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [ ] Upgrade to a live account if needed
- [ ] Navigate to "Settings" > "API Keys"
- [ ] Generate a new key pair:
  - Key ID (starts with `rzp_live_`)
  - Key Secret

### PayPal
- [ ] Visit [PayPal Business Portal](https://www.paypal.com/businessprofile/mytools/apiaccess/firstparty)
- [ ] Request API credentials
- [ ] Note down:
  - Client ID
  - Secret

## 2. Update Environment Variables

Edit `.env.production` with actual production credentials:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/guidesoft"

# JWT Configuration
JWT_SECRET="your-very-secure-jwt-token-with-at-least-32-characters"

# PayPal Production Configuration
PAYPAL_CLIENT_ID="YOUR_ACTUAL_PAYPAL_PRODUCTION_CLIENT_ID"
PAYPAL_CLIENT_SECRET="YOUR_ACTUAL_PAYPAL_PRODUCTION_CLIENT_SECRET"
VITE_PAYPAL_CLIENT_ID_PROD="YOUR_ACTUAL_PAYPAL_PRODUCTION_CLIENT_ID"

# PayU Production Configuration
PAYU_MERCHANT_KEY="YOUR_ACTUAL_PAYU_PRODUCTION_MERCHANT_KEY"
PAYU_MERCHANT_SALT="YOUR_ACTUAL_PAYU_PRODUCTION_MERCHANT_SALT"
PAYU_AUTH_HEADER="YOUR_ACTUAL_PAYU_AUTH_HEADER"
VITE_PAYU_MERCHANT_KEY="YOUR_ACTUAL_PAYU_PRODUCTION_MERCHANT_KEY"
VITE_PAYU_PAYMENT_URL="https://secure.payu.in/_payment"

# Razorpay Production Configuration
RAZORPAY_KEY_ID="rzp_live_YOUR_ACTUAL_LIVE_KEY_ID"
RAZORPAY_KEY_SECRET="YOUR_ACTUAL_LIVE_KEY_SECRET"
VITE_RAZORPAY_KEY_ID_PROD="rzp_live_YOUR_ACTUAL_LIVE_KEY_ID"

# Supabase Configuration (if using)
SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
SUPABASE_KEY="YOUR_SUPABASE_ANON_KEY"
ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"

# Dashboard Credentials
DASHBOARD_USERNAME="your-admin-username"
DASHBOARD_PASSWORD="your-secure-dashboard-password"

# Encryption Keys
SECRET_KEY_BASE="your-production-secret-key-base-for-cookies-at-least-32-chars"
VAULT_ENC_KEY="your-production-encryption-key-32-chars-minimum"

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

# UPI Configuration
VITE_UPI_ID="your-business-upi-id@bank"
```

## 3. Configure Webhooks in Payment Gateway Dashboards

### PayU Webhooks
1. Log in to your PayU merchant dashboard
2. Navigate to Webhook settings
3. Register the following URLs:
   - **Success URL**: `https://yourdomain.com/api/payu/success`
   - **Failure URL**: `https://yourdomain.com/api/payu/failure`
   - **Webhook URL**: `https://yourdomain.com/api/payu/webhook`
4. Subscribe to events: Payment Success, Payment Failure, Refunds, Chargebacks

### Razorpay Webhooks
1. Log in to your Razorpay dashboard
2. Navigate to "Settings" > "Webhooks"
3. Add a new webhook with:
   - **URL**: `https://yourdomain.com/api/ai-enrollments/razorpay-webhook`
   - **Events**: Select all payment events
   - **Secret**: (Optional but recommended) Set a webhook secret

### PayPal Webhooks
1. Log in to your PayPal developer dashboard
2. Navigate to your app's webhook settings
3. Add a new webhook with:
   - **URL**: `https://yourdomain.com/api/paypal/webhook`
   - **Events**: Select payment events (PAYMENT.CAPTURE.COMPLETED, PAYMENT.CAPTURE.REFUNDED, etc.)

## 4. SSL Certificate Setup

- [ ] Obtain an SSL certificate for your domain
- [ ] Install the certificate on your web server
- [ ] Verify HTTPS is working properly
- [ ] Ensure all payment pages are served over HTTPS
- [ ] Test mixed content issues

## 5. Domain Configuration

- [ ] Ensure your domain DNS is properly configured
- [ ] Verify domain is accessible from the internet
- [ ] Whitelist your domain in payment gateway dashboards
- [ ] Update success/failure redirect URLs in payment gateway settings

## 6. Final Testing

### Test All Payment Methods
- [ ] PayU payment flow with live credentials
- [ ] Razorpay payment flow with live credentials
- [ ] PayPal payment flow with live credentials
- [ ] UPI payment flow verification

### Test Success/Failure Scenarios
- [ ] Successful payment flow
- [ ] Failed payment flow
- [ ] Cancelled payment flow
- [ ] Refund process

### Test Webhook Notifications
- [ ] Verify webhook delivery from all payment gateways
- [ ] Check webhook payload handling
- [ ] Confirm database updates via webhooks

## 7. Monitoring Setup

### Logging Configuration
- [ ] Set up centralized logging for payment transactions
- [ ] Configure log retention policies
- [ ] Set up log alerting for errors

### Alerting Configuration
- [ ] Configure alerts for failed payments
- [ ] Set up alerts for webhook delivery failures
- [ ] Configure alerts for high-value transactions

### Performance Monitoring
- [ ] Set up response time monitoring
- [ ] Configure uptime monitoring
- [ ] Set up database performance monitoring

## 8. Security Verification

- [ ] Verify all secret keys are properly secured
- [ ] Confirm no sensitive data is exposed in frontend
- [ ] Verify CSRF protection is implemented
- [ ] Confirm input sanitization
- [ ] Verify PCI DSS compliance measures
- [ ] Test for common security vulnerabilities

## 9. Backup and Recovery

- [ ] Set up automated database backups
- [ ] Configure backup retention policies
- [ ] Test backup restoration process
- [ ] Document disaster recovery procedures

## 10. Go-Live Preparation

- [ ] Final code deployment
- [ ] Database migration if needed
- [ ] Smoke testing of all features
- [ ] Team readiness check
- [ ] Customer support team briefing
- [ ] Rollback plan preparation

## Support Contacts

### Payment Gateway Support
- **PayU**: support@payu.in
- **Razorpay**: support@razorpay.com
- **PayPal**: https://www.paypal.com/support

### Development Team
- Internal development team contacts
- Emergency contact information

---

**Prepared for deployment on:** December 6, 2025
**Status:** Ready for production credential integration