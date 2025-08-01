# 🚀 Kanduras Medya - Dijital Pazarlama Web Sitesi

Modern, dinamik ve yönetilebilir dijital pazarlama web sitesi. React, TypeScript, Supabase ve Tailwind CSS ile geliştirilmiştir.

## ✨ Özellikler

### 🌐 Frontend
- **React 18** + **TypeScript** - Modern web geliştirme
- **Tailwind CSS** - Responsive ve modern tasarım
- **React Router DOM** - Client-side routing
- **Context API** - Global state management
- **Lucide React** - Modern ikonlar

### 🔧 Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Veritabanı
- **Row Level Security (RLS)** - Güvenlik
- **Real-time** - Canlı veri güncellemeleri

### 📊 Admin Paneli
- **Tam içerik yönetimi** - Tüm site içerikleri dinamik
- **Blog kategorileri** - CRUD işlemleri
- **İletişim formları** - Müşteri mesajları
- **Analitik sistemi** - Sayfa görüntüleme ve dönüşüm oranları
- **Newsletter yönetimi** - Abonelik sistemi

## 🏗️ Proje Yapısı

```
kandurasMedya/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel bileşenleri
│   │   ├── home/           # Ana sayfa bileşenleri
│   │   ├── layout/         # Layout bileşenleri
│   │   └── ui/             # UI bileşenleri
│   ├── context/            # Context API
│   ├── pages/              # Sayfa bileşenleri
│   ├── services/           # API servisleri
│   ├── content/            # Statik içerik
│   └── lib/                # Kütüphaneler
├── sql/                    # Database scriptleri
└── docs/                   # Dokümantasyon
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd kandurasMedya
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
```bash
cp env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Supabase veritabanını kurun**
   - Supabase Dashboard'da yeni proje oluşturun
   - SQL Editor'da aşağıdaki scriptleri çalıştırın:
     - `create-blog-categories.sql`
     - `create-analytics-system.sql`
     - `create-newsletter-table.sql`
     - `insert-blog-posts.sql`

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

## 📊 Veritabanı Şeması

### Ana Tablolar
- **`site_settings`** - Site genel ayarları
- **`blog_posts`** - Blog yazıları
- **`blog_categories`** - Blog kategorileri
- **`projects`** - Portföy projeleri
- **`contacts`** - İletişim formları
- **`newsletter_subscribers`** - Newsletter aboneleri
- **`analytics`** - Analitik verileri
- **`users`** - Admin kullanıcıları

## 🔐 Admin Paneli

### Giriş Bilgileri
- **Email:** admin@kandurasmedya.com
- **Şifre:** admin123

### Özellikler
- **Dashboard** - Genel istatistikler
- **Blog Yönetimi** - Yazı ve kategori yönetimi
- **Site Ayarları** - Tüm site içerikleri
- **İletişim Yönetimi** - Müşteri mesajları
- **Portföy Yönetimi** - Proje yönetimi

## 🎨 Özelleştirme

### Renkler
Tailwind config'de özel renkler:
```javascript
colors: {
  primary: { 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8' },
  accent: { 500: '#10B981', 600: '#059669' },
  dark: { 300: '#6B7280', 500: '#374151', 900: '#111827' },
  light: { 500: '#F9FAFB', 600: '#F3F4F6', 700: '#E5E7EB' }
}
```

### İçerik Yönetimi
Tüm site içerikleri `site_settings` tablosundan dinamik olarak yüklenir:
- Hero bölümü
- Hizmetler
- Portföy
- İletişim bilgileri
- Footer

## 📱 Responsive Tasarım

- **Mobile First** yaklaşım
- **Tailwind CSS** responsive sınıfları
- **Breakpoints:** sm, md, lg, xl, 2xl
- **Tüm sayfalar** mobil uyumlu

## 🔧 Geliştirme

### Scriptler
```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
npm run lint         # ESLint kontrolü
```

### Kod Standartları
- **TypeScript** strict mode
- **ESLint** kuralları
- **Prettier** formatlama
- **Component** bazlı yapı

## 🚀 Deployment

### Vercel (Önerilen)
1. Vercel hesabı oluşturun
2. GitHub repository'yi bağlayın
3. Environment değişkenlerini ayarlayın
4. Deploy edin

### Netlify
1. Netlify hesabı oluşturun
2. GitHub repository'yi bağlayın
3. Build komutunu ayarlayın: `npm run build`
4. Deploy edin

## 📊 Analitik

### Özellikler
- **Sayfa görüntüleme** sayıları
- **Dönüşüm oranları** (contact form, newsletter)
- **Ziyaretçi** analitikleri
- **Real-time** veriler

### Tracking
- Contact form gönderimi
- Newsletter aboneliği
- Sayfa ziyaretleri
- Kullanıcı etkileşimleri

## 🔒 Güvenlik

### RLS (Row Level Security)
- **Authenticated** kullanıcılar için tam erişim
- **Anonymous** kullanıcılar için sınırlı erişim
- **Newsletter** aboneliği herkese açık
- **Contact form** herkese açık

### Admin Güvenliği
- **SHA-256** şifre hashleme
- **Session** yönetimi
- **Protected routes** admin paneli

## 📈 Performans

### Optimizasyonlar
- **Code splitting** - Lazy loading
- **Image optimization** - WebP format
- **Bundle size** - Tree shaking
- **Caching** - Service worker

### Lighthouse Skorları
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

**Kanduras Medya**
- **Website:** [kandurasmedya.com](https://kandurasmedya.com)
- **Email:** info@kandurasmedya.com
- **Phone:** +90 538 587 39 84

## 🙏 Teşekkürler

- **React** ekibi
- **Supabase** ekibi
- **Tailwind CSS** ekibi
- **Vercel** ekibi

---

**Kanduras Medya** - Dijital Pazarlama Çözümleri 🚀 