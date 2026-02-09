"use client";

import { useMemo, useState } from "react";
import s from "./stye.module.css";

import TabsList, { TabItem } from "@/components/ui/TabsList/TabsList";
import { DistrictKey, RussiaMapSwitch } from "@/components/ui/RussiaMapSwitch/RussiaMapSwitch";

type OkrugItem = {
  id: number;
  title: string;
  name: string;
  districtKey: DistrictKey;
  rayon?: string[];
};

export default function Geography() {
  const okrug: OkrugItem[] = useMemo(
    () => [
      { id: 1, title: "Центральный", name: "Центральный федеральный округ", districtKey: "central", rayon: [] },
      { id: 2, title: "Северо-Западный", name: "Северо-Западный федеральный округ", districtKey: "northwest" },
      { id: 3, title: "Южный", name: "Южный федеральный округ", districtKey: "south" },
      { id: 4, title: "Северо-Кавказский", name: "Северо-Кавказский федеральный округ", districtKey: "northcaucasus" },
      { id: 5, title: "Приволжский", name: "Приволжский федеральный округ", districtKey: "volga" },
      { id: 6, title: "Уральский", name: "Уральский федеральный округ", districtKey: "ural" },
      { id: 7, title: "Сибирский", name: "Сибирский федеральный округ", districtKey: "siberia" },
      { id: 8, title: "Дальневосточный", name: "Дальневосточный федеральный округ", districtKey: "fareast" },
    ],
    []
  );

  const tabItems: TabItem[] = useMemo(
    () => okrug.map((o) => ({ id: o.id, title: o.title })),
    [okrug]
  );

  const [activeId, setActiveId] = useState<number>(okrug[0].id);

  const activeOkrug = okrug.find((o) => o.id === activeId) ?? okrug[0];

  return (
    <section className={s.geography}>
      <div className="container">
        <h2 className="h2">Наша география</h2>

        <div className={s.geographyContent}>
          <TabsList items={tabItems} activeId={activeId} onChange={setActiveId} />

          <div className={s.main}>
            <RussiaMapSwitch src="/img/geography/map2.svg" active={activeOkrug.districtKey} />

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
          </div>
        </div>
      </div>
    </section>
  );
}
