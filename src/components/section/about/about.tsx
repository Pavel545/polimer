"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import s from "./style.module.css";

type AboutItem = {
  icon: string
  title: string
  text: string
  img: string
}


import {
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  BlurIn,
  RevealDown,
  Stagger,
  StaggerItem,
} from "@/components/ui/Motion";
import { useState } from "react";

export default function About() {
  const details: AboutItem[] = [
    {
      icon: "/icons/about/1.svg",
      title: "Ваш логотип на люке",
      text: "Ваш логотип на люке и Ваши контактные данные - это самое лучшее вложение в рекламу!",
      img:"/img/about/ad1.jpg",
    },
    {
      icon: "/icons/about/4.svg",
      title: "Доставка люки до клиента",
      text: "Собственная служба логистики доставит товар заказчикам по всей территории России",
      img:"/img/about/ad2.jpg",
    },
    {
      icon: "/icons/about/2.svg",
      title: "Люки с запорным устройством",
      text: "Постоянный неснижаемый складской запас люков обеспечит потребности большинства клиентов",
      img:"/img/about/ad3.jpg",
    },
    {
      icon: "/icons/about/3.svg",
      title: "Неснижаемый складской запас",
      text: "Постоянный неснижаемый складской запас люков обеспечит потребности большинства клиентов",
      img:"/img/about/ad4.jpg",
    },
  ];

  const [activeAbout, setActiveAbout] = useState<AboutItem>(details[0]);


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
      onMouseEnter={() => setActiveAbout(e)}
      animate={{
        opacity: activeAbout.title === e.title ? 1 : 0.7,
        scale: activeAbout.title === e.title ? 1.03 : 1
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
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
  <div className={s.aboutBotRight}>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeAbout.img}
        className={s.aboutBotRightInner}
        style={{
          background: `url(${activeAbout.img}) center/cover no-repeat`,
        }}
        initial={{ opacity: 0, y: 20, scale: 1.03 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {activeAbout.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {activeAbout.text}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  </div>
</BlurIn>
        </div>
      </div>
    </section>
  );
}