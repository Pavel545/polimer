import Image from "next/image";
import s from "./style.module.css";

export default function Header() {
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
        <header className={s.header}>
            <div className={"container flex-sb " + s.headerContent}>
                <div className="flex-sb">
                    <a href="/" className={s.headerLogo + " flex-center"}>
                        <Image src="/logo.png" alt="" width={176} height={36} />
                    </a>

                    <nav>
                        <ul className={s.headerLinkBox}>
                            {link.map((e, i) => (
                                <li key={i}>
                                    <a className={s.headerLink} href={e.href}>
                                        {e.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={s.headerButBox + " flex-center"}>
                    <a className={s.headerTel + " flex-center " + s.headerTel} href="tel:+79278023071">
                        <Image src="/icons/tel.svg" alt="" width={12} height={12} />
                        8 (927) 802-30-71
                    </a>

                    <button className={"butt " + s.headerButt}>
                        Оставить заявку
                    </button>

                    <button className={s.headerButtChat + " flex-center"}>
                        <Image src={'/icons/chat.svg'} alt="" width={20} height={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
