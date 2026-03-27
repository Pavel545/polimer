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
        h1='ООО "Полимерные Технологии" производитель полимерпесчаных люков.'
        text='Производственная компания Полимерные Технологии расположена в Поволжье, в г. Ульяновске, по адресу: проезд  Максимова, 33, строение 3. 
С 2010 года компания Полимерные  Технологии производит и оптом реализует по всей России качественные полимерпесчаные люки, полимерпесчаную тротуарную плитку, полимерпесчаные водоотводы. 
ООО "Полимерные Технологии" имеет собственную службу логистики и доставляет полимерпесчаные люки до клиента в любой регион и город России. '
      />
      <AboutInfo />
      <Story />
      <AboutAdvantages />
      <Contact />
    </main>
  )
}