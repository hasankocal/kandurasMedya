import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import strings from '../../content';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const s = strings.footer;

  return (
    <footer className="bg-dark-500 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              {s.brand.split('Medya')[0]}
              <span className="text-accent-500">Medya</span>
            </h3>
            <p className="mb-4 text-light-700 leading-relaxed">
              {s.desc}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-accent-500 transition-colors p-2" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent-500 transition-colors p-2" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent-500 transition-colors p-2" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-accent-500 transition-colors p-2" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">{s.quickLinksTitle}</h4>
            <ul className="space-y-3">
              {s.quickLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-light-700 hover:text-accent-500 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-4">{s.servicesTitle}</h4>
            <ul className="space-y-3">
              {s.services.map((service, i) => (
                <li key={i}>
                  <Link to="/services" className="text-light-700 hover:text-accent-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">{s.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-light-700">
                  {s.address}
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-light-700">
                  {s.phone.map((p, i) => <span key={i}>{p}<br /></span>)}
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div className="text-light-700">
                  <div className="mb-2">
                    <a href={`mailto:${s.email}`} className="hover:text-accent-500 transition-colors block">
                      {s.email}
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${s.supportEmail}`} className="hover:text-accent-500 transition-colors block">
                      {s.supportEmail}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-400 mt-12 pt-8 text-center text-light-700">
          <p>&copy; {currentYear} {s.brand}. {s.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;