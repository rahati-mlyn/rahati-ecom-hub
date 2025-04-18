
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
  User, 
  Package, 
  LogOut, 
  Store, 
  ShoppingBag, 
  Settings, 
  Edit,
  Clock,
  DollarSign,
  Heart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserOrders } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون حرفين على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Fetch user orders
  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['userOrders'],
    queryFn: getUserOrders,
    // If the API call fails, return an empty array to avoid errors
    onError: (error) => {
      console.error("Error fetching orders:", error);
      return [];
    }
  });

  // Initialize form with user data
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
    },
  });

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    // Here you would send an API request to update the user profile
    console.log("Updated profile:", values);
    
    toast({
      title: "تم التحديث",
      description: "تم تحديث معلومات الحساب بنجاح",
    });
    
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openStore = () => {
    if (user?.storeId) {
      navigate('/store-management');
    } else {
      navigate('/add-store');
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">قيد الانتظار</Badge>;
      case 'preparing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">جاري التجهيز</Badge>;
      case 'shipping':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">جاري الشحن</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">تم التسليم</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">تم الرفض</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Mock stats for demonstration
  const userStats = {
    totalOrders: orders?.length || 0,
    completedOrders: orders?.filter(order => order.status === 'delivered').length || 0,
    pendingOrders: orders?.filter(order => ['pending', 'preparing', 'shipping'].includes(order.status)).length || 0,
    totalSpent: orders?.reduce((total, order) => total + order.total, 0) || 0,
    favoriteStores: ['متجر الإلكترونيات', 'مطعم الذواقة', 'منزلي للأثاث'],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">حسابي</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="lg:w-1/3">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-rahati-purple/20 ring-offset-2">
                  <AvatarImage src="/lovable-uploads/0950e701-254f-41c2-9f33-1fa067702b38.png" alt={user?.name} />
                  <AvatarFallback className="bg-rahati-purple text-white text-xl">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Package className="h-5 w-5 mx-auto mb-1 text-rahati-purple" />
                    <p className="text-xs text-gray-500">الطلبات</p>
                    <p className="text-lg font-semibold">{userStats.totalOrders}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <DollarSign className="h-5 w-5 mx-auto mb-1 text-rahati-purple" />
                    <p className="text-xs text-gray-500">المشتريات</p>
                    <p className="text-lg font-semibold">{formatPrice(userStats.totalSpent)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-rahati-purple" />
                    <p className="text-xs text-gray-500">قيد التنفيذ</p>
                    <p className="text-lg font-semibold">{userStats.pendingOrders}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-rahati-purple" />
                    <p className="text-xs text-gray-500">المتاجر المفضلة</p>
                    <p className="text-lg font-semibold">{userStats.favoriteStores.length}</p>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/orders')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    <span>طلباتي</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={openStore}
                  >
                    <Store className="mr-2 h-4 w-4" />
                    <span>{user?.storeId ? 'إدارة المتجر' : 'إنشاء متجر'}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>تسوق الآن</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="bg-white rounded-lg mb-6 p-1 border">
                <TabsTrigger value="profile" className="data-[state=active]:bg-rahati-purple data-[state=active]:text-white">
                  <User className="h-4 w-4 mr-2" />
                  <span>الملف الشخصي</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-rahati-purple data-[state=active]:text-white">
                  <Package className="h-4 w-4 mr-2" />
                  <span>الطلبات</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-rahati-purple data-[state=active]:text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  <span>المفضلة</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-rahati-purple data-[state=active]:text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>الإعدادات</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>معلومات الحساب</CardTitle>
                      <CardDescription>تحديث معلومات الملف الشخصي</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      <span>{isEditing ? 'إلغاء' : 'تعديل'}</span>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>الاسم</FormLabel>
                                <FormControl>
                                  <Input placeholder="الاسم الكامل" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>البريد الإلكتروني</FormLabel>
                                <FormControl>
                                  <Input placeholder="البريد الإلكتروني" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>رقم الهاتف (اختياري)</FormLabel>
                                <FormControl>
                                  <Input placeholder="رقم الهاتف" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>العنوان (اختياري)</FormLabel>
                                <FormControl>
                                  <Input placeholder="العنوان" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end">
                            <Button type="submit" className="bg-rahati-purple hover:bg-rahati-purple/90">
                              حفظ التغييرات
                            </Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">الاسم</h3>
                            <p className="mt-1">{user?.name}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">البريد الإلكتروني</h3>
                            <p className="mt-1">{user?.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">نوع الحساب</h3>
                            <p className="mt-1">
                              {user?.role === 'admin' ? 'مدير' : 
                               user?.role === 'store_owner' ? 'صاحب متجر' : 'مستخدم'}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">تاريخ الانضمام</h3>
                            <p className="mt-1">منذ 3 أشهر</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>سجل الطلبات</CardTitle>
                    <CardDescription>جميع طلباتك السابقة والحالية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingOrders ? (
                      <div className="flex justify-center py-8">
                        <p>جاري تحميل الطلبات...</p>
                      </div>
                    ) : !orders || orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">لا توجد طلبات سابقة</p>
                        <Button 
                          className="mt-4 bg-rahati-purple hover:bg-rahati-purple/90"
                          onClick={() => navigate('/')}
                        >
                          تسوق الآن
                        </Button>
                      </div>
                    ) : (
                      <Table>
                        <TableCaption>سجل الطلبات</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>رقم الطلب</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>المبلغ</TableHead>
                            <TableHead>الحالة</TableHead>
                            <TableHead className="text-left">تفاصيل</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map(order => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                              <TableCell>{new Date(order.orderDate).toLocaleDateString('ar-SA')}</TableCell>
                              <TableCell>{formatPrice(order.total)}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigate(`/orders/${order.id}`)}
                                >
                                  عرض
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>المتاجر المفضلة</CardTitle>
                    <CardDescription>المتاجر التي قمت بإضافتها إلى المفضلة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userStats.favoriteStores.map((store, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <Store className="h-6 w-6 text-rahati-purple" />
                          </div>
                          <div>
                            <h3 className="font-medium">{store}</h3>
                            <p className="text-sm text-gray-500">زيارة المتجر</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الحساب</CardTitle>
                    <CardDescription>إدارة تفضيلات الحساب والإشعارات والأمان</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">تفضيلات الإشعارات</h3>
                        <div className="space-y-4">
                          {/* Notification settings would go here */}
                          <p className="text-center text-gray-500 py-4">
                            تفضيلات الإشعارات قيد التطوير
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">الأمان</h3>
                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start">
                            تغيير كلمة المرور
                          </Button>
                          <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>تسجيل الخروج من جميع الأجهزة</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
