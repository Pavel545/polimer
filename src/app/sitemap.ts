import type { MetadataRoute } from "next";
import { getSiteContext } from "@/lib/getSiteContext";

const ROUTES = [
  "",
  "/contacts",
  "/catalog",
  "/products",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { baseUrl } = await getSiteContext();

  return ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}