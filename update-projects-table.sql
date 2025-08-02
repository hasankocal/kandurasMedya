-- Projects tablosuna eksik kolonları ekle
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS completion_date DATE,
ADD COLUMN IF NOT EXISTS technologies TEXT,
ADD COLUMN IF NOT EXISTS project_url TEXT,
ADD COLUMN IF NOT EXISTS github_url TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Mevcut projeler için varsayılan değerler ata
UPDATE projects 
SET 
  completion_date = COALESCE(completion_date, CURRENT_DATE),
  technologies = COALESCE(technologies, 'Web Tasarım'),
  is_featured = COALESCE(is_featured, false),
  sort_order = COALESCE(sort_order, 0)
WHERE completion_date IS NULL 
   OR technologies IS NULL 
   OR is_featured IS NULL 
   OR sort_order IS NULL;

-- RLS politikalarını güncelle (eğer yoksa)
DO $$
BEGIN
  -- Eğer RLS politikaları yoksa ekle
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' 
    AND policyname = 'Enable read access for all users'
  ) THEN
    CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' 
    AND policyname = 'Enable insert for authenticated users only'
  ) THEN
    CREATE POLICY "Enable insert for authenticated users only" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' 
    AND policyname = 'Enable update for authenticated users only'
  ) THEN
    CREATE POLICY "Enable update for authenticated users only" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'projects' 
    AND policyname = 'Enable delete for authenticated users only'
  ) THEN
    CREATE POLICY "Enable delete for authenticated users only" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Mevcut projeleri kontrol et
SELECT 
  id,
  title,
  completion_date,
  technologies,
  is_featured,
  sort_order
FROM projects 
ORDER BY sort_order ASC; 