import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = 'Kanduras Medya - Dijital Pazarlama ve Web Tasarım Ajansı',
  description = 'Kanduras Medya ile dijital dünyada markanızı öne çıkarın. Web tasarım, dijital pazarlama, SEO, sosyal medya yönetimi ve yapay zeka destekli çözümler.',
  keywords = 'dijital pazarlama, web tasarım, SEO, sosyal medya, yapay zeka, İstanbul, Türkiye',
  image = '/og-image.jpg',
  url = 'https://kandurasmedya.com',
  type = 'website',
  author = 'Kanduras Medya',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('Kanduras Medya') ? title : `${title} - Kanduras Medya`;
  const fullUrl = url.startsWith('http') ? url : `https://kandurasmedya.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://kandurasmedya.com${image}`;

  return (
    <Helmet>
      {/* Temel Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="tr" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Kanduras Medya" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@kandurasmedya" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Kanduras Medya",
          "url": "https://kandurasmedya.com",
          "logo": "https://kandurasmedya.com/logo.png",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "İstanbul",
            "addressCountry": "TR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-538-587-39-84",
            "contactType": "customer service",
            "availableLanguage": "Turkish"
          },
          "sameAs": [
            "https://www.facebook.com/kandurasmedya",
            "https://www.instagram.com/kandurasmedya",
            "https://www.linkedin.com/company/kandurasmedya"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default MetaTags; 