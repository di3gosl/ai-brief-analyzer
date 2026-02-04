"use client";

import Link from "next/link";
import { formatDistanceToNow } from "@/lib/date-utils";
import { mockHistoryItems } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight } from "lucide-react";

export function HistoryList() {
    return (
        <div className="space-y-4">
            {mockHistoryItems.map((item) => (
                <Link
                    key={item.id}
                    href={`/history/${item.id}`}
                    className="block"
                >
                    <Card className="hover:bg-accent/50 transition-colors cursor-pointer py-4">
                        <CardContent className="p-0 px-6">
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm truncate">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge
                                            variant="outline"
                                            className="text-xs font-normal"
                                        >
                                            {item.model}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            {item.provider}
                                        </span>
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                                    <span className="text-sm font-mono">
                                        ${item.cost.toFixed(4)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(
                                            new Date(item.date),
                                        )}
                                    </span>
                                </div>

                                {/* Arrow */}
                                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
