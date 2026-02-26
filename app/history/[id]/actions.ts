"use server";

import prisma from "@/lib/prisma";
import type { BriefAnalysis } from "@/lib/schemas";
import { getAuthUserId } from "@/lib/supabase/actions";

/**
 * Combined type returned by getAnalysis.
 * Extends BriefAnalysis (used by <AnalysisResults>) with flat meta fields
 * used by the detail page header / summary card.
 */
export type AnalysisDetail = BriefAnalysis & {
    title: string;
    model: string;
    provider: string;
    date: string;
    cost: number;
    inputTokens: number;
    outputTokens: number;
};

export async function getAnalysis(id: string): Promise<AnalysisDetail | null> {
    const userId = await getAuthUserId();

    const row = await prisma.analysis.findFirst({
        where: { id, userId },
        include: {
            projectSummary: true,
            functionalRequirements: { orderBy: { sortOrder: "asc" } },
            mvpItems: { orderBy: { sortOrder: "asc" } },
            niceToHaveItems: { orderBy: { sortOrder: "asc" } },
            techStackCategories: {
                orderBy: { sortOrder: "asc" },
                include: { items: { orderBy: { sortOrder: "asc" } } },
            },
            risks: { orderBy: { sortOrder: "asc" } },
            assumptions: { orderBy: { sortOrder: "asc" } },
            missingQuestions: { orderBy: { sortOrder: "asc" } },
            estimationSummary: true,
            estimationPhases: { orderBy: { sortOrder: "asc" } },
            estimationCaveats: { orderBy: { sortOrder: "asc" } },
        },
    });

    if (!row || !row.projectSummary || !row.estimationSummary) {
        return null;
    }

    return {
        // meta fields
        title: row.title,
        model: row.model,
        provider: row.provider,
        date: row.createdAt.toISOString(),
        cost: row.estimatedCost,
        inputTokens: row.inputTokens,
        outputTokens: row.outputTokens,

        // BriefAnalysis shape
        projectSummary: {
            title: row.title,
            content: row.projectSummary.content,
        },

        functionalRequirements: {
            items: row.functionalRequirements.map((r) => r.content),
        },

        mvpVsNiceToHave: {
            mvp: row.mvpItems.map((r) => r.content),
            niceToHave: row.niceToHaveItems.map((r) => r.content),
        },

        technicalStack: {
            categories: row.techStackCategories.map((cat) => ({
                name: cat.name,
                items: cat.items.map((i) => i.name),
            })),
        },

        risksAndAssumptions: {
            risks: row.risks.map((r) => ({
                level: r.level.toLowerCase() as "low" | "medium" | "high",
                description: r.description,
            })),
            assumptions: row.assumptions.map((r) => r.content),
        },

        missingInformation: {
            questions: row.missingQuestions.map((r) => r.content),
        },

        roughEstimation: {
            phases: row.estimationPhases.map((p) => ({
                name: p.name,
                duration: p.duration,
                effort: p.effort,
            })),
            totalDuration: row.estimationSummary.totalDuration,
            totalEffort: row.estimationSummary.totalEffort,
            teamSize: row.estimationSummary.teamSize,
            caveats: row.estimationCaveats.map((r) => r.content),
        },
    };
}
