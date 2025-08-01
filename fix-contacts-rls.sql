-- Contacts tablosu için RLS politikalarını düzeltme

-- Önce mevcut politikaları temizle
DROP POLICY IF EXISTS "Contacts are viewable by everyone" ON contacts;
DROP POLICY IF EXISTS "Contacts are insertable by everyone" ON contacts;
DROP POLICY IF EXISTS "Contacts are updatable by authenticated users" ON contacts;

-- Yeni politikalar oluştur
-- Herkes contact ekleyebilir (contact formu için)
CREATE POLICY "Contacts are insertable by everyone" ON contacts
  FOR INSERT WITH CHECK (true);

-- Herkes contact'ları görebilir (admin paneli için)
CREATE POLICY "Contacts are viewable by everyone" ON contacts
  FOR SELECT USING (true);

-- Authenticated kullanıcılar contact'ları güncelleyebilir (admin paneli için)
CREATE POLICY "Contacts are updatable by authenticated users" ON contacts
  FOR UPDATE USING (true);

-- Authenticated kullanıcılar contact'ları silebilir (admin paneli için)
CREATE POLICY "Contacts are deletable by authenticated users" ON contacts
  FOR DELETE USING (true); 