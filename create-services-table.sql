-- Services tablosunu oluştur
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Megaphone',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS'yi etkinleştir
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS politikalarını oluştur
CREATE POLICY "Enable read access for all users" ON services
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON services
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON services
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON services
FOR DELETE USING (auth.role() = 'authenticated');

-- updated_at trigger'ı oluştur
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Site settings'e services alanlarını ekle (eğer yoksa)
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_title TEXT DEFAULT 'Hizmetlerimiz',
ADD COLUMN IF NOT EXISTS services_subtitle TEXT DEFAULT 'Dijital pazarlama dünyasında işinizi büyütmek için ihtiyacınız olan tüm hizmetler',
ADD COLUMN IF NOT EXISTS services_cta TEXT DEFAULT 'Tüm Hizmetlerimizi İnceleyin';

-- Örnek hizmetler ekle
INSERT INTO services (title, description, icon, sort_order, is_active) VALUES
('Sosyal Medya Yönetimi', 'Markanızı sosyal medyada güçlü bir şekilde temsil ediyoruz. İçerik üretimi, topluluk yönetimi ve reklam kampanyaları ile hedef kitlenize ulaşın.', 'Megaphone', 1, true),
('SEO Optimizasyonu', 'Arama motorlarında üst sıralarda yer alın. Organik trafiğinizi artırın ve daha fazla müşteriye ulaşın.', 'Search', 2, true),
('Google Ads Yönetimi', 'Hedefli reklam kampanyaları ile doğru müşterilere ulaşın. ROI odaklı stratejilerle bütçenizi verimli kullanın.', 'LineChart', 3, true),
('İçerik Üreticileri İçin', 'İçerik üreticileri için özel pazarlama stratejileri. Markanızı büyütün ve gelirlerinizi artırın.', 'BarChart', 4, true),
('Web Tasarım & Geliştirme', 'Modern ve kullanıcı dostu web siteleri tasarlıyoruz. Responsive tasarım ve SEO uyumlu geliştirme.', 'Globe', 5, true),
('E-posta Pazarlaması', 'E-posta kampanyaları ile müşterilerinizle güçlü bağlar kurun. Otomatikleştirilmiş pazarlama ile satışlarınızı artırın.', 'Mail', 6, true),
('Mobil Uygulama Geliştirme', 'iOS ve Android için native mobil uygulamalar geliştiriyoruz. Kullanıcı deneyimi odaklı tasarım ve geliştirme.', 'Smartphone', 7, true);

-- Mevcut site settings'i güncelle (eğer varsa)
UPDATE site_settings 
SET 
  services_title = COALESCE(services_title, 'Hizmetlerimiz'),
  services_subtitle = COALESCE(services_subtitle, 'Dijital pazarlama dünyasında işinizi büyütmek için ihtiyacınız olan tüm hizmetler'),
  services_cta = COALESCE(services_cta, 'Tüm Hizmetlerimizi İnceleyin')
WHERE id IS NOT NULL;

-- Mevcut hizmetleri kontrol et
SELECT 
  id,
  title,
  icon,
  sort_order,
  is_active,
  created_at
FROM services 
ORDER BY sort_order ASC; 