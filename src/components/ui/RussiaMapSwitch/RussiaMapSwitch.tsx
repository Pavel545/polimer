import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  /** Включить приближение при выборе региона */
  enableZoom?: boolean;
  /** Уровень приближения (1 = 100%) */
  zoomLevel?: number;
  /** Анимация приближения в мс */
  animationDuration?: number;
};

// Хук для панорамирования и масштабирования SVG
function useSvgPanZoom(
  svg: SVGSVGElement | null,
  enabled: boolean,
  animationDuration: number,
  onViewBoxChange?: (vb: string) => void
) {
  const isDraggingRef = useRef(false);
  const [isDraggingUI, setIsDraggingUI] = useState(false);

  const startPoint = useRef({ x: 0, y: 0 });
  const startViewBox = useRef({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!svg || !enabled) return;

    const getViewBox = () => {
      const vb = svg.getAttribute("viewBox");
      if (!vb) return null;
      const [x, y, width, height] = vb.split(/\s+/).map(Number);
      if ([x, y, width, height].some((n) => Number.isNaN(n))) return null;
      return { x, y, width, height };
    };

    const setViewBox = (x: number, y: number, width: number, height: number) => {
      const vb = `${x} ${y} ${width} ${height}`;
      svg.setAttribute("viewBox", vb);
      onViewBoxChange?.(vb);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const vb = getViewBox();
      if (!vb) return;

      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Нормализуем delta (trackpad иногда даёт мелкие значения)
      const direction = e.deltaY > 0 ? 1 : -1;
      const zoomFactor = direction > 0 ? 1.15 : 0.87; // чуть мягче чем 1.2/0.8

      const newWidth = vb.width * zoomFactor;
      const newHeight = vb.height * zoomFactor;

      const rx = mouseX / rect.width;
      const ry = mouseY / rect.height;

      const newX = vb.x + rx * vb.width - rx * newWidth;
      const newY = vb.y + ry * vb.height - ry * newHeight;

      svg.style.transition = `all ${animationDuration}ms ease-in-out`;
      setViewBox(newX, newY, newWidth, newHeight);

      window.setTimeout(() => {
        svg.style.transition = "";
      }, animationDuration);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;

      const vb = getViewBox();
      if (!vb) return;

      isDraggingRef.current = true;
      setIsDraggingUI(true);

      startPoint.current = { x: e.clientX, y: e.clientY };
      startViewBox.current = vb;

      svg.style.transition = "none";
      svg.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - startPoint.current.x;
      const dy = e.clientY - startPoint.current.y;

      const rect = svg.getBoundingClientRect();
      const scaleX = startViewBox.current.width / rect.width;
      const scaleY = startViewBox.current.height / rect.height;

      const newX = startViewBox.current.x - dx * scaleX;
      const newY = startViewBox.current.y - dy * scaleY;

      setViewBox(newX, newY, startViewBox.current.width, startViewBox.current.height);
    };

    const stopDragging = () => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      setIsDraggingUI(false);

      svg.style.cursor = "grab";
      svg.style.transition = "";
    };

    // курсор по умолчанию
    svg.style.cursor = "grab";

    svg.addEventListener("wheel", handleWheel, { passive: false });
    svg.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    svg.addEventListener("mouseleave", stopDragging);

    return () => {
      svg.removeEventListener("wheel", handleWheel);
      svg.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      svg.removeEventListener("mouseleave", stopDragging);
    };
  }, [svg, enabled, animationDuration, onViewBoxChange]);

  return { isDragging: isDraggingUI };
}


