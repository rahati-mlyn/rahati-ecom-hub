
import React from 'react';
import RestaurantCard from './RestaurantCard';
import RestaurantRating from '../restaurants/RestaurantRating';
import { Restaurant } from '@/types/restaurant';
import { MenuItem } from '@/types/restaurant';

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
          className="w-full mt-2 py-2 px-4 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
          <span className="text-sm">تواصل عبر واتساب</span>
        </button>
      </div>
    </div>
  );
};

export default RestaurantCardWrapper;
