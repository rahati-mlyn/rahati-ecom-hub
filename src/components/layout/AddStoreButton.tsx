
import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AddStoreButton = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/add-store');
  };
  
  return (
    <Button 
      variant="outline" 
      className="bg-rahati-yellow text-rahati-dark hover:bg-rahati-yellow/90 flex items-center gap-1"
      onClick={handleClick}
    >
      <Plus className="h-4 w-4" />
      <span>إنشاء متجر</span>
    </Button>
  );
};

export default AddStoreButton;
