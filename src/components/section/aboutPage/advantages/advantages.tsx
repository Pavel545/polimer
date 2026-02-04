import Image from "next/image";
import s from "./style.module.css";

export default function AboutAdvantages() {
  return (
    <section className={s.advantages}>
      <div className="container">
        <h2 className="h2">Наши преимущества</h2>

        <div className={s.advantagesContent}>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/aboutPage/advantages1.jpg"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>

            <div className={s.advantagesContentItemText}>
              <h3>Ваш логотип на люке</h3>

              <p>
                По запросу мы размещаем логотипы и контактные данные на
                полимерпесчаных люках наших клиентов. Поскольку срок службы
                полимерпесчаных люков практически неограничен, то это очень
                выгодное вложение в бренд клиента и в его рекламу
              </p>
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemText}>
              <h3>Люки с запорным устройством</h3>

              <p>
                Наши полимерпесчаные люки могут комплектоваться запорным
                устройством, которое исключает легкое открытие полимерпесчаного
                канализационного люка без специального ключа
              </p>
            </div>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/aboutPage/advantages2.jpg"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemImg}>
              <Image
                src={"/img/aboutPage/advantages3.jpg"}
                alt="Пример использования продукции"
                width={675}
                height={282}
              />
            </div>

            <div className={s.advantagesContentItemText}>
              <h3>Доставка люком до клиента</h3>

              <p>
                Наша собственная служба логистики обеспечивает быструю и
                надежную доставку товаров напрямую от склада к вашим клиентам по
                всей территории России. Мы гарантируем оперативность – доставку
                в кратчайшие сроки, без задержек и с учетом ваших требований.
                Надежность — профессиональный подход и контроль на каждом этапе
                пути, чтобы ваш товар дошел вовремя и в отличном состоянии
              </p>
            </div>
          </div>
          <div className={s.advantagesContentItem}>
            <div className={s.advantagesContentItemText}>
              <h3>Постоянный неснижаемый складской запас</h3>
              <p>
                Наши полимерпесчаные люки могут комплектоваться запорным
                устройством, которое исключает легкое открытие полимерпесчаного
                канализационного люка без специального ключа
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
