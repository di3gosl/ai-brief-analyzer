import { SITE_CONFIG } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: SITE_CONFIG.name,
        short_name: SITE_CONFIG.shortName,
        description: SITE_CONFIG.shortDescription,
        start_url: "/",
        display: "standalone",
        background_color: SITE_CONFIG.backgroundColor,
        theme_color: SITE_CONFIG.themeColor,
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
