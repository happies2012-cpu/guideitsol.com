import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Password validation (min 8 chars, uppercase, lowercase, number)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number');

// User schemas
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Conversation schemas
export const createConversationSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  model: z.enum(['gpt-4', 'gpt-3.5-turbo', 'claude-2']),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(4000),
  role: z.enum(['user', 'assistant']),
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'text/plain', 'application/json'].includes(file.type),
      'Only PDF, TXT, and JSON files are allowed'
    ),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

// Type exports
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// Validation utilities
export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  try {
    passwordSchema.parse(password);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, errors: error.errors.map((e) => e.message) };
    }
    return { valid: false, errors: ['Unknown validation error'] };
  }
}
