import Link from "next/link";
import s from "./BreadCrumbs.module.css";

export type Crumb = {
  title: string;
  href?: string; // если нет — текущая страница
};

type Props = {
  items: Crumb[];
};

export default function BreadCrumbs({ items }: Props) {
  return (
    <nav className={s.BreadCrumbs} aria-label="Хлебные крошки">
      <div className="container">
        <ul className={s.list}>
          {/* Главная всегда первая */}
          <li className={s.item}>
            <Link href="/" className={s.link}>
              Главная
            </Link>
          </li>

          {items.map((crumb, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li key={idx} className={s.item}>
                <span className={s.separator}>•</span>

                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className={s.link}>
                    {crumb.title}
                  </Link>
                ) : (
                  <span className={s.current} aria-current="page">
                    {crumb.title}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
