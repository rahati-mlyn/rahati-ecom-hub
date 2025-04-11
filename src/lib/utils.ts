
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Format price to local currency (Mauritanian Ouguiya) with less prominent symbol
export function formatPrice(price: number): string {
  // Use a custom formatter to style the currency symbol
  return new Intl.NumberFormat('ar-MR', {
    style: 'currency',
    currency: 'MRU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('MRU', `<span class="text-gray-400">أ.م</span>`);
}
