import { NextResponse } from 'next/server';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const store = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
};

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'unknown';
}

export async function rateLimit(
  request: Request,
  config: Partial<RateLimitConfig> = {}
): Promise<NextResponse | null> {
  const { maxRequests, windowMs } = { ...DEFAULT_CONFIG, ...config };
  const ip = getClientIp(request);
  const now = Date.now();

  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (record.count >= maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)),
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  record.count++;
  return null;
}