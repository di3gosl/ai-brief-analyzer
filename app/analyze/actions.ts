"use server";

import { generateText, Output } from "ai";
import { getModelConfig, calculateCost } from "@/lib/models";
import { BRIEF_ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { briefAnalysisSchema } from "@/lib/schemas";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import type { AnalyzeResult, AnalyzeError } from "@/types/analyze";
import prisma from "@/lib/prisma";
import { getAuthUserId } from "@/lib/supabase/actions";

export async function analyzeBrief(
    brief: string,
    modelId: string,
): Promise<AnalyzeResult | AnalyzeError> {
    const userId = await getAuthUserId();
    // Validate inputs
    if (!brief.trim()) {
        return { error: "Brief cannot be empty." };
    }

    const config = getModelConfig(modelId);
    if (!config) {
        return { error: `Unknown model: ${modelId}` };
    }

    // Validate that the API key is configured
    const envKeyMap: Record<string, string | undefined> = {
        openai: process.env.OPENAI_API_KEY,
        anthropic: process.env.ANTHROPIC_API_KEY,
        google: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    };

    if (!envKeyMap[config.provider]) {
        return {
            error: `Missing API keys. Set the correct environment variables.`,
        };
    }

    // Call the model and measure latency
    const startTime = performance.now();
    try {
        // Initialize the appropriate model based on the provider
        let model = null;
        if (config.provider === "openai") {
            model = openai(modelId);
        } else if (config.provider === "anthropic") {
            model = anthropic(modelId);
        } else if (config.provider === "google") {
            model = google(modelId);
        }

        if (!model) {
            return { error: "Failed to initialize model." };
        }

        const { output, usage } = await generateText({
            model,
            system: BRIEF_ANALYSIS_SYSTEM_PROMPT,
            prompt: brief,
            output: Output.object({
                schema: briefAnalysisSchema,
            }),
        });

        if (!output) {
            return { error: "Model returned empty output." };
        }

        const endTime = performance.now();
        const latency = (endTime - startTime) / 1000; // ms → seconds

        const inputTokens = usage?.inputTokens ?? 0;
        const outputTokens = usage?.outputTokens ?? 0;
        const totalTokens = inputTokens + outputTokens;
        const estimatedCost = calculateCost(modelId, inputTokens, outputTokens);

        // Persist the analysis to the database
        const saved = await prisma.analysis.create({
            data: {
                userId,
                brief,
                title: output.projectSummary.title,
                model: modelId,
                modelName: config.displayName,
                provider: config.provider,
                inputTokens,
                outputTokens,
                totalTokens,
                estimatedCost,
                latency,

                projectSummary: {
                    create: { content: output.projectSummary.content },
                },

                functionalRequirements: {
                    create: output.functionalRequirements.items.map(
                        (item, idx) => ({ content: item, sortOrder: idx }),
                    ),
                },

                mvpItems: {
                    create: output.mvpVsNiceToHave.mvp.map((item, idx) => ({
                        content: item,
                        sortOrder: idx,
                    })),
                },

                niceToHaveItems: {
                    create: output.mvpVsNiceToHave.niceToHave.map(
                        (item, idx) => ({ content: item, sortOrder: idx }),
                    ),
                },

                techStackCategories: {
                    create: output.technicalStack.categories.map(
                        (cat, catIdx) => ({
                            name: cat.name,
                            sortOrder: catIdx,
                            items: {
                                create: cat.items.map((item, itemIdx) => ({
                                    name: item,
                                    sortOrder: itemIdx,
                                })),
                            },
                        }),
                    ),
                },

                risks: {
                    create: output.risksAndAssumptions.risks.map(
                        (risk, idx) => ({
                            level: risk.level.toUpperCase() as
                                | "LOW"
                                | "MEDIUM"
                                | "HIGH",
                            description: risk.description,
                            sortOrder: idx,
                        }),
                    ),
                },

                assumptions: {
                    create: output.risksAndAssumptions.assumptions.map(
                        (item, idx) => ({ content: item, sortOrder: idx }),
                    ),
                },

                missingQuestions: {
                    create: output.missingInformation.questions.map(
                        (item, idx) => ({ content: item, sortOrder: idx }),
                    ),
                },

                estimationSummary: {
                    create: {
                        totalDuration: output.roughEstimation.totalDuration,
                        totalEffort: output.roughEstimation.totalEffort,
                        teamSize: output.roughEstimation.teamSize,
                    },
                },

                estimationPhases: {
                    create: output.roughEstimation.phases.map((phase, idx) => ({
                        name: phase.name,
                        duration: phase.duration,
                        effort: phase.effort,
                        sortOrder: idx,
                    })),
                },

                estimationCaveats: {
                    create: output.roughEstimation.caveats.map((item, idx) => ({
                        content: item,
                        sortOrder: idx,
                    })),
                },
            },
        });

        return {
            analysisId: saved.id,
            analysis: output,
            model: modelId,
            provider: config.provider,
            inputTokens,
            outputTokens,
            totalTokens,
            estimatedCost,
            latency,
        };
    } catch (err: unknown) {
        const message =
            err instanceof Error
                ? err.message
                : "An unexpected error occurred.";
        return { error: message };
    }
}
