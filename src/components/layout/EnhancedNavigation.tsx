
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Building, Utensils, Car, Percent, 
  ChevronDown, Search, Package, Home 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedNavigationProps {
  onSelectCategory: (category: string, subCategory?: string) => void;
  currentCategory: string;
  currentSubCategory?: string;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  onSelectCategory,
  currentCategory,
  currentSubCategory,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can implement the search logic
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
      <div className="container mx-auto">
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b"
            >
              <form onSubmit={handleSearch} className="container mx-auto py-3">
                <div className="flex gap-2 items-center">
                  <Input
                    type="search"
                    placeholder="ابحث عن منتجات، متاجر، عقارات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm">بحث</Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <div className="flex justify-between items-center px-4 h-16">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Tabs 
            value={currentCategory} 
            onValueChange={(value) => onSelectCategory(value)}
            className="flex-1"
          >
            <TabsList className="h-14 justify-evenly gap-4 bg-transparent">
              <TabsTrigger 
                value="home"
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
                onClick={() => navigate('/')}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">الرئيسية</span>
              </TabsTrigger>
              <TabsTrigger 
                value="shopping" 
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-xs font-medium">التسوق</span>
              </TabsTrigger>
              <TabsTrigger 
                value="real-estate" 
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
              >
                <Building className="h-5 w-5" />
                <span className="text-xs font-medium">العقارات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="restaurants" 
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
              >
                <Utensils className="h-5 w-5" />
                <span className="text-xs font-medium">المطاعم</span>
              </TabsTrigger>
              <TabsTrigger 
                value="cars" 
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
              >
                <Car className="h-5 w-5" />
                <span className="text-xs font-medium">السيارات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="discounts" 
                className={cn(
                  "flex flex-col gap-1 items-center transition-all data-[state=active]:text-rahati-purple data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:text-rahati-purple"
                )}
              >
                <Percent className="h-5 w-5" />
                <span className="text-xs font-medium">التخفيضات</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Sub Categories */}
        <AnimatePresence>
          {currentCategory === 'shopping' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t bg-gray-50 overflow-hidden"
            >
              <div className="container mx-auto py-2 overflow-x-auto">
                <div className="flex justify-start items-center gap-4 px-4">
                  <Button
                    variant={!currentSubCategory ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('shopping')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    الكل
                  </Button>
                  <Button
                    variant={currentSubCategory === 'electronics' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('shopping', 'electronics')}
                  >
                    الإلكترونيات
                  </Button>
                  <Button
                    variant={currentSubCategory === 'clothes' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('shopping', 'clothes')}
                  >
                    الملابس
                  </Button>
                  <Button
                    variant={currentSubCategory === 'home-goods' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('shopping', 'home-goods')}
                  >
                    الأثاث المنزلي
                  </Button>
                  <Button
                    variant={currentSubCategory === 'other' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('shopping', 'other')}
                  >
                    غير ذلك
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {currentCategory === 'real-estate' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t bg-gray-50 overflow-hidden"
            >
              <div className="container mx-auto py-2 overflow-x-auto">
                <div className="flex justify-start items-center gap-4 px-4">
                  <Button
                    variant={!currentSubCategory ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('real-estate')}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={currentSubCategory === 'sale' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('real-estate', 'sale')}
                  >
                    للبيع
                  </Button>
                  <Button
                    variant={currentSubCategory === 'rent' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('real-estate', 'rent')}
                  >
                    للإيجار
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {currentCategory === 'cars' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t bg-gray-50 overflow-hidden"
            >
              <div className="container mx-auto py-2 overflow-x-auto">
                <div className="flex justify-start items-center gap-4 px-4">
                  <Button
                    variant={!currentSubCategory ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('cars')}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={currentSubCategory === 'sale' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('cars', 'sale')}
                  >
                    للبيع
                  </Button>
                  <Button
                    variant={currentSubCategory === 'rent' ? "secondary" : "ghost"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => onSelectCategory('cars', 'rent')}
                  >
                    للإيجار
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedNavigation;
