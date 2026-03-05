import { SITE_CONFIG } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/auth/", "/api/"],
            },
        ],
        sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    };
}
