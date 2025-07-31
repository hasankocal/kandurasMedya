import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import strings from '../../content';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = strings.header.nav;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary-600 shadow-md py-3' 
          : 'bg-primary-600 bg-opacity-90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-light-100">
              {strings.header.brand.split('Medya')[0]}
              <span className="text-accent-500">Medya</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all hover:text-accent-500 hover:scale-105 ${
                  location.pathname === item.path
                    ? 'text-accent-500'
                    : 'text-light-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden relative p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-500/50 group ${
              isOpen 
                ? 'bg-accent-500 text-white shadow-lg scale-105 rotate-180' 
                : 'text-light-100 hover:bg-white hover:bg-opacity-15 hover:scale-110 hover:shadow-lg'
            }`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className={`transition-all duration-300 ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
                <Menu size={24} className="drop-shadow-sm" />
              </div>
              <div className={`absolute transition-all duration-300 ${isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}`}>
                <X size={24} className="drop-shadow-sm" />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <div className={`bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-2xl p-6 -mx-4 backdrop-blur-lg shadow-2xl border border-white/10 transition-all duration-300 ${
            isOpen ? 'animate-slide-down' : ''
          }`}>
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-all duration-300 block py-4 px-5 rounded-xl group transform hover:scale-[1.02] ${
                    location.pathname === item.path
                      ? 'text-accent-500 bg-gradient-to-r from-accent-500/20 to-accent-400/10 shadow-lg border border-accent-500/30'
                      : 'text-light-100 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 hover:text-accent-400 hover:shadow-md'
                  } ${isOpen ? 'animate-fade-in-right' : ''}`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'bg-accent-500 scale-100' 
                        : 'bg-transparent scale-0 group-hover:bg-accent-400 group-hover:scale-100'
                    }`}></span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;