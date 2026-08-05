import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCheckoutSessionConfig, validateCheckoutRequest } from '../server/lib/stripe-utils.js';

test('buildCheckoutSessionConfig uses the requested mode and price', () => {
  const config = buildCheckoutSessionConfig({ mode: 'payment', priceId: 'price_123' });

  assert.equal(config.mode, 'payment');
  assert.deepEqual(config.line_items, [{ price: 'price_123', quantity: 1 }]);
});

test('validateCheckoutRequest rejects unsupported modes', () => {
  assert.throws(() => validateCheckoutRequest({ mode: 'invalid', priceId: 'price_123' }), /Unsupported checkout mode/);
});
