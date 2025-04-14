import { Product } from "@/types/product";
import { generateId } from "@/lib/utils";

export const products: Product[] = [
  {
    id: generateId(),
    name: "هاتف ايفون 15 برو ماكس",
    description: "أحدث هواتف أبل مع كاميرا متطورة وشاشة عالية الوضوح",
    price: 200000,
    originalPrice: 210000,
    discount: 5,
    image: "https://images.unsplash.com/photo-1678911820864-e5dc2e6b8ed2?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    subCategory: "phones",
    city: "نواكشوط",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-06-15"),
  },
  {
    id: generateId(),
    name: "هاتف سامسونج جالاكسي S23 ألترا",
    description: "هاتف رائد مع كاميرا فائقة الدقة وبطارية تدوم طويلاً",
    price: 180000,
    originalPrice: 195000,
    discount: 8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop",
    category: "electronics",
    subCategory: "phones",
    city: "نواكشوط",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-07-10"),
  },
  {
    id: generateId(),
    name: "لابتوب ماك بوك برو",
    description: "لابتوب قوي للمحترفين بشاشة رتينا فائقة الدقة",
    price: 280000,
    originalPrice: 300000,
    discount: 7,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
    category: "electronics",
    subCategory: "laptops",
    city: "نواذيبو",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-07-22"),
  },
  {
    id: generateId(),
    name: "لابتوب ديل XPS 15",
    description: "لابتوب فائق الأداء مع معالج قوي وبطارية طويلة الأمد",
    price: 210000,
    originalPrice: 230000,
    discount: 9,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    subCategory: "laptops",
    city: "نواكشوط",
    storeId: "store1",
    storeName: "متجر الإلكترونيات المتقدمة",
    createdAt: new Date("2023-08-15"),
  },
  {
    id: generateId(),
    name: "تلفزيون سامسونج QLED 65 بوصة",
    description: "تلفزيون ذكي بدقة 4K وتقنية QLED للألوان الزاهية",
    price: 150000,
    originalPrice: 170000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    subCategory: "tvs",
    city: "نواكشوط",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-05-25"),
  },
  {
    id: generateId(),
    name: "سماعة بلوتوث لاسلكية",
    description: "سماعة بجودة صوت عالية وبطارية تدوم طويلاً",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    category: "electronics",
    subCategory: "accessories",
    city: "روصو",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-05-10"),
  },
  {
    id: generateId(),
    name: "باور بانك 20000 مللي أمبير",
    description: "شاحن متنقل سريع بسعة عالية وخفيف الوزن",
    price: 7500,
    originalPrice: 8500,
    discount: 12,
    image: "https://images.unsplash.com/photo-1600490722773-35765a7e1255?q=80&w=1974&auto=format&fit=crop",
    category: "electronics",
    subCategory: "accessories",
    city: "نواكشوط",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-09-02"),
  },
  {
    id: generateId(),
    name: "ساعة ذكية متطورة",
    description: "ساعة ذكية تتبع النشاط البدني وتتصل بالهاتف",
    price: 25000,
    originalPrice: 27500,
    discount: 9,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    category: "electronics",
    subCategory: "wearables",
    city: "أكجوجت",
    storeId: "store2",
    storeName: "متجر التقنية الحديثة",
    createdAt: new Date("2023-10-05"),
  },
  
  {
    id: generateId(),
    name: "قميص قطني رجالي",
    description: "قميص قطني فاخر بتصميم عصري ومريح",
    price: 6000,
    originalPrice: 7500,
    discount: 20,
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=2065&auto=format&fit=crop",
    category: "clothes",
    subCategory: "men",
    city: "كيفة",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-08-05"),
  },
  {
    id: generateId(),
    name: "بنطلون جينز رجالي",
    description: "جينز عالي الجودة مريح وعصري",
    price: 8500,
    originalPrice: 9000,
    discount: 6,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
    category: "clothes",
    subCategory: "men",
    city: "نواكشوط",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-09-10"),
  },
  {
    id: generateId(),
    name: "جاكيت رجالي أنيق",
    description: "جاكيت شتوي مناسب للمناسبات الرسمية وغير الرسمية",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
    category: "clothes",
    subCategory: "men",
    city: "نواذيبو",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-10-15"),
  },
  {
    id: generateId(),
    name: "فستان نسائي أنيق",
    description: "فستان بتصميم أنيق مناسب للمناسبات الخاصة",
    price: 15000,
    originalPrice: 16500,
    discount: 9,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
    category: "clothes",
    subCategory: "women",
    city: "نواكشوط",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-09-15"),
  },
  {
    id: generateId(),
    name: "بلوزة نسائية كاجوال",
    description: "بلوزة أنيقة مناسبة للإطلالات اليومية",
    price: 5500,
    originalPrice: 6500,
    discount: 15,
    image: "https://images.unsplash.com/photo-1551489186-cf8726f514f8?q=80&w=1965&auto=format&fit=crop",
    category: "clothes",
    subCategory: "women",
    city: "نواكشوط",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-07-20"),
  },
  {
    id: generateId(),
    name: "عباية نسائية فاخرة",
    description: "عباية مطرزة بتصميم عصري وأنيق",
    price: 18000,
    originalPrice: 20000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1631697412251-7112ceee37c4?q=80&w=1972&auto=format&fit=crop",
    category: "clothes",
    subCategory: "women",
    city: "نواكشوط",
    storeId: "store4",
    storeName: "بيت الأزياء",
    createdAt: new Date("2023-08-25"),
  },
  {
    id: generateId(),
    name: "ملابس أطفال - طقم كامل",
    description: "طقم ملابس أطفال مريح ومناسب للمدرسة",
    price: 4500,
    originalPrice: 5000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=2071&auto=format&fit=crop",
    category: "clothes",
    subCategory: "kids",
    city: "نواكشوط",
    storeId: "store4",
    storeName: "بيت الأزياء",
    createdAt: new Date("2023-08-10"),
  },
  
  {
    id: generateId(),
    name: "أريكة جلدية فاخرة",
    description: "أريكة جلدية فاخرة بلون بني داكن وتصميم عصري",
    price: 120000,
    originalPrice: 135000,
    discount: 11,
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "أطار",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-04-30"),
  },
  {
    id: generateId(),
    name: "سرير خشبي مزدوج",
    description: "سرير مزدوج من خشب البلوط الفاخر بتصميم عصري",
    price: 85000,
    originalPrice: 95000,
    discount: 11,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "نواكشوط",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-06-10"),
  },
  {
    id: generateId(),
    name: "طاولة طعام خشبية",
    description: "طاولة طعام خشبية بتصميم أنيق تتسع لستة أشخاص",
    price: 60000,
    originalPrice: 65000,
    discount: 8,
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2069&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "نواذيبو",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-07-12"),
  },
  {
    id: generateId(),
    name: "خزانة ملابس كبيرة",
    description: "خزانة ملابس واسعة بتصميم أنيق وعملي",
    price: 70000,
    originalPrice: 78000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "furniture",
    city: "نواكشوط",
    storeId: "store4",
    storeName: "بيت الأثاث الراقي",
    createdAt: new Date("2023-05-15"),
  },
  {
    id: generateId(),
    name: "طقم أواني طبخ من الستانلس ستيل",
    description: "طقم أواني طبخ عالي الجودة مكون من 10 قطع",
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1584990347449-a40f5475db79?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "kitchenware",
    city: "نواكشوط",
    storeId: "store5",
    storeName: "المنزل العصري",
    createdAt: new Date("2023-08-20"),
  },
  {
    id: generateId(),
    name: "طقم أطباق خزفية",
    description: "طقم أطباق خزفية فاخرة مكون من 24 قطعة",
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    image: "https://images.unsplash.com/photo-1612197527762-8cfb55b618d1?q=80&w=2070&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "kitchenware",
    city: "نواكشوط",
    storeId: "store5",
    storeName: "المنزل العصري",
    createdAt: new Date("2023-09-05"),
  },
  {
    id: generateId(),
    name: "طقم سرير قطني فاخر",
    description: "طقم سرير مزدوج من القطن المصري بجودة عالية",
    price: 15000,
    originalPrice: 18000,
    discount: 17,
    image: "https://images.unsplash.com/photo-1583845112239-97ef1341b271?q=80&w=1974&auto=format&fit=crop",
    category: "home-goods",
    subCategory: "bedding",
    city: "نواكشوط",
    storeId: "store5",
    storeName: "المنزل العصري",
    createdAt: new Date("2023-07-05"),
  },
  
  {
    id: generateId(),
    name: "حقيبة ظهر متعددة الاستخدامات",
    description: "حقيبة ظهر عملية مناسبة للرحلات والعمل والدراسة",
    price: 9000,
    originalPrice: 10500,
    discount: 14,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    category: "other",
    subCategory: "bags",
    city: "نواكشوط",
    storeId: "store3",
    storeName: "الأزياء الراقية",
    createdAt: new Date("2023-06-20"),
  },
  {
    id: generateId(),
    name: "كرة قدم احترافية",
    description: "كرة قدم عالية الجودة مناسبة للملاعب المعشبة",
    price: 6000,
    originalPrice: 7000,
    discount: 14,
    image: "https://images.unsplash.com/photo-1614632537103-e568f67ae3e1?q=80&w=2070&auto=format&fit=crop",
    category: "other",
    subCategory: "sports",
    city: "نواكشوط",
    storeId: "store6",
    storeName: "متجر الرياضة",
    createdAt: new Date("2023-08-10"),
  },
  {
    id: generateId(),
    name: "مجموعة العاب أطفال تعليمية",
    description: "مجموعة ألعاب تساعد على تنمية مهارات الأطفال",
    price: 7500,
    originalPrice: 8500,
    discount: 12,
    image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=2070&auto=format&fit=crop",
    category: "other",
    subCategory: "toys",
    city: "نواكشوط",
    storeId: "store6",
    storeName: "متجر الألعاب",
    createdAt: new Date("2023-09-15"),
  }
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
