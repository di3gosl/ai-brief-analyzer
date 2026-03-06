import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModelSelectionProvider } from "@/lib/model-context";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        {
            media: "(prefers-color-scheme: dark)",
            color: SITE_CONFIG.themeColor,
        },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: SITE_CONFIG.name,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
    creator: SITE_CONFIG.author.name,
    publisher: SITE_CONFIG.author.name,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: SITE_CONFIG.locale,
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.shortDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.shortDescription,
    },
    alternates: {
        canonical: SITE_CONFIG.url,
    },
    category: "technology",
    icons: {
        icon: "/hexagon-nodes.svg",
        shortcut: "/hexagon-nodes.svg",
        apple: "/hexagon-nodes.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ModelSelectionProvider>{children}</ModelSelectionProvider>
                </ThemeProvider>
                <Analytics />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
            </body>
        </html>
    );
}
