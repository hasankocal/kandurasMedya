-- Analitik sistemi oluşturma

-- Analytics tablosu (zaten mevcut olabilir)
CREATE TABLE IF NOT EXISTS analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  visitor_ip INET,
  user_agent TEXT,
  referrer TEXT,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page views tablosu
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  views_count INTEGER DEFAULT 1,
  unique_visitors INTEGER DEFAULT 1,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page, date)
);

-- Conversion tracking tablosu
CREATE TABLE IF NOT EXISTS conversions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- 'contact_form', 'newsletter_signup', 'download'
  source VARCHAR(255), -- hangi sayfadan geldi
  visitor_ip INET,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- Herkes analytics ekleyebilir
CREATE POLICY "Analytics are insertable by everyone" ON analytics
  FOR INSERT WITH CHECK (true);

-- Authenticated kullanıcılar analytics görebilir
CREATE POLICY "Analytics are viewable by authenticated users" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Page views için politikalar
CREATE POLICY "Page views are insertable by everyone" ON page_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Page views are viewable by authenticated users" ON page_views
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Page views are updatable by authenticated users" ON page_views
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Conversions için politikalar
CREATE POLICY "Conversions are insertable by everyone" ON conversions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Conversions are viewable by authenticated users" ON conversions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Fonksiyonlar
CREATE OR REPLACE FUNCTION update_page_view(page_name VARCHAR)
RETURNS VOID AS $$
BEGIN
  INSERT INTO page_views (page, views_count, unique_visitors)
  VALUES (page_name, 1, 1)
  ON CONFLICT (page, date)
  DO UPDATE SET 
    views_count = page_views.views_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Toplam sayfa görüntüleme sayısını döndüren fonksiyon
CREATE OR REPLACE FUNCTION get_total_page_views()
RETURNS INTEGER AS $$
DECLARE
  total_views INTEGER;
BEGIN
  SELECT COALESCE(SUM(views_count), 0) INTO total_views
  FROM page_views;
  
  RETURN total_views;
END;
$$ LANGUAGE plpgsql;

-- Dönüşüm oranını hesaplayan fonksiyon
CREATE OR REPLACE FUNCTION get_conversion_rate()
RETURNS DECIMAL AS $$
DECLARE
  total_views INTEGER;
  total_conversions INTEGER;
  conversion_rate DECIMAL;
BEGIN
  -- Toplam sayfa görüntüleme
  SELECT get_total_page_views() INTO total_views;
  
  -- Toplam dönüşüm
  SELECT COUNT(*) INTO total_conversions
  FROM conversions;
  
  -- Dönüşüm oranını hesapla
  IF total_views > 0 THEN
    conversion_rate := (total_conversions::DECIMAL / total_views::DECIMAL) * 100;
  ELSE
    conversion_rate := 0;
  END IF;
  
  RETURN ROUND(conversion_rate, 2);
END;
$$ LANGUAGE plpgsql;

-- Örnek veriler ekle
INSERT INTO page_views (page, views_count, unique_visitors, date) VALUES
('home', 450, 380, CURRENT_DATE - INTERVAL '30 days'),
('services', 320, 280, CURRENT_DATE - INTERVAL '30 days'),
('portfolio', 280, 240, CURRENT_DATE - INTERVAL '30 days'),
('blog', 200, 180, CURRENT_DATE - INTERVAL '30 days'),
('contact', 150, 120, CURRENT_DATE - INTERVAL '30 days'),
('about', 180, 160, CURRENT_DATE - INTERVAL '30 days');

-- Örnek dönüşümler
INSERT INTO conversions (type, source) VALUES
('contact_form', 'contact'),
('contact_form', 'home'),
('newsletter_signup', 'blog'),
('contact_form', 'services'),
('newsletter_signup', 'home'); 