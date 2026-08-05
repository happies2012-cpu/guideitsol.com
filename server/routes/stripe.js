import express from 'express';
import Stripe from 'stripe';
import { buildCheckoutSessionConfig, verifyStripeSignature } from '../lib/stripe-utils.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil',
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      mode,
      priceId,
      amount,
      currency,
      successUrl,
      cancelUrl,
      customerEmail,
      metadata,
      paymentMethodTypes,
      productName,
    } = req.body || {};

    const sessionConfig = buildCheckoutSessionConfig({
      mode,
      priceId,
      amount,
      currency,
      successUrl,
      cancelUrl,
      customerEmail,
      metadata,
      paymentMethodTypes,
      productName,
    });

    const session = await stripe.checkout.sessions.create({
      ...sessionConfig,
      mode: sessionConfig.mode,
      customer_email: customerEmail || undefined,
      metadata: sessionConfig.metadata,
      payment_method_types: sessionConfig.payment_method_types,
      automatic_payment_methods: sessionConfig.automatic_payment_methods,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message || 'Unable to create checkout session' });
  }
});

router.post('/create-portal-session', async (req, res) => {
  try {
    const { customerId } = req.body || {};

    if (!customerId) {
      return res.status(400).json({ error: 'customerId is required' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    res.status(500).json({ error: 'Unable to create billing portal session' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing Stripe signature or webhook secret' });
  }

  let event;
  try {
    const payload = req.body.toString('utf8');
    const isValid = verifyStripeSignature(payload, sig, webhookSecret);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid Stripe signature' });
    }

    event = JSON.parse(payload);
  } catch (error) {
    console.error('Webhook parsing error:', error);
    return res.status(400).json({ error: 'Webhook payload invalid' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'invoice.payment_succeeded':
        console.log(`Stripe event received: ${event.type}`);
        break;
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook handling error:', error);
    res.status(500).json({ error: 'Webhook handling failed' });
  }
});

export default router;
