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

/**
 * Model configurations
 */
export const MODEL_CONFIGS: Record<ProviderId, ProviderConfig> = {
    openai: {
        displayName: "OpenAI",
        models: {
            "gpt-5-mini": {
                displayName: "GPT-5 Mini",
                context: {
                    size: 400_000,
                    displayName: "400K tokens",
                },
                pricing: {
                    inputPerToken: 0.25 / 1_000_000,
                    outputPerToken: 2 / 1_000_000,
                },
            },
            "gpt-5-nano": {
                displayName: "GPT-5 Nano",
                context: {
                    size: 400_000,
                    displayName: "400K tokens",
                },
                pricing: {
                    inputPerToken: 0.05 / 1_000_000,
                    outputPerToken: 0.4 / 1_000_000,
                },
            },
            "gpt-4.1-mini": {
                displayName: "GPT-4.1 Mini",
                context: {
                    size: 1_047_576,
                    displayName: "1M tokens",
                },
                pricing: {
                    inputPerToken: 0.4 / 1_000_000,
                    outputPerToken: 1.6 / 1_000_000,
                },
            },
            "gpt-4.1-nano": {
                displayName: "GPT-4.1 Nano",
                context: {
                    size: 1_047_576,
                    displayName: "1M tokens",
                },
                pricing: {
                    inputPerToken: 0.1 / 1_000_000,
                    outputPerToken: 0.4 / 1_000_000,
                },
            },
            "gpt-4o-mini": {
                displayName: "GPT-4o Mini",
                context: {
                    size: 128_000,
                    displayName: "128K tokens",
                },
                pricing: {
                    inputPerToken: 0.15 / 1_000_000,
                    outputPerToken: 0.6 / 1_000_000,
                },
            },
        },
    },
    anthropic: {
        displayName: "Anthropic",
        models: {
            "claude-sonnet-4-6": {
                displayName: "Claude 4.6 Sonnet",
                context: {
                    size: 200_000,
                    displayName: "200K tokens",
                },
                pricing: {
                    inputPerToken: 3 / 1_000_000,
                    outputPerToken: 15 / 1_000_000,
                },
            },
            "claude-haiku-4-5-20251001": {
                displayName: "Claude 4.5 Haiku",
                context: {
                    size: 200_000,
                    displayName: "200K tokens",
                },
                pricing: {
                    inputPerToken: 1 / 1_000_000,
                    outputPerToken: 5 / 1_000_000,
                },
            },
        },
    },
    google: {
        displayName: "Google",
        models: {
            "gemini-2.5-flash": {
                displayName: "Gemini 2.5 Flash",
                context: {
                    size: 1_048_576,
                    displayName: "1M tokens",
                },
                pricing: {
                    inputPerToken: 0.3 / 1_000_000,
                    outputPerToken: 2.5 / 1_000_000,
                },
            },
            "gemini-2.5-flash-lite": {
                displayName: "Gemini 2.5 Flash Lite",
                context: {
                    size: 1_048_576,
                    displayName: "1M tokens",
                },
                pricing: {
                    inputPerToken: 0.1 / 1_000_000,
                    outputPerToken: 0.4 / 1_000_000,
                },
            },
        },
    },
};

/**
 * Ordered list of providers derived from MODEL_CONFIGS.
 */
export const PROVIDERS: ProviderInfo[] = Object.entries(MODEL_CONFIGS).map(
    ([providerId, provider]) => ({
        id: providerId as ProviderId,
        name: provider.displayName,
    }),
);

/**
 * Models grouped by provider, derived from MODEL_CONFIGS.
 */
export const MODELS_BY_PROVIDER: Record<ProviderId, ModelInfo[]> =
    Object.fromEntries(
        Object.entries(MODEL_CONFIGS).map(([providerId, provider]) => [
            providerId,
            Object.entries(provider.models).map(([modelId, modelData]) => ({
                id: modelId,
                name: modelData.displayName,
                pricing: modelData.pricing,
            })),
        ]),
    ) as Record<ProviderId, ModelInfo[]>;

/**
 * Look up a model config by its ID across all providers.
 * Returns the model config and its provider ID, or undefined.
 */
export function getModelConfig(
    modelId: string,
): (ModelConfig & { provider: ProviderId }) | undefined {
    for (const [providerId, provider] of Object.entries(MODEL_CONFIGS)) {
        const model = provider.models[modelId];
        if (model) {
            return { ...model, provider: providerId as ProviderId };
        }
    }
    return undefined;
}

/**
 * Rough per-request cost estimate (assumes ~2k input + ~2k output).
 */
export function estimateRequestCost(modelId: string): number {
    const config = getModelConfig(modelId);
    if (!config) {
        return 0;
    }

    return (
        2000 * config.pricing.inputPerToken +
        2000 * config.pricing.outputPerToken
    );
}

/**
 * Calculate the estimated cost for a given model and token counts.
 */
export function calculateCost(
    modelId: string,
    inputTokens: number,
    outputTokens: number,
): number {
    const config = getModelConfig(modelId);
    if (!config) {
        return 0;
    }

    return (
        inputTokens * config.pricing.inputPerToken +
        outputTokens * config.pricing.outputPerToken
    );
}
