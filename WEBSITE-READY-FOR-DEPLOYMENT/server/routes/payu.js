import express from 'express';
const router = express.Router();
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../db/prisma.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// PayU configuration based on environment
const PAYU_BASE_URL = isProduction 
  ? 'https://secure.payu.in' 
  : 'https://test.payu.in';

const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY || 'your-merchant-key';
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT || 'your-merchant-salt';

// Generate PayU hash endpoint
router.post('/generate-hash', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5 } = req.body;
    
    // Create hash string
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    res.json({
      hash: hash,
      key: PAYU_MERCHANT_KEY
    });
  } catch (error) {
    console.error('Error generating PayU hash:', error);
    res.status(500).json({ error: 'Failed to generate PayU hash' });
  }
});

// PayU success handler
router.post('/success', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, hash, status, udf1, udf2, udf3, udf4, udf5 } = req.body;
    
    // Verify the hash to ensure payment authenticity
    const hashString = `${PAYU_MERCHANT_SALT}|${status}|||||||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_MERCHANT_KEY}`;
    const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    if (generatedHash === hash) {
      // Payment verified successfully
      console.log('PayU Payment Successful:', { txnid, amount, productinfo, firstname, email, status });
      
      // Update payment status in database
      try {
        await prisma.payment.update({
          where: { orderId: txnid },
          data: { 
            status: 'success',
            payuTxnId: txnid,
            gatewayResponse: JSON.stringify(req.body),
            updatedAt: new Date()
          }
        });
        console.log('Payment record updated successfully:', txnid);
      } catch (dbError) {
        console.error('Error updating payment record:', dbError);
      }
      
      // Update enrollment status in database if enrollment ID is provided
      if (udf1) {
        try {
          await prisma.aIEnrollments.update({
            where: { id: udf1 },
            data: { 
              isPaid: true,
              transactionId: txnid,
              updatedAt: new Date()
            }
          });
          console.log('Enrollment updated successfully:', udf1);
        } catch (dbError) {
          console.error('Error updating enrollment:', dbError);
        }
      }
      
      // Send confirmation email
      // Perform any other post-payment actions
      
      // Redirect to dashboard after successful payment
      res.redirect('/dashboard?payment=success&txnid=' + txnid);
    } else {
      // Hash verification failed
      console.log('PayU Payment Verification Failed:', { txnid, amount, productinfo });
      res.sendFile(path.join(__dirname, '..', 'views', 'payment-failure.html'));
    }
  } catch (error) {
    console.error('Error handling PayU success:', error);
    res.status(500).sendFile(path.join(__dirname, '..', 'views', 'payment-failure.html'));
  }
});

// PayU failure handler
router.post('/failure', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, status } = req.body;
    
    console.log('PayU Payment Failed:', { txnid, amount, productinfo, firstname, email, status });
    
    // Update payment status in database
    try {
      await prisma.payment.update({
        where: { orderId: txnid },
        data: { 
          status: 'failed',
          gatewayResponse: JSON.stringify(req.body),
          updatedAt: new Date()
        }
      });
      console.log('Payment record updated as failed:', txnid);
    } catch (dbError) {
      console.error('Error updating payment record:', dbError);
    }
    
    // Update enrollment status in database if needed
    // Send failure notification
    
    res.sendFile(path.join(__dirname, '..', 'views', 'payment-failure.html'));
  } catch (error) {
    console.error('Error handling PayU failure:', error);
    res.status(500).sendFile(path.join(__dirname, '..', 'views', 'payment-failure.html'));
  }
});

// Webhook handler for PayU notifications
router.post('/webhook', async (req, res) => {
  try {
    const payload = req.body;
    console.log('PayU Webhook Received:', payload);
    
    // Verify webhook signature if provided
    const webhookSignature = req.headers['x-payu-webhook-signature'];
    if (webhookSignature) {
      // Verify signature if needed based on PayU documentation
      // This is a simplified example
    }
    
    // Process webhook notification
    const { txnid, status, amount, productinfo } = payload;
    
    if (txnid && status) {
      // Update payment status in database
      try {
        await prisma.payment.update({
          where: { orderId: txnid },
          data: { 
            status: status.toLowerCase(),
            gatewayResponse: JSON.stringify(payload),
            updatedAt: new Date()
          }
        });
        console.log('Payment record updated via webhook:', txnid);
      } catch (dbError) {
        console.error('Error updating payment record via webhook:', dbError);
      }
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling PayU webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

export default router;