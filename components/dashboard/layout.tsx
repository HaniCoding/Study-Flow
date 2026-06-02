'use client';

import React, { Suspense } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandMenu } from '@/components/shared/command-menu';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardFallback() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-4 lg:p-6">
          <Suspense fallback={<DashboardFallback />}>{children}</Suspense>
        </main>
      </div>
      <CommandMenu />
    </div>
  );
}