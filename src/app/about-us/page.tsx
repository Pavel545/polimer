import AboutAdvantages from "@/components/section/aboutPage/advantages/advantages";
import AboutInfo from "@/components/section/aboutPage/info/info";
import Contact from "@/components/section/contact/contact";
import HeroPages from "@/components/section/heroPages/HeroPages";
import Story from "@/components/section/story/story";

export default function AboutPage() {
 

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
      <Contact />
    </main>
  )
}