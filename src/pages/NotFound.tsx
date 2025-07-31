import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import strings from '../content';

const NotFound: React.FC = () => {
  const s = strings.notFound;

  return (
    <div className="min-h-screen bg-light-500 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-16">
        <h1 className="text-9xl font-bold text-primary-600 mb-2">{s.title}</h1>
        <h2 className="text-2xl font-bold text-dark-500 mb-4">{s.subtitle}</h2>
        <p className="text-dark-300 mb-8">
          {s.desc}
        </p>
        <Link to="/">
          <Button variant="primary">
            {s.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;