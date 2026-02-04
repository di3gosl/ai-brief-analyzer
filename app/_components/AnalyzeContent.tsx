"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MetricsPanel } from "./MetricsPanel";
import { AnalysisResults } from "../../components/AnalysisResults";
import { mockMetrics, sampleBrief } from "@/lib/mock-data";

export function AnalyzeContent() {
    const [brief, setBrief] = useState(sampleBrief);
    const [hasAnalyzed, setHasAnalyzed] = useState(true);
    const [status, setStatus] = useState<
        "idle" | "running" | "success" | "error"
    >("success");

    const handleAnalyze = () => {
        if (!brief.trim()) return;

        // Simulate analysis
        setStatus("running");
        setHasAnalyzed(false);

        setTimeout(() => {
            setStatus("success");
            setHasAnalyzed(true);
        }, 1500);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content - Left Column */}
            <div className="flex-1 min-w-0 space-y-6">
                {/* Brief Input Section */}
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-1">
                            Project Brief
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Paste your project brief below and click analyze to
                            get a comprehensive breakdown.
                        </p>
                    </div>

                    <Textarea
                        placeholder="Paste your project brief here..."
                        className="min-h-75 resize-y font-mono text-sm"
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                    />

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            {brief.length.toLocaleString()} characters
                        </p>
                        <Button
                            onClick={handleAnalyze}
                            disabled={!brief.trim() || status === "running"}
                        >
                            {status === "running" ? (
                                <>
                                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Analyze Brief
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Analysis Results */}
                {hasAnalyzed && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Analysis Results
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Generated with GPT-4o
                            </p>
                        </div>
                        <AnalysisResults />
                    </div>
                )}
            </div>

            {/* Metrics Panel - Right Column */}
            <div className="w-full lg:w-72 shrink-0">
                <div className="sticky top-20">
                    <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                        Metrics
                    </h3>
                    <MetricsPanel
                        inputTokens={hasAnalyzed ? mockMetrics.inputTokens : 0}
                        outputTokens={
                            hasAnalyzed ? mockMetrics.outputTokens : 0
                        }
                        totalTokens={hasAnalyzed ? mockMetrics.totalTokens : 0}
                        estimatedCost={
                            hasAnalyzed ? mockMetrics.estimatedCost : 0
                        }
                        latency={hasAnalyzed ? mockMetrics.latency : 0}
                        status={status}
                    />
                </div>
            </div>
        </div>
    );
}
