import express from 'express';
import prisma from '../db/prisma.js';
import { sendEmail, sendWhatsAppNotification, logToGoogleSheets } from '../services/notificationService.js';

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

    // Notify info@guideitsol.com
    const emailContent = `
      <h3>New ${formType} Submission</h3>
      <p><strong>Details:</strong></p>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    
    await sendEmail({
      to: 'info@guideitsol.com',
      subject: `New ${formType} from GuideIT Solutions`,
      html: emailContent
    });

    // Customize message based on form type
    let waMessage = `🚀 *New ${formType.toUpperCase()} Submission*\n\n`;
    waMessage += `👤 *Name:* ${data.name || 'N/A'}\n`;
    waMessage += `📧 *Email:* ${data.email || 'N/A'}\n`;
    waMessage += `📱 *Phone:* ${data.phone || 'N/A'}\n`;
    waMessage += `🏢 *Company:* ${data.company || 'N/A'}\n`;
    
    if (formType === 'consultation') {
      waMessage += `📅 *Date:* ${data.preferredDate || 'N/A'}\n`;
      waMessage += `⏰ *Time:* ${data.preferredTime || 'N/A'}\n`;
      waMessage += `💬 *Topic:* ${data.topic || 'N/A'}\n`;
      waMessage += `🔗 *Call Link:* meet.google.com/new (Host manually)\n`;
    } else if (data.message || data.description) {
      waMessage += `📝 *Message:* ${data.message || data.description}\n`;
    }
    
    waMessage += `\n✅ Processed at: ${new Date().toLocaleString()}`;

    await sendWhatsAppNotification(waMessage);
    
    // Log to Google Sheets
    await logToGoogleSheets({ formType, ...data, submittedAt: new Date().toISOString() });

    res.status(201).json({ success: true, message: 'Form submitted successfully', submission });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, error: 'Failed to submit form' });
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
