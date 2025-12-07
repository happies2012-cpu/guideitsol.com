import express from 'express';
import prisma from '../db/prisma.js';

const router = express.Router();

// Submit form
router.post('/submit', async (req, res) => {
  try {
    const { formType, data } = req.body;

    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        data: JSON.stringify(data)
      }
    });

    res.status(201).json({ message: 'Form submitted successfully', submission });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Get form submissions (for admin)
router.get('/', async (req, res) => {
  try {
    const { formType } = req.query;
    const where = formType ? { formType } : {};

    const submissions = await prisma.formSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

export default router;
