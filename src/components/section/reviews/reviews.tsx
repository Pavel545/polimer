"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import React, { useMemo, useRef, useState } from "react";
import s from "./style.module.scss";
import { Swiper as SwiperType } from "swiper";
type ReviewSlide = {
  id: number;
  name: string;
  region: string;
  text: string;
  img: string;
  avatar: "men" | "girl";
};
import { EffectCoverflow } from "swiper/modules";
export default function Reviews() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const slides = useMemo<ReviewSlide[]>(() => [{ id: 1, name: "ИВАН ИВАНОВ", region: "Самарская область", text: "Заказывал люк что бы гармонично сочетался с ландшафтным дизайном заднего двора.\nПодошло отлично, спасибо!", img: "/img/reviews/1.webp", avatar: "men", }, { id: 2, name: "АННА ПЕТРОВА", region: "Москва", text: "Качественно, быстро и аккуратно.\nОтдельно спасибо за консультацию!", img: "/img/reviews/1.webp", avatar: "girl", }, { id: 3, name: "СЕРГЕЙ СИДОРОВ", region: "Казань", text: "Все подошло по размерам, монтаж без проблем.\nРекомендую!", img: "/img/reviews/1.webp", avatar: "men", }, { id: 4, name: "ОЛЬГА СМИРНОВА", region: "Краснодар", text: "Отличный сервис, оперативная доставка.\nБуду обращаться еще.", img: "/img/reviews/1.webp", avatar: "girl", },], [],);

  return (
    <section className={s.reviews}>
      <div className="container">
        <h2 className="h2">
          Довольные клиенты <br /> по всей России
        </h2>

        <Swiper
          slidesPerView={"auto"}
          centeredSlides
          speed={2500}
          spaceBetween={10}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          className={s.carousel_container}
        >
          {slides.map((item, idx) => (
            <SwiperSlide key={item.id} className={s.slideWrapper}>
              <article
                className={`${s.slide} ${idx === active ? s.slideActive : s.slideInactive
                  }`}
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className={s.card3d}>
                  <div className={s.overlay}>
                    <div className={s.name}>{item.name}</div>
                    <div className={s.region}>{item.region}</div>
                    <p className={s.text}>{item.text}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* кастомная пагинация */}
        <div className={s.pagination}>
          {slides.map((item, idx) => (
            <button
              key={item.id}
              className={`${s.paginationDot} ${idx === active ? s.paginationDotActive : ""
                }`}
              onClick={() => swiperRef.current?.slideTo(idx)}
            >
              <img
                src={
                  item.avatar === "girl"
                    ? "/img/reviews/gerl.png"
                    : "/img/reviews/men.png"
                }
                alt={item.name}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}