export function RussiaMapSwitch({
  active,
  src,
  enableZoom = true,
  zoomLevel = 1.8,
  animationDuration = 700
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgText, setSvgText] = useState<string>("");
  const [originalViewBox, setOriginalViewBox] = useState<string>("");
  const [currentViewBox, setCurrentViewBox] = useState<string>("");
  
  const [svgEl, setSvgEl] = useState<SVGSVGElement | null>(null);
const { isDragging } = useSvgPanZoom(
  svgEl,
  enableZoom,
  animationDuration,
  (vb) => setCurrentViewBox(vb)
);

  useEffect(() => {
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((t) => {
        if (alive) {
          setSvgText(t);
          const parser = new DOMParser();
          const doc = parser.parseFromString(t, "image/svg+xml");
          const svg = doc.querySelector("svg");
          if (svg && svg.getAttribute("viewBox")) {
            const viewBox = svg.getAttribute("viewBox") || "";
            setOriginalViewBox(viewBox);
            setCurrentViewBox(viewBox);
          }
        }
      });
    return () => {
      alive = false;
    };
  }, [src]);

  const selectors = useMemo(() => {
    return {
      all: `[data-layer="district"], [data-layer="region"], [data-layer="okrug"]`,
      active: `[data-district="${active}"]`,
    };
  }, [active]);

  const getRegionBBox = useCallback((): { x: number; y: number; width: number; height: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;

    const activeElements = svg.querySelectorAll<SVGGraphicsElement>(selectors.active);
    if (activeElements.length === 0) return null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    activeElements.forEach(el => {
      try {
        const bbox = el.getBBox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      } catch (error) {
        console.warn("Не удалось получить BBox элемента:", el);
      }
    });

    if (minX === Infinity) return null;

    const padding = 50;
    return {
      x: minX - padding,
      y: minY - padding,
      width: (maxX - minX) + padding * 2,
      height: (maxY - minY) + padding * 2
    };
  }, [selectors.active]);

  const zoomToRegion = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !enableZoom || !originalViewBox) return;

    const regionBBox = getRegionBBox();
    if (!regionBBox) return;

    const [x, y, width, height] = originalViewBox.split(" ").map(Number);
    
    const regionCenterX = regionBBox.x + regionBBox.width / 2;
    const regionCenterY = regionBBox.y + regionBBox.height / 2;
    
    const newWidth = width / zoomLevel;
    const newHeight = height / zoomLevel;
    let newX = regionCenterX - newWidth / 2;
    let newY = regionCenterY - newHeight / 2;

    // Ограничения
    newX = Math.max(x, Math.min(newX, x + width - newWidth));
    newY = Math.max(y, Math.min(newY, y + height - newHeight));

    const newViewBox = `${newX} ${newY} ${newWidth} ${newHeight}`;
    
    // Плавная анимация
    svg.style.transition = `all ${animationDuration}ms ease-in-out`;
    svg.setAttribute("viewBox", newViewBox);
    setCurrentViewBox(newViewBox);
    
    setTimeout(() => {
      svg.style.transition = '';
    }, animationDuration);
  }, [enableZoom, zoomLevel, animationDuration, originalViewBox, getRegionBBox]);

  const resetZoom = useCallback(() => {
    const svg = svgRef.current;
    if (!svg || !originalViewBox) return;

    svg.style.transition = `all ${animationDuration}ms ease-in-out`;
    svg.setAttribute("viewBox", originalViewBox);
    setCurrentViewBox(originalViewBox);
    
    setTimeout(() => {
      svg.style.transition = '';
    }, animationDuration);
  }, [originalViewBox, animationDuration]);

  // Обновляем currentViewBox при изменении viewBox
  useEffect(() => {
    const handleViewBoxChange = () => {
      const svg = svgRef.current;
      if (svg && svg.getAttribute("viewBox")) {
        setCurrentViewBox(svg.getAttribute("viewBox") || "");
      }
    };

    const svg = svgRef.current;
    if (svg) {
      // Создаем наблюдатель за изменениями атрибутов
      const observer = new MutationObserver(handleViewBoxChange);
      observer.observe(svg, { attributes: true, attributeFilter: ['viewBox'] });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    
    const svg = root.querySelector("svg");
    if (!svg) return;

    svgRef.current = svg;
    setSvgEl(svg);

    if (!originalViewBox && svg.getAttribute("viewBox")) {
      const viewBox = svg.getAttribute("viewBox") || "";
      setOriginalViewBox(viewBox);
      setCurrentViewBox(viewBox);
    }

    // Обновляем стили
    const all = svg.querySelectorAll<SVGElement>(selectors.all);
    all.forEach((el) => {
      el.classList.remove(s.isActive);
    });

    const act = svg.querySelectorAll<SVGElement>(selectors.active);
    act.forEach((el) => {
      el.classList.add(s.isActive);
    });

    // Автоприближение при смене региона
    if (enableZoom && originalViewBox) {
      const timer = setTimeout(() => {
        zoomToRegion();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectors, enableZoom, originalViewBox, zoomToRegion]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (enableZoom && originalViewBox) {
      e.preventDefault();
      resetZoom();
    }
  }, [enableZoom, originalViewBox, resetZoom]);
const zoomIn = useCallback(() => {
  const svg = svgRef.current;
  if (!svg || !currentViewBox) return;

  const [x, y, width, height] = currentViewBox.split(" ").map(Number);
  const newWidth = width * 0.8;
  const newHeight = height * 0.8;
  const newX = x + (width - newWidth) / 2;
  const newY = y + (height - newHeight) / 2;

  svg.style.transition = `all ${animationDuration}ms ease-in-out`;
  svg.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
  setCurrentViewBox(`${newX} ${newY} ${newWidth} ${newHeight}`);
  
  setTimeout(() => svg.style.transition = '', animationDuration);
}, [currentViewBox, animationDuration]);

const zoomOut = useCallback(() => {
  const svg = svgRef.current;
  if (!svg || !currentViewBox) return;

  const [x, y, width, height] = currentViewBox.split(" ").map(Number);
  const newWidth = width * 1.25;
  const newHeight = height * 1.25;
  const newX = x - (newWidth - width) / 2;
  const newY = y - (newHeight - height) / 2;

  svg.style.transition = `all ${animationDuration}ms ease-in-out`;
  svg.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
  setCurrentViewBox(`${newX} ${newY} ${newWidth} ${newHeight}`);
  
  setTimeout(() => svg.style.transition = '', animationDuration);
}, [currentViewBox, animationDuration]);
  return (
    <div className={s.container}>
      <div
        ref={wrapRef}
        className={`${s.wrap} ${isDragging ? s.dragging : ''}`}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: enableZoom ? 'grab' : 'default' }}
        dangerouslySetInnerHTML={{ __html: svgText }}
      />
      
      {enableZoom && originalViewBox && (
         <>
         
          <div className={s.zoomButtons}>
      <button className={s.zoomButton} onClick={zoomIn} aria-label="Приблизить">+</button>
      <button className={s.zoomButton} onClick={zoomOut} aria-label="Отдалить">−</button>
    </div>
        <div className={s.controls}>
          <button
            onClick={resetZoom}
            className={s.resetButton}
            title="Сбросить приближение"
            aria-label="Сбросить приближение"
          >
            Сбросить вид
          </button>
          
          <div className={s.zoomInfo}>
            {currentViewBox && originalViewBox && (
              <>
                <span className={s.zoomLevel}>
                  Масштаб: {Math.round(
                    (parseFloat(originalViewBox.split(" ")[2]) / 
                     parseFloat(currentViewBox.split(" ")[2])) * 100
                  )}%
                </span>
                <div className={s.zoomHint}>
                  Используйте колесо мыши для масштабирования
                </div>
              </>
            )}
          </div>
        </div></>
      )}
    </div>
  );
}