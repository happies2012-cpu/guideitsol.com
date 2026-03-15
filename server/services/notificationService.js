import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Defaulting to Gmail, user can change in .env
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email notification
 * @param {Object} options - { to, subject, text, html }
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || 'info@guideitsol.com',
      subject: subject || 'New Form Submission - GuideIT Solutions',
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Suppress error to avoid crashing the request, but log it
    return null;
  }
};

/**
 * Send WhatsApp notification
 * This currently uses a simple implementation. 
 * For automated messages, a service like Twilio or WhatsApp Business API is required.
 * For now, we'll log it and optionally push to a webhook if provided.
 */
export const sendWhatsAppNotification = async (message) => {
  try {
    console.log('WhatsApp Notification Triggered:', message);
    
    // If the user has an automated WhatsApp API (like CallMeBot or similar free for testing)
    // they can add WHATSAPP_API_URL in .env
    if (process.env.WHATSAPP_API_URL) {
      await axios.get(`${process.env.WHATSAPP_API_URL}?text=${encodeURIComponent(message)}`);
    } else if (process.env.WHATSAPP_NUMBER) {
       // Just a fallback log
       console.log(`Notification for: https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
};

/**
 * Log to Google Sheets
 * This expects a GOOGLE_SHEET_WEBHOOK_URL (e.g. from Google Apps Script)
 */
export const logToGoogleSheets = async (data) => {
  try {
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      await axios.post(process.env.GOOGLE_SHEET_WEBHOOK_URL, data);
      console.log('Logged to Google Sheets');
    }
    return true;
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    return false;
  }
};
