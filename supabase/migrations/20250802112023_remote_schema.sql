create table "public"."analytics" (
    "id" uuid not null default gen_random_uuid(),
    "page" character varying(255) not null,
    "visitor_ip" inet,
    "user_agent" text,
    "referrer" text,
    "created_at" timestamp with time zone default now()
);


alter table "public"."analytics" enable row level security;

create table "public"."blog_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(100) not null,
    "slug" character varying(100) not null,
    "description" text,
    "color" character varying(7) default '#3B82F6'::character varying,
    "icon" character varying(50),
    "is_active" boolean default true,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."blog_categories" enable row level security;

create table "public"."blog_posts" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "content" text not null,
    "excerpt" text,
    "image_url" text,
    "category" character varying(100) not null,
    "published" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "category_id" uuid
);


alter table "public"."blog_posts" enable row level security;

create table "public"."contacts" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying(255) not null,
    "email" character varying(255) not null,
    "phone" character varying(50) not null,
    "subject" character varying(255) not null,
    "message" text not null,
    "status" character varying(20) default 'new'::character varying,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."contacts" enable row level security;

create table "public"."conversions" (
    "id" uuid not null default gen_random_uuid(),
    "type" character varying(50) not null,
    "source" character varying(255),
    "visitor_ip" inet,
    "session_id" character varying(255),
    "created_at" timestamp with time zone default now()
);


alter table "public"."conversions" enable row level security;

create table "public"."newsletter_subscribers" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying(255) not null,
    "subscribed_at" timestamp with time zone default now(),
    "status" character varying(20) default 'active'::character varying,
    "created_at" timestamp with time zone default now()
);


create table "public"."page_views" (
    "id" uuid not null default gen_random_uuid(),
    "page" character varying(255) not null,
    "views_count" integer default 1,
    "unique_visitors" integer default 1,
    "date" date default CURRENT_DATE,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."page_views" enable row level security;

create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "title" character varying(255) not null,
    "description" text not null,
    "image_url" text,
    "category" character varying(100) not null,
    "client" character varying(255),
    "completed_at" date,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "completion_date" date,
    "technologies" text,
    "project_url" text,
    "github_url" text,
    "is_featured" boolean default false,
    "sort_order" integer default 0
);


create table "public"."services" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text not null,
    "icon" text not null default 'Megaphone'::text,
    "sort_order" integer default 0,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "image_url" text default ''::text,
    "features" text[] default '{}'::text[]
);


alter table "public"."services" enable row level security;

