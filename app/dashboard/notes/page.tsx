'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { NotesManager } from '@/components/dashboard/notes-manager';

export default function NotesPage() {
  return (
    <DashboardLayout>
      <NotesManager />
    </DashboardLayout>
  );
}
