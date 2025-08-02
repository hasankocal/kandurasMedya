import React from 'react';
import MetaTags from '../components/seo/MetaTags';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import AboutSection from '../components/home/AboutSection';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import Stats from '../components/home/Stats';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <>
      <MetaTags 
        title="Kanduras Medya - Dijital Pazarlama ve Web Tasarım Ajansı"
        description="İstanbul'un önde gelen dijital pazarlama ajansı. Web tasarım, SEO, sosyal medya yönetimi, yapay zeka destekli dijital çözümler. Ücretsiz danışmanlık için hemen iletişime geçin!"
        keywords="dijital pazarlama İstanbul, web tasarım, SEO uzmanı, sosyal medya yönetimi, yapay zeka, dijital ajans, İstanbul dijital pazarlama, web sitesi tasarımı"
        url="/"
        type="website"
      />
      <div>
        <Hero />
        <Services />
        <AboutSection />
        <Stats />
        <Portfolio />
        <Testimonials />
        <CtaSection />
      </div>
    </>
  );
};

export default Home;