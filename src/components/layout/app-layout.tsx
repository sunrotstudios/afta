'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
  onNewEvent?: () => void;
}

export function AppLayout({ children, title, onNewEvent }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} onNewEvent={onNewEvent} />
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
