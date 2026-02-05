"use client";

import PsLine from "@/components/ui/psLine/psLine";
import s from "./style.module.css";
import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";
import { useRouter } from "next/navigation";
import Image from "next/image";
const product = {
  titleMini: "Люк «Л»",
  title: "полимерный Люк «Л» / легкий",
  text: "Полимерпесчаный канализационный люк или как его ее называют в быту пластиковый люк — это изделие предназначенное для защиты колодцев системы канализации, водоснабжения или других инженерных сетей. Широко распространены полимернопесчаные люки и в быту, т. к. часто устанавливаются на приусадебных участках, газонах, переходных зонах и проезжих частях. Полимер-песчаные канализационные люки зачастую можно увидеть на септиках, выгребных ямах в частном секторе.",
  gallary: [
    "/img/products/luk-l/1.jpg",
    "/img/products/luk-l/2.jpg",
    "/img/products/luk-l/3.jpg",
  ],
  price: "1 470",
};
export default function ProductHero() {
  const router = useRouter();
  const handleGoBack = () => {
    // Возврат на предыдущую страницу
    router.back();
  };
  return (
    <section className={s.pHero}>
      <PsLine />
      <BreadCrumbs items={[{ title: "Люк «Л»" }]} />
      <div className="container">
        <div className={s.pHeroContent}>
          <div className={s.gallary}>
            <div className={s.gallaryPrev}>
              <Image
                src={product.gallary[0]}
                alt="Картинка"
                width={670}
                height={550}
              />
            </div>

            <div className={s.gallaryList}>
              {product.gallary.map((e, i) => (
                <div
                  key={i}
                  className={s.gallaryListItem}
                  style={{ background: `url(${e})` }}
                ></div>
              ))}
            </div>
          </div>

          <div className={s.info}>
            <button onClick={handleGoBack} className={s.infoBack}>
              <span className={s.infoBackButt}>
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.65551 14L0.278481 7.66754C-0.0928259 7.29883 -0.0928268 6.70117 0.278481 6.33246L6.65551 0L8 1.33509L2.29521 7L8 12.6649L6.65551 14Z"
                    fill="white"
                  />
                </svg>
              </span>{" "}
              <span className="link">Вернуться назад</span>
            </button>

            <h1 className={s.infoTitle}>{product.title}</h1>

            <p className={s.infoText}>{product.text}</p>

            <a className="link" href="#">
              Скачать инструкцию
            </a>

            <div className={"flex-col " + s.infoPrice}>
              <span className={s.infoPriceText}>Стоимость:</span>
              <span className={s.infoPriceCount}>{product.price + "  ₽"}</span>
            </div>

            <button className="butt">Оформить заказ</button>
          </div>
        </div>
      </div>
    </section>
  );
}
