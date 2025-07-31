import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const duration = 3000; // 3 saniye
    const start = window.pageYOffset;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing fonksiyonu - yavaşlayarak yukarı çıkma
      const easeInOutCubic = (progress: number) => {
        return progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      };

      window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-accent-500/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-accent-500 hover:scale-110 z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Sayfanın üstüne git"
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;