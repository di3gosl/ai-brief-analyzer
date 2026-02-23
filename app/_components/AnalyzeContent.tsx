"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MetricsPanel } from "./MetricsPanel";
import { sampleBrief } from "@/lib/mock-data";
import { useModelSelection } from "@/lib/model-context";
import { analyzeBrief, type AnalyzeResult } from "@/app/actions/analyze";
import { getModelConfig } from "@/lib/models";

type Status = "idle" | "running" | "success" | "error";

export function AnalyzeContent() {
    const { model } = useModelSelection();
    const [brief, setBrief] = useState(sampleBrief);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [resultText, setResultText] = useState("");
    const [metrics, setMetrics] = useState({
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        estimatedCost: 0,
        latency: 0,
    });
    const [status, setStatus] = useState<Status>("idle");
    const [isPending, startTransition] = useTransition();

    const handleAnalyze = () => {
        if (!brief.trim()) {
            return;
        }

        setStatus("running");
        setHasAnalyzed(false);
        setResultText("");

        startTransition(async () => {
            const result = await analyzeBrief(brief, model);

            if ("error" in result) {
                setStatus("error");
                toast.error("Analysis failed", {
                    description: result.error,
                });
                return;
            }

            const data = result as AnalyzeResult;

            setResultText(data.text);
            setMetrics({
                inputTokens: data.inputTokens,
                outputTokens: data.outputTokens,
                totalTokens: data.totalTokens,
                estimatedCost: data.estimatedCost,
                latency: data.latency,
            });
            setStatus("success");
            setHasAnalyzed(true);
            toast.success("Analysis complete", {
                description: `Generated with ${getModelConfig(data.model)?.displayName ?? data.model} in ${data.latency.toFixed(2)}s`,
            });
        });
    };

    const isRunning = status === "running" || isPending;
    const modelDisplay = getModelConfig(model)?.displayName ?? model;

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
                        className={`resize-y font-mono text-sm transition-all duration-500 ${hasAnalyzed ? "min-h-20" : "min-h-75"}`}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                    />

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            {brief.length.toLocaleString()} characters
                        </p>
                        <Button
                            onClick={handleAnalyze}
                            disabled={!brief.trim() || isRunning}
                        >
                            {isRunning ? (
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

                {/* Analysis Results – plain text for now */}
                {hasAnalyzed && resultText && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Analysis Results
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Generated with {modelDisplay}
                            </p>
                        </div>
                        <div className="rounded-lg border bg-card p-6">
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                                {resultText}
                            </pre>
                        </div>
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
                        inputTokens={metrics.inputTokens}
                        outputTokens={metrics.outputTokens}
                        totalTokens={metrics.totalTokens}
                        estimatedCost={metrics.estimatedCost}
                        latency={metrics.latency}
                        status={isRunning ? "running" : status}
                    />
                </div>
            </div>
        </div>
    );
}
