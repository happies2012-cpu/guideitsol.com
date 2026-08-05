# Deployment Guide

## Vercel

1. Create a Vercel project and link this repository.
2. Set the framework preset to Vite.
3. Configure the environment variables listed in ENVIRONMENT_VARIABLES.md.
4. Deploy the project.

## Required environment variables

- STRIPE_SECRET_KEY
- STRIPE_PUBLIC_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_SITE_URL
- DATABASE_URL
- JWT_SECRET

## Stripe webhook

Set the Stripe webhook endpoint to:

https://<your-domain>/api/stripe/webhook

Events to enable:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- invoice.payment_succeeded
