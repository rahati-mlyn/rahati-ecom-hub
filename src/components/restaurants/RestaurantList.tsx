
import React, { useState } from 'react';
import { restaurants } from '@/data/restaurants';
import RestaurantCardWrapper from '@/components/cards/RestaurantCardWrapper';
import { Utensils, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Restaurant } from '@/types/restaurant';

const RestaurantList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string | null>(null);

  // Extract unique cuisines from restaurants data
  const cuisines = [...new Set(restaurants.flatMap(restaurant => restaurant.cuisine))];

  // Filter restaurants based on search query and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = 
      selectedCuisines.length === 0 || 
      restaurant.cuisine.some(c => selectedCuisines.includes(c));
    
    return matchesSearch && matchesCuisine;
  });

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Utensils className="mr-2 h-8 w-8 text-rahati-purple" />
          المطاعم
        </h1>
        <p className="text-gray-600">استكشف مجموعة واسعة من المطاعم المتميزة في موريتانيا</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="البحث عن مطعم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Button 
          onClick={toggleFilters}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          الفلترة
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-100">
          <h3 className="font-medium mb-3">تصفية حسب المطبخ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {cuisines.map(cuisine => (
              <div key={cuisine} className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id={`cuisine-${cuisine}`}
                  checked={selectedCuisines.includes(cuisine)}
                  onCheckedChange={() => handleCuisineChange(cuisine)}
                />
                <label 
                  htmlFor={`cuisine-${cuisine}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSelectedCuisines([]);
                setPriceRange(null);
              }}
            >
              إعادة ضبط الفلترة
            </Button>
          </div>
        </div>
      )}

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCardWrapper key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white rounded-lg shadow p-8 mt-4">
          <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">لا توجد مطاعم</h3>
          <p className="text-gray-600">
            لم نتمكن من العثور على مطاعم تطابق معايير البحث الخاصة بك. 
            يرجى تجربة مصطلحات بحث مختلفة أو تصفح جميع المطاعم.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisines([]);
              setPriceRange(null);
            }}
            className="mt-4 bg-rahati-purple hover:bg-rahati-purple/90"
          >
            عرض جميع المطاعم
          </Button>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
