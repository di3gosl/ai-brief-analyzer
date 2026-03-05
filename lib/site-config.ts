/**
 * Centralised site configuration for SEO metadata, OpenGraph, and other site-wide settings.
 * Update SITE_URL when deploying to production.
 */
export const SITE_CONFIG = {
    name: "AI Brief Analyzer",
    shortName: "Brief Analyzer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ai-brief.diegosalazar.dev",
    description:
        "Transform vague project briefs into structured, actionable technical breakdowns using AI. Get requirements, MVP scope, tech stack suggestions, risk assessments, and budget estimations in seconds.",
    shortDescription:
        "AI-powered project brief analysis — from vague ideas to actionable technical plans in seconds.",
    keywords: [
        "AI brief analyzer",
        "project brief analysis",
        "AI project planning",
        "requirements extraction",
        "MVP scope definition",
        "technical breakdown",
        "project estimation",
        "AI-powered analysis",
        "software project planning",
        "brief to requirements",
        "project risk assessment",
        "budget estimation",
        "OpenAI",
        "Claude",
        "Gemini",
        "multi-model AI",
    ],
    author: {
        name: "Diego Salazar",
        url: "https://github.com/di3gosl",
    },
    locale: "en_US",
    themeColor: "#0a0a0a",
    backgroundColor: "#0a0a0a",
} as const;
