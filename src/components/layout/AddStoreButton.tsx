
import React from 'react';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddStoreButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/22231465497', '_blank');
  };
  
  return (
    <Button 
      variant="outline" 
      className="bg-rahati-yellow text-rahati-dark hover:bg-rahati-yellow/90 flex items-center gap-1 shadow-sm hover:shadow-md transition-all duration-300"
      onClick={handleClick}
    >
      <Store className="h-4 w-4" />
      <span>إنشاء متجر</span>
    </Button>
  );
};

export default AddStoreButton;
