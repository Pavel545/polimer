"use client";

import { useMemo, useState, useEffect } from "react";
import s from "./style.module.css";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import type { ProductInfoData } from "@/types/product";

type ProductInfoTabId = number; // или string, если у вас id в формате строки

export default function ProductInfo({ data }: { data: ProductInfoData }) {
  const [catActive, setCatActive] = useState<ProductInfoTabId>(data.tabs[0]?.id ?? 1);
  const [isMobile, setIsMobile] = useState(false);

  // Проверка на мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs: TabItem[] = useMemo(
    () => data.tabs.map((t) => ({ id: t.id, title: t.title })),
    [data.tabs],
  );

  const activeContent = useMemo(
    () => data.tabs.find((t) => t.id === catActive)?.content,
    [data.tabs, catActive],
  );

  return (
    <section className={s.ProductInfo}>
      <div className="container">
        <TabsList
          items={tabs}
          activeId={catActive}
          onChange={(id) => setCatActive(id as ProductInfoTabId)}
          className={s.ProductInfoTabs}
          itemClassName={s.ProductInfoTabsItem}
          activeItemClassName={s.active}
        />

        <div className={s.ProductInfoContent}>
          {!activeContent ? null : activeContent.kind === "advantages_characteristics" ? (
            <div className={s.twoCols}>
              <div className={s.col}>
                <h3 className={s.colTitle}>{activeContent.leftTitle}</h3>
                <ol className={s.list}>
                  {activeContent.advantages.map((text, i) => (
                    <li key={i} className={s.listItem}>
                      {text}
                    </li>
                  ))}
                </ol>
              </div>

              <div className={s.col}>
                <h3 className={s.colTitle}>{activeContent.rightTitle}</h3>
                <div className={s.kv}>
                  {activeContent.characteristics.map((row, i) => (
                    <div key={i} className={s.kvRow}>
                      <span className={s.kvLabel}>{row.label}:</span>
                      <span className={s.kvValue}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeContent.kind === "description_types" ? (
            <div className={s.twoCols}>
              <div className={s.col}>
                <h3 className={s.colTitle}>{activeContent.leftTitle}</h3>
                {activeContent.description.map((p, i) => (
                  <p key={i} className={s.paragraph}>
                    {p}
                  </p>
                ))}
              </div>

              <div className={s.col}>
                <h3 className={s.colTitle}>{activeContent.rightTitle}</h3>
                <ol className={s.list}>
                  {activeContent.types.map((t, i) => (
                    <li key={i} className={s.listItem}>
                      {!isMobile && <b className={s.bold}>{t.title}</b>}
                      {isMobile && <><b className={s.bold}>{t.title}</b><br /></>}
                      {t.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : activeContent.kind === "instruction_columns" ? (
            <div className={s.twoCols}>
              {activeContent.columns.map((c, idx) => (
                <div key={idx} className={s.col}>
                  <h3 className={s.colTitle}>{c.title}</h3>
                  {c.text.map((p, i) => (
                    <p key={i} className={s.paragraph}>
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}