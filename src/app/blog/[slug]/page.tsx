import { getAllBlogArticles, getBlogArticleBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogHero from '@/components/section/blogPage/blogHero/blogHero';
import BlogContent from '@/components/section/blogPage/BlogContent/BlogContent';

// Генерируем статические параметры для SSG
export async function generateStaticParams() {
  const articles = getAllBlogArticles();
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Генерируем метаданные для SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Статья не найдена',
      description: 'Запрашиваемая статья не существует или была удалена',
    };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: ['Технологии люков'],
      images: article.img ? [
        {
          url: article.img,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.img ? [article.img] : undefined,
    },
    alternates: {
      canonical: `https://люки.рф/blog/${article.slug}`,
    },
  };
}

export default async function BlogArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const article = getBlogArticleBySlug(slug);
  
  if (!article) {
    notFound(); // покажет 404 страницу
  }
  
  return (
    <main  style={{background:'var(--temnyy-1)'}}>
      <BlogHero article={article} />
      <BlogContent content={article.content} />
      {/* <RelatedArticles 
        currentSlug={article.slug} 
        category={article.category}
        tags={article.tags}
      /> */}
      
      {/* JSON-LD разметка для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            image: article.img,
            datePublished: article.date,
            dateModified: article.updatedAt || article.date,
            author: {
              '@type': 'Organization',
              name: 'Технологии люков',
              url: 'https://люки.рф'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Технологии люков',
              logo: {
                '@type': 'ImageObject',
                url: 'https://люки.рф/logo.png'
              }
            },
            description: article.excerpt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://люки.рф/blog/${article.slug}`
            }
          })
        }}
      />
    </main>
  );
}