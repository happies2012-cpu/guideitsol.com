import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all reviews with optional filters
router.get('/', async (req, res) => {
  try {
    const { toolId, courseId, rating, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const where = {};

    if (toolId) {
      where.toolId = toolId;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (rating) {
      where.rating = parseInt(rating);
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;
    
    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        tool: {
          select: {
            id: true,
            name: true,
            icon: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: limitNum
    });

    // Get total count for pagination
    const totalCount = await prisma.review.count({ where });

    res.json({
      data: reviews,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount: totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get review by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        tool: {
          select: {
            id: true,
            name: true,
            icon: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true
          }
        }
      }
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Create a new review
router.post('/', authenticate, async (req, res) => {
  try {
    const { toolId, courseId, rating, title, content } = req.body;

    // Validate required fields
    if (!rating || !title || !content) {
      return res.status(400).json({ 
        error: 'Missing required fields: rating, title, content' 
      });
    }

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    // Check if tool or course exists
    if (toolId) {
      const tool = await prisma.aITool.findUnique({
        where: { id: toolId }
      });
      
      if (!tool) {
        return res.status(404).json({ error: 'AI tool not found' });
      }
    }

    if (courseId) {
      const course = await prisma.courses.findUnique({
        where: { id: courseId }
      });
      
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        toolId: toolId || null,
        courseId: courseId || null,
        rating,
        title,
        content
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        tool: {
          select: {
            id: true,
            name: true,
            icon: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true
          }
        }
      }
    });

    // Update tool/course rating and review count
    if (toolId) {
      const toolReviews = await prisma.review.findMany({
        where: { toolId }
      });
      
      const averageRating = toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length;
      
      await prisma.aITool.update({
        where: { id: toolId },
        data: {
          rating: averageRating,
          reviewCount: toolReviews.length
        }
      });
    }

    if (courseId) {
      const courseReviews = await prisma.review.findMany({
        where: { courseId }
      });
      
      const averageRating = courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length;
      
      await prisma.courses.update({
        where: { id: courseId },
        data: {
          rating: averageRating,
          reviewCount: courseReviews.length
        }
      });
    }

    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update review (only owner can update)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, content } = req.body;

    // Validate rating (1-5)
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (existingReview.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update review
    const review = await prisma.review.update({
      where: { id },
      data: {
        rating: rating || existingReview.rating,
        title: title || existingReview.title,
        content: content || existingReview.content
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        tool: {
          select: {
            id: true,
            name: true,
            icon: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true
          }
        }
      }
    });

    // Update tool/course rating if rating changed
    if (rating && rating !== existingReview.rating) {
      if (existingReview.toolId) {
        const toolReviews = await prisma.review.findMany({
          where: { toolId: existingReview.toolId }
        });
        
        const averageRating = toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length;
        
        await prisma.aITool.update({
          where: { id: existingReview.toolId },
          data: {
            rating: averageRating
          }
        });
      }

      if (existingReview.courseId) {
        const courseReviews = await prisma.review.findMany({
          where: { courseId: existingReview.courseId }
        });
        
        const averageRating = courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length;
        
        await prisma.courses.update({
          where: { id: existingReview.courseId },
          data: {
            rating: averageRating
          }
        });
      }
    }

    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete review (only owner can delete)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if review exists and belongs to user
    const existingReview = await prisma.review.findUnique({
      where: { id }
    });

    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (existingReview.userId !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete review
    await prisma.review.delete({
      where: { id }
    });

    // Update tool/course rating and review count
    if (existingReview.toolId) {
      const toolReviews = await prisma.review.findMany({
        where: { toolId: existingReview.toolId }
      });
      
      const averageRating = toolReviews.length > 0 
        ? toolReviews.reduce((sum, r) => sum + r.rating, 0) / toolReviews.length 
        : 0;
      
      await prisma.aITool.update({
        where: { id: existingReview.toolId },
        data: {
          rating: averageRating,
          reviewCount: toolReviews.length
        }
      });
    }

    if (existingReview.courseId) {
      const courseReviews = await prisma.review.findMany({
        where: { courseId: existingReview.courseId }
      });
      
      const averageRating = courseReviews.length > 0 
        ? courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length 
        : 0;
      
      await prisma.courses.update({
        where: { id: existingReview.courseId },
        data: {
          rating: averageRating,
          reviewCount: courseReviews.length
        }
      });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Mark review as helpful
router.post('/:id/helpful', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.update({
      where: { id },
      data: {
        helpfulCount: {
          increment: 1
        }
      }
    });

    res.json(review);
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({ error: 'Failed to mark review as helpful' });
  }
});

export default router;