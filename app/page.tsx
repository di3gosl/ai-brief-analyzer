import { Header } from "@/components/layout/Header";
import { AnalyzeContent } from "./_components/AnalyzeContent";

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
