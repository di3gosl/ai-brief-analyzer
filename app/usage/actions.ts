"use server";

import prisma from "@/lib/prisma";

export type AnalyticsData = {
    totalAnalyses: number;
    analysesThisMonth: number;
    totalCost: number;
    costThisMonth: number;
    averageCost: number;
    mostUsedModel: string;
    mostUsedProvider: string;
    modelUsage: { model: string; percentage: number }[];
    costOverTime: { month: string; cost: number }[];
    analysesOverTime: { month: string; count: number }[];
    analysesToday: number;
    avgLatency: number;
    avgTokensPerRequest: number;
};

export async function getAnalyticsData(): Promise<AnalyticsData> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    const analyses = await prisma.analysis.findMany({
        select: {
            createdAt: true,
            estimatedCost: true,
            model: true,
            modelName: true,
            provider: true,
            totalTokens: true,
            latency: true,
        },
        orderBy: { createdAt: "asc" },
    });

    const totalAnalyses = analyses.length;
    const totalCost = analyses.reduce((sum, a) => sum + a.estimatedCost, 0);
    const averageCost = totalAnalyses > 0 ? totalCost / totalAnalyses : 0;

    const thisMonthAnalyses = analyses.filter(
        (a) => a.createdAt >= startOfMonth,
    );
    const analysesThisMonth = thisMonthAnalyses.length;
    const costThisMonth = thisMonthAnalyses.reduce(
        (sum, a) => sum + a.estimatedCost,
        0,
    );

    const analysesToday = analyses.filter(
        (a) => a.createdAt >= startOfToday,
    ).length;

    const avgLatency =
        totalAnalyses > 0
            ? analyses.reduce((sum, a) => sum + a.latency, 0) / totalAnalyses
            : 0;

    const avgTokensPerRequest =
        totalAnalyses > 0
            ? analyses.reduce((sum, a) => sum + a.totalTokens, 0) /
              totalAnalyses
            : 0;

    // Most used model & usage breakdown
    const modelCounts: Record<
        string,
        { count: number; provider: string; displayName: string }
    > = {};
    for (const a of analyses) {
        if (!modelCounts[a.model]) {
            modelCounts[a.model] = {
                count: 0,
                provider: a.provider,
                displayName: a.modelName ?? a.model,
            };
        }
        modelCounts[a.model].count++;
    }

    const sortedModels = Object.entries(modelCounts).sort(
        (a, b) => b[1].count - a[1].count,
    );
    const topEntry = sortedModels[0];
    const mostUsedModel = topEntry ? topEntry[1].displayName : "N/A";
    const mostUsedProvider = topEntry ? topEntry[1].provider : "—";

    const modelUsage = sortedModels.map(([, { displayName, count }]) => ({
        model: displayName,
        percentage: totalAnalyses > 0 ? (count / totalAnalyses) * 100 : 0,
    }));

    // Build last-6-months keys in reverse chronological order (most recent first)
    const last6Months: string[] = [];
    for (let i = 0; i <= 5; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        last6Months.push(
            d.toLocaleString("en-US", { month: "short", year: "numeric" }),
        );
    }

    const costByMonth: Record<string, number> = {};
    const countByMonth: Record<string, number> = {};
    for (const a of analyses) {
        const key = a.createdAt.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
        costByMonth[key] = (costByMonth[key] ?? 0) + a.estimatedCost;
        countByMonth[key] = (countByMonth[key] ?? 0) + 1;
    }

    const costOverTime = last6Months.map((month) => ({
        month,
        cost: costByMonth[month] ?? 0,
    }));

    const analysesOverTime = last6Months.map((month) => ({
        month,
        count: countByMonth[month] ?? 0,
    }));

    return {
        totalAnalyses,
        analysesThisMonth,
        totalCost,
        costThisMonth,
        averageCost,
        mostUsedModel,
        mostUsedProvider,
        modelUsage,
        costOverTime,
        analysesOverTime,
        analysesToday,
        avgLatency,
        avgTokensPerRequest,
    };
}
