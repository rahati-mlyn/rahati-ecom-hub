
import React from 'react';
import RestaurantCard from './RestaurantCard';
import RestaurantRating from '../restaurants/RestaurantRating';
import { Restaurant } from '@/types/restaurant';
import { MenuItem } from '@/types/restaurant';
import { MessagesSquare } from 'lucide-react';

interface RestaurantCardWrapperProps {
  restaurant: Restaurant;
  onViewDetails: () => void;
  onAddToCart: (menuItem: MenuItem, restaurantName: string) => void;
  isLoggedIn?: boolean;
}

const RestaurantCardWrapper: React.FC<RestaurantCardWrapperProps> = ({
  restaurant,
  onViewDetails,
  onAddToCart,
  isLoggedIn = false
}) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/22231465497?text=استفسار عن مطعم ${restaurant.name}`, '_blank');
  };
  
  return (
    <div className="flex flex-col h-full">
      <RestaurantCard 
        restaurant={restaurant} 
        onViewDetails={onViewDetails} 
        onAddToCart={onAddToCart} 
      />
      
      <div className="mt-2">
        <RestaurantRating 
          restaurantId={restaurant.id} 
          restaurantName={restaurant.name}
          isLoggedIn={isLoggedIn}
        />
        
        <button
          onClick={handleWhatsApp}
          className="w-full mt-2 py-2 px-4 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-sm hover:shadow"
        >
          <MessagesSquare className="h-4 w-4" />
          <span className="text-sm">تواصل عبر واتساب</span>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCardWrapper;
