import React from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Award, Target } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
  socials?: { icon: React.ReactNode; url: string }[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, image, socials }) => {
  return (
    <div className="text-center">
      <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-dark-300 mb-3">{position}</p>
      {socials && (
        <div className="flex justify-center space-x-3">
          {socials.map((social, index) => (
            <a 
              key={index}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-primary-600 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-primary-600 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-dark-300">{description}</p>
    </div>
  );
};

const About: React.FC = () => {
  const { siteSettings } = useSite();
  

  
  const team = [
    {
      name: "Kerem Karay",
      position: "Kurucu & CEO",
      image: "https://kandurasmedya.com/assets/kerem.jpg",
    },
    {
      name: "Ceren Uğurlu",
      position: "Yönetici Asistanı",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGakHEDzyuY5q9MRlNv-vaGDDSHQKzDzIcrQ&s",
    },
    {
      name: "Hasan Koçal",
      position: "Yazılım Geliştirici",
      image: "https://media.licdn.com/dms/image/v2/C4D03AQFFZIogoWR06g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1659624618585?e=2147483647&v=beta&t=_LChQ_anwLywkcPjpZ-kFYh-zol4A0_UtVUqj-CEKbQ",
    },
    {
      name: "Zeynep Şahin",
      position: "Sosyal Medya Yöneticisi",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  const values = [
    {
      title: "Müşteri Odaklılık",
      description: "Her müşterimizin benzersiz ihtiyaçlarını anlar, stratejilerimizi bu doğrultuda şekillendiririz.",
      icon: <Users size={32} />,
    },
    {
      title: "Yenilikçilik",
      description: "Dijital pazarlama dünyasındaki en son trendleri takip eder, yenilikçi stratejiler geliştiririz.",
      icon: <Briefcase size={32} />,
    },
    {
      title: "Mükemmellik",
      description: "Her projede en yüksek kaliteyi sunmayı ve müşterilerimizin beklentilerini aşmayı hedefleriz.",
      icon: <Award size={32} />,
    },
    {
      title: "Sonuç Odaklılık",
      description: "Müşterilerimizin işletmelerine gerçek değer katan, ölçülebilir sonuçlar elde etmek için çalışırız.",
      icon: <Target size={32} />,
    },
  ];

  return (
    <div>
      {/* Veri kaynağı göstergesi */}
      <div className="fixed top-20 right-4 z-50 p-3 bg-primary-100 rounded-lg text-sm shadow-lg">
        <span className="font-semibold">About Veri Kaynağı:</span> {siteSettings ? '🟢 Supabase' : '🔴 Statik'}
      </div>
      
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {siteSettings?.about_title || 'Hakkımızda'}
            </h1>
            <p className="text-xl text-gray-200">
              {siteSettings?.about_subtitle || 'Kanduras Medya olarak, markaların dijital dünyada güçlü bir şekilde var olmaları için stratejik pazarlama çözümleri sunuyoruz.'}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                  alt="Kanduras Medya Ofisi" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-500 rounded-lg -z-10"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary-100 rounded-lg -z-10"></div>
            </div>

            <div>
              <SectionHeading 
                title="Hikayemiz" 
                subtitle="Dijital pazarlamada fark yaratan yaklaşımımız"
              />

              <p className="text-dark-300 mb-6">
                {siteSettings?.about_desc || 'Kanduras Medya olarak, işletmenizin dijital dönüşümünü stratejik bir bakış açısıyla ele alıyoruz. Her iş ortağımız için yenilikçi yaklaşımlar geliştiriyor, markanızın dijital dünyada güçlü bir konumda olmasını sağlıyoruz.'}
              </p>

              <Link to="/contact">
                <Button variant="primary">
                  Bizimle İletişime Geçin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-light-500">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Değerlerimiz"
            subtitle="İşimizi yaparken bizi yönlendiren temel prensiplerimiz"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                title={value.title}
                description={value.description}
                icon={value.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Ekibimiz"
            subtitle="Uzman kadromuzla dijital pazarlama dünyasında fark yaratıyoruz"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Markanızı Beraber Büyütelim
            </h2>
            
            <p className="text-lg mb-8 text-light-300">
              Dijital pazarlama hedeflerinize ulaşmak için bizimle iletişime geçin. 
              Markanıza özel stratejiler geliştirmek için hazırız.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;