import { BlogArticle, BlogCardData } from '@/types/blog';

// Кэширование
let blogCache: BlogArticle[] | null = null;

// Получить все статьи (для списка)
export function getAllBlogArticles(): BlogArticle[] {
  if (blogCache) return blogCache;
  
  try {
    // Загружаем индекс всех статей
    // @ts-ignore
    const index = require('@/data/blog/index.json');
    const articles = index.map((item: { slug: string }) => {
      try {
        // @ts-ignore
        return require(`@/data/blog/${item.slug}.json`);
      } catch (error) {
        console.error(`Error loading article ${item.slug}:`, error);
        return null;
      }
    }).filter(Boolean);
    
    blogCache = articles;
    return articles;
  } catch (error) {
    console.error('Error loading blog index:', error);
    return [];
  }
}

// Получить данные для карточек блога
export function getBlogCards(): BlogCardData[] {
  const articles = getAllBlogArticles();
  
  return articles.map(({ id, slug, title, img, date, excerpt }) => ({
    id,
    slug,
    title,
    img,
    date,
    excerpt
  }));
}

// Получить статью по slug
export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  try {
    // @ts-ignore
    const data = require(`@/data/blog/${slug}.json`);
    return data;
  } catch (error) {
    console.error(`Error loading blog article ${slug}:`, error);
    return undefined;
  }
}

// Проверить существует ли статья
export function blogArticleExists(slug: string): boolean {
  try {
    // @ts-ignore
    require(`@/data/blog/${slug}.json`);
    return true;
  } catch {
    return false;
  }
}

// Получить похожие статьи
export function getRelatedArticles(slug: string, limit: number = 3): BlogCardData[] {
  const current = getBlogArticleBySlug(slug);
  if (!current) return [];
  
  const allArticles = getBlogCards();
  
  return allArticles
    .filter(article => article.slug !== slug)
    // Здесь можно добавить логику поиска по категориям/тегам
    .slice(0, limit);
}

// Получить последние статьи
export function getLatestArticles(limit: number = 6): BlogCardData[] {
  const articles = getBlogCards();
  
  return articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Поиск по статьям
export function searchBlogArticles(query: string): BlogCardData[] {
  const articles = getBlogCards();
  const searchTerm = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm)
  );
}