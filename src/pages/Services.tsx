import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/seo/MetaTags';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import OptimizedImage from '../components/ui/OptimizedImage';
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
import { getServices, Service } from '../services/siteSettingsService';

interface ServiceDetailProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  image_url?: string;
  features: string[];
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ title, icon, description, image_url, features }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Görsel */}
      {image_url && (
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage 
            src={image_url} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            width={400}
            height={192}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      <div className="p-4 md:p-3 lg:p-4">
        <div className="flex items-center mb-4 md:mb-3 lg:mb-4">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-9 md:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg shadow-sm mr-3 md:mr-2 lg:mr-3">
            {icon}
          </div>
          <h3 className="text-lg md:text-base lg:text-lg font-bold text-dark-900">{title}</h3>
        </div>
        
        <p className="text-dark-600 mb-4 md:mb-3 lg:mb-4 text-sm md:text-xs lg:text-sm leading-relaxed">{description}</p>
        
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-3 md:p-2 lg:p-3 rounded-md mb-4 md:mb-3 lg:mb-4">
          <h4 className="font-bold text-dark-900 mb-2 md:mb-1.5 lg:mb-2 text-sm md:text-xs lg:text-sm">🚀 Neler Sunuyoruz:</h4>
          
          <ul className="space-y-1.5 md:space-y-1 lg:space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 bg-primary-600 text-white rounded-full flex items-center justify-center mr-2 mt-0.5">
                  <svg 
                    className="w-2.5 h-2.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5" 
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
                </div>
                <span className="text-dark-700 text-xs md:text-xs lg:text-xs font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link to="/contact">
          <Button 
            variant="primary" 
            className="w-full py-2.5 md:py-2 lg:py-2.5 text-sm md:text-xs lg:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            Bu Hizmet Hakkında Bilgi Alın
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { siteSettings } = useSite();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Hizmetler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Dinamik veriler
  const servicesTitle = siteSettings?.services_title || 'Hizmetlerimiz';
  const servicesSubtitle = siteSettings?.services_subtitle || 'İşletmenize değer katacak, pazarlama süreçlerinizi güçlendirecek çözümler sunuyoruz.';
  
  // Icon mapping
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Megaphone': <Megaphone size={28} />,
      'Search': <Search size={28} />,
      'LineChart': <LineChart size={28} />,
      'BarChart': <BarChart size={28} />,
      'Globe': <Globe size={28} />,
      'Mail': <Mail size={28} />,
      'Smartphone': <Smartphone size={28} />,
      'TrendingUp': <TrendingUp size={28} />
    };
    return iconMap[iconName] || <Megaphone size={28} />;
  };

  const fallbackServices = [
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
        "YZ Destekli İçerik Üretimi",
        "SEO Odaklı İçerik Stratejisi",
        "Görsel İçerik Tasarımı",
        "Video İçerik Üretimi",
        "İçerik Takvimi Yönetimi"
      ]
    },
    {
      title: "Google Ads Yönetimi",
      icon: <BarChart size={28} />,
      description: "Yapay zeka destekli Google Ads kampanyaları ile hedef kitlenize ulaşın. Akıllı teklif stratejileri, performans optimizasyonu ve ROI odaklı yaklaşımlarla reklam bütçenizi verimli kullanın.",
      features: [
        "YZ Destekli Anahtar Kelime Analizi",
        "Akıllı Teklif Stratejileri",
        "Performans Optimizasyonu",
        "ROI Odaklı Kampanya Yönetimi",
        "Detaylı Raporlama ve Analiz"
      ]
    },
    {
      title: "Web Tasarım & Geliştirme",
      icon: <Globe size={28} />,
      description: "Modern, kullanıcı dostu ve mobil uyumlu web siteleri geliştiriyoruz. Yapay zeka destekli tasarım araçları ile kullanıcı deneyimini ön planda tutarak, dönüşüm odaklı web siteleri oluşturuyoruz.",
      features: [
        "Responsive Web Tasarım",
        "Kullanıcı Deneyimi (UX) Optimizasyonu",
        "SEO Uyumlu Kodlama",
        "Hızlı Yükleme Süreleri",
        "Güvenlik ve Performans Optimizasyonu"
      ]
    },
    {
      title: "E-posta Pazarlaması",
      icon: <Mail size={28} />,
      description: "Kişiselleştirilmiş e-posta kampanyaları ile müşterilerinizle güçlü bağlar kurun. Yapay zeka destekli segmentasyon ve otomasyon ile e-posta pazarlamanızı bir üst seviyeye taşıyın.",
      features: [
        "YZ Destekli Segmentasyon",
        "Otomatik E-posta Kampanyaları",
        "Kişiselleştirilmiş İçerik",
        "A/B Test Optimizasyonu",
        "Performans Analizi ve Raporlama"
      ]
    },
    {
      title: "Uygulama Geliştirme",
      icon: <Smartphone size={28} />,
      description: "Yapay zeka destekli mobil uygulama geliştirme hizmetleri sunuyoruz. iOS ve Android platformları için kullanıcı dostu, performanslı ve güvenli uygulamalar geliştiriyoruz.",
      features: [
        "YZ Destekli UX/UI Tasarım",
        "Cross-Platform Geliştirme",
        "Yapay Zeka Entegrasyonu",
        "Performans Optimizasyonu",
        "App Store Optimizasyonu (ASO)"
      ]
    }
  ];

  const servicesWithIcons = services.map(service => ({
    ...service,
    icon: getIconComponent(service.icon)
  }));

  // Eğer services tablosundan veri gelmezse fallback kullan
  const displayServices = servicesWithIcons.length > 0 ? servicesWithIcons : fallbackServices;

  return (
    <>
      <MetaTags 
        title="Dijital Pazarlama Hizmetleri - Web Tasarım, SEO, Sosyal Medya"
        description="Profesyonel dijital pazarlama hizmetleri: Web tasarım, SEO optimizasyonu, sosyal medya yönetimi, Google Ads, yapay zeka destekli çözümler. İstanbul'da dijital başarı için Kanduras Medya."
        keywords="dijital pazarlama hizmetleri, web tasarım İstanbul, SEO hizmetleri, sosyal medya yönetimi, Google Ads, yapay zeka dijital pazarlama, İstanbul dijital ajans"
        url="/services"
        type="website"
      />
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-500 opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-15 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <TrendingUp size={16} className="mr-2" />
              Yapay Zeka Destekli Çözümler
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              {servicesTitle}
            </h1>
            <p className="text-xl md:text-2xl text-light-300 mb-8 leading-relaxed">
              {servicesSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                <span>10+ Yıl Deneyim</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                <span>150+ Başarılı Proje</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-accent-400 rounded-full mr-2"></div>
                <span>%95 Müşteri Memnuniyeti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-dark-900">
              Kapsamlı Dijital Pazarlama Çözümlerimiz
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Her hizmetimiz, yapay zeka teknolojileri ile desteklenerek maksimum verim ve sonuç odaklı yaklaşımla sunulmaktadır.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
            {displayServices.map((service, index) => (
              <ServiceDetail
                key={service.id || index}
                title={service.title}
                icon={service.icon}
                description={service.description}
                image_url={service.image_url}
                features={service.features || []}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent-400 opacity-10 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-full text-lg font-semibold mb-8 backdrop-blur-sm">
              <TrendingUp size={20} className="mr-3" />
              Başarıya Giden Yol
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Projenizi Hayata Geçirmeye Hazır mısınız?
            </h2>
            <p className="text-xl md:text-2xl text-light-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Uzman ekibimizle birlikte dijital pazarlama stratejinizi geliştirin ve hedeflerinize ulaşın. 
              <span className="block mt-2 font-semibold text-accent-300">
                İlk adımı atın, farkı hemen görün!
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  Ücretsiz Danışmanlık Alın
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-primary-700 transition-all duration-300">
                  Başarı Hikayelerimizi İnceleyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Services;