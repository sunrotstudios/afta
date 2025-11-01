import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a human-readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a time to a human-readable string
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Formats a date range
 */
export function formatDateRange(start: Date, end: Date): string {
  const startStr = formatDate(start);
  const endStr = formatDate(end);

  if (startStr === endStr) {
    return startStr;
  }

  return `${startStr} - ${endStr}`;
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Delay utility for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
