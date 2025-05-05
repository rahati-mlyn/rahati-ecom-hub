
export interface Store {
  id: string;
  name: string;
  description: string;
  type: 'store' | 'restaurant' | 'realestate' | 'car';
  image: string;
  city: string;
  contactPhone: string;
  ownerId?: string;
  createdAt: Date;
  stats: {
    views: number;
    orders: number;
    rating: number;
    ratingCount: number;
  };
}
