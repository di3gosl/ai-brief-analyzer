"use client";

import { useState, useTransition } from "react";
import { Send, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnalysisResults } from "@/components/AnalysisResults";
import { MetricsPanel } from "./MetricsPanel";
import { sampleBrief } from "@/lib/mock-data";
import { useModelSelection } from "@/lib/model-context";
import { analyzeBrief } from "@/app/analyze/actions";
import {
    PROVIDERS,
    MODELS_BY_PROVIDER,
    estimateRequestCost,
    getModelConfig,
} from "@/lib/models";
import type { BriefAnalysis } from "@/lib/schemas";
import type { Status, AnalyzeResult } from "@/types/analyze";
import type { ProviderId } from "@/types/models";

export function AnalyzeContent() {
    const {
        provider: selectedProvider,
        model: selectedModel,
        setProvider,
        setModel,
    } = useModelSelection();
    const model = selectedModel;
    const currentModels = MODELS_BY_PROVIDER[selectedProvider] || [];
    const estimatedCost = `~$${estimateRequestCost(selectedModel).toFixed(5)}/req`;
    const [brief, setBrief] = useState(sampleBrief);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [analysis, setAnalysis] = useState<BriefAnalysis | null>(null);
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
        setAnalysis(null);

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

            setAnalysis(data.analysis);
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
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold mb-1">
                                Project Brief
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Paste your project brief below and click analyze
                                to get a comprehensive breakdown.
                            </p>
                        </div>
                        {/* Model Controls */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Select
                                value={selectedProvider}
                                onValueChange={(v) =>
                                    setProvider(v as ProviderId)
                                }
                            >
                                <SelectTrigger
                                    className="w-28 h-8 text-xs"
                                    size="sm"
                                >
                                    <SelectValue placeholder="Provider" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PROVIDERS.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={selectedModel}
                                onValueChange={setModel}
                            >
                                <SelectTrigger
                                    className="w-36 h-8 text-xs"
                                    size="sm"
                                >
                                    <SelectValue placeholder="Model" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currentModels.map((m) => (
                                        <SelectItem key={m.id} value={m.id}>
                                            {m.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Badge
                                variant="outline"
                                className="hidden sm:flex gap-1 text-xs font-normal text-muted-foreground"
                            >
                                <DollarSign className="h-3 w-3" />
                                {estimatedCost}
                            </Badge>
                        </div>
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

                {/* Analysis Results – structured output */}
                {hasAnalyzed && analysis && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Analysis Results
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Generated with {modelDisplay}
                            </p>
                        </div>
                        <AnalysisResults result={analysis} />
                    </div>
                )}
            </div>

            {/* Metrics Panel - Right Column */}
            <div className="w-full lg:w-72 shrink-0">
                <div className="sticky top-20">
                    <h3 className="text-sm font-medium mb-4">Prompt Metrics</h3>
                    <div className="text-sm text-muted-foreground">
                        Information about token usage, estimated cost, and
                        latency for the current analysis.
                    </div>
                    <div className="my-4 border-t"></div>
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
