-- Site Settings Tablosunu Genişletme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- Mevcut site_settings tablosuna yeni sütunlar ekle
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS hero_cards JSONB DEFAULT '[
  {
    "title": "Yapay Zeka & SEO",
    "desc": "YZ tabanlı optimizasyon yöntemleriyle arama motorlarında öne çıkın."
  },
  {
    "title": "Dijital Reklamcılık", 
    "desc": "Hedef kitlenize ulaşan yenilikçi reklam kampanyalarıyla fark yaratın."
  },
  {
    "title": "Sosyal Medya Yönetimi",
    "desc": "Marka bilinirliğinizi artıran etkili sosyal medya stratejileriyle öne çıkın."
  }
]'::jsonb;

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_title VARCHAR(255) DEFAULT 'Hizmetlerimiz';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_subtitle TEXT DEFAULT 'İşletmenize değer katacak, pazarlama süreçlerinizi güçlendirecek çözümler sunuyoruz.';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_list JSONB DEFAULT '[
  {
    "title": "Sosyal Medya Yönetimi",
    "description": "Markanız için özgün sosyal medya planları geliştiriyor, içerik üretimi ve topluluk etkileşimi sağlıyoruz."
  },
  {
    "title": "SEO Optimizasyonu",
    "description": "Web sitenizi arama motorlarında üst sıralara taşıyacak, ziyaretçi ve dönüşüm odaklı iyileştirmeler yapıyoruz."
  },
  {
    "title": "İçerik Üreticileri İçin",
    "description": "Yapay zeka destekli iş akışlarıyla içerik üretimi ve yönetimini kolaylaştırıyoruz. Analiz ve raporlama için gelişmiş olanaklar sunuyoruz."
  },
  {
    "title": "Google Ads Yönetimi",
    "description": "Etkili reklam stratejileriyle potansiyel müşterilerinize ulaşın, yatırım getirinizi artırın."
  },
  {
    "title": "Web Tasarım & Geliştirme",
    "description": "Modern, kullanıcı dostu ve mobil uyumlu web siteleriyle dijital varlığınızı güçlendiriyoruz."
  },
  {
    "title": "E-posta Pazarlaması",
    "description": "Kişiselleştirilmiş e-posta kampanyalarıyla müşterilerinizle iletişimi güçlendiriyor, satışlarınızı yükseltiyoruz."
  },
  {
    "title": "Uygulama Geliştirme",
    "description": "Mobil ve web uygulamalarıyla dijital çözümler sunuyor, kullanıcı deneyimini ön planda tutarak yenilikçi projeler geliştiriyoruz."
  }
]'::jsonb;

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_cta VARCHAR(255) DEFAULT 'Tüm Hizmetlerimizi Keşfedin';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS about_achievements JSONB DEFAULT '[
  "10+ Yıllık Sektör Tecrübesi",
  "150+ Memnun İş Ortağı", 
  "Ödüllü Pazarlama Yaklaşımları",
  "Yatırım Getirisi Odaklı Çalışma"
]'::jsonb;

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS about_cta VARCHAR(255) DEFAULT 'Daha Fazla Bilgi';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS portfolio_title VARCHAR(255) DEFAULT 'Son Projelerimiz';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS portfolio_subtitle TEXT DEFAULT 'Müşterilerimiz için hayata geçirdiğimiz başarı hikayelerinden bazıları:';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS portfolio_cta VARCHAR(255) DEFAULT 'Tüm Projelerimizi Görün';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS testimonials_title VARCHAR(255) DEFAULT 'Müşterilerimiz Ne Diyor';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS testimonials_subtitle TEXT DEFAULT 'Başarı hikayelerimiz ve müşteri memnuniyetimiz:';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS testimonials_list JSONB DEFAULT '[
  {
    "name": "Ahmet Yılmaz",
    "company": "TechStart",
    "content": "Kanduras Medya ile çalışmaya başladıktan sonra web sitemizin trafiği %300 arttı. Harika bir ekip!",
    "rating": 5
  },
  {
    "name": "Ayşe Kaya",
    "company": "GreenFood",
    "content": "Sosyal medya kampanyalarımızla satışlarımız %150 arttı. Çok teşekkürler!",
    "rating": 5
  },
  {
    "name": "Mehmet Demir",
    "company": "InnovateLab",
    "content": "SEO optimizasyonu sonrası Google sıralamalarımızda büyük iyileşme gördük.",
    "rating": 5
  }
]'::jsonb;

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS cta_title VARCHAR(255) DEFAULT 'Dijital Dönüşümünüzü Başlatın';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS cta_subtitle TEXT DEFAULT 'Markanızı dijital dünyada güçlendirmek için bizimle iletişime geçin.';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS cta_button_text VARCHAR(255) DEFAULT 'Ücretsiz Danışmanlık Alın';

-- Mevcut kaydı güncelle
UPDATE site_settings SET
  hero_cards = '[
    {
      "title": "Yapay Zeka & SEO",
      "desc": "YZ tabanlı optimizasyon yöntemleriyle arama motorlarında öne çıkın."
    },
    {
      "title": "Dijital Reklamcılık", 
      "desc": "Hedef kitlenize ulaşan yenilikçi reklam kampanyalarıyla fark yaratın."
    },
    {
      "title": "Sosyal Medya Yönetimi",
      "desc": "Marka bilinirliğinizi artıran etkili sosyal medya stratejileriyle öne çıkın."
    }
  ]'::jsonb,
  services_title = 'Hizmetlerimiz',
  services_subtitle = 'İşletmenize değer katacak, pazarlama süreçlerinizi güçlendirecek çözümler sunuyoruz.',
  services_cta = 'Tüm Hizmetlerimizi Keşfedin',
  about_achievements = '[
    "10+ Yıllık Sektör Tecrübesi",
    "150+ Memnun İş Ortağı", 
    "Ödüllü Pazarlama Yaklaşımları",
    "Yatırım Getirisi Odaklı Çalışma"
  ]'::jsonb,
  about_cta = 'Daha Fazla Bilgi',
  portfolio_title = 'Son Projelerimiz',
  portfolio_subtitle = 'Müşterilerimiz için hayata geçirdiğimiz başarı hikayelerinden bazıları:',
  portfolio_cta = 'Tüm Projelerimizi Görün',
  testimonials_title = 'Müşterilerimiz Ne Diyor',
  testimonials_subtitle = 'Başarı hikayelerimiz ve müşteri memnuniyetimiz:',
  cta_title = 'Dijital Dönüşümünüzü Başlatın',
  cta_subtitle = 'Markanızı dijital dünyada güçlendirmek için bizimle iletişime geçin.',
  cta_button_text = 'Ücretsiz Danışmanlık Alın'
WHERE id = 'bfbf85a4-c49a-49c4-9dbe-1721c03cf62a'; 