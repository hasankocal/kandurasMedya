import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Globe, Phone, Mail, MapPin, Users, Award, FolderOpen } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import { clearSettingsCache } from '../services/siteSettingsService';
import { useSite } from '../context/SiteContext';

interface SiteSettings {
  id?: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_offer: string;
  hero_cta_services: string;
  about_title: string;
  about_subtitle: string;
  about_desc: string;
  stats_experience: string;
  stats_clients: string;
  stats_projects: string;
  stats_awards: string;
  contact_address: string;
  contact_phone1: string;
  contact_phone2: string;
  contact_email: string;
  contact_support_email: string;
  footer_desc: string;
  updated_at?: string;
}

const AdminSettings: React.FC = () => {
  const { refreshSettings } = useSite();
  const [settings, setSettings] = useState<SiteSettings>({
    hero_title: '',
    hero_subtitle: '',
    hero_cta_offer: '',
    hero_cta_services: '',
    about_title: '',
    about_subtitle: '',
    about_desc: '',
    stats_experience: '',
    stats_clients: '',
    stats_projects: '',
    stats_awards: '',
    contact_address: '',
    contact_phone1: '',
    contact_phone2: '',
    contact_email: '',
    contact_support_email: '',
    footer_desc: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('❌ AdminSettings: Ayarlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      let result;
      
      if (settings.id) {
        // Güncelleme
        result = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', settings.id);
      } else {
        // Yeni kayıt
        result = await supabase
          .from('site_settings')
          .insert([settings]);
      }

      if (result.error) {
        console.error('❌ AdminSettings: Güncelleme hatası:', result.error);
        throw result.error;
      }

      setMessage('Ayarlar başarıyla kaydedildi!');
      
      // Cache'i temizle ve SiteContext'i yenile
      clearSettingsCache();
      
      // SiteContext'i yenile
      await refreshSettings();
      
      setTimeout(() => setMessage(''), 3000);
      
      // ID'yi güncelle
      if (!settings.id && result.data) {
        setSettings(prev => ({ ...prev, id: result.data[0].id }));
      }
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      setMessage('Ayarlar kaydedilirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: string) => {
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
            <h1 className="text-2xl font-bold text-gray-900">Site Ayarları</h1>
            <p className="text-gray-600">Web sitesi içeriklerini yönetin ve güncelleyin</p>
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Ana Sayfa Hero Bölümü
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ana Başlık *
                </label>
                <input
                  type="text"
                  value={settings.hero_title}
                  onChange={(e) => handleChange('hero_title', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Başlık *
                </label>
                <input
                  type="text"
                  value={settings.hero_subtitle}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teklif CTA Metni *
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_offer}
                  onChange={(e) => handleChange('hero_cta_offer', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hizmetler CTA Metni *
                </label>
                <input
                  type="text"
                  value={settings.hero_cta_services}
                  onChange={(e) => handleChange('hero_cta_services', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Hakkımızda Bölümü
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={settings.about_title}
                  onChange={(e) => handleChange('about_title', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Başlık *
                </label>
                <input
                  type="text"
                  value={settings.about_subtitle}
                  onChange={(e) => handleChange('about_subtitle', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama *
                </label>
                <textarea
                  value={settings.about_desc}
                  onChange={(e) => handleChange('about_desc', e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              İstatistikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tecrübe (örn: 10+) *
                </label>
                <input
                  type="text"
                  value={settings.stats_experience}
                  onChange={(e) => handleChange('stats_experience', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Müşteri Sayısı (örn: 150+) *
                </label>
                <input
                  type="text"
                  value={settings.stats_clients}
                  onChange={(e) => handleChange('stats_clients', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proje Sayısı (örn: 450+) *
                </label>
                <input
                  type="text"
                  value={settings.stats_projects}
                  onChange={(e) => handleChange('stats_projects', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ödül Sayısı (örn: 35+) *
                </label>
                <input
                  type="text"
                  value={settings.stats_awards}
                  onChange={(e) => handleChange('stats_awards', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              İletişim Bilgileri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres *
                </label>
                <input
                  type="text"
                  value={settings.contact_address}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon 1 *
                </label>
                <input
                  type="text"
                  value={settings.contact_phone1}
                  onChange={(e) => handleChange('contact_phone1', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon 2
                </label>
                <input
                  type="text"
                  value={settings.contact_phone2}
                  onChange={(e) => handleChange('contact_phone2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destek E-posta *
                </label>
                <input
                  type="email"
                  value={settings.contact_support_email}
                  onChange={(e) => handleChange('contact_support_email', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Footer Bölümü
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Footer Açıklaması *
              </label>
              <textarea
                value={settings.footer_desc}
                onChange={(e) => handleChange('footer_desc', e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings; 