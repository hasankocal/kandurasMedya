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

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  completed_at: string;
  created_at: string;
  results?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url?: string;
  features?: string[];
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  category_id?: string;
  category?: BlogCategory;
  published: boolean;
  created_at: string;
  updated_at: string;
}

let cachedSettings: SiteSettings | null = null;
let cacheExpiry: number = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 dakika
let isLoading = false;
let loadPromise: Promise<SiteSettings> | null = null;

export const getSiteSettings = async (): Promise<SiteSettings> => {
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
      console.error('❌ SiteSettingsService: Supabase hatası:', result.error);
      return getDefaultSettings();
    }

    // Supabase response objesinden data'yı extract et
    const data = result.data;
    
    if (!data) {
      return getDefaultSettings();
    }
    
    return data;
  } catch (error) {
    console.error('❌ SiteSettingsService: Genel hata:', error);
    return getDefaultSettings();
  } finally {
    isLoading = false;
    loadPromise = null;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ SiteSettingsService: Projects hatası:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('❌ SiteSettingsService: Projects genel hata:', error);
    return [];
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ SiteSettingsService: Blog posts hatası:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('❌ SiteSettingsService: Blog posts genel hata:', error);
    return [];
  }
};

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('❌ SiteSettingsService: Blog categories hatası:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('❌ SiteSettingsService: Blog categories genel hata:', error);
    return [];
  }
};

export const createBlogCategory = async (category: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>): Promise<BlogCategory | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .insert([category])
      .select()
      .single();

    if (error) {
      console.error('❌ SiteSettingsService: Kategori oluşturma hatası:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('❌ SiteSettingsService: Kategori oluşturma genel hata:', error);
    return null;
  }
};

export const updateBlogCategory = async (id: string, category: Partial<BlogCategory>): Promise<BlogCategory | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ SiteSettingsService: Kategori güncelleme hatası:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('❌ SiteSettingsService: Kategori güncelleme genel hata:', error);
    return null;
  }
};

export const deleteBlogCategory = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('blog_categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ SiteSettingsService: Kategori silme hatası:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ SiteSettingsService: Kategori silme genel hata:', error);
    return false;
  }
};

export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select();

    if (error) {
      console.error('❌ SiteSettingsService: Newsletter hatası:', error);

      // Eğer email zaten varsa
      if (error.code === '23505') {
        return { success: false, message: 'Bu e-posta adresi zaten abone!' };
      }

      return { success: false, message: 'Abonelik işlemi başarısız oldu. Lütfen tekrar deneyin.' };
    }
    
    // Dönüşüm tracking ekle
    try {
      await supabase
        .from('conversions')
        .insert([
          {
            type: 'newsletter_signup',
            source: 'blog'
          }
        ]);
    } catch (conversionError) {
      console.error('Conversion tracking error:', conversionError);
    }
    
    return { success: true, message: 'Bültenimize başarıyla abone oldunuz!' };
  } catch (error) {
    console.error('❌ SiteSettingsService: Newsletter genel hata:', error);
    return { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' };
  }
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', settings.id)
      .select();

    if (error) {
      console.error('❌ SiteSettingsService: Güncelleme hatası:', error);
      return false;
    }

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
const getDefaultSettings = (): SiteSettings => {
  return {
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
  };
};

// Cache'i temizle
export const clearSettingsCache = () => {
  cachedSettings = null;
  cacheExpiry = 0;
};

// Services CRUD
export const getServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('❌ SiteSettingsService: Hizmetler yüklenirken hata:', error);
    return [];
  }
};

export const createService = async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ SiteSettingsService: Hizmet oluşturulurken hata:', error);
    return null;
  }
};

export const updateService = async (id: string, service: Partial<Service>): Promise<Service | null> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .update(service)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ SiteSettingsService: Hizmet güncellenirken hata:', error);
    return null;
  }
};

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('❌ SiteSettingsService: Hizmet silinirken hata:', error);
    return false;
  }
}; 