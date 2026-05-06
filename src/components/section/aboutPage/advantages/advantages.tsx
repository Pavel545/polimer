import Image from "next/image";
import s from "./style.module.css";

export default function AboutAdvantages() {
  return (
    <section className={s.advantages}>
      <div className="container">
        <h2 className="h2">Наши преимущества:</h2>

        <div className={s.advantagesContent}>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/products/luk-gts/5.jpg"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>

            <div className={s.advantagesContentItemText}>
              <h3>Логотип на люке:</h3>

              <p>
         По запросу клиентов компания Полимерные Технологии размещает логотипы и контактные данные на полимерно-песчаных люках своих клиентов. Поскольку срок службы полимерно-песчаных люков практически неограничен, то это очень выгодное вложение в бренд клиента и в его рекламу.
              </p>
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemText}>
              <h3>Люки с запорным устройством:</h3>

              <p>
              Полимерно-песчаные люки тип «Л», «ЛУ», «С», «Т»  компании Полимерные Технологии могут оснащаться защитно-запорным устройством (ЗЗУ) для ограничения случайного доступа к коммуникациям и инженерным сетям клиентов.
              </p>
            </div>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/products/lyuk-s-zapornym-ustroistvom/2.webp"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/about/info/6.png"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>

            <div className={s.advantagesContentItemText}>
              <h3>Доставка до клиента:</h3>

              <p>
               Компания Полимерные Технологии имеет собственную службу логистики. Это позволяет доставлять весть спектр производимой полимерно-песчаной продукции до клиентов по всей территории России максимально оперативно.
              </p>
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemText}>
              <h3>Постоянный неснижаемый складской запас</h3>
              <p>
            Неснижаемый складской запас основных позиций полимерно-песчаных изделий позволяет компании Полимерные Технологии оперативно производить отгрузки и доставку всей продукции клиентам в сезон активных продаж.
              </p>
            </div>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/aboutPage/advantages4.jpg"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
