
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
import { X } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await loginUser({ email, password });
      
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
            <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              dir="rtl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور"
              dir="rtl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
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
