"use client";

import BreadCrumbs from "@/components/ui/BreadCrumbs/BreadCrumbs";
import s from "./style.module.css";
import { JSX, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductEntity, ProductImage } from "@/types/product";

function formatRub(v: number): string {
  return new Intl.NumberFormat("ru-RU").format(v);
}

// Удаляем demoProduct, будем получать из пропсов

type Props = {
  product: ProductEntity; // теперь обязательный пропс
};

export default function ProductHero({ product }: Props): JSX.Element {
  const router = useRouter();

  // пока 1 вариант — берём первый (позже можно добавить выбор variant)
  const variant = product.variants[0];

  const imagesSorted = useMemo(() => {
    return [...variant.images].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  }, [variant.images]);

  const [activeColorId, setActiveColorId] = useState<string>(
    variant.colors[0]?.id ?? "",
  );

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

    // НЕ фильтруем список миниатюр — просто "перепрыгиваем"
    // на первое изображение нужного цвета
    const firstOfColor = imagesSorted.find((img) => img.colorId === colorId);
    if (firstOfColor) setActiveImageId(firstOfColor.id);
  };

  const handleThumbPick = (img: ProductImage) => {
    setActiveImageId(img.id);

    // синхронизируем выбранный цвет с выбранной картинкой
    if (img.colorId !== activeColorId) {
      setActiveColorId(img.colorId);
    }
  };

  return (
    <section className={s.pHero}>
      <BreadCrumbs items={[{ title: product.titleShort }]} />

      <div className="container">
        <div className={s.pHeroContent}>
          {/* GALLERY */}
          <div className={s.gallery}>
            <div className={s.galleryPrev}>
              {activeImage && (
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt ?? product.titleFull}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>

            <div className={s.galleryList} role="list">
              {imagesSorted.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  className={`${s.galleryListItem} ${
                    img.id === activeImageId ? s.galleryListItemActive : ""
                  }`}
                  style={{ backgroundImage: `url(${img.url})` }}
                  onClick={() => handleThumbPick(img)}
                  aria-label="Выбрать фото"
                  data-active-color={img.colorId === activeColorId}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className={s.info}>
            <button
              onClick={() => router.back()}
              className={s.infoBack}
              type="button"
            >
              <span className={s.infoBackButt} aria-hidden="true">
                <svg
                  width="8"
                  height="14"
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.65551 14L0.278481 7.66754C-0.0928259 7.29883 -0.0928268 6.70117 0.278481 6.33246L6.65551 0L8 1.33509L2.29521 7L8 12.6649L6.65551 14Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={s.infoBackText}>Вернуться назад</span>
            </button>

            <h1 className={s.infoTitle}>{product.titleFull}</h1>

            <p className={s.infoText}>{product.description}</p>

            {product.instructionUrl && (
              <a className={"link " + s.infoLink} href={product.instructionUrl}>
                Скачать инструкцию
              </a>
            )}

            {/* COLORS */}
            <div className={s.colors}>
              <span className={s.colorsLabel}>Цвета:</span>

              <div
                className={s.colorsRow}
                role="radiogroup"
                aria-label="Выбор цвета"
              >
                {variant.colors.map((c) => {
                  const isActive = c.id === activeColorId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`${s.colorDot} ${isActive ? s.colorDotActive : ""}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => handleColorPick(c.id)}
                      aria-label={c.name}
                      aria-checked={isActive}
                      role="radio"
                    />
                  );
                })}
              </div>
            </div>

            <div className={"flex-col " + s.infoPrice}>
              <span className={s.infoPriceText}>Стоимость:</span>
              <span className={s.infoPriceCount}>
                {formatRub(variant.priceRub)} ₽
              </span>
            </div>

            <button className={"butt " + s.infoCta} type="button">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}