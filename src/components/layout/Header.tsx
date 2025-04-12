
import React, { useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/types/cart';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenCart: () => void;
  onSearch: (query: string) => void;
  cartItems?: CartItem[]; // Make cartItems optional
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenSidebar, 
  onOpenCart, 
  onSearch, 
  cartItems = [] // Provide a default empty array
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    toast({
      title: "تم البحث",
      description: `البحث عن: ${searchQuery}`,
      duration: 2000,
    });
  };

  return (
    <header className="bg-rahati-purple text-white sticky top-0 z-50 border-b border-rahati-yellow/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-rahati-yellow">راحتي</span>
        </div>
        
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-grow mx-4 max-w-2xl">
          <div className="relative flex">
            <Input
              type="text"
              placeholder="ابحث عن منتجات، مطاعم، عقارات..."
              className="w-full border-rahati-yellow/50 bg-white/10 placeholder:text-white/70 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dir="rtl"
            />
            <Button 
              type="submit" 
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        {/* Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenCart} className="hover:bg-white/10 relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rahati-yellow text-rahati-dark rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenSidebar} className="hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
