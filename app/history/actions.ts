"use server";

import prisma from "@/lib/prisma";
import type { HistoryItem } from "@/types/history";

export async function getHistory(): Promise<HistoryItem[]> {
    const rows = await prisma.analysis.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            model: true,
            modelName: true,
            provider: true,
            estimatedCost: true,
            createdAt: true,
            inputTokens: true,
            outputTokens: true,
        },
    });

    return rows.map((row) => ({
        id: row.id,
        title: row.title,
        model: row.model,
        modelName: row.modelName,
        provider: row.provider,
        cost: row.estimatedCost,
        date: row.createdAt.toISOString(),
        inputTokens: row.inputTokens,
        outputTokens: row.outputTokens,
    }));
}
