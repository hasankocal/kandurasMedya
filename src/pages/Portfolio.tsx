import React, { useState } from 'react';
import Button from '../components/ui/Button';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  results?: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] cursor-pointer transform transition-all duration-300 hover:-translate-y-1 fade-in-section"
      onClick={() => onClick(project.id)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-dark-300 line-clamp-2">{project.description}</p>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-dark-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[16px_16px_32px_rgba(0,0,0,0.2),-16px_-16px_32px_rgba(255,255,255,0.1)]">
        <div className="relative h-80 md:h-96">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-600 bg-primary-50 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
              {project.category}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Proje Detayları</h3>
            <p className="text-dark-300">{project.description}</p>
          </div>
          
          {project.results && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Sonuçlar</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.results.map((result, index) => (
                  <li key={index} className="text-dark-300">{result}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]"
            >
              Kapat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: "apple-store",
      title: "Apple Deposu Sosyal Medya Kampanyası",
      category: "Sosyal Medya",
      description: "Apple ürünleri satan mağaza için geliştirdiğimiz yapay zeka destekli sosyal medya stratejisi ile marka bilinirliğini artırdık ve hedef kitleyle güçlü bir bağ kurduk. Instagram ve Facebook üzerinden yürüttüğümüz kampanyalarla, etkileşim oranlarında belirgin bir artış sağladık.",
      image: "https://images.unsplash.com/photo-1654593405070-d7b7eec8476a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      results: [
        "Sosyal medya takipçi sayısında %150 artış",
        "Etkileşim oranlarında %75 iyileşme",
        "Kampanya dönemi boyunca satışlarda %35 artış",
        "Marka bilinirliğinde ölçülebilir gelişme"
      ]
    },
    {
      id: "pro-tech",
      title: "Pro-Tech SEO Optimizasyonu",
      category: "SEO",
      description: "Teknoloji şirketi için YZ Destekli kapsamlı bir SEO stratejisi geliştirerek, arama motorlarında görünürlüklerini artırdık. Teknik SEO iyileştirmeleri, içerik optimizasyonu ve link building çalışmaları ile organik trafiği önemli ölçüde yükselttik.",
      image: "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      results: [
        "Hedef anahtar kelimelerde ilk sayfaya yükselme",
        "Organik trafikte %200 artış",
        "Dönüşüm oranlarında %45 iyileşme",
        "Sitede kalma süresinde %30 artış"
      ]
    },
    {
      id: "skinDoctorApp",
      title: "Cilt Doktoru Uygulaması",
      category: "Uygulama",
      description: "Yapay zeka destekli cilt doktoru uygulaması geliştirdik. Uygulama içerisinde cilt analizi yapılabilir ve cilt durumu hakkında bilgi alınabilir.",
      image: "https://news.ki.se/sites/nyheter/files/styles/article_full_width/public/qbank/Dermalyser-InAction6_custom20240320102447.webp",
      results: [
        "ROAS (Reklam Harcaması Getirisi) %400",
        "Yeni müşteri kazanımında %80 artış",
        "Online sipariş sayısında %120 artış",
        "Marka bilinirliğinde %60 artış"
      ]
    }
  ];

  const handleProjectClick = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setSelectedProject(project);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Başarı Hikayelerimiz</h1>
            <p className="text-xl text-light-300">
              Müşterilerimiz için geliştirdiğimiz yapay zeka destekli dijital pazarlama projeleri
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in-section">
            <button
              className={`px-4 py-2 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-light-500 text-dark-300 hover:bg-light-600'
              } transition-colors`}
              onClick={() => setFilter('all')}
            >
              Tümü
            </button>
            <button
              className={`px-4 py-2 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] ${
                filter === 'Sosyal Medya'
                  ? 'bg-primary-600 text-white'
                  : 'bg-light-500 text-dark-300 hover:bg-light-600'
              } transition-colors`}
              onClick={() => setFilter('Sosyal Medya')}
            >
              Sosyal Medya
            </button>
            <button
              className={`px-4 py-2 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] ${
                filter === 'SEO'
                  ? 'bg-primary-600 text-white'
                  : 'bg-light-500 text-dark-300 hover:bg-light-600'
              } transition-colors`}
              onClick={() => setFilter('SEO')}
            >
              SEO
            </button>
            <button
              className={`px-4 py-2 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] ${
                filter === 'Uygulama'
                  ? 'bg-primary-600 text-white'
                  : 'bg-light-500 text-dark-300 hover:bg-light-600'
              } transition-colors`}
              onClick={() => setFilter('Uygulama')}
            >
              Uygulama
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bir Sonraki Başarı Hikayesi Sizin Olsun
            </h2>
            
            <p className="text-lg mb-8 text-light-300">
              Dijital pazarlama hedeflerinize ulaşmak için stratejik çözümler sunan ekibimizle tanışın.
              Markanızı bir sonraki seviyeye taşıyalım.
            </p>
            
            <Button
              variant="secondary"
              size="lg"
              className="shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.1)]"
              onClick={() => window.location.href = '/contact'}
            >
              Ücretsiz Danışmanlık Alın
            </Button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Portfolio;