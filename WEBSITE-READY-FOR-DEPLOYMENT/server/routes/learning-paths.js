import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all learning paths with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, isPublished, search, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    
    const where = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (difficulty && difficulty !== 'all') {
      where.difficulty = difficulty;
    }

    if (isPublished === 'true') {
      where.isPublished = true;
    } else if (isPublished === 'false') {
      where.isPublished = false;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Calculate pagination
    const skip = (pageNum - 1) * limitNum;
    
    const paths = await prisma.learningPath.findMany({
      where,
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: limitNum
    });

    // Get total count for pagination
    const totalCount = await prisma.learningPath.count({ where });

    res.json({
      data: paths,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount: totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    res.status(500).json({ error: 'Failed to fetch learning paths' });
  }
});

// Get learning path by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const path = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    res.json(path);
  } catch (error) {
    console.error('Error fetching learning path:', error);
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
});

// Get learning path categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.learningPath.findMany({
      select: { category: true },
      distinct: ['category']
    });

    res.json(categories.map(c => c.category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get learning path difficulties
router.get('/difficulties', async (req, res) => {
  try {
    const difficulties = await prisma.learningPath.findMany({
      select: { difficulty: true },
      distinct: ['difficulty']
    });

    res.json(difficulties.map(d => d.difficulty));
  } catch (error) {
    console.error('Error fetching difficulties:', error);
    res.status(500).json({ error: 'Failed to fetch difficulties' });
  }
});

// Create a new learning path (Admin/Super Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, description, category, difficulty, duration, thumbnail, isPublished, steps } = req.body;

    // Validate required fields
    if (!title || !description || !category || !difficulty || !duration) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, category, difficulty, duration' 
      });
    }

    // Create learning path
    const path = await prisma.learningPath.create({
      data: {
        title,
        description,
        category,
        difficulty,
        duration,
        thumbnail: thumbnail || null,
        isPublished: isPublished || false
      }
    });

    // Create steps if provided
    if (steps && Array.isArray(steps)) {
      const stepPromises = steps.map((step, index) => 
        prisma.learningPathStep.create({
          data: {
            pathId: path.id,
            title: step.title,
            description: step.description,
            order: index + 1,
            contentType: step.contentType || 'article',
            contentUrl: step.contentUrl || null,
            duration: step.duration || 0,
            isMandatory: step.isMandatory !== undefined ? step.isMandatory : true
          }
        })
      );
      
      await Promise.all(stepPromises);
    }

    // Fetch complete path with steps
    const completePath = await prisma.learningPath.findUnique({
      where: { id: path.id },
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    res.status(201).json(completePath);
  } catch (error) {
    console.error('Error creating learning path:', error);
    res.status(500).json({ error: 'Failed to create learning path' });
  }
});

// Update learning path (Admin/Super Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, difficulty, duration, thumbnail, isPublished, steps } = req.body;

    // Update learning path
    const path = await prisma.learningPath.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        category: category || undefined,
        difficulty: difficulty || undefined,
        duration: duration || undefined,
        thumbnail: thumbnail !== undefined ? thumbnail : undefined,
        isPublished: isPublished !== undefined ? isPublished : undefined
      }
    });

    // Update steps if provided
    if (steps && Array.isArray(steps)) {
      // Delete existing steps
      await prisma.learningPathStep.deleteMany({
        where: { pathId: id }
      });
      
      // Create new steps
      const stepPromises = steps.map((step, index) => 
        prisma.learningPathStep.create({
          data: {
            pathId: id,
            title: step.title,
            description: step.description,
            order: index + 1,
            contentType: step.contentType || 'article',
            contentUrl: step.contentUrl || null,
            duration: step.duration || 0,
            isMandatory: step.isMandatory !== undefined ? step.isMandatory : true
          }
        })
      );
      
      await Promise.all(stepPromises);
    }

    // Fetch complete path with steps
    const completePath = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    res.json(completePath);
  } catch (error) {
    console.error('Error updating learning path:', error);
    res.status(500).json({ error: 'Failed to update learning path' });
  }
});

// Delete learning path (Super Admin only)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated steps first
    await prisma.learningPathStep.deleteMany({
      where: { pathId: id }
    });

    // Delete associated enrollments
    await prisma.learningPathEnrollment.deleteMany({
      where: { pathId: id }
    });

    // Delete the learning path
    await prisma.learningPath.delete({
      where: { id }
    });

    res.json({ message: 'Learning path deleted successfully' });
  } catch (error) {
    console.error('Error deleting learning path:', error);
    res.status(500).json({ error: 'Failed to delete learning path' });
  }
});

// Learning Path Enrollment Routes

// Enroll in a learning path
router.post('/:id/enroll', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if path exists
    const path = await prisma.learningPath.findUnique({
      where: { id }
    });

    if (!path) {
      return res.status(404).json({ error: 'Learning path not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.learningPathEnrollment.findUnique({
      where: {
        userId_pathId: {
          userId,
          pathId: id
        }
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this learning path' });
    }

    // Create enrollment
    const enrollment = await prisma.learningPathEnrollment.create({
      data: {
        userId,
        pathId: id,
        progress: 0,
        completed: false
      }
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Error enrolling in learning path:', error);
    res.status(500).json({ error: 'Failed to enroll in learning path' });
  }
});

// Get user's enrollment in a learning path
router.get('/:id/enrollment', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const enrollment = await prisma.learningPathEnrollment.findUnique({
      where: {
        userId_pathId: {
          userId,
          pathId: id
        }
      },
      include: {
        path: {
          include: {
            steps: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Not enrolled in this learning path' });
    }

    res.json(enrollment);
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment' });
  }
});

// Update enrollment progress
router.put('/:id/enrollment/progress', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { stepId, completed } = req.body;
    const userId = req.user.id;

    // Get enrollment
    const enrollment = await prisma.learningPathEnrollment.findUnique({
      where: {
        userId_pathId: {
          userId,
          pathId: id
        }
      }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Not enrolled in this learning path' });
    }

    // Update step completion status if provided
    if (stepId !== undefined && completed !== undefined) {
      // In a real implementation, you might want to track step completion
      // For now, we'll just update the overall progress
    }

    // Calculate new progress (simplified - in a real app you'd track individual steps)
    const path = await prisma.learningPath.findUnique({
      where: { id },
      include: { steps: true }
    });

    const totalSteps = path.steps.length;
    const completedSteps = completed ? Math.min(enrollment.progress + 1, totalSteps) : enrollment.progress;
    const progress = Math.round((completedSteps / totalSteps) * 100);
    const isCompleted = progress === 100;

    // Update enrollment
    const updatedEnrollment = await prisma.learningPathEnrollment.update({
      where: {
        userId_pathId: {
          userId,
          pathId: id
        }
      },
      data: {
        progress: completedSteps,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined
      }
    });

    res.json(updatedEnrollment);
  } catch (error) {
    console.error('Error updating enrollment progress:', error);
    res.status(500).json({ error: 'Failed to update enrollment progress' });
  }
});

export default router;