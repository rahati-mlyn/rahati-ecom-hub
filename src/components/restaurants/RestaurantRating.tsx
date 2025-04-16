
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RestaurantRatingProps {
  restaurantId: string;
  restaurantName: string;
  initialRating?: number;
  isLoggedIn: boolean;
}

const RestaurantRating: React.FC<RestaurantRatingProps> = ({ 
  restaurantId, 
  restaurantName, 
  initialRating = 0,
  isLoggedIn
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (selectedRating: number) => {
    if (!isLoggedIn) {
      toast({
        title: "تنبيه",
        description: "يجب تسجيل الدخول لتقييم المطعم",
        variant: "destructive"
      });
      return;
    }

    setRating(selectedRating);
    setHasRated(true);
    
    // Here you would typically save the rating to a database
    toast({
      title: "شكراً لك",
      description: `لقد قمت بتقييم ${restaurantName} بـ ${selectedRating} نجوم`,
    });
  };

  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
      <p className="font-medium mb-2 text-center">قيم المطعم</p>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-1"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => handleRatingClick(star)}
            disabled={hasRated}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      {!isLoggedIn && (
        <p className="text-xs text-gray-500 text-center">
          يجب تسجيل الدخول لتقييم المطعم
        </p>
      )}
      {hasRated && (
        <p className="text-sm text-green-600 text-center">
          شكراً لتقييمك!
        </p>
      )}
    </div>
  );
};

export default RestaurantRating;
