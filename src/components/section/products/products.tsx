"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { JSX, useMemo, useState } from "react";
import s from "./style.module.css";
import { Stagger } from "@/components/ui/Motion";
import Link from "next/link";
import CardProduct from "@/components/ui/CardProduct/CardProduct";

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

type Product = {
  id: number;
  title: string;
  type: string;
  img: string;
  categoryId: number;
};

type Category = {
  id: number;
  title: string;
};

type LayoutMode = "mosaic5" | "grid3" | "grid2";

function getLayoutMode(count: number): LayoutMode {
  // приоритет: 5 > 3 > 2
  if (count > 0 && count % 5 === 0) return "mosaic5";
  if (count > 0 && count % 3 === 0) return "grid3";
  if (count > 0 && count % 2 === 0) return "grid2";
  return "grid3";
}

type MosaicPlacement = {
  gridColumn: string;
  gridRow: string;
};

// idx: 0..n-1, каждые 5 элементов занимают 2 ряда (как твой шаблон)
function getMosaicPlacement(idx: number): MosaicPlacement {
  const group = Math.floor(idx / 5); // номер блока из 5
  const pos = idx % 5; // позиция внутри блока
  const rowBase = group * 2 + 1; // 1-based rows: блоки идут (1-2), (3-4), (5-6)...

  // Шаблон как у тебя:
  // 0: a => col 1-2, row 1
  // 1: b => col 3-4, row 1
  // 2: c => col 5-6, row 1
  // 3: d => col 1-3, row 2
  // 4: e => col 4-6, row 2
  switch (pos) {
    case 0:
      return { gridColumn: "1 / span 2", gridRow: `${rowBase} / span 1` };
    case 1:
      return { gridColumn: "3 / span 2", gridRow: `${rowBase} / span 1` };
    case 2:
      return { gridColumn: "5 / span 2", gridRow: `${rowBase} / span 1` };
    case 3:
      return { gridColumn: "1 / span 3", gridRow: `${rowBase + 1} / span 1` };
    default:
      return { gridColumn: "4 / span 3", gridRow: `${rowBase + 1} / span 1` };
  }
}

export default function Products(): JSX.Element {
  const [catActive, setCatActive] = useState<number>(1);

  const categories: Category[] = [
    { id: 1, title: "Полимерпесчанные люки" },
    { id: 2, title: "Заказные позиции" },
    { id: 3, title: "Благоустройство территории" },
    { id: 4, title: "Обустройство колодца люки" },
  ];

  // Все товары единым массивом
  const products: Product[] = [
    // cat 1 (пример: 3 — будет grid3)
    {
      id: 1,
      title: "Люк «ЛМ»",
      type: "Легкий",
      img: "/img/products/1.jpg",
      categoryId: 1,
    },
    {
      id: 2,
      title: "Люк «Л»",
      type: "Легкий малый",
      img: "/img/products/1.jpg",
      categoryId: 1,
    },
    {
      id: 3,
      title: "Люк «С»",
      type: "Средний",
      img: "/img/products/1.jpg",
      categoryId: 1,
    },

    // cat 2 (пример: 5 — будет mosaic5)
    {
      id: 4,
      title: "Люк «Т»",
      type: "Тяжёлый",
      img: "/img/products/1.jpg",
      categoryId: 2,
    },
    {
      id: 5,
      title: "Конус люк",
      type: "Переходник",
      img: "/img/products/1.jpg",
      categoryId: 2,
    },
    {
      id: 6,
      title: "Люк «ЛМ»",
      type: "Легкий",
      img: "/img/products/1.jpg",
      categoryId: 2,
    },
    {
      id: 7,
      title: "Люк «Л»",
      type: "Легкий малый",
      img: "/img/products/1.jpg",
      categoryId: 2,
    },
    {
      id: 8,
      title: "Люк «С»",
      type: "Средний",
      img: "/img/products/1.jpg",
      categoryId: 2,
    },

    // cat 3 (пример: 4 — будет grid2)
    {
      id: 9,
      title: "Плитка",
      type: "Брусчатка",
      img: "/img/products/1.jpg",
      categoryId: 3,
    },
    {
      id: 10,
      title: "Борт",
      type: "Бордюр",
      img: "/img/products/1.jpg",
      categoryId: 3,
    },
    {
      id: 11,
      title: "Лоток",
      type: "Водоотвод",
      img: "/img/products/1.jpg",
      categoryId: 3,
    },
    {
      id: 12,
      title: "Крышка",
      type: "Комплект",
      img: "/img/products/1.jpg",
      categoryId: 3,
    },

    // cat 4 (пример: 6 — будет grid3)
    {
      id: 13,
      title: "Кольцо",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
    {
      id: 14,
      title: "Днище",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
    {
      id: 15,
      title: "Плита",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
    {
      id: 16,
      title: "Люк",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
    {
      id: 17,
      title: "Горловина",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
    {
      id: 18,
      title: "Переходник",
      type: "Колодец",
      img: "/img/products/1.jpg",
      categoryId: 4,
    },
  ];

  const filteredProducts = useMemo(
    () => products.filter((p) => p.categoryId === catActive),
    [products, catActive],
  );

  const layoutMode = useMemo(
    () => getLayoutMode(filteredProducts.length),
    [filteredProducts.length],
  );

  const gridClass =
    layoutMode === "mosaic5"
      ? s.gridMosaic5
      : layoutMode === "grid2"
        ? s.grid2
        : s.grid3;

  return (
    <section className={s.products}>
      <div className="container">
        <div className={s.productsTabs}>
          {categories.map((el) => (
            <div
              key={el.id}
              className={`${s.productsTabsItem} flex-center ${catActive === el.id ? s.active : ""}`}
              onClick={() => setCatActive(el.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setCatActive(el.id);
              }}
            >
              {el.title}
            </div>
          ))}
        </div>

        <Stagger
          key={`${catActive}-${filteredProducts.length}`}
          className={`${s.productsContent} ${gridClass}`}
          stagger={0.09}
          amount={0.2}
        >
          {filteredProducts.map((product, idx) => (
            <CardProduct
              key={product.id}
              product={product}
              idx={idx}
              layoutMode={layoutMode}
              getMosaicPlacement={getMosaicPlacement}
              variants={itemVariants}
            />
          ))}
        </Stagger>

        <div className="flex-center">
          <button className="butt">Инструкция по мантажу</button>
        </div>
      </div>
    </section>
  );
}
