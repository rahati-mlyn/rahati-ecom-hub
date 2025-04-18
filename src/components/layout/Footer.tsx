
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">راحتي</h3>
            <p className="text-gray-600 text-sm">
              منصة راحتي هي منصة رقمية تسمح للمستخدمين بالتسوق وطلب الطعام وخدمات عديدة أخرى في موريتانيا.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-rahati-purple text-sm">الرئيسية</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-rahati-purple text-sm">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-rahati-purple text-sm">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-rahati-purple text-sm">شروط الاستخدام</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-rahati-purple text-sm">سياسة الخصوصية</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 ml-2 rtl:mr-2" />
                <span>+222 31465497</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 ml-2 rtl:mr-2" />
                <span>info@rahati.mr</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 ml-2 rtl:mr-2" />
                <span>نواكشوط، موريتانيا</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} راحتي. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
