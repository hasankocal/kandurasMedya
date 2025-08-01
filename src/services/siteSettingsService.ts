import { supabase } from '../lib/supabase';

export interface SiteSettings {
  id?: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_offer: string;
  hero_cta_services: string;
  hero_cards?: any[];
  about_title: string;
  about_subtitle: string;
  about_desc: string;
  about_achievements?: string[];
  about_cta?: string;
  stats_experience: string;
  stats_clients: string;
  stats_projects: string;
  stats_awards: string;
  services_title?: string;
  services_subtitle?: string;
  services_list?: any[];
  services_cta?: string;
  portfolio_title?: string;
  portfolio_subtitle?: string;
  portfolio_cta?: string;
  testimonials_title?: string;
  testimonials_subtitle?: string;
  testimonials_list?: any[];
  cta_title?: string;
  cta_subtitle?: string;
  cta_button_text?: string;
  blog_title?: string;
  blog_subtitle?: string;
  blog_posts?: any[];
  portfolio_projects?: any[];
  services_details?: any[];
  contact_address: string;
  contact_phone1: string;
  contact_phone2: string;
  contact_email: string;
  contact_support_email: string;
  footer_desc: string;
  updated_at?: string;
}

let cachedSettings: SiteSettings | null = null;
let cacheExpiry: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 dakika
let isLoading = false;
let loadPromise: Promise<SiteSettings> | null = null;

export const getSiteSettings = async (): Promise<SiteSettings> => {
  // Cache kontrolü - DEVRE DIŞI (Her istekte Supabase'e git)
  // if (cachedSettings && Date.now() < cacheExpiry) {
  //   console.log('📦 Cache\'den site ayarları döndürülüyor');
  //   return cachedSettings;
  // }

  // Eğer zaten yükleniyorsa, mevcut promise'i bekle
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  try {
    isLoading = true;
    
    // Timeout ile birlikte Supabase sorgusu
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout: Site ayarları yüklenemedi')), 10000);
    });

    const supabasePromise = supabase
      .from('site_settings')
      .select('*')
      .single();

    loadPromise = Promise.race([supabasePromise, timeoutPromise]) as Promise<any>;
    const result = await loadPromise;

    if (result.error) {
      console.error('Site ayarları yüklenirken hata:', result.error);
      return getDefaultSettings();
    }

    // Supabase response objesinden data'yı extract et
    const data = result.data;
    
    console.log('📊 SiteSettingsService: Extracted data:', data);
    
    // Cache'i güncelle - DEVRE DIŞI
    // cachedSettings = data;
    // cacheExpiry = Date.now() + CACHE_DURATION;

    return data;
  } catch (error) {
    console.error('❌ Site ayarları yüklenirken hata:', error);
    return getDefaultSettings();
  } finally {
    isLoading = false;
    loadPromise = null;
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
  try {
    console.log('🔄 SiteSettingsService: Güncelleme başlatılıyor...');
    console.log('📝 SiteSettingsService: Güncellenecek veriler:', settings);
    
    const { data, error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', settings.id)
      .select();

    console.log('📊 SiteSettingsService: Supabase update response:', { data, error });

    if (error) {
      console.error('❌ SiteSettingsService: Güncelleme hatası:', error);
      return false;
    }

    console.log('✅ SiteSettingsService: Güncelleme başarılı!');
    console.log('📊 Güncellenmiş veri:', data);

    // Cache'i temizle
    cachedSettings = null;
    cacheExpiry = 0;

    return true;
  } catch (error) {
    console.error('❌ SiteSettingsService: Güncelleme hatası:', error);
    return false;
  }
};

// Varsayılan ayarlar
const getDefaultSettings = (): SiteSettings => ({
  hero_title: 'Kanduras Medya ile Dijital Potansiyelinizi Keşfedin',
  hero_subtitle: 'Yapay zeka destekli stratejilerle markanızı zirveye taşıyoruz.',
  hero_cta_offer: 'Ücretsiz Teklif Al',
  hero_cta_services: 'Hizmetlerimiz',
  about_title: 'Kanduras Medya Hakkında',
  about_subtitle: 'Pazarlama dünyasında 10 yılı aşkın deneyime sahip ekibimizle fark yaratıyoruz.',
  about_desc: 'Kanduras Medya olarak, işletmenizin dijital dönüşümünü stratejik bir bakış açısıyla ele alıyoruz. Her iş ortağımız için yenilikçi yaklaşımlar geliştiriyor, markanızın dijital dünyada güçlü bir konumda olmasını sağlıyoruz.',
  stats_experience: '10+',
  stats_clients: '150+',
  stats_projects: '450+',
  stats_awards: '35+',
  contact_address: 'İstasyon Yolu Sk. No: 3/1, Maltepe, İstanbul',
  contact_phone1: '+90 850 441 75 49',
  contact_phone2: '+90 538 587 39 84',
  contact_email: 'bilgi@kandurasmedya.com',
  contact_support_email: 'destek@kandurasmedya.com',
  footer_desc: 'Dijital dünyada markanızı ileriye taşıyan, yaratıcı ve stratejik pazarlama çözümleri.'
});

// Cache'i temizle
export const clearSettingsCache = () => {
  cachedSettings = null;
  cacheExpiry = 0;
}; 