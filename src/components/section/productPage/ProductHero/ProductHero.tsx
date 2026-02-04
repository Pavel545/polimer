import PsLine from "@/components/ui/psLine/psLine";
import s from "./style.module.css";
import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";
const product = {
  gallary: [
    "/img/products/luk-l/1.jpg",
    "/img/products/luk-l/2.jpg",
    "/img/products/luk-l/3.jpg",
  ],
};
export default function ProductHero() {
  return (
    <section className={s.pHero}>
      <PsLine />
      <BreadCrumbs items={[{ title: "Люк «Л»" }]} />
      <div className="container">
        <div className={s.pHeroContent}>
          <div className={s.gallary}>
            <div className={s.gallaryPrev}></div>

            <div className={s.gallaryList}></div>
          </div>

          <div className={s.info}></div>
        </div>
      </div>
    </section>
  );
}
