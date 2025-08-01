-- Blog posts tablosu için RLS politikalarını düzeltme

-- Önce mevcut politikaları temizle
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are insertable by authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Blog posts are updatable by authenticated users" ON blog_posts;

-- Yeni politikalar oluştur
-- Herkes published=true olan blog posts'ları görebilir
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

-- Authenticated kullanıcılar blog posts ekleyebilir
CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
  FOR INSERT WITH CHECK (true);

-- Authenticated kullanıcılar blog posts güncelleyebilir
CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
  FOR UPDATE USING (true);

-- Authenticated kullanıcılar blog posts silebilir
CREATE POLICY "Blog posts are deletable by authenticated users" ON blog_posts
  FOR DELETE USING (true); 