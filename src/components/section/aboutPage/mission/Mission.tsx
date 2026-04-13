import Image from "next/image";
import s from "./style.module.css";

export default function Mission() {



    return (
        <section className={s.Mission}>
            <div className="contauner">
                <h2 className="h2">
                    Миссия компании Полимерные Технологии - СДЕЛАТЬ МИР ЧИЩЕ!
                </h2>

                <div className={s.content}>
                    <div className={s.imgBox}>
                        <Image src={"/img/aboutPage/eko1.jpg"} alt="Российская экологическая академия" width={600} height={400} />
                    </div>

                    <div className={s.boxText}>

                        <h3>
                            Производство и продукция:
                        </h3>
                        <p>
                            С 2010 года компания Полимерные Технологии производит и оптом реализует по всей России качественные полимерпесчаные люки, полимерпесчаную тротуарную плитку, полимерпесчаные водоотводы.
                        </p>
                        <h3>
                            Доставка и логистика:
                        </h3>
                        <p>
                            ООО "Полимерные Технологии" имеет собственную службу логистики и доставляет полимерпесчаные люки до клиента в любой регион и город России.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}