import React, { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  content, 
  author, 
  position, 
  company, 
  image 
}) => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-lg shadow-md fade-in-section">
      <div className="mb-6 text-accent-500">
        <Quote size={42} />
      </div>
      
      <p className="text-lg text-dark-400 mb-8 italic">
        "{content}"
      </p>
      
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold text-dark-500">{author}</h4>
          <p className="text-dark-300">{position}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const s = strings.testimonials;
  const { siteSettings } = useSite();
  
  // Dinamik veriler
  const testimonialsTitle = siteSettings?.testimonials_title || s.title;
  const testimonialsSubtitle = siteSettings?.testimonials_subtitle || s.subtitle;
  const testimonialsList = siteSettings?.testimonials_list || s.list;
  
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  return (
    <section className="py-20 bg-light-500">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title={testimonialsTitle}
          subtitle={testimonialsSubtitle}
          centered
        />
        
        <div className="max-w-4xl mx-auto">
          <Testimonial
            content={testimonialsList[activeIndex].content}
            author={testimonialsList[activeIndex].name}
            position="CEO"
            company={testimonialsList[activeIndex].company}
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          />
          
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-dark-500 hover:text-primary-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2 items-center">
              {testimonialsList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md text-dark-500 hover:text-primary-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;