"use client";

import { useMemo, useState } from "react";
import s from "./style.module.css";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import type { ProductInfoData, ProductInfoTabContent, ProductInfoTabId } from "@/types/product-info";

export default function ProductInfo({ data }: { data: ProductInfoData }) {
  const [catActive, setCatActive] = useState<ProductInfoTabId>(data.tabs[0]?.id ?? 1);

  const tabs: TabItem[] = useMemo(
    () => data.tabs.map((t) => ({ id: t.id, title: t.title })),
    [data.tabs],
  );

  const activeContent: ProductInfoTabContent | undefined = useMemo(
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
                      <b className={s.bold}>{t.title}</b> {t.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
