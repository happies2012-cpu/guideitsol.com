import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '../middleware/auth';

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
];

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // TODO: Implement with Prisma
    // const user = await prisma.user.findUnique({
    //   where: { email },
    // });
    //
    // if (!user) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }
    //
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // Mock response for now
    const userId = 'user-123';
    const accessToken = generateToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: userId,
        email,
        name: 'User Name',
        role: 'USER',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default login;
