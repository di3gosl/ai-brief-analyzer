import { type BriefAnalysis } from "@/lib/schemas";

export type Status = "idle" | "running" | "success" | "error";

export interface AnalyzeResult {
    analysisId: string;
    analysis: BriefAnalysis;
    model: string;
    modelName: string;
    provider: string;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    estimatedCost: number;
    latency: number; // seconds
}

export interface AnalyzeError {
    error: string;
}
