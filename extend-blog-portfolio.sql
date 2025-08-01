-- Blog ve Portfolio Alanlarını Site Settings'e Ekleme
-- Bu dosyayı Supabase Dashboard > SQL Editor'de çalıştırın

-- Blog alanları ekle
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS blog_title VARCHAR(255) DEFAULT 'Blog';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS blog_subtitle TEXT DEFAULT 'Dijital pazarlama dünyasından en güncel bilgiler ve stratejiler';

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS blog_posts JSONB DEFAULT '[
  {
    "id": "social-media-strategies-2025",
    "title": "2025 Yılında Sosyal Medya Pazarlama Stratejileri",
    "excerpt": "Dijital dünyada hızla değişen trendler ve algoritmalar, sosyal medya pazarlama stratejilerinizi güncel tutmanızı gerektiriyor. 2025 yılı için öne çıkan sosyal medya trendlerini ve başarılı stratejileri inceliyoruz.",
    "category": "Sosyal Medya",
    "date": "15 Mayıs 2025",
    "author": "Ayşe Demir",
    "image": "https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "content": "Detaylı blog içeriği buraya gelecek..."
  },
  {
    "id": "seo-optimization-guide",
    "title": "Kapsamlı SEO Optimizasyon Rehberi",
    "excerpt": "Web sitenizin arama motorlarında üst sıralarda yer alması için uygulamanız gereken SEO teknikleri ve stratejileri. Teknik SEO, içerik optimizasyonu ve link building stratejilerini detaylı olarak inceliyoruz.",
    "category": "SEO",
    "date": "10 Mayıs 2025",
    "author": "Mehmet Yılmaz",
    "image": "https://images.pexels.com/photos/6177662/pexels-photo-6177662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "content": "Detaylı blog içeriği buraya gelecek..."
  },
  {
    "id": "content-marketing-success",
    "title": "İçerik Pazarlamasında Başarı İçin 10 İpucu",
    "excerpt": "Etkili bir içerik pazarlaması stratejisi için uygulamanız gereken ipuçları ve dikkat etmeniz gereken noktalar. Hedef kitlenizle bağ kuran, değer sunan içerikler nasıl oluşturulur?",
    "category": "İçerik",
    "date": "5 Mayıs 2025",
    "author": "Zeynep Şahin",
    "image": "https://images.pexels.com/photos/6177545/pexels-photo-6177545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "content": "Detaylı blog içeriği buraya gelecek..."
  }
]'::jsonb;

-- Portfolio projeleri alanı ekle
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS portfolio_projects JSONB DEFAULT '[
  {
    "id": "apple-store",
    "title": "Apple Deposu Sosyal Medya Kampanyası",
    "category": "Sosyal Medya",
    "description": "Apple ürünleri satan mağaza için geliştirdiğimiz yapay zeka destekli sosyal medya stratejisi ile marka bilinirliğini artırdık ve hedef kitleyle güçlü bir bağ kurduk. Instagram ve Facebook üzerinden yürüttüğümüz kampanyalarla, etkileşim oranlarında belirgin bir artış sağladık.",
    "image": "https://images.unsplash.com/photo-1654593405070-d7b7eec8476a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "results": [
      "Sosyal medya takipçi sayısında %150 artış",
      "Etkileşim oranlarında %75 iyileşme",
      "Kampanya dönemi boyunca satışlarda %35 artış",
      "Marka bilinirliğinde ölçülebilir gelişme"
    ]
  },
  {
    "id": "pro-tech",
    "title": "Pro-Tech SEO Optimizasyonu",
    "category": "SEO",
    "description": "Teknoloji şirketi için YZ DestekLi kapsamlı bir SEO stratejisi geliştirerek, arama motorlarında görünürlüklerini artırdık. Teknik SEO iyileştirmeleri, içerik optimizasyonu ve link building çalışmaları ile organik trafiği önemli ölçüde yükselttik.",
    "image": "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "results": [
      "Hedef anahtar kelimelerde ilk sayfaya yükselme",
      "Organik trafikte %200 artış",
      "Dönüşüm oranlarında %45 iyileşme",
      "Sitede kalma süresinde %30 artış"
    ]
  },
  {
    "id": "skinDoctorApp",
    "title": "Cilt Doktoru Uygulaması",
    "category": "Uygulama",
    "description": "Yapay zeka destekli cilt doktoru uygulaması geliştirdik. Uygulama içerisinde cilt analizi yapılabilir ve cilt durumu hakkında bilgi alınabilir.",
    "image": "https://news.ki.se/sites/nyheter/files/styles/article_full_width/public/qbank/Dermalyser-InAction6_custom20240320102447.webp",
    "results": [
      "ROAS (Reklam Harcaması Getirisi) %400",
      "Yeni müşteri kazanımında %80 artış",
      "Online sipariş sayısında %120 artış",
      "Marka bilinirliğinde %60 artış"
    ]
  }
]'::jsonb;

