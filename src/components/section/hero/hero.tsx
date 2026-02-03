import { text } from "stream/consumers";
import s from "./style.module.css";
import Image from "next/image";

export default function Hero() {
    const advantages = [
        {
            icon: '/icons/about/4.svg',
            text: 'доставка по всей россии от нас до клиента'
        },
        {
            icon: '/icons/advantages/2.svg',
            text: 'большой складской запас продукции'
        },
        {
            icon: '/icons/about/2.svg',
            text: 'Люки с запорным устройством'
        },
        {
            icon: '/icons/about/1.svg',
            text: 'логотип вашей компании на люках'
        },
    ]

    return (
        <section className={s.hero}>
            <div className={s.heroPs}>
                <div className="container flex-center">
                    <p className={s.heroPsText}>
                        На нашем сайте работает удобный чат-бот, который с удовольствием ответит на все ваши вопросы и поможет найти нужную информацию
                    </p>
                </div>

            </div>
            <div className="container">

                <div className={s.heroContent}>
                    <h1 className="h1">
                        полимерпесчанные технологии
                    </h1>

                    <p>
                        Более 12 лет мы стабильно производим полимерпесчаные люки, тротуарную плитку, бордюры и водоотводы, гарантируя высокое качество и надежность нашей продукции
                    </p>


                    <button className="butt">
                        Скачать прайс-лист
                    </button>
                </div>
            </div>

            <div className={s.heroAdvantages}>
                <div className="container flex-sb">
                    {
                        advantages.map((e, i) => (
                            <div key={i} className={s.heroAdvantagesItem + " flex-center"}>
                                <Image src={e.icon} alt={e.text} width={47} height={47} />

                                <p>
                                    {e.text}
                                </p>
                            </div>


                        ))
                    }
                </div>
            </div>
        </section>
    )
}