import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all AI tools (public) - optimized with pagination and search
router.get('/', async (req, res) => {
  try {
    const { search, category, featured, page = 1, limit = 40 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const where = {};

    if (search) {
      // Use full-text search if available, otherwise fall back to contains
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;
    
    // Get tools with pagination
    const tools = await prisma.aITool.findMany({
      where,
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: limitNum
    });

    // Get total count for pagination
    const totalCount = await prisma.aITool.count({ where });

    res.json({
      data: tools,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount: totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    res.status(500).json({ error: 'Failed to fetch AI tools' });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.aITool.findMany({
      select: { category: true },
      distinct: ['category']
    });

    res.json(categories.map(c => c.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create AI tool (Admin/Super Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description, category, icon, url, tags, featured } = req.body;

    const tool = await prisma.aITool.create({
      data: {
        name,
        description,
        category,
        icon,
        url,
        tags,
        featured: featured || false,
        authorId: req.user.id
      },
      include: { author: { select: { name: true } } }
    });

    res.status(201).json(tool);
  } catch (error) {
    console.error('Error creating AI tool:', error);
    res.status(500).json({ error: 'Failed to create AI tool' });
  }
});

// Update AI tool (Admin/Super Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description, category, icon, url, tags, featured } = req.body;

    const tool = await prisma.aITool.update({
      where: { id: req.params.id },
      data: { name, description, category, icon, url, tags, featured },
      include: { author: { select: { name: true } } }
    });

    res.json(tool);
  } catch (error) {
    console.error('Error updating AI tool:', error);
    res.status(500).json({ error: 'Failed to update AI tool' });
  }
});

// Delete AI tool (Super Admin only)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.aITool.delete({ where: { id: req.params.id } });
    res.json({ message: 'AI tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting AI tool:', error);
    res.status(500).json({ error: 'Failed to delete AI tool' });
  }
});

export default router;