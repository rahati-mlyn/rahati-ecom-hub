
import React, { useState } from 'react';
import { ShoppingCart, Heart, Plus, ZoomIn, X } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

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

  const openImageModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowImageModal(true);
  };

  return (
    <>
      <Card className="overflow-hidden card-hover transition-all duration-300 hover:shadow-lg border border-gray-200">
        <div className="aspect-square relative overflow-hidden bg-gray-100 group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={() => onViewDetails(product)}
          />
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-rahati-yellow text-rahati-dark">
              خصم {product.discount}%
            </Badge>
          )}
          <Button 
            className="absolute bottom-2 right-2 bg-white/80 text-rahati-purple hover:bg-white" 
            size="sm" 
            variant="outline"
            onClick={openImageModal}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4 text-right">
          <h3 
            className="font-semibold text-lg truncate cursor-pointer hover:text-rahati-purple transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              {product.originalPrice > 0 && (
                <span className="text-muted-foreground line-through text-sm">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="font-medium text-rahati-purple">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{product.city}</p>
          </div>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button 
            className="flex-1 bg-rahati-purple hover:bg-rahati-purple/90"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>أضف للسلة</span>
          </Button>
          <Button variant="outline" size="icon" className="hover:bg-rahati-purple/10 hover:text-rahati-purple">
            <Heart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none shadow-none">
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
