
import React from 'react';
import { MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// List of Mauritanian cities
const mauritanianCities = [
  'نواكشوط',
  'نواذيبو',
  'روصو',
  'كيفة',
  'عطار',
  'توجنين',
  'سيلبابي',
  'النعمة',
  'ازويرات',
  'أكجوجت',
  'كرمسين',
  'بوتلميت'
];

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-sm font-medium hover:bg-white/10"
        >
          <MapPin className="h-4 w-4" />
          <span>{selectedCity || 'جميع المدن'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuItem 
          className="text-sm cursor-pointer"
          onClick={() => onCityChange('')}
        >
          جميع المدن
        </DropdownMenuItem>
        {mauritanianCities.map((city) => (
          <DropdownMenuItem 
            key={city} 
            className="text-sm cursor-pointer"
            onClick={() => onCityChange(city)}
          >
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CitySelector;
