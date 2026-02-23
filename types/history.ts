export interface HistoryItem {
    id: string;
    title: string;
    model: string;
    modelName: string | null;
    provider: string;
    cost: number;
    date: string;
    inputTokens: number;
    outputTokens: number;
}
