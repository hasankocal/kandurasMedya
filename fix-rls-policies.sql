-- RLS Politikalarını Düzeltme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Mevcut RLS politikalarını temizle
DROP POLICY IF EXISTS "Enable read access for all users" ON site_settings;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON site_settings;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON site_settings;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON site_settings;

-- 2. Yeni RLS politikalarını oluştur
-- SELECT için: Herkes okuyabilir
CREATE POLICY "Enable read access for all users" ON site_settings
FOR SELECT USING (true);

-- INSERT için: Herkes ekleyebilir (anon key ile)
CREATE POLICY "Enable insert for all users" ON site_settings
FOR INSERT WITH CHECK (true);

-- UPDATE için: Herkes güncelleyebilir (anon key ile)
CREATE POLICY "Enable update for all users" ON site_settings
FOR UPDATE USING (true) WITH CHECK (true);

-- DELETE için: Herkes silebilir (anon key ile)
CREATE POLICY "Enable delete for all users" ON site_settings
FOR DELETE USING (true);

-- 3. RLS'nin aktif olduğunu doğrula
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Test için mevcut kayıtları kontrol et
SELECT * FROM site_settings; 