
import React from 'react';
import { MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MAURITANIAN_CITIES = [
  { id: 'all', name: 'كل المدن' },
  { id: 'nouakchott', name: 'نواكشوط' },
  { id: 'nouadhibou', name: 'نواذيبو' },
  { id: 'rosso', name: 'روصو' },
  { id: 'kiffa', name: 'كيفة' },
  { id: 'atar', name: 'عطار' },
  { id: 'akjoujt', name: 'أكجوجت' },
];

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  return (
    <div className="flex items-center gap-2 justify-end pb-2 pt-1">
      <MapPin className="h-4 w-4 text-rahati-purple" />
      <Select defaultValue={selectedCity} onValueChange={onCityChange} dir="rtl">
        <SelectTrigger className="w-48 bg-white border-rahati-purple/30 text-rahati-purple h-9 focus:ring-rahati-purple/30">
          <SelectValue placeholder="اختر المدينة" />
        </SelectTrigger>
        <SelectContent className="z-50 border-rahati-purple/20">
          {MAURITANIAN_CITIES.map((city) => (
            <SelectItem key={city.id} value={city.id} className="text-right">
              {city.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;
