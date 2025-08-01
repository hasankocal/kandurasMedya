-- Newsletter subscribers RLS'yi devre dışı bırak

-- RLS'yi tamamen devre dışı bırak
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;

-- Test için örnek veri ekle
INSERT INTO newsletter_subscribers (email) VALUES 
('test@example.com')
ON CONFLICT (email) DO NOTHING; 