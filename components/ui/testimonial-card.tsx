'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';

const TestimonialCard = ({
  className,
  quote,
  author,
  role,
  avatar,
}: {
  className?: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}) => (
  <Card className={cn('hover:shadow-lg transition-all duration-300', className)}>
    <CardHeader>
      <CardTitle className="text-4xl text-primary/20">"</CardTitle>
      <CardDescription className="text-base leading-relaxed">{quote}</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center gap-3 pt-0">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
        {avatar || author.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-sm">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export { TestimonialCard };
