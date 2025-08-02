-- Projects tablosu için RLS politikalarını düzelt

-- Önce mevcut politikaları temizle
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON projects;

-- RLS'yi devre dışı bırak ve tekrar etkinleştir
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Yeni politikaları oluştur
CREATE POLICY "Enable read access for all users" ON projects
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON projects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON projects
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON projects
FOR DELETE USING (auth.role() = 'authenticated');

-- Alternatif olarak: RLS'yi tamamen devre dışı bırak (test için)
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Mevcut projeleri kontrol et
SELECT 
  id,
  title,
  category,
  client,
  created_at
FROM projects 
ORDER BY created_at DESC; 