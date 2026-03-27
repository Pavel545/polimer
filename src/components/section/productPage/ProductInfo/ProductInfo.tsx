"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./style.module.css";
import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import type { ProductInfoData } from "@/types/product";
import {
  Lift,
  SlideInRight,
  Stagger,
  StaggerItem,
  ScaleIn,
  BlurIn,
  SlideInLeft,
} from "@/components/ui/Motion";

type ProductInfoTabId = number;

export default function ProductInfo({ data }: { data: ProductInfoData }) {
  const [catActive, setCatActive] = useState<ProductInfoTabId>(data.tabs[0]?.id ?? 1);
  const [isMobile, setIsMobile] = useState(false);
  const [imageTabId, setImageTabId] = useState<ProductInfoTabId | null>(null);

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
    () => data.tabs.map((t) => ({ 
      id: t.id, 
      title: t.title,
      isFileLink: !!t.fileUrl
    })),
    [data.tabs],
  );

  const activeContent = useMemo(
    () => data.tabs.find((t) => t.id === catActive)?.content,
    [data.tabs, catActive],
  );

  const activeTab = useMemo(
    () => data.tabs.find((t) => t.id === catActive),
    [data.tabs, catActive],
  );

  const handleTabChange = (id: ProductInfoTabId) => {
    const tab = data.tabs.find(t => t.id === id);
    
    // Если у таба есть fileUrl, показываем изображение вместо открытия ссылки
    if (tab?.fileUrl) {
      setImageTabId(id);
      setCatActive(id);
      return;
    }
    
    setImageTabId(null);
    setCatActive(id);
  };

  // Закрыть изображение и вернуться к обычному отображению
  const handleCloseImage = () => {
    setImageTabId(null);
    // Находим первый таб без fileUrl и переключаемся на него
    const firstNonImageTab = data.tabs.find(t => !t.fileUrl);
    if (firstNonImageTab) {
      setCatActive(firstNonImageTab.id);
    }
  };

  // Проверяем, нужно ли показывать изображение
  const showImage = imageTabId !== null && activeTab?.fileUrl;

  return (
    <section className={s.ProductInfo}>
      <div className="container">
        <TabsList
          items={tabs}
          activeId={catActive}
          onChange={handleTabChange}
          className={s.ProductInfoTabs}
          itemClassName={s.ProductInfoTabsItem}
          activeItemClassName={s.active}
        />

        <div className={s.ProductInfoContent}>
          <AnimatePresence mode="wait">
            {showImage ? (
              // Отображение изображения на всю ширину
              <motion.div
                key="image-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={s.fullWidthImage}
              >
                <div className={s.imageContainer}>
                  <img 
                    src={activeTab.fileUrl} 
                    alt={activeTab.title}
                    className={s.productImage}
                  />
                  {isMobile && (
                    <button 
                      onClick={handleCloseImage}
                      className={s.closeImageButton}
                      aria-label="Закрыть изображение"
                    >
                      ×
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              // Обычное отображение контента
              activeContent && (
                <motion.div
                  key={catActive}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeContent.kind === "advantages_characteristics" && (
                    <div className={s.twoCols}>
                      {/* Левая колонка с преимуществами */}
                      <SlideInLeft delay={0.1} amount={0.2} className={s.col}>
                        <>
                          <h3 className={s.colTitle}>{activeContent.leftTitle}</h3>
                          <Stagger stagger={0.1} amount={0.1}>
                            <ol className={s.list}>
                              {activeContent.advantages.map((text, i) => (
                                <StaggerItem key={i} className={s.listItem}>
                                  {text}
                                </StaggerItem>
                              ))}
                            </ol>
                          </Stagger>
                        </>
                      </SlideInLeft>

                      {/* Правая колонка с характеристиками */}
                      <SlideInRight delay={0.2} amount={0.2} className={s.col}>
                        <>
                          <h3 className={s.colTitle}>{activeContent.rightTitle}</h3>
                          <Stagger stagger={0.08} amount={0.1}>
                            <div className={s.kv}>
                              {activeContent.characteristics.map((row, i) => (
                                <StaggerItem key={i} className={s.kvRow}>
                                  <span className={s.kvLabel}>{row.label}:</span>
                                  <ScaleIn delay={0.3 + i * 0.05}>
                                    <span className={s.kvValue}>{row.value}</span>
                                  </ScaleIn>
                                </StaggerItem>
                              ))}
                            </div>
                          </Stagger>
                        </>
                      </SlideInRight>
                    </div>
                  )}

                  {activeContent.kind === "description_types" && (
                    <div className={s.twoCols}>
                      {/* Левая колонка с описанием */}
                      <SlideInLeft delay={0.1} amount={0.2} className={s.col}>
                        <>
                          <h3 className={s.colTitle}>{activeContent.leftTitle}</h3>
                          <Stagger stagger={0.15} amount={0.1}>
                            {activeContent.description.map((p, i) => (
                              <StaggerItem key={i} className={s.paragraph}>
                                {p}
                              </StaggerItem>
                            ))}
                          </Stagger>
                        </>
                      </SlideInLeft>

                      {/* Правая колонка с видами */}
                      <SlideInRight delay={0.2} amount={0.2} className={s.col}>
                        <>
                          <h3 className={s.colTitle}>{activeContent.rightTitle}</h3>
                          <Stagger stagger={0.1} amount={0.1}>
                            <ol className={s.list}>
                              {activeContent.types.map((t, i) => (
                                <StaggerItem key={i} className={s.listItem}>
                                  {!isMobile ? (
                                    <>
                                      <b className={s.bold}>{t.title}</b> {t.text}
                                    </>
                                  ) : (
                                    <>
                                      <b className={s.bold}>{t.title}</b>
                                      <br />
                                      {t.text}
                                    </>
                                  )}
                                </StaggerItem>
                              ))}
                            </ol>
                          </Stagger>
                        </>
                      </SlideInRight>
                    </div>
                  )}

                  {activeContent.kind === "instruction_columns" && (
                    <div className={s.twoCols}>
                      {activeContent.columns.map((c, idx) => (
                        <BlurIn 
                          key={idx} 
                          delay={idx * 0.15} 
                          amount={0.2}
                          className={s.col}
                        >
                          <>
                            {c.title && (
                              <Lift delay={0.1}>
                                <h3 className={s.colTitle}>{c.title}</h3>
                              </Lift>
                            )}
                            <Stagger stagger={0.12} amount={0.1}>
                              {c.text.map((p, i) => p && (
                                <StaggerItem key={i} className={s.paragraph}>
                                  {p}
                                </StaggerItem>
                              ))}
                            </Stagger>
                          </>
                        </BlurIn>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}