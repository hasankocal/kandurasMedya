-- Newsletter subscribers tablosu oluşturma
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Herkes abone olabilir
CREATE POLICY "Newsletter subscribers are insertable by everyone" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated kullanıcılar aboneleri görebilir
CREATE POLICY "Newsletter subscribers are viewable by authenticated users" ON newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated kullanıcılar aboneleri güncelleyebilir
CREATE POLICY "Newsletter subscribers are updatable by authenticated users" ON newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated'); 