
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
                href="https://wa.me/22231465497" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">31465497</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61575255866580" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span>فيسبوك</span>
              </a>
              <a 
                href="https://www.tiktok.com/@rahati_mlyn?_t=ZM-8vX4m6NEPN1&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <TikTok />
                <span>تيك توك</span>
              </a>
              <a 
                href="https://www.snapchat.com/add/rahati_mlyn?share_id=JXROvMOS70Y&locale=ar-MR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Snapchat />
                <span>سناب شات</span>
              </a>
              <a 
                href="https://youtube.com/channel/UC2Ga1kALXLK03c11evnxTgA?si=koL3Kl2fW59tRdMB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Youtube className="h-4 w-4" />
                <span>يوتيوب</span>
              </a>
              <a 
                href="https://www.tiktok.com/@rahati_mlyn?_t=ZM-8vX4m6NEPN1&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-rahati-yellow transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>إنستغرام</span>
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
