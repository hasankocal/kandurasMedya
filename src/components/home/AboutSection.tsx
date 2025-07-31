import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { CheckCircle } from 'lucide-react';
import strings from '../../content';

const AboutSection: React.FC = () => {
  const s = strings.about;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-section">
            <SectionHeading 
              title={s.title}
              subtitle={s.subtitle}
            />

            <p className="text-dark-300 mb-6">
              {s.desc}
            </p>

            <ul className="space-y-3 mb-8">
              {s.achievements.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle size={20} className="text-primary-600 mr-3" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/about">
              <Button variant="primary">
                {s.cta}
              </Button>
            </Link>
          </div>

          <div className="relative fade-in-section">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Kanduras Medya Ekibi" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-500 rounded-lg -z-10"></div>
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary-100 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;