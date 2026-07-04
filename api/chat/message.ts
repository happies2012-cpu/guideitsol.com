import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Middleware for validation
export const validateMessage = [
  body('conversationId').notEmpty().withMessage('Conversation ID is required'),
  body('content').notEmpty().trim().withMessage('Message content is required'),
];

// Handle chat message
export const handleMessage = async (req: Request, res: Response) => {
  try {
    // Check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { conversationId, content } = req.body;
    const userId = (req as any).userId; // From auth middleware

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: Integrate with Prisma to save message
    // const message = await prisma.message.create({
    //   data: {
    //     conversationId,
    //     role: 'USER',
    //     content,
    //   },
    // });

    // TODO: Call AI API (OpenAI, Anthropic, etc.)
    // const aiResponse = await callAIAPI(content);

    // TODO: Save AI response to database
    // const aiMessage = await prisma.message.create({
    //   data: {
    //     conversationId,
    //     role: 'ASSISTANT',
    //     content: aiResponse,
    //   },
    // });

    res.json({
      success: true,
      message: {
        role: 'user',
        content,
      },
      response: {
        role: 'assistant',
        content: 'AI response placeholder',
      },
    });
  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handleMessage;
