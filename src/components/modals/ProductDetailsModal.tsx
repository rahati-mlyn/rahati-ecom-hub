
import React, { useState } from 'react';
import { X, ShoppingCart, Share2, Heart, MessagesSquare, ArrowLeft, ArrowRight, Images, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';
import ProductCard from '../cards/ProductCard';

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 max-h-[90vh] overflow-y-auto bg-white">
        <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold text-rahati-dark truncate flex-1 text-right">{product.name}</h2>
          <DialogClose>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
          
        <div className="grid md:grid-cols-7 gap-6 p-6">
          {/* Product Images Section - 4 columns on md screens */}
          <div className="md:col-span-4">
            <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square relative">
              {/* Main Image */}
              <img 
                src={productImages[activeImageIndex]} 
                alt={`${product.name} - صورة ${activeImageIndex + 1}`} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Image Navigation Controls */}
              {productImages.length > 1 && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-lg"
                    onClick={handlePrevImage}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow-lg"
                    onClick={handleNextImage}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Product Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.discount > 0 && (
                  <Badge className="bg-rahati-yellow text-rahati-dark">
                    خصم {product.discount}%
                  </Badge>
                )}
                {Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                  <Badge className="bg-rahati-purple text-white">
                    جديد
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-3 justify-center">
                {productImages.map((img, index) => (
                  <div 
                    key={`thumb-${index}`}
                    className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all w-16 h-16 ${activeImageIndex === index ? 'border-rahati-purple' : 'border-transparent'}`}
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
              <p className="text-sm text-rahati-purple bg-purple-50 px-3 py-1 rounded-full">
                {product.city}
              </p>
              <p className="text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
            </div>

            <div className="mb-4 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {product.originalPrice > 0 && (
                    <span className="text-muted-foreground line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="font-bold text-xl text-rahati-purple">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                  {product.category}
                </Badge>
              </div>
              <Badge variant="outline" className="text-gray-600">
                {product.subCategory === 'car-parts' ? 'غيار السيارات' :
                 product.subCategory === 'electronics' ? 'الإلكترونيات' :
                 product.subCategory === 'clothes' ? 'الملابس' :
                 product.subCategory === 'home-goods' ? 'منتجات المنزل' : 'أخرى'}
              </Badge>
            </div>
              
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-700 mb-2">الوصف:</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>
              
            {product.storeId && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-rahati-purple hover:bg-purple-50"
                  onClick={() => {/* Navigate to store */}}
                >
                  عرض المتجر
                </Button>
                <p className="font-semibold text-rahati-dark flex items-center gap-1">
                  <span>المتجر:</span>
                  <span>{product.storeName || 'متجر'}</span>
                </p>
              </div>
            )}
              
            <div className="flex gap-2 mt-3">
              <Button 
                className="flex-1 bg-rahati-purple hover:bg-rahati-purple/90"
                onClick={() => onAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>أضف للسلة</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                onClick={handleContactStore}
              >
                <MessagesSquare className="mr-2 h-4 w-4" />
                <span>تواصل مع المتجر</span>
              </Button>
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                <span>أضف للمفضلة</span>
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                <span>مشاركة</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-2 p-6 pt-0 border-t">
            <h3 className="text-xl font-semibold mb-4 text-right text-rahati-dark flex items-center justify-end">
              <span>منتجات مشابهة</span>
              <Images className="mr-2 h-5 w-5 text-rahati-purple" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {similarProducts.slice(0, 3).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails} 
                />
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
