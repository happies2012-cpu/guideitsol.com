import express from 'express';
const router = express.Router();
import crypto from 'crypto';
import path from 'path';

// Generate PayU hash endpoint
router.post('/generate-hash', async (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, udf1, udf2, udf3, udf4, udf5 } = req.body;
    
    // Get keys from environment variables
    const key = process.env.PAYU_MERCHANT_KEY || 'your-merchant-key';
    const salt = process.env.PAYU_MERCHANT_SALT || 'your-merchant-salt';
    
    // Create hash string
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    res.json({
      hash: hash,
      key: key
    });
  } catch (error) {
    console.error('Error generating PayU hash:', error);
    res.status(500).json({ error: 'Failed to generate PayU hash' });
  }
});

// PayU success handler
router.post('/success', (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, hash, status, udf1, udf2, udf3, udf4, udf5 } = req.body;
    
    // Verify the hash to ensure payment authenticity
    const key = process.env.PAYU_MERCHANT_KEY || 'your-merchant-key';
    const salt = process.env.PAYU_MERCHANT_SALT || 'your-merchant-salt';
    
    const hashString = `${salt}|${status}|||||||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    const generatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
    
    if (generatedHash === hash) {
      // Payment verified successfully
      console.log('PayU Payment Successful:', { txnid, amount, productinfo, firstname, email, status });
      
      // Update enrollment status in database
      // Send confirmation email
      // Perform any other post-payment actions
      
      res.sendFile(path.join(process.cwd(), 'server/views/payment-success.html'));
    } else {
      // Hash verification failed
      console.log('PayU Payment Verification Failed:', { txnid, amount, productinfo });
      res.sendFile(path.join(process.cwd(), 'server/views/payment-failure.html'));
    }
  } catch (error) {
    console.error('Error handling PayU success:', error);
    res.status(500).sendFile(path.join(process.cwd(), 'server/views/payment-failure.html'));
  }
});

// PayU failure handler
router.post('/failure', (req, res) => {
  try {
    const { txnid, amount, productinfo, firstname, email, status } = req.body;
    
    console.log('PayU Payment Failed:', { txnid, amount, productinfo, firstname, email, status });
    
    // Update enrollment status in database
    // Send failure notification
    
    res.sendFile(path.join(process.cwd(), 'server/views/payment-failure.html'));
  } catch (error) {
    console.error('Error handling PayU failure:', error);
    res.status(500).sendFile(path.join(process.cwd(), 'server/views/payment-failure.html'));
  }
});

export default router;