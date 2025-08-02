-- Services tablosuna image_url sütunu ekle
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

-- Mevcut hizmetlere örnek görseller ekle
UPDATE services 
SET image_url = CASE 
  WHEN title = 'Sosyal Medya Yönetimi' THEN 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop'
  WHEN title = 'SEO Optimizasyonu' THEN 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  WHEN title = 'Google Ads Yönetimi' THEN 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  WHEN title = 'İçerik Üreticileri İçin' THEN 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
  WHEN title = 'Web Tasarım & Geliştirme' THEN 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop'
  WHEN title = 'E-posta Pazarlaması' THEN 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop'
  WHEN title = 'Mobil Uygulama Geliştirme' THEN 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
  ELSE 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
END
WHERE image_url = '' OR image_url IS NULL; 