import React from 'react';
import { BarChart, Megaphone, LineChart, Search, Globe, Mail, Smartphone } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 fade-in-section">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 text-primary-600 rounded-lg mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-dark-300 mb-4">{description}</p>
      <Link to="/services" className="text-primary-600 font-medium inline-flex items-center hover:text-primary-700 transition-colors">
        Detaylı Bilgi
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </Link>
    </div>
  );
};

const Services: React.FC = () => {
  const s = strings.services;
  const { siteSettings } = useSite();
  

  
  // Dinamik veriler
  const servicesTitle = siteSettings?.services_title || s.title;
  const servicesSubtitle = siteSettings?.services_subtitle || s.subtitle;
  const servicesCta = siteSettings?.services_cta || s.cta;
  const servicesList = siteSettings?.services_list || s.list;
  
  const services = servicesList.map((service, index) => ({
    ...service,
    icon: [
      <Megaphone size={28} />,
      <Search size={28} />,
      <LineChart size={28} />,
      <BarChart size={28} />,
      <Globe size={28} />,
      <Mail size={28} />,
      <Smartphone size={28} />
    ][index]
  }));

  return (
    <section className="py-20 bg-light-500">
      <div className="container mx-auto px-4 md:px-6">
        {/* Veri kaynağı göstergesi */}
        <div className="mb-8 p-3 bg-primary-100 rounded-lg text-sm text-center">
          <span className="font-semibold">Services Veri Kaynağı:</span> {siteSettings ? '🟢 Supabase' : '🔴 Statik'}
        </div>
        
        <SectionHeading
          title={servicesTitle}
          subtitle={servicesSubtitle}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/services">
            <Button variant="primary" size="lg">
              {servicesCta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;