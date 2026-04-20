"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

  mobileLabel?: string;
  
  // Новый флаг: как отображать на мобилке
  // "dropdown" - выпадающий список (по умолчанию)
  // "column" - просто колонка элементов
  mobileDisplayMode?: "dropdown" | "column";
};

export default function TabsList({
  items,
  activeId,
  onChange,
  className,
  itemClassName,
  activeItemClassName,
  mobileLabel = "Категория",
  mobileDisplayMode = "dropdown", // по умолчанию dropdown
}: TabsListProps) {
  const activeIndex = Math.max(
    0,
    items.findIndex((t) => t.id === activeId),
  );

  const activeItem = useMemo(
    () => items.find((t) => t.id === activeId) ?? items[0],
    [items, activeId],
  );

  // ===== mobile =====
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(activeIndex);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setHoverIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const selectByIndex = (idx: number) => {
    const next = items[idx];
    if (!next) return;
    onChange(next.id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // ===== keyboard dropdown =====
  const onKeyDownDropdown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) return setOpen(true);
      selectByIndex(hoverIndex);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHoverIndex((i) => (i + 1) % items.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoverIndex((i) => (i - 1 + items.length) % items.length);
    }
  };

  // ===== desktop keyboard =====
  const focusByIndex = (i: number) => {
    const next = items[i];
    if (!next) return;
    onChange(next.id);
  };

  const onKeyDownTab = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(items[idx].id);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusByIndex((idx + 1) % items.length);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusByIndex((idx - 1 + items.length) % items.length);
    }
  };

  // Рендер мобильной версии в зависимости от режима
  const renderMobile = () => {
    if (mobileDisplayMode === "column") {
      return (
        <div className={s.mobileColumn}>
          {mobileLabel && <div className={s.mobileLabel}>{mobileLabel}</div>}
          <div className={s.columnList}>
            {items.map((el) => {
              const isActive = activeId === el.id;
              return (
                <div
                  key={el.id}
                  className={`${s.columnItem} ${isActive ? s.columnItemActive : ""}`}
                  onClick={() => onChange(el.id)}
                >
                  <span className={s.columnItemTitle}>{el.title}</span>
                  {isActive && (
                    <span className={s.columnItemIndicator}>✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // dropdown mode (default)
    return (
      <div className={s.mobile}>
        <div className={s.mobileLabel}>{mobileLabel}</div>

        <div ref={wrapRef} className={s.dropdown} onKeyDown={onKeyDownDropdown}>
          <button
            ref={buttonRef}
            className={`${s.dropdownButton} ${open ? s.open : ""}`}
            onClick={() => setOpen((v) => !v)}
          >
            {activeItem?.title}
          </button>

          {open && (
            <div className={s.menu}>
              {items.map((it, idx) => {
                const isActive = it.id === activeId;

                return (
                  <div
                    key={it.id}
                    className={`${s.menuItem} ${
                      isActive ? s.menuItemActive : ""
                    }`}
                    onMouseEnter={() => setHoverIndex(idx)}
                    onClick={() => selectByIndex(idx)}
                  >
                    {it.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${s.root} ${className ?? ""}`}>
      {/* ===== MOBILE ===== */}
      {renderMobile()}

      {/* ===== DESKTOP ===== */}
      <div className={s.tabs} role="tablist">
        {items.map((el, idx) => {
          const isActive = activeId === el.id;

          return (
            <motion.div
              key={el.id}
              className={[
                s.tabsItem,
                itemClassName ?? "",
                isActive ? s.active : "",
                isActive ? activeItemClassName : "",
                el.isFileLink ? s.fileLink : "",
              ].join(" ")}
              role="tab"
              tabIndex={idx === activeIndex ? 0 : -1}
              onClick={() => onChange(el.id)}
              onKeyDown={(e) => onKeyDownTab(e, idx)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {el.title}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}