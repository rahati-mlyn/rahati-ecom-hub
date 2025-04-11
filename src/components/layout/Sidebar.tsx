
import React from 'react';
import { Phone, Mail, Facebook, Instagram, Youtube, AlignRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLanguageClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onSignupClick,
  onLanguageClick
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="bg-rahati-purple text-white border-l border-rahati-yellow/50 max-w-xs w-full">
        <SheetHeader className="text-right">
          <SheetTitle className="text-white flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
            <span className="text-rahati-yellow">قائمة راحتي</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col gap-6">
          {/* Login Section */}
          <div className="flex flex-col gap-3">
            <Button 
              className="bg-rahati-yellow text-rahati-dark hover:bg-rahati-yellow/90 w-full" 
              onClick={onLoginClick}
            >
              تسجيل الدخول
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 w-full"
              onClick={onSignupClick}
            >
              إنشاء حساب جديد
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 w-full"
              onClick={onLanguageClick}
            >
              <AlignRight className="mr-2 h-4 w-4" />
              تغيير اللغة
            </Button>
          </div>
          
          <Separator className="bg-white/20" />
          
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-right">تواصل معنا</h3>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://wa.me/31465497" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">31465497</span>
              </a>
              <a 
                href="https://www.facebook.com/YourPage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span>فيسبوك</span>
              </a>
              <a 
                href="https://www.instagram.com/YourProfile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>إنستغرام</span>
              </a>
              <a 
                href="https://www.youtube.com/YourChannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Youtube className="h-4 w-4" />
                <span>يوتيوب</span>
              </a>
              <a 
                href="mailto:contact@rahati.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>البريد</span>
              </a>
            </div>
          </div>
          
          <Separator className="bg-white/20" />
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-3 text-right">الدعم الفني</h3>
            <div className="flex flex-col gap-2">
              <a 
                href="tel:31465497" 
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">31465497</span>
              </a>
              <a 
                href="mailto:support@rahati.com" 
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@rahati.com</span>
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
