"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  Stagger,
  StaggerItem
} from "@/components/ui/Motion";
import s from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={s.hero}>
      <div className="container">
        <h2 className={`h2 ${s.heroTitle}`}>
          О нас
        </h2>

        <div className={s.heroContent}>
          <motion.div
            className={s.heroDecorative}
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <SlideInRight delay={0.3} amount={0.2}>
            <div className={s.heroText}>
              <Stagger stagger={0.15} amount={0.2}>
                <StaggerItem>
                  <SlideInLeft delay={0.2} amount={0.2}>
                    <motion.h3
                      className={`h2 ${s.heroTitle}`}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      Полимерные технологии
                    </motion.h3>
                  </SlideInLeft>
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

              <ScaleIn delay={0.6} amount={0.2}>
                <motion.div
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/about-us" className="link">
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
                  </Link>
                </motion.div>
              </ScaleIn>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}