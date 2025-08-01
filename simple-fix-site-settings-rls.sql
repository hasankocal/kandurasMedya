-- Site Settings RLS Düzeltme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- Site settings tablosu için RLS politikalarını temizle
DROP POLICY IF EXISTS "Enable read access for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable insert for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable update for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable delete for all users" ON site_settings;

-- Yeni politikalar oluştur
CREATE POLICY "Enable read access for all users" ON site_settings
FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON site_settings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON site_settings
FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON site_settings
FOR DELETE USING (true);

-- RLS'yi aktif et
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY; 