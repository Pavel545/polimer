import { JSX } from "react";
import s from "./style.module.css";

export default function PsLine(): JSX.Element {
  const text =
    "На нашем сайте работает удобный чат-бот, который с удовольствием ответит на все ваши вопросы и поможет найти нужную информацию";

  return (
    <div className={s.psLine} aria-label={text}>
      <div className={s.psLineInner}>
        <div className={s.marquee}>
          {/* дублируем текст 2 раза для бесшовной прокрутки */}
          <div className={s.track}>
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
          </div>

          <div className={s.track} aria-hidden="true">
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
            <span className={s.sep}>•</span>
            <span className={s.item}>{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
