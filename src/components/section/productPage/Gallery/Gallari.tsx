"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import s from "./Gallary.module.scss";
import Image from "next/image";
import Lightbox, { SlideItem } from "@/components/ui/Lightbox/lightbox";
import { useState } from "react";
import { GalImg } from "@/types/product";


export type Instruct = {
    title: string;
    gallery: SlideItem[];
};
export default function Gallary({ title, items }: { title: string; items: GalImg[] }) {
    const [activeItem, setActiveItem] = useState<Instruct | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const openModal = (item: Instruct) => {
        setActiveItem(item);
        setIsLightboxOpen(true);
    };

    const closeModal = () => {
        setIsLightboxOpen(false);
        setActiveItem(null);
    };
    return (
        <section className={s.gall}>
            <div className="container">
                <h2 className="h2">{title}</h2>

                <div className={s.content}>
                    <Swiper
                        className={s.swiper}
                        modules={[Navigation, Pagination]}
                        spaceBetween={12}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                allowTouchMove: true,
                            },
                            768: {
                                slidesPerView: 5,
                                allowTouchMove: true,
                            },
                        }}
                    >
                        {items.map((src, idx) => (
                            <SwiperSlide key={idx} className={s.slide}>
                                <div className={s.imageBox} onClick={() => openModal({ title: "Область приминения", gallery: items })}>
                                    <Image
                                        src={src.image}
                                        alt={`Неправильный монтаж люка ${idx + 1}`}
                                        fill
                                        className={s.image}
                                        sizes="(max-width: 768px) 100vw, 20vw"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <Lightbox
                    isOpen={isLightboxOpen}
                    images={activeItem?.gallery || []}
                    title={activeItem?.title}
                    onClose={closeModal}
                />
            </div>
        </section>
    );
}