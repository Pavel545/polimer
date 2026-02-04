"use client";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import s from "./style.module.css";
import { SliderArrows } from "@/components/ui/SliderArrows/SliderArrows";

type ReviewSlide = {
  id: number;
  name: string;
  region: string;
  text: string;
  img: string;
};

export default function Reviews(): JSX.Element {
  // Пример данных — подставь свои
  const slides = useMemo<ReviewSlide[]>(
    () => [
      {
        id: 1,
        name: "ИВАН ИВАНОВ",
        region: "Самарская область",
        text: "Заказывал люк что бы гармонично сочетался с ландшафтным дизайном заднего двора.\nПодошло отлично, спасибо!",
        img: "/img/reviews/1.jpg",
      },
      {
        id: 2,
        name: "АННА ПЕТРОВА",
        region: "Москва",
        text: "Качественно, быстро и аккуратно.\nОтдельно спасибо за консультацию!",
        img: "/img/reviews/1.jpg",
      },
      {
        id: 3,
        name: "СЕРГЕЙ СИДОРОВ",
        region: "Казань",
        text: "Все подошло по размерам, монтаж без проблем.\nРекомендую!",
        img: "/img/reviews/1.jpg",
      },
      {
        id: 4,
        name: "ОЛЬГА СМИРНОВА",
        region: "Краснодар",
        text: "Отличный сервис, оперативная доставка.\nБуду обращаться еще.",
        img: "/img/reviews/1.jpg",
      },
    ],
    [],
  );

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number>(0);

  const scrollToIndex = (i: number): void => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const items = viewport.querySelectorAll<HTMLElement>(`.${s.slide}`);
    const target = items[i];
    if (!target) return;

    const left =
      target.offsetLeft - (viewport.clientWidth - target.clientWidth) / 2;

    viewport.scrollTo({ left, behavior: "smooth" });
  };

  const prev = (): void => {
    const nextIndex = (active - 1 + slides.length) % slides.length;
    setActive(nextIndex);
    scrollToIndex(nextIndex);
  };

  const next = (): void => {
    const nextIndex = (active + 1) % slides.length;
    setActive(nextIndex);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let rafId = 0;

    const onScroll = (): void => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        const items = viewport.querySelectorAll<HTMLElement>(`.${s.slide}`);
        if (!items.length) return;

        const center = viewport.scrollLeft + viewport.clientWidth / 2;

        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        items.forEach((el, idx) => {
          const elCenter = el.offsetLeft + el.clientWidth / 2;
          const dist = Math.abs(center - elCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });

        setActive(bestIdx);
      });
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });

    // старт — центрируем первый слайд
    scrollToIndex(0);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className={s.reviews}>
      <div className="container">
        <div className={`${s.reviewsHeader} flex-sb`}>
          <h2 className="h2">
            Довольные клиенты <br /> по все России
          </h2>

          <SliderArrows onPrev={prev} onNext={next} theme="dark" size="md" />
        </div>

        <div className={s.reviewsSlider}>
          <div ref={viewportRef} className={s.viewport}>
            <div className={s.track}>
              {slides.map((item, idx) => (
                <article
                  key={item.id}
                  className={`${s.slide} ${
                    idx === active ? s.slideActive : s.slideInactive
                  }`}
                  style={{ backgroundImage: `url(${item.img})` }}
                  onClick={() => scrollToIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollToIndex(idx);
                    }
                  }}
                >
                  <div className={s.overlay}>
                    <div className={s.name}>{item.name}</div>
                    <div className={s.region}>{item.region}</div>
                    <p className={s.text}>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
