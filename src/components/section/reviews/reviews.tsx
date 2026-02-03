"use client";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import s from "./style.module.css";

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
        text:
          "Заказывал люк что бы гармонично сочетался с ландшафтным дизайном заднего двора.\nПодошло отлично, спасибо!",
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
    []
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

          <div className={s.reviewsArrowBox}>
            <button
              type="button"
              className={s.reviewsArrowItem}
              onClick={prev}
              aria-label="Предыдущий отзыв"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.65551 14L0.278481 7.66754C-0.0928259 7.29883 -0.0928268 6.70117 0.278481 6.33246L6.65551 0L8 1.33509L2.29521 7L8 12.6649L6.65551 14Z" />
              </svg>
            </button>

            <button
              type="button"
              className={s.reviewsArrowItem}
              onClick={next}
              aria-label="Следующий отзыв"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.34449 0L7.72152 6.33246C8.09283 6.70117 8.09283 7.29883 7.72152 7.66754L1.34449 14L0 12.6649L5.70479 7L0 1.33509L1.34449 0Z" />
              </svg>
            </button>
          </div>
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
