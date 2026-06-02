export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chats: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          model: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          model?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          model?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          chat_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          role: 'user' | 'assistant';
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          role?: 'user' | 'assistant';
          content?: string;
          created_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          tags: string[];
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          tags?: string[];
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          tags?: string[];
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          user_id: string;
          topic: string;
          type: 'mcq' | 'true-false' | 'mixed';
          difficulty: 'easy' | 'medium' | 'hard';
          questions: Json;
          created_at: string;
          completed_at: string | null;
          score: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          topic: string;
          type: 'mcq' | 'true-false' | 'mixed';
          difficulty: 'easy' | 'medium' | 'hard';
          questions: Json;
          created_at?: string;
          completed_at?: string | null;
          score?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          topic?: string;
          type?: 'mcq' | 'true-false' | 'mixed';
          difficulty?: 'easy' | 'medium' | 'hard';
          questions?: Json;
          created_at?: string;
          completed_at?: string | null;
          score?: number | null;
        };
      };
      analytics: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          messages_count: number;
          notes_count: number;
          quizzes_count: number;
          average_score: number | null;
          total_time: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          messages_count?: number;
          notes_count?: number;
          quizzes_count?: number;
          average_score?: number | null;
          total_time?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          messages_count?: number;
          notes_count?: number;
          quizzes_count?: number;
          average_score?: number | null;
          total_time?: number;
        };
      };
      settings: {
        Row: {
          id: string;
          user_id: string;
          theme: 'light' | 'dark' | 'system';
          language: string;
          notifications: Json;
          privacy: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          theme?: 'light' | 'dark' | 'system';
          language?: string;
          notifications?: Json;
          privacy?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          theme?: 'light' | 'dark' | 'system';
          language?: string;
          notifications?: Json;
          privacy?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
