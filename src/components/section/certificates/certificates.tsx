"use client";

import s from "./certificates.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

type CertificateItem = {
    id: number;
    title: string;
    text: string;
    gallery: string[];
    file: string;
};

export default function Certificates() {
    const [activeItem, setActiveItem] = useState<CertificateItem | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const startXRef = useRef(0);
    const currentXRef = useRef(0);

    const items: CertificateItem[] = useMemo(
        () => [
            {
                id: 1,
                title: "Сертификат соответствия",
                text: "Регистрационный номер РОСС RU.32001.04ИБФ1.ОСП32.92223",
                gallery: [
                    "/img/certificates/Сертификат_1.webp",
                    "/img/certificates/Сертификат_2.webp",
                ],
                file: "/docs/certificates/Сертификат соответствия.pdf",
            },
            {
                id: 2,
                title: "Протокол испытаний",
                text: "№85783-ТЕХП/25 от 29.12.2025",
                gallery: [
                    "/img/certificates/ПРОТОКОЛ_1.jpg",
                    "/img/certificates/ПРОТОКОЛ_2.jpg",
                    "/img/certificates/ПРОТОКОЛ_3.jpg",
                ],
                file: "/docs/certificates/Протокол испытаний.pdf",
            },
        ],
        []
    );

    const openModal = (item: CertificateItem) => {
        setActiveItem(item);
        setCurrentSlide(0);
        setIsClosing(false);
        setDragX(0);
        setIsDragging(false);
    };

    const closeModal = () => {
        setIsClosing(true);

        window.setTimeout(() => {
            setActiveItem(null);
            setCurrentSlide(0);
            setIsClosing(false);
            setDragX(0);
            setIsDragging(false);
        }, 280);
    };

    const nextSlide = () => {
        if (!activeItem) return;
        setCurrentSlide((prev) => (prev + 1) % activeItem.gallery.length);
        setDragX(0);
    };

    const prevSlide = () => {
        if (!activeItem) return;
        setCurrentSlide((prev) =>
            prev === 0 ? activeItem.gallery.length - 1 : prev - 1
        );
        setDragX(0);
    };

    useEffect(() => {
        if (!activeItem) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [activeItem]);

    const handleDragStart = (clientX: number) => {
        startXRef.current = clientX;
        currentXRef.current = clientX;
        setIsDragging(true);
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        currentXRef.current = clientX;
        setDragX(clientX - startXRef.current);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        const delta = currentXRef.current - startXRef.current;
        const threshold = 70;

        if (delta > threshold) {
            prevSlide();
        } else if (delta < -threshold) {
            nextSlide();
        }

        setIsDragging(false);
        setDragX(0);
    };

    return (
        <>
            <section className={s.Certificates}>
                <div className="container">
                    <div className={s.CertificatesContent}>
                        <h2 className="h2">Сертификаты и протокол</h2>

                        <div className={s.certificatesGrid}>
                            {items.map((item) => (
                                <div key={item.id} className={s.certificatesItem}>
                                    <div className={s.certificatesInfo}>
                                        <h3 className="h3">{item.title}</h3>
                                        <p className={s.certificatesText}>{item.text}</p>

                                        <div className={s.certificatesActions}>
                                            <button
                                                type="button"
                                                className={s.certificatesLink}
                                                onClick={() => openModal(item)}
                                            >
                                                Смотреть
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className={s.certificatesPreview}
                                        onClick={() => openModal(item)}
                                        aria-label={`Открыть ${item.title}`}
                                    >
                                        <img
                                            src={item.gallery[0]}
                                            alt={item.title}
                                            className={s.certificatesPreviewImage}
                                            draggable={false}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {activeItem && (
                <div
                    className={`${s.lightbox} ${isClosing ? s.lightboxClosing : s.lightboxOpen}`}
                    onClick={closeModal}
                >
                    <button
                        type="button"
                        className={`${s.navBtn} ${s.navPrev}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            prevSlide();
                        }}
                        aria-label="Предыдущий слайд"
                    >
                        ‹
                    </button>

                    <div
                        className={`${s.lightboxContent} ${isClosing ? s.contentClosing : s.contentOpen}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className={s.closeBtn}
                            onClick={closeModal}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>

                        <div
                            className={s.imageFrame}
                            onMouseDown={(e) => handleDragStart(e.clientX)}
                            onMouseMove={(e) => handleDragMove(e.clientX)}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                            onTouchEnd={handleDragEnd}
                        >
                            <div
                                className={`${s.sliderTrack} ${isDragging ? s.sliderTrackDragging : ""}`}
                                style={{
                                    transform: `translateX(calc(-${currentSlide * 100}% + ${dragX}px))`,
                                }}
                            >
                                {activeItem.gallery.map((image, index) => (
                                    <div className={s.slide} key={`${activeItem.id}-${index}`}>
                                        <img
                                            src={image}
                                            alt={`${activeItem.title} ${index + 1}`}
                                            className={s.slideImage}
                                            draggable={false}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`${s.navBtn} ${s.navNext}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                        }}
                        aria-label="Следующий слайд"
                    >
                        ›
                    </button>

                    {activeItem.gallery.length > 1 && (
                        <div className={s.counter}>
                            {currentSlide + 1} / {activeItem.gallery.length}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}