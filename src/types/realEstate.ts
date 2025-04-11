
export interface RealEstate {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house' | 'villa' | 'land' | 'commercial';
  area: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  city: string;
  location: string;
  contactPhone: string;
  ownerId?: string;
  createdAt: Date;
}
