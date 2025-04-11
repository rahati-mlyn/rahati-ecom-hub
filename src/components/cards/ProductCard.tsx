
import React from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleShare = () => {
    // Create share text
    const shareText = `${product.name} - ${formatPrice(product.price)}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `تحقق من هذا المنتج: ${shareText}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${product.name} - ${formatPrice(product.price)} - ${window.location.href}`);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط المنتج",
        duration: 2000,
      });
    }
  };

  return (
    <Card className="overflow-hidden card-hover border border-gray-200">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onClick={() => onViewDetails(product)}
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-rahati-yellow text-rahati-dark">
            خصم {product.discount}%
          </Badge>
        )}
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
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
