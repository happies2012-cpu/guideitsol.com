import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all AI tools with advanced filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, featured, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const where = {};

    if (search) {
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

    // Validate sortBy and sortOrder
    const validSortBy = ['createdAt', 'updatedAt', 'rating', 'usageCount'];
    const validSortOrder = ['asc', 'desc'];
    
    if (!validSortBy.includes(sortBy)) {
      sortBy = 'createdAt';
    }
    
    if (!validSortOrder.includes(sortOrder)) {
      sortOrder = 'desc';
    }

    const skip = (pageNum - 1) * limitNum;

    const tools = await prisma.aITool.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reviews: {
          select: {
            rating: true
          }
        }
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limitNum
    });

    // Calculate average rating for each tool
    const toolsWithRating = tools.map(tool => {
      const totalRating = tool.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = tool.reviews.length > 0 ? totalRating / tool.reviews.length : 0;
      
      return {
        ...tool,
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount: tool.reviews.length
      };
    });

    const totalCount = await prisma.aITool.count({ where });

    res.json({
      tools: toolsWithRating,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    res.status(500).json({ error: 'Failed to fetch AI tools' });
  }
});

// Get AI tool by ID with detailed information
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await prisma.aITool.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        aiEnrollments: {
          where: {
            isVerified: true
          },
          select: {
            id: true,
            userId: true,
            progress: true,
            completed: true,
            enrolledAt: true
          }
        }
      }
    });

    if (!tool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    // Calculate statistics
    const totalEnrollments = tool.aiEnrollments.length;
    const completedEnrollments = tool.aiEnrollments.filter(e => e.completed).length;
    const completionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;
    
    const totalRating = tool.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = tool.reviews.length > 0 ? totalRating / tool.reviews.length : 0;

    res.json({
      ...tool,
      statistics: {
        totalEnrollments,
        completedEnrollments,
        completionRate: parseFloat(completionRate.toFixed(1)),
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount: tool.reviews.length
      }
    });
  } catch (error) {
    console.error('Error fetching AI tool:', error);
    res.status(500).json({ error: 'Failed to fetch AI tool' });
  }
});

// Create a new AI tool
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description, category, icon, url, tags, featured, pricingModel, monthlyPrice, annualPrice } = req.body;

    // Validate required fields
    if (!name || !description || !category) {
      return res.status(400).json({ error: 'Name, description, and category are required' });
    }

    // Validate tags format
    let tagsString = '';
    if (Array.isArray(tags)) {
      tagsString = tags.join(',');
    } else if (typeof tags === 'string') {
      tagsString = tags;
    }

    const tool = await prisma.aITool.create({
      data: {
        name,
        description,
        category,
        icon: icon || null,
        url: url || null,
        tags: tagsString,
        featured: featured || false,
        pricingModel: pricingModel || null,
        monthlyPrice: monthlyPrice || null,
        annualPrice: annualPrice || null,
        authorId: req.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(tool);
  } catch (error) {
    console.error('Error creating AI tool:', error);
    res.status(500).json({ error: 'Failed to create AI tool' });
  }
});

// Update AI tool
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, icon, url, tags, featured, pricingModel, monthlyPrice, annualPrice } = req.body;

    // Check if tool exists
    const existingTool = await prisma.aITool.findUnique({
      where: { id }
    });

    if (!existingTool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    // Validate tags format
    let tagsString = existingTool.tags;
    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        tagsString = tags.join(',');
      } else if (typeof tags === 'string') {
        tagsString = tags;
      }
    }

    const tool = await prisma.aITool.update({
      where: { id },
      data: {
        name: name || existingTool.name,
        description: description || existingTool.description,
        category: category || existingTool.category,
        icon: icon !== undefined ? icon : existingTool.icon,
        url: url !== undefined ? url : existingTool.url,
        tags: tagsString,
        featured: featured !== undefined ? featured : existingTool.featured,
        pricingModel: pricingModel !== undefined ? pricingModel : existingTool.pricingModel,
        monthlyPrice: monthlyPrice !== undefined ? monthlyPrice : existingTool.monthlyPrice,
        annualPrice: annualPrice !== undefined ? annualPrice : existingTool.annualPrice
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(tool);
  } catch (error) {
    console.error('Error updating AI tool:', error);
    res.status(500).json({ error: 'Failed to update AI tool' });
  }
});

// Delete AI tool
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if tool exists
    const existingTool = await prisma.aITool.findUnique({
      where: { id }
    });

    if (!existingTool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    // Delete related data first
    await prisma.review.deleteMany({
      where: { toolId: id }
    });

    await prisma.aIEnrollments.deleteMany({
      where: { toolId: id }
    });

    // Delete the tool
    await prisma.aITool.delete({
      where: { id }
    });

    res.json({ message: 'AI tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting AI tool:', error);
    res.status(500).json({ error: 'Failed to delete AI tool' });
  }
});

// Get AI tool categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await prisma.aITool.findMany({
      select: { category: true },
      distinct: ['category']
    });

    res.json(categories.map(c => c.category));
  } catch (error) {
    console.error('Error fetching AI tool categories:', error);
    res.status(500).json({ error: 'Failed to fetch AI tool categories' });
  }
});

// Feature/unfeature an AI tool
router.patch('/:id/feature', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    // Check if tool exists
    const existingTool = await prisma.aITool.findUnique({
      where: { id }
    });

    if (!existingTool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    const tool = await prisma.aITool.update({
      where: { id },
      data: { featured: featured !== undefined ? featured : !existingTool.featured }
    });

    res.json({ message: `AI tool ${tool.featured ? 'featured' : 'unfeatured'} successfully`, tool });
  } catch (error) {
    console.error('Error updating AI tool feature status:', error);
    res.status(500).json({ error: 'Failed to update AI tool feature status' });
  }
});

// Track AI tool usage
router.post('/:id/track-usage', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if tool exists
    const existingTool = await prisma.aITool.findUnique({
      where: { id }
    });

    if (!existingTool) {
      return res.status(404).json({ error: 'AI tool not found' });
    }

    // Increment usage count
    const tool = await prisma.aITool.update({
      where: { id },
      data: {
        usageCount: {
          increment: 1
        }
      }
    });

    res.json({ message: 'Usage tracked successfully', usageCount: tool.usageCount });
  } catch (error) {
    console.error('Error tracking AI tool usage:', error);
    res.status(500).json({ error: 'Failed to track AI tool usage' });
  }
});

export default router;