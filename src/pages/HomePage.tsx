import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';
import CartDrawer from '@/components/layout/CartDrawer';
import ProductCard from '@/components/cards/ProductCard';
import RealEstateCard from '@/components/cards/RealEstateCard';
import RestaurantCardWrapper from '@/components/cards/RestaurantCardWrapper';
import CarCard from '@/components/cards/CarCard';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';
import LanguageModal from '@/components/modals/LanguageModal';
import ProductDetailsModal from '@/components/modals/ProductDetailsModal';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { Product } from '@/types/product';
import { RealEstate } from '@/types/realEstate';
import { Restaurant } from '@/types/restaurant';
import { Car } from '@/types/car';
import { CartItem } from '@/types/cart';
import { MenuItem } from '@/types/restaurant';

// Import the mock data as fallback
import { products as mockProducts, getProductsByCategory as getMockProductsByCategory } from '@/data/products';
import { realEstateListings as mockRealEstate, getRealEstateByType as getMockRealEstateByType } from '@/data/realEstate';
import { restaurants as mockRestaurants } from '@/data/restaurants';
import { cars as mockCars, getCarsByType as getMockCarsByType } from '@/data/cars';

// Import API services
import {
  getProducts,
  getRealEstate,
  getRestaurants,
  getCars,
  getOffers,
  isAuthenticated,
  getCurrentUser,
  logoutUser
} from '@/services/api';

