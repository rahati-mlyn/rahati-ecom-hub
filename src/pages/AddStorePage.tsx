
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createStore } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { StoreRequest } from '@/types/apiTypes';

const AddStorePage = () => {
  const [formData, setFormData] = useState<StoreRequest>({
    name: '',
    description: '',
    type: 'store',
    contactPhone: '',
    city: '',
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.contactPhone) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data with the image file if selected
      const storeRequestData: StoreRequest = {
        ...formData,
        // Fixed the issue: Ensure required fields are not undefined
        name: formData.name, 
        description: formData.description,
        type: formData.type || 'store',
        contactPhone: formData.contactPhone,
        city: formData.city || '',
      };
      
      if (selectedImage) {
        storeRequestData.image = selectedImage;
      }
      
      await createStore(storeRequestData);
      
      toast({
        title: "تم إرسال الطلب",
        description: "تم إرسال طلب إنشاء المتجر بنجاح، سيتم مراجعته من قبل الإدارة",
      });
      
      // Redirect to homepage after successful submission
      navigate('/');
    } catch (error) {
      console.error("Error creating store:", error);
      toast({
        title: "حدث خطأ",
        description: "فشل في إنشاء المتجر، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-rahati-dark">إنشاء متجر جديد</CardTitle>
            <CardDescription>قم بتعبئة البيانات التالية لإنشاء متجرك الخاص</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Store Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">اسم المتجر</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="أدخل اسم المتجر" 
                  dir="rtl"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Store Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-right block">نوع المتجر</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('type', value)} 
                  defaultValue={formData.type}
                >
                  <SelectTrigger id="type" name="type">
                    <SelectValue placeholder="اختر نوع المتجر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store">متجر عام</SelectItem>
                    <SelectItem value="restaurant">مطعم</SelectItem>
                    <SelectItem value="realestate">عقارات</SelectItem>
                    <SelectItem value="car">سيارات</SelectItem>
                    <SelectItem value="clothes">ملابس</SelectItem>
                    <SelectItem value="electronics">إلكترونيات</SelectItem>
                    <SelectItem value="homegoods">أثاث ومستلزمات منزلية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-right block">وصف المتجر</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="أدخل وصفاً للمتجر" 
                  dir="rtl"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              {/* Contact Phone */}
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-right block">رقم التواصل</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone" 
                  placeholder="أدخل رقم التواصل" 
                  dir="rtl"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-right block">المدينة</Label>
                <Input 
                  id="city" 
                  name="city" 
                  placeholder="أدخل المدينة" 
                  dir="rtl"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-right block">صورة المتجر (اختياري)</Label>
                <Input 
                  id="image" 
                  name="image" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:px-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rahati-purple/10 file:text-rahati-purple hover:file:bg-rahati-purple/20"
                />
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="bg-rahati-purple hover:bg-rahati-purple/90 px-10 py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب إنشاء المتجر'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddStorePage;
