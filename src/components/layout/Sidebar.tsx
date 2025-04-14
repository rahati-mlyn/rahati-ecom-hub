
import React from 'react';
import { 
  ShoppingBag, Building, Utensils, Car, 
  Percent, Store, Globe, Mail, Info, 
  Phone, X, AlignRight
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
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      التسوق
                    </a>
                  </div>
                  
                  {/* Real Estate */}
                  <div className="flex justify-between items-center">
                    <Building className="h-5 w-5" />
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      العقارات
                    </a>
                  </div>
                  
                  {/* Restaurants */}
                  <div className="flex justify-between items-center">
                    <Utensils className="h-5 w-5" />
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      المطاعم
                    </a>
                  </div>
                  
                  {/* Cars */}
                  <div className="flex justify-between items-center">
                    <Car className="h-5 w-5" />
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      السيارات
                    </a>
                  </div>
                  
                  {/* Discounts */}
                  <div className="flex justify-between items-center">
                    <Percent className="h-5 w-5" />
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      التخفيضات
                    </a>
                  </div>

                  <Separator className="bg-gray-200" />
                  
                  {/* Create Store */}
                  <div className="flex justify-between items-center">
                    <Store className="h-5 w-5" />
                    <a href="/add-store" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      إنشاء متجر
                    </a>
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
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      اتصل بنا
                    </a>
                  </div>
                  
                  {/* About Us */}
                  <div className="flex justify-between items-center">
                    <Info className="h-5 w-5" />
                    <a href="#" className="text-lg font-medium hover:text-rahati-purple transition-colors">
                      من نحن
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-rahati-purple text-white p-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <TikTok />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a 
                href="https://snapchat.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Snapchat />
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Footer */}
          <div className="py-4 px-6 text-center">
            <p className="text-gray-500 text-sm">جميع © 2025 راحتي</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
