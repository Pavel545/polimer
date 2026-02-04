import s from "./style.module.css";

export default function PsLine() {
  return (
    <div className={s.psLine}>
      <div className="container flex-center">
        <p className={s.psLineText}>
          На нашем сайте работает удобный чат-бот, который с удовольствием
          ответит на все ваши вопросы и поможет найти нужную информацию
        </p>
      </div>
    </div>
  );
}
