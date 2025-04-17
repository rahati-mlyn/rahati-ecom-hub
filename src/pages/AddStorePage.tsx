
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Store, Upload, Building, Utensils, Car, CheckCircle } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createStore } from '@/services/api';
import { StoreRequest } from '@/types/apiTypes';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const storeFormSchema = z.object({
  name: z.string()
    .min(3, { message: "اسم المتجر يجب أن يكون 3 أحرف على الأقل" })
    .max(50, { message: "اسم المتجر يجب أن يكون 50 حرف كحد أقصى" }),
  description: z.string()
    .min(20, { message: "وصف المتجر يجب أن يكون 20 حرف على الأقل" })
    .max(500, { message: "وصف المتجر لا يمكن أن يتجاوز 500 حرف" }),
  type: z.enum(['store', 'restaurant', 'realestate', 'car', 'clothes', 'electronics', 'homegoods'], {
    required_error: "يرجى اختيار نوع المتجر",
  }),
  contactPhone: z.string()
    .min(8, { message: "رقم الهاتف يجب أن يكون 8 أرقام على الأقل" })
    .max(15, { message: "رقم الهاتف لا يمكن أن يتجاوز 15 رقم" }),
  city: z.string().min(2, { message: "يرجى إدخال المدينة" }),
});

const AddStorePage = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "store",
      contactPhone: "",
      city: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof storeFormSchema>) => {
    setIsSubmitting(true);
    
    try {
      const storeData: StoreRequest = {
        ...values,
        image: imageFile || undefined,
      };
      
      await createStore(storeData);
      setIsSuccess(true);
      
      // Optional: Navigate to a success page or back to home
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (error) {
      console.error('Error creating store:', error);
      // Error is handled by the API service
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="mt-4 text-xl">تم إرسال طلبك بنجاح</CardTitle>
            <CardDescription>
              سيتم مراجعة طلبك وسنتواصل معك قريباً
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500 mb-6">
              سيتم تحويلك إلى الصفحة الرئيسية خلال لحظات...
            </p>
            <div className="flex justify-center space-x-4 rtl:space-x-reverse">
              <Button onClick={() => navigate('/')}>
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">إنشاء متجر جديد</h1>
          <p className="text-gray-600">
            قم بملئ النموذج التالي وسنتواصل معك في أقرب وقت ممكن
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>معلومات المتجر</CardTitle>
            <CardDescription>
              أدخل تفاصيل متجرك لنتمكن من إنشاء حساب لك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Store Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المتجر</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم المتجر" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Store Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف المتجر</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أدخل وصفاً مختصراً للمتجر" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        اشرح طبيعة عمل متجرك والمنتجات أو الخدمات التي تقدمها
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Store Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع المتجر</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                            <FormControl>
                              <RadioGroupItem value="store" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center gap-1">
                              <Store className="h-4 w-4" />
                              <span>متجر عام</span>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                            <FormControl>
                              <RadioGroupItem value="restaurant" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center gap-1">
                              <Utensils className="h-4 w-4" />
                              <span>مطعم</span>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                            <FormControl>
                              <RadioGroupItem value="realestate" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span>عقارات</span>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse">
                            <FormControl>
                              <RadioGroupItem value="car" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex items-center gap-1">
                              <Car className="h-4 w-4" />
                              <span>سيارات</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Store City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل المدينة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Contact Phone */}
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="أدخل رقم الهاتف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Store Image */}
                <div className="space-y-2">
                  <FormLabel>صورة المتجر (اختياري)</FormLabel>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Store preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-rahati-purple/10 file:text-rahati-purple hover:file:bg-rahati-purple/20"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        يفضل صورة مربعة بأبعاد 600×600 بكسل
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-rahati-purple hover:bg-rahati-purple/90"
                  >
                    {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            لديك متجر بالفعل؟{' '}
            <Link 
              to="/" 
              className="font-semibold text-rahati-purple hover:text-rahati-purple/90"
            >
              قم بتسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddStorePage;
