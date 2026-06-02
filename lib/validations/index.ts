import * as z from 'zod';

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(10000, 'Message too long'),
  chatId: z.string().optional(),
});

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required').max(50000, 'Content too long'),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

export const quizSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(500, 'Topic too long'),
  type: z.enum(['mcq', 'true-false', 'mixed']),
  count: z.number().min(1).max(50),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  context: z.string().max(10000).optional(),
});

export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string().min(2).max(5),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    weekly: z.boolean(),
  }),
  privacy: z.object({
    shareAnalytics: z.boolean(),
    saveHistory: z.boolean(),
  }),
});

export const chatSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  model: z.enum(['groq', 'gemini', 'openrouter']).optional(),
});
