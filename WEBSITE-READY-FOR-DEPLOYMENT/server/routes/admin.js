import express from 'express';
import prisma from '../db/prisma.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Middleware to ensure only admins can access these routes
router.use(authenticate, authorize('ADMIN', 'SUPER_ADMIN'));

// Get all users with pagination and filtering
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (role && role !== 'all') {
      where.role = role;
    }

    const skip = (pageNum - 1) * limitNum;

    const users = await prisma.user.findMany({
      where,
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
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNum
    });

    const totalCount = await prisma.user.count({ where });

    res.json({
      users,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limitNum),
        totalCount,
        hasNext: pageNum < Math.ceil(totalCount / limitNum),
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID with detailed information
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        userStats: true,
        affiliate: true,
        userVerification: true,
        security: true,
        projects: true,
        blogPosts: true,
        courses: true,
        aiTools: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['USER', 'ADMIN', 'SUPER_ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Prevent users from changing their own role to a lower one
    if (req.user.id === id && role !== 'SUPER_ADMIN' && req.user.role === 'SUPER_ADMIN') {
      return res.status(400).json({ error: 'Cannot downgrade super admin role' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role }
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Delete user (soft delete by changing role to DELETED)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent users from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role: 'DELETED' }
    });

    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Invite user
router.post('/users/invite', async (req, res) => {
  try {
    const { email, name, role = 'USER' } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate role
    const validRoles = ['USER', 'ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create invited user with temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = tempPassword; // In a real app, you would hash this

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role
      }
    });

    // In a real app, you would send an email invitation here
    // For now, we'll just return the temporary password
    res.status(201).json({
      message: 'User invited successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      tempPassword
    });
  } catch (error) {
    console.error('Error inviting user:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalAiTools,
      totalProjects,
      totalBlogPosts,
      totalAffiliates,
      recentUsers,
      recentCourses
    ] = await Promise.all([
      prisma.user.count(),
      prisma.courses.count(),
      prisma.aITool.count(),
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.affiliate.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true }
      }),
      prisma.courses.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, createdAt: true }
      })
    ]);

    res.json({
      stats: {
        totalUsers,
        totalCourses,
        totalAiTools,
        totalProjects,
        totalBlogPosts,
        totalAffiliates
      },
      recentActivity: {
        recentUsers,
        recentCourses
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;