import { ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import s from "./style.module.css";




export type TabData = {
  id: string;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  content: ReactNode | null;
};

export function Tab({
  data,
  isOpen,
  onToggle,
}: {
  data: TabData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isDisabled = Boolean(data.disabled);

  const panelId = useId();
  const contentRef = useRef<HTMLDivElement | null>(null);

  // max-height в px, чтобы анимация была плавной и без рывков
  const [maxH, setMaxH] = useState<number>(0);

  const recalc = () => {
    const el = contentRef.current;
    if (!el) return;
    // scrollHeight — реальная высота контента
    setMaxH(el.scrollHeight);
  };

  // Когда открываем — пересчитываем
  useLayoutEffect(() => {
    if (isOpen) recalc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, data.content]);

  // На ресайз — тоже, чтобы не “обрезало”
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Если внутри есть картинки/шрифты/что-то догружается — подстрахуемся
  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(recalc, 60);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className={`${s.item} ${isDisabled ? s.disabled : ""}`}>
      <button
        type="button"
        className={s.head}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={isDisabled}
      >
        <div className={s.left}>
          <div className={s.titleRow}>
            <span className={s.title}>{data.title}</span>
            {data.subtitle ? <span className={s.sep}>/</span> : null}
            {data.subtitle ? <span className={s.sub}>{data.subtitle}</span> : null}
          </div>
        </div>

        <div className={s.right}>

          <span className={`${s.chev} ${isOpen ? s.chevOpen : ""}`} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>

      {/* anim wrapper: max-height + opacity */}
      <div
        id={panelId}
        className={`${s.anim} ${isOpen ? s.animOpen : ""}`}
        style={{ ["--h" as any]: `${maxH}px` }}
      >
        <div ref={contentRef} className={s.animInner}>
          {data.content ? (
            data.content
          ) : null}
        </div>
      </div>
    </div>
  );
}
