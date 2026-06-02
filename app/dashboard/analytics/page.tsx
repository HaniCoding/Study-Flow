'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { LearningAnalytics } from '@/components/dashboard/learning-analytics';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <LearningAnalytics />
    </DashboardLayout>
  );
}
