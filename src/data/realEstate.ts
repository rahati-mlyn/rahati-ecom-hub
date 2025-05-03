
import { RealEstate } from "@/types/realEstate";
import { generateId } from "@/lib/utils";

export const realEstateListings: RealEstate[] = [
  {
    id: generateId(),
    title: "شقة فاخرة في وسط المدينة",
    description: "شقة حديثة مع إطلالة رائعة على المدينة، مجهزة بالكامل وقريبة من المرافق الرئيسية",
    price: 900000,
    type: "sale",
    propertyType: "apartment",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    city: "نواكشوط",
    location: "تفرغ زينة",
    contactPhone: "0512345678",
    ownerId: "user1",
    createdAt: new Date("2023-08-15"),
  },
  {
    id: generateId(),
    title: "فيلا مع حديقة واسعة",
    description: "فيلا فاخرة مع حديقة كبيرة وحمام سباحة، مناسبة للعائلات الكبيرة",
    price: 2500000,
    type: "sale",
    propertyType: "villa",
    area: 400,
    bedrooms: 5,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    city: "نواذيبو",
    location: "وسط المدينة",
    contactPhone: "0523456789",
    ownerId: "user2",
    createdAt: new Date("2023-07-22"),
  },
  {
    id: generateId(),
    title: "شقة للإيجار مفروشة بالكامل",
    description: "شقة مفروشة بالكامل بتصميم عصري، مناسبة للمهنيين والطلاب",
    price: 3500,
    type: "rent",
    propertyType: "apartment",
    area: 85,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop",
    city: "روصو",
    location: "حي الجديد",
    contactPhone: "0534567890",
    ownerId: "user3",
    createdAt: new Date("2023-09-05"),
  },
  {
    id: generateId(),
    title: "مكتب تجاري في برج حديث",
    description: "مكتب فسيح في برج تجاري حديث، مناسب للشركات والمؤسسات",
    price: 7000,
    type: "rent",
    propertyType: "commercial",
    area: 120,
    bedrooms: 0,
    bathrooms: 1,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
    city: "كيفة",
    location: "المنطقة التجارية",
    contactPhone: "0545678901",
    ownerId: "user4",
    createdAt: new Date("2023-10-10"),
  },
  {
    id: generateId(),
    title: "أرض سكنية للبيع",
    description: "أرض سكنية في منطقة متطورة، مناسبة لبناء فيلا أو منزل عائلي",
    price: 800000,
    type: "sale",
    propertyType: "land",
    area: 500,
    bedrooms: 0,
    bathrooms: 0,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop",
    city: "عطار",
    location: "حي الشمالي",
    contactPhone: "0556789012",
    ownerId: "user5",
    createdAt: new Date("2023-06-20"),
  },
  {
    id: generateId(),
    title: "شقة عائلية للإيجار",
    description: "شقة واسعة ومريحة للعائلات، قريبة من المدارس والمرافق العامة",
    price: 5000,
    type: "rent",
    propertyType: "apartment",
    area: 170,
    bedrooms: 4,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    city: "نواكشوط",
    location: "توجنين",
    contactPhone: "0567890123",
    ownerId: "user6",
    createdAt: new Date("2023-11-01"),
  },
];

export const getRealEstateByType = (type: 'rent' | 'sale') => {
  return realEstateListings.filter((property) => property.type === type);
};

export const getRealEstateByCity = (city: string) => {
  if (!city) return realEstateListings;
  return realEstateListings.filter((property) => property.city === city);
};

export const getRealEstateByTypeAndCity = (type: 'rent' | 'sale', city: string) => {
  let filtered = realEstateListings.filter((property) => property.type === type);
  if (city) {
    filtered = filtered.filter((property) => property.city === city);
  }
  return filtered;
};

export const searchRealEstate = (query: string, city: string = '') => {
  const searchTerm = query.toLowerCase();
  let filtered = realEstateListings.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.city.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm)
  );

  if (city) {
    filtered = filtered.filter((property) => property.city === city);
  }

  return filtered;
};

export const getRealEstateById = (id: string) => {
  return realEstateListings.find((property) => property.id === id);
};
