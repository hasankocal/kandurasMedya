# İletişim Formu Kurulumu

## Gereksinimler
- PHP 7.4 veya üzeri
- Web sunucusu (Apache/Nginx) veya PHP built-in server

## Kurulum Adımları

### 1. PHP Sunucusunu Başlatma

#### Seçenek A: Built-in PHP Server (Geliştirme için)
```bash
# Terminal 1: PHP sunucusunu başlat
npm run php-server

# Terminal 2: React uygulamasını başlat
npm run dev
```

#### Seçenek B: Apache/Nginx (Production için)
- `api/contact.php` dosyasını web sunucunuzun root klasörüne kopyalayın
- React uygulamasını build edin: `npm run build`
- Dist klasörünü web sunucunuza yükleyin

### 2. Email Konfigürasyonu

#### SMTP Ayarları (Önerilen)
Form artık SMTP desteği ile geliyor. Güvenli email gönderimi için:

1. **SMTP Konfigürasyonu**:
```bash
# smtp-config.php dosyasını oluşturun
cp api/smtp-config.example.php api/smtp-config.php
```

2. **Gmail SMTP** (En kolay):
```php
// smtp-config.php içinde gmail ayarlarını doldurun
'gmail' => [
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'username' => 'your-email@gmail.com',
    'password' => 'your-app-password', // Gmail App Password
    'encryption' => 'tls',
    'from_email' => 'noreply@kandurasmedya.com',
    'from_name' => 'Kanduras Medya'
]
```

3. **Gmail App Password Oluşturma**:
   - Gmail hesabınızda 2FA'yı aktif edin
   - Google Account → Security → App passwords
   - "Mail" için yeni app password oluşturun
   - Bu password'u smtp-config.php'de kullanın

4. **Hosting Sağlayıcısı SMTP**:
```php
// Custom SMTP ayarlarını kullanın
'custom' => [
    'host' => 'mail.yourdomain.com',
    'port' => 587,
    'username' => 'noreply@kandurasmedya.com',
    'password' => 'your-password',
    'encryption' => 'tls'
]
```

5. **Fallback**: SMTP çalışmazsa otomatik olarak PHP mail() fonksiyonuna geçer

### 3. Güvenlik Ayarları

#### Rate Limiting (Opsiyonel)
```php
// contact.php'de rate limiting ekleyin
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 60) {
    // 1 dakika bekleme süresi
    exit(json_encode(['success' => false, 'message' => 'Çok hızlı gönderim']));
}
$_SESSION['last_submit'] = time();
```

#### CORS Ayarları
Production'da CORS ayarlarını kısıtlayın:
```php
// Sadece kendi domain'inize izin verin
header("Access-Control-Allow-Origin: https://kandurasmedya.com");
```

### 4. Test Etme

1. Formu doldurun ve gönderin
2. `destek@kandurasmedya.com` adresine mail gelip gelmediğini kontrol edin
3. Hata durumlarını test edin (boş alanlar, geçersiz email, vb.)

### 5. Troubleshooting

#### Mail Gönderilmiyor
- PHP mail() fonksiyonu aktif mi kontrol edin
- Server log'larını inceleyin
- SMTP kullanmayı deneyin

#### CORS Hatası
- PHP server'ın çalıştığından emin olun
- Browser console'da hata mesajlarını kontrol edin

#### Form Gönderilmiyor
- Network tab'da API çağrısını kontrol edin
- PHP error log'larını inceleyin

## Dosya Yapısı
```
kanduras-medya/
├── api/
│   └── contact.php          # PHP backend
├── src/
│   └── services/
│       └── contactService.ts # Frontend service
├── start-php-server.sh      # PHP server script
└── CONTACT_FORM_SETUP.md    # Bu dosya
```

## Production Deployment

1. **Frontend**: `npm run build` ile React uygulamasını build edin
2. **Backend**: `api/contact.php` dosyasını web sunucunuza yükleyin
3. **Email**: SMTP ayarlarını yapın
4. **SSL**: HTTPS sertifikası ekleyin
5. **Security**: Rate limiting ve CORS ayarlarını yapın 