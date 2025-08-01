import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getSiteSettings, SiteSettings } from '../services/siteSettingsService';

interface SiteContextType {
  siteSettings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}

interface SiteProviderProps {
  children: ReactNode;
}

function SiteProvider({ children }: SiteProviderProps) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const loadSettings = async () => {
    try {
      console.log('🔄 SiteContext: Ayarlar yükleniyor...');
      setLoading(true);
      setError(null);
      
      const result = await getSiteSettings();
      console.log('✅ SiteContext: Ayarlar yüklendi:', result);
      
      // Veri yapısını düzelt - data objesi içinden çıkar
      const settings = result.data || result;
      console.log('✅ SiteContext: Düzeltilmiş ayarlar:', settings);
      setSiteSettings(settings);
    } catch (err) {
      console.error('❌ SiteContext: Ayarlar yüklenirken hata:', err);
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    console.log('🔄 SiteContext: refreshSettings çağrıldı');
    await loadSettings();
  };

  // İlk yükleme
  useEffect(() => {
    loadSettings();
  }, []);

  // Route değişikliklerinde verileri yeniden yükle
  useEffect(() => {
    loadSettings();
  }, [location.pathname]);

  // Her 30 saniyede bir otomatik yenileme (manuel değişiklikler için)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏰ SiteContext: Otomatik yenileme...');
      loadSettings();
    }, 30000); // 30 saniye

    return () => clearInterval(interval);
  }, []);

  const value: SiteContextType = {
    siteSettings,
    loading,
    error,
    refreshSettings
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
}

export { useSite, SiteProvider }; 