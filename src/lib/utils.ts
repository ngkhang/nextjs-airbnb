/* eslint-disable no-undefined */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parse, isValid, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert currency from USD to VND
 *
 * @param {number} usd - The currency is USD unit
 * @param {number} exchangeRate - Description
 * @return {string} The string has VND currency format
 */
export const formatCurrency = (usd: number, exchangeRate: number = 24_000): string => {
  const formatter = new Intl.NumberFormat('en-US', {});

  return formatter.format(usd * exchangeRate);
};

// Comprehensive birthday parsing utility
// FIXME: Format: Output = Input - 1 Day
export const parseBirthday = (birthday: string | Date | null | undefined): Date | undefined => {
  // Handle null, undefined, or empty string
  if (!birthday || birthday === '' || birthday === 'Invalid Date') {
    return undefined;
  }

  // If already a Date object, return it if valid
  if (birthday instanceof Date) {
    return isValid(birthday) ? birthday : undefined;
  }

  // Try parsing different date formats
  const formats = [
    // DD/MM/YYYY format (your local format)
    () => parse(birthday, 'dd/MM/yyyy', new Date()),

    // ISO 8601 format
    () => parseISO(birthday),

    // Attempt to create Date object directly
    () => new Date(birthday),
  ];

  for (const parseFunc of formats) {
    try {
      const parsed = parseFunc();
      if (isValid(parsed)) {
        return parsed;
      }
    } catch {
      continue;
    }
  }

  // If no valid date found
  return undefined;
};

// Utility for formatting display
export const formatBirthday = (birthday: Date | string | null | undefined): string => {
  const parsed = parseBirthday(birthday);
  return parsed ? format(parsed, 'dd/MM/yyyy') : 'Not specified';
};
