import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut, 
  Users,
  FolderOpen,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(300); // 5 dakika

  // Session timeout kontrolü (30 dakika)
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika
  const WARNING_TIMEOUT = 5 * 60 * 1000; // 5 dakika uyarı

  useEffect(() => {
    const checkSession = () => {
      const adminUser = localStorage.getItem('adminUser');
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
      
      if (!adminUser || !isLoggedIn) {
        navigate('/admin/login');
        return;
      }

      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      // 25 dakika geçtiyse uyarı göster
      if (timeSinceLastActivity > (SESSION_TIMEOUT - WARNING_TIMEOUT)) {
        setShowTimeoutWarning(true);
        const remainingTime = Math.floor((SESSION_TIMEOUT - timeSinceLastActivity) / 1000);
        setTimeoutCountdown(remainingTime);
      }

      // 30 dakika geçtiyse otomatik çıkış
      if (timeSinceLastActivity > SESSION_TIMEOUT) {
        handleLogout();
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [lastActivity, navigate]);

  // Kullanıcı aktivitesini takip et
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
      setShowTimeoutWarning(false);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  // Timeout countdown
  useEffect(() => {
    if (showTimeoutWarning) {
      const timer = setInterval(() => {
        setTimeoutCountdown(prev => {
          if (prev <= 1) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showTimeoutWarning]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const extendSession = () => {
    setLastActivity(Date.now());
    setShowTimeoutWarning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: MessageSquare, label: 'İletişim', path: '/admin/contacts' },
    { icon: FileText, label: 'Blog', path: '/admin/blog' },
    { icon: Briefcase, label: 'Projeler', path: '/admin/projects' },
    { icon: FolderOpen, label: 'Hizmetler', path: '/admin/services' },
    { icon: Users, label: 'Kullanıcılar', path: '/admin/users' },
    { icon: Settings, label: 'Ayarlar', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session Timeout Warning */}
      {showTimeoutWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Oturum Süresi Doluyor</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Güvenlik nedeniyle oturumunuz yakında sonlanacak. Devam etmek istiyor musunuz?
            </p>
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-red-600">
                {formatTime(timeoutCountdown)}
              </div>
              <div className="text-sm text-gray-500">Kalan süre</div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={extendSession}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Devam Et
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Kanduras Medya</h1>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">admin@kandurasmedya.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 