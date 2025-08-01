import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';
import { getProjects, Project } from '../../services/siteSettingsService';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/portfolio', { state: { openProject: project.id } });
  };

  return (
    <div onClick={handleClick} className="block group fade-in-section cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={project.image_url || project.image}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <span className="text-sm text-accent-400 font-medium block mb-2">{project.category}</span>
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const s = strings.portfolio;
  const { siteSettings } = useSite();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dinamik veriler
  const portfolioTitle = siteSettings?.portfolio_title || s.title;
  const portfolioSubtitle = siteSettings?.portfolio_subtitle || s.subtitle;
  const portfolioCta = siteSettings?.portfolio_cta || s.cta;

  // Son 3 projeyi yükle
  useEffect(() => {
    const loadLatestProjects = async () => {
      try {
        setLoading(true);
        
        const projectsData = await getProjects();
        
        // Son 3 projeyi al (en yeni olanlar)
        const latestProjects = projectsData.slice(0, 3);
        
        // Eğer projects tablosu boşsa, site_settings'teki portfolio_projects'i kullan
        if (projectsData.length === 0 && siteSettings?.portfolio_projects) {
          const siteSettingsProjects = siteSettings.portfolio_projects.slice(0, 3).map((project: any) => ({
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
          setProjects(latestProjects);
        }
      } catch (error) {
        console.error('❌ Home Portfolio: Projects yüklenirken hata:', error);
        // Hata durumunda site_settings'teki portfolio_projects'i kullan
        if (siteSettings?.portfolio_projects) {
          const fallbackProjects = siteSettings.portfolio_projects.slice(0, 0, 3).map((project: any) => ({
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

    loadLatestProjects();
  }, [siteSettings]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title={portfolioTitle}
          subtitle={portfolioSubtitle}
          centered
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/portfolio">
            <Button variant="outline">
              {portfolioCta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;