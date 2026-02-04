import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalyticsData } from "@/lib/mock-data";
import {
    FileText,
    DollarSign,
    TrendingUp,
    Cpu,
    BarChart3,
    PieChart,
} from "lucide-react";

export function AnalyticsDashboard() {
    const data = mockAnalyticsData;

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Analyses */}
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Analyses
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {data.totalAnalyses.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +{data.analysesThisMonth} this month
                        </p>
                    </CardContent>
                </Card>

                {/* Total Cost */}
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Cost
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${data.totalCost.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            ${data.costThisMonth.toFixed(2)} this month
                        </p>
                    </CardContent>
                </Card>

                {/* Average Cost */}
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Avg. Cost/Analysis
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${data.averageCost.toFixed(3)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Per analysis request
                        </p>
                    </CardContent>
                </Card>

                {/* Most Used Model */}
                <Card className="gap-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Most Used Model
                        </CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {data.mostUsedModel}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {data.mostUsedProvider}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Cost Over Time Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Cost Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.costOverTime.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-sm text-muted-foreground w-20 shrink-0">
                                        {item.month.split(" ")[0]}
                                    </span>
                                    <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{
                                                width: `${(item.cost / Math.max(...data.costOverTime.map((d) => d.cost))) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono w-16 text-right">
                                        ${item.cost.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Usage by Model Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <PieChart className="h-4 w-4" />
                            Usage by Model
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.modelUsage.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-sm text-muted-foreground w-36 shrink-0 truncate">
                                        {item.model}
                                    </span>
                                    <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{
                                                width: `${item.percentage}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono w-14 text-right">
                                        {item.percentage.toFixed(1)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Analyses Over Time Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Analyses Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.analysesOverTime.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-sm text-muted-foreground w-20 shrink-0">
                                        {item.month.split(" ")[0]}
                                    </span>
                                    <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{
                                                width: `${(item.count / Math.max(...data.analysesOverTime.map((d) => d.count))) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono w-12 text-right">
                                        {item.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Provider Distribution */}
                <Card className="gap-2">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Cpu className="h-4 w-4" />
                            Quick Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">
                                    Analyses Today
                                </span>
                                <span className="text-sm font-semibold">
                                    12
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">
                                    Avg. Response Time
                                </span>
                                <span className="text-sm font-semibold">
                                    2.8s
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">
                                    Success Rate
                                </span>
                                <span className="text-sm font-semibold">
                                    98.5%
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">
                                    Avg. Tokens/Request
                                </span>
                                <span className="text-sm font-semibold">
                                    3,847
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-muted-foreground">
                                    Active Users
                                </span>
                                <span className="text-sm font-semibold">
                                    24
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
