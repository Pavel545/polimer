import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

type BaseProps = {
  children: ReactElement;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number; // сколько блока видно для запуска (0..1)
};

const easeSoft: [number, number, number, number] = [0.22, 1, 0.36, 1]; // easeOut-ish
const easeStandard: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const vp = (once = true, amount = 0.15) => ({ once, amount });
export const FadeInUp = ({
  children,
  delay = 0,
  distance = -600,     // насколько «снизу» вылетает
  duration = 0.5,
  className = '',
}: {
  children: ReactElement;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance, scale:0.95 }}
    whileInView={{ opacity: 1, y: 0, scale:1 }}
    viewport={{ once: true, amount: 0.1 }}  // появляется, когда 20% блока видно
    transition={{
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1],           // плавное cubic-bezier движение
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/** 1) Просто плавное появление */
export const Fade = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.15,
}: BaseProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={vp(once, amount)}
    transition={{ duration, delay, ease: easeStandard }}
    className={className}
  >
    {children}
  </motion.div>
);

/** 2) Мягкий подъём вверх (универсальный для секций/карточек) */
export const Lift = ({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  amount = 0.15,
}: BaseProps & { distance?: number }) => {
  const distance = 24; // оптимально “дорого”, не прыгает
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp(once, amount)}
      transition={{ duration, delay, ease: easeSoft }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** 3) Слайд слева (мягче чем -50) */
export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.75,
  className = "",
  once = true,
  amount = 0.2,
}: BaseProps & { distance?: number }) => {
  const distance = 28;
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={vp(once, amount)}
      transition={{ duration, delay, ease: easeSoft }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** 4) Слайд справа */
export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.75,
  className = "",
  once = true,
  amount = 0.2,
}: BaseProps & { distance?: number }) => {
  const distance = 28;
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={vp(once, amount)}
      transition={{ duration, delay, ease: easeSoft }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** 5) Мягкий scale-in (хорошо для кнопок/цифр/иконок) */
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}: BaseProps & { from?: number }) => {
  const from = 0.96; // слегка, чтобы не было “попапа”
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={vp(once, amount)}
      transition={{ duration, delay, ease: easeSoft }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** 6) Blur-in (премиально, но аккуратно) */
export const BlurIn = ({
  children,
  delay = 0,
  duration = 0.75,
  className = "",
  once = true,
  amount = 0.2,
}: BaseProps & { blur?: number; distance?: number }) => {
  const blur = 10;
  const distance = 18;
  return (
    <motion.div
      initial={{ opacity: 0, y: distance, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={vp(once, amount)}
      transition={{ duration, delay, ease: easeSoft }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** 7) Reveal по “маске” сверху вниз (круто для заголовков/картинок) */
export const RevealDown = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
  amount = 0.2,
}: BaseProps) => (
  <motion.div
    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 16px)" }}
    whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 16px)" }}
    viewport={vp(once, amount)}
    transition={{ duration, delay, ease: easeSoft }}
    className={className}
  >
    {children}
  </motion.div>
);

/** 8) Stagger контейнер — чтобы дети появлялись по очереди */
export const Stagger = ({
  children,
  delay = 0,
  stagger = 0.08,
  className = "",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once, amount }}
    transition={{ delayChildren: delay, staggerChildren: stagger }}
    className={className}
  >
    {children}
  </motion.div>
);

/** 9) StaggerItem — элемент внутри Stagger */
export const StaggerItem = ({
  children,
  duration = 0.65,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 18, scale: 0.98 },
      show: { opacity: 1, y: 0, scale: 1 },
    }}
    transition={{
      duration,
      ease: [0.22, 1, 0.36, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);
