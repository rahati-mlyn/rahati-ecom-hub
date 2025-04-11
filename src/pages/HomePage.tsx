import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/cards/ProductCard';
import RealEstateCard from '@/components/cards/RealEstateCard';
import RestaurantCard from '@/components/cards/RestaurantCard';
import CarCard from '@/components/cards/CarCard';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';
import LanguageModal from '@/components/modals/LanguageModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { Product } from '@/types/product';
import { RealEstate } from '@/types/realEstate';
import { Restaurant } from '@/types/restaurant';
import { Car } from '@/types/car';
import { CartItem } from '@/types/cart';

import { products, getProductsByCategory } from '@/data/products';
import { realEstateListings, getRealEstateByType } from '@/data/realEstate';
import { restaurants } from '@/data/restaurants';
import { cars, getCarsByType } from '@/data/cars';
import { generateId } from '@/lib/utils';

interface HomePageProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ language, onLanguageChange }) => {
  // State for UI components
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  // Category state
  const [currentCategory, setCurrentCategory] = useState('shopping');
  const [currentSubCategory, setCurrentSubCategory] = useState<string | undefined>(undefined);
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
  const { toast } = useToast();

  // Handle navigation
  const handleSelectCategory = (category: string, subCategory?: string) => {
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
    setSearchQuery('');
  };

  // Handle cart operations
  const handleAddToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Increment quantity if item already exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          categoryId: product.category,
          storeId: product.storeId
        }
      ]);
    }
    
    toast({
      title: "تمت الإضافة",
      description: `تمت إضافة ${product.name} إلى السلة`,
      duration: 2000,
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleSendOrder = () => {
    // Format the order for WhatsApp
    const orderText = encodeURIComponent(
      `طلب جديد من راحتي:\n\n` +
      cartItems.map(item => `${item.name} x ${item.quantity} - ${item.price * item.quantity} ريال`).join('\n') +
      `\n\nالمجموع: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} ريال`
    );
    
    window.open(`https://wa.me/31465497?text=${orderText}`, '_blank');
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // If search query is empty, reset to regular view
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }
    
    // Search through all data sources
    const searchResults = [
      ...products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase())
      ),
      ...realEstateListings.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.city.toLowerCase().includes(query.toLowerCase()) ||
        r.location.toLowerCase().includes(query.toLowerCase())
      ),
      ...restaurants.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.city.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase()))
      ),
      ...cars.filter(c => 
        c.make.toLowerCase().includes(query.toLowerCase()) || 
        c.model.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.city.toLowerCase().includes(query.toLowerCase())
      )
    ];
    
    setFilteredItems(searchResults);
  };

  // Render content based on category
  const renderContent = () => {
    if (searchQuery) {
      return renderSearchResults();
    }
    
    switch (currentCategory) {
      case 'shopping':
        return renderProducts();
      case 'real-estate':
        return renderRealEstate();
      case 'restaurants':
        return renderRestaurants();
      case 'cars':
        return renderCars();
      case 'discounts':
        return renderDiscounts();
      default:
        return renderProducts();
    }
  };

  const renderSearchResults = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-semibold text-rahati-dark mb-4">لا توجد نتائج</h3>
          <p className="text-muted-foreground">لم يتم العثور على نتائج تطابق البحث: "{searchQuery}"</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">نتائج البحث: {searchQuery}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            // Product
            if ('price' in item && 'name' in item && !('make' in item) && !('title' in item)) {
              return (
                <ProductCard 
                  key={item.id} 
                  product={item as Product} 
                  onAddToCart={handleAddToCart}
                  onViewDetails={() => {}} 
                />
              );
            }
            // RealEstate
            else if ('title' in item && 'bedrooms' in item) {
              return (
                <RealEstateCard 
                  key={item.id} 
                  property={item as RealEstate} 
                  onViewDetails={() => {}}
                />
              );
            }
            // Restaurant
            else if ('name' in item && 'menu' in item) {
              return (
                <RestaurantCard 
                  key={item.id} 
                  restaurant={item as Restaurant} 
                  onViewDetails={() => {}}
                />
              );
            }
            // Car
            else if ('make' in item && 'model' in item) {
              return (
                <CarCard 
                  key={item.id} 
                  car={item as Car} 
                  onViewDetails={() => {}}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    let displayProducts;
    
    if (currentSubCategory) {
      displayProducts = getProductsByCategory('shopping', currentSubCategory);
    } else {
      displayProducts = getProductsByCategory('shopping');
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">
          {currentSubCategory === 'clothes' && 'الملابس'}
          {currentSubCategory === 'electronics' && 'الإلكترونيات'}
          {currentSubCategory === 'home-goods' && 'المستلزمات المنزلية'}
          {!currentSubCategory && 'منتجات التسوق'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onViewDetails={() => {}} 
            />
          ))}
        </div>
      </div>
    );
  };

  const renderRealEstate = () => {
    const forSale = getRealEstateByType('sale');
    const forRent = getRealEstateByType('rent');
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" className="text-rahati-purple">عرض المزيد</Button>
            <h2 className="text-2xl font-semibold text-rahati-dark">عقارات للبيع</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forSale.slice(0, 4).map(property => (
              <RealEstateCard 
                key={property.id} 
                property={property} 
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" className="text-rahati-purple">عرض المزيد</Button>
            <h2 className="text-2xl font-semibold text-rahati-dark">عقارات للإيجار</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forRent.slice(0, 4).map(property => (
              <RealEstateCard 
                key={property.id} 
                property={property} 
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRestaurants = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">المطاعم</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              onViewDetails={() => {}}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCars = () => {
    const forSale = getCarsByType('sale');
    const forRent = getCarsByType('rent');
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" className="text-rahati-purple">عرض المزيد</Button>
            <h2 className="text-2xl font-semibold text-rahati-dark">سيارات للبيع</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forSale.slice(0, 4).map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" className="text-rahati-purple">عرض المزيد</Button>
            <h2 className="text-2xl font-semibold text-rahati-dark">سيارات للإيجار</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {forRent.slice(0, 4).map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDiscounts = () => {
    // Filter products with discount > 0
    const discountProducts = products.filter(product => product.discount > 0);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">الخصومات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {discountProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onViewDetails={() => {}} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        cartItems={cartItems}
      />
      
      {/* Navigation */}
      <Navigation 
        onSelectCategory={handleSelectCategory}
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
      />
      
      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLoginClick={() => {
          setIsSidebarOpen(false);
          setShowLoginModal(true);
        }}
        onSignupClick={() => {
          setIsSidebarOpen(false);
          setShowSignupModal(true);
        }}
        onLanguageClick={() => {
          setIsSidebarOpen(false);
          setShowLanguageModal(true);
        }}
      />
      
      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSendOrder={handleSendOrder}
      />
      
      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSignupClick={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />
      
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onLoginClick={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
      
      <LanguageModal 
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};

export default HomePage;
