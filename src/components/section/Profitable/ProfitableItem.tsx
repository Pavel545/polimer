"use client";
import {  motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import s from "./Profitable.module.scss";

export type ItemType = {
    id: string;
    align: "left" | "right";
    title: string;
    subtitle: string;
    text: string;
};

const itemVariants: Variants = {
    hidden: (align: string) => ({
        opacity: 0,
        x: align === "left" ? -100 : 100,
        y: 50,
    }),
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const countVariants: Variants = {

    hover: {
        opacity: 0.8,
        transition: { duration: 0.6},
    },
};

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: 0.2 },
    },
    hover: (isRight: boolean) => ({
        scale: 0.9,
        x: isRight ? 70 : -70,
        transition: { duration: 0.6},
    }),
};

const textVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.4 },
    },

    visible: {
        opacity: 0.5,
        y: 0,
        transition: { duration: 0.4 },
    },

    hover: (isRight: boolean) => ({
        scale: 1.1,
        x: isRight ? -30 : 30,
        opacity: 1,
        transition: { duration: 0.4 },
    }),
};

export default function ProfitableItem({ item }: { item: ItemType }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: "50px",
    });

    const isRight = item.align === "right";

    return (
        <motion.div
            ref={ref}
            className={`${s.item} ${s[item.align]}`}
            variants={itemVariants}
            custom={item.align}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover="hover"

        >
            <motion.span
                className={s.count}
                variants={countVariants}
                transition={{
                    type: "tween",
                    stiffness: 120,
                    damping: 20,
                }}
            >
                {item.id}
            </motion.span>

            <motion.h3
                className={s.h3}
                variants={titleVariants}
                custom={isRight}
                transition={{
                    type: "tween",
                    stiffness: 120,
                    damping: 20,
                }}
            >
                {item.title} <br />
                <span>{item.subtitle}</span>
            </motion.h3>

            <motion.p
                className={s.text}
                variants={textVariants}
                custom={isRight}
                transition={{
                    type: "tween",
                    stiffness: 120,
                    damping: 20,
                }}
            >
                {item.text}
            </motion.p>
        </motion.div>
    );
}