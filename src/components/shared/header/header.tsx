"use client";

import Image from "next/image";
import s from "./style.module.css";
import { useModal } from "@/components/providers/ModalProvider";
import { JSX, useEffect, useState } from "react";

type NavLink = {
  href: string;
  text: string;
};

export default function Header(): JSX.Element {
  const { openRequest } = useModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const links: NavLink[] = [
    { href: "#", text: "Продукция" },
    { href: "/about-us", text: "О нас" },
    { href: "#", text: "Блог" },
    { href: "#", text: "Вакансии" },
  ];

  const closeMenu = (): void => setIsOpen(false);
  const toggleMenu = (): void => setIsOpen((v) => !v);

  // ESC закрывает меню
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Блокируем скролл страницы, когда меню открыто
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={s.header}>
      <div className={"container " + s.headerContent}>
        {/* left */}
        <div className={s.left}>
          <a href="/" className={s.headerLogo + " flex-center"}>
            <Image src="/logo.png" alt="Logo" width={176} height={36} />
          </a>

          {/* desktop nav */}
          <nav className={s.navDesktop}>
            <ul className={s.headerLinkBox}>
              {links.map((e, i) => (
                <li key={i}>
                  <a className={s.headerLink} href={e.href}>
                    {e.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* right */}
        <div className={s.right}>
          {/* desktop actions */}
          <div className={s.actionsDesktop + " flex-center"}>
            <a
              className={s.headerLink + " flex-center " + s.headerTel}
              href="tel:+79278023071"
            >
              <Image src="/icons/tel.svg" alt="" width={12} height={12} />
              8 (927) 802-30-71
            </a>

            <button onClick={openRequest} className={"butt " + s.headerButt}>
              Оставить заявку
            </button>

            <button className={s.headerButtChat + " flex-center"} aria-label="Открыть чат">
              <Image src="/icons/chat.svg" alt="" width={20} height={20} />
            </button>
          </div>

          {/* burger (mobile) */}
          <button
            type="button"
            className={s.burger}
            onClick={toggleMenu}
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className={s.burgerLine + " " + (isOpen ? s.lineTopOpen : "")} />
            <span className={s.burgerLine + " " + (isOpen ? s.lineMidOpen : "")} />
            <span className={s.burgerLine + " " + (isOpen ? s.lineBotOpen : "")} />
          </button>
        </div>
      </div>

      {/* overlay */}
      <div
        className={s.overlay + " " + (isOpen ? s.overlayOpen : "")}
        onClick={closeMenu}
      />

      {/* mobile panel */}
      <aside
        id="mobile-menu"
        className={s.mobilePanel + " " + (isOpen ? s.mobilePanelOpen : "")}
        aria-hidden={!isOpen}
      >
        <nav className={s.navMobile}>
          <ul className={s.mobileLinks}>
            {links.map((e, i) => (
              <li key={i}>
                <a className={s.mobileLink} href={e.href} onClick={closeMenu}>
                  {e.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.mobileActions}>
          <a className={s.mobileTel} href="tel:+79278023071" onClick={closeMenu}>
            <Image src="/icons/tel.svg" alt="" width={14} height={14} />
            8 (927) 802-30-71
          </a>

          <button
            type="button"
            onClick={() => {
              closeMenu();
              openRequest();
            }}
            className={"butt " + s.mobileBtn}
          >
            Оставить заявку
          </button>

          <button type="button" className={s.mobileChat} aria-label="Открыть чат">
            <Image src="/icons/chat.svg" alt="" width={22} height={22} />
          </button>
        </div>
      </aside>
    </header>
  );
}
