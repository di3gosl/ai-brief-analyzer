"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { MODELS_BY_PROVIDER } from "@/lib/models";
import type { ProviderId } from "@/types/models";

interface ModelSelectionContextValue {
    provider: ProviderId;
    model: string;
    setProvider: (provider: ProviderId) => void;
    setModel: (model: string) => void;
}

const ModelSelectionContext = createContext<ModelSelectionContextValue | null>(
    null,
);

export function ModelSelectionProvider({ children }: { children: ReactNode }) {
    const [provider, setProviderState] = useState<ProviderId>("openai");
    const [model, setModel] = useState("gpt-4o-mini");

    const setProvider = useCallback((newProvider: ProviderId) => {
        setProviderState(newProvider);
        // Auto-select the first model of the new provider
        const models = MODELS_BY_PROVIDER[newProvider];
        if (models && models.length > 0) {
            setModel(models[0].id);
        }
    }, []);

    return (
        <ModelSelectionContext.Provider
            value={{ provider, model, setProvider, setModel }}
        >
            {children}
        </ModelSelectionContext.Provider>
    );
}

export function useModelSelection() {
    const ctx = useContext(ModelSelectionContext);
    if (!ctx) {
        throw new Error(
            "useModelSelection must be used within a ModelSelectionProvider",
        );
    }
    return ctx;
}
