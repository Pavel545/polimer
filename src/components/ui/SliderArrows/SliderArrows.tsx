import React, { JSX } from "react";
import s from "./style.module.css";

export type SliderArrowsTheme = "dark" | "light" | "auto";

type Props = {
  onPrev: () => void;
  onNext: () => void;

  className?: string;

  /** тема под фон контейнера */
  theme?: SliderArrowsTheme;

  /** можно отключать кнопки */
  prevDisabled?: boolean;
  nextDisabled?: boolean;

  /** если стрелки должны быть справа/внутри хедера и т.п. */
  size?: "sm" | "md" | "lg";
};

export function SliderArrows({
  onPrev,
  onNext,
  className = "",
  theme = "dark",
  prevDisabled = false,
  nextDisabled = false,
  size = "md",
}: Props): JSX.Element {
  return (
    <div
      className={[
        s.root,
        s[`theme_${theme}`],
        s[`size_${size}`],
        className,
      ].join(" ")}
    >
      <button
        type="button"
        className={s.btn}
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Назад"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.65551 14L0.278481 7.66754C-0.0928259 7.29883 -0.0928268 6.70117 0.278481 6.33246L6.65551 0L8 1.33509L2.29521 7L8 12.6649L6.65551 14Z" />
        </svg>
      </button>

      <button
        type="button"
        className={s.btn}
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Вперёд"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.34449 0L7.72152 6.33246C8.09283 6.70117 8.09283 7.29883 7.72152 7.66754L1.34449 14L0 12.6649L5.70479 7L0 1.33509L1.34449 0Z" />
        </svg>
      </button>
    </div>
  );
}
