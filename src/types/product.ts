
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  subCategory?: string;
  city: string;
  storeId?: string;
  storeName?: string;
  createdAt: Date;
}
