import About from "@/components/section/about/about";
import Contact from "@/components/section/contact/contact";
import Geography from "@/components/section/geography/geography";
import Hero from "@/components/section/hero/hero";
import Interesting from "@/components/section/Interesting/Interesting";
import Products from "@/components/section/products/products";
import Reviews from "@/components/section/reviews/reviews";
import { getLatestArticles } from "@/lib/blog";

export default function Home() {

  const blogArticles = getLatestArticles(6);

  // Преобразуем данные из нашей структуры в формат, который ожидает компонент Interesting
  const blogMock = blogArticles.map(article => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    img: article.img,
    date: article.date,
    excerpt: article.excerpt // используем excerpt вместо полного текста
  }));
  return (
    <main >
      <Hero />
      <Products />
      <About />
      <Geography />
      <Reviews />
      <Interesting items={blogMock} />
      <Contact />
    </main>
  );
}
