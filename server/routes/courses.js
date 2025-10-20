import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all courses with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category, level, published } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { instructor: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category && category !== 'all') {
      where.categoryId = category;
    }

    if (level && level !== 'all') {
      where.level = level;
    }

    if (published === 'true') {
      where.isPublished = true;
    } else if (published === 'false') {
      where.isPublished = false;
    }

    const skip = (pageNum - 1) * limitNum;

    const courses = await prisma.courses.findMany({
      where,
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNum
    });

    const totalCount = await prisma.courses.count({ where });

    res.json({
      courses,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID with lessons
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.courses.findUnique({
      where: { id },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        lessons: {
          orderBy: {
            order: 'asc'
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
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create a new course
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, description, categoryId, level, duration, price, thumbnailUrl, videoUrl } = req.body;

    // Validate required fields
    if (!title || !description || !categoryId || !level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const course = await prisma.courses.create({
      data: {
        title,
        description,
        categoryId,
        level,
        duration: duration || '',
        price: price || 0,
        thumbnailUrl: thumbnailUrl || null,
        videoUrl: videoUrl || null,
        instructor: req.user.name,
        createdBy: req.user.id,
        isPublished: false
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, level, duration, price, thumbnailUrl, videoUrl, isPublished } = req.body;

    // Check if course exists
    const existingCourse = await prisma.courses.findUnique({
      where: { id }
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const course = await prisma.courses.update({
      where: { id },
      data: {
        title: title || existingCourse.title,
        description: description || existingCourse.description,
        categoryId: categoryId || existingCourse.categoryId,
        level: level || existingCourse.level,
        duration: duration !== undefined ? duration : existingCourse.duration,
        price: price !== undefined ? price : existingCourse.price,
        thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : existingCourse.thumbnailUrl,
        videoUrl: videoUrl !== undefined ? videoUrl : existingCourse.videoUrl,
        isPublished: isPublished !== undefined ? isPublished : existingCourse.isPublished
      },
      include: {
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const existingCourse = await prisma.courses.findUnique({
      where: { id }
    });

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete related data first
    await prisma.review.deleteMany({
      where: { courseId: id }
    });

    await prisma.enrollments.deleteMany({
      where: { courseId: id }
    });

    await prisma.courseLessons.deleteMany({
      where: { courseId: id }
    });

    await prisma.lesson.deleteMany({
      where: { courseId: id }
    });

    // Delete the course
    await prisma.courses.delete({
      where: { id }
    });

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Get course categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.courseCategories.findMany({
      orderBy: { name: 'asc' }
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create course category
router.post('/categories', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, icon, color } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = await prisma.courseCategories.create({
      data: {
        name,
        icon: icon || null,
        color: color || '#000000'
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Get lessons for a course
router.get('/:id/lessons', async (req, res) => {
  try {
    const { id } = req.params;

    const lessons = await prisma.lesson.findMany({
      where: { courseId: id },
      orderBy: { order: 'asc' }
    });

    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Create lesson for a course
router.post('/:id/lessons', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, order, duration, videoUrl } = req.body;

    // Validate required fields
    if (!title || order === undefined) {
      return res.status(400).json({ error: 'Title and order are required' });
    }

    // Check if course exists
    const course = await prisma.courses.findUnique({
      where: { id }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description: description || null,
        content: content || null,
        order,
        duration: duration || null,
        videoUrl: videoUrl || null,
        courseId: id
      }
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

// Update lesson
router.put('/lessons/:lessonId', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, description, content, order, duration, videoUrl } = req.body;

    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!existingLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title: title || existingLesson.title,
        description: description !== undefined ? description : existingLesson.description,
        content: content !== undefined ? content : existingLesson.content,
        order: order !== undefined ? order : existingLesson.order,
        duration: duration !== undefined ? duration : existingLesson.duration,
        videoUrl: videoUrl !== undefined ? videoUrl : existingLesson.videoUrl
      }
    });

    res.json(lesson);
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

// Delete lesson
router.delete('/lessons/:lessonId', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId }
    });

    if (!existingLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    await prisma.lesson.delete({
      where: { id: lessonId }
    });

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
});

export default router;