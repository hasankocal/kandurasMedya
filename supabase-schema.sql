-- Kanduras Medya Supabase Database Schema

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category VARCHAR(100) NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(100) NOT NULL,
  client VARCHAR(255),
  completed_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table for admin authentication
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table for tracking page views
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  visitor_ip INET,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contacts (public read/write for contact form)
CREATE POLICY "Contacts are viewable by everyone" ON contacts
  FOR SELECT USING (true);

CREATE POLICY "Contacts are insertable by everyone" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Contacts are updatable by authenticated users" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for blog_posts (public read, authenticated write)
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for projects (public read, authenticated write)
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Projects are insertable by authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Projects are updatable by authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for analytics (authenticated read/write)
CREATE POLICY "Analytics are viewable by authenticated users" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Analytics are insertable by everyone" ON analytics
  FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO blog_posts (title, content, excerpt, category, published) VALUES
('Dijital Pazarlamada Yapay Zeka Trendleri', 'Yapay zeka teknolojilerinin dijital pazarlama dünyasında nasıl kullanıldığını keşfedin...', '2024 yılında dijital pazarlamada yapay zeka kullanımı ve trendleri hakkında detaylı bir analiz.', 'AI', true),
('SEO Optimizasyonu İpuçları', 'Web sitenizi arama motorlarında üst sıralara taşıyacak pratik SEO ipuçları...', 'Etkili SEO stratejileri ve web sitenizi optimize etme yöntemleri.', 'SEO', true),
('Sosyal Medya Pazarlama Stratejileri', 'Sosyal medya platformlarında markanızı nasıl etkili bir şekilde tanıtacağınızı öğrenin...', 'Sosyal medya pazarlama stratejileri ve içerik planlama teknikleri.', 'Sosyal Medya', true);

INSERT INTO projects (title, description, category, client) VALUES
('Apple Deposu Sosyal Medya Kampanyası', 'Apple Deposu için geliştirdiğimiz kapsamlı sosyal medya pazarlama kampanyası.', 'Sosyal Medya', 'Apple Deposu'),
('Pro-Tech SEO Optimizasyonu', 'Pro-Tech şirketi için yaptığımız SEO optimizasyonu çalışmaları ve sonuçları.', 'SEO', 'Pro-Tech'),
('Cilt Doktoru Uygulaması', 'Doktorlar için geliştirdiğimiz mobil uygulama projesi.', 'Uygulama', 'Cilt Doktoru'); 