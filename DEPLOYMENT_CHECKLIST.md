# Production Deployment Checklist

## ✅ Tamamlanan Adımlar

### 1. Backend (PHP API)
- [x] `api/contact.php` dosyası https://kandurasmedya.com/api/contact.php'ye yüklendi
- [x] SMTP ayarları güncellendi:
  - Host: `mail.kandurasmedya.com`
  - Username: `destek@kandurasmedya.com`
  - Password: `Barbar8808`
- [x] CORS headers production için ayarlandı

### 2. Frontend (React)
- [x] API URL production için güncellendi
- [x] Build oluşturuldu (`npm run build`)
- [x] `dist/` klasörü hazır

## 🔄 Yapılması Gerekenler

### 3. Frontend Deployment
- [ ] `dist/` klasörünün içeriğini https://kandurasmedya.com'a yükleyin
- [ ] Ana domain'de React uygulaması çalışır duruma getirin

### 4. Test Etme
- [ ] `test-contact-form.php` dosyasını https://kandurasmedya.com/test-contact-form.php'ye yükleyin
- [ ] Test sayfasını çalıştırın: https://kandurasmedya.com/test-contact-form.php
- [ ] Contact sayfasını test edin: https://kandurasmedya.com/contact

### 5. Email Testi
- [ ] Test formu gönderin
- [ ] `destek@kandurasmedya.com` adresine email gelip gelmediğini kontrol edin
- [ ] SMTP bağlantısı çalışıyor mu kontrol edin

## 🔧 Troubleshooting

### Email Gelmiyorsa:
1. **Server Error Logları**: cPanel → Error Logs kontrol edin
2. **SMTP Test**: `test-contact-form.php` çalıştırın
3. **Mail Ayarları**: `destek@kandurasmedya.com` hesabı aktif mi?
4. **Spam Klasörü**: Email spam'e düşmüş olabilir

### API Çalışmıyorsa:
1. **File Permissions**: `contact.php` dosyası 755 permission'a sahip olmalı
2. **PHP Version**: PHP 7.4+ gerekli
3. **CORS**: Browser console'da CORS hatası var mı?

### React App Çalışmıyorsa:
1. **Routing**: Server'da React Router için rewrite kuralları gerekli
2. **Build**: `dist/` klasörü tamamen yüklendi mi?
3. **Base URL**: Vite config'de base URL ayarı gerekli mi?

## 📋 Deployment Komutları

```bash
# 1. Production build
npm run build

# 2. Dist klasörünü sunucuya yükle
# (FTP/cPanel File Manager ile)

# 3. Test et
# https://kandurasmedya.com/test-contact-form.php
# https://kandurasmedya.com/contact
```

## 🔐 Güvenlik Notları

- [ ] SMTP şifresi güvenli mi?
- [ ] CORS ayarları production için kısıtlandı mı?
- [ ] Test dosyası (`test-contact-form.php`) production'dan kaldırıldı mı?
- [ ] Error reporting production'da kapalı mı?

## 📧 Email Template

Test için gönderilecek email formatı:
```
Konu: Kanduras Medya - İletişim Formu: [Konu]

Kanduras Medya İletişim Formu

İsim: [İsim]
E-posta: [Email]
Telefon: [Telefon]
Konu: [Konu]

Mesaj:
[Mesaj]

---
Bu mesaj kandurasmedya.com iletişim formu aracılığıyla gönderilmiştir.
Gönderim Tarihi: [Tarih]
IP Adresi: [IP]
``` 