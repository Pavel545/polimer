"use client";

import React from "react";
import s from "./style.module.css";

export type TabItem = {
  id: number;
  title: string;
};

type TabsListProps = {
  items: TabItem[];
  activeId: number;
  onChange: (id: number) => void;

  /** опционально: доп. классы под разные места использования */
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
};

export default function TabsList({
  items,
  activeId,
  onChange,
  className,
  itemClassName,
  activeItemClassName,
}: TabsListProps) {
  const activeIndex = Math.max(
    0,
    items.findIndex((t) => t.id === activeId),
  );

  const focusByIndex = (i: number) => {
    const next = items[i];
    if (!next) return;
    onChange(next.id);
  };

  const onKeyDownItem = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(items[idx].id);
      return;
    }

    // простая, но приятная навигация
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusByIndex((idx + 1) % items.length);
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusByIndex((idx - 1 + items.length) % items.length);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusByIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      focusByIndex(items.length - 1);
      return;
    }
  };

  return (
    <div className={`${s.tabs} ${className ?? ""}`} role="tablist">
      {items.map((el, idx) => {
        const isActive = activeId === el.id;

        return (
          <div
            key={el.id}
            className={[
              s.tabsItem,
              "flex-center",
              itemClassName ?? "",
              isActive ? s.active : "",
              isActive ? activeItemClassName ?? "" : "",
            ].join(" ")}
            role="tab"
            aria-selected={isActive}
            tabIndex={idx === activeIndex ? 0 : -1}
            onClick={() => onChange(el.id)}
            onKeyDown={(e) => onKeyDownItem(e, idx)}
          >
            {el.title}
          </div>
        );
      })}
    </div>
  );
}
