"use client";

import Lightbox, { SlideItem } from "@/components/ui/Lightbox/lightbox";
import s from "./style.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type Advantage = {
  icon: string;
  text: string;
};

export type Instruct = {
  title: string;
  gallery: SlideItem[];
};
export default function Hero() {
  const [activeItem, setActiveItem] = useState<Instruct | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const advantages: Advantage[] = [
    { icon: "/icons/about/4.svg", text: "доставка по всей россии от нас до клиента" },
    { icon: "/icons/advantages/2.svg", text: "большой складской запас продукции" },
    { icon: "/icons/about/2.svg", text: "Люки с запорным устройством" },
    { icon: "/icons/about/1.svg", text: "логотип вашей компании на люках" },
  ];

  const openModal = (item: Instruct) => {
    setActiveItem(item);
    setIsLightboxOpen(true);
  };

  const closeModal = () => {
    setIsLightboxOpen(false);
    setActiveItem(null);
  };

  return (
    <>
      <div className={s.heroWrapper}>
        {/* Фоновое изображение через компонент Image для лучшей оптимизации */}
        <div className={s.heroBg}>
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/img/hero/fonMob.webp"
              type="image/webp"
            />
            <Image
              src="/img/hero/fon.jpg"
              alt='ООО "Полимерные Технологии" производство и оптовая продажа полимерпесчаных люков, полимерпесчаных плитки, полимерпесчаных водоотводов, поребриков.'
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={85}
            />
          </picture>
          <div className={s.heroOverlay}></div>
        </div>

        <div className="container">
          <div className={s.heroContent}>
            <h1 className="h1">
              <span className={`seryy ${s.subTitle}`}>люки Канализационные</span> <br /> полимерно-песчаные
            </h1>

            <h2 className={s.heroH2}>
              Производство и <b>оптовая</b> продажа: <br /> - люки полимерпесчаные,<br /> - плитка тротуарная полимерпесчаная, <br />- водоотводы полимерпесчаные, <br /> - поребрики полимерпесчаные<br /> <span className={s.heroH2Sp}>  ООО "Полимерные Технологии"</span>
            </h2>

            <div className={s.heroButBox}>
              <button className={"butt " + s.heroBtn + " " + s.heroBtn2} onClick={() => openModal({ title: "Выбор полимерпесчаного люка", gallery: [{ image: "/img/instruct/1.1.jpg", pdf: "/docs/instruct/Выбор (подбор) полимерпесчаного люка.pdf" }] })} >
                Выбор полимерпесчаного люка
              </button>
              <button className={"butt " + s.heroBtn + " " + s.heroBtn2} onClick={() => openModal({ title: "Инструкция по монтажу", gallery: [{ image: "/img/instruct/2.jpg", pdf: "/docs/instruct/Инструкция полная.pdf" },{ image: "/img/instruct/3.jpg", pdf: "/docs/instruct/Инструкция полная.pdf" },{ image: "/img/instruct/4.jpg", pdf: "/docs/instruct/Инструкция полная.pdf" },{ image: "/img/instruct/5.png", pdf: "/docs/instruct/Инструкция полная.pdf" }] })} >
                Инструкция по монтажу
              </button>


            </div>
          </div>
        </div>
      </div>

      <div className={s.heroAdvantages}>
        <div className="container">
          <div className={s.advGrid}>
            {advantages.map((e, i) => (
              <div key={i} className={s.heroAdvantagesItem}>
                <Image
                  src={e.icon}
                  alt={e.text}
                  width={47}
                  height={47}
                  loading="eager"
                />
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Lightbox
        isOpen={isLightboxOpen}
        images={activeItem?.gallery || []}
        title={activeItem?.title}
        onClose={closeModal}
      />
    </>
  );
}