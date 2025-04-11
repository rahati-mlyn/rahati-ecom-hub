
import { Product } from "@/types/product";
import { generateId } from "@/lib/utils";

export const products: Product[] = [
  {
    id: generateId(),
    name: "هاتف ايفون 15 برو ماكس",
    description: "أحدث هواتف أبل مع كاميرا متطورة وشاشة عالية الوضوح",
    price: 5999,
    originalPrice: 6200,
    discount: 3,
    image: "https://images.unsplash.com/photo-1678911820864-e5dc2e6b8ed2?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    subCategory: "phones",
    city: "الرياض",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-06-15"),
  },
  {
    id: generateId(),
    name: "لابتوب ماك بوك برو",
    description: "لابتوب قوي للمحترفين بشاشة رتينا فائقة الدقة",
    price: 8299,
    originalPrice: 8999,
    discount: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
    category: "electronics",
    subCategory: "laptops",
    city: "جدة",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-07-22"),
  },
  {
    id: generateId(),
    name: "سماعة بلوتوث لاسلكية",
    description: "سماعة بجودة صوت عالية وبطارية تدوم طويلاً",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    category: "electronics",
    subCategory: "accessories",
    city: "الرياض",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-05-10"),
  },
  {
    id: generateId(),
    name: "قميص قطني رجالي",
    description: "قميص قطني فاخر بتصميم عصري ومريح",
    price: 199,
    originalPrice: 250,
    discount: 20,
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=2065&auto=format&fit=crop",
    category: "clothing",
    subCategory: "men",
    city: "الدمام",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-08-05"),
  },
  {
    id: generateId(),
    name: "فستان نسائي أنيق",
    description: "فستان بتصميم أنيق مناسب للمناسبات الخاصة",
    price: 450,
    originalPrice: 500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
    category: "clothing",
    subCategory: "women",
    city: "جدة",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-09-15"),
  },
  {
    id: generateId(),
    name: "أريكة جلدية فاخرة",
    description: "أريكة جلدية فاخرة بلون بني داكن وتصميم عصري",
    price: 3500,
    originalPrice: 4000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "الرياض",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-04-30"),
  },
  {
    id: generateId(),
    name: "طاولة طعام خشبية",
    description: "طاولة طعام خشبية بتصميم أنيق تتسع لستة أشخاص",
    price: 1800,
    originalPrice: 2000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2069&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "الدمام",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-07-12"),
  },
  {
    id: generateId(),
    name: "ساعة ذكية متطورة",
    description: "ساعة ذكية تتبع النشاط البدني وتتصل بالهاتف",
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    category: "electronics",
    subCategory: "wearables",
    city: "الرياض",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-10-05"),
  },
];

export const getProductsByCategory = (category: string, subCategory?: string) => {
  if (subCategory) {
    return products.filter(
      (product) => product.category === category && product.subCategory === subCategory
    );
  }
  return products.filter((product) => product.category === category);
};

export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.city.toLowerCase().includes(searchTerm)
  );
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};