-- Services detayları alanı ekle
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS services_details JSONB DEFAULT '[
  {
    "title": "Sosyal Medya Yönetimi",
    "icon": "Megaphone",
    "description": "Markanızın sosyal medya varlığını yapay zeka destekli stratejik bir yaklaşımla yönetiyoruz. İçerik planlaması, topluluk yönetimi ve reklam kampanyaları ile hedef kitlenizle etkileşimi artırıyoruz.",
    "features": [
      "YZ Destekli İçerik Üretimi ve Planlama",
      "Otomatik Topluluk Yönetimi",
      "Hedefli Sosyal Medya Reklamları",
      "Performans Analizi ve Raporlama",
      "Rakip Analizi ve Trend Takibi"
    ]
  },
  {
    "title": "SEO Optimizasyonu",
    "icon": "Search",
    "description": "Yapay zeka algoritmalarını kullanarak web sitenizin arama motorlarında üst sıralarda yer alması için kapsamlı SEO stratejileri geliştiriyoruz. Teknik SEO, içerik optimizasyonu ve link building çalışmaları ile organik trafiğinizi artırıyoruz.",
    "features": [
      "YZ Destekli Anahtar Kelime Analizi",
      "Teknik SEO İyileştirmeleri",
      "Semantik İçerik Optimizasyonu",
      "Akıllı Link Building Stratejileri",
      "Yerel SEO Çalışmaları"
    ]
  },
  {
    "title": "İçerik Üreticileri İçin",
    "icon": "LineChart",
    "description": "Yapay zeka teknolojileri ile hedef kitlenize özel, değer sunan içerikler üretiyoruz. Blog yazıları, infografikler ve videolar ile markanızın otoritesini güçlendiriyoruz.",
    "features": [
      "YZ Destekli İçerik Üretimi",
      "SEO Odaklı İçerik Stratejisi",
      "Görsel İçerik Tasarımı",
      "Video İçerik Üretimi",
      "İçerik Takvimi Yönetimi"
    ]
  },
  {
    "title": "Google Ads Yönetimi",
    "icon": "BarChart",
    "description": "Yapay zeka destekli Google Ads kampanyaları ile hedef kitlenize ulaşın. Akıllı teklif stratejileri, performans optimizasyonu ve ROI odaklı yaklaşımlarla reklam bütçenizi verimli kullanın.",
    "features": [
      "YZ Destekli Anahtar Kelime Analizi",
      "Akıllı Teklif Stratejileri",
      "Performans Optimizasyonu",
      "ROI Odaklı Kampanya Yönetimi",
      "Detaylı Raporlama ve Analiz"
    ]
  },
  {
    "title": "Web Tasarım & Geliştirme",
    "icon": "Globe",
    "description": "Modern, kullanıcı dostu ve mobil uyumlu web siteleri geliştiriyoruz. Yapay zeka destekli tasarım araçları ile kullanıcı deneyimini ön planda tutarak, dönüşüm odaklı web siteleri oluşturuyoruz.",
    "features": [
      "Responsive Web Tasarım",
      "Kullanıcı Deneyimi (UX) Optimizasyonu",
      "SEO Uyumlu Kodlama",
      "Hızlı Yükleme Süreleri",
      "Güvenlik ve Performans Optimizasyonu"
    ]
  },
  {
    "title": "E-posta Pazarlaması",
    "icon": "Mail",
    "description": "Kişiselleştirilmiş e-posta kampanyaları ile müşterilerinizle güçlü bağlar kurun. Yapay zeka destekli segmentasyon ve otomasyon ile e-posta pazarlamanızı bir üst seviyeye taşıyın.",
    "features": [
      "YZ Destekli Segmentasyon",
      "Otomatik E-posta Kampanyaları",
      "Kişiselleştirilmiş İçerik",
      "A/B Test Optimizasyonu",
      "Performans Analizi ve Raporlama"
    ]
  },
  {
    "title": "Uygulama Geliştirme",
    "icon": "Smartphone",
    "description": "Yapay zeka destekli mobil uygulama geliştirme hizmetleri sunuyoruz. iOS ve Android platformları için kullanıcı dostu, performanslı ve güvenli uygulamalar geliştiriyoruz.",
    "features": [
      "YZ Destekli UX/UI Tasarım",
      "Cross-Platform Geliştirme",
      "Yapay Zeka Entegrasyonu",
      "Performans Optimizasyonu",
      "App Store Optimizasyonu (ASO)"
    ]
  }
]'::jsonb;