create table "public"."site_settings" (
    "id" uuid not null default gen_random_uuid(),
    "hero_title" text not null default 'Kanduras Medya ile Dijital Potansiyelinizi Keşfedin'::text,
    "hero_subtitle" text not null default 'Yapay zeka destekli stratejilerle markanızı zirveye taşıyoruz.'::text,
    "hero_cta_offer" text not null default 'Ücretsiz Teklif Al'::text,
    "hero_cta_services" text not null default 'Hizmetlerimiz'::text,
    "about_title" text not null default 'Kanduras Medya Hakkında'::text,
    "about_subtitle" text not null default 'Pazarlama dünyasında 10 yılı aşkın deneyime sahip ekibimizle fark yaratıyoruz.'::text,
    "about_desc" text not null default 'Kanduras Medya olarak, işletmenizin dijital dönüşümünü stratejik bir bakış açısıyla ele alıyoruz. Her iş ortağımız için yenilikçi yaklaşımlar geliştiriyor, markanızın dijital dünyada güçlü bir konumda olmasını sağlıyoruz.'::text,
    "stats_experience" text not null default '10+'::text,
    "stats_clients" text not null default '150+'::text,
    "stats_projects" text not null default '450+'::text,
    "stats_awards" text not null default '35+'::text,
    "contact_address" text not null default 'İstasyon Yolu Sk. No: 3/1, Maltepe, İstanbul'::text,
    "contact_phone1" text not null default '+90 850 441 75 49'::text,
    "contact_phone2" text default '+90 538 587 39 84'::text,
    "contact_email" text not null default 'bilgi@kandurasmedya.com'::text,
    "contact_support_email" text not null default 'destek@kandurasmedya.com'::text,
    "footer_desc" text not null default 'Dijital dünyada markanızı ileriye taşıyan, yaratıcı ve stratejik pazarlama çözümleri.'::text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "hero_cards" jsonb default '[{"desc": "YZ tabanlı optimizasyon yöntemleriyle arama motorlarında öne çıkın.", "title": "Yapay Zeka & SEO"}, {"desc": "Hedef kitlenize ulaşan yenilikçi reklam kampanyalarıyla fark yaratın.", "title": "Dijital Reklamcılık"}, {"desc": "Marka bilinirliğinizi artıran etkili sosyal medya stratejileriyle öne çıkın.", "title": "Sosyal Medya Yönetimi"}]'::jsonb,
    "services_title" character varying(255) default 'Hizmetlerimiz'::character varying,
    "services_subtitle" text default 'İşletmenize değer katacak, pazarlama süreçlerinizi güçlendirecek çözümler sunuyoruz.'::text,
    "services_list" jsonb default '[{"title": "Sosyal Medya Yönetimi", "description": "Markanız için özgün sosyal medya planları geliştiriyor, içerik üretimi ve topluluk etkileşimi sağlıyoruz."}, {"title": "SEO Optimizasyonu", "description": "Web sitenizi arama motorlarında üst sıralara taşıyacak, ziyaretçi ve dönüşüm odaklı iyileştirmeler yapıyoruz."}, {"title": "İçerik Üreticileri İçin", "description": "Yapay zeka destekli iş akışlarıyla içerik üretimi ve yönetimini kolaylaştırıyoruz. Analiz ve raporlama için gelişmiş olanaklar sunuyoruz."}, {"title": "Google Ads Yönetimi", "description": "Etkili reklam stratejileriyle potansiyel müşterilerinize ulaşın, yatırım getirinizi artırın."}, {"title": "Web Tasarım & Geliştirme", "description": "Modern, kullanıcı dostu ve mobil uyumlu web siteleriyle dijital varlığınızı güçlendiriyoruz."}, {"title": "E-posta Pazarlaması", "description": "Kişiselleştirilmiş e-posta kampanyalarıyla müşterilerinizle iletişimi güçlendiriyor, satışlarınızı yükseltiyoruz."}, {"title": "Uygulama Geliştirme", "description": "Mobil ve web uygulamalarıyla dijital çözümler sunuyor, kullanıcı deneyimini ön planda tutarak yenilikçi projeler geliştiriyoruz."}]'::jsonb,
    "services_cta" character varying(255) default 'Tüm Hizmetlerimizi Keşfedin'::character varying,
    "about_achievements" jsonb default '["10+ Yıllık Sektör Tecrübesi", "150+ Memnun İş Ortağı", "Ödüllü Pazarlama Yaklaşımları", "Yatırım Getirisi Odaklı Çalışma"]'::jsonb,
    "about_cta" character varying(255) default 'Daha Fazla Bilgi'::character varying,
    "portfolio_title" character varying(255) default 'Son Projelerimiz'::character varying,
    "portfolio_subtitle" text default 'Müşterilerimiz için hayata geçirdiğimiz başarı hikayelerinden bazıları:'::text,
    "portfolio_cta" character varying(255) default 'Tüm Projelerimizi Görün'::character varying,
    "testimonials_title" character varying(255) default 'Müşterilerimiz Ne Diyor'::character varying,
    "testimonials_subtitle" text default 'Başarı hikayelerimiz ve müşteri memnuniyetimiz:'::text,
    "testimonials_list" jsonb default '[{"name": "Ahmet Yılmaz", "rating": 5, "company": "TechStart", "content": "Kanduras Medya ile çalışmaya başladıktan sonra web sitemizin trafiği %300 arttı. Harika bir ekip!"}, {"name": "Ayşe Kaya", "rating": 5, "company": "GreenFood", "content": "Sosyal medya kampanyalarımızla satışlarımız %150 arttı. Çok teşekkürler!"}, {"name": "Mehmet Demir", "rating": 5, "company": "InnovateLab", "content": "SEO optimizasyonu sonrası Google sıralamalarımızda büyük iyileşme gördük."}]'::jsonb,
    "cta_title" character varying(255) default 'Dijital Dönüşümünüzü Başlatın'::character varying,
    "cta_subtitle" text default 'Markanızı dijital dünyada güçlendirmek için bizimle iletişime geçin.'::text,
    "cta_button_text" character varying(255) default 'Ücretsiz Danışmanlık Alın'::character varying,
    "blog_title" character varying(255) default 'Blog'::character varying,
    "blog_subtitle" text default 'Dijital pazarlama dünyasından en güncel bilgiler ve stratejiler'::text,
    "blog_posts" jsonb default '[{"id": "social-media-strategies-2025", "date": "15 Mayıs 2025", "image": "https://images.pexels.com/photos/4126684/pexels-photo-4126684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "title": "2025 Yılında Sosyal Medya Pazarlama Stratejileri", "author": "Ayşe Demir", "content": "Detaylı blog içeriği buraya gelecek...", "excerpt": "Dijital dünyada hızla değişen trendler ve algoritmalar, sosyal medya pazarlama stratejilerinizi güncel tutmanızı gerektiriyor. 2025 yılı için öne çıkan sosyal medya trendlerini ve başarılı stratejileri inceliyoruz.", "category": "Sosyal Medya"}, {"id": "seo-optimization-guide", "date": "10 Mayıs 2025", "image": "https://images.pexels.com/photos/6177662/pexels-photo-6177662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "title": "Kapsamlı SEO Optimizasyon Rehberi", "author": "Mehmet Yılmaz", "content": "Detaylı blog içeriği buraya gelecek...", "excerpt": "Web sitenizin arama motorlarında üst sıralarda yer alması için uygulamanız gereken SEO teknikleri ve stratejileri. Teknik SEO, içerik optimizasyonu ve link building stratejilerini detaylı olarak inceliyoruz.", "category": "SEO"}, {"id": "content-marketing-success", "date": "5 Mayıs 2025", "image": "https://images.pexels.com/photos/6177545/pexels-photo-6177545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "title": "İçerik Pazarlamasında Başarı İçin 10 İpucu", "author": "Zeynep Şahin", "content": "Detaylı blog içeriği buraya gelecek...", "excerpt": "Etkili bir içerik pazarlaması stratejisi için uygulamanız gereken ipuçları ve dikkat etmeniz gereken noktalar. Hedef kitlenizle bağ kuran, değer sunan içerikler nasıl oluşturulur?", "category": "İçerik"}]'::jsonb,
    "portfolio_projects" jsonb default '[{"id": "apple-store", "image": "https://images.unsplash.com/photo-1654593405070-d7b7eec8476a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "title": "Apple Deposu Sosyal Medya Kampanyası", "results": ["Sosyal medya takipçi sayısında %150 artış", "Etkileşim oranlarında %75 iyileşme", "Kampanya dönemi boyunca satışlarda %35 artış", "Marka bilinirliğinde ölçülebilir gelişme"], "category": "Sosyal Medya", "description": "Apple ürünleri satan mağaza için geliştirdiğimiz yapay zeka destekli sosyal medya stratejisi ile marka bilinirliğini artırdık ve hedef kitleyle güçlü bir bağ kurduk. Instagram ve Facebook üzerinden yürüttüğümüz kampanyalarla, etkileşim oranlarında belirgin bir artış sağladık."}, {"id": "pro-tech", "image": "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "title": "Pro-Tech SEO Optimizasyonu", "results": ["Hedef anahtar kelimelerde ilk sayfaya yükselme", "Organik trafikte %200 artış", "Dönüşüm oranlarında %45 iyileşme", "Sitede kalma süresinde %30 artış"], "category": "SEO", "description": "Teknoloji şirketi için YZ Destekli kapsamlı bir SEO stratejisi geliştirerek, arama motorlarında görünürlüklerini artırdık. Teknik SEO iyileştirmeleri, içerik optimizasyonu ve link building çalışmaları ile organik trafiği önemli ölçüde yükselttik."}, {"id": "skinDoctorApp", "image": "https://news.ki.se/sites/nyheter/files/styles/article_full_width/public/qbank/Dermalyser-InAction6_custom20240320102447.webp", "title": "Cilt Doktoru Uygulaması", "results": ["ROAS (Reklam Harcaması Getirisi) %400", "Yeni müşteri kazanımında %80 artış", "Online sipariş sayısında %120 artış", "Marka bilinirliğinde %60 artış"], "category": "Uygulama", "description": "Yapay zeka destekli cilt doktoru uygulaması geliştirdik. Uygulama içerisinde cilt analizi yapılabilir ve cilt durumu hakkında bilgi alınabilir."}]'::jsonb,
    "services_details" jsonb default '[{"icon": "Megaphone", "title": "Sosyal Medya Yönetimi", "features": ["YZ Destekli İçerik Üretimi ve Planlama", "Otomatik Topluluk Yönetimi", "Hedefli Sosyal Medya Reklamları", "Performans Analizi ve Raporlama", "Rakip Analizi ve Trend Takibi"], "description": "Markanızın sosyal medya varlığını yapay zeka destekli stratejik bir yaklaşımla yönetiyoruz. İçerik planlaması, topluluk yönetimi ve reklam kampanyaları ile hedef kitlenizle etkileşimi artırıyoruz."}, {"icon": "Search", "title": "SEO Optimizasyonu", "features": ["YZ Destekli Anahtar Kelime Analizi", "Teknik SEO İyileştirmeleri", "Semantik İçerik Optimizasyonu", "Akıllı Link Building Stratejileri", "Yerel SEO Çalışmaları"], "description": "Yapay zeka algoritmalarını kullanarak web sitenizin arama motorlarında üst sıralarda yer alması için kapsamlı SEO stratejileri geliştiriyoruz. Teknik SEO, içerik optimizasyonu ve link building çalışmaları ile organik trafiğinizi artırıyoruz."}, {"icon": "LineChart", "title": "İçerik Üreticileri İçin", "features": ["YZ Destekli İçerik Üretimi", "SEO Odaklı İçerik Stratejisi", "Görsel İçerik Tasarımı", "Video İçerik Üretimi", "İçerik Takvimi Yönetimi"], "description": "Yapay zeka teknolojileri ile hedef kitlenize özel, değer sunan içerikler üretiyoruz. Blog yazıları, infografikler ve videolar ile markanızın otoritesini güçlendiriyoruz."}, {"icon": "BarChart", "title": "Google Ads Yönetimi", "features": ["YZ Destekli Anahtar Kelime Analizi", "Akıllı Teklif Stratejileri", "Performans Optimizasyonu", "ROI Odaklı Kampanya Yönetimi", "Detaylı Raporlama ve Analiz"], "description": "Yapay zeka destekli Google Ads kampanyaları ile hedef kitlenize ulaşın. Akıllı teklif stratejileri, performans optimizasyonu ve ROI odaklı yaklaşımlarla reklam bütçenizi verimli kullanın."}, {"icon": "Globe", "title": "Web Tasarım & Geliştirme", "features": ["Responsive Web Tasarım", "Kullanıcı Deneyimi (UX) Optimizasyonu", "SEO Uyumlu Kodlama", "Hızlı Yükleme Süreleri", "Güvenlik ve Performans Optimizasyonu"], "description": "Modern, kullanıcı dostu ve mobil uyumlu web siteleri geliştiriyoruz. Yapay zeka destekli tasarım araçları ile kullanıcı deneyimini ön planda tutarak, dönüşüm odaklı web siteleri oluşturuyoruz."}, {"icon": "Mail", "title": "E-posta Pazarlaması", "features": ["YZ Destekli Segmentasyon", "Otomatik E-posta Kampanyaları", "Kişiselleştirilmiş İçerik", "A/B Test Optimizasyonu", "Performans Analizi ve Raporlama"], "description": "Kişiselleştirilmiş e-posta kampanyaları ile müşterilerinizle güçlü bağlar kurun. Yapay zeka destekli segmentasyon ve otomasyon ile e-posta pazarlamanızı bir üst seviyeye taşıyın."}, {"icon": "Smartphone", "title": "Uygulama Geliştirme", "features": ["YZ Destekli UX/UI Tasarım", "Cross-Platform Geliştirme", "Yapay Zeka Entegrasyonu", "Performans Optimizasyonu", "App Store Optimizasyonu (ASO)"], "description": "Yapay zeka destekli mobil uygulama geliştirme hizmetleri sunuyoruz. iOS ve Android platformları için kullanıcı dostu, performanslı ve güvenli uygulamalar geliştiriyoruz."}]'::jsonb
);


