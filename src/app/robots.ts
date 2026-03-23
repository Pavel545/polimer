import type { MetadataRoute } from "next";
import { getSiteContext } from "@/lib/getSiteContext";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { baseUrl } = await getSiteContext();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}