
import { Car } from "@/types/car";
import { generateId } from "@/lib/utils";

export const cars: Car[] = [
  {
    id: generateId(),
    make: "تويوتا",
    model: "كامري",
    year: 2022,
    price: 110000,
    type: "sale",
    mileage: 25000,
    transmission: "automatic",
    fuelType: "petrol",
    description: "سيارة تويوتا كامري بحالة ممتازة، استخدام شخصي، صيانة دورية في الوكالة",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop",
    city: "الرياض",
    contactPhone: "0512345678",
    ownerId: "user11",
    createdAt: new Date("2023-09-10"),
  },
  {
    id: generateId(),
    make: "هوندا",
    model: "أكورد",
    year: 2021,
    price: 95000,
    type: "sale",
    mileage: 35000,
    transmission: "automatic",
    fuelType: "petrol",
    description: "هوندا أكورد فئة EX، محرك 2.0، جميع الكماليات، بحالة الوكالة",
    image: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2070&auto=format&fit=crop",
    city: "جدة",
    contactPhone: "0523456789",
    ownerId: "user12",
    createdAt: new Date("2023-08-25"),
  },
  {
    id: generateId(),
    make: "نيسان",
    model: "التيما",
    year: 2020,
    price: 180,
    type: "rent",
    mileage: 45000,
    transmission: "automatic",
    fuelType: "petrol",
    description: "سيارة نيسان التيما متوفرة للإيجار اليومي، تتميز بالاقتصاد في استهلاك الوقود والراحة",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2071&auto=format&fit=crop",
    city: "الرياض",
    contactPhone: "0534567890",
    ownerId: "user13",
    createdAt: new Date("2023-10-05"),
  },
  {
    id: generateId(),
    make: "مرسيدس",
    model: "E-Class",
    year: 2023,
    price: 350,
    type: "rent",
    mileage: 10000,
    transmission: "automatic",
    fuelType: "petrol",
    description: "مرسيدس E-Class للإيجار اليومي أو الأسبوعي، سيارة فاخرة بجميع المواصفات",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop",
    city: "الدمام",
    contactPhone: "0545678901",
    ownerId: "user14",
    createdAt: new Date("2023-11-02"),
  },
  {
    id: generateId(),
    make: "بي إم دبليو",
    model: "X5",
    year: 2022,
    price: 280000,
    type: "sale",
    mileage: 15000,
    transmission: "automatic",
    fuelType: "petrol",
    description: "بي إم دبليو X5 بحالة ممتازة، وكالة، فل أوبشن، ضمان ساري",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2034&auto=format&fit=crop",
    city: "جدة",
    contactPhone: "0556789012",
    ownerId: "user15",
    createdAt: new Date("2023-07-15"),
  },
  {
    id: generateId(),
    make: "لكزس",
    model: "ES",
    year: 2021,
    price: 200000,
    type: "sale",
    mileage: 30000,
    transmission: "automatic",
    fuelType: "hybrid",
    description: "لكزس ES هايبرد، سيارة اقتصادية فاخرة، بحالة ممتازة",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    city: "الرياض",
    contactPhone: "0567890123",
    ownerId: "user16",
    createdAt: new Date("2023-06-20"),
  },
];

export const getCarsByType = (type: 'rent' | 'sale') => {
  return cars.filter((car) => car.type === type);
};

export const searchCars = (query: string) => {
  const searchTerm = query.toLowerCase();
  return cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm) ||
      car.city.toLowerCase().includes(searchTerm)
  );
};

export const getCarById = (id: string) => {
  return cars.find((car) => car.id === id);
};
