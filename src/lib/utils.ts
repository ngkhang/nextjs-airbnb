import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = (rawCurrency: number, percent?: number) => string;

export const formatCurrency: Props = (rawCurrency, percent = 100_000) => {
  const formatter = new Intl.NumberFormat('de-US', {
    trailingZeroDisplay: 'stripIfInteger',
  });

  return formatter.format(rawCurrency * percent);
};
