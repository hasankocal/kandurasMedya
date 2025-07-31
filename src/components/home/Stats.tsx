import React from 'react';
import strings from '../../content';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="text-center p-6 fade-in-section">
      <p className="text-4xl font-bold text-primary-600 mb-2">{value}</p>
      <p className="text-dark-300">{label}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = strings.stats;

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;