alter table "public"."site_settings" enable row level security;

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying(255) not null,
    "password_hash" character varying(255) not null,
    "role" character varying(20) default 'admin'::character varying,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX analytics_pkey ON public.analytics USING btree (id);

CREATE UNIQUE INDEX blog_categories_name_key ON public.blog_categories USING btree (name);

CREATE UNIQUE INDEX blog_categories_pkey ON public.blog_categories USING btree (id);

CREATE UNIQUE INDEX blog_categories_slug_key ON public.blog_categories USING btree (slug);

CREATE UNIQUE INDEX blog_posts_pkey ON public.blog_posts USING btree (id);

CREATE UNIQUE INDEX contacts_pkey ON public.contacts USING btree (id);

CREATE UNIQUE INDEX conversions_pkey ON public.conversions USING btree (id);

CREATE INDEX idx_analytics_created_at ON public.analytics USING btree (created_at DESC);

CREATE INDEX idx_analytics_page ON public.analytics USING btree (page);

CREATE INDEX idx_blog_posts_category ON public.blog_posts USING btree (category);

CREATE INDEX idx_blog_posts_published ON public.blog_posts USING btree (published);

CREATE INDEX idx_contacts_created_at ON public.contacts USING btree (created_at DESC);

CREATE INDEX idx_contacts_status ON public.contacts USING btree (status);

