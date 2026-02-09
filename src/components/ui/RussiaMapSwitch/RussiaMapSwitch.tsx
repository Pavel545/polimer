import { useEffect, useMemo, useRef, useState } from "react";
import s from "./RussiaMapSwitch.module.css";

export type DistrictKey =
  | "central"
  | "northwest"
  | "volga"
  | "ural"
  | "siberia"
  | "fareast"
  | "south"
  | "northcaucasus";

type Props = {
  active: DistrictKey;
  /** путь к svg в public, например "/maps/russia.svg" */
  src: string;
};

export function RussiaMapSwitch({ active, src }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [svgText, setSvgText] = useState<string>("");

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((t) => {
        if (alive) setSvgText(t);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  const selectors = useMemo(() => {
    // Поддержка обоих вариантов разметки
    return {
      all: `[data-layer="district"], [data-layer="region"], [data-layer="okrug"]`,
      active: `[data-district="${active}"]`,
    };
  }, [active]);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const svg = root.querySelector("svg");
    if (!svg) return;

    // 1) сначала "сбрасываем" всем
    const all = svg.querySelectorAll<SVGElement>(selectors.all);
    all.forEach((el) => {
      el.classList.remove(s.isActive);
      el.classList.add(s.isDim);
    });

    // 2) активируем нужный округ
    const act = svg.querySelectorAll<SVGElement>(selectors.active);
    act.forEach((el) => {
      el.classList.add(s.isActive);
      el.classList.remove(s.isDim);
    });
  }, [selectors]);

  return (
    <div ref={wrapRef} className={s.wrap} dangerouslySetInnerHTML={{ __html: svgText }} />
  );
}
