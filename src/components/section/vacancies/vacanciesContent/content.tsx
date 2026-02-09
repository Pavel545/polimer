"use client";

import { useMemo, useState } from "react";
import s from "./style.module.css";
import { VacancyTab, VacancyTabData } from "@/components/ui/VacancyTab/VacancyTab";

export default function VacanciesContent() {
  const [openId, setOpenId] = useState<string | null>("loader"); // по скрину открыт "Грузчик..."

  const items = useMemo<VacancyTabData[]>(
    () => [
      {
        id: "driver",
        title: "Водитель",
        subtitle: "Опыт от 1 года",
        salary: "от 50 000 ₽",
        content: null, // на скрине таб свернут
      },
      {
        id: "loader",
        title: "Грузчик на производство",
        subtitle: "Без опыта",
        salary: "от 30 000 ₽",
        content: {
          leftTitle: "Требования:",
          leftList: [
            "Готовность к физической нагрузке",
            "Минимальный опыт работы",
            "Внимательность",
            "Аккуратность",
          ],
          leftBottomTitle: "Обязанности:",
          leftBottomList: [
            "Перемещение тяжелой продукции",
            "Полный цикл складских операций",
            "Поддержание строгого порядка и чистоты на производстве",
            "Инвентаризация",
          ],
          rightList: [
            "Сфера деятельности: Производство, сырьё, с/х",
            "График работы: Сменный",
            "Смены: 2/2, дневные, ночные",
            "Частота выплат: Дважды в месяц",
            "Опыт работы: Без опыта",
            "Бонусы: униформа, парковка, подарки детям на праздники",
            "Обучение: непосредственно на производстве",
          ],
          actions: [
            { type: "link", label: "Перейти на hh.ru", href: "https://hh.ru" },
            { type: "phone", label: "+7 902 006-48-75", href: "tel:+79020064875" },
          ],
        },
      },
      {
        id: "cnc",
        title: "Оператор станка ЧПУ",
        subtitle: "Опыт от 3 лет",
        salary: "от 70 000 ₽",
        content: null,
      },
      {
        id: "logistic",
        title: "Специалист по логистике",
        subtitle: "Опыт от 1 года",
        salary: "В архиве",
        disabled: true, // визуально серый как на скрине
        content: null,
      },
    ],
    []
  );

  return (
    <section className={s.VacanciesContent}>
      <div className="container">
        <div className={s.list}>
          {items.map((item) => (
            <VacancyTab
              key={item.id}
              data={item}
              isOpen={openId === item.id}
              onToggle={() => {
                if (item.disabled) return;
                setOpenId((prev) => (prev === item.id ? null : item.id));
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
