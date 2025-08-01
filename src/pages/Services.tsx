import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { 
  Megaphone, 
  Search, 
  LineChart, 
  BarChart, 
  Globe, 
  Mail,
  Smartphone,
  TrendingUp
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface ServiceDetailProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ title, icon, description, features }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-xl shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] mr-4">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      
      <p className="text-dark-300 mb-6">{description}</p>
      
      <h4 className="font-semibold mb-3">Neler Sunuyoruz:</h4>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg 
              className="text-primary-600 w-5 h-5 mr-2 mt-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link to="/contact">
        <Button 
          variant="outline" 
          className="w-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]"
        >
          Bu Hizmet Hakkında Bilgi Alın
        </Button>
      </Link>
    </div>
  );
};

const Services: React.FC = () => {
  const { siteSettings } = useSite();
  
  // Dinamik veriler
  const servicesTitle = siteSettings?.services_title || 'Hizmetlerimiz';
  const servicesSubtitle = siteSettings?.services_subtitle || 'İşletmenize değer katacak, pazarlama süreçlerinizi güçlendirecek çözümler sunuyoruz.';
  const servicesList = siteSettings?.services_list || [];
  
  // Dinamik services detayları
  const dynamicServices = siteSettings?.services_details || [];
  
  const services = dynamicServices.length > 0 ? dynamicServices.map((service, index) => ({
    ...service,
    icon: [
      <Megaphone size={28} />,
      <Search size={28} />,
      <LineChart size={28} />,
      <BarChart size={28} />,
      <Globe size={28} />,
      <Mail size={28} />,
      <Smartphone size={28} />
    ][index] || <Megaphone size={28} />
  })) : [
    {
      title: "Sosyal Medya Yönetimi",
      icon: <Megaphone size={28} />,
      description: "Markanızın sosyal medya varlığını yapay zeka destekli stratejik bir yaklaşımla yönetiyoruz. İçerik planlaması, topluluk yönetimi ve reklam kampanyaları ile hedef kitlenizle etkileşimi artırıyoruz.",
      features: [
        "YZ Destekli İçerik Üretimi ve Planlama",
        "Otomatik Topluluk Yönetimi",
        "Hedefli Sosyal Medya Reklamları",
        "Performans Analizi ve Raporlama",
        "Rakip Analizi ve Trend Takibi"
      ]
    },
    {
      title: "SEO Optimizasyonu",
      icon: <Search size={28} />,
      description: "Yapay zeka algoritmalarını kullanarak web sitenizin arama motorlarında üst sıralarda yer alması için kapsamlı SEO stratejileri geliştiriyoruz. Teknik SEO, içerik optimizasyonu ve link building çalışmaları ile organik trafiğinizi artırıyoruz.",
      features: [
        "YZ Destekli Anahtar Kelime Analizi",
        "Teknik SEO İyileştirmeleri",
        "Semantik İçerik Optimizasyonu",
        "Akıllı Link Building Stratejileri",
        "Yerel SEO Çalışmaları"
      ]
    },
    {
      title: "İçerik Üreticileri İçin",
      icon: <LineChart size={28} />,
      description: "Yapay zeka teknolojileri ile hedef kitlenize özel, değer sunan içerikler üretiyoruz. Blog yazıları, infografikler ve videolar ile markanızın otoritesini güçlendiriyoruz.",
      features: [
        "YZ Destekli İçerik Stratejisi",
        "Otomatik Blog Yazıları",
        "Görsel İçerik Üretimi",
        "Video İçerik Optimizasyonu",
        "İçerik Performans Analizi"
      ]
    },
    {
      title: "Google Ads Yönetimi",
      icon: <BarChart size={28} />,
      description: "Yapay zeka destekli reklam optimizasyonu ile Google Ads kampanyalarınızı yönetiyoruz. Arama ağı, görüntülü reklam ağı ve video reklamları ile marka bilinirliğinizi artırıyor ve dönüşüm oranlarınızı yükseltiyoruz.",
      features: [
        "YZ Destekli Teklif Stratejileri",
        "Akıllı Kampanya Optimizasyonu",
        "Dinamik Reklam Oluşturma",
        "Otomatik A/B Testleri",
        "Gelişmiş Hedefleme"
      ]
    },
    {
      title: "Web Tasarım & Geliştirme",
      icon: <Globe size={28} />,
      description: "Modern, kullanıcı dostu ve mobil uyumlu web siteleri tasarlıyor ve geliştiriyoruz. Yapay zeka destekli tasarım araçları ile markanızın kimliğini yansıtan, teknik olarak güçlü web siteleri oluşturuyoruz.",
      features: [
        "YZ Destekli Tasarım Önerileri",
        "Responsive Tasarım",
        "SEO Uyumlu Kodlama",
        "Performans Optimizasyonu",
        "Güvenlik Önlemleri"
      ]
    },
    {
      title: "E-posta Pazarlaması",
      icon: <Mail size={28} />,
      description: "Yapay zeka ile kişiselleştirilmiş e-posta kampanyaları oluşturuyoruz. Otomatik e-posta dizileri, haber bültenleri ve promosyon kampanyaları ile müşteri bağlılığını artırıyoruz.",
      features: [
        "YZ Destekli İçerik Oluşturma",
        "Akıllı Segment Analizi",
        "Otomatik A/B Testleri",
        "Kişiselleştirilmiş Kampanyalar",
        "Performans Takibi"
      ]
    },
    {
      title: "Mobil Uygulama Geliştirme",
      icon: <Smartphone size={28} />,
      description: "Yapay zeka destekli mobil uygulama geliştirme hizmetleri sunuyoruz. iOS ve Android platformları için kullanıcı dostu, performanslı ve güvenli uygulamalar geliştiriyoruz.",
      features: [
        "YZ Destekli UX/UI Tasarım",
        "Cross-Platform Geliştirme",
        "Yapay Zeka Entegrasyonu",
        "Performans Optimizasyonu",
        "App Store Optimizasyonu (ASO)"
      ]
    },
    {
      title: "Dijital Pazarlama Danışmanlığı",
      icon: <TrendingUp size={28} />,
      description: "Dijital pazarlama stratejilerinizi yapay zeka destekli analizlerle optimize ediyoruz. Kapsamlı pazarlama denetimleri, rakip analizleri ve stratejik planlama ile işletmenizi büyütüyoruz.",
      features: [
        "YZ Destekli Pazar Analizi",
        "Rekabet Analizi",
        "Stratejik Planlama",
        "ROI Optimizasyonu",
        "Performans Raporlama"
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesTitle}</h1>
            <p className="text-xl text-gray-200">
              {servicesSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title={servicesTitle}
            subtitle={servicesSubtitle}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceDetail
                key={index}
                title={service.title}
                icon={service.icon}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {siteSettings?.cta_title || 'Dijital Başarı Yolculuğunuza Başlayın'}
            </h2>
            
            <p className="text-lg mb-8 text-gray-200">
              {siteSettings?.cta_subtitle || 'Dijital pazarlama hedeflerinize ulaşmak için bizimle iletişime geçin. İşletmenize özel çözümler ile markanızı bir sonraki seviyeye taşıyalım.'}
            </p>
            
            <div className="flex justify-center">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                >
                  {siteSettings?.cta_button_text || 'Ücretsiz Danışmanlık Alın'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;