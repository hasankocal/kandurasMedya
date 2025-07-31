import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import strings from '../../content';

const CtaSection: React.FC = () => {
  const s = strings.cta;

  return (
    <section className="py-20 bg-primary-700 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-500 opacity-20 rounded-full"></div>
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent-500 opacity-20 rounded-full"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {s.title}
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-light-300">
            {s.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {s.cta_offer}
              </Button>
            </Link>
            
            <Link to="/services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:bg-opacity-10"
              >
                {s.cta_services}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;