import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Megaphone, BarChart } from 'lucide-react';
import Button from '../ui/Button';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';
import { RefreshCw } from 'lucide-react';

const Hero: React.FC = () => {
  const s = strings.hero;
  const { siteSettings, loading, refreshSettings } = useSite();

  // Loading durumunda basit bir gösterim
  if (loading) {
    return (
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Supabase'den veriler yükleniyor...</p>
        </div>
      </section>
    );
  }


  
  // Dinamik veriler
  const heroTitle = siteSettings?.hero_title || s.title;
  const heroSubtitle = siteSettings?.hero_subtitle || s.subtitle;
  const heroCtaOffer = siteSettings?.hero_cta_offer || s.cta_offer;
  const heroCtaServices = siteSettings?.hero_cta_services || s.cta_services;
  


  return (
    <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            {/* Veri kaynağı göstergesi */}
            <div className="mb-4 p-2 bg-white bg-opacity-20 rounded-lg text-sm">
              <span className="font-semibold">Veri Kaynağı:</span> {siteSettings ? '🟢 Supabase' : '🔴 Statik'}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              {heroTitle}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200">
              {heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  {heroCtaOffer}
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:bg-opacity-10"
                >
                  {heroCtaServices}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            {/* Manuel Yenileme Butonu */}
            <button
              onClick={refreshSettings}
              className="mt-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <RefreshCw size={16} />
              Verileri Yenile
            </button>
          </div>

          <div className="space-y-6">
            {/* Service Cards */}
            {(siteSettings?.hero_cards || s.cards).map((card, i) => (
              <div key={i} className="bg-white bg-opacity-10 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="p-3 bg-accent-500 rounded-lg mr-4">
                    {i === 0 && <Brain size={24} />}
                    {i === 1 && <Megaphone size={24} />}
                    {i === 2 && <BarChart size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-200">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;