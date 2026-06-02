import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message, Note, Quiz } from '@/types';

interface ChatStore {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  setChats: (chats: Chat[]) => void;
  setActiveChat: (chat: Chat | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  setLoading: (loading: boolean) => void;
}

interface NoteStore {
  notes: Note[];
  activeNote: Note | null;
  setNotes: (notes: Note[]) => void;
  setActiveNote: (note: Note | null) => void;
}

interface QuizStore {
  quizzes: Quiz[];
  activeQuiz: Quiz | null;
  setQuizzes: (quizzes: Quiz[]) => void;
  setActiveQuiz: (quiz: Quiz | null) => void;
}

interface UIStore {
  sidebarOpen: boolean;
  commandMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleCommandMenu: () => void;
  closeCommandMenu: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      activeChat: null,
      isLoading: false,
      setChats: (chats) => set({ chats }),
      setActiveChat: (chat) => set({ activeChat: chat }),
      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          ),
          activeChat:
            state.activeChat?.id === chatId
              ? {
                  ...state.activeChat,
                  messages: [...state.activeChat.messages, message],
                }
              : state.activeChat,
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'chat-store',
      partialize: (state) => ({
        chats: state.chats,
        activeChat: state.activeChat,
      }),
    }
  )
);

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      activeNote: null,
      setNotes: (notes) => set({ notes }),
      setActiveNote: (note) => set({ activeNote: note }),
    }),
    { name: 'note-store' }
  )
);

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quizzes: [],
      activeQuiz: null,
      setQuizzes: (quizzes) => set({ quizzes }),
      setActiveQuiz: (quiz) => set({ activeQuiz: quiz }),
    }),
    { name: 'quiz-store' }
  )
);

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: true,
  commandMenuOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleCommandMenu: () =>
    set((state) => ({ commandMenuOpen: !state.commandMenuOpen })),
  closeCommandMenu: () => set({ commandMenuOpen: false }),
}));