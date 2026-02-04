import { Header } from "@/components/layout/Header";
import { HistoryList } from "./_components/HistoryList";

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-5xl">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Analysis History
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            View and manage your previous brief analyses
                        </p>
                    </div>
                    <HistoryList />
                </div>
            </main>
        </div>
    );
}
