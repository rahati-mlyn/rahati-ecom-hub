
import React from 'react';
import { 
  ShoppingBag, Building, Utensils, Car, 
  Percent, Store, Globe, Mail, Info, 
  Phone, X, AlignRight, Facebook, 
  Instagram, Youtube, MessagesSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLanguageClick: () => void;
}

// Create custom icons for those not available in Lucide
const TikTok = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="lucide lucide-tiktok"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Snapchat = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="lucide lucide-snapchat"
  >
    <path d="M12 2c-3.3 0-6 2.7-6 6v4c0 1.1-.9 2-2 2 0 0 0 2 2 2 0 0 0 4 6 4s6-4 6-4c2 0 2-2 2-2-1.1 0-2-.9-2-2V8c0-3.3-2.7-6-6-6Z" />
    <path d="M8 14h8" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onSignupClick,
  onLanguageClick
}) => {
  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/22231465497', '_blank');
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white text-rahati-dark h-full max-w-xs w-full border-0">
        <div className="flex flex-col h-full">
          {/* User Section */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-100">
            <Avatar className="h-24 w-24 mb-3">
              <AvatarImage src="/lovable-uploads/0950e701-254f-41c2-9f33-1fa067702b38.png" alt="User Avatar" />
              <AvatarFallback className="bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-medium mb-3">زائر</h2>
            <Button 
              className="w-full bg-rahati-purple text-white hover:bg-rahati-purple/90 rounded-full py-6" 
              onClick={onLoginClick}
            >
              تسجيل الدخول
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            {/* Main Navigation */}
            <div className="space-y-4">
              <div className="py-4">
                <Separator className="mb-4 bg-gray-200" />
                
                <nav className="space-y-6">
                  {/* Shopping */}
                  <div className="flex justify-between items-center">
                    <ShoppingBag className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      التسوق
                    </Link>
                  </div>
                  
                  {/* Real Estate */}
                  <div className="flex justify-between items-center">
                    <Building className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      العقارات
                    </Link>
                  </div>
                  
                  {/* Restaurants */}
                  <div className="flex justify-between items-center">
                    <Utensils className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      المطاعم
                    </Link>
                  </div>
                  
                  {/* Cars */}
                  <div className="flex justify-between items-center">
                    <Car className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      السيارات
                    </Link>
                  </div>
                  
                  {/* Discounts */}
                  <div className="flex justify-between items-center">
                    <Percent className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      التخفيضات
                    </Link>
                  </div>

                  <Separator className="bg-gray-200" />
                  
                  {/* Create Store */}
                  <div className="flex justify-between items-center">
                    <Store className="h-5 w-5" />
                    <Link to="/add-store" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      إنشاء متجر
                    </Link>
                  </div>
                  
                  {/* Change Language */}
                  <div className="flex justify-between items-center">
                    <Globe className="h-5 w-5" />
                    <button 
                      onClick={onLanguageClick}
                      className="text-lg font-medium text-right hover:text-rahati-purple transition-colors"
                    >
                      تغيير اللغة
                    </button>
                  </div>
                  
                  {/* Contact Us */}
                  <div className="flex justify-between items-center">
                    <Mail className="h-5 w-5" />
                    <a href="mailto:info@rahati.com" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      اتصل بنا
                    </a>
                  </div>
                  
                  {/* About Us */}
                  <div className="flex justify-between items-center">
                    <Info className="h-5 w-5" />
                    <Link to="/" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      من نحن
                    </Link>
                  </div>

                  {/* Technical Support */}
                  <div className="flex justify-between items-center">
                    <Phone className="h-5 w-5" />
                    <button 
                      onClick={handleWhatsAppSupport}
                      className="text-lg font-medium text-right hover:text-rahati-purple transition-colors"
                    >
                      الدعم الفني: 31465497
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-md font-medium mb-3 text-center">تواصل معنا</h3>
            <div className="flex justify-between items-center">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-rahati-purple text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="TikTok"
              >
                <TikTok />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://snapchat.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Snapchat"
              >
                <Snapchat />
              </a>
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="p-4 bg-green-50 border-t border-green-200">
            <button 
              onClick={handleWhatsAppSupport}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessagesSquare className="h-5 w-5" />
              <span>تواصل معنا عبر واتساب</span>
            </button>
          </div>
          
          {/* Footer */}
          <div className="py-4 px-6 text-center">
            <p className="text-gray-500 text-sm">جميع الحقوق محفوظة © 2025 راحتي</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
