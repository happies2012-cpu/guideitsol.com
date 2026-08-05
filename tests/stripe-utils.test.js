import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCheckoutSessionConfig } from '../server/lib/stripe-utils.js';

test('buildCheckoutSessionConfig supports amount-based Stripe checkout and UPI methods', () => {
  const config = buildCheckoutSessionConfig({
    mode: 'payment',
    amount: 1999,
    currency: 'inr',
    successUrl: 'https://example.com/success',
    cancelUrl: 'https://example.com/cancel',
    customerEmail: 'user@example.com',
    metadata: { source: 'guideitsol.com' },
  });

  assert.equal(config.mode, 'payment');
  assert.deepEqual(config.payment_method_types, ['card', 'upi']);
  assert.equal(config.customer_email, 'user@example.com');
  assert.equal(config.line_items[0].price_data.unit_amount, 199900);
  assert.equal(config.line_items[0].price_data.currency, 'inr');
});
