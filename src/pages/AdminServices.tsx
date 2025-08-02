import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Save, X, Settings } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { clearSettingsCache } from '../services/siteSettingsService';
import { useSite } from '../context/SiteContext';

interface Service {
  id?: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ServiceSettings {
  services_title: string;
  services_subtitle: string;
  services_cta: string;
}

const AdminServices: React.FC = () => {
  const { refreshSettings } = useSite();
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<ServiceSettings>({
    services_title: '',
    services_subtitle: '',
    services_cta: ''
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Service>({
    title: '',
    description: '',
    icon: 'Megaphone',
    sort_order: 0,
    is_active: true
  });
  const [message, setMessage] = useState('');

  const iconOptions = [
    { value: 'Megaphone', label: 'Megaphone (Sosyal Medya)' },
    { value: 'Search', label: 'Search (SEO)' },
    { value: 'LineChart', label: 'LineChart (Analitik)' },
    { value: 'BarChart', label: 'BarChart (Raporlama)' },
    { value: 'Globe', label: 'Globe (Web Tasarım)' },
    { value: 'Mail', label: 'Mail (E-posta)' },
    { value: 'Smartphone', label: 'Smartphone (Mobil)' },
    { value: 'Target', label: 'Target (Hedefleme)' },
    { value: 'Users', label: 'Users (Müşteri)' },
    { value: 'TrendingUp', label: 'TrendingUp (Büyüme)' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Services'leri yükle
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Site settings'den services ayarlarını yükle
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('services_title, services_subtitle, services_cta')
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;
      
      if (settingsData) {
        setSettings({
          services_title: settingsData.services_title || '',
          services_subtitle: settingsData.services_subtitle || '',
          services_cta: settingsData.services_cta || ''
        });
      }
    } catch (error) {
      console.error('❌ AdminServices: Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      let result;
      
      if (editingService?.id) {
        // Güncelleme
        result = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id);
      } else {
        // Yeni service
        result = await supabase
          .from('services')
          .insert([formData]);
      }

      if (result.error) throw result.error;

      setMessage(editingService ? 'Hizmet başarıyla güncellendi!' : 'Hizmet başarıyla eklendi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      await refreshSettings();
      
      // Form'u sıfırla
      resetForm();
      
      // Verileri yeniden yükle
      await fetchData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ AdminServices: Hizmet kaydedilirken hata:', error);
      setMessage('Hizmet kaydedilirken bir hata oluştu.');
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const { error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', 1); // İlk kayıt

      if (error) throw error;

      setMessage('Ayarlar başarıyla kaydedildi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      await refreshSettings();
      
      setShowSettings(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ AdminServices: Ayarlar kaydedilirken hata:', error);
      setMessage('Ayarlar kaydedilirken bir hata oluştu.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessage('Hizmet başarıyla silindi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      await refreshSettings();
      
      // Verileri yeniden yükle
      await fetchData();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ AdminServices: Hizmet silinirken hata:', error);
      setMessage('Hizmet silinirken bir hata oluştu.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Megaphone',
      sort_order: 0,
      is_active: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleChange = (field: keyof Service, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field: keyof ServiceSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hizmet Yönetimi</h1>
            <p className="text-gray-600">Hizmetlerinizi yönetin ve düzenleyin</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Ayarlar
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Yeni Hizmet
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('başarıyla') 
              ? 'bg-green-50 border border-green-200 text-green-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {/* Services Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Hizmetler ({services.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hizmet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İkon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sıra
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {service.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.description.substring(0, 60)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {service.icon}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {service.sort_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        service.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id!)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Service Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet Ekle'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleServiceSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hizmet Adı *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İkon *
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => handleChange('icon', e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sıralama
                    </label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => handleChange('sort_order', parseInt(e.target.value))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleChange('is_active', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Aktif hizmet olarak göster
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingService ? 'Güncelle' : 'Ekle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hizmetler Sayfası Ayarları
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleSettingsSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sayfa Başlığı *
                  </label>
                  <input
                    type="text"
                    value={settings.services_title}
                    onChange={(e) => handleSettingsChange('services_title', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sayfa Alt Başlığı *
                  </label>
                  <input
                    type="text"
                    value={settings.services_subtitle}
                    onChange={(e) => handleSettingsChange('services_subtitle', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Buton Metni *
                  </label>
                  <input
                    type="text"
                    value={settings.services_cta}
                    onChange={(e) => handleSettingsChange('services_cta', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices; 