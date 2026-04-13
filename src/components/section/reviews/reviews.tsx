"use client";

import React, { useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

import s from "./style.module.scss";

type ReviewSlide = {
  id: number;
  name: string;
  region: string;
  text: string;
  img: string;
  avatar: "men" | "girl";
};

export default function Reviews() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const slides = useMemo<ReviewSlide[]>(
    () => [
      {
        id: 1,
        name: "Сергей Иванович",
        region: "Самарская область",
        text: "Прикрепили обечайку к бетонному кольцу на анкера. Люк выбрали Легкий. Зеленый цвет на траве смотрится хорошо.",
        img: "/img/reviews/1.webp",
        avatar: "men",
      },
      {
        id: 2,
        name: "Платон",
        region: "Москва",
        text: "Засыпали двор асфальтной крошкой и установили полимерпесчаный люк на скважину. По краям прошли битумным герметиком, хотя можно было и без него.",
        img: "/img/reviews/2.webp",
        avatar: "men",
      },
      {
        id: 3,
        name: "Николай",
        region: "Казань",
        text: "Люк зеленый, легкий. Установили на газон. Лежит уже несколько лет. Никаких хлопот не доставляет, это самое главное. Летом на траве он практически незаметен.",
        img: "/img/reviews/3.webp",
        avatar: "men",
      },
      {
        id: 4,
        name: "Максим",
        region: "Краснодар",
        text: "Дорожки из плитки сделали в 2018 году. Уложили плитку на бетонное основание на плиточный клей. Все отлично держится уже 7 лет. На зиму не убираем, моется легко обычным напором воды из шланга, не трескается, как бетонная. Эстетически приятно смотреть и удобно пользоваться.",
        img: "/img/reviews/4.webp",
        avatar: "men",
      },
      {
        id: 5,
        name: "Максим Сергеевич",
        region: "Краснодар",
        text: "Все удобно, вскопали землю, потом просто помыли полимерпесчаную плитку струей воды из шланга и она почти как новенькая. Главное — не трескается и не крошится, как бетонная.",
        img: "/img/reviews/5.webp",
        avatar: "men",
      },
      {
        id: 6,
        name: "Светлана Васильевна",
        region: "Ульяновск",
        text: "Установили люк в 2017 году на канализацию. Покупали в местном гипермаркете. Зеленый люк смотрится хорошо на траве. 2 раза в год открываем. За все время эксплуатации никаких проблем не было. Рекомендую к покупке.",
        img: "/img/reviews/6.webp",
        avatar: "girl",
      },
      {
        id: 7,
        name: "Иван Максимович",
        region: "Краснодар",
        text: "Полимерпесчаную плитку и поребрики устанавливали в 2016 году. Фото сделано спустя 10 лет после установки. Вместе с поребриками смотрится очень хорошо. Думаю еще лет 10 минимум точно пролежит.",
        img: "/img/reviews/7.webp",
        avatar: "men",
      },
      {
        id: 8,
        name: "Михаил",
        region: "Краснодар",
        text: "На площадке перед крыльцом уложили полимерно-песчаную плитку. Площадка вся под навесом, плитка не греется, смотрится красиво. Верх крыльца выложили полимерпесчаной плиткой, там всегда лежит собака, мыть удобно, да и зимой на ней теплее собаке.",
        img: "/img/reviews/8.webp",
        avatar: "men",
      },
      {
        id: 9,
        name: "Сергей Владимирович",
        region: "Краснодар",
        text: "Люк установили на площадке перед въездом в гараж в 2018 году. Взяли сразу с запасом, чтобы не переживать в случае наезда грузовым транспортом. 8 лет лежит уже, как новенький. Открываем по мере необходимости раз в год. Цена по сравнению с чугунным гораздо ниже.",
        img: "/img/reviews/9.webp",
        avatar: "men",
      },
    ],
    []
  );

  return (
    <section className={s.reviews}>
      <div className="container">
        <h2 className="h2">
          Довольные клиенты <br /> по всей России
        </h2>

        <div className={s.sliderArea}>
          <Swiper
            modules={[EffectFade]}
            slidesPerView={1}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={slides.length > 1}
            speed={700}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
            className={s.slider}
          >
            {slides.map((item) => (
              <SwiperSlide key={item.id}>
                <article className={s.card}>
                  <div className={s.imageCol}>
                    <div className={s.imageBox}>
                      <img src={item.img} alt={item.name} className={s.image} />
                    </div>
                  </div>

                  <div className={s.content}>
                    <span className={s.region}>{item.region}</span>
                    <h3 className={s.name}>{item.name}</h3>
                    <p className={s.text}>{item.text}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={s.sidePagination}>
            {slides.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Перейти к отзыву ${idx + 1}`}
                className={`${s.sideDot} ${idx === active ? s.sideDotActive : ""}`}
                onClick={() => swiperRef.current?.slideToLoop(idx)}
              >
                <span className={s.sideDotInner}>
                  <img
                    src={
                      item.avatar === "girl"
                        ? "/img/reviews/gerl.png"
                        : "/img/reviews/men.png"
                    }
                    alt={item.name}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}