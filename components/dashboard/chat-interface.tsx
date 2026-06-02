'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Copy, Check, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@/lib/hooks/useChat';
import type { Message } from '@/types';

const suggestedQuestions = [
  { icon: '📚', text: 'Explain photosynthesis in simple terms' },
  { icon: '🔢', text: 'Solve this equation: 2x + 5 = 15' },
  { icon: '🌍', text: 'What are the main causes of World War I?' },
  { icon: '💻', text: 'Write a Python function to reverse a string' },
];

export function ChatInterface() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const message = input.trim();
      if (!message || isLoading) return;
      setInput('');
      await sendMessage(message);
    },
    [input, isLoading, sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleSuggestedQuestion = useCallback(
    async (question: string) => {
      setInput('');
      await sendMessage(question);
    },
    [sendMessage]
  );

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleClear = useCallback(() => {
    clearMessages();
    setInput('');
  }, [clearMessages]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Study Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Powered by advanced AI models</p>
              </div>
            </div>
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What would you like to learn?</h3>
                <p className="text-muted-foreground max-w-md">
                  Ask questions, get explanations, generate summaries, or create quizzes from
                  your notes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.text}
                    onClick={() => handleSuggestedQuestion(q.text)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all text-left"
                    disabled={isLoading}
                  >
                    <span className="text-2xl">{q.icon}</span>
                    <span className="text-sm font-medium">{q.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map(
                (message: Message) =>
                  message.content && (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'flex gap-3',
                        message.role === 'assistant' ? 'justify-start' : 'justify-end'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'rounded-2xl px-4 py-3 max-w-[80%] prose prose-sm dark:prose-invert break-words',
                          message.role === 'assistant'
                            ? 'bg-muted rounded-tl-sm'
                            : 'bg-primary text-primary-foreground rounded-tr-sm'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                          >
                            {message.content}
                          </ReactMarkdown>
                          {message.role === 'assistant' && (
                            <button
                              onClick={() => copyToClipboard(message.content, message.id)}
                              className="flex-shrink-0 p-1 hover:bg-accent rounded mt-1"
                              aria-label="Copy message"
                            >
                              {copiedId === message.id ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-semibold">U</span>
                        </div>
                      )}
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-white animate-pulse" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm"
              role="alert"
            >
              {error}
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        <div className="border-t p-4 bg-muted/30">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your studies..."
              className="min-h-[44px] max-h-[200px] resize-none bg-background"
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}