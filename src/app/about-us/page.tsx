import AboutAdvantages from "@/components/section/aboutPage/advantages/advantages";
import Eko from "@/components/section/aboutPage/eko/Eko";
import AboutInfo from "@/components/section/aboutPage/info/info";
import Mission from "@/components/section/aboutPage/mission/Mission";
import Contact from "@/components/section/contact/contact";
import HeroPages from "@/components/section/heroPages/HeroPages";
import Story from "@/components/section/story/story";

export default function AboutPage() {
 

  return (
    <main>
      <HeroPages
        fon='/img/aboutPage/fonHero.jpg'
        title='О нас'
        h1='Производитель полимерно-песчаных люков ООО «Полимерные Технологии» '
       
      
      />
      <Mission/>
      <AboutInfo />
      {/* <Story /> */}
      <AboutAdvantages />
      <Contact />
    </main>
  )
}