interface HomePageProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ language, onLanguageChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);
  
  const [currentCategory, setCurrentCategory] = useState('shopping');
  const [currentSubCategory, setCurrentSubCategory] = useState<string | undefined>(undefined);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
  // State for API data
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [realEstateData, setRealEstateData] = useState<RealEstate[]>([]);
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const [carsData, setCarsData] = useState<Car[]>([]);
  const [offersData, setOffersData] = useState<Product[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is logged in on component mount
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  // Fetch data based on the current category
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        if (currentCategory === 'shopping' || currentCategory === 'all') {
          const data = await getProducts(currentSubCategory);
          setProductsData(data);
        }
        
        if (currentCategory === 'real-estate' || currentCategory === 'all') {
          const data = await getRealEstate(currentSubCategory);
          setRealEstateData(data);
        }
        
        if (currentCategory === 'restaurants' || currentCategory === 'all') {
          const data = await getRestaurants();
          setRestaurantsData(data);
        }
        
        if (currentCategory === 'cars' || currentCategory === 'all') {
          const data = await getCars(currentSubCategory);
          setCarsData(data);
        }
        
        if (currentCategory === 'discounts' || currentCategory === 'all') {
          const data = await getOffers();
          setOffersData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to mock data if API fails
        if (currentCategory === 'shopping' || currentCategory === 'all') {
          setProductsData(getMockProductsByCategory(currentCategory, currentSubCategory));
        }
        
        if (currentCategory === 'real-estate' || currentCategory === 'all') {
          setRealEstateData(currentSubCategory ? 
            getMockRealEstateByType(currentSubCategory as 'rent' | 'sale') : 
            mockRealEstate
          );
        }
        
        if (currentCategory === 'restaurants' || currentCategory === 'all') {
          setRestaurantsData(mockRestaurants);
        }
        
        if (currentCategory === 'cars' || currentCategory === 'all') {
          setCarsData(currentSubCategory ? 
            getMockCarsByType(currentSubCategory as 'rent' | 'sale') : 
            mockCars
          );
        }
        
        if (currentCategory === 'discounts' || currentCategory === 'all') {
          setOffersData(mockProducts.filter(product => product.discount > 0));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [currentCategory, currentSubCategory]);

  const handleSelectCategory = (category: string, subCategory?: string) => {
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
    setSearchQuery('');
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsModalOpen(true);
  };

  const getSimilarProducts = (product: Product | null): Product[] => {
    if (!product) return [];
    
    return productsData.length > 0 
      ? productsData
          .filter(p => 
            p.id !== product.id && 
            (p.subCategory === product.subCategory || p.category === product.category)
          )
          .slice(0, 3)
      : [];
  };

  const handleAddToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
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

  const handleAddMenuItemToCart = (menuItem: MenuItem, restaurantName: string) => {
    const cartItemId = `menu-${menuItem.id}`;
    const existingItemIndex = cartItems.findIndex(item => item.id === cartItemId);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: cartItemId,
          name: `${menuItem.name} (${restaurantName})`,
          price: menuItem.price,
          image: menuItem.image,
          quantity: 1,
          categoryId: 'restaurants',
          storeId: restaurantName
        }
      ]);
    }
    
    toast({
      title: "تمت الإضافة",
      description: `تمت إضافة ${menuItem.name} من ${restaurantName} إلى السلة`,
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
    const orderText = encodeURIComponent(
      `طلب جديد من راحتي:\n\n` +
      cartItems.map(item => `${item.name} x ${item.quantity} - ${item.price * item.quantity} أوقية`).join('\n') +
      `\n\nالمجموع: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} أوقية`
    );
    
    window.open(`https://wa.me/22231465497?text=${orderText}`, '_blank');
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredItems([]);
      return;
    }
    
    // For a real implementation, we'd use a search API endpoint
    // Here, we'll just search through the currently loaded data
    const searchResults = [
      ...productsData.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase())
      ),
      ...realEstateData.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.city.toLowerCase().includes(query.toLowerCase()) ||
        r.location.toLowerCase().includes(query.toLowerCase())
      ),
      ...restaurantsData.filter(r => 
        r.name.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.city.toLowerCase().includes(query.toLowerCase()) ||
        (r.cuisine && r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase())))
      ),
      ...carsData.filter(c => 
        c.make.toLowerCase().includes(query.toLowerCase()) || 
        c.model.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.city.toLowerCase().includes(query.toLowerCase())
      )
    ];
    
    setFilteredItems(searchResults);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    toast({
      title: "تم تسجيل الدخول",
      description: "مرحباً بك في راحتي",
      duration: 2000,
    });
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    toast({
      title: "تم تسجيل الخروج",
      description: "نتمنى رؤيتك قريباً",
      duration: 2000,
    });
  };

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
            if ('price' in item && 'name' in item && !('make' in item) && !('title' in item)) {
              return (
                <ProductCard 
                  key={item.id} 
                  product={item as Product} 
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewProductDetails} 
                />
              );
            }
            else if ('title' in item && 'bedrooms' in item) {
              return (
                <RealEstateCard 
                  key={item.id} 
                  property={item as RealEstate} 
                  onViewDetails={() => {}}
                />
              );
            }
            else if ('name' in item && 'menu' in item) {
              return (
                <RestaurantCardWrapper 
                  key={item.id} 
                  restaurant={item as Restaurant} 
                  onViewDetails={() => {}}
                  onAddToCart={handleAddMenuItemToCart}
                  isLoggedIn={isLoggedIn}
                />
              );
            }
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
    let subcategoryLabel = '';
    
    if (isLoading) {
      return (
        <div className="container mx-auto px-4 py-16 text-center">
          <p>جاري تحميل البيانات...</p>
        </div>
      );
    }
    
    if (currentSubCategory) {
      displayProducts = productsData.filter(p => p.subCategory === currentSubCategory);
      
      switch (currentSubCategory) {
        case 'electronics': subcategoryLabel = 'الإلكترونيات'; break;
        case 'clothes': subcategoryLabel = 'الملابس'; break;
        case 'home-goods': subcategoryLabel = 'الأثاث المنزلي'; break;
        case 'other': subcategoryLabel = 'غير ذلك'; break;
        default: subcategoryLabel = '';
      }
      
    } else {
      displayProducts = productsData;
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">
          {subcategoryLabel || 'منتجات التسوق'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.length > 0 ? (
            displayProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewProductDetails} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">لا توجد منتجات في هذه الفئة</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderRealEstate = () => {
    let displayProperties;
    let title = 'عقارات';
    
    if (currentSubCategory === 'sale') {
      displayProperties = realEstateData.filter(r => r.type === 'sale');
      title = 'عقارات للبيع';
    } else if (currentSubCategory === 'rent') {
      displayProperties = realEstateData.filter(r => r.type === 'rent');
      title = 'عقارات للإيجار';
    } else {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                className="text-rahati-purple"
                onClick={() => handleSelectCategory('real-estate', 'sale')}
              >
                عرض المزيد
              </Button>
              <h2 className="text-2xl font-semibold text-rahati-dark">عقارات للبيع</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {realEstateData.filter(r => r.type === 'sale').slice(0, 4).map(property => (
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
              <Button 
                variant="outline" 
                className="text-rahati-purple"
                onClick={() => handleSelectCategory('real-estate', 'rent')}
              >
                عرض المزيد
              </Button>
              <h2 className="text-2xl font-semibold text-rahati-dark">عقارات للإيجار</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {realEstateData.filter(r => r.type === 'rent').slice(0, 4).map(property => (
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
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProperties.map(property => (
            <RealEstateCard 
              key={property.id} 
              property={property} 
              onViewDetails={() => {}}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCars = () => {
    let displayCars;
    let title = 'سيارات';
    
    if (currentSubCategory === 'sale') {
      displayCars = carsData.filter(c => c.type === 'sale');
      title = 'سيارات للبيع';
    } else if (currentSubCategory === 'rent') {
      displayCars = carsData.filter(c => c.type === 'rent');
      title = 'سيارات للإيجار';
    } else {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                className="text-rahati-purple"
                onClick={() => handleSelectCategory('cars', 'sale')}
              >
                عرض المزيد
              </Button>
              <h2 className="text-2xl font-semibold text-rahati-dark">سيارات للبيع</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {carsData.filter(c => c.type === 'sale').slice(0, 4).map(car => (
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
              <Button 
                variant="outline" 
                className="text-rahati-purple"
                onClick={() => handleSelectCategory('cars', 'rent')}
              >
                عرض المزيد
              </Button>
              <h2 className="text-2xl font-semibold text-rahati-dark">سيارات للإيجار</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {carsData.filter(c => c.type === 'rent').slice(0, 4).map(car => (
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
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCars.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={() => {}}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDiscounts = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">الخصومات</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offersData.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProductDetails} 
            />
          ))}
        </div>
      </div>
    );
  };

  const renderRestaurants = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-rahati-dark">المطاعم</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurantsData.map(restaurant => (
            <RestaurantCardWrapper 
              key={restaurant.id} 
              restaurant={restaurant} 
              onViewDetails={() => {}}
              onAddToCart={handleAddMenuItemToCart}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        cartItems={cartItems}
      />
      
      <Navigation 
        onSelectCategory={handleSelectCategory}
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
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
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogout}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSendOrder={handleSendOrder}
      />
      
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isProductDetailsModalOpen}
        onClose={() => setIsProductDetailsModalOpen(false)}
        onAddToCart={handleAddToCart}
        similarProducts={getSimilarProducts(selectedProduct)}
        onViewDetails={handleViewProductDetails}
      />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSignupClick={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
        onLoginSuccess={handleLogin}
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
