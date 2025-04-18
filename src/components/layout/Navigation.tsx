
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Store,
  Car,
  Building,
  Package,
  MenuIcon,
  X,
  ChevronDown,
  User,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  highlight?: boolean;
  submenu?: Array<{
    name: string;
    path: string;
  }>;
}

const Navigation = ({ cartItemsCount = 0, onCartClick }: { cartItemsCount: number, onCartClick: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();

  const navigationItems: NavigationItem[] = [
    {
      name: 'الرئيسية',
      path: '/',
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: 'التسوق',
      path: '/products',
      icon: <Store className="h-4 w-4" />,
      submenu: [
        { name: 'جميع المنتجات', path: '/products' },
        { name: 'الإلكترونيات', path: '/products/electronics' },
        { name: 'الملابس', path: '/products/clothes' },
        { name: 'المنزل والحديقة', path: '/products/home' },
      ]
    },
    {
      name: 'المطاعم',
      path: '/restaurants',
      icon: <Package className="h-4 w-4" />,
    },
    {
      name: 'العقارات',
      path: '/real-estate',
      icon: <Building className="h-4 w-4" />,
    },
    {
      name: 'السيارات',
      path: '/cars',
      icon: <Car className="h-4 w-4" />,
    },
    {
      name: 'إنشاء متجر',
      path: '/add-store',
      icon: <Store className="h-4 w-4" />,
      highlight: true,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1 justify-between">
            {/* Logo - hide on mobile */}
            <div className="hidden sm:flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-rahati-purple">راحتي</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              {navigationItems.map((item) => (
                <React.Fragment key={item.name}>
                  {item.submenu ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex items-center py-2 px-3 text-sm font-medium rounded-md",
                            isActive(item.path) ? "text-rahati-purple" : "text-gray-700 hover:text-rahati-purple hover:bg-gray-50"
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            {item.icon}
                            {item.name}
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {item.submenu.map((subitem) => (
                          <DropdownMenuItem key={subitem.name} asChild>
                            <Link 
                              to={subitem.path}
                              className={cn(
                                "w-full text-right",
                                isActive(subitem.path) ? "bg-gray-50" : ""
                              )}
                            >
                              {subitem.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button
                      variant={item.highlight ? "default" : "ghost"}
                      className={cn(
                        "flex items-center py-2 px-3 text-sm font-medium rounded-md",
                        item.highlight 
                          ? "bg-rahati-yellow text-rahati-dark hover:bg-rahati-yellow/90" 
                          : isActive(item.path) 
                            ? "text-rahati-purple" 
                            : "text-gray-700 hover:text-rahati-purple hover:bg-gray-50"
                      )}
                      asChild
                    >
                      <Link to={item.path}>
                        <span className="flex items-center gap-1.5">
                          {item.icon}
                          {item.name}
                        </span>
                      </Link>
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Main menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* Right side - user and cart */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Cart button */}
              <Button 
                variant="ghost" 
                size="icon"
                className="relative"
                onClick={onCartClick}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="default" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-rahati-purple"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* Favorites */}
              {isLoggedIn && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  asChild
                >
                  <Link to="/favorites">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              {/* User menu */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/lovable-uploads/0950e701-254f-41c2-9f33-1fa067702b38.png" alt={user?.name} />
                        <AvatarFallback className="bg-rahati-purple text-white">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>حساب {user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="w-full cursor-pointer text-right">
                        الملف الشخصي
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="w-full cursor-pointer text-right">
                        طلباتي
                      </Link>
                    </DropdownMenuItem>
                    {user?.storeId && (
                      <DropdownMenuItem asChild>
                        <Link to="/store-management" className="w-full cursor-pointer text-right">
                          إدارة المتجر
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-500 focus:text-red-500 cursor-pointer text-right"
                      onClick={logout}
                    >
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/account">
                  <Button variant="outline" size="sm" className="gap-1">
                    <User className="h-4 w-4" />
                    <span>تسجيل الدخول</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "block py-2 px-4 text-base font-medium border-r-4",
                isActive(item.path)
                  ? "border-rahati-purple text-rahati-purple bg-purple-50"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </div>
        <Separator />
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isLoggedIn ? (
            <div className="px-4 py-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/lovable-uploads/0950e701-254f-41c2-9f33-1fa067702b38.png" alt={user?.name} />
                    <AvatarFallback className="bg-rahati-purple text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mr-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الملف الشخصي
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  طلباتي
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-right px-4 py-2 text-base font-medium text-red-500 hover:text-red-700 hover:bg-gray-100"
                >
                  تسجيل الخروج
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 flex flex-col gap-2">
              <Link
                to="/account"
                className="block text-center px-4 py-2 font-medium text-white bg-rahati-purple rounded-md hover:bg-rahati-purple/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
