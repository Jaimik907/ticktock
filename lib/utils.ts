import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getDateRangeBounds(
  range: string
): { from: Date; to: Date } | null {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  if (range === 'this_week') {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return { from: monday, to: sunday };
  }

  if (range === 'last_week') {
    const lastMonday = new Date(monday);
    lastMonday.setDate(monday.getDate() - 7);
    const lastSunday = new Date(monday);
    lastSunday.setDate(monday.getDate() - 1);
    return { from: lastMonday, to: lastSunday };
  }

  if (range === 'this_month') {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from, to };
  }

  return null;
}
