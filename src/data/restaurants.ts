
import { Restaurant } from "@/types/restaurant";
import { generateId } from "@/lib/utils";

export const restaurants: Restaurant[] = [
  {
    id: generateId(),
    name: "مطعم الأصالة الشرقية",
    description: "مطعم متخصص في المأكولات الشرقية التقليدية بنكهات أصيلة",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    cuisine: ["شرقي", "عربي", "لبناني"],
    rating: 4.7,
    reviewCount: 253,
    city: "نواكشوط",
    location: "حي المينة",
    menu: [
      {
        id: generateId(),
        name: "المشاوي المشكلة",
        description: "تشكيلة من المشاوي اللذيذة تقدم مع الأرز والخضروات",
        price: 2200,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
        category: "أطباق رئيسية"
      },
      {
        id: generateId(),
        name: "حمص بالطحينة",
        description: "حمص طازج مع الطحينة وزيت الزيتون",
        price: 600,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=2036&auto=format&fit=crop",
        category: "مقبلات"
      },
      {
        id: generateId(),
        name: "كنافة بالجبن",
        description: "حلوى شرقية تقليدية بالجبن والقطر",
        price: 850,
        image: "https://images.unsplash.com/photo-1566897963861-8f54a25da290?q=80&w=2070&auto=format&fit=crop",
        category: "حلويات"
      }
    ],
    ownerId: "user7",
    createdAt: new Date("2023-05-15"),
  },
  {
    id: generateId(),
    name: "برجر هاوس",
    description: "متخصصون في البرجر الفاخر بأفضل أنواع اللحوم",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1974&auto=format&fit=crop",
    cuisine: ["برجر", "أمريكي", "سريع"],
    rating: 4.5,
    reviewCount: 187,
    city: "نواذيبو",
    location: "شارع الاستقلال",
    menu: [
      {
        id: generateId(),
        name: "برجر كلاسيك",
        description: "برجر لحم بقري مع الجبن والخضار الطازجة",
        price: 950,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
        category: "برجر"
      },
      {
        id: generateId(),
        name: "بطاطس مقلية",
        description: "بطاطس مقرمشة مع صلصة خاصة",
        price: 450,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1935&auto=format&fit=crop",
        category: "جانبية"
      },
      {
        id: generateId(),
        name: "ميلك شيك شوكولاتة",
        description: "ميلك شيك كريمي بالشوكولاتة",
        price: 600,
        image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=2069&auto=format&fit=crop",
        category: "مشروبات"
      }
    ],
    ownerId: "user8",
    createdAt: new Date("2023-07-05"),
  },
  {
    id: generateId(),
    name: "مطعم البحر الأزرق",
    description: "أشهى المأكولات البحرية الطازجة",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    cuisine: ["مأكولات بحرية", "سمك", "مشويات"],
    rating: 4.8,
    reviewCount: 326,
    city: "روصو",
    location: "شارع الشاطئ",
    menu: [
      {
        id: generateId(),
        name: "سمك مشوي",
        description: "سمك طازج مشوي مع الأعشاب والليمون",
        price: 1900,
        image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2070&auto=format&fit=crop",
        category: "أطباق رئيسية"
      },
      {
        id: generateId(),
        name: "روبيان مقلي",
        description: "روبيان مقلي بالثوم والليمون",
        price: 1800,
        image: "https://images.unsplash.com/photo-1625943553852-781c7d513089?q=80&w=2070&auto=format&fit=crop",
        category: "أطباق رئيسية"
      },
      {
        id: generateId(),
        name: "سلطة يونانية",
        description: "سلطة طازجة مع جبن الفيتا والزيتون",
        price: 800,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop",
        category: "سلطات"
      }
    ],
    ownerId: "user9",
    createdAt: new Date("2023-09-20"),
  },
  {
    id: generateId(),
    name: "بيتزا تاون",
    description: "أفضل بيتزا إيطالية أصلية مخبوزة في فرن حطب",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop",
    cuisine: ["إيطالي", "بيتزا", "معجنات"],
    rating: 4.3,
    reviewCount: 145,
    city: "كيفة",
    location: "شارع المدينة",
    menu: [
      {
        id: generateId(),
        name: "بيتزا مارجريتا",
        description: "بيتزا كلاسيكية مع صلصة الطماطم وجبن الموزاريلا وأوراق الريحان",
        price: 1400,
        image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=2071&auto=format&fit=crop",
        category: "بيتزا"
      },
      {
        id: generateId(),
        name: "بيتزا بيبروني",
        description: "بيتزا مع شرائح البيبروني الحار وجبن الموزاريلا",
        price: 1600,
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=2076&auto=format&fit=crop",
        category: "بيتزا"
      },
      {
        id: generateId(),
        name: "باستا ألفريدو",
        description: "باستا كريمية مع صلصة ألفريدو والدجاج",
        price: 1400,
        image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?q=80&w=2070&auto=format&fit=crop",
        category: "باستا"
      }
    ],
    ownerId: "user10",
    createdAt: new Date("2023-08-01"),
  },
];

export const searchRestaurants = (query: string) => {
  const searchTerm = query.toLowerCase();
  return restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.description.toLowerCase().includes(searchTerm) ||
      restaurant.city.toLowerCase().includes(searchTerm) ||
      restaurant.location.toLowerCase().includes(searchTerm) ||
      restaurant.cuisine.some((c) => c.toLowerCase().includes(searchTerm))
  );
};

export const getRestaurantById = (id: string) => {
  return restaurants.find((restaurant) => restaurant.id === id);
};
