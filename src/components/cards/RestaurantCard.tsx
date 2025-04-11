
import React, { useState } from 'react';
import { MapPin, Star, Share2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Restaurant, MenuItem } from '@/types/restaurant';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewDetails: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onViewDetails
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();
  
  const handleShare = () => {
    // Create share text
    const shareText = `${restaurant.name} - ${restaurant.cuisine.join(', ')}`;
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `تحقق من هذا المطعم: ${shareText}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${restaurant.name} - ${restaurant.cuisine.join(', ')} - ${window.location.href}`);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط المطعم",
        duration: 2000,
      });
    }
  };

  // Get featured menu items (up to 3)
  const featuredItems = restaurant.menu.slice(0, 3);

  return (
    <Card className="overflow-hidden border border-gray-200">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onClick={() => onViewDetails(restaurant)}
        />
      </div>
      <CardContent className="p-4 text-right">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm ml-1">{restaurant.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
          <h3 
            className="font-semibold text-lg cursor-pointer hover:text-rahati-purple transition-colors"
            onClick={() => onViewDetails(restaurant)}
          >
            {restaurant.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-end mt-1 text-sm text-muted-foreground">
          <span>{restaurant.city}</span>
          <MapPin className="h-3 w-3 mr-1 ml-1" />
        </div>
        
        <div className="flex flex-wrap items-center gap-1 mt-2 justify-end">
          {restaurant.cuisine.map((type, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {restaurant.description}
        </p>
        
        {/* Menu Items Section */}
        <div className="mt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full flex items-center justify-between border"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span>{showMenu ? 'إخفاء الوجبات' : 'عرض الوجبات'}</span>
            {showMenu ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showMenu && (
            <div className="mt-2 space-y-2 border rounded-md p-2">
              {featuredItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <span className="font-medium text-rahati-purple">{formatPrice(item.price)}</span>
                  </div>
                  <div className="flex-1 text-right px-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  <div className="h-10 w-10 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
              {restaurant.menu.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full text-rahati-purple mt-1">
                  عرض المزيد من الوجبات
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="h-4 w-4 ml-2" />
          مشاركة
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-rahati-purple hover:bg-rahati-purple/90"
          onClick={() => onViewDetails(restaurant)}
        >
          عرض المطعم
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
