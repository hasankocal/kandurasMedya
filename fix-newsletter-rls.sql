-- Newsletter subscribers RLS düzeltmesi

-- Önce mevcut politikaları temizle
DROP POLICY IF EXISTS "Newsletter subscribers are insertable by everyone" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter subscribers are viewable by authenticated users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter subscribers are updatable by authenticated users" ON newsletter_subscribers;

-- RLS'yi devre dışı bırak ve tekrar etkinleştir
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Yeni politikalar oluştur
-- Herkes INSERT yapabilir (anonim kullanıcılar da)
CREATE POLICY "Enable insert for all users" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated kullanıcılar SELECT yapabilir
CREATE POLICY "Enable select for authenticated users" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated kullanıcılar UPDATE yapabilir
CREATE POLICY "Enable update for authenticated users" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated kullanıcılar DELETE yapabilir
CREATE POLICY "Enable delete for authenticated users" ON newsletter_subscribers
  FOR DELETE USING (auth.role() = 'authenticated');

-- Test için örnek veri ekle
INSERT INTO newsletter_subscribers (email) VALUES 
('test@example.com')
ON CONFLICT (email) DO NOTHING; 