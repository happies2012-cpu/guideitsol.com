import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all settings (Admin/Super Admin only)
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const settings = await prisma.settings.findMany();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: req.params.key }
    });
    
    if (!setting) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    res.json(setting);
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: 'Failed to fetch setting' });
  }
});

// Update setting (Admin/Super Admin only)
router.put('/:key', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { value } = req.body;

    const setting = await prisma.settings.upsert({
      where: { key: req.params.key },
      update: { value },
      create: { key: req.params.key, value }
    });

    res.json(setting);
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

export default router;
