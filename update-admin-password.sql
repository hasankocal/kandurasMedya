-- Admin şifresini güçlü şifreyle güncelle
-- Yeni şifre: Kanduras2024Secure
-- Hash: 7a1fef8eaff4dd6355167603daf6598e7d3223779d97d42860b76229fd28bdd5

UPDATE users 
SET password_hash = '7a1fef8eaff4dd6355167603daf6598e7d3223779d97d42860b76229fd28bdd5'
WHERE email = 'admin@kandurasmedya.com';

-- Güncelleme sonrası kontrol
SELECT email, role, created_at FROM users WHERE email = 'admin@kandurasmedya.com'; 