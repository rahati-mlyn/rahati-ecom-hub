
import React from 'react';
import { formatPrice } from '@/lib/utils';

interface FormattedPriceProps {
  price: number;
  className?: string;
}

export const FormattedPrice: React.FC<FormattedPriceProps> = ({ price, className }) => {
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ __html: formatPrice(price) }}
    />
  );
};
