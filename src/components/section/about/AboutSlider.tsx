"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from "framer-motion";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import s from "./AboutSlider.module.css";
import { AboutItem } from '@/types/about';

type AboutSliderProps = {
    activeItem: AboutItem
}

export default function AboutSlider({ activeItem }: AboutSliderProps) {
    return (
        <div className={s.sliderWrapper}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeItem.title}
                    className={s.slider}
                    initial={{ opacity: 0, y: 20, scale: 1.03 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    <Swiper
                        modules={[Pagination, Autoplay, EffectFade]}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        loop={true}
                        className={s.swiper}
                    >
                        {activeItem.gallery.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={s.slide}
                                    style={{
                                        background: `url(${image.src}) center/cover no-repeat`,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className={s.sliderContent}>
                      

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            {activeItem.text}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}