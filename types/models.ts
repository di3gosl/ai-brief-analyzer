/**
 * Types
 */
export type ProviderId = "openai" | "anthropic" | "google";

export interface ModelPricing {
    inputPerToken: number;
    outputPerToken: number;
}

export interface ModelContext {
    size: number;
    displayName: string;
}

export interface ModelConfig {
    displayName: string;
    context: ModelContext;
    pricing: ModelPricing;
}

export interface ProviderConfig {
    displayName: string;
    models: Record<string, ModelConfig>;
}

export interface ProviderInfo {
    id: ProviderId;
    name: string;
}

export interface ModelInfo {
    id: string;
    name: string;
    pricing: ModelPricing;
}
