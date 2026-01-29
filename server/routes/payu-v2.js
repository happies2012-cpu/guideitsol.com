import express from 'express';
const router = express.Router();
import axios from 'axios';
import crypto from 'crypto';
import prisma from '../db/prisma.js';

// PayU v2 configuration
const PAYU_BASE_URL = process.env.PAYU_ENV === 'production'
  ? 'https://api.payu.in'
  : 'https://apitest.payu.in';

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'your-merchant-key';
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT || 'your-merchant-salt';
const PAYU_AUTH_HEADER = process.env.PAYU_AUTH_HEADER || 'your-auth-header';

// Helper function to generate PayU v2 signature
const generateSignature = (data, salt) => {
  const hashString = `${data}|${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

// Helper function to verify PayU webhook signature
const verifyWebhookSignature = (body, signature) => {
  const expectedSignature = generateSignature(JSON.stringify(body), PAYU_MERCHANT_SALT);
  return expectedSignature === signature;
};

// Create PayU v2 order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, productinfo, firstname, email, phone, udf1, udf2, udf3, udf4, udf5 } = req.body;

    // Generate unique transaction ID
    const txnid = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);

    // Prepare order data for PayU v2
    const orderData = {
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      udf1: udf1 || '',
      udf2: udf2 || '',
      udf3: udf3 || '',
      udf4: udf4 || '',
      udf5: udf5 || '',
      surl: `${req.headers.origin || 'http://localhost:3000'}/api/payu-v2/success`,
      furl: `${req.headers.origin || 'http://localhost:3000'}/api/payu-v2/failure`,
      key: PAYU_MERCHANT_KEY
    };

    // Create order in our database first
    const order = await prisma.payment.create({
      data: {
        orderId: txnid,
        userId: udf1 || null, // Assuming udf1 contains user ID
        amount: parseFloat(amount),
        currency: 'INR',
        status: 'pending',
        gatewayResponse: JSON.stringify(orderData)
      }
    });

    res.json({
      success: true,
      orderId: txnid,
      order
    });
  } catch (error) {
    console.error('Error creating PayU order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create PayU order',
      message: error.message
    });
  }
});

// PayU v2 payment initiation
router.post('/initiate-payment', async (req, res) => {
  try {
    const { orderId, amount, productinfo, firstname, email, phone } = req.body;

    // Get order from database
    const order = await prisma.payment.findUnique({
      where: { orderId: orderId }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Generate hash for PayU v2
    const hashString = `${PAYU_MERCHANT_KEY}|${orderId}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // Prepare payment data
    const paymentData = {
      key: PAYU_MERCHANT_KEY,
      txnid: orderId,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: `${req.headers.origin || 'http://localhost:3000'}/api/payu-v2/success`,
      furl: `${req.headers.origin || 'http://localhost:3000'}/api/payu-v2/failure`,
      hash: hash
    };

    // For PayU v2, we redirect to PayU hosted page
    const payuUrl = `${PAYU_BASE_URL}/_payment`;

    res.json({
      success: true,
      payuUrl: payuUrl,
      paymentData: paymentData
    });
  } catch (error) {
    console.error('Error initiating PayU payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate PayU payment',
      message: error.message
    });
  }
});

