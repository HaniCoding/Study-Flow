'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Calendar,
  MessageSquare,
  FileText,
  Brain,
  MoreVertical,
  Trash2,
  Eye,
} from 'lucide-react';
import { cn, formatRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';

const historyItems = [
  {
    id: '1',
    type: 'chat',
    title: 'Discussed Photosynthesis',
    preview: 'Explain how plants convert sunlight into energy...',
    date: new Date('2026-05-10'),
  },
  {
    id: '2',
    type: 'note',
    title: 'Created History Notes',
    preview: 'Industrial Revolution key dates and events...',
    date: new Date('2026-05-09'),
  },
  {
    id: '3',
    type: 'quiz',
    title: 'Math Quiz - Calculus',
    preview: 'Score: 85%, 5/5 questions answered',
    date: new Date('2026-05-08'),
  },
  {
    id: '4',
    type: 'chat',
    title: 'Python Programming Help',
    preview: 'How to reverse a string in Python...',
    date: new Date('2026-05-07'),
  },
  {
    id: '5',
    type: 'note',
    title: 'Biology - Cell Division',
    preview: 'Mitosis and meiosis comparison notes...',
    date: new Date('2026-05-06'),
  },
];

const typeIcons = {
  chat: MessageSquare,
  note: FileText,
  quiz: Brain,
};

const typeColors = {
  chat: 'text-blue-500 bg-blue-500/10',
  note: 'text-green-500 bg-green-500/10',
  quiz: 'text-purple-500 bg-purple-500/10',
};

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredHistory = historyItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground">Review your past learning activities</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'chat', 'note', 'quiz'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.map((item, index) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons];
            return (
              <Card key={item.id} className="hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', typeColors[item.type as keyof typeof typeColors])}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(item.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{item.preview}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info('View feature coming soon')}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.error('Item deleted')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No history found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start learning to see your history here'}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
