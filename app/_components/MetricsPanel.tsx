import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Coins,
    Clock,
    CheckCircle2,
    Circle,
    AlertCircle,
    Loader2,
} from "lucide-react";

interface Props {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    estimatedCost: number;
    latency: number;
    status: "idle" | "running" | "success" | "error";
}

export function MetricsPanel({
    inputTokens,
    outputTokens,
    totalTokens,
    estimatedCost,
    latency,
    status,
}: Props) {
    const statusConfig = {
        idle: {
            icon: Circle,
            label: "Idle",
            color: "text-muted-foreground",
            badgeVariant: "secondary" as const,
        },
        running: {
            icon: Loader2,
            label: "Running",
            color: "text-blue-500",
            badgeVariant: "outline" as const,
        },
        success: {
            icon: CheckCircle2,
            label: "Success",
            color: "text-emerald-500",
            badgeVariant: "default" as const,
        },
        error: {
            icon: AlertCircle,
            label: "Error",
            color: "text-red-500",
            badgeVariant: "destructive" as const,
        },
    };

    const currentStatus = statusConfig[status];
    const StatusIcon = currentStatus.icon;

    return (
        <div className="flex flex-col gap-4">
            {/* Token Usage Card */}
            <Card className="gap-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Coins className="h-4 w-4 text-muted-foreground" />
                        Token Usage
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Input
                        </span>
                        <span className="text-sm font-mono">
                            {inputTokens.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Output
                        </span>
                        <span className="text-sm font-mono">
                            {outputTokens.toLocaleString()}
                        </span>
                    </div>
                    <div className="border-t pt-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Total</span>
                            <span className="text-sm font-mono font-medium">
                                {totalTokens.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Estimated Cost Card */}
            <Card className="gap-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <span className="text-muted-foreground">$</span>
                        Estimated Cost
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-semibold font-mono">
                        ${estimatedCost.toFixed(4)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Based on current model pricing
                    </p>
                </CardContent>
            </Card>

            {/* Latency Card */}
            <Card className="gap-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Latency
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-semibold font-mono">
                        {latency.toFixed(2)}s
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Total response time
                    </p>
                </CardContent>
            </Card>

            {/* Run Status Card */}
            <Card className="gap-1">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                        Run Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <StatusIcon
                            className={cn(
                                "h-5 w-5",
                                currentStatus.color,
                                status === "running" && "animate-spin",
                            )}
                        />
                        <Badge variant={currentStatus.badgeVariant}>
                            {currentStatus.label}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
