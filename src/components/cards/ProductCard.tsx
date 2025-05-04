
import React, { useState } from 'react';
import { ShoppingCart, Heart, ZoomIn, X } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogClose, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  const isNew = Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <Card 
        className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 h-full bg-white hover:translate-y-[-5px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-gray-50 to-white group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={() => onViewDetails(product)}
          />
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex gap-2 animate-fade-in">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-white text-rahati-purple hover:bg-white shadow-md" 
                      size="sm" 
                      onClick={() => onAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>أضف للسلة</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-white text-rahati-purple hover:bg-white shadow-md" 
                      size="sm" 
                      onClick={openImageModal}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>تكبير الصورة</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="bg-white text-rahati-purple hover:bg-white shadow-md" 
                      size="sm"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>إضافة للمفضلة</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Product Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount > 0 && (
              <Badge className="bg-rahati-yellow text-rahati-dark animate-fade-in">
                خصم {product.discount}%
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-rahati-purple text-white animate-fade-in">
                جديد
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4 text-right">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">{new Date(product.createdAt).toLocaleDateString('ar-EG')}</p>
            <h3 
              className="font-semibold text-lg truncate cursor-pointer hover:text-rahati-purple transition-colors"
              onClick={() => onViewDetails(product)}
            >
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-1">
            {product.originalPrice > 0 && product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-medium text-rahati-purple">
              {formatPrice(product.price)}
            </span>
            <p className="text-sm bg-purple-50 text-rahati-purple px-2 py-0.5 rounded-full">{product.city}</p>
          </div>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button 
            className="flex-1 bg-gradient-to-r from-rahati-purple to-purple-600 hover:opacity-90 transition-opacity"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>أضف للسلة</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="hover:bg-rahati-purple/10 hover:text-rahati-purple transition-colors"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">
            {product.name}
          </DialogTitle>
          <div className="relative bg-white p-1 rounded-lg overflow-hidden">
            <DialogClose className="absolute top-2 right-2 z-10">
              <Button variant="ghost" size="icon" className="hover:bg-black/10 rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
