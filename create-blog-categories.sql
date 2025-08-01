-- Blog kategorileri sistemi

-- Blog kategorileri tablosu
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6', -- Hex renk kodu
  icon VARCHAR(50), -- Icon class name
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts tablosuna category_id ekle (eğer yoksa)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN category_id UUID REFERENCES blog_categories(id);
  END IF;
END $$;

-- RLS politikaları
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Herkes kategorileri görebilir (published blog posts için)
CREATE POLICY "Blog categories are viewable by everyone" ON blog_categories
  FOR SELECT USING (true);

-- Authenticated kullanıcılar kategori ekleyebilir/düzenleyebilir/silebilir
CREATE POLICY "Blog categories are manageable by authenticated users" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Blog posts için kategori güncelleme politikası
CREATE POLICY "Blog posts can be updated with category by authenticated users" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Örnek kategoriler ekle
INSERT INTO blog_categories (name, slug, description, color, icon, sort_order) VALUES
('Dijital Pazarlama', 'dijital-pazarlama', 'Dijital pazarlama stratejileri ve trendleri', '#3B82F6', '📈', 1),
('SEO', 'seo', 'Arama motoru optimizasyonu ve teknik SEO', '#10B981', '🔍', 2),
('Sosyal Medya', 'sosyal-medya', 'Sosyal medya pazarlama ve yönetimi', '#8B5CF6', '📱', 3),
('İçerik Pazarlaması', 'icerik-pazarlamasi', 'İçerik stratejileri ve yazım teknikleri', '#F59E0B', '✍️', 4),
('Yapay Zeka', 'yapay-zeka', 'AI destekli pazarlama çözümleri', '#EF4444', '🤖', 5),
('E-ticaret', 'e-ticaret', 'E-ticaret pazarlama ve optimizasyon', '#06B6D4', '🛒', 6),
('Analitik', 'analitik', 'Veri analizi ve performans ölçümü', '#84CC16', '📊', 7),
('Genel', 'genel', 'Genel dijital pazarlama konuları', '#6B7280', '📝', 8)
ON CONFLICT (slug) DO NOTHING;

-- Mevcut blog posts'ları "Genel" kategorisine ata
UPDATE blog_posts 
SET category_id = (SELECT id FROM blog_categories WHERE slug = 'genel')
WHERE category_id IS NULL;

-- Kategori adını blog_posts tablosundan kaldır (artık category_id kullanacağız)
-- ALTER TABLE blog_posts DROP COLUMN IF EXISTS category;

-- Trigger: updated_at otomatik güncelleme
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_categories_updated_at 
    BEFORE UPDATE ON blog_categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 