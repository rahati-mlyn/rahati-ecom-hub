
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Share2, Heart, MessagesSquare, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import ProductCard from '../cards/ProductCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  similarProducts: Product[];
  onViewDetails: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  similarProducts,
  onViewDetails
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'similar' | 'features'>('similar');
  const [itemsPerView, setItemsPerView] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!product) return null;

  // Generate additional images for demo purposes
  const productImages = [
    product.image,
    // For demo, we'll use the same image but in practice these would be different angles
    product.image,
    product.image
  ];

  const handleContactStore = () => {
    window.open('https://wa.me/22231465497', '_blank');
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  // Group similar products by subcategory
  const groupedSimilarProducts = similarProducts.reduce((acc, product) => {
    const key = product.subCategory;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categoryLabels = {
    'electronics': 'الإلكترونيات',
    'clothes': 'الملابس',
    'home-goods': 'منتجات المنزل',
    'car-parts': 'غيار السيارات',
    'other': 'أخرى'
  };

  const isNew = Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  const isBestDiscount = product.discount >= 20; // Products with 20% or more discount are marked as best discount

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-5xl p-0 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 dark:text-white">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <DialogDescription className="sr-only">تفاصيل المنتج</DialogDescription>
        
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 p-4 flex justify-between items-center border-b dark:border-gray-800">
          <h2 className="text-xl font-bold text-rahati-dark dark:text-white truncate flex-1 text-right">{product.name}</h2>
          <DialogClose>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
          
        <div className="grid md:grid-cols-7 gap-8 p-6">
          {/* Product Images Section - 4 columns on md screens */}
          <div className="md:col-span-4">
            <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden aspect-square relative group shadow-sm">
              {/* Main Image */}
              <img 
                src={productImages[activeImageIndex]} 
                alt={`${product.name} - صورة ${activeImageIndex + 1}`} 
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 p-4"
              />
              
              {/* Image Navigation Controls */}
              {productImages.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handlePrevImage}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleNextImage}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Product Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.discount > 0 && (
                  <Badge className={`${isBestDiscount ? 'bg-red-500' : 'bg-rahati-yellow text-rahati-dark'} animate-fade-in`}>
                    {isBestDiscount ? 'أفضل خصم! ' : 'خصم '}{product.discount}%
                  </Badge>
                )}
                {isNew && (
                  <Badge className="bg-rahati-purple text-white animate-fade-in">
                    جديد
                  </Badge>
                )}
              </div>

              {/* Zoom Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>

            {/* Thumbnails with active indicator */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {productImages.map((img, index) => (
                  <div 
                    key={`thumb-${index}`}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all w-16 h-16 hover:scale-105 ${activeImageIndex === index ? 'border-rahati-purple ring-2 ring-purple-200' : 'border-transparent'}`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info - 3 columns on md screens */}
          <div className="md:col-span-3 text-right flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-rahati-purple bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded-full">
                {product.city}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
            </div>

            <div className="mb-6 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {product.originalPrice > 0 && (
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-bold text-2xl text-rahati-purple dark:text-purple-300">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900/40 dark:hover:text-green-300 cursor-help">
                        {product.category}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-black text-white">
                      <p>فئة المنتج</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Badge variant="outline" className="text-gray-600 dark:text-gray-300 dark:border-gray-600">
                {categoryLabels[product.subCategory as keyof typeof categoryLabels] || product.subCategory}
              </Badge>
            </div>
              
            <div className="flex-grow mb-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">الوصف:</h3>
              <ScrollArea className="h-[120px] rounded-md border p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </ScrollArea>
            </div>
              
            {product.storeId && (
              <div className="bg-gradient-to-l from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 p-4 rounded-xl mb-6 flex justify-between items-center shadow-sm">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-rahati-purple dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                  onClick={() => {/* Navigate to store */}}
                >
                  عرض المتجر
                </Button>
                <p className="font-semibold text-rahati-dark dark:text-gray-200 flex items-center gap-1">
                  <span>المتجر:</span>
                  <span>{product.storeName || 'متجر'}</span>
                </p>
              </div>
            )}
              
            <div className="flex gap-2 mt-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-rahati-purple to-purple-600 hover:opacity-90 transition-opacity shadow-md dark:text-white"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>أضف للسلة</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-green-500 text-green-600 dark:text-green-400 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm"
                onClick={handleContactStore}
              >
                <MessagesSquare className="mr-2 h-4 w-4" />
                <span>تواصل مع المتجر</span>
              </Button>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                className="flex-1 transition-all duration-300 hover:border-rahati-purple hover:text-rahati-purple dark:hover:text-purple-300 dark:hover:border-purple-600"
              >
                <Heart className="mr-2 h-4 w-4" />
                <span>أضف للمفضلة</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 transition-all duration-300 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <Share2 className="mr-2 h-4 w-4" />
                <span>مشاركة</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar Products - Enhanced Carousel */}
        {similarProducts.length > 0 && (
          <div className="mt-2 p-6 pt-0 border-t dark:border-gray-800">
            <Tabs defaultValue="similar" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="items-slider" className="text-sm text-gray-500 dark:text-gray-400">عدد العناصر:</label>
                  <Slider
                    id="items-slider"
                    defaultValue={[itemsPerView]}
                    max={4}
                    min={1}
                    step={1}
                    className="w-24"
                    onValueChange={(values) => setItemsPerView(values[0])}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{itemsPerView}</span>
                </div>
                <TabsList className="bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="similar" className="text-sm">منتجات مشابهة</TabsTrigger>
                  <TabsTrigger value="subcategory" className="text-sm">حسب الفئة</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="similar" className="mt-4">
                <div className="relative">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {similarProducts.map((similarProduct) => (
                        <CarouselItem key={similarProduct.id} className={`md:basis-1/${itemsPerView}`}>
                          <div className="p-1 h-full">
                            <ProductCard
                              product={similarProduct}
                              onAddToCart={onAddToCart}
                              onViewDetails={onViewDetails}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700" />
                    <CarouselNext className="-right-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700" />
                  </Carousel>
                </div>
              </TabsContent>
              
              <TabsContent value="subcategory" className="mt-4">
                {Object.entries(groupedSimilarProducts).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedSimilarProducts).map(([category, products]) => (
                      <div key={category} className="space-y-3">
                        <h4 className="text-right font-medium text-rahati-dark dark:text-white">
                          {categoryLabels[category as keyof typeof categoryLabels] || category}
                        </h4>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="w-full"
                        >
                          <CarouselContent>
                            {products.map((similarProduct) => (
                              <CarouselItem key={similarProduct.id} className={`md:basis-1/${itemsPerView}`}>
                                <div className="p-1 h-full">
                                  <ProductCard
                                    product={similarProduct}
                                    onAddToCart={onAddToCart}
                                    onViewDetails={onViewDetails}
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="-left-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700" />
                          <CarouselNext className="-right-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700" />
                        </Carousel>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">لا توجد منتجات متاحة في هذه الفئة</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
