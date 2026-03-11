"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import s from "./style.module.css";
import {
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  BlurIn,
  RevealDown,
  Stagger,
  StaggerItem,
} from "@/components/ui/Motion";

export default function About() {
  const details = [
    {
      icon: "/icons/about/1.svg",
      title: "Ваш логотип на люке",
      text: "Ваш логотип на люке и Ваши контактные данные - это самое лучшее вложение в рекламу!",
    },
    {
      icon: "/icons/about/4.svg",
      title: "Доставка люки до клиента",
      text: "Собственная служба логистики доставит товар заказчикам по всей территории России",
    },
    {
      icon: "/icons/about/2.svg",
      title: "Люки с запорным устройством",
      text: "Постоянный неснижаемый складской запас люков обеспечит потребности большинства клиентов",
    },
    {
      icon: "/icons/about/3.svg",
      title: "Неснижаемый складской запас",
      text: "Постоянный неснижаемый складской запас люков обеспечит потребности большинства клиентов",
    },
  ];

  return (
    <section className={s.about}>
      {/* Декоративный блок с параллакс эффектом */}
      <motion.div 
        className={s.aboutDecorative}
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container">
        {/* Заголовок секции */}
        <RevealDown delay={0.1} amount={0.2}>
          <h2 className={"h2 " + s.aboutTitle}>
            О нас
          </h2>
        </RevealDown>

        {/* Первый блок с текстом */}
        <div className={s.aboutContent}>
          {/* Левая колонка с заголовком */}
          <SlideInLeft delay={0.2} amount={0.2}>
            <motion.h3 
              className="h2"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              Полимерные технологии
            </motion.h3>
          </SlideInLeft>

          {/* Правая колонка с текстом */}
          <SlideInRight delay={0.3} amount={0.2}>
            <div className={s.aboutText}>
              <Stagger stagger={0.15} amount={0.2}>
                <StaggerItem>
                  <motion.p
                    whileHover={{ 
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Мы являемся ведущим российским производителем и поставщиком современных
                    решений для инженерных систем. С момента основания мы
                    специализируемся на разработке и выпуске высококачественных
                    полимерных люков, которые идеально подходят для эксплуатации в
                    различных условиях: от жилых и коммерческих зданий до промышленных
                    объектов.
                  </motion.p>
                </StaggerItem>
                
                <StaggerItem>
                  <motion.p
                    whileHover={{ 
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Наши продукты отличаются долговечностью, прочностью и
                    устойчивостью к коррозии, что делает их надежным выбором для
                    любого проекта. Мы ориентированы на инновации и постоянно
                    совершенствуем технологии производства, чтобы предложить клиентам
                    самые современные и экологичные решения
                  </motion.p>
                </StaggerItem>
              </Stagger>

              {/* Ссылка "Подробнее" */}
              <ScaleIn delay={0.6} amount={0.2}>
                <motion.a 
                  href="/about-us" 
                  className="link"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Подробнее
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{ display: 'inline-block', marginLeft: '5px' }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </ScaleIn>
            </div>
          </SlideInRight>
        </div>

        {/* Второй блок с карточками */}
        <div className={s.aboutContent}>
          {/* Левая часть - сетка карточек */}
            <Stagger  className={s.aboutBotLeft} stagger={0.1} delay={0.4} amount={0.2}>
              {details.map((e, i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    className={s.aboutBotLeftItem}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Иконка */}

  <Image 
    src={e.icon} 
    alt={e.title} 
    width={47} 
    height={47} 
    style={{
      maxWidth: '100%',
      height: 'auto',
      objectFit: 'contain'
    }}
  />

                    {/* Заголовок */}
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {e.title}
                    </motion.h3>

                    {/* Текст */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      {e.text}
                    </motion.p>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

          {/* Правая часть - большая карточка с фоном */}
          <BlurIn delay={0.8} amount={0.2}>
            <motion.div 
              className={s.aboutBotRight}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Доставка люки до клиента
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                Собственная служба логистики доставит товар заказчикам по всей
                территории России. Быстрая и надежная доставка в любой регион
                с отслеживанием груза в реальном времени.
              </motion.p>
            </motion.div>
          </BlurIn>
        </div>
      </div>
    </section>
  );
}