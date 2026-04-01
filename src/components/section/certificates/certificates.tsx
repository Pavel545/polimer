"use client";

import { useMemo, useState } from "react";
import s from "./certificates.module.css";
import Lightbox from "@/components/ui/Lightbox/lightbox";

type CertificateItem = {
    id: number;
    title: string;
    text: string;
    gallery: string[];
    file: string;
};

export default function Certificates() {
    const [activeItem, setActiveItem] = useState<CertificateItem | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
        setIsLightboxOpen(true);
    };

    const closeModal = () => {
        setIsLightboxOpen(false);
        setActiveItem(null);
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

            <Lightbox
                isOpen={isLightboxOpen}
                images={activeItem?.gallery || []}
                title={activeItem?.title}
                onClose={closeModal}
            />
        </>
    );
}   