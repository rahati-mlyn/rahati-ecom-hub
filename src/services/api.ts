
import { toast } from "@/hooks/use-toast";

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

// Products API
export const getProducts = async (category?: string) => {
  const params = category ? `?category=${category}` : '';
  return fetchApi(`/products${params}`);
};

export const addProduct = async (productData: any) => {
  const response = await fetchApi('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
  
  toast({
    title: "تم بنجاح",
    description: "تمت إضافة المنتج بنجاح",
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
export const loginUser = async (credentials: { email: string; password: string }) => {
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
export const createOrder = async (orderData: any) => {
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
