import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Create a new enrollment
router.post('/', async (req, res) => {
  try {
    const { 
      toolId, 
      name, 
      email, 
      phone, 
      linkedin, 
      aadhar, 
      pan, 
      message 
    } = req.body;

    // Validate required fields
    if (!toolId || !name || !email || !phone || !aadhar || !pan) {
      return res.status(400).json({ 
        error: 'Missing required fields: toolId, name, email, phone, aadhar, pan' 
      });
    }

    // Validate Aadhar (12 digits)
    if (aadhar.length !== 12 || !/^\d+$/.test(aadhar)) {
      return res.status(400).json({ 
        error: 'Aadhar must be a 12-digit number' 
      });
    }

    // Validate PAN (10 characters: 5 letters, 4 digits, 1 letter)
    if (pan.length !== 10 || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
      return res.status(400).json({ 
        error: 'PAN must be 10 characters: 5 letters, 4 digits, 1 letter' 
      });
    }

    // Check if tool exists
    const tool = await prisma.aITool.findUnique({
      where: { id: toolId }
    });

    if (!tool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    // Create enrollment
    const enrollment = await prisma.aIEnrollments.create({
      data: {
        toolId,
        name,
        email,
        phone,
        linkedin: linkedin || null,
        aadhar,
        pan: pan.toUpperCase(),
        message: message || null,
        userId: req.user?.id || null
      }
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ error: 'Failed to create enrollment' });
  }
});

// Verify enrollment (Aadhar and PAN verification)
router.post('/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, this would connect to a verification service
    // For demo purposes, we'll just mark as verified
    
    const enrollment = await prisma.aIEnrollments.update({
      where: { id },
      data: { isVerified: true }
    });

    res.json(enrollment);
  } catch (error) {
    console.error('Error verifying enrollment:', error);
    res.status(500).json({ error: 'Failed to verify enrollment' });
  }
});

// Update payment status
router.post('/:id/payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;
    
    const enrollment = await prisma.aIEnrollments.update({
      where: { id },
      data: { 
        isPaid: true,
        transactionId: transactionId || null
      }
    });

    res.json(enrollment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Razorpay webhook endpoint
router.post('/razorpay-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
      // Verify the payment
      const paymentId = req.body.payload.payment.entity.id;
      const enrollmentId = req.body.payload.payment.entity.notes.enrollmentId;
      
      if (req.body.event === 'payment.captured') {
        // Update enrollment as paid
        const enrollment = await prisma.aIEnrollments.update({
          where: { id: enrollmentId },
          data: { 
            isPaid: true,
            transactionId: paymentId
          }
        });
        
        console.log('Payment verified and enrollment updated:', enrollment.id);
      }
      
      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

// Get user enrollments
router.get('/user/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Users can only access their own enrollments
    if (req.user.id !== userId && req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const enrollments = await prisma.aIEnrollments.findMany({
      where: { userId },
      include: { tool: true }
    });

    res.json(enrollments);
  } catch (error) {
    console.error('Error fetching user enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Get enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const enrollment = await prisma.aIEnrollments.findUnique({
      where: { id },
      include: { tool: true }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
});

export default router;