
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-MR', {
    style: 'currency',
    currency: 'MRU',
  }).format(price)
}

export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Function to get similar products based on category/subcategory
export function getSimilarProducts(product: any, allProducts: any[], limit: number = 3): any[] {
  if (!product) return []
  
  return allProducts
    .filter(p => 
      p.id !== product.id && 
      (p.subCategory === product.subCategory || p.category === product.category)
    )
    .slice(0, limit)
}

// Function to format phone numbers for Mauritania
export function formatPhoneNumber(phoneNumber: string): string {
  // Mauritanian phone numbers are typically 8 digits
  if (phoneNumber.length === 8) {
    return `${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 4)} ${phoneNumber.substring(4, 6)} ${phoneNumber.substring(6, 8)}`
  }
  return phoneNumber
}

// Function to get Mauritanian cities
export const getMauritanianCities = (): string[] => {
  return [
    'نواكشوط',
    'نواذيبو',
    'كيفة',
    'روصو',
    'زويرات',
    'أطار',
    'تجكجة',
    'سيليبابي',
    'كيهيدي',
    'العيون',
    'أكجوجت',
    'ألاك'
  ]
}
