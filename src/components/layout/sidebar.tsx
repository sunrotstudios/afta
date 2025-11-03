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
    <div className="flex h-screen w-64 flex-col bg-white border-r border-charcoal-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-charcoal-100">
        <h1 className="text-xl font-semibold tracking-tight">afta</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ease-smooth',
                isActive
                  ? 'bg-accent-600 text-white shadow-sm'
                  : 'text-charcoal-700 hover:bg-charcoal-100 hover:text-charcoal-900 active:scale-95'
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-charcoal-100 p-3">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-charcoal-100 transition-all duration-200 ease-smooth active:scale-95"
        >
          <Avatar name="John Doe" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal-900 truncate">John Doe</p>
            <p className="text-xs text-charcoal-500 truncate">john@example.com</p>
          </div>
          <Settings className="h-4 w-4 text-charcoal-400" />
        </Link>
      </div>
    </div>
  );
}
