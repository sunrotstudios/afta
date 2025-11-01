'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="w-full space-y-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold uppercase tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            ←
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            →
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border-2 border-black p-0">
        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b-2 border-black">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold py-4 border-r-2 border-black last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <button
                key={day.toISOString()}
                className={cn(
                  'aspect-square p-3 border-r-2 border-b-2 border-black transition-all duration-100',
                  'last:border-r-0',
                  index >= days.length - 7 && 'border-b-0',
                  'hover:bg-gray-100',
                  'flex flex-col items-center justify-center',
                  !isCurrentMonth && 'text-gray-300 bg-gray-50',
                  isCurrentMonth && 'text-black',
                  isTodayDate && 'bg-black text-white hover:bg-gray-900'
                )}
              >
                <span className="text-lg font-bold">{format(day, 'd')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          <div className="bg-white border-2 border-black p-6 hover:shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-100 cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-black flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">15</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold uppercase tracking-wide mb-1">Team Dinner</h4>
                <p className="text-sm text-gray-600 mb-3">7:00 PM • Downtown</p>
                <div className="flex items-center gap-2">
                  <Badge variant="solid">5 Going</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
