
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogClose,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Phone, Lock } from 'lucide-react';
import { loginUser } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupClick: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSignupClick,
  onLoginSuccess
}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(\+222|222)?[2-9]\d{7}$/;
    return phoneRegex.test(phoneNumber.replace(/\s+/g, ''));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add +222 prefix if not present
    if (!digits.startsWith('222')) {
      return '+222' + digits;
    }
    return '+' + digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !password) {
      setError('الرجاء إدخال رقم الهاتف وكلمة المرور');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError('الرجاء إدخال رقم هاتف موريتاني صحيح');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await loginUser({ phone, password });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-6 gap-6">
        <DialogTitle className="text-xl font-semibold text-rahati-dark text-right mb-4">
          تسجيل الدخول
        </DialogTitle>
        <DialogDescription className="sr-only">
          قم بتسجيل الدخول للوصول إلى حسابك
        </DialogDescription>
        
        <DialogClose className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="أدخل رقم الهاتف"
                dir="rtl"
                value={phone}
                onChange={handlePhoneChange}
                disabled={isLoading}
                className="pr-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="أدخل كلمة المرور"
                dir="rtl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
            </div>
          </div>
          
          {error && (
            <p className="text-destructive text-sm text-right">{error}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-rahati-purple hover:bg-rahati-purple/90 py-6"
            disabled={isLoading}
          >
            {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <button
                type="button"
                onClick={onSignupClick}
                className="text-rahati-purple hover:underline"
              >
                إنشاء حساب
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
