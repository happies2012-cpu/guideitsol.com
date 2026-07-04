import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Get all conversations for user
export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: Query from Prisma
    // const conversations = await prisma.conversation.findMany({
    //   where: { userId },
    //   orderBy: { createdAt: 'desc' },
    // });

    res.json({
      success: true,
      conversations: [],
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new conversation
export const createConversation = async (req: Request, res: Response) => {
  try {
    const { title, model = 'gpt-4', systemPrompt } = req.body;
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // TODO: Create in Prisma
    // const conversation = await prisma.conversation.create({
    //   data: {
    //     title,
    //     userId,
    //     model,
    //     systemPrompt,
    //   },
    // });

    res.status(201).json({
      success: true,
      conversation: {
        id: 'placeholder-id',
        title,
        model,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete conversation
export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: Delete from Prisma
    // await prisma.conversation.delete({
    //   where: { id, userId },
    // });

    res.json({ success: true, message: 'Conversation deleted' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  getConversations,
  createConversation,
  deleteConversation,
};
