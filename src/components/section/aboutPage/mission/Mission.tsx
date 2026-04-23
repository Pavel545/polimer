import Image from "next/image";
import s from "./style.module.css";

export default function Mission() {



    return (
        <>
           <div className={s.fon}>
             <section className={s.Mission}>
                <div className="container">

                    <h2 className="h2">
                        Миссия компании:
                    </h2>
                    <br />
                    <br />
                    <div className={s.boxText}>
                        <p>
                            Миссия компании Полимерные Технологии - СДЕЛАТЬ МИР ЧИЩЕ!
                        </p>
                    </div>


                </div>
            </section>
            <section className={s.Mission}>
                <div className="container">
                    <h2 className="h2">
                        История компании:
                    </h2>
                    <div className={s.content}>
                        <div className={s.boxText}>
                            <p>
                                Организация ООО «Полимерные Технологии» основана в 2010 году, как компания по производству полимерно-песчаных изделий и переработки вторичного сырья.                        </p>

                        </div>
                        <div className={s.gridImg}>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/1-1.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                             <div className={s.imgBox}>
                                <Image src={"/img/about/info/1-3.png"} alt="Российская экологическая академия" width={600} height={400} />

                            </div>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/1-2.png"} alt="Российская экологическая академия" width={600} height={400} />

                            </div>
                           
                        </div>


                    </div>
                </div>
            </section>
            <section className={s.Mission}>
                <div className="container">
                    <h2 className="h2">
                        Производство и продукция:
                    </h2>
                    <div className={s.content}>
                        <div className={s.boxText}>
                            <p>
                                С 2010 года компания Полимерные Технологии производит и оптом реализует по всей России качественные полимерно-песчаные люки, полимерно-песчаную тротуарную плитку, полимерно-песчаные водоотводы и поребрики.
                            </p>

                        </div>
                        <div className={s.gridImg}>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/2-1.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/2-2.jpg"} alt="Российская экологическая академия" width={600} height={400} />

                            </div>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/2-3.jpg"} alt="Российская экологическая академия" width={600} height={400} />

                            </div>
                        </div>


                    </div>

                </div>
            </section>

            <section className={s.Mission}>
                <div className="container">
                    <h2 className="h2">
                        Контроль качества:
                    </h2>
                    <div className={s.content}>
                        <div className={s.boxText}>
                            <p>
                                Комплексный производственный подход начиная от закупки исходного сырья, его дальнейшей переработки в полимерно-песчаные изделия позволяет компании Полимерные Технологии быть уверенным в качестве производимой продукции.
                            </p>

                        </div>
                        <div className={s.gridImg2}>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/3.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/3-1.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className={s.Mission}>
                <div className="container">
                    <h2 className="h2">
                        Ценность в работе с клиентами:
                    </h2>
                    <div className={s.content}>
                        <div className={s.boxText}>
                            <p>
                                Компания Полимерные Технологии максимально клиенториентирована и предоставляет по запросу покупателей всю необходимую информацию о своей продукции: сертификаты, протоколы испытаний, инструкции по выбору, установке и эксплуатации всех производимых полимерно-песчаных изделий.
                            </p>

                        </div>
                        <div className={s.gridImg1}>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/4.jpg"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className={s.Mission}>
                <div className="container">
                    <h2 className="h2">
                        Экологические проекты:
                    </h2>
                    <div className={s.content}>
                        <div className={s.boxText}>
                            <ul>
                                <li >ООО «Полимерные Технологии» являемся партнерами Российской Экологической Академии в Приволжском федеральном округе и поддерживаем многие экологические проекты:</li>
                                <li >«Разделяй и умножай» </li>
                                <li >«Предприятие без отходов» </li>
                                <li >«Добрые крышечки»</li>
                                <li >«Чистые игры» </li>

                            </ul>


                        </div>
                        <div className={`${s.gridImg2} ${s.gridImgEco}`}>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/5-1.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                            <div className={s.imgBox}>
                                <Image src={"/img/about/info/5-2.png"} alt="Российская экологическая академия" width={600} height={400} />
                            </div>
                        </div>


                    </div>
                </div>
            </section>
           </div>
        </>
    )
}