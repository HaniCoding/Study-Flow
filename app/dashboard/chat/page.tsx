'use client';

import { DashboardLayout } from '@/components/dashboard/layout';
import { ChatInterface } from '@/components/dashboard/chat-interface';

export default function ChatPage() {
  return (
    <DashboardLayout>
      <ChatInterface />
    </DashboardLayout>
  );
}
