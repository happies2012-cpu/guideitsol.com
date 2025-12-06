import express from 'express';
const router = express.Router();
import crypto from 'crypto';

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// PayPal configuration based on environment
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'your-paypal-client-id';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || 'your-paypal-client-secret';
const PAYPAL_BASE_URL = isProduction 
  ? 'https://api.paypal.com' 
  : 'https://api.sandbox.paypal.com';

// Helper function to get PayPal access token
async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  
  const data = await response.json();
  return data.access_token;
}

// PayPal webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const payload = req.body;
  const paypalWebhookId = process.env.PAYPAL_WEBHOOK_ID;
  
  // Verify webhook signature
  const webhookSignature = req.headers['paypal-transmission-id'];
  const certUrl = req.headers['paypal-cert-url'];
  const authAlgo = req.headers['paypal-auth-algo'];
  const transmissionId = req.headers['paypal-transmission-id'];
  const transmissionTime = req.headers['paypal-transmission-time'];
  const webhookId = paypalWebhookId;
  
  // In a production environment, you would verify the signature using PayPal's SDK
  // For now, we'll just log the event
  console.log('PayPal Webhook Event Received:', payload);
  
  // Handle different event types
  switch (payload.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      console.log('Payment completed:', payload.resource);
      // Update enrollment status in database
      // Send confirmation email
      break;
      
    case 'PAYMENT.CAPTURE.REFUNDED':
      console.log('Payment refunded:', payload.resource);
      // Update enrollment status in database
      break;
      
    case 'PAYMENT.CAPTURE.REVERSED':
      console.log('Payment reversed:', payload.resource);
      // Update enrollment status in database
      break;
      
    default:
      console.log('Unhandled PayPal event:', payload.event_type);
  }
  
  res.status(200).json({ success: true });
});

// Create PayPal order endpoint
router.post('/create-order', async (req, res) => {
  try {
    const { amount, toolName } = req.body;
    
    // Get access token
    const accessToken = await getPayPalAccessToken();
    
    // Create order with PayPal API
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'INR',
            value: amount.toString()
          },
          description: `Enrollment for ${toolName}`
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success`,
          cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-cancelled`
        }
      })
    });
    
    const orderData = await response.json();
    
    if (orderData.id) {
      res.json({
        id: orderData.id,
        status: orderData.status,
        amount: amount,
        toolName: toolName
      });
    } else {
      throw new Error(orderData.message || 'Failed to create PayPal order');
    }
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});

// Capture PayPal order endpoint
router.post('/capture-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Get access token
    const accessToken = await getPayPalAccessToken();
    
    // Capture order with PayPal API
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const captureData = await response.json();
    
    if (captureData.status === 'COMPLETED') {
      res.json({
        id: captureData.id,
        status: captureData.status,
        payer: captureData.payer
      });
    } else {
      throw new Error(captureData.message || 'Failed to capture PayPal order');
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ error: 'Failed to capture PayPal order' });
  }
});

export default router;