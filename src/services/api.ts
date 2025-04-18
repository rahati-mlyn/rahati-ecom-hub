
import { toast } from "@/hooks/use-toast";
import { 
  OrderRequest, 
  OrderResponse, 
  StoreRequest, 
  StoreProductRequest, 
  StoreProductResponse,
  StoreStats
} from "@/types/apiTypes";

const API_BASE_URL = "https://api.example.com"; // Replace with your actual API base URL

// Helper function to handle API requests
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `خطأ في الاتصال بالخادم: ${response.status}`);
    }

    // For responses that don't return JSON (like DELETE operations)
    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

// Upload helper function for files (with FormData)
const uploadApi = async (endpoint: string, formData: FormData, method = 'POST') => {
  const token = localStorage.getItem('token');
  
  const headers = {
    // Don't set Content-Type as it's automatically set when using FormData
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `خطأ في الاتصال بالخادم: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof Error) {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    }
    throw error;
  }
};

// Products API
export const getProducts = async (category?: string) => {
  const params = category ? `?category=${category}` : '';
  return fetchApi(`/products${params}`);
};

export const addProduct = async (productData: StoreProductRequest) => {
  // Handle file upload
  if (productData.image) {
    const formData = new FormData();
    
    // Add all non-file fields
    Object.keys(productData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, String(productData[key]));
      }
    });
    
    // Add the file
    formData.append('image', productData.image);
    
    const response = await uploadApi('/products', formData);
    
    toast({
      title: "تم بنجاح",
      description: "تمت إضافة المنتج بنجاح",
    });
    
    return response;
  } else {
    // No file to upload, use regular JSON API
    const response = await fetchApi('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    
    toast({
      title: "تم بنجاح",
      description: "تمت إضافة المنتج بنجاح",
    });
    
    return response;
  }
};

export const updateProduct = async (id: string, productData: Partial<StoreProductRequest>) => {
  // Handle file upload
  if (productData.image) {
    const formData = new FormData();
    
    // Add all non-file fields
    Object.keys(productData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, String(productData[key]));
      }
    });
    
    // Add the file
    formData.append('image', productData.image);
    
    const response = await uploadApi(`/products/${id}`, formData, 'PUT');
    
    toast({
      title: "تم بنجاح",
      description: "تم تحديث المنتج بنجاح",
    });
    
    return response;
  } else {
    // No file to upload, use regular JSON API
    const response = await fetchApi(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
    
    toast({
      title: "تم بنجاح",
      description: "تم تحديث المنتج بنجاح",
    });
    
    return response;
  }
};

export const deleteProduct = async (id: string) => {
  const response = await fetchApi(`/products/${id}`, {
    method: 'DELETE',
  });
  
  toast({
    title: "تم بنجاح",
    description: "تم حذف المنتج بنجاح",
  });
  
  return response;
};

// Store Management API
export const createStore = async (storeData: StoreRequest) => {
  // Handle file upload
  if (storeData.image) {
    const formData = new FormData();
    
    // Add all non-file fields
    Object.keys(storeData).forEach(key => {
      if (key !== 'image') {
        formData.append(key, String(storeData[key]));
      }
    });
    
    // Add the file
    formData.append('image', storeData.image);
    
    const response = await uploadApi('/stores', formData);
    
    toast({
      title: "تم بنجاح",
      description: "تم إرسال طلب إنشاء المتجر بنجاح",
    });
    
    return response;
  } else {
    // No file to upload, use regular JSON API
    const response = await fetchApi('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
    
    toast({
      title: "تم بنجاح",
      description: "تم إرسال طلب إنشاء المتجر بنجاح",
    });
    
    return response;
  }
};

export const getStoreProducts = async (storeId: string, status?: string) => {
  const params = status ? `?status=${status}` : '';
  return fetchApi(`/stores/${storeId}/products${params}`);
};

export const getStoreStats = async (storeId: string): Promise<StoreStats> => {
  return fetchApi(`/stores/${storeId}/stats`);
};

export const getStoreOrders = async (storeId: string, status?: string) => {
  const params = status ? `?status=${status}` : '';
  return fetchApi(`/stores/${storeId}/orders${params}`);
};

export const updateOrderStatus = async (orderId: string, status: string, message?: string) => {
  const response = await fetchApi(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, message }),
  });
  
  toast({
    title: "تم بنجاح",
    description: "تم تحديث حالة الطلب بنجاح",
  });
  
  return response;
};

// Real Estate API
export const getRealEstate = async (type?: string) => {
  const params = type ? `?type=${type}` : '';
  return fetchApi(`/real-estate${params}`);
};

export const addRealEstate = async (realEstateData: any) => {
  const response = await fetchApi('/real-estate', {
    method: 'POST',
    body: JSON.stringify(realEstateData),
  });
  
  toast({
    title: "تم بنجاح",
    description: "تمت إضافة العقار بنجاح",
  });
  
  return response;
};

// Authentication API
export const loginUser = async (credentials: { phone: string; password: string }) => {
  const response = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    toast({
      title: "تم تسجيل الدخول",
      description: "مرحباً بك في راحتي",
    });
  }
  
  return response;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  toast({
    title: "تم تسجيل الخروج",
    description: "نتمنى رؤيتك قريباً",
  });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Orders API
export const getUserOrders = async () => {
  return fetchApi('/orders/user');
};

export const getOrderDetails = async (orderId: string): Promise<OrderResponse> => {
  return fetchApi(`/orders/${orderId}`);
};

export const createOrder = async (orderData: OrderRequest) => {
  const response = await fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  
  toast({
    title: "تم بنجاح",
    description: "تم إرسال طلبك بنجاح",
  });
  
  return response;
};

// Offers API
export const getOffers = async () => {
  return fetchApi('/offers');
};

// Restaurants API
export const getRestaurants = async () => {
  return fetchApi('/restaurants');
};

// Cars API
export const getCars = async (type?: string) => {
  const params = type ? `?type=${type}` : '';
  return fetchApi(`/cars${params}`);
};
