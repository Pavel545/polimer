import Image from "next/image";
import s from "./style.module.css";

export default function AboutInfo() {
  return (
    <section className={s.info}>
      <div className="container">
        <div className={s.infoContent}>
          <div className={s.infoContentImg}>
            <Image
              src={"/img/aboutPage/info1.jpg"}
              alt="Работник компании"
              width={675}
              height={444}
            />
          </div>
          <div className={s.infoContentText}>
            <h2>
              Производственная компания "Полимерные технологии" является
              производителем полимерпесчаных изделий
            </h2>

            <p>
              Мы идем в ногу со временем и используем комплексный подход при
              производстве полимерпесчаных изделий. Полный цикл производства,
              начиная от закупки исходного сырья и последующей сортировки
              позволяет значительно увеличить качество конечной продукции и
              сократить сроки производства
            </p>

            <div className={s.infoContentTextItem}>
              <h3>{`> 16 лет`}</h3>
              <span>На рынке</span>
            </div>
            <div className={s.infoContentTextItem}>
              <h3>{`> 15 000 тонн`}</h3>
              <span>Пластика перерыбатывается каждый год</span>
            </div>
            <div className={s.infoContentTextItem}>
              <h3>{`> 100 городов`}</h3>
              <span>Поставки по всей России</span>
            </div>

            <button className="butt">Смотреть продукцию</button>
          </div>
        </div>

        <div className={s.infoImg}>
          <Image
            src={"/img/aboutPage/info2.jpg"}
            alt="Продукция компании"
            width={1370}
            height={624}
          />
        </div>
      </div>
    </section>
  );
}
