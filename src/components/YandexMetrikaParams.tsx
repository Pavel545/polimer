"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

export default function YandexMetrikaParams() {
  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const parts = host.split(".");
    const subdomain = parts.length > 2 ? parts[0] : "root";

    if (typeof window.ym === "function") {
      window.ym(107705030, "params", {
        region_subdomain: subdomain,
        region_host: host,
      });
    }
  }, []);

  return null;
}