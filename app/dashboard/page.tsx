'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { motion } from 'framer-motion';
import { BookOpen, Brain, MessageSquare, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const recentActivity = [
  { type: 'chat', title: 'Discussed Photosynthesis', time: '2 hours ago' },
  { type: 'note', title: 'Created History Notes', time: '5 hours ago' },
  { type: 'quiz', title: 'Completed Math Quiz', time: '1 day ago' },
  { type: 'chat', title: 'Asked about Calculus', time: '2 days ago' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/chat">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <CardTitle className="text-lg">AI Chat</CardTitle>
                <CardDescription>Ask questions and get explanations</CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/notes">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle className="text-lg">Notes</CardTitle>
                <CardDescription>Manage your study materials</CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/quiz">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Quiz</CardTitle>
                <CardDescription>Test your knowledge</CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/analytics">
            <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Analytics</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Goal Progress</CardTitle>
              <CardDescription>Keep going! You're almost there</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Messages (10/day)</span>
                  <span className="text-sm text-muted-foreground">7/10</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Notes Created (5/day)</span>
                  <span className="text-sm text-muted-foreground">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Quizzes Taken (2/day)</span>
                  <span className="text-sm text-muted-foreground">1/2</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'chat' ? 'bg-blue-500/10' :
                      activity.type === 'note' ? 'bg-green-500/10' : 'bg-purple-500/10'
                    }`}>
                      {activity.type === 'chat' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'note' && <BookOpen className="h-4 w-4 text-green-500" />}
                      {activity.type === 'quiz' && <Brain className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-purple-500/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Ready to learn something new?</CardTitle>
                  <CardDescription>Start a new AI chat session to explore any topic</CardDescription>
                </div>
              </div>
              <Link href="/dashboard/chat">
                <Button className="gap-2">
                  Start Chatting <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
