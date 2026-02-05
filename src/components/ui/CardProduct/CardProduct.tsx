"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import React, { JSX } from "react";
import s from "./CardProduct.module.css";

export type Product = {
  id: number;
  title: string;
  type: string;
  img: string;
  categoryId: number;
};

type LayoutMode = "mosaic5" | "grid3" | "grid2";

type MosaicPlacement = {
  gridColumn: string;
  gridRow: string;
};

type Props = {
  product: Product;
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

  return (
    <motion.article
      className={s.card}
      variants={variants}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      layout
      style={mosaicStyle}
    >
      <Link href={`/product/${product.id}`} className={s.link}>
        <div className={s.media}>
          <Image
            src={product.img}
            alt={product.title}
            fill
            sizes="(max-width: 470px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={idx < 2}
          />
          <div className={s.overlay} />
        </div>

        <div className={s.info}>
          <p className={s.type}>{product.type}</p>
          <h3 className={s.title}>{product.title}</h3>
        </div>
      </Link>
    </motion.article>
  );
}
