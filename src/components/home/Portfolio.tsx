import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  projectId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, category, projectId }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/portfolio', { state: { openProject: projectId } });
  };

  return (
    <div onClick={handleClick} className="block group fade-in-section cursor-pointer">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <span className="text-sm text-accent-400 font-medium block mb-2">{category}</span>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const s = strings.portfolio;
  const { siteSettings } = useSite();
  
  // Dinamik veriler
  const portfolioTitle = siteSettings?.portfolio_title || s.title;
  const portfolioSubtitle = siteSettings?.portfolio_subtitle || s.subtitle;
  const portfolioCta = siteSettings?.portfolio_cta || s.cta;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title={portfolioTitle}
          subtitle={portfolioSubtitle}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {s.projects.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              title={project.title}
              category={project.category}
              projectId={project.projectId}
            />
          ))}
        </div>

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