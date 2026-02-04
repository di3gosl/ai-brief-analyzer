"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FileText,
    History,
    BarChart3,
    DollarSign,
    Sun,
    Moon,
    Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { providers, modelsByProvider } from "@/lib/mock-data";
import { useState } from "react";
import { useTheme } from "next-themes";

const navigation = [
    { name: "Analyze", href: "/", icon: FileText },
    { name: "History", href: "/history", icon: History },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Header() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [selectedProvider, setSelectedProvider] = useState("openai");
    const [selectedModel, setSelectedModel] = useState("gpt-4o");

    const currentModels = modelsByProvider[selectedProvider] || [];
    const currentModel = currentModels.find((m) => m.id === selectedModel);
    const estimatedCost = currentModel
        ? `~$${(currentModel.costPer1kTokens * 4).toFixed(4)}/req`
        : "";

    const handleProviderChange = (value: string) => {
        setSelectedProvider(value);
        const newModels = modelsByProvider[value];
        if (newModels && newModels.length > 0) {
            setSelectedModel(newModels[0].id);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 items-center px-4 md:px-6">
                {/* Logo and App Name */}
                <div className="flex items-center gap-2 mr-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <FileText className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-lg hidden sm:inline-block">
                        AI Brief Analyzer
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    {navigation.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/" &&
                                pathname.startsWith(item.href));
                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    size="sm"
                                    className={cn(
                                        "gap-2",
                                        isActive && "bg-secondary",
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="hidden sm:inline-block">
                                        {item.name}
                                    </span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Theme Selector, Model Selector and Cost Badge */}
                <div className="flex items-center gap-2">
                    {/* Provider Selector */}
                    <Select
                        value={selectedProvider}
                        onValueChange={handleProviderChange}
                    >
                        <SelectTrigger className="w-30 h-8 text-xs" size="sm">
                            <SelectValue placeholder="Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {providers.map((provider) => (
                                <SelectItem
                                    key={provider.id}
                                    value={provider.id}
                                >
                                    {provider.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Model Selector */}
                    <Select
                        value={selectedModel}
                        onValueChange={setSelectedModel}
                    >
                        <SelectTrigger className="w-35 h-8 text-xs" size="sm">
                            <SelectValue placeholder="Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {currentModels.map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                    {model.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Estimated Cost Badge */}
                    <Badge
                        variant="outline"
                        className="hidden md:flex gap-1 text-xs font-normal text-muted-foreground"
                    >
                        <DollarSign className="h-3 w-3" />
                        {estimatedCost}
                    </Badge>

                    {/* Theme Selector */}
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger className="text-xs w-28 h-8 ml-6 hidden md:flex" size="sm">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">
                                <Laptop /> System
                            </SelectItem>
                            <SelectItem value="light">
                                <Sun /> Light
                            </SelectItem>
                            <SelectItem value="dark">
                                <Moon /> Dark
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </header>
    );
}
