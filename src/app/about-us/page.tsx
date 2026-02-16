import AboutAdvantages from "@/components/section/aboutPage/advantages/advantages";
import AboutInfo from "@/components/section/aboutPage/info/info";
import Contact from "@/components/section/contact/contact";
import HeroPages from "@/components/section/heroPages/HeroPages";
import Interesting from "@/components/section/Interesting/Interesting";
import Story from "@/components/section/story/story";
import { getLatestArticles } from "@/lib/blog"; // импортируем функцию

export default function AboutPage() {
  // Получаем последние 6 статей для блога
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
    <main>
      <HeroPages
        fon='/img/aboutPage/fonHero.jpg'
        title='О нас'
        h1="Технологии, которым доверяют"
        text="Благодаря современным инновациям и строгому контролю качества, наши
              полимерные люки пользуются доверием профессионалов по всей стране"
      />
      <AboutInfo />
      <Story />
      <AboutAdvantages />
      <Interesting items={blogMock} />
      <Contact />
    </main>
  )
}