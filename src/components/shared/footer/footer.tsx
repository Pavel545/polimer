import Image from "next/image";
import s from "./style.module.css";
import { JSX } from "react";

type NavLink = {
  href: string;
  text: string;
};

type Product = {
  id: string;
  slug: string;
  title: string;
};

export default function Footer(): JSX.Element {
  const link: NavLink[] = [
    { href: "/products", text: "Продукция" },
    { href: "/about-us", text: `О компании ООО "Полимерные Технологии"` },
    { href: "/blog", text: `Новости ООО "Полимерные Технологии"` },
    { href: "/vacancies", text: "Вакансии" },
  ];
  
  const lukProducts: Product[] = [
    {
      id: "1",
      slug: "luk-lm",
      title: "Люк канализационный полимерпесчаный «ЛМ»",
    },
    {
      id: "2",
      slug: "luk-l",
      title: "Люк канализационный полимерпесчаный «Л»",
    },
    {
      id: "3",
      slug: "lyuk-s-zapornym-ustroistvom",
      title: "Люк канализационный полимерпесчаный «ЛУ»",
    },
    {
      id: "4",
      slug: "luk-lm",
      title: "Люк канализационный полимерпесчаный «С»",
    },
    {
      id: "5",
      slug: "luk-h",
      title: "Люк канализационный полимерпесчаный «Т»",
    },
    {
      id: "6",
      slug: "konus-luk-lm",
      title: "Конус-люк канализационный полимерпесчаный «ЛМ»",
    },
  ];

  // Company details for microdata and easy maintenance
  const companyDetails = {
    name: "ООО «Полимерные Технологии»",
    legalName: "Общество с ограниченной ответственностью «Полимерные Технологии»",
    inn: "7328059047",
    kpp: "732101001",
    ogrn: "1107328001109",
    okpo: "87758168",
    legalAddress: "432063, РФ, Ульяновская обл., г.Ульяновск, Ул. Кирова, д. 6, кв. 397",
    postalAddress: "432063, РФ, Ульяновская обл., г.Ульяновск, Ул. Кирова, д. 6, кв. 397",
    factoryAddress: "г. Ульяновск, проезд Максимова 33 строение 3 (бывш. 9-й проезд Инженерный 33, строение 3)",
    phone: "+7 (927) 802 30 71",
    phoneRaw: "+79278023071",
    email: "73polimer@mail.ru",
    email2: "resurs.tr@mail.ru",
    phoneOffice: "8(8422)73-21-59",
    director: "Адаев Игорь Николаевич",
    bankAccount: "40702810329280003234",
    bankName: "ФИЛИАЛ \"НИЖЕГОРОДСКИЙ\" АО \"АЛЬФА-БАНК\"",
    bik: "042202824",
    correspondentAccount: "30101810200000000824",
  };

  return (
    <footer className={s.footer} itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content={companyDetails.name} />
      <meta itemProp="legalName" content={companyDetails.legalName} />
      <meta itemProp="taxID" content={companyDetails.inn} />
      <meta itemProp="vatID" content={companyDetails.inn} />
      
      <div className="container">
        <div className={s.footerContent}>
          <a 
            href="/" 
            className={s.footerLogo + " flex-center"}
            itemProp="url"
          >
            <Image 
              src="/logo.png" 
              alt={`Логотип ${companyDetails.name}`} 
              width={176} 
              height={36}
              itemProp="logo"
            />
          </a>

          <div className={s.siteMap}>
            <nav className={s.col} aria-label="Основная навигация">
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
            <nav className={s.col} aria-label="Навигация по продукции">
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

          <div className={s.col}>
            <ul className={s.list}>
              <li>
                <div className={s.footerLink} itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <strong>Юридический адрес:</strong>
                  <br />
                  <span itemProp="streetAddress">{companyDetails.legalAddress.split(',')[0]}</span>
                  <br />
                  <span itemProp="addressLocality">г. Ульяновск</span>
                  <br />
                  <span itemProp="postalCode">432063</span>
                </div>
              </li>
              <li>
                <div className={s.footerLink}>
                  <strong>Почтовый адрес:</strong>
                  <br />
                  {companyDetails.postalAddress}
                </div>
              </li>
              <li>
                <div className={s.footerLink}>
                  <strong>Производство:</strong>
                  <br />
                  <a 
                    href="https://yandex.ru/maps/-/CPq6ZWNy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {companyDetails.factoryAddress}
                  </a>
                </div>
              </li>
              {/* <li>
                <div className={s.footerLink}>
                  <strong>Директор:</strong>
                  <br />
                  {companyDetails.directer}
                </div>
              </li> */}
              <li>
                <a 
                  className={s.footerLink + " link"} 
                  href={`tel:${companyDetails.phoneRaw}`}
                  itemProp="telephone"
                >
                  <strong>Телефон:</strong> {companyDetails.phone}
                </a>
              </li>
              <li>
                <a 
                  className={s.footerLink + " link"} 
                  href="tel:88422732159"
                >
                  <strong>Офис:</strong> {companyDetails.phoneOffice}
                </a>
              </li>
              <li>
                <a 
                  className={s.footerLink + " link"} 
                  href={`mailto:${companyDetails.email}`}
                  itemProp="email"
                >
                  <strong>Email:</strong> {companyDetails.email}
                </a>
              </li>
              <li>
                <a 
                  className={s.footerLink + " link"} 
                  href={`mailto:${companyDetails.email2}`}
                >
                  {companyDetails.email2}
                </a>
              </li>

              <li className={s.socRow}>
                <a 
                  className={s.footerSoc} 
                  href="https://t.me/polymertech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <Image src="/icons/tg.svg" alt="Telegram" width={44} height={44} />
                </a>
                <a 
                  className={s.footerSoc} 
                  href="https://wa.me/79278023071" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <Image src="/icons/max.svg" alt="WhatsApp" width={44} height={44} />
                </a>
                <a 
                  className={s.footerSoc} 
                  href="https://vk.com/polymertech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="VK"
                >
                  <Image src="/icons/vk.svg" alt="VK" width={44} height={44} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Company details row with microdata */}
        <div className={s.companyDetails}>
          <h3>
            Реквизиты:
          </h3>
          <div className={s.detailsGrid}>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>ИНН:</span>
              <span itemProp="taxID">{companyDetails.inn}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>КПП:</span>
              <span>{companyDetails.kpp}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>ОГРН:</span>
              <span>{companyDetails.ogrn}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>ОКПО:</span>
              <span>{companyDetails.okpo}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Р/с:</span>
              <span>{companyDetails.bankAccount}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Банк:</span>
              <span>{companyDetails.bankName}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>БИК:</span>
              <span>{companyDetails.bik}</span>
            </div>
            <div className={s.detailItem}>
              <span className={s.detailLabel}>Корр. счет:</span>
              <span>{companyDetails.correspondentAccount}</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={s.bottom}>
          <span>© {companyDetails.name} — {new Date().getFullYear()}</span>
          <span itemProp="copyrightYear">{new Date().getFullYear()}</span>

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