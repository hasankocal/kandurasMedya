-- Services tablosuna features sütunu ekle
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

-- Mevcut hizmetlere örnek features ekle
UPDATE services 
SET features = CASE 
  WHEN title = 'Sosyal Medya Yönetimi' THEN ARRAY[
    'YZ Destekli İçerik Üretimi ve Planlama',
    'Otomatik Topluluk Yönetimi',
    'Hedefli Sosyal Medya Reklamları',
    'Performans Analizi ve Raporlama',
    'Rakip Analizi ve Trend Takibi'
  ]
  WHEN title = 'SEO Optimizasyonu' THEN ARRAY[
    'YZ Destekli Anahtar Kelime Analizi',
    'Teknik SEO İyileştirmeleri',
    'Semantik İçerik Optimizasyonu',
    'Akıllı Link Building Stratejileri',
    'Yerel SEO Çalışmaları'
  ]
  WHEN title = 'Google Ads Yönetimi' THEN ARRAY[
    'YZ Destekli Anahtar Kelime Analizi',
    'Akıllı Teklif Stratejileri',
    'Performans Optimizasyonu',
    'ROI Odaklı Kampanya Yönetimi',
    'Detaylı Raporlama ve Analiz'
  ]
  WHEN title = 'İçerik Üreticileri İçin' THEN ARRAY[
    'YZ Destekli İçerik Üretimi',
    'SEO Odaklı İçerik Stratejisi',
    'Görsel İçerik Tasarımı',
    'Video İçerik Üretimi',
    'İçerik Takvimi Yönetimi'
  ]
  WHEN title = 'Web Tasarım & Geliştirme' THEN ARRAY[
    'Responsive Web Tasarım',
    'Kullanıcı Deneyimi (UX) Optimizasyonu',
    'SEO Uyumlu Kodlama',
    'Hızlı Yükleme Süreleri',
    'Güvenlik ve Performans Optimizasyonu'
  ]
  WHEN title = 'E-posta Pazarlaması' THEN ARRAY[
    'YZ Destekli Segmentasyon',
    'Otomatik E-posta Kampanyaları',
    'Kişiselleştirilmiş İçerik',
    'A/B Test Optimizasyonu',
    'Performans Analizi ve Raporlama'
  ]
  WHEN title = 'Mobil Uygulama Geliştirme' THEN ARRAY[
    'YZ Destekli UX/UI Tasarım',
    'Cross-Platform Geliştirme',
    'Yapay Zeka Entegrasyonu',
    'Performans Optimizasyonu',
    'App Store Optimizasyonu (ASO)'
  ]
  ELSE ARRAY[
    'Profesyonel Hizmet',
    'Yapay Zeka Destekli Çözümler',
    'Sürekli Destek',
    'Performans Raporlama',
    'Özelleştirilmiş Stratejiler'
  ]
END
WHERE features = '{}' OR features IS NULL; 