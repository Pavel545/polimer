"use client"; 
import React, { useEffect, useRef, useState } from "react";

type EasingFn = (t: number) => number;
const easeOutCubic: EasingFn = (t) => 1 - Math.pow(1 - t, 3);

export type CounterProps = {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;

  prefix?: string;
  suffix?: string;

  formatter?: (value: number) => string;

  threshold?: number;
  rootMargin?: string;

  once?: boolean;
  easing?: EasingFn;

  className?: string;

  /**
   * Если хочешь не только <span>, а например <div>:
   * передай "span" | "div" | "p" и т.д.
   */
  as?: "span" | "div" | "p";
};

export function Counter({
  end,
  start = 0,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatter,
  threshold = 0.3,
  rootMargin = "0px",
  once = true,
  easing = easeOutCubic,
  className,
  as = "span",
}: CounterProps) {
  const ref = useRef<HTMLParagraphElement | undefined | HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const [inView, setInView] = useState(false);
  const [value, setValue] = useState(start);

  const fmt =
    formatter ??
    ((v: number) =>
      v.toLocaleString("ru-RU", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    if (once && startedRef.current) return;

    if (!inView) {
      if (!once) setValue(start);
      return;
    }

    startedRef.current = true;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    let startTs: number | null = null;

    const step = (ts: number) => {
      if (startTs === null) startTs = ts;

      const raw = (ts - startTs) / duration;
      const t = Math.min(Math.max(raw, 0), 1);
      const k = easing(t);

      const next = start + (end - start) * k;

      const pow = Math.pow(10, decimals);
      const rounded = Math.round(next * pow) / pow;

      setValue(rounded);

      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, once, start, end, duration, decimals, easing]);

  // Рендер без createElement и без JSX namespace
  const text = `${prefix}${fmt(value)}${suffix}`;

  if (as === "div") {
    return (
      <div
        ref={(el) => {
          ref.current = el;
        }}
        className={className}
      >
        {text}
      </div>
    );
  }

  if (as === "p") {
    return (
      <p
        ref={(el) => {
          ref.current = el;
        }}
        className={className}
      >
        {text}
      </p>
    );
  }

   if (as === "span") {
    return (
      <span
        ref={(el) => {
          ref.current = el;
        }}
        style={{all:"unset"}}
        className={className}
      >
        {text}
      </span>
    );
  }


  return (
    <p
        ref={(el) => {
          ref.current = el;
        }}
        className={className}
      >
        {text}
      </p>
  );
}
