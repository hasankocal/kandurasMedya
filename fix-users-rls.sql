-- Users Tablosu RLS Politikalarını Düzeltme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- 1. Mevcut RLS politikalarını temizle
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for all users" ON users;
DROP POLICY IF EXISTS "Enable update for all users" ON users;
DROP POLICY IF EXISTS "Enable delete for all users" ON users;

-- 2. Yeni RLS politikalarını oluştur
-- SELECT için: Herkes okuyabilir (admin login için gerekli)
CREATE POLICY "Enable read access for all users" ON users
FOR SELECT USING (true);

-- INSERT için: Herkes ekleyebilir
CREATE POLICY "Enable insert for all users" ON users
FOR INSERT WITH CHECK (true);

-- UPDATE için: Herkes güncelleyebilir
CREATE POLICY "Enable update for all users" ON users
FOR UPDATE USING (true) WITH CHECK (true);

-- DELETE için: Herkes silebilir
CREATE POLICY "Enable delete for all users" ON users
FOR DELETE USING (true);

-- 3. RLS'nin aktif olduğunu doğrula
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 4. Admin kullanıcısını kontrol et
SELECT * FROM users WHERE email = 'admin@kandurasmedya.com';

-- 5. Eğer admin kullanıcısı yoksa oluştur
INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@kandurasmedya.com',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  'admin'
) ON CONFLICT (email) DO NOTHING; 