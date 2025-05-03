import React from 'react';
import { ShoppingBag, Building, Utensils, Car, Percent } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import CitySelector from './CitySelector';

interface NavigationProps {
  onSelectCategory: (category: string, subCategory?: string) => void;
  currentCategory: string;
  currentSubCategory?: string;
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  onSelectCategory,
  currentCategory,
  currentSubCategory,
  selectedCity,
  onCityChange,
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
      <div className="container mx-auto flex justify-center overflow-auto">
        <Tabs 
          value={currentCategory} 
          onValueChange={(value) => onSelectCategory(value)}
          className="w-full max-w-3xl"
        >
          <TabsList className="h-14 w-full justify-evenly gap-4 bg-transparent">
            <TabsTrigger 
              value="shopping" 
              className="flex flex-col gap-1 items-center data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-xs font-medium">التسوق</span>
            </TabsTrigger>
            <TabsTrigger 
              value="real-estate" 
              className="flex flex-col gap-1 items-center data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Building className="h-5 w-5" />
              <span className="text-xs font-medium">العقارات</span>
            </TabsTrigger>
            <TabsTrigger 
              value="restaurants" 
              className="flex flex-col gap-1 items-center data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Utensils className="h-5 w-5" />
              <span className="text-xs font-medium">المطاعم</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cars" 
              className="flex flex-col gap-1 items-center data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Car className="h-5 w-5" />
              <span className="text-xs font-medium">السيارات</span>
            </TabsTrigger>
            <TabsTrigger 
              value="discounts" 
              className="flex flex-col gap-1 items-center data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Percent className="h-5 w-5" />
              <span className="text-xs font-medium">التخفيضات</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {currentCategory === 'shopping' && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto overflow-auto">
            <div className="flex justify-between items-center">
              <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
              <NavigationMenu dir="rtl" className="justify-center">
                <NavigationMenuList className="px-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        !currentSubCategory ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping')}
                    >
                      الكل
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        currentSubCategory === 'electronics' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping', 'electronics')}
                    >
                      <Tv className="h-4 w-4" />
                      الإلكترونيات
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        currentSubCategory === 'clothes' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping', 'clothes')}
                    >
                      <Shirt className="h-4 w-4" />
                      الملابس
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        currentSubCategory === 'home-goods' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping', 'home-goods')}
                    >
                      <Sofa className="h-4 w-4" />
                      الأثاث المنزلي
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        currentSubCategory === 'car-parts' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping', 'car-parts')}
                    >
                      <Wrench className="h-4 w-4" />
                      غيار السيارات
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium flex items-center gap-2", 
                        currentSubCategory === 'other' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('shopping', 'other')}
                    >
                      <Package className="h-4 w-4" />
                      غير ذلك
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      )}
      
      {currentCategory === 'real-estate' && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto overflow-auto">
            <div className="flex justify-between items-center">
              <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
              <NavigationMenu dir="rtl" className="justify-center">
                <NavigationMenuList className="px-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        !currentSubCategory ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('real-estate')}
                    >
                      الكل
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        currentSubCategory === 'sale' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('real-estate', 'sale')}
                    >
                      للبيع
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        currentSubCategory === 'rent' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('real-estate', 'rent')}
                    >
                      للإيجار
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      )}
      
      {currentCategory === 'cars' && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto overflow-auto">
            <div className="flex justify-between items-center">
              <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
              <NavigationMenu dir="rtl" className="justify-center">
                <NavigationMenuList className="px-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        !currentSubCategory ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('cars')}
                    >
                      الكل
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        currentSubCategory === 'sale' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('cars', 'sale')}
                    >
                      للبيع
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={cn(
                        "px-4 py-2 text-sm font-medium", 
                        currentSubCategory === 'rent' ? "text-rahati-purple" : "text-muted-foreground"
                      )}
                      onClick={() => onSelectCategory('cars', 'rent')}
                    >
                      للإيجار
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      )}
      
      {currentCategory === 'restaurants' && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto overflow-auto">
            <div className="flex justify-between items-center">
              <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
              <NavigationMenu dir="rtl" className="justify-center">
                <NavigationMenuList className="px-2">
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="px-4 py-2 text-sm font-medium text-rahati-purple"
                    >
                      المطاعم
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
