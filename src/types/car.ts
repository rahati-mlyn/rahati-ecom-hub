
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  type: 'rent' | 'sale';
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  description: string;
  image: string;
  city: string;
  contactPhone: string;
  ownerId?: string;
  createdAt: Date;
}
