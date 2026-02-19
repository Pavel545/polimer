"use client";

import { JSX, useMemo, useState } from "react";
import s from "./style.module.css";
import { Stagger } from "@/components/ui/Motion";
import CardProduct from "@/components/ui/CardProduct/CardProduct";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import { ProductListItem, ProductCategory } from "@/types/product";
import { getAllProductsList, getAllCategories } from "@/lib/products";

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
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

  // Получаем данные из JSON файлов
  const categories: ProductCategory[] = getAllCategories();
  const allProducts: ProductListItem[] = getAllProductsList();

  // Преобразуем категории в формат для TabsList
  const categoryTabs: TabItem[] = categories.map(cat => ({
    id: cat.id,
    title: cat.title
  }));

  // Фильтруем продукты по выбранной категории
  const filteredProducts = useMemo(
    () => allProducts.filter((p) => p.categoryId === catActive),
    [allProducts, catActive],
  );

  const layoutMode = useMemo(
    () => getLayoutMode(filteredProducts.length),
    [filteredProducts.length],
  );

  const gridClass =
    layoutMode === "mosaic5" ? s.gridMosaic5 : layoutMode === "grid2" ? s.grid2 : s.grid3;

  return (
    <section className={s.products} id="products">
      <div className="container">
        <h2 className={"h2 " + s.productsTitle}>
          Продукция 
        </h2>
        <TabsList
          items={categoryTabs}
          activeId={catActive}
          onChange={setCatActive}
          className={s.productsTabs}
          itemClassName={s.productsTabsItem}
          activeItemClassName={s.active}
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
          <button className="butt">Инструкция по монтажу</button>
        </div>
      </div>
    </section>
  );
}