// Helper to verify payment status with PayU Server
const verifyPayUTransaction = async (txnid) => {
  try {
    const command = 'verify_payment';
    const hashString = `${PAYU_MERCHANT_KEY}|${command}|${txnid}|${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    const formData = new URLSearchParams();
    formData.append('key', PAYU_MERCHANT_KEY);
    formData.append('command', command);
    formData.append('var1', txnid);
    formData.append('hash', hash);

    const checkUrl = process.env.PAYU_ENV === 'production'
      ? 'https://info.payu.in/merchant/postservice?form=2'
      : 'https://test.payu.in/merchant/postservice?form=2';

    const response = await axios.post(checkUrl, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.data && response.data.status === 1 && response.data.transaction_details) {
      const details = response.data.transaction_details[txnid];
      return details && details.status === 'success';
    }
    return false;
  } catch (error) {
    console.error('PayU Verification Error:', error);
    return false;
  }
};

// PayU v2 success handler
router.post('/success', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, hash, status, udf1, udf2, udf3, udf4, udf5 } = req.body;

    // 1. Verify the hash from the post params
    const hashString = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    if (generatedHash !== hash) {
      console.log('PayU Payment Hash Mismatch:', { txnid });
      await prisma.payment.update({
        where: { orderId: txnid },
        data: { status: 'tampered', gatewayResponse: JSON.stringify(req.body) }
      });
      return res.sendFile(process.cwd() + '/server/views/payment-failure.html');
    }

    // 2. Server-to-Server Verification (Double Check)
    const isVerified = await verifyPayUTransaction(txnid);

    if (isVerified) {
      // Payment verified successfully
      console.log('PayU Payment Verified & Successful:', { txnid });

      // Update payment status in database
      await prisma.payment.update({
        where: { orderId: txnid },
        data: {
          status: 'success',
          payuTxnId: txnid,
          gatewayResponse: JSON.stringify(req.body)
        }
      });

      // Update enrollment status if enrollment ID is provided
      if (udf1) {
        try {
          // Find enrollment first to make sure it exists? Or just update
          await prisma.aIEnrollments.update({
            where: { id: udf1 },
            data: { isPaid: true, transactionId: txnid }
          });
        } catch (dbError) {
          console.error('Error updating enrollment:', dbError);
        }
      }

      res.redirect('/dashboard?payment=success');
    } else {
      // Verification failed
      console.log('PayU Server Verification Failed:', { txnid });

      await prisma.payment.update({
        where: { orderId: txnid },
        data: { status: 'failed_verification', gatewayResponse: JSON.stringify(req.body) }
      });

      res.sendFile(process.cwd() + '/server/views/payment-failure.html');
    }
  } catch (error) {
    console.error('Error handling PayU success:', error);
    // ... error handling
    if (req.body.txnid) {
      // try update status
    }
    res.status(500).sendFile(process.cwd() + '/server/views/payment-failure.html');
  }
});

// PayU v2 failure handler
router.post('/failure', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, status } = req.body;

    console.log('PayU Payment Failed:', { txnid, amount, productinfo, firstname, email, status });

    // Update payment status in database
    if (txnid) {
      await prisma.payments.update({
        where: { orderId: txnid },
        data: {
          status: 'failed',
          gatewayResponse: JSON.stringify(req.body)
        }
      });
    }

    // Update enrollment status in database
    // Send failure notification

    res.sendFile(process.cwd() + '/server/views/payment-failure.html');
  } catch (error) {
    console.error('Error handling PayU failure:', error);

    // Update payment status
    if (req.body.txnid) {
      await prisma.payments.update({
        where: { orderId: req.body.txnid },
        data: {
          status: 'error',
          gatewayResponse: JSON.stringify(req.body)
        }
      });
    }

    res.status(500).sendFile(process.cwd() + '/server/views/payment-failure.html');
  }
});

// PayU v2 webhook handler
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-payu-signature'];
    const body = req.body;

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.log('Invalid PayU webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Process webhook event
    const { event, payload } = body;

    switch (event) {
      case 'payment.success':
        // Handle successful payment
        await prisma.payments.update({
          where: { orderId: payload.payment.entity.txnid },
          data: {
            status: 'success',
            payuTxnId: payload.payment.entity.txnid,
            gatewayResponse: JSON.stringify(payload)
          }
        });
        break;

      case 'payment.failed':
        // Handle failed payment
        await prisma.payments.update({
          where: { orderId: payload.payment.entity.txnid },
          data: {
            status: 'failed',
            gatewayResponse: JSON.stringify(payload)
          }
        });
        break;

      default:
        console.log('Unhandled PayU webhook event:', event);
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing PayU webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'PayU v2 integration is running',
    timestamp: new Date().toISOString()
  });
});

export default router;