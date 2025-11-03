'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    <div className="w-full space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-charcoal-950 tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-charcoal-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Days of Week */}
        <div className="grid grid-cols-7 border-b border-charcoal-100 bg-charcoal-50">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-charcoal-600 py-3"
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
              <motion.button
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.005,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'aspect-square p-2 transition-all duration-200 ease-smooth',
                  'flex flex-col items-center justify-center',
                  'hover:bg-charcoal-50',
                  'border-r border-b border-charcoal-100',
                  'last:border-r-0',
                  index % 7 === 6 && 'border-r-0',
                  index >= days.length - 7 && 'border-b-0',
                  !isCurrentMonth && 'text-charcoal-300',
                  isCurrentMonth && 'text-charcoal-900',
                  isTodayDate && 'bg-accent-600 text-white hover:bg-accent-700 rounded-xl m-0.5'
                )}
              >
                <span className={cn('text-sm font-medium', isTodayDate && 'font-semibold')}>
                  {format(day, 'd')}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-charcoal-950 mb-4 tracking-tight">
          Upcoming Events
        </h3>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white border border-charcoal-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-smooth cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-semibold text-white">15</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-charcoal-950 mb-1">Team Dinner</h4>
                  <p className="text-sm text-charcoal-600 mb-3">7:00 PM • Downtown</p>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} name={`Person ${i}`} size="sm" />
                      ))}
                    </div>
                    <Badge variant="accent">5 Going</Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
