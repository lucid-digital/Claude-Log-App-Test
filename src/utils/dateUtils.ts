export function ensureDate(date: Date | string): Date {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
}

export function formatDateForAPI(date: Date | string): string {
  const dateObject = ensureDate(date);
  return dateObject.toISOString();
}