import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import AboutSection from '../components/home/AboutSection';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Stats from '../components/home/Stats';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <AboutSection />
      <Stats />
      <Portfolio />
      <Testimonials />
      <CtaSection />
    </div>
  );
};

export default Home;