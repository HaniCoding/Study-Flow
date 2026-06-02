export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  model: 'groq' | 'gemini' | 'openrouter';
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  userId: string;
  topic: string;
  type: 'mcq' | 'true-false' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  createdAt: Date;
  completedAt?: Date;
  score?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Analytics {
  id: string;
  userId: string;
  date: Date;
  messagesCount: number;
  notesCount: number;
  quizzesCount: number;
  averageScore?: number;
  totalTime: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    saveHistory: boolean;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StreamingChunk {
  type: 'token' | 'error' | 'done';
  content?: string;
  error?: string;
}
