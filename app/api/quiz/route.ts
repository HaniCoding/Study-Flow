import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/actions/ai';
import { quizSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { rateLimit } from '@/lib/utils/rate-limit';
import type { Question } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validation = quizSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    const { topic, type, count, difficulty, context } = validation.data;

    const prompt = `Generate ${count} ${difficulty} difficulty ${
      type === 'mixed'
        ? 'multiple choice and true/false'
        : type
    } questions about "${topic}".
${context ? `Context: ${context}` : ''}

Return ONLY a valid JSON array (no markdown, no code blocks):
[{
  "id": "1",
  "text": "question text",
  "options": ["option A", "option B", "option C", "option D"],
  "correctAnswer": 0,
  "explanation": "explanation"
}]

Make sure questions are educational, accurate, and varied.`;

    const response = await AIService.generateResponse([
      { role: 'user', content: prompt },
    ]);

    const questions = parseQuizResponse(response, count, topic);

    return NextResponse.json({ questions, topic, type, difficulty });
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to generate quiz',
      },
      { status: 500 }
    );
  }
}

function parseQuizResponse(
  response: string,
  count: number,
  topic: string
): Question[] {
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found');
    const parsed = JSON.parse(jsonMatch[0]);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((q: Partial<Question>, i: number) => ({
        id: String(q.id || i + 1),
        text: q.text || `Question about ${topic}`,
        options:
          Array.isArray(q.options) && q.options.length >= 2
            ? q.options
            : ['True', 'False'],
        correctAnswer:
          typeof q.correctAnswer === 'number' &&
          q.correctAnswer >= 0 &&
          q.correctAnswer < (q.options?.length || 2)
            ? q.correctAnswer
            : 0,
        explanation:
          q.explanation || 'The correct answer is listed above.',
      }));
    }
    throw new Error('Invalid quiz format');
  } catch {
    return generateFallbackQuestions(count, topic);
  }
}

function generateFallbackQuestions(
  count: number,
  topic: string
): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    text: `Which of the following best describes an aspect of "${topic}"?`,
    options: [
      `Key concept A about ${topic}`,
      `Key concept B about ${topic}`,
      `Key concept C about ${topic}`,
      `Key concept D about ${topic}`,
    ],
    correctAnswer: 0,
    explanation: `The correct answer describes an important aspect of ${topic}. Review your study materials for more details.`,
  }));
}