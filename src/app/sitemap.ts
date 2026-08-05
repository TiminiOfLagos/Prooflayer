import type { MetadataRoute } from "next";

import { brand } from "@/config/brand";
import { sitemapRoutes } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapRoutes.map((route) => ({
    url: `${brand.siteUrl}${route === "/" ? "" : route}`,
    lastModified,
    changeFrequency: route === "/changelog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/docs" || route === "/pricing" ? 0.8 : 0.6,
  }));
}
