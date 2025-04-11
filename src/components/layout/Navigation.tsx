
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Building, Utensils, TagsIcon, Car, ShoppingBag, Tv, Shirt, Sofa, DollarSign, KeyRound } from 'lucide-react';
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
      { id: 'electronics', label: 'الإلكترونيات', icon: Tv },
      { id: 'home-goods', label: 'المستلزمات المنزلية', icon: Sofa },
    ]
  },
  { 
    id: 'real-estate', 
    label: 'العقارات', 
    icon: Building,
    subCategories: [
      { id: 'rent', label: 'للإيجار', icon: KeyRound },
      { id: 'sale', label: 'للبيع', icon: DollarSign },
    ]
  },
  { id: 'restaurants', label: 'المطاعم', icon: Utensils },
  { id: 'discounts', label: 'الخصومات', icon: TagsIcon },
  { 
    id: 'cars', 
    label: 'السيارات', 
    icon: Car,
    subCategories: [
      { id: 'rent', label: 'للإيجار', icon: KeyRound },
      { id: 'sale', label: 'للبيع', icon: DollarSign },
    ]
  },
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
  const [showSubCategories, setShowSubCategories] = useState<{ [key: string]: boolean }>({
    shopping: false,
    'real-estate': false,
    cars: false
  });
  
  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    
    // Toggle subcategories for the clicked category
    setShowSubCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    onSelectCategory(categoryId, subCategoryId);
  };

  // Find current category object
  const currentCategoryObj = navigationItems.find(item => item.id === currentCategory);

  return (
    <div className="bg-white/10 border-b border-rahati-purple/10">
      <div className="container mx-auto">
        {/* Main Categories */}
        <div className="overflow-x-auto pb-1">
          <div className="flex justify-between items-center py-2 px-4">
            <div className="flex gap-2 min-w-max">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentCategory === item.id ? "default" : "outline"}
                  className={cn(
                    "flex items-center gap-2 min-w-fit",
                    currentCategory === item.id ? "bg-rahati-purple text-white" : "text-rahati-dark hover:text-rahati-purple"
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

        {/* Sub Categories */}
        {navigationItems.map((category) => (
          category.subCategories && showSubCategories[category.id] && (
            <div key={category.id} className="bg-rahati-purple/5 py-2 px-4 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {category.subCategories.map((subItem) => (
                  <Button
                    key={`${category.id}-${subItem.id}`}
                    variant={currentCategory === category.id && currentSubCategory === subItem.id ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-1",
                      currentCategory === category.id && currentSubCategory === subItem.id ? "bg-rahati-yellow text-rahati-dark" : "text-rahati-dark hover:text-rahati-purple"
                    )}
                    onClick={() => handleSubCategoryClick(category.id, subItem.id)}
                  >
                    <subItem.icon className="h-3 w-3" />
                    <span>{subItem.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Navigation;
