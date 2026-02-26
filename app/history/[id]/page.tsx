import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Cpu, DollarSign, Coins } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { AnalysisResults } from "../../../components/AnalysisResults";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/date-utils";
import { getAnalysis } from "./actions";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function HistoryDetailPage({ params }: Props) {
    const { id } = await params;
    const item = await getAnalysis(id);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-5xl">
                <div className="space-y-6">
                    {/* Back Button and Title */}
                    <div className="space-y-4">
                        <Link href="/history">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 mb-4"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to History
                            </Button>
                        </Link>

                        <div>
                            <h1 className="text-2xl font-semibold">
                                {item.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <Badge variant="outline" className="gap-1">
                                    <Cpu className="h-3 w-3" />
                                    {item.modelName}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    {item.provider}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <Card>
                        <CardContent className="grid gap-4 sm:grid-cols-4 py-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Date
                                    </p>
                                    <p className="text-sm font-medium">
                                        {formatDate(new Date(item.date))}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Cost
                                    </p>
                                    <p className="text-sm font-medium font-mono">
                                        ${item.cost.toFixed(4)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    <Coins className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Input Tokens
                                    </p>
                                    <p className="text-sm font-medium font-mono">
                                        {item.inputTokens.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                    <Coins className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Output Tokens
                                    </p>
                                    <p className="text-sm font-medium font-mono">
                                        {item.outputTokens.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Analysis Results */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Analysis Results
                        </h2>
                        <AnalysisResults result={item} />
                    </div>
                </div>
            </main>
        </div>
    );
}
