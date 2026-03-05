import { SITE_CONFIG } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();

    return [
        {
            url: SITE_CONFIG.url,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_CONFIG.url}/analyze`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${SITE_CONFIG.url}/login`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];
}
