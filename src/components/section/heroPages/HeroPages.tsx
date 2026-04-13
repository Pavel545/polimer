"use client";

import { motion } from "framer-motion";
import s from './style.module.css';
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs';
import { ReactNode } from "react";


type HeroPages = {
    title: string;
    h1: string;
    text?: string | ReactNode;
    fon: string;
}

export default function HeroPages({ title, h1, text, fon }: HeroPages) {
    return (
        <motion.section 
            className={s.HeroPages}
            style={{ background: `url(${fon}) center / cover no-repeat` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Затемняющий overlay с анимацией */}
            <motion.div 
                className={s.heroOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Хлебные крошки */}
                <BreadCrumbs items={[{ title: title }]} />

            <div className={"container " + s.HeroPagesText}>
                <motion.div 
                    className={`${s.HeroPagesContent} ${!text && s.van}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {/* Заголовок */}
                    <motion.h1 
                        className="h1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: 0.7,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {h1}
                    </motion.h1>

                    {/* Текст (если есть) */}
                    {text && (
                        <motion.div 
                            className={s.HeroPagesContentText}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.6, 
                                delay: 0.9,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                        >
                            {text}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Декоративный элемент (необязательно) */}
            <motion.div 
                className={s.heroDecoration}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
            />
        </motion.section>
    )
}