-- Mevcut kaydı güncelle
UPDATE site_settings SET
  blog_title = 'Blog',
  blog_subtitle = 'Dijital pazarlama dünyasından en güncel bilgiler ve stratejiler',
  blog_posts = '[
    {
      "id": "social-media-strategies-2025",
      "title": "2025 Yılında Sosyal Medya Pazarlama Stratejileri",
      "excerpt": "Dijital dünyada hızla değişen trendler ve algoritmalar, sosyal medya pazarlama stratejilerinizi güncel tutmanızı gerektiriyor. 2025 yılı için öne çıkan sosyal medya trendlerini ve başarılı stratejileri inceliyoruz.",
      "category": "Sosyal Medya",
      "date": "15 Mayıs 2025",
      "author": "Ayşe Demir",
      "image": "https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "content": "Detaylı blog içeriği buraya gelecek..."
    },
    {
      "id": "seo-optimization-guide",
      "title": "Kapsamlı SEO Optimizasyon Rehberi",
      "excerpt": "Web sitenizin arama motorlarında üst sıralarda yer alması için uygulamanız gereken SEO teknikleri ve stratejileri. Teknik SEO, içerik optimizasyonu ve link building stratejilerini detaylı olarak inceliyoruz.",
      "category": "SEO",
      "date": "10 Mayıs 2025",
      "author": "Mehmet Yılmaz",
      "image": "https://images.pexels.com/photos/6177662/pexels-photo-6177662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "content": "Detaylı blog içeriği buraya gelecek..."
    },
    {
      "id": "content-marketing-success",
      "title": "İçerik Pazarlamasında Başarı İçin 10 İpucu",
      "excerpt": "Etkili bir içerik pazarlaması stratejisi için uygulamanız gereken ipuçları ve dikkat etmeniz gereken noktalar. Hedef kitlenizle bağ kuran, değer sunan içerikler nasıl oluşturulur?",
      "category": "İçerik",
      "date": "5 Mayıs 2025",
      "author": "Zeynep Şahin",
      "image": "https://images.pexels.com/photos/6177545/pexels-photo-6177545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "content": "Detaylı blog içeriği buraya gelecek..."
    }
  ]'::jsonb,
  portfolio_projects = '[
    {
      "id": "apple-store",
      "title": "Apple Deposu Sosyal Medya Kampanyası",
      "category": "Sosyal Medya",
      "description": "Apple ürünleri satan mağaza için geliştirdiğimiz yapay zeka destekli sosyal medya stratejisi ile marka bilinirliğini artırdık ve hedef kitleyle güçlü bir bağ kurduk. Instagram ve Facebook üzerinden yürüttüğümüz kampanyalarla, etkileşim oranlarında belirgin bir artış sağladık.",
      "image": "https://images.unsplash.com/photo-1654593405070-d7b7eec8476a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "results": [
        "Sosyal medya takipçi sayısında %150 artış",
        "Etkileşim oranlarında %75 iyileşme",
        "Kampanya dönemi boyunca satışlarda %35 artış",
        "Marka bilinirliğinde ölçülebilir gelişme"
      ]
    },
    {
      "id": "pro-tech",
      "title": "Pro-Tech SEO Optimizasyonu",
      "category": "SEO",
      "description": "Teknoloji şirketi için YZ DestekLi kapsamlı bir SEO stratejisi geliştirerek, arama motorlarında görünürlüklerini artırdık. Teknik SEO iyileştirmeleri, içerik optimizasyonu ve link building çalışmaları ile organik trafiği önemli ölçüde yükselttik.",
      "image": "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "results": [
        "Hedef anahtar kelimelerde ilk sayfaya yükselme",
        "Organik trafikte %200 artış",
        "Dönüşüm oranlarında %45 iyileşme",
        "Sitede kalma süresinde %30 artış"
      ]
    },
    {
      "id": "skinDoctorApp",
      "title": "Cilt Doktoru Uygulaması",
      "category": "Uygulama",
      "description": "Yapay zeka destekli cilt doktoru uygulaması geliştirdik. Uygulama içerisinde cilt analizi yapılabilir ve cilt durumu hakkında bilgi alınabilir.",
      "image": "https://news.ki.se/sites/nyheter/files/styles/article_full_width/public/qbank/Dermalyser-InAction6_custom20240320102447.webp",
      "results": [
        "ROAS (Reklam Harcaması Getirisi) %400",
        "Yeni müşteri kazanımında %80 artış",
        "Online sipariş sayısında %120 artış",
        "Marka bilinirliğinde %60 artış"
      ]
    }
  ]'::jsonb,
  services_details = '[
    {
      "title": "Sosyal Medya Yönetimi",
      "icon": "Megaphone",
      "description": "Markanızın sosyal medya varlığını yapay zeka destekli stratejik bir yaklaşımla yönetiyoruz. İçerik planlaması, topluluk yönetimi ve reklam kampanyaları ile hedef kitlenizle etkileşimi artırıyoruz.",
      "features": [
        "YZ Destekli İçerik Üretimi ve Planlama",
        "Otomatik Topluluk Yönetimi",
        "Hedefli Sosyal Medya Reklamları",
        "Performans Analizi ve Raporlama",
        "Rakip Analizi ve Trend Takibi"
      ]
    },
    {
      "title": "SEO Optimizasyonu",
      "icon": "Search",
      "description": "Yapay zeka algoritmalarını kullanarak web sitenizin arama motorlarında üst sıralarda yer alması için kapsamlı SEO stratejileri geliştiriyoruz. Teknik SEO, içerik optimizasyonu ve link building çalışmaları ile organik trafiğinizi artırıyoruz.",
      "features": [
        "YZ Destekli Anahtar Kelime Analizi",
        "Teknik SEO İyileştirmeleri",
        "Semantik İçerik Optimizasyonu",
        "Akıllı Link Building Stratejileri",
        "Yerel SEO Çalışmaları"
      ]
    },
    {
      "title": "İçerik Üreticileri İçin",
      "icon": "LineChart",
      "description": "Yapay zeka teknolojileri ile hedef kitlenize özel, değer sunan içerikler üretiyoruz. Blog yazıları, infografikler ve videolar ile markanızın otoritesini güçlendiriyoruz.",
      "features": [
        "YZ Destekli İçerik Üretimi",
        "SEO Odaklı İçerik Stratejisi",
        "Görsel İçerik Tasarımı",
        "Video İçerik Üretimi",
        "İçerik Takvimi Yönetimi"
      ]
    },
    {
      "title": "Google Ads Yönetimi",
      "icon": "BarChart",
      "description": "Yapay zeka destekli Google Ads kampanyaları ile hedef kitlenize ulaşın. Akıllı teklif stratejileri, performans optimizasyonu ve ROI odaklı yaklaşımlarla reklam bütçenizi verimli kullanın.",
      "features": [
        "YZ Destekli Anahtar Kelime Analizi",
        "Akıllı Teklif Stratejileri",
        "Performans Optimizasyonu",
        "ROI Odaklı Kampanya Yönetimi",
        "Detaylı Raporlama ve Analiz"
      ]
    },
    {
      "title": "Web Tasarım & Geliştirme",
      "icon": "Globe",
      "description": "Modern, kullanıcı dostu ve mobil uyumlu web siteleri geliştiriyoruz. Yapay zeka destekli tasarım araçları ile kullanıcı deneyimini ön planda tutarak, dönüşüm odaklı web siteleri oluşturuyoruz.",
      "features": [
        "Responsive Web Tasarım",
        "Kullanıcı Deneyimi (UX) Optimizasyonu",
        "SEO Uyumlu Kodlama",
        "Hızlı Yükleme Süreleri",
        "Güvenlik ve Performans Optimizasyonu"
      ]
    },
    {
      "title": "E-posta Pazarlaması",
      "icon": "Mail",
      "description": "Kişiselleştirilmiş e-posta kampanyaları ile müşterilerinizle güçlü bağlar kurun. Yapay zeka destekli segmentasyon ve otomasyon ile e-posta pazarlamanızı bir üst seviyeye taşıyın.",
      "features": [
        "YZ Destekli Segmentasyon",
        "Otomatik E-posta Kampanyaları",
        "Kişiselleştirilmiş İçerik",
        "A/B Test Optimizasyonu",
        "Performans Analizi ve Raporlama"
      ]
    },
    {
      "title": "Uygulama Geliştirme",
      "icon": "Smartphone",
      "description": "Yapay zeka destekli mobil uygulama geliştirme hizmetleri sunuyoruz. iOS ve Android platformları için kullanıcı dostu, performanslı ve güvenli uygulamalar geliştiriyoruz.",
      "features": [
        "YZ Destekli UX/UI Tasarım",
        "Cross-Platform Geliştirme",
        "Yapay Zeka Entegrasyonu",
        "Performans Optimizasyonu",
        "App Store Optimizasyonu (ASO)"
      ]
    }
  ]'::jsonb
WHERE id = 'bfbf85a4-c49a-49c4-9dbe-1721c03cf62a'; 