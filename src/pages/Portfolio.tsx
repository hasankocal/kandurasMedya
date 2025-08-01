import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useSite } from '../context/SiteContext';
import { getProjects, Project } from '../services/siteSettingsService';

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
          src={project.image_url || project.image} 
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
            src={project.image_url || project.image} 
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
          
          {project.results && project.results.length > 0 && (
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
  const { siteSettings } = useSite();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  

  
  // Projects tablosundan veri çek
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        const projectsData = await getProjects();
        
        // Eğer projects tablosu boşsa, site_settings'teki portfolio_projects'i kullan
        if (projectsData.length === 0 && siteSettings?.portfolio_projects) {
          const siteSettingsProjects = siteSettings.portfolio_projects.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image_url: project.image,
            category: project.category,
            client: project.client || 'Bilinmeyen',
            completed_at: project.completed_at || new Date().toISOString(),
            created_at: project.created_at || new Date().toISOString(),
            results: project.results || []
          }));
          setProjects(siteSettingsProjects);
        } else {
          setProjects(projectsData);
        }
      } catch (error) {
        console.error('❌ Portfolio page: Projects yüklenirken hata:', error);
        // Hata durumunda site_settings'teki portfolio_projects'i kullan
        if (siteSettings?.portfolio_projects) {
          const fallbackProjects = siteSettings.portfolio_projects.map((project: any) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image_url: project.image,
            category: project.category,
            client: project.client || 'Bilinmeyen',
            completed_at: project.completed_at || new Date().toISOString(),
            created_at: project.created_at || new Date().toISOString(),
            results: project.results || []
          }));
          setProjects(fallbackProjects);
        } else {
          setProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [siteSettings]);
  
  // Dinamik veriler
  const portfolioTitle = siteSettings?.portfolio_title || 'Başarı Hikayelerimiz';
  const portfolioSubtitle = siteSettings?.portfolio_subtitle || 'Müşterilerimiz için geliştirdiğimiz yapay zeka destekli dijital pazarlama projeleri';



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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Projeler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Veri kaynağı göstergesi */}
      <div className="fixed top-20 right-4 z-50 p-3 bg-primary-100 rounded-lg text-sm shadow-lg">
        <div className="font-semibold">Portfolio Veri Kaynağı:</div>
        <div>Site Settings: {siteSettings ? '🟢 Supabase' : '🔴 Statik'}</div>
        <div>Proje Sayısı: {projects.length}</div>
        <div>Veri Kaynağı: {projects.length > 0 ? 'Projects Tablosu' : 'Site Settings'}</div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{portfolioTitle}</h1>
            <p className="text-xl text-light-300">
              {portfolioSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Bu kategoride proje bulunamadı</h3>
              <p className="text-dark-300 mb-6">Farklı bir kategori seçmeyi deneyin</p>
              <Button variant="outline" onClick={() => setFilter('all')}>
                Tümünü Göster
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Projenizi Hayata Geçirmeye Hazır mısınız?</h2>
            <p className="text-dark-300 mb-8">
              Uzman ekibimizle birlikte dijital pazarlama stratejinizi geliştirin ve hedeflerinize ulaşın.
            </p>
            <div className="flex justify-center">
              <Button variant="primary" size="lg">
                Ücretsiz Danışmanlık Alın
              </Button>
            </div>
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