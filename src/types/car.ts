
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
  seats?: number;
  color?: string;
  createdAt: string;
  updatedAt: string;
}
