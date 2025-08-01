-- Projects tablosu için RLS politikası
-- Anonim kullanıcıların projects tablosunu okuyabilmesi için

-- Önce RLS'yi etkinleştir
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anonim kullanıcılar için okuma politikası
CREATE POLICY "Allow anonymous read access to projects" ON projects
FOR SELECT USING (true);

-- Admin kullanıcılar için tam erişim politikası
CREATE POLICY "Allow authenticated users full access to projects" ON projects
FOR ALL USING (auth.role() = 'authenticated');

-- Servis rolü için tam erişim politikası
CREATE POLICY "Allow service role full access to projects" ON projects
FOR ALL USING (auth.role() = 'service_role'); 