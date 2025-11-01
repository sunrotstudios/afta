'use client';

import { Calendar, MessageCircle, List, Users, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';

const navigation = [
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageCircle },
  { name: 'Bucket List', href: '/bucket-list', icon: List },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Activity', href: '/activity', icon: Bell },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-neutral-50 border-r border-neutral-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-neutral-200">
        <h1 className="text-xl font-bold text-neutral-900">Howbout</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary-600 text-white shadow-soft'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-200 p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-neutral-100 transition-all duration-150"
        >
          <Avatar name="John Doe" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">John Doe</p>
            <p className="text-xs text-neutral-500 truncate">john@example.com</p>
          </div>
          <Settings className="h-4 w-4 text-neutral-400" />
        </Link>
      </div>
    </div>
  );
}
