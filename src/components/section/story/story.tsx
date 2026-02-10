"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import s from "./style.module.css";

type Item = { year: string; title: string; text: string };

export default function Story() {
  const items: Item[] = useMemo(
    () => [
      {
        year: "2010",
        title: "Начало нашего пути",
        text:
          "Начали с небольших партий полимерных люков для местных строительных компаний. Основатели вложили свой опыт и знания в создание качественной продукции",
      },
      { year: "2014", title: "Расширение производства", text: "Открыли новую линию и увеличили объёмы." },
      { year: "2015", title: "Выход на федеральный уровень", text: "Начали поставки в другие регионы России." },
      { year: "2018", title: "Новые технологии", text: "Модернизация оборудования и контроль качества." },
      { year: "2022", title: "Укрепление позиций", text: "Расширили ассортимент и усилили логистику." },
    ],
    []
  );

  const [active, setActive] = useState(0);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // чтобы onScroll не перебивал active сразу после клика
  const suppressScrollSet = useRef(false);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const scrollToIndex = useCallback((idx: number, behavior: ScrollBehavior = "smooth") => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;

    const node = tr.querySelector<HTMLElement>(`[data-idx="${idx}"]`);
    if (!node) return;

    const vpRect = vp.getBoundingClientRect();
    const nRect = node.getBoundingClientRect();

    const center = vpRect.left + vpRect.width / 2;
    const nodeCenter = nRect.left + nRect.width / 2;

    const target = vp.scrollLeft + (nodeCenter - center);
    vp.scrollTo({ left: target, behavior });
  }, []);

  // клик по году
  const onPick = (idx: number) => {
    setActive(idx);
    suppressScrollSet.current = true;
    scrollToIndex(idx, "smooth");
    window.setTimeout(() => (suppressScrollSet.current = false), 400);
  };

  // актив по скроллу (мягко, но не ломает клик)
  useEffect(() => {
    const vp = viewportRef.current;
    const tr = trackRef.current;
    if (!vp || !tr) return;

    let raf = 0;

    const update = () => {
      if (suppressScrollSet.current) return;

      const vpRect = vp.getBoundingClientRect();
      const center = vpRect.left + vpRect.width / 2;

      const nodes = Array.from(tr.querySelectorAll<HTMLElement>("[data-idx]"));
      if (!nodes.length) return;

      let best = 0;
      let bestDist = Infinity;

      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          best = Number(n.dataset.idx);
        }
      }

      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    vp.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      vp.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // drag как слайдер
useEffect(() => {
  const vp = viewportRef.current;
  if (!vp) return;

  const st = { down: false, x: 0, scroll: 0, moved: false };

  const down = (e: PointerEvent) => {
    // если нажали именно на кнопку года — НЕ начинаем drag
    const target = e.target as HTMLElement | null;
    if (target?.closest('[data-idx]')) return;

    if (e.pointerType === "mouse" && e.button !== 0) return;
    st.down = true;
    st.x = e.clientX;
    st.scroll = vp.scrollLeft;
    st.moved = false;

    vp.classList.add(s.dragging);
  };

  const move = (e: PointerEvent) => {
    if (!st.down) return;
    const dx = e.clientX - st.x;
    if (Math.abs(dx) > 3) st.moved = true;
    vp.scrollLeft = st.scroll - dx;
  };

  const up = () => {
    if (!st.down) return;
    st.down = false;
    vp.classList.remove(s.dragging);

    // снэп к активному (если хочешь)
    scrollToIndex(active, "smooth");
  };

  vp.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);

  return () => {
    vp.removeEventListener("pointerdown", down);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    window.removeEventListener("pointercancel", up);
  };
}, [active, scrollToIndex]);


  const progress = items.length <= 1 ? 0 : active / (items.length - 1);

  return (
    <section className={s.story}>
      <div className="container">
        <h2 className="h2">Наша история и достижения</h2>

        <div className={s.wrap}>
          {/* верхний контент как на скрине */}
          <div className={s.hero}>
            <div className={s.leftMark}>
              <span className={s.square} />
              <span className={s.vLine} />
            </div>

            <div className={s.heroGrid}>
              <div className={s.heroYear}>{items[active].year}</div>
              <div className={s.heroTitle}>{items[active].title}</div>
              <p className={s.heroText}>{items[active].text}</p>
            </div>
          </div>

          {/* зона рисок + годы */}
          <div className={s.timelineArea}>
            {/* РИСКИ (темные) */}
            <div className={s.rulerBase} aria-hidden />

            {/* ПОДСВЕТКА РИСОК до прогресса (как на скрине) */}
            <div
              className={s.rulerGlow}
                style={{ left: `${progress * 100}%` }}
              aria-hidden
            />

            <div className={s.viewport} ref={viewportRef}>
              <div className={s.track} ref={trackRef}>
                {items.map((it, idx) => (
                  <button
                    key={it.year}
                    data-idx={idx}
                    className={`${s.yearItem} ${idx === active ? s.yearActive : ""}`}
                    onClick={() => onPick(idx)}
                    type="button"
                  >
                    <span className={s.stem} />
                    <span className={s.yearText}>{it.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Виньетки по краям, но НЕ перекрывают клики */}
            <div className={s.fadeLeft} aria-hidden />
            <div className={s.fadeRight} aria-hidden />

            {/* кнопки (можно убрать, если не нужно) */}
            <div className={s.nav}>
              <button
                className={s.navBtn}
                onClick={() => onPick(clamp(active - 1, 0, items.length - 1))}
                aria-label="Предыдущий год"
              >
                ‹
              </button>
              <button
                className={s.navBtn}
                onClick={() => onPick(clamp(active + 1, 0, items.length - 1))}
                aria-label="Следующий год"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
