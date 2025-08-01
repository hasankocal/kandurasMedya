import React from 'react';
import strings from '../../content';
import { useSite } from '../../context/SiteContext';

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
  const { siteSettings } = useSite();
  

  
  // Dinamik stats verileri
  const stats = [
    { value: siteSettings?.stats_experience || '10+', label: 'Yıllık Tecrübe' },
    { value: siteSettings?.stats_clients || '150+', label: 'Memnun Müşteri' },
    { value: siteSettings?.stats_projects || '450+', label: 'Tamamlanan Proje' },
    { value: siteSettings?.stats_awards || '35+', label: 'Sektör Ödülü' }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        {/* Veri kaynağı göstergesi */}
        <div className="mb-8 p-3 bg-primary-100 rounded-lg text-sm text-center">
          <span className="font-semibold">Stats Veri Kaynağı:</span> {siteSettings ? '🟢 Supabase' : '🔴 Statik'}
        </div>
        
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