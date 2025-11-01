'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-neutral-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <motion.button
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15, delay: index * 0.005 }}
                className={cn(
                  'aspect-square rounded-xl p-2 transition-all duration-150',
                  'hover:bg-primary-50 hover:shadow-soft',
                  'flex flex-col items-center justify-center',
                  !isCurrentMonth && 'text-neutral-300',
                  isCurrentMonth && 'text-neutral-900',
                  isTodayDate && 'bg-primary-600 text-white hover:bg-primary-700'
                )}
              >
                <span className="text-sm font-medium">{format(day, 'd')}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-soft p-4 hover:shadow-soft-lg transition-all duration-150 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary-600">15</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-900">Team Dinner</h4>
                <p className="text-sm text-neutral-600">7:00 PM • Downtown</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-primary-200 border-2 border-white"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500">+2 more</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
