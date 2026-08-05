import crypto from 'node:crypto';

const normalizeCurrency = (currency) => (currency || 'inr').toLowerCase();

const toStripeAmount = (amount, currency) => {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('A valid amount is required');
  }

  return Math.round(numericAmount * 100);
};

export const validateCheckoutRequest = ({ mode, priceId, amount, currency, successUrl, cancelUrl }) => {
  const normalizedMode = (mode || '').toLowerCase();
  if (!['payment', 'subscription'].includes(normalizedMode)) {
    throw new Error('Unsupported checkout mode');
  }

  const hasPriceId = typeof priceId === 'string' && priceId.trim().length > 0;
  const hasAmount = Number.isFinite(Number(amount)) && Number(amount) > 0;

  if (!hasPriceId && !hasAmount) {
    throw new Error('A valid priceId or amount is required');
  }

  if (successUrl && typeof successUrl !== 'string') {
    throw new Error('successUrl must be a string');
  }

  if (cancelUrl && typeof cancelUrl !== 'string') {
    throw new Error('cancelUrl must be a string');
  }

  return {
    mode: normalizedMode,
    priceId: hasPriceId ? priceId.trim() : undefined,
    amount: hasAmount ? Number(amount) : undefined,
    currency: normalizeCurrency(currency || 'inr'),
    successUrl,
    cancelUrl,
  };
};

export const buildCheckoutSessionConfig = ({ mode, priceId, amount, currency, successUrl, cancelUrl, customerEmail, metadata, paymentMethodTypes, productName }) => {
  const validated = validateCheckoutRequest({ mode, priceId, amount, currency, successUrl, cancelUrl });

  const line_items = validated.priceId
    ? [{ price: validated.priceId, quantity: 1 }]
    : [{
        price_data: {
          currency: validated.currency,
          product_data: {
            name: productName || 'Guidesoft Service',
          },
          unit_amount: toStripeAmount(validated.amount, validated.currency),
        },
        quantity: 1,
      }];

  return {
    mode: validated.mode,
    line_items,
    success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5173'}/checkout/cancel`,
    customer_email: customerEmail || undefined,
    metadata: metadata || { source: 'guideitsol.com' },
    payment_method_types: paymentMethodTypes || ['card', 'upi'],
    automatic_payment_methods: { enabled: true },
    allow_promotion_codes: true,
    automatic_tax: { enabled: false },
  };
};

export const verifyStripeSignature = (payload, signature, secret) => {
  const signatureParts = signature?.split(',') || [];
  const timestamp = signatureParts.find((part) => part.startsWith('t='));
  const signedPayload = signatureParts.find((part) => part.startsWith('v1='));

  if (!timestamp || !signedPayload) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp.split('=')[1]}.${payload}`)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signedPayload.split('=')[1]));
};
