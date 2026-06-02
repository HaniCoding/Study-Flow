import { NextRequest } from 'next/server';
import { AIService } from '@/lib/actions/ai';
import { auth } from '@clerk/nextjs/server';
import { rateLimit } from '@/lib/utils/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { messages, model = 'groq' } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: 'Too many messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoder = new TextEncoder();
    let streamClosed = false;

    const safeClose = (controller: ReadableStreamDefaultController) => {
      if (!streamClosed) {
        streamClosed = true;
        try {
          controller.close();
        } catch {
          // Already closed
        }
      }
    };

    const stream = new ReadableStream({
      async start(controller) {
        try {
          await AIService.streamResponse(
            messages,
            (chunk: string) => {
              if (!streamClosed) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`
                  )
                );
              }
            },
            () => {
              if (!streamClosed) {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                safeClose(controller);
              }
            },
            model
          );
        } catch (error) {
          if (!streamClosed) {
            const errMsg = error instanceof Error ? error.message : 'Stream failed';
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: errMsg })}\n\n`)
            );
            safeClose(controller);
          }
        } finally {
          safeClose(controller);
        }
      },
      cancel() {
        streamClosed = true;
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to start stream',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}