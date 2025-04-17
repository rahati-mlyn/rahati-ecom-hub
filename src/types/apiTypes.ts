
// API Response Types

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface AuthResponse {
  token: string;
  user: UserData;
  message?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderRequest {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    categoryId: string;
  }[];
  total: number;
  orderDate: string;
  shippingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod?: 'cash' | 'card' | 'bank';
}

export interface OrderResponse {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  userId: string;
}
