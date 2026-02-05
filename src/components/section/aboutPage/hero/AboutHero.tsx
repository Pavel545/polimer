import PsLine from "@/components/ui/psLine/psLine";
import s from "./style.module.css";
import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";

export default function AboutHero() {
  return (
    <section className={s.aboutHero}>
      <PsLine />
      <BreadCrumbs items={[{title:'О нас'}]}/>
      <div className="container">
        <div className={s.aboutHeroContent}>
          <h1 className="h1">Технологии, которым доверяют</h1>
          <p className={s.aboutHeroContentText}>
            Благодаря современным инновациям и строгому контролю качества, наши
            полимерные люки пользуются доверием профессионалов по всей стране
          </p>
        </div>
      </div>
    </section>
  );
}
