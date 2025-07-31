-- Site ayarları tablosu
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title TEXT NOT NULL DEFAULT 'Kanduras Medya ile Dijital Potansiyelinizi Keşfedin',
  hero_subtitle TEXT NOT NULL DEFAULT 'Yapay zeka destekli stratejilerle markanızı zirveye taşıyoruz.',
  hero_cta_offer TEXT NOT NULL DEFAULT 'Ücretsiz Teklif Al',
  hero_cta_services TEXT NOT NULL DEFAULT 'Hizmetlerimiz',
  about_title TEXT NOT NULL DEFAULT 'Kanduras Medya Hakkında',
  about_subtitle TEXT NOT NULL DEFAULT 'Pazarlama dünyasında 10 yılı aşkın deneyime sahip ekibimizle fark yaratıyoruz.',
  about_desc TEXT NOT NULL DEFAULT 'Kanduras Medya olarak, işletmenizin dijital dönüşümünü stratejik bir bakış açısıyla ele alıyoruz. Her iş ortağımız için yenilikçi yaklaşımlar geliştiriyor, markanızın dijital dünyada güçlü bir konumda olmasını sağlıyoruz.',
  stats_experience TEXT NOT NULL DEFAULT '10+',
  stats_clients TEXT NOT NULL DEFAULT '150+',
  stats_projects TEXT NOT NULL DEFAULT '450+',
  stats_awards TEXT NOT NULL DEFAULT '35+',
  contact_address TEXT NOT NULL DEFAULT 'İstasyon Yolu Sk. No: 3/1, Maltepe, İstanbul',
  contact_phone1 TEXT NOT NULL DEFAULT '+90 850 441 75 49',
  contact_phone2 TEXT DEFAULT '+90 538 587 39 84',
  contact_email TEXT NOT NULL DEFAULT 'bilgi@kandurasmedya.com',
  contact_support_email TEXT NOT NULL DEFAULT 'destek@kandurasmedya.com',
  footer_desc TEXT NOT NULL DEFAULT 'Dijital dünyada markanızı ileriye taşıyan, yaratıcı ve stratejik pazarlama çözümleri.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();

-- RLS Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert" ON site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default settings if table is empty
INSERT INTO site_settings (hero_title, hero_subtitle, hero_cta_offer, hero_cta_services, about_title, about_subtitle, about_desc, stats_experience, stats_clients, stats_projects, stats_awards, contact_address, contact_phone1, contact_phone2, contact_email, contact_support_email, footer_desc)
SELECT 
  'Kanduras Medya ile Dijital Potansiyelinizi Keşfedin',
  'Yapay zeka destekli stratejilerle markanızı zirveye taşıyoruz.',
  'Ücretsiz Teklif Al',
  'Hizmetlerimiz',
  'Kanduras Medya Hakkında',
  'Pazarlama dünyasında 10 yılı aşkın deneyime sahip ekibimizle fark yaratıyoruz.',
  'Kanduras Medya olarak, işletmenizin dijital dönüşümünü stratejik bir bakış açısıyla ele alıyoruz. Her iş ortağımız için yenilikçi yaklaşımlar geliştiriyor, markanızın dijital dünyada güçlü bir konumda olmasını sağlıyoruz.',
  '10+',
  '150+',
  '450+',
  '35+',
  'İstasyon Yolu Sk. No: 3/1, Maltepe, İstanbul',
  '+90 850 441 75 49',
  '+90 538 587 39 84',
  'bilgi@kandurasmedya.com',
  'destek@kandurasmedya.com',
  'Dijital dünyada markanızı ileriye taşıyan, yaratıcı ve stratejik pazarlama çözümleri.'
WHERE NOT EXISTS (SELECT 1 FROM site_settings); 