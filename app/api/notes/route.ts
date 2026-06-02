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

    const { text, action } = await request.json();

    if (!text || typeof text !== 'string' || text.length > 10000) {
      return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
    }

    const sanitizedText = text.slice(0, 10000);

    let prompt = '';

    switch (action) {
      case 'summarize':
        prompt = `Summarize the following text concisely, capturing the main points:\n\n${sanitizedText}`;
        break;
      case 'translate-hindi':
        prompt = `Translate the following text to Hindi:\n\n${sanitizedText}`;
        break;
      case 'explain':
        prompt = `Explain the following concept in simple terms:\n\n${sanitizedText}`;
        break;
      case 'flashcards':
        prompt = `Create flashcards from the following content. Format as JSON array:\n[{"front": "question", "back": "answer"}]\n\n${sanitizedText}`;
        break;
      default:
        prompt = `Process and improve the following text:\n\n${sanitizedText}`;
    }

    const response = await AIService.generateResponse([
      { role: 'user', content: prompt },
    ]);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Notes API Error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to process text',
      },
      { status: 500 }
    );
  }
}