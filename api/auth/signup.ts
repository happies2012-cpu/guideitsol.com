import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '../middleware/auth';

export const validateSignup = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').notEmpty().trim(),
];

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    // TODO: Implement with Prisma
    // Check if user already exists
    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    // });
    //
    // if (existingUser) {
    //   return res.status(400).json({ error: 'User already exists' });
    // }
    //
    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    //
    // Create user
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     name,
    //   },
    // });

    // Mock response
    const userId = 'user-new-123';
    const accessToken = generateToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email,
        name,
        role: 'USER',
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default signup;
