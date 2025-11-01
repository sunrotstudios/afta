'use client';

import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  onNewEvent?: () => void;
}

export function Header({ title, onNewEvent }: HeaderProps) {
  return (
    <header className="h-16 border-b border-neutral-200 bg-white px-6">
      <div className="flex h-full items-center justify-between">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 py-1.5 text-sm"
            />
          </div>

          {/* New Event Button */}
          {onNewEvent && (
            <Button onClick={onNewEvent} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Event
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