CREATE INDEX idx_projects_category ON public.projects USING btree (category);

CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers USING btree (email);

CREATE UNIQUE INDEX newsletter_subscribers_pkey ON public.newsletter_subscribers USING btree (id);

CREATE UNIQUE INDEX page_views_page_date_key ON public.page_views USING btree (page, date);

CREATE UNIQUE INDEX page_views_pkey ON public.page_views USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX services_pkey ON public.services USING btree (id);

CREATE UNIQUE INDEX site_settings_pkey ON public.site_settings USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."analytics" add constraint "analytics_pkey" PRIMARY KEY using index "analytics_pkey";

alter table "public"."blog_categories" add constraint "blog_categories_pkey" PRIMARY KEY using index "blog_categories_pkey";

alter table "public"."blog_posts" add constraint "blog_posts_pkey" PRIMARY KEY using index "blog_posts_pkey";

alter table "public"."contacts" add constraint "contacts_pkey" PRIMARY KEY using index "contacts_pkey";

alter table "public"."conversions" add constraint "conversions_pkey" PRIMARY KEY using index "conversions_pkey";

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_pkey" PRIMARY KEY using index "newsletter_subscribers_pkey";

alter table "public"."page_views" add constraint "page_views_pkey" PRIMARY KEY using index "page_views_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."services" add constraint "services_pkey" PRIMARY KEY using index "services_pkey";

