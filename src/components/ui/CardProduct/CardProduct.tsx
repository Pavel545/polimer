"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import React, { JSX } from "react";
import s from "./CardProduct.module.css";
import { ProductListItem } from "@/types/product";

type LayoutMode = "mosaic5" | "grid3" | "grid2";

type MosaicPlacement = {
  gridColumn: string;
  gridRow: string;
};

type Props = {
  product: ProductListItem; // Изменяем тип на ProductListItem
  idx: number;
  layoutMode: LayoutMode;

  /** функция для позиционирования в mosaic */
  getMosaicPlacement: (idx: number) => MosaicPlacement;

  /** framer */
  variants: Variants;
};

export default function CardProduct({
  product,
  idx,
  layoutMode,
  getMosaicPlacement,
  variants,
}: Props): JSX.Element {
  const mosaicStyle =
    layoutMode === "mosaic5" ? getMosaicPlacement(idx) : undefined;

  // Форматируем цену
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };
  
  return (
    <motion.article
      className={s.card}
      variants={variants}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      layout
      style={mosaicStyle}
    >
      <Link href={`/product/${product.slug}`} className={s.link}> {/* Используем slug вместо id */}
        <div className={s.media}>
          <Image
            src={product.img}
            alt={product.titleShort} // Используем titleShort
            fill
            sizes="(max-width: 470px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={idx < 2}
          />
          <div className={s.overlay} />
        </div>

        <div className={s.info}>
          {/* Можно оставить type, если он есть в данных, или использовать категорию */}
          <p className={s.type}>
            {product.categoryId === 1 && "Люк"}
            {product.categoryId === 2 && "Заказная позиция"}
            {product.categoryId === 3 && "Для благоустройства"}
            {product.categoryId === 4 && "Для колодца"}
          </p>
          <h3 className={s.title}>{product.titleShort}</h3>
          
          {/* Добавляем отображение цены */}
          <div className={s.price}>
            {formatPrice(product.priceRub)} <span className={s.currency}>₽</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}