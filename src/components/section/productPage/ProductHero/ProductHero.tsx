"use client";

import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";
import s from "./style.module.scss";
import { JSX, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ProductEntity, ProductImage } from "@/types/product";
import { useModal } from "@/components/providers/ModalProvider";
import {
  Fade,
  Lift,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  BlurIn,
  RevealDown,
  Stagger,
  StaggerItem,
} from "@/components/ui/Motion";

function formatRub(v: number): string {
  return new Intl.NumberFormat("ru-RU").format(v);
}

type Props = {
  product: ProductEntity;
};

export default function ProductHero({ product }: Props): JSX.Element {
  const router = useRouter();
  const { openRequest } = useModal();
  const variant = product.variants[0];
  const [mounted, setMounted] = useState(false);
  const imagesSorted = useMemo(() => {
    return [...variant.images].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  }, [variant.images]);

  const [activeColorId, setActiveColorId] = useState<string>(
    variant.colors[0]?.id ?? "",
  );
  useEffect(() => {
    // Сбрасываем состояние при монтировании
    setMounted(true);
    return () => setMounted(false);
  }, [product]);

  const [activeImageId, setActiveImageId] = useState<string>(() => {
    const first = imagesSorted.find(
      (i) => i.colorId === (variant.colors[0]?.id ?? ""),
    );
    return first?.id ?? imagesSorted[0]?.id ?? "";
  });

  const activeImage = useMemo(() => {
    return imagesSorted.find((i) => i.id === activeImageId) ?? imagesSorted[0];
  }, [imagesSorted, activeImageId]);

  const handleColorPick = (colorId: string) => {
    setActiveColorId(colorId);
    const firstOfColor = imagesSorted.find((img) => img.colorId === colorId);
    if (firstOfColor) setActiveImageId(firstOfColor.id);
  };

  const handleThumbPick = (img: ProductImage) => {
    setActiveImageId(img.id);
    if (img.colorId !== activeColorId) {
      setActiveColorId(img.colorId);
    }
  };

  return (
    <section  className={s.pHero}>
      <BreadCrumbs items={[{ title: "Продукция", href: "/products" }, { title: product.titleShort }]} />

      <div className="container">
        <div className={s.pHeroContent}>
          {/* GALLERY - левая колонка */}
          <SlideInLeft delay={0.2} amount={0.2} className={s.gallery}>
            <>
              <BlurIn delay={0.3} amount={0.2}>
                <div className={s.galleryPrev}>
                  <AnimatePresence mode="wait">
                    {activeImage && (
                      <motion.div
                        key={activeImage.id}
                        className={s.galleryImage}
                        initial={{
                          opacity: 0,
                          scale: 1.08,
                          filter: "blur(8px)"
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)"
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.94,
                          filter: "blur(6px)"
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <Image
                          src={activeImage.url}
                          alt={activeImage.alt ?? product.titleFull}
                          fill
                          priority={activeImageId === imagesSorted[0]?.id}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </BlurIn>

              <Stagger stagger={0.05} delay={0.4} amount={0.2}>
                <div className={s.galleryList} role="list">
                  {imagesSorted.map((img, index) => (
                    <StaggerItem key={img.id}>
                      <motion.div
                        className={`${s.card} ${img.id === activeImageId ? s.cardActive : ''}`}
                        onClick={() => handleThumbPick(img)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          rotateY: img.id === activeImageId ? 180 : 0,
                          opacity: img.id === activeImageId ? 1 : 0.6
                        }}
                        transition={{
                          rotateY: { duration: 0.8, ease: "easeInOut" },
                          opacity: { duration: 1.25, ease: "easeInOut" }
                        }}
                        style={{
                          backgroundImage: `url(${img.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        aria-label="Выбрать фото"
                        data-active-color={img.colorId === activeColorId}
                      />
                    </StaggerItem>
                  ))}
                </div>
              </Stagger></>
          </SlideInLeft>

          {/* INFO - правая колонка */}
          <SlideInRight delay={0.3} amount={0.2} className={s.info}>
            <>
              {/* Кнопка назад с анимацией */}
              <motion.button
                onClick={() => router.back()}
                className={s.infoBack}
                type="button"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={s.infoBackButt} aria-hidden="true">
                  <motion.svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ x: [0, -3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <path
                      d="M6.65551 14L0.278481 7.66754C-0.0928259 7.29883 -0.0928268 6.70117 0.278481 6.33246L6.65551 0L8 1.33509L2.29521 7L8 12.6649L6.65551 14Z"
                      fill="white"
                    />
                  </motion.svg>
                </span>
                <span className={s.infoBackText}>Вернуться назад</span>
              </motion.button>

              {/* Заголовок с анимацией */}
              <Lift delay={0.5} amount={0.2}>
                <h1 className={s.infoTitle}>{product.titleFull}</h1>
              </Lift>

              {/* Описание с анимацией */}
              <Lift delay={0.6} amount={0.2}>
                <p className={s.infoText}>{product.description}</p>
              </Lift>

              {/* Ссылка на инструкцию с анимацией */}
              {product.instructionUrl && (
                <ScaleIn delay={0.7} amount={0.2}>
                  <motion.a
                    className={"link " + s.infoLink}
                    href="/docs/Инструкция по монтажу.pdf"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Скачать инструкцию по монтажу
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
              )}

              {/* COLORS - блок выбора цвета */}
              <Fade delay={0.8} amount={0.2}>
                <div className={s.colors}>
                  <motion.span
                    className={s.colorsLabel}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    Цвета:
                  </motion.span>

                  <div
                    className={s.colorsRow}
                    role="radiogroup"
                    aria-label="Выбор цвета"
                  >
                    <Stagger className={s.colorsRow} stagger={0.08} delay={0.9} amount={0.2}>
                      {variant.colors.map((c) => {
                        const isActive = c.id === activeColorId;
                        return (
                          <StaggerItem key={c.id}>
                            <motion.button
                              type="button"
                              className={`${s.colorDot} ${isActive ? s.colorDotActive : ""}`}
                              style={{ backgroundColor: c.hex }}
                              onClick={() => handleColorPick(c.id)}
                              aria-label={c.name}
                              aria-checked={isActive}
                              role="radio"
                              whileHover={{
                                scale: 1.2,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                              }}
                              whileTap={{ scale: 0.9 }}
                              animate={isActive ? {
                                scale: [1, 1.1, 1],
                                transition: {
                                  duration: 0.5,
                                  repeat: Infinity,
                                  repeatDelay: 2
                                }
                              } : {}}
                            />
                          </StaggerItem>
                        );
                      })}
                    </Stagger>
                  </div>
                </div>
              </Fade>

              {/* Кнопка заказа с анимацией */}
              <motion.div
                className={"flex-col " + s.infoPrice}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                {/* Здесь может быть цена, если нужно */}
              </motion.div>

              <motion.button
                onClick={openRequest}
                className={"butt " + s.infoCta}
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Оформить заказ
              </motion.button></>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}