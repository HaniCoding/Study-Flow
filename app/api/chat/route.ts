import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/actions/ai';
import { auth } from '@clerk/nextjs/server';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, model = 'groq' } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    if (messages.length > 50) {
      return NextResponse.json({ error: 'Too many messages' }, { status: 400 });
    }

    const response = await AIService.generateResponse(messages, model);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to generate response',
      },
      { status: 500 }
    );
  }
}