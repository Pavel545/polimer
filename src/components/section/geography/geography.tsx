"use client";

import { useMemo, useState } from "react";
import s from "./stye.module.css";

import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import { DistrictKey, RussiaMapSwitch } from "@/components/ui/RussiaMapSwitch/RussiaMapSwitch";
import { useMedia } from "@/lib/Media";

type OkrugItem = {
  id: number;
  title: string;
  name: string;
  districtKey: DistrictKey;
  rayon?: string[];
};

export default function Geography() {
  const isMobile = useMedia("(max-width: 768px)");
 const okrug: OkrugItem[] = useMemo(
  () => [
    {
      id: 1,
      title: "Центральный",
      name: "Центральный федеральный округ",
      districtKey: "central",
      rayon: [
        "Московская",
        "Тульская",
        "Ивановская",
        "Воронежская",
        "Тамбовская",
        "Владимирская",
        "Белгородская",
      ],
    },
    {
      id: 2,
      title: "Северо-Западный",
      name: "Северо-Западный федеральный округ",
      districtKey: "northwest",
      rayon: ["Вологодская"],
    },
    {
      id: 3,
      title: "Южный",
      name: "Южный федеральный округ",
      districtKey: "south",
      rayon: [ "Волгоградская"],
    },
    {
      id: 4,
      title: "Северо-Кавказский",
      name: "Северо-Кавказский федеральный округ",
      districtKey: "northcaucasus",
      rayon: [],
    },
    {
      id: 5,
      title: "Приволжский",
      name: "Приволжский федеральный округ",
      districtKey: "volga",
      rayon: [
        "Ульяновская",
        "Татарстан",
        "Самарская",
        "Чувашская",
        "респ. Марий-Эл",
        "Саратовская",
        "Нижегородская",
        "респ. Мордовия",
        "респ. Башкирия",
        "Пензенская",
      ],
    },
    {
      id: 6,
      title: "Уральский",
      name: "Уральский федеральный округ",
      districtKey: "ural",
      rayon: ["Челябинская"],
    },
    {
      id: 7,
      title: "Сибирский",
      name: "Сибирский федеральный округ",
      districtKey: "siberia",
      rayon: ["Новосибирская"],
    },
    {
      id: 8,
      title: "Дальневосточный",
      name: "Дальневосточный федеральный округ",
      districtKey: "fareast",
      rayon: [],
    },
  ],
  []
);


  const tabItems: TabItem[] = useMemo(
    () => okrug.map((o) => ({ id: o.id, title: o.title })),
    [okrug]
  );

  const [activeId, setActiveId] = useState<number>(okrug[0].id);

  const activeOkrug = okrug.find((o) => o.id === activeId) ?? okrug[0];

  if (!isMobile) {
     return (
    <section className={s.geography}>
      <div className="container">
        <h2 className="h2">Наша география</h2>

        <div className={s.geographyContent}>
          <TabsList items={tabItems} activeId={activeId} onChange={setActiveId} />

          <div className={s.main}>
  <div className={s.info}>
    <div className={s.infoTitle}>{activeOkrug.name}</div>

    {!!activeOkrug.rayon?.length && (
      <ul className={s.rayonList}>
        {activeOkrug.rayon.map((r) => (
          <li key={r} className={s.rayonItem}>
            {r}
          </li>
        ))}
      </ul>
    )}
  </div>

  <RussiaMapSwitch src="/img/geography/map2.svg" active={activeOkrug.districtKey} />
</div>
        </div>
      </div>
    </section>
  );
  }
   
}
