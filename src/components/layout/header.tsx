'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title: string;
  onNewEvent?: () => void;
}

export function Header({ title, onNewEvent }: HeaderProps) {
  return (
    <header className="h-20 border-b-2 border-black bg-white px-8">
      <div className="flex h-full items-center justify-between">
        {/* Title */}
        <h2 className="text-4xl font-bold uppercase tracking-tighter">{title}</h2>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-80">
            <Input
              type="search"
              placeholder="SEARCH"
              className="text-sm font-bold"
            />
          </div>

          {/* New Event Button */}
          {onNewEvent && (
            <Button onClick={onNewEvent} size="md">
              + New
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
