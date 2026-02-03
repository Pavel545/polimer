import Image from "next/image";
import s from "./style.module.css";

export default function Footer() {
    const link = [
        {
            href: "#",
            text: "Продукция",
        },
        {
            href: "#",
            text: "О нас",
        },
        {
            href: "#",
            text: "Блог",
        },
        {
            href: "#",
            text: "Вакансии",
        },
    ];
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footerContant}>
                    <a href="/" className={s.footerLogo + " flex-center"}>
                        <Image src="/logo.png" alt="" width={176} height={36} />
                    </a>

                    <nav>
                        <ul className="flex-col">
                            {link.map((e, i) => (
                                <li key={i}>
                                    <a className={s.footerLink + " link"} href={e.href}>
                                        {e.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav>
                        <ul className="flex-col">
                            <li>
                                <a className={s.footerLink + " link"} href="">
                                    432070, Россия, г. Ульяновск, <br /> ул. Урицкого, д. 58, 3 этаж
                                </a>
                            </li>
                            <li>
                                <a className={s.footerLink + " link"} href="tel:+79677717986">+7 (967) 771-79-86</a>
                            </li>
                            <li>
                                <a className={s.footerLink + " link"} href="mailto:73polimer@mail.ru">73polimer@mail.ru</a>
                            </li>
                            <li className="flex">
                                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                                    <Image src={'/icons/tg.svg'} alt="Tellegram" width={50} height={50} />
                                </a>

                                <a className={s.footerSoc} href="http://" target="_blank" rel="noopener noreferrer">
                                    <Image src={'/icons/vk.svg'} alt="Tellegram" width={50} height={50} />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}