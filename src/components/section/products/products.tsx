"use client";

import { JSX, useMemo, useState } from "react";
import s from "./style.module.css";
import { Stagger } from "@/components/ui/Motion";
import CardProduct from "@/components/ui/CardProduct/CardProduct";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import { ProductListItem, ProductCategory } from "@/types/product";
import { getAllProductsList, getAllCategories } from "@/lib/products";
import { Instruct } from "../hero/hero";
import Lightbox from "@/components/ui/Lightbox/lightbox";
import { productsLayout, toGridStyle } from "@/lib/products-layout";
import { useMedia } from "@/lib/Media";

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function Products(): JSX.Element {
  const [catActive, setCatActive] = useState<number>(1);
  const [activeItem, setActiveItem] = useState<Instruct | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const categories: ProductCategory[] = getAllCategories();
  const allProducts: ProductListItem[] = getAllProductsList();
  const isMobile = useMedia("(max-width: 768px)");

  const categoryTabs: TabItem[] = categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }));

  const filteredProducts = useMemo(
    () => allProducts.filter((p) => p.categoryId === catActive),
    [allProducts, catActive]
  );

  const currentLayout = useMemo(() => {
    return productsLayout[catActive] || {};
  }, [catActive]);

  const openModal = (item: Instruct) => {
    setActiveItem(item);
    setIsLightboxOpen(true);
  };

  const closeModal = () => {
    setIsLightboxOpen(false);
    setActiveItem(null);
  };

  return (
    <section className={s.products} id="products">
      <div className="container">
        {isMobile  && <TabsList
          items={categoryTabs}
          activeId={catActive}
          onChange={setCatActive}
          className={s.productsTabs}
          mobileDisplayMode="column"
          itemClassName={s.productsTabsItem}
          activeItemClassName={s.active}
        />}
        <h2 className={"h2 " + s.productsTitle}>
          Каталог: {categories[catActive - 1]?.titleW}
        </h2>

     {!isMobile  && <TabsList
          items={categoryTabs}
          activeId={catActive}
          onChange={setCatActive}
          className={s.productsTabs}
          mobileDisplayMode="column"
          itemClassName={s.productsTabsItem}
          activeItemClassName={s.active}
        />}

        <Stagger
          key={catActive}
          className={s.productsContent}
          stagger={0.09}
          amount={0.2}
        >
          {filteredProducts.map((product, idx) => {
            const layoutItem = currentLayout[product.id];

            return (
              <CardProduct
                key={product.id}
                product={product}
                idx={idx}
                className={catActive === 1 ? s.contain : ""}
                variants={itemVariants}
                style={toGridStyle(layoutItem)}
              />
            );
          })}
        </Stagger>

        <div className="flex-center">
          <button
            className={"butt " + s.heroBtn + " " + s.heroBtn2}
            onClick={() =>
              openModal({
                title: "Инструкция по монтажу",
                gallery: [
                  { image: "/img/instruct/1.jpg", pdf: "/docs/instruct/1.pdf" },
                  { image: "/img/instruct/2.jpg", pdf: "/docs/instruct/2.pdf" },
                ],
              })
            }
          >
            Инструкция по монтажу
          </button>

          <Lightbox
            isOpen={isLightboxOpen}
            images={activeItem?.gallery || []}
            title={activeItem?.title}
            onClose={closeModal}
          />
        </div>
      </div>
    </section>
  );
}