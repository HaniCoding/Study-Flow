import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/components/shared/query-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'StudyFlow AI - AI-Powered Learning Platform',
    template: '%s | StudyFlow AI',
  },
  description:
    'Transform your learning journey with AI-powered notes, quizzes, and personalized study assistance.',
  keywords: [
    'AI',
    'learning',
    'studying',
    'notes',
    'quiz',
    'education',
    'GPT',
    'ChatGPT',
    'artificial intelligence',
  ],
  authors: [{ name: 'StudyFlow AI' }],
  creator: 'StudyFlow AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://studyflow.ai',
    siteName: 'StudyFlow AI',
    title: 'StudyFlow AI - AI-Powered Learning Platform',
    description:
      'Transform your learning journey with AI-powered notes, quizzes, and personalized study assistance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyFlow AI - AI-Powered Learning Platform',
    description:
      'Transform your learning journey with AI-powered notes, quizzes, and personalized study assistance.',
    creator: '@studyflowai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}