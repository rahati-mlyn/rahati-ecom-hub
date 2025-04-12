
import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Restaurant } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onViewDetails: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onViewDetails
}) => {
  return (
    <Card className="overflow-hidden card-hover border border-gray-200">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onClick={() => onViewDetails(restaurant)}
        />
      </div>
      <CardContent className="p-4 text-right">
        <h3 
          className="font-semibold text-lg truncate cursor-pointer hover:text-rahati-purple transition-colors"
          onClick={() => onViewDetails(restaurant)}
        >
          {restaurant.name}
        </h3>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.floor(restaurant.rating) ? 'text-rahati-yellow fill-rahati-yellow' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({restaurant.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{restaurant.city}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {restaurant.cuisine.map((item, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-rahati-purple/10 text-rahati-purple rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{restaurant.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-rahati-purple hover:bg-rahati-purple/90"
          onClick={() => onViewDetails(restaurant)}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>عرض القائمة</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
