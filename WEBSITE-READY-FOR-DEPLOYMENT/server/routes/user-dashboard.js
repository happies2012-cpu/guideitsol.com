import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        linkedin: true,
        twitter: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { name, bio, location, website, linkedin, twitter } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || undefined,
        bio: bio !== undefined ? bio : undefined,
        location: location !== undefined ? location : undefined,
        website: website !== undefined ? website : undefined,
        linkedin: linkedin !== undefined ? linkedin : undefined,
        twitter: twitter !== undefined ? twitter : undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        bio: true,
        location: true,
        website: true,
        linkedin: true,
        twitter: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Get user's courses
router.get('/courses', async (req, res) => {
  try {
    const enrollments = await prisma.enrollments.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
          include: {
            category: true,
            creator: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    });

    const courses = enrollments.map(enrollment => ({
      ...enrollment.course,
      progress: enrollment.progress,
      completed: enrollment.completed,
      enrolledAt: enrollment.enrolledAt
    }));

    res.json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Failed to fetch user courses' });
  }
});

// Get user's AI tools
router.get('/ai-tools', async (req, res) => {
  try {
    const enrollments = await prisma.aIEnrollments.findMany({
      where: { 
        userId: req.user.id,
        isVerified: true
      },
      include: {
        tool: true
      },
      orderBy: { enrolledAt: 'desc' }
    });

    const tools = enrollments.map(enrollment => ({
      ...enrollment.tool,
      progress: enrollment.progress,
      completed: enrollment.completed,
      enrolledAt: enrollment.enrolledAt,
      isPaid: enrollment.isPaid,
      certificateIssued: enrollment.certificateIssued
    }));

    res.json(tools);
  } catch (error) {
    console.error('Error fetching user AI tools:', error);
    res.status(500).json({ error: 'Failed to fetch user AI tools' });
  }
});

// Get user's learning paths
router.get('/learning-paths', async (req, res) => {
  try {
    const enrollments = await prisma.learningPathEnrollment.findMany({
      where: { userId: req.user.id },
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
      },
      orderBy: { enrolledAt: 'desc' }
    });

    const paths = enrollments.map(enrollment => ({
      ...enrollment.path,
      progress: enrollment.progress,
      completed: enrollment.completed,
      enrolledAt: enrollment.enrolledAt,
      completedAt: enrollment.completedAt
    }));

    res.json(paths);
  } catch (error) {
    console.error('Error fetching user learning paths:', error);
    res.status(500).json({ error: 'Failed to fetch user learning paths' });
  }
});

// Get user's projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ error: 'Failed to fetch user projects' });
  }
});

// Create a new project
router.post('/projects', async (req, res) => {
  try {
    const { name, description, status, startDate, endDate, budget } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        status: status || 'draft',
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        budget: budget || null,
        userId: req.user.id
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update a project
router.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, startDate, endDate, budget } = req.body;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (existingProject.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name: name || existingProject.name,
        description: description !== undefined ? description : existingProject.description,
        status: status || existingProject.status,
        startDate: startDate ? new Date(startDate) : existingProject.startDate,
        endDate: endDate ? new Date(endDate) : existingProject.endDate,
        budget: budget !== undefined ? budget : existingProject.budget
      }
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete a project
router.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (existingProject.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Delete related files first
    await prisma.projectFile.deleteMany({
      where: { projectId: id }
    });

    // Delete the project
    await prisma.project.delete({
      where: { id }
    });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Get user's bookmarks
router.get('/bookmarks', async (req, res) => {
  try {
    const bookmarks = await prisma.userBookmark.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch user bookmarks' });
  }
});

// Create a new bookmark
router.post('/bookmarks', async (req, res) => {
  try {
    const { title, url, description } = req.body;

    // Validate required fields
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const bookmark = await prisma.userBookmark.create({
      data: {
        title,
        url,
        description: description || null,
        userId: req.user.id
      }
    });

    res.status(201).json(bookmark);
  } catch (error) {
    console.error('Error creating bookmark:', error);
    res.status(500).json({ error: 'Failed to create bookmark' });
  }
});

// Delete a bookmark
router.delete('/bookmarks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if bookmark exists and belongs to user
    const existingBookmark = await prisma.userBookmark.findUnique({
      where: { id }
    });

    if (!existingBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    if (existingBookmark.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.userBookmark.delete({
      where: { id }
    });

    res.json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

// Get user's notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await prisma.userNote.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(notes);
  } catch (error) {
    console.error('Error fetching user notes:', error);
    res.status(500).json({ error: 'Failed to fetch user notes' });
  }
});

// Create a new note
router.post('/notes', async (req, res) => {
  try {
    const { title, content, isPrivate } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const note = await prisma.userNote.create({
      data: {
        title,
        content: content || null,
        isPrivate: isPrivate !== undefined ? isPrivate : true,
        userId: req.user.id
      }
    });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Update a note
router.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isPrivate } = req.body;

    // Check if note exists and belongs to user
    const existingNote = await prisma.userNote.findUnique({
      where: { id }
    });

    if (!existingNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (existingNote.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const note = await prisma.userNote.update({
      where: { id },
      data: {
        title: title || existingNote.title,
        content: content !== undefined ? content : existingNote.content,
        isPrivate: isPrivate !== undefined ? isPrivate : existingNote.isPrivate
      }
    });

    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if note exists and belongs to user
    const existingNote = await prisma.userNote.findUnique({
      where: { id }
    });

    if (!existingNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (existingNote.userId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await prisma.userNote.delete({
      where: { id }
    });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Get dashboard statistics for the authenticated user
router.get('/stats', async (req, res) => {
  try {
    const [
      courseCount,
      aiToolCount,
      learningPathCount,
      projectCount,
      bookmarkCount,
      noteCount
    ] = await Promise.all([
      prisma.enrollments.count({ where: { userId: req.user.id } }),
      prisma.aIEnrollments.count({ 
        where: { 
          userId: req.user.id,
          isVerified: true
        }
      }),
      prisma.learningPathEnrollment.count({ where: { userId: req.user.id } }),
      prisma.project.count({ where: { userId: req.user.id } }),
      prisma.userBookmark.count({ where: { userId: req.user.id } }),
      prisma.userNote.count({ where: { userId: req.user.id } })
    ]);

    res.json({
      stats: {
        courses: courseCount,
        aiTools: aiToolCount,
        learningPaths: learningPathCount,
        projects: projectCount,
        bookmarks: bookmarkCount,
        notes: noteCount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;