import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function GET(request: Request) {
  try {
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mockAnalytics = {
      totalMessages: 247,
      totalNotes: 42,
      totalQuizzes: 15,
      averageScore: 78,
      streak: 7,
      weeklyActivity: [
        { day: 'Mon', messages: 12, notes: 2 },
        { day: 'Tue', messages: 8, notes: 1 },
        { day: 'Wed', messages: 15, notes: 3 },
        { day: 'Thu', messages: 10, notes: 2 },
        { day: 'Fri', messages: 18, notes: 4 },
        { day: 'Sat', messages: 6, notes: 1 },
        { day: 'Sun', messages: 4, notes: 0 },
      ],
      topicBreakdown: [
        { topic: 'Mathematics', count: 45, percentage: 32 },
        { topic: 'Science', count: 38, percentage: 27 },
        { topic: 'History', count: 28, percentage: 20 },
        { topic: 'Language', count: 22, percentage: 16 },
        { topic: 'Other', count: 7, percentage: 5 },
      ],
    };

    return NextResponse.json({ analytics: mockAnalytics });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}