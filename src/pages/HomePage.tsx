
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginModal from '@/components/modals/LoginModal';
import SignupModal from '@/components/modals/SignupModal';
import Sidebar from '@/components/layout/Sidebar';
import RestaurantList from '@/components/restaurants/RestaurantList';
import { useAuth } from '@/hooks/useAuthContext';
import { Restaurant } from '@/types/restaurant';
import { useToast } from '@/hooks/use-toast';
import EnhancedNavigation from '@/components/layout/EnhancedNavigation';

const HomePage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<string>("ar");
  const [currentCategory, setCurrentCategory] = useState<string>('home');
  const [currentSubCategory, setCurrentSubCategory] = useState<string | undefined>(undefined);
  const { login, logout, user } = useAuth();
  const { toast } = useToast();
  
  const handleLoginClick = () => {
    setIsSidebarOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsSidebarOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleLanguageClick = () => {
    setLanguage(language === "ar" ? "en" : "ar");
    document.documentElement.dir = language === "ar" ? "ltr" : "rtl";
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح.",
    })
  };

  const handleCategorySelect = (category: string, subCategory?: string) => {
    setCurrentCategory(category);
    setCurrentSubCategory(subCategory);
  };

  const handleSidebarOpen = () => {
      setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
      setIsSidebarOpen(false);
  };

  const handleLoginSuccess = () => {
    toast({
      title: "تم تسجيل الدخول",
      description: "تم تسجيل دخولك بنجاح.",
    })
  }

  const isLoggedIn = !!user;
  // Safe way to get username whether it's phone or other property
  const username = user?.name || user?.phone || user?.email || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onOpenSidebar={handleSidebarOpen}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick} 
        onLanguageClick={handleLanguageClick}
        isLoggedIn={isLoggedIn}
        username={username}
      />
      
      <EnhancedNavigation
        onSelectCategory={handleCategorySelect}
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
      />

      <main className="container mx-auto py-12">
        {currentCategory === 'restaurants' ? (
          <RestaurantList />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">مرحباً بك في راحتي</h2>
            <p className="text-gray-600">استكشف مجموعتنا المتنوعة من الخدمات والمتاجر.</p>
          </div>
        )}
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onLoginClick={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onLanguageClick={handleLanguageClick}
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogout}
      />
    </div>
  );
};

export default HomePage;
