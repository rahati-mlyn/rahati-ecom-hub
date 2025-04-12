
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Store, Utensils, Building, Car, Shirt, Tv, Sofa } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateId } from '@/lib/utils';

type StoreType = 'store' | 'restaurant' | 'realestate' | 'car' | 'clothes' | 'electronics' | 'homegoods';

const AddStorePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [storeType, setStoreType] = useState<StoreType>('store');
  const [city, setCity] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [image, setImage] = useState('/placeholder.svg');
  
  // Simulated image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImage(event.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!storeName || !description || !city || !contactPhone) {
      toast({
        title: "يرجى تعبئة جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate store creation
    const storeId = generateId();
    
    toast({
      title: "تم إنشاء المتجر بنجاح",
      description: `تم إنشاء ${storeName} بنجاح!`,
      duration: 3000,
    });
    
    // In a real application, we would save the store data to a database
    // For now, we'll just redirect to the home page
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  // Function to render the appropriate icon for each store type
  const renderStoreTypeIcon = (type: StoreType) => {
    switch (type) {
      case 'store': return <Store className="h-5 w-5" />;
      case 'restaurant': return <Utensils className="h-5 w-5" />;
      case 'realestate': return <Building className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      case 'clothes': return <Shirt className="h-5 w-5" />;
      case 'electronics': return <Tv className="h-5 w-5" />;
      case 'homegoods': return <Sofa className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header 
        onOpenSidebar={() => {}} 
        onOpenCart={() => {}}
        onSearch={() => {}}
        cartItems={[]} // Pass an empty array to fix the error
      />
      
      {/* Navigation */}
      <Navigation 
        onSelectCategory={() => {}}
        currentCategory="shopping"
        currentSubCategory={undefined}
      />
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-rahati-purple mb-6 text-center">إنشاء متجر جديد</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Store Type Selection */}
            <div className="space-y-2">
              <Label className="block text-lg font-medium mb-4">نوع المتجر</Label>
              <RadioGroup 
                defaultValue={storeType} 
                onValueChange={(value) => setStoreType(value as StoreType)}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="store" className="flex items-center justify-between w-full cursor-pointer">
                    <span>متجر إلكتروني</span>
                    <Store className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="store" id="store" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="restaurant" className="flex items-center justify-between w-full cursor-pointer">
                    <span>مطعم</span>
                    <Utensils className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="restaurant" id="restaurant" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="realestate" className="flex items-center justify-between w-full cursor-pointer">
                    <span>عقارات</span>
                    <Building className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="realestate" id="realestate" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="car" className="flex items-center justify-between w-full cursor-pointer">
                    <span>سيارات</span>
                    <Car className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="car" id="car" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="clothes" className="flex items-center justify-between w-full cursor-pointer">
                    <span>ملابس</span>
                    <Shirt className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="clothes" id="clothes" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="electronics" className="flex items-center justify-between w-full cursor-pointer">
                    <span>إلكترونيات</span>
                    <Tv className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="electronics" id="electronics" />
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                  <Label htmlFor="homegoods" className="flex items-center justify-between w-full cursor-pointer">
                    <span>مستلزمات منزلية</span>
                    <Sofa className="h-5 w-5 text-rahati-purple" />
                  </Label>
                  <RadioGroupItem value="homegoods" id="homegoods" />
                </div>
              </RadioGroup>
            </div>
            
            {/* Store Image */}
            <div className="space-y-2">
              <Label htmlFor="storeImage">صورة المتجر</Label>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-md overflow-hidden border">
                  <img 
                    src={image} 
                    alt="Store preview" 
                    className="w-full h-full object-cover"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </label>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </div>
                <span className="text-sm text-muted-foreground">اضغط لاختيار صورة</span>
              </div>
            </div>
            
            {/* Store Details */}
            <div className="space-y-2">
              <Label htmlFor="storeName">اسم المتجر</Label>
              <Input 
                id="storeName" 
                placeholder="أدخل اسم المتجر" 
                value={storeName} 
                onChange={(e) => setStoreName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storeDescription">وصف المتجر</Label>
              <Textarea 
                id="storeDescription" 
                placeholder="أدخل وصفًا مختصرًا للمتجر" 
                rows={4}
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">المدينة</Label>
                <Select 
                  value={city} 
                  onValueChange={setCity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riyadh">الرياض</SelectItem>
                    <SelectItem value="jeddah">جدة</SelectItem>
                    <SelectItem value="dammam">الدمام</SelectItem>
                    <SelectItem value="mecca">مكة المكرمة</SelectItem>
                    <SelectItem value="medina">المدينة المنورة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">رقم الهاتف للتواصل</Label>
                <Input 
                  id="contactPhone" 
                  placeholder="أدخل رقم الهاتف" 
                  value={contactPhone} 
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <Button type="submit" className="w-full bg-rahati-purple hover:bg-rahati-purple/90 text-white">
              إنشاء المتجر
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddStorePage;