alter table "public"."site_settings" add constraint "site_settings_pkey" PRIMARY KEY using index "site_settings_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."blog_categories" add constraint "blog_categories_name_key" UNIQUE using index "blog_categories_name_key";

alter table "public"."blog_categories" add constraint "blog_categories_slug_key" UNIQUE using index "blog_categories_slug_key";

alter table "public"."blog_posts" add constraint "blog_posts_category_id_fkey" FOREIGN KEY (category_id) REFERENCES blog_categories(id) not valid;

alter table "public"."blog_posts" validate constraint "blog_posts_category_id_fkey";

alter table "public"."contacts" add constraint "contacts_status_check" CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'read'::character varying, 'replied'::character varying])::text[]))) not valid;

alter table "public"."contacts" validate constraint "contacts_status_check";

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_email_key" UNIQUE using index "newsletter_subscribers_email_key";

alter table "public"."newsletter_subscribers" add constraint "newsletter_subscribers_status_check" CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'unsubscribed'::character varying])::text[]))) not valid;

alter table "public"."newsletter_subscribers" validate constraint "newsletter_subscribers_status_check";

alter table "public"."page_views" add constraint "page_views_page_date_key" UNIQUE using index "page_views_page_date_key";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_role_check" CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'editor'::character varying])::text[]))) not valid;

alter table "public"."users" validate constraint "users_role_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_conversion_rate()
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE
  total_views INTEGER;
  total_conversions INTEGER;
  conversion_rate DECIMAL;
BEGIN
  -- Toplam sayfa görüntüleme
  SELECT get_total_page_views() INTO total_views;
  
  -- Toplam dönüşüm
  SELECT COUNT(*) INTO total_conversions
  FROM conversions;
  
  -- Dönüşüm oranını hesapla
  IF total_views > 0 THEN
    conversion_rate := (total_conversions::DECIMAL / total_views::DECIMAL) * 100;
  ELSE
    conversion_rate := 0;
  END IF;
  
  RETURN ROUND(conversion_rate, 2);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_total_page_views()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  total_views INTEGER;
