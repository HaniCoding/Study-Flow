'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { QuizGenerator } from '@/components/dashboard/quiz-generator';

export default function QuizPage() {
  return (
    <DashboardLayout>
      <QuizGenerator />
    </DashboardLayout>
  );
}
