# Supabase Kurulum Talimatları

## 🚀 Supabase Projesi Oluşturma

### 1. Supabase Hesabı Oluşturun
- [supabase.com](https://supabase.com) adresine gidin
- GitHub ile giriş yapın
- Yeni proje oluşturun

### 2. Proje Ayarları
- **Proje Adı:** `kanduras-medya`
- **Database Password:** Güçlü bir şifre belirleyin
- **Region:** En yakın bölgeyi seçin (örn: West Europe)

### 3. Environment Değişkenleri
Proje oluşturulduktan sonra, Settings > API bölümünden şu bilgileri alın:

```bash
# .env.local dosyası oluşturun
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Database Şeması
SQL Editor'da `supabase-schema.sql` dosyasındaki tüm SQL kodunu çalıştırın.

### 5. Row Level Security (RLS)
RLS politikaları otomatik olarak oluşturulacak. Kontrol etmek için:
- Authentication > Policies bölümüne gidin
- Tüm tablolar için politikaların aktif olduğunu doğrulayın

## 📊 Admin Panel Erişimi

### 1. Admin Kullanıcı Oluşturma
```sql
-- SQL Editor'da çalıştırın
INSERT INTO users (email, password_hash, role) VALUES 
('admin@kandurasmedya.com', 'hashed_password_here', 'admin');
```

### 2. Admin Panel URL'leri
- **Dashboard:** `http://localhost:3000/admin`
- **İletişim Mesajları:** `http://localhost:3000/admin/contacts`

## 🔧 Özellikler

### ✅ Tamamlanan Özellikler
- [x] Supabase entegrasyonu
- [x] İletişim formu veritabanı kaydı
- [x] Admin dashboard
- [x] İletişim mesajları yönetimi
- [x] Mesaj durumu güncelleme (yeni/okundu/yanıtlandı)
- [x] Mesaj arama ve filtreleme
- [x] Mesaj detay görüntüleme
- [x] E-posta ile yanıtlama

### 🚧 Gelecek Özellikler
- [ ] Blog yazıları yönetimi
- [ ] Proje yönetimi
- [ ] Kullanıcı kimlik doğrulama
- [ ] Dosya yükleme (Supabase Storage)
- [ ] Analytics dashboard
- [ ] E-posta bildirimleri

## 🛠️ Geliştirme

### Projeyi Çalıştırma
```bash
npm run dev
```

### Supabase Client Kullanımı
```typescript
import { supabase } from '../lib/supabase';

// Veri ekleme
const { data, error } = await supabase
  .from('contacts')
  .insert([{ name: 'Test', email: 'test@example.com' }]);

// Veri okuma
const { data, error } = await supabase
  .from('contacts')
  .select('*')
  .order('created_at', { ascending: false });
```

## 🔒 Güvenlik

### RLS Politikaları
- **contacts:** Herkes okuyabilir/yazabilir, sadece admin güncelleyebilir
- **blog_posts:** Herkes yayınlanmış yazıları okuyabilir, sadece admin yazabilir
- **projects:** Herkes okuyabilir, sadece admin yazabilir
- **analytics:** Sadece admin okuyabilir, herkes yazabilir

### Environment Değişkenleri
- `.env.local` dosyasını `.gitignore`'a ekleyin
- Production'da environment değişkenlerini hosting sağlayıcınızda ayarlayın

## 📝 Notlar

- Supabase ücretsiz planında aylık 500MB veritabanı ve 2GB bandwidth bulunur
- Production'da ücretli plana geçmeyi düşünün
- Düzenli backup almayı unutmayın
- API rate limitlerini kontrol edin 