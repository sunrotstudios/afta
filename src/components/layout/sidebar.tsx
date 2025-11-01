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
    <div className="flex h-screen w-64 flex-col bg-white border-r-2 border-black">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b-2 border-black">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Howbout</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0 p-0">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-wide border-b-2 border-black transition-all duration-100',
                isActive
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t-2 border-black p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-100"
        >
          <Avatar name="John Doe" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase truncate">John Doe</p>
          </div>
          <Settings className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
