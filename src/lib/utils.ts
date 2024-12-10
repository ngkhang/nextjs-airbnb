import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
