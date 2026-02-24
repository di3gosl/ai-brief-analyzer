"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History, BarChart3, DollarSign, Menu } from "lucide-react";
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    PROVIDERS,
    MODELS_BY_PROVIDER,
    estimateRequestCost,
} from "@/lib/models";
import { useModelSelection } from "@/lib/model-context";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { ProviderId } from "@/types/models";

const ThemeSelect = dynamic(() => import("./ThemeSelect"), { ssr: false });
const MobileThemeSelect = dynamic(() => import("./MobileThemeSelect"), {
    ssr: false,
});

const navigation = [
    { name: "Analyze", href: "/analyze", icon: FileText },
    { name: "History", href: "/history", icon: History },
    { name: "Usage", href: "/usage", icon: BarChart3 },
];

export function Header() {
    const pathname = usePathname();
    const {
        provider: selectedProvider,
        model: selectedModel,
        setProvider,
        setModel,
    } = useModelSelection();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const currentModels = MODELS_BY_PROVIDER[selectedProvider] || [];
    const estimatedCost = `~$${estimateRequestCost(selectedModel).toFixed(5)}/req`;

    const handleProviderChange = (value: string) => {
        setProvider(value as ProviderId);
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

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {navigation.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(item.href + "/");
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
                        <SelectTrigger
                            className="w-28 md:w-30 h-8 text-xs"
                            size="sm"
                        >
                            <SelectValue placeholder="Provider" />
                        </SelectTrigger>
                        <SelectContent>
                            {PROVIDERS.map((provider) => (
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
                    <Select value={selectedModel} onValueChange={setModel}>
                        <SelectTrigger
                            className="w-30 md:w-38 h-8 text-xs"
                            size="sm"
                        >
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

                    {/* Theme Selector - Desktop */}
                    <ThemeSelect />

                    {/* Mobile Menu */}
                    <Sheet
                        open={mobileMenuOpen}
                        onOpenChange={setMobileMenuOpen}
                    >
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="sm" className="ml-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-70">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-6">
                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2">
                                    {navigation.map((item) => {
                                        const isActive =
                                            pathname === item.href ||
                                            pathname.startsWith(item.href + "/");
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                <Button
                                                    variant={
                                                        isActive
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                    size="sm"
                                                    className={cn(
                                                        "w-full justify-start gap-2 rounded-none px-4!",
                                                        isActive &&
                                                            "bg-secondary",
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Theme Selector */}
                                <div className="border-t p-4">
                                    <label className="text-sm font-medium mb-2 block">
                                        Theme
                                    </label>
                                    <MobileThemeSelect />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
