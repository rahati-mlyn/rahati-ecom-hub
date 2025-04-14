
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Building, Utensils, TagsIcon, Car, ShoppingBag, Tv, Shirt, Sofa, Smartphone, Laptop, Coffee, Wine, BookOpen, Gift, Baby, Watch, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import AddStoreButton from './AddStoreButton';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  subCategories?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    id: 'shopping',
    label: 'التسوق',
    icon: ShoppingBag,
    subCategories: [
      { id: 'clothes', label: 'الملابس', icon: Shirt },
      { id: 'home-goods', label: 'الأثاث المنزلي', icon: Sofa },
      { id: 'electronics', label: 'الإلكترونيات', icon: Tv },
      { id: 'other', label: 'غير ذلك', icon: MoreHorizontal },
    ]
  },
  { 
    id: 'real-estate', 
    label: 'العقارات', 
    icon: Building,
    subCategories: [
      { id: 'sale', label: 'للبيع', icon: Building },
      { id: 'rent', label: 'للإيجار', icon: Building },
    ]
  },
  { id: 'restaurants', label: 'المطاعم', icon: Utensils },
  { 
    id: 'cars', 
    label: 'السيارات', 
    icon: Car,
    subCategories: [
      { id: 'sale', label: 'للبيع', icon: Car },
      { id: 'rent', label: 'للإيجار', icon: Car },
    ]
  },
  { id: 'discounts', label: 'الخصومات', icon: TagsIcon },
];

interface NavigationProps {
  onSelectCategory: (category: string, subCategory?: string) => void;
  currentCategory: string;
  currentSubCategory?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onSelectCategory, 
  currentCategory,
  currentSubCategory 
}) => {
  const [showSubCategories, setShowSubCategories] = useState<boolean>(false);
  
  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    // Check if this category has subcategories
    const category = navigationItems.find(item => item.id === categoryId);
    if (category?.subCategories?.length) {
      setShowSubCategories(true);
    } else {
      setShowSubCategories(false);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    onSelectCategory(currentCategory, subCategoryId);
  };

  // Find current category object
  const currentCategoryObj = navigationItems.find(item => item.id === currentCategory);

  return (
    <div className="bg-white shadow-sm border-b border-rahati-purple/10">
      <div className="container mx-auto">
        {/* Main Categories */}
        <div className="overflow-x-auto py-2">
          <div className="flex justify-between items-center px-4">
            <div className="flex gap-3 min-w-max">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentCategory === item.id ? "default" : "ghost"}
                  className={cn(
                    "flex items-center gap-2 min-w-fit rounded-full transition-all duration-300",
                    currentCategory === item.id 
                      ? "bg-rahati-purple text-white shadow-md" 
                      : "text-rahati-dark hover:text-rahati-purple hover:bg-rahati-purple/10"
                  )}
                  onClick={() => handleCategoryClick(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
            
            {/* Add Store Button */}
            <AddStoreButton />
          </div>
        </div>

        {/* Sub Categories for the current category */}
        {showSubCategories && currentCategoryObj?.subCategories && (
          <div className="bg-rahati-purple/5 py-2 px-4 overflow-x-auto border-t border-rahati-purple/10">
            <div className="flex gap-2 min-w-max justify-center">
              {currentCategoryObj.subCategories.map((subItem) => (
                <Button
                  key={subItem.id}
                  variant={currentSubCategory === subItem.id ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-1 rounded-full transition-all duration-300",
                    currentSubCategory === subItem.id 
                      ? "bg-rahati-yellow text-rahati-dark shadow-sm" 
                      : "text-rahati-dark hover:text-rahati-purple hover:bg-rahati-purple/10"
                  )}
                  onClick={() => handleSubCategoryClick(subItem.id)}
                >
                  <subItem.icon className="h-3 w-3" />
                  <span>{subItem.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
