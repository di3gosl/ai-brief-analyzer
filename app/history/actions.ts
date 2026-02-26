"use server";

import prisma from "@/lib/prisma";
import type { HistoryItem } from "@/types/history";
import { getAuthUserId } from "@/lib/supabase/actions";

export async function getHistory(): Promise<HistoryItem[]> {
    const userId = await getAuthUserId();

    const rows = await prisma.analysis.findMany({
        where: { userId },
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
