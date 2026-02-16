"use client";


import AboutAdvantages from "@/components/section/aboutPage/advantages/advantages";
import AboutInfo from "@/components/section/aboutPage/info/info";
import Contact from "@/components/section/contact/contact";
import Interesting from "@/components/section/Interesting/Interesting";
import { getLatestArticles } from "@/lib/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function TgPage() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready(); // сообщаем Telegram что приложение готово
    tg.expand(); // раскрыть по высоте (по желанию)
    setUser(tg.initDataUnsafe?.user ?? null);
    setReady(true);

    // пример: кнопка снизу в Telegram
    tg.MainButton.setText("Готово");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      tg.close(); // закрыть мини-апп
    });

    return () => {
      try {
        tg.MainButton.offClick(() => {});
      } catch {}
    };
  }, []);
    const blogArticles = getLatestArticles(6);
    
    // Преобразуем данные из нашей структуры в формат, который ожидает компонент Interesting
    const blogMock = blogArticles.map(article => ({
      id: article.id,
      title: article.title,
      slug:article.slug,
      img: article.img,
      date: article.date,
      excerpt: article.excerpt // используем excerpt вместо полного текста
    }));
  return (
    <main style={{ padding: 16 }}>
            <AboutInfo/>
            <AboutAdvantages/>
            <Interesting items={blogMock} />
            <Contact/>
    </main>
  );
}
