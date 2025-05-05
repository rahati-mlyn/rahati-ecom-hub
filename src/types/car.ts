
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image: string;
  description: string;
  type: 'rent' | 'sale';
  transmission: string;
  city: string;
  contactPhone: string;
  fuelType?: string;
  seats?: number; // Adding this optional field to fix the error
  color?: string;
  createdAt: string;
  updatedAt: string;
}
