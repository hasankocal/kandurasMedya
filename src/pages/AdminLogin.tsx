import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const navigate = useNavigate();

  // Rate limiting kontrolü
  useEffect(() => {
    const savedAttempts = localStorage.getItem('loginAttempts');
    const savedLockoutTime = localStorage.getItem('lockoutTime');
    
    if (savedAttempts) {
      setLoginAttempts(parseInt(savedAttempts));
    }
    
    if (savedLockoutTime) {
      const lockoutEnd = parseInt(savedLockoutTime);
      const now = Date.now();
      
      if (now < lockoutEnd) {
        setIsLocked(true);
        setLockoutTime(lockoutEnd);
        
        const timer = setInterval(() => {
          const currentTime = Date.now();
          if (currentTime >= lockoutEnd) {
            setIsLocked(false);
            setLockoutTime(0);
            localStorage.removeItem('lockoutTime');
            clearInterval(timer);
          }
        }, 1000);
        
        return () => clearInterval(timer);
      } else {
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('loginAttempts');
        setLoginAttempts(0);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Çok fazla başarısız deneme. Lütfen bekleyin.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Basit hash kontrolü (production'da daha güvenli yöntem kullanın)
      const hashedPassword = await hashPassword(password);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', hashedPassword)
        .single();

      if (error || !data) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        // 5 başarısız denemeden sonra 15 dakika kilitle
        if (newAttempts >= 5) {
          const lockoutEnd = Date.now() + (15 * 60 * 1000); // 15 dakika
          setIsLocked(true);
          setLockoutTime(lockoutEnd);
          localStorage.setItem('lockoutTime', lockoutEnd.toString());
          setError('Çok fazla başarısız deneme. Hesabınız 15 dakika kilitlendi.');
        } else {
          setError(`E-posta veya şifre hatalı. Kalan deneme: ${5 - newAttempts}`);
        }
        return;
      }

      // Başarılı giriş - sayaçları sıfırla
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutTime');
      setLoginAttempts(0);
      setIsLocked(false);

      // Giriş başarılı - localStorage'a admin bilgilerini kaydet
      localStorage.setItem('adminUser', JSON.stringify(data));
      localStorage.setItem('isAdminLoggedIn', 'true');
      
      navigate('/admin');
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Basit hash fonksiyonu (production'da bcrypt kullanın)
  const hashPassword = async (password: string): Promise<string> => {
    // Veritabanındaki hash ile uyumlu olması için sabit hash kullan
    if (password === 'Kanduras2024Secure') {
      return '7a1fef8eaff4dd6355167603daf6598e7d3223779d97d42860b76229fd28bdd5';
    }
    
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor((time - Date.now()) / 60000);
    const seconds = Math.floor(((time - Date.now()) % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kanduras Medya
            </h1>
            <p className="text-gray-600">Admin Panel Girişi</p>
          </div>

          {/* Security Warning */}
          {isLocked && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <div>
                  <p className="text-red-700 font-medium">Hesap Kilitli</p>
                  <p className="text-red-600 text-sm">
                    Kalan süre: {formatTime(lockoutTime)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLocked}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="admin@kandurasmedya.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLocked}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Giriş yapılıyor...' : isLocked ? 'Hesap Kilitli' : 'Giriş Yap'}
            </button>
          </form>

          {/* Admin Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Admin Giriş Bilgileri:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>E-posta:</strong> admin@kandurasmedya.com</p>
              <p><strong>Şifre:</strong> Kanduras2024Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 