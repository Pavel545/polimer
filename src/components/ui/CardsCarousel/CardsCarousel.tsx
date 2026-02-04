"use client";

import React, {
  forwardRef,
  JSX,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import s from "./CardsCarousel.module.css";

export type CarouselHandle = {
  prev: () => void;
  next: () => void;
};

export type CardsCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;

  className?: string;
  perView?: number;
  gap?: number;
};

type CardsCarouselComponent = <T>(
  props: CardsCarouselProps<T> & React.RefAttributes<CarouselHandle>
) => JSX.Element;

export const CardsCarousel = forwardRef(function CardsCarouselInner<T>(
  { items, renderItem, className = "", perView = 3, gap = 18 }: CardsCarouselProps<T>,
  ref: React.Ref<CarouselHandle>
) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const getStep = (): number => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;

    const first = viewport.querySelector<HTMLElement>(`[data-carousel-item]`);
    if (!first) return 0;

    const style = window.getComputedStyle(viewport);
    const gapPx = parseFloat(style.gap || "0") || gap;

    return first.offsetWidth + gapPx;
  };

  const scrollToIndex = (idx: number): void => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = getStep();
    viewport.scrollTo({ left: step * idx, behavior: "smooth" });
  };

  const prev = (): void => {
    const nextIdx = Math.max(0, active - 1);
    setActive(nextIdx);
    scrollToIndex(nextIdx);
  };

  const next = (): void => {
    const maxIdx = Math.max(0, items.length - perView);
    const nextIdx = Math.min(maxIdx, active + 1);
    setActive(nextIdx);
    scrollToIndex(nextIdx);
  };

  useImperativeHandle(ref, () => ({ prev, next }), [active, items.length, perView]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let raf = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = getStep();
        if (!step) return;
        setActive(Math.round(viewport.scrollLeft / step));
      });
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${s.root} ${className}`}
      style={{ ["--gap" as any]: `${gap}px`, ["--perView" as any]: perView }}
    >
      <div ref={viewportRef} className={s.viewport}>
        <div className={s.track}>
          {items.map((item, i) => (
            <div key={i} className={s.item} data-carousel-item>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}) as CardsCarouselComponent;
