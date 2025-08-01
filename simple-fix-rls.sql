-- Basit RLS Düzeltme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- Users tablosu için RLS politikalarını temizle
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for all users" ON users;
DROP POLICY IF EXISTS "Enable update for all users" ON users;
DROP POLICY IF EXISTS "Enable delete for all users" ON users;

-- Yeni politikalar oluştur
CREATE POLICY "Enable read access for all users" ON users
FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON users
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON users
FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON users
FOR DELETE USING (true);

-- RLS'yi aktif et
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcısını oluştur
INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@kandurasmedya.com',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
  'admin'
) ON CONFLICT (email) DO NOTHING; 