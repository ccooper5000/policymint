// lib/utils.ts
import { type ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind-safe className combiner.
 * Merges conditional classes (clsx) and resolves Tailwind conflicts (twMerge).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
