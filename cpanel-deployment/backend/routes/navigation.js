import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all navigation (public)
router.get('/', async (req, res) => {
  try {
    const navigation = await prisma.navigation.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true
          }
        }
      },
      orderBy: { order: 'asc' }
    });
    res.json(navigation);
  } catch (error) {
    console.error('Error fetching navigation:', error);
    res.status(500).json({ error: 'Failed to fetch navigation' });
  }
});

// Create navigation (Admin/Super Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, href, order, parentId } = req.body;

    const navigation = await prisma.navigation.create({
      data: { title, href, order, parentId }
    });

    res.status(201).json(navigation);
  } catch (error) {
    console.error('Error creating navigation:', error);
    res.status(500).json({ error: 'Failed to create navigation' });
  }
});

// Update navigation (Admin/Super Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, href, order, parentId } = req.body;

    const navigation = await prisma.navigation.update({
      where: { id: req.params.id },
      data: { title, href, order, parentId }
    });

    res.json(navigation);
  } catch (error) {
    console.error('Error updating navigation:', error);
    res.status(500).json({ error: 'Failed to update navigation' });
  }
});

// Delete navigation (Super Admin only)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.navigation.delete({ where: { id: req.params.id } });
    res.json({ message: 'Navigation deleted successfully' });
  } catch (error) {
    console.error('Error deleting navigation:', error);
    res.status(500).json({ error: 'Failed to delete navigation' });
  }
});

export default router;
