import { Header } from "@/components/layout/Header";
import { AnalyticsDashboard } from "./_components/AnalyticsDashboard";

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Analytics</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Monitor usage, costs, and performance metrics
                        </p>
                    </div>
                    <AnalyticsDashboard />
                </div>
            </main>
        </div>
    );
}
