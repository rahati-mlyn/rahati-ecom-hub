
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
  role: 'admin' | 'user' | 'store_owner';
  avatar?: string;
  storeId?: string;
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
    storeId: string;
  }[];
  total: number;
  orderDate: string;
  userId: string;
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
    storeId: string;
    store?: {
      id: string;
      name: string;
      contactPhone?: string;
    };
  }[];
  total: number;
  status: 'pending' | 'preparing' | 'shipping' | 'delivered' | 'rejected';
  orderDate: string;
  userId: string;
  statusHistory?: {
    status: 'pending' | 'preparing' | 'shipping' | 'delivered' | 'rejected';
    timestamp: string;
    comment?: string;
  }[];
  trackingInfo?: {
    trackingNumber?: string;
    estimatedDelivery?: string;
    lastUpdate?: string;
  };
}

export interface StoreRequest {
  name: string;
  description: string;
  type: 'store' | 'restaurant' | 'realestate' | 'car' | 'clothes' | 'electronics' | 'homegoods';
  contactPhone: string;
  city: string;
  image?: File;
}

export interface StoreProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string; 
  city: string;
  image?: File;
  discount?: number;
  attributes?: Record<string, string | number | boolean>;
}

export interface StoreProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory?: string;
  discount?: number;
  city: string;
  image: string;
  storeId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  attributes?: Record<string, string | number | boolean>;
}

export interface StoreStats {
  views: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  orders: {
    pending: number;
    completed: number;
    total: number;
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
}
