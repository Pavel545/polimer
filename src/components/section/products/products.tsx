"use client";

import { JSX, useMemo, useState } from "react";
import s from "./style.module.css";
import { Stagger } from "@/components/ui/Motion";
import CardProduct from "@/components/ui/CardProduct/CardProduct";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";

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

type LayoutMode = "mosaic5" | "grid3" | "grid2";

function getLayoutMode(count: number): LayoutMode {
  if (count > 0 && count % 5 === 0) return "mosaic5";
  if (count > 0 && count % 3 === 0) return "grid3";
  if (count > 0 && count % 2 === 0) return "grid2";
  return "grid3";
}

type MosaicPlacement = { gridColumn: string; gridRow: string };

function getMosaicPlacement(idx: number): MosaicPlacement {
  const group = Math.floor(idx / 5);
  const pos = idx % 5;
  const rowBase = group * 2 + 1;

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

  const categories: TabItem[] = [
    { id: 1, title: "Полимерпесчанные люки" },
    { id: 2, title: "Заказные позиции" },
    { id: 3, title: "Благоустройство территории" },
    { id: 4, title: "Обустройство колодца люки" },
  ];

  const products: Product[] = [
    { id: 1, title: "Люк «ЛМ»", type: "Легкий", img: "/img/products/1.jpg", categoryId: 1 },
    { id: 2, title: "Люк «Л»", type: "Легкий малый", img: "/img/products/1.jpg", categoryId: 1 },
    { id: 3, title: "Люк «С»", type: "Средний", img: "/img/products/1.jpg", categoryId: 1 },

    { id: 4, title: "Люк «Т»", type: "Тяжёлый", img: "/img/products/1.jpg", categoryId: 2 },
    { id: 5, title: "Конус люк", type: "Переходник", img: "/img/products/1.jpg", categoryId: 2 },
    { id: 6, title: "Люк «ЛМ»", type: "Легкий", img: "/img/products/1.jpg", categoryId: 2 },
    { id: 7, title: "Люк «Л»", type: "Легкий малый", img: "/img/products/1.jpg", categoryId: 2 },
    { id: 8, title: "Люк «С»", type: "Средний", img: "/img/products/1.jpg", categoryId: 2 },

    { id: 9, title: "Плитка", type: "Брусчатка", img: "/img/products/1.jpg", categoryId: 3 },
    { id: 10, title: "Борт", type: "Бордюр", img: "/img/products/1.jpg", categoryId: 3 },
    { id: 11, title: "Лоток", type: "Водоотвод", img: "/img/products/1.jpg", categoryId: 3 },
    { id: 12, title: "Крышка", type: "Комплект", img: "/img/products/1.jpg", categoryId: 3 },

    { id: 13, title: "Кольцо", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
    { id: 14, title: "Днище", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
    { id: 15, title: "Плита", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
    { id: 16, title: "Люк", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
    { id: 17, title: "Горловина", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
    { id: 18, title: "Переходник", type: "Колодец", img: "/img/products/1.jpg", categoryId: 4 },
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
    layoutMode === "mosaic5" ? s.gridMosaic5 : layoutMode === "grid2" ? s.grid2 : s.grid3;

  return (
    <section className={s.products}>
      <div className="container">
        <TabsList
          items={categories}
          activeId={catActive}
          onChange={setCatActive}
          className={s.productsTabs}          // контейнер
          itemClassName={s.productsTabsItem}   // таб
          activeItemClassName={s.active}       // активный таб (если надо отдельно)
        />

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
