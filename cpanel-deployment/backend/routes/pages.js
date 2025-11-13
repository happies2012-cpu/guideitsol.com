import express from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all pages (public)
router.get('/', async (req, res) => {
  try {
    const pages = await prisma.page.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Get single page by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { name: true } } }
    });
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// Create page (Admin/Super Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), [
  body('title').trim().notEmpty(),
  body('slug').trim().notEmpty(),
  body('content').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, slug, content, metaTitle, metaDesc, published } = req.body;

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content,
        metaTitle,
        metaDesc,
        published: published || false,
        authorId: req.user.id
      },
      include: { author: { select: { name: true } } }
    });

    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Failed to create page' });
  }
});

// Update page (Admin/Super Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, slug, content, metaTitle, metaDesc, published } = req.body;

    const page = await prisma.page.update({
      where: { id: req.params.id },
      data: { title, slug, content, metaTitle, metaDesc, published },
      include: { author: { select: { name: true } } }
    });

    res.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: 'Failed to update page' });
  }
});

// Delete page (Super Admin only)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.page.delete({ where: { id: req.params.id } });
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

export default router;
