import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../services/siteSettingsService';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadBlogPost = async () => {
      try {
                setLoading(true);

        const blogPostsData = await getBlogPosts();
        const foundPost = blogPostsData.find(p => p.id === id);

        setPost(foundPost || null);
      } catch (error) {
        console.error('❌ BlogDetail: Blog post yüklenirken hata:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBlogPost();
    }
  }, [id]);



  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-center text-dark-500">Blog yazısı bulunamadı</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-500 bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <span className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full mb-4">
              {typeof post.category === 'string' ? post.category : post.category?.name || 'Genel'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-light-300">
              <span>{new Date(post.created_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span>•</span>
              <span>Kanduras Medya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl text-dark-300 mb-8">{post.excerpt || post.content.substring(0, 200) + '...'}</p>
            <h2 className="text-2xl font-bold mb-4">Giriş</h2>
            <p>
              Dijital pazarlama dünyası sürekli değişiyor ve gelişiyor. Bu yazıda, {(typeof post.category === 'string' ? post.category : post.category?.name || 'Genel').toLowerCase()} 
              alanındaki en güncel stratejileri ve başarılı olmanız için gereken ipuçlarını paylaşacağız.
            </p>
            <h2 className="text-2xl font-bold mb-4">Neden Önemli?</h2>
            <p>
              Günümüzde işletmeler için {(typeof post.category === 'string' ? post.category : post.category?.name || 'Genel').toLowerCase()} stratejileri, başarılı bir dijital varlık
              için vazgeçilmez bir unsur haline geldi. Doğru stratejilerle hedef kitlenize ulaşmak ve
              onlarla etkili iletişim kurmak her zamankinden daha önemli.
            </p>
            <h2 className="text-2xl font-bold mb-4">Öneriler ve Stratejiler</h2>
            <ul>
              <li>Hedef kitlenizi iyi tanıyın ve analiz edin</li>
              <li>Güncel trendleri takip edin ve uyum sağlayın</li>
              <li>Veriye dayalı kararlar alın</li>
              <li>Sürekli test edin ve optimize edin</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;