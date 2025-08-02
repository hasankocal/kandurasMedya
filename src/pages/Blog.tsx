import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import strings from '../content';
import { useSite } from '../context/SiteContext';
import { getBlogPosts, getBlogCategories, BlogPost, BlogCategory, subscribeToNewsletter } from '../services/siteSettingsService';

interface BlogPostDisplay {
  id: string;
  title: string;
  excerpt: string;
  category: string | { id: string; name: string; color: string; icon?: string };
  date: string;
  author: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPostDisplay;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const s = strings.blog;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 fade-in-section">
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-white text-primary-600 rounded-full">
            {typeof post.category === 'string' ? post.category : post.category?.name || 'Genel'}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center text-sm text-dark-300 mb-2">
          <span>{post.date}</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${post.id}`} className="hover:text-primary-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-dark-300 mb-4">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.id}`} 
          className="text-primary-600 font-medium inline-flex items-center hover:text-primary-700 transition-colors"
        >
          {s.readMore}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export const staticBlogPosts: BlogPostDisplay[] = [
  {
    id: "social-media-strategies-2025",
    title: "2025 Yılında Sosyal Medya Pazarlama Stratejileri",
    excerpt: "Dijital dünyada hızla değişen trendler ve algoritmalar, sosyal medya pazarlama stratejilerinizi güncel tutmanızı gerektiriyor. 2025 yılı için öne çıkan sosyal medya trendlerini ve başarılı stratejileri inceliyoruz.",
    category: "Sosyal Medya",
    date: "15 Mayıs 2025",
    author: "Ayşe Demir",
    image: "https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "seo-optimization-guide",
    title: "Kapsamlı SEO Optimizasyon Rehberi",
    excerpt: "Web sitenizin arama motorlarında üst sıralarda yer alması için uygulamanız gereken SEO teknikleri ve stratejileri. Teknik SEO, içerik optimizasyonu ve link building stratejilerini detaylı olarak inceliyoruz.",
    category: "SEO",
    date: "10 Mayıs 2025",
    author: "Mehmet Yılmaz",
    image: "https://images.pexels.com/photos/6177662/pexels-photo-6177662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "content-marketing-success",
    title: "İçerik Pazarlamasında Başarı İçin 10 İpucu",
    excerpt: "Etkili bir içerik pazarlaması stratejisi için uygulamanız gereken ipuçları ve dikkat etmeniz gereken noktalar. Hedef kitlenizle bağ kuran, değer sunan içerikler nasıl oluşturulur?",
    category: "İçerik",
    date: "5 Mayıs 2025",
    author: "Zeynep Şahin",
    image: "https://images.pexels.com/photos/6177545/pexels-photo-6177545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "google-ads-optimization",
    title: "Google Ads Kampanyalarınızı Optimize Etme Rehberi",
    excerpt: "Google Ads kampanyalarınızdan maksimum verim almanın yolları. Anahtar kelime seçimi, reklam metni optimizasyonu, hedefleme stratejileri ve daha fazlası bu kapsamlı rehberde.",
    category: "Google Ads",
    date: "1 Mayıs 2025",
    author: "Kerem Karay",
    image: "https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "email-marketing-trends",
    title: "2025 E-posta Pazarlama Trendleri ve En İyi Uygulamalar",
    excerpt: "E-posta pazarlamasının dijital pazarlama stratejilerindeki önemli rolü ve 2025 yılında öne çıkan trendler. Kişiselleştirme, otomasyon ve yapay zeka entegrasyonu ile e-posta kampanyalarınızı optimize edin.",
    category: "E-posta Pazarlaması",
    date: "28 Nisan 2025",
    author: "Ceren Uğurlu",
    image: "https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "web-design-2025",
    title: "2025 Web Tasarım Trendleri: Kullanıcı Deneyimi Odaklı Yaklaşımlar",
    excerpt: "Web tasarımında kullanıcı deneyimini ön planda tutan yeni trendler ve teknolojiler. Mobil-first tasarım, mikro etkileşimler ve performans optimizasyonu ile web sitenizi güncelleyin.",
    category: "Web Tasarım",
    date: "25 Nisan 2025",
    author: "Hasan Koçal",
    image: "https://images.pexels.com/photos/4126714/pexels-photo-4126714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Blog: React.FC = () => {
  const s = strings.blog;
  const { siteSettings } = useSite();
  const [filter, setFilter] = useState<string>('all');
  const [blogPosts, setBlogPosts] = useState<BlogPostDisplay[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterLoading, setNewsletterLoading] = useState<boolean>(false);
  const [newsletterMessage, setNewsletterMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Debug log
  
  
  // Dinamik veriler
  const blogTitle = siteSettings?.blog_title || s.title;
  const blogSubtitle = siteSettings?.blog_subtitle || s.subtitle;

  // Blog posts ve kategoriler yükleme
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Blog posts ve kategorileri paralel olarak yükle
        const [blogPostsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ]);

        // Blog posts verilerini dönüştür
        const transformedPosts: BlogPostDisplay[] = blogPostsData.map((post: BlogPost) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || post.content.substring(0, 150) + '...',
          category: post.category,
          date: new Date(post.created_at).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          author: 'Kanduras Medya',
          image: post.image_url || 'https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }));

        setBlogPosts(transformedPosts);
        setCategories(categoriesData);
      } catch (error) {
        console.error('❌ Blog page: Veriler yüklenirken hata:', error);
        // Hata durumunda statik blog posts kullan
        setBlogPosts(staticBlogPosts);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);



  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterMessage({ type: 'error', text: 'Lütfen e-posta adresinizi girin.' });
      return;
    }

    try {
      setNewsletterLoading(true);
      setNewsletterMessage(null);
      
      const result = await subscribeToNewsletter(newsletterEmail.trim());
      
      if (result.success) {
        setNewsletterMessage({ type: 'success', text: result.message });
        setNewsletterEmail('');
      } else {
        setNewsletterMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      console.error('❌ Blog page: Newsletter hatası:', error);
      setNewsletterMessage({ type: 'error', text: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Filter posts by category
  const filteredPosts = blogPosts.filter((post) => {
    const categoryName = typeof post.category === 'string' ? post.category : post.category?.name || '';
    return filter === 'all' || categoryName === filter;
  });

  return (
    <div>

      
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24 relative">
        <div className="absolute inset-0 bg-dark-500 opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blogTitle}</h1>
            <p className="text-xl text-light-300">
              {blogSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 fade-in-section">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {/* Tümü butonu */}
              <button
                className={`px-3 py-1.5 text-sm rounded-full ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-light-500 text-dark-300 hover:bg-light-600'
                } transition-colors`}
                onClick={() => setFilter('all')}
              >
                Tümü
              </button>
              
              {/* Dinamik kategoriler */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1.5 ${
                    filter === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-light-500 text-dark-300 hover:bg-light-600'
                  } transition-colors`}
                  onClick={() => setFilter(category.name)}
                >
                  <span className="text-base">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">{s.noResults}</h3>
              <p className="text-dark-300 mb-6">{s.noResultsDesc}</p>
              <Button variant="outline" onClick={() => setFilter('all')}>
                {s.showAll}
              </Button>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-20 bg-light-500 rounded-lg p-8 md:p-12 fade-in-section">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">{s.newsletterTitle}</h3>
              <p className="text-dark-300 mb-6">
                {s.newsletterDesc}
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder={s.newsletterPlaceholder}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-light-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={newsletterLoading}
                />
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={newsletterLoading}
                >
                  {newsletterLoading ? 'Abone Olunuyor...' : s.newsletterCta}
                </Button>
              </form>
              
              {/* Newsletter Message */}
              {newsletterMessage && (
                <div className={`mt-4 p-3 rounded-lg ${
                  newsletterMessage.type === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {newsletterMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;