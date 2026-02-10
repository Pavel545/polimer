import Image from "next/image";
import s from "./style.module.css";
import { JSX } from "react";

type NavLink = {
  href: string;
  text: string;
};

export default function Footer(): JSX.Element {
  const link: NavLink[] = [
    { href: "/#products", text: "Продукция" },
    { href: "/about-us", text: "О нас" },
    { href: "#", text: "Блог" },
    { href: "/vacancies", text: "Вакансии" },
  ];

  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerContent}>
          <a href="/" className={s.footerLogo + " flex-center"}>
            <Image src="/logo.png" alt="Logo" width={176} height={36} />
          </a>

          <nav className={s.col}>
            <ul className={s.list}>
              {link.map((e, i) => (
                <li key={i}>
                  <a className={s.footerLink + " link"} href={e.href}>
                    {e.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={s.col}>
            <ul className={s.list}>
              <li>
                <a className={s.footerLink + " link"} href="#">
                  432070, Россия, г. Ульяновск, <br /> ул. Урицкого, д. 58, 3 этаж
                </a>
              </li>
              <li>
                <a className={s.footerLink + " link"} href="tel:+79677717986">
                  +7 (967) 771-79-86
                </a>
              </li>
              <li>
                <a className={s.footerLink + " link"} href="mailto:73polimer@mail.ru">
                  73polimer@mail.ru
                </a>
              </li>

              <li className={s.socRow}>
                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/tg.svg" alt="Telegram" width={44} height={44} />
                </a>
                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/vk.svg" alt="VK" width={44} height={44} />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* опционально: нижняя строка */}
        <div className={s.bottom}>
          <span>© {new Date().getFullYear()} 73 Polimer</span>
          <a className={"link " + s.policy} href="/policy">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
