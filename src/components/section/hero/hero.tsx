import s from "./style.module.css";
import Image from "next/image";

type Advantage = {
  icon: string;
  text: string;
};

export default async function Hero() {
  const advantages: Advantage[] = [
    { icon: "/icons/about/4.svg", text: "доставка по всей россии от нас до клиента" },
    { icon: "/icons/advantages/2.svg", text: "большой складской запас продукции" },
    { icon: "/icons/about/2.svg", text: "Люки с запорным устройством" },
    { icon: "/icons/about/1.svg", text: "логотип вашей компании на люках" },
  ];

  return (
    <section className={s.hero}>
      <div>

      </div>
      <div className="container">
        <div className={s.heroContent}>
          <h1 className="h1">
            {/* <span className={s.heroContentSpan}>  производитель</span><br /> */}
          Канализационные <br /> полимерпесчаные люки
          </h1>

          <h2 className={s.heroH2}>
           ООО "Полимерные Технологии" производство и оптовая продажа полимерпесчаных люков, полимерпесчаных плитки, полимерпесчаных водоотводов, поребриков.
          </h2>

          <div className={s.heroButBox}>
            <button className={"butt " + s.heroBtn} type="button">
              Скачать прайс-лист
            </button>
            <a className={"butt " + s.heroBtn + " " + s.heroBtn2} href="/docs/Инструкция по монтажу.pdf" target="_blank" type="button">
              Инструкция по монтажу
            </a>
          </div>
        </div>
      </div>

      <div className={s.heroAdvantages}>
        <div className="container">
          <div className={s.advGrid}>
            {advantages.map((e, i) => (
              <div key={i} className={s.heroAdvantagesItem}>
                <Image src={e.icon} alt={e.text} width={47} height={47} />
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