BEGIN
  SELECT COALESCE(SUM(views_count), 0) INTO total_views
  FROM page_views;
  
  RETURN total_views;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_page_view(page_name character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO page_views (page, views_count, unique_visitors)
  VALUES (page_name, 1, 1)
  ON CONFLICT (page, date)
  DO UPDATE SET 
    views_count = page_views.views_count + 1,
    updated_at = NOW();
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_site_settings_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."analytics" to "anon";

grant insert on table "public"."analytics" to "anon";

grant references on table "public"."analytics" to "anon";

grant select on table "public"."analytics" to "anon";

grant trigger on table "public"."analytics" to "anon";

grant truncate on table "public"."analytics" to "anon";

grant update on table "public"."analytics" to "anon";

grant delete on table "public"."analytics" to "authenticated";

grant insert on table "public"."analytics" to "authenticated";

grant references on table "public"."analytics" to "authenticated";

grant select on table "public"."analytics" to "authenticated";

grant trigger on table "public"."analytics" to "authenticated";

grant truncate on table "public"."analytics" to "authenticated";

grant update on table "public"."analytics" to "authenticated";

grant delete on table "public"."analytics" to "service_role";

grant insert on table "public"."analytics" to "service_role";

grant references on table "public"."analytics" to "service_role";

grant select on table "public"."analytics" to "service_role";

grant trigger on table "public"."analytics" to "service_role";

grant truncate on table "public"."analytics" to "service_role";

grant update on table "public"."analytics" to "service_role";

grant delete on table "public"."blog_categories" to "anon";

grant insert on table "public"."blog_categories" to "anon";

grant references on table "public"."blog_categories" to "anon";

grant select on table "public"."blog_categories" to "anon";

grant trigger on table "public"."blog_categories" to "anon";

grant truncate on table "public"."blog_categories" to "anon";

grant update on table "public"."blog_categories" to "anon";

grant delete on table "public"."blog_categories" to "authenticated";

grant insert on table "public"."blog_categories" to "authenticated";

grant references on table "public"."blog_categories" to "authenticated";

grant select on table "public"."blog_categories" to "authenticated";

grant trigger on table "public"."blog_categories" to "authenticated";

grant truncate on table "public"."blog_categories" to "authenticated";

grant update on table "public"."blog_categories" to "authenticated";

grant delete on table "public"."blog_categories" to "service_role";

grant insert on table "public"."blog_categories" to "service_role";

grant references on table "public"."blog_categories" to "service_role";

grant select on table "public"."blog_categories" to "service_role";

grant trigger on table "public"."blog_categories" to "service_role";

grant truncate on table "public"."blog_categories" to "service_role";

grant update on table "public"."blog_categories" to "service_role";

grant delete on table "public"."blog_posts" to "anon";

grant insert on table "public"."blog_posts" to "anon";

grant references on table "public"."blog_posts" to "anon";

grant select on table "public"."blog_posts" to "anon";

grant trigger on table "public"."blog_posts" to "anon";

grant truncate on table "public"."blog_posts" to "anon";

grant update on table "public"."blog_posts" to "anon";

grant delete on table "public"."blog_posts" to "authenticated";

grant insert on table "public"."blog_posts" to "authenticated";

grant references on table "public"."blog_posts" to "authenticated";

grant select on table "public"."blog_posts" to "authenticated";

grant trigger on table "public"."blog_posts" to "authenticated";

grant truncate on table "public"."blog_posts" to "authenticated";

grant update on table "public"."blog_posts" to "authenticated";

grant delete on table "public"."blog_posts" to "service_role";

grant insert on table "public"."blog_posts" to "service_role";

grant references on table "public"."blog_posts" to "service_role";

grant select on table "public"."blog_posts" to "service_role";

grant trigger on table "public"."blog_posts" to "service_role";

grant truncate on table "public"."blog_posts" to "service_role";

grant update on table "public"."blog_posts" to "service_role";

grant delete on table "public"."contacts" to "anon";

grant insert on table "public"."contacts" to "anon";

grant references on table "public"."contacts" to "anon";

grant select on table "public"."contacts" to "anon";

grant trigger on table "public"."contacts" to "anon";

grant truncate on table "public"."contacts" to "anon";

grant update on table "public"."contacts" to "anon";

grant delete on table "public"."contacts" to "authenticated";

grant insert on table "public"."contacts" to "authenticated";

grant references on table "public"."contacts" to "authenticated";

grant select on table "public"."contacts" to "authenticated";

grant trigger on table "public"."contacts" to "authenticated";

grant truncate on table "public"."contacts" to "authenticated";

grant update on table "public"."contacts" to "authenticated";

grant delete on table "public"."contacts" to "service_role";

grant insert on table "public"."contacts" to "service_role";

grant references on table "public"."contacts" to "service_role";

grant select on table "public"."contacts" to "service_role";

grant trigger on table "public"."contacts" to "service_role";

grant truncate on table "public"."contacts" to "service_role";

grant update on table "public"."contacts" to "service_role";

grant delete on table "public"."conversions" to "anon";

grant insert on table "public"."conversions" to "anon";

grant references on table "public"."conversions" to "anon";

grant select on table "public"."conversions" to "anon";

grant trigger on table "public"."conversions" to "anon";

grant truncate on table "public"."conversions" to "anon";

grant update on table "public"."conversions" to "anon";

grant delete on table "public"."conversions" to "authenticated";

grant insert on table "public"."conversions" to "authenticated";

grant references on table "public"."conversions" to "authenticated";

grant select on table "public"."conversions" to "authenticated";

grant trigger on table "public"."conversions" to "authenticated";

grant truncate on table "public"."conversions" to "authenticated";

grant update on table "public"."conversions" to "authenticated";

grant delete on table "public"."conversions" to "service_role";

grant insert on table "public"."conversions" to "service_role";

grant references on table "public"."conversions" to "service_role";

grant select on table "public"."conversions" to "service_role";

grant trigger on table "public"."conversions" to "service_role";

grant truncate on table "public"."conversions" to "service_role";

grant update on table "public"."conversions" to "service_role";

grant delete on table "public"."newsletter_subscribers" to "anon";

grant insert on table "public"."newsletter_subscribers" to "anon";

grant references on table "public"."newsletter_subscribers" to "anon";

grant select on table "public"."newsletter_subscribers" to "anon";

grant trigger on table "public"."newsletter_subscribers" to "anon";

grant truncate on table "public"."newsletter_subscribers" to "anon";

grant update on table "public"."newsletter_subscribers" to "anon";

grant delete on table "public"."newsletter_subscribers" to "authenticated";

grant insert on table "public"."newsletter_subscribers" to "authenticated";

grant references on table "public"."newsletter_subscribers" to "authenticated";

grant select on table "public"."newsletter_subscribers" to "authenticated";

grant trigger on table "public"."newsletter_subscribers" to "authenticated";

grant truncate on table "public"."newsletter_subscribers" to "authenticated";

grant update on table "public"."newsletter_subscribers" to "authenticated";

grant delete on table "public"."newsletter_subscribers" to "service_role";

grant insert on table "public"."newsletter_subscribers" to "service_role";

grant references on table "public"."newsletter_subscribers" to "service_role";

grant select on table "public"."newsletter_subscribers" to "service_role";

grant trigger on table "public"."newsletter_subscribers" to "service_role";

grant truncate on table "public"."newsletter_subscribers" to "service_role";

grant update on table "public"."newsletter_subscribers" to "service_role";

grant delete on table "public"."page_views" to "anon";

grant insert on table "public"."page_views" to "anon";

grant references on table "public"."page_views" to "anon";

grant select on table "public"."page_views" to "anon";

grant trigger on table "public"."page_views" to "anon";

grant truncate on table "public"."page_views" to "anon";

grant update on table "public"."page_views" to "anon";

grant delete on table "public"."page_views" to "authenticated";

grant insert on table "public"."page_views" to "authenticated";

grant references on table "public"."page_views" to "authenticated";

grant select on table "public"."page_views" to "authenticated";

grant trigger on table "public"."page_views" to "authenticated";

grant truncate on table "public"."page_views" to "authenticated";

grant update on table "public"."page_views" to "authenticated";

grant delete on table "public"."page_views" to "service_role";

grant insert on table "public"."page_views" to "service_role";

grant references on table "public"."page_views" to "service_role";

grant select on table "public"."page_views" to "service_role";

grant trigger on table "public"."page_views" to "service_role";

grant truncate on table "public"."page_views" to "service_role";

grant update on table "public"."page_views" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."services" to "anon";

grant insert on table "public"."services" to "anon";

grant references on table "public"."services" to "anon";

grant select on table "public"."services" to "anon";

grant trigger on table "public"."services" to "anon";

grant truncate on table "public"."services" to "anon";

grant update on table "public"."services" to "anon";

grant delete on table "public"."services" to "authenticated";

grant insert on table "public"."services" to "authenticated";

grant references on table "public"."services" to "authenticated";

grant select on table "public"."services" to "authenticated";

grant trigger on table "public"."services" to "authenticated";

grant truncate on table "public"."services" to "authenticated";

grant update on table "public"."services" to "authenticated";

grant delete on table "public"."services" to "service_role";

grant insert on table "public"."services" to "service_role";

grant references on table "public"."services" to "service_role";

grant select on table "public"."services" to "service_role";

grant trigger on table "public"."services" to "service_role";

grant truncate on table "public"."services" to "service_role";

grant update on table "public"."services" to "service_role";

grant delete on table "public"."site_settings" to "anon";

grant insert on table "public"."site_settings" to "anon";

grant references on table "public"."site_settings" to "anon";

grant select on table "public"."site_settings" to "anon";

grant trigger on table "public"."site_settings" to "anon";

grant truncate on table "public"."site_settings" to "anon";

grant update on table "public"."site_settings" to "anon";

grant delete on table "public"."site_settings" to "authenticated";

grant insert on table "public"."site_settings" to "authenticated";

grant references on table "public"."site_settings" to "authenticated";

grant select on table "public"."site_settings" to "authenticated";

grant trigger on table "public"."site_settings" to "authenticated";

grant truncate on table "public"."site_settings" to "authenticated";

grant update on table "public"."site_settings" to "authenticated";

grant delete on table "public"."site_settings" to "service_role";

grant insert on table "public"."site_settings" to "service_role";

grant references on table "public"."site_settings" to "service_role";

grant select on table "public"."site_settings" to "service_role";

grant trigger on table "public"."site_settings" to "service_role";

grant truncate on table "public"."site_settings" to "service_role";

grant update on table "public"."site_settings" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Analytics are insertable by everyone"
on "public"."analytics"
as permissive
for insert
to public
with check (true);


create policy "Analytics are viewable by authenticated users"
on "public"."analytics"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Blog categories are manageable by authenticated users"
on "public"."blog_categories"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "Blog categories are viewable by everyone"
on "public"."blog_categories"
as permissive
for select
to public
using (true);


create policy "Blog posts are deletable by authenticated users"
on "public"."blog_posts"
as permissive
for delete
to public
using (true);


create policy "Blog posts are insertable by authenticated users"
on "public"."blog_posts"
as permissive
for insert
to public
with check (true);


create policy "Blog posts are updatable by authenticated users"
on "public"."blog_posts"
as permissive
for update
to public
using (true);


create policy "Blog posts are viewable by everyone"
on "public"."blog_posts"
as permissive
for select
to public
using ((published = true));


create policy "Blog posts can be updated with category by authenticated users"
on "public"."blog_posts"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Contacts are deletable by authenticated users"
on "public"."contacts"
as permissive
for delete
to public
using (true);


create policy "Contacts are insertable by everyone"
on "public"."contacts"
as permissive
for insert
to public
with check (true);


create policy "Contacts are updatable by authenticated users"
on "public"."contacts"
as permissive
for update
to public
using (true);


create policy "Contacts are viewable by everyone"
on "public"."contacts"
as permissive
for select
to public
using (true);


create policy "Conversions are insertable by everyone"
on "public"."conversions"
as permissive
for insert
to public
with check (true);


create policy "Conversions are viewable by authenticated users"
on "public"."conversions"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable delete for authenticated users"
on "public"."newsletter_subscribers"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable insert for all users"
on "public"."newsletter_subscribers"
as permissive
for insert
to public
with check (true);


create policy "Enable select for authenticated users"
on "public"."newsletter_subscribers"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable update for authenticated users"
on "public"."newsletter_subscribers"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Page views are insertable by everyone"
on "public"."page_views"
as permissive
for insert
to public
with check (true);


create policy "Page views are updatable by authenticated users"
on "public"."page_views"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Page views are viewable by authenticated users"
on "public"."page_views"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow anonymous read access to projects"
on "public"."projects"
as permissive
for select
to public
using (true);


create policy "Allow authenticated users full access to projects"
on "public"."projects"
as permissive
for all
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow service role full access to projects"
on "public"."projects"
as permissive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Enable delete for authenticated users only"
on "public"."projects"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable insert for authenticated users only"
on "public"."projects"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Enable read access for all users"
on "public"."projects"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."projects"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable delete for authenticated users only"
on "public"."services"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Enable insert for authenticated users only"
on "public"."services"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Enable read access for all users"
on "public"."services"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."services"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow authenticated users to insert"
on "public"."site_settings"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow authenticated users to update"
on "public"."site_settings"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow public read access"
on "public"."site_settings"
as permissive
for select
to public
using (true);


create policy "Enable delete for all users"
on "public"."site_settings"
as permissive
for delete
to public
using (true);


create policy "Enable insert for all users"
on "public"."site_settings"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."site_settings"
as permissive
for select
to public
using (true);


create policy "Enable update for all users"
on "public"."site_settings"
as permissive
for update
to public
using (true)
with check (true);


create policy "Enable delete for all users"
on "public"."users"
as permissive
for delete
to public
using (true);


create policy "Enable insert for all users"
on "public"."users"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Enable update for all users"
on "public"."users"
as permissive
for update
to public
using (true)
with check (true);


CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON public.blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_site_settings_updated_at();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


