"use client";

import React from "react";
import { motion } from "framer-motion";
import s from "./style.module.css";

export type TabItem = {
  id: number;
  title: string;
  isFileLink?: boolean;
};

type TabsListProps = {
  items: TabItem[];
  activeId: number;
  onChange: (id: number) => void;
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
          <motion.div
            key={el.id}
            className={[
              s.tabsItem,
              "flex-center",
              itemClassName ?? "",
              isActive ? s.active : "",
              isActive ? activeItemClassName : "",
              el.isFileLink ? s.fileLink : "",
            ].join(" ")}
            role="tab"
            aria-selected={isActive}
            tabIndex={idx === activeIndex ? 0 : -1}
            onClick={() => onChange(el.id)}
            onKeyDown={(e) => onKeyDownItem(e, idx)}
            // Анимация для табов
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: idx * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {el.title}
            {el.isFileLink && (
              <motion.span 
                className={s.linkIcon}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: idx * 0.1 + 0.5 }}
              >
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}