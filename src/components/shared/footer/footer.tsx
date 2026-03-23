import Image from "next/image";
import s from "./style.module.css";
import { JSX } from "react";

type NavLink = {
  href: string;
  text: string;
};

type Product = {
  id:string;
  slug: string;
  title: string;
};

export default function Footer(): JSX.Element {
  const link: NavLink[] = [
    { href: "/products", text: "Продукция" },
    { href: "/about-us", text: "О нас" },
    { href: "/blog", text: "Блог" },
    { href: "/vacancies", text: "Вакансии" },
  ];
  const lukProducts: Product[] = [
    {
      id:"1",
      slug:'luk-lm',
      title:'Люки канализационный «ЛМ»',
    },
    {
      id:"2",

      slug:'luk-l',
      title:'Люки канализационный «Л»',
    },
    {
      id:"3",

      slug:'lyuk-s-zapornym-ustroistvom',
      title:'Люки канализационный «ЛУ»',
    },
    {
      id:"4",

      slug:'luk-lm',
      title:'Люки канализационный «С»',
    },
    {
      id:"5",

      slug:'luk-h',
      title:'Люки канализационный «Т»',
    },
    {
      id:"6",

      slug:'konus-luk-lm',
      title:'Конус-люк канализационный «ЛМ»',
    }
  ];
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.footerContent}>
          <a href="/" className={s.footerLogo + " flex-center"}>
            <Image src="/logo.png" alt="Logo" width={176} height={36} />
          </a>

          <div className={s.siteMap}>
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
                {lukProducts.map((product) => (
                  <li key={product.id}>
                    <a
                      className={s.footerLink + " link"}
                      href={`/products/${product.slug}`}
                    >
                      {product.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <nav className={s.col}>
            <ul className={s.list}>
              <li>
                <a className={s.footerLink + " link"} target="_blank" href="https://yandex.ru/maps/-/CPq6ZWNy">
                  г. Ульяновск, проезд Максимова 33 <br /> строение 3 (бывш. 9-й проезд Инженерный 33, строение 3)
                </a>
              </li>
              <li>
                <a className={s.footerLink + " link"} href="tel:+79278023071">
                  +7 (927) 802 30 71
                </a>
              </li>
              <li>
                <a className={s.footerLink + " link"} target="_blank" href="mailto:73polimer@mail.ru">
                  73polimer@mail.ru
                </a>
              </li>

              <li className={s.socRow}>
                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/tg.svg" alt="Telegram" width={44} height={44} />
                </a>
                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                  <Image src="/icons/max.svg" alt="Telegram" width={44} height={44} />
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
          <span>© Полимерные технологии — 2026</span>

          <a className={"link " + s.policy} href="/politiko">
            Политика конфиденциальности
          </a>
          <a className={"link " + s.policy} href="/politika-cookies">
            Политика в отношении файлов cookie
          </a>
          <a className={"link " + s.policy} href="/soglasie-obrabotka-pers-dannih">
            Согласие на обработку персональных данных
          </a>
        </div>
      </div>
    </footer>
  );
}
