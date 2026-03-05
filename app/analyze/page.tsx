import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { AnalyzeContent } from "./_components/AnalyzeContent";

export const metadata: Metadata = {
    title: "Analyze Brief",
    description:
        "Paste any project brief and get a structured technical breakdown with requirements, MVP scope, risks, and budget estimations powered by AI.",
    openGraph: {
        title: "Analyze Brief | AI Brief Analyzer",
        description:
            "Paste any project brief and get an AI-powered structured technical breakdown in seconds.",
    },
};

export default function AnalyzePage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
                <AnalyzeContent />
            </main>
        </div>
    );
}
