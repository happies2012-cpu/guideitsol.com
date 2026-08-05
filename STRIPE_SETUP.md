# Stripe Setup

## 1. Create a Stripe account

Create or sign in to a Stripe account and switch to test mode first.

## 2. Create products and prices

Create at least one product with a recurring or one-time price. Save the resulting price IDs.

## 3. Configure environment variables

- STRIPE_SECRET_KEY
- STRIPE_PUBLIC_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL

## 4. Configure webhooks

Add a webhook endpoint pointing to:

https://<your-domain>/api/stripe/webhook

Enable these events:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- invoice.payment_succeeded

## 5. Launch the checkout flow

Use the checkout API at:

POST /api/stripe/create-checkout-session
