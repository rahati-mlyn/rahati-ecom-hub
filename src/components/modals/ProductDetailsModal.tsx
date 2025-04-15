
import React from 'react';
import { X, ShoppingCart, Share2, Heart } from 'lucide-react';
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
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <DialogClose>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
            <h2 className="text-2xl font-bold text-rahati-dark">{product.name}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-2 left-2 bg-rahati-yellow text-rahati-dark">
                  خصم {product.discount}%
                </Badge>
              )}
            </div>
            
            {/* Product Info */}
            <div className="text-right flex flex-col">
              <div className="mb-4">
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
                  <p className="text-sm text-muted-foreground">{product.city}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              {product.storeId && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="font-semibold text-rahati-dark">المتجر: {product.storeName || 'متجر'}</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-auto">
                <Button 
                  className="flex-1 bg-rahati-purple hover:bg-rahati-purple/90"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>أضف للسلة</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-6 p-6 pt-0">
            <Separator className="mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-right text-rahati-dark">منتجات مشابهة</h3>
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
