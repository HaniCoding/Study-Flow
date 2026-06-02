'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Sparkles,
  Clock,
  MoreVertical,
  Trash2,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn, formatRelativeTime } from '@/lib/utils';
import { useNoteStore } from '@/lib/store';
import { toast } from 'sonner';
import type { Note } from '@/types';

const mockNotes: Note[] = [
  {
    id: '1',
    userId: '',
    title: 'Biology Notes - Cell Division',
    content: 'Mitosis and meiosis are two types of cell division...',
    tags: ['Biology', 'Science'],
    isPublic: false,
    createdAt: new Date('2026-05-10'),
    updatedAt: new Date('2026-05-10'),
  },
  {
    id: '2',
    userId: '',
    title: 'History - Industrial Revolution',
    content: 'The Industrial Revolution was a period of major industrialization...',
    tags: ['History', 'Social Studies'],
    isPublic: false,
    createdAt: new Date('2026-05-09'),
    updatedAt: new Date('2026-05-09'),
  },
  {
    id: '3',
    userId: '',
    title: 'Math Formulas - Calculus',
    content: 'Key calculus formulas including derivatives and integrals...',
    tags: ['Mathematics', 'Formulas'],
    isPublic: false,
    createdAt: new Date('2026-05-08'),
    updatedAt: new Date('2026-05-08'),
  },
];

const popularTags = [
  'All',
  'Biology',
  'Mathematics',
  'History',
  'Physics',
  'Chemistry',
  'Language',
];

export function NotesManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { notes, setNotes } = useNoteStore();

  const allNotes = notes.length > 0 ? notes : mockNotes;

  const filteredNotes = allNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === 'All' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleAISummarize = useCallback(async () => {
    if (!newNoteContent) return;
    setIsProcessing(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNoteContent, action: 'summarize' }),
      });
      if (!response.ok) throw new Error('Summarization failed');
      const data = await response.json();
      setNewNoteContent(data.response || newNoteContent);
    } catch (error) {
      console.error('Summarize error:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [newNoteContent]);

  const handleCreateNote = useCallback(() => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const newNote: Note = {
      id: crypto.randomUUID(),
      userId: '',
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      tags: [],
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([newNote, ...allNotes]);
    setIsCreateOpen(false);
    setNewNoteTitle('');
    setNewNoteContent('');
  }, [newNoteTitle, newNoteContent, allNotes, setNotes]);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setIsCreateOpen(open);
    if (!open) {
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <p className="text-muted-foreground">Manage and organize your study notes</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Note
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="Search notes"
          />
        </div>
      </div>

      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        role="tablist"
        aria-label="Filter by tag"
      >
        {popularTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(tag)}
            className="flex-shrink-0"
            role="tab"
            aria-selected={selectedTag === tag}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{note.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatRelativeTime(note.createdAt)}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info('Edit feature coming soon')}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.error('Note deleted')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {note.content}
                </CardDescription>
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No notes found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedTag !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Create your first note to get started'}
          </p>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Note
          </Button>
        </div>
      )}

      <Dialog open={isCreateOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Create a new note and use AI to enhance it
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label
                htmlFor="note-title"
                className="text-sm font-medium mb-2 block"
              >
                Title
              </label>
              <Input
                id="note-title"
                placeholder="Enter note title..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="note-content" className="text-sm font-medium">
                  Content
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAISummarize}
                  disabled={!newNoteContent || isProcessing}
                  className="gap-2"
                >
                  <Sparkles className="h-3 w-3" />
                  {isProcessing ? 'Processing...' : 'AI Summarize'}
                </Button>
              </div>
              <Textarea
                id="note-content"
                placeholder="Paste your notes or content here..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateNote}
              disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
            >
              Create Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}