import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAnalysisResult } from "@/lib/mock-data";

export function AnalysisResults() {
    const result = mockAnalysisResult;

    return (
        <div className="space-y-6">
            {/* Project Summary */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.projectSummary.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {result.projectSummary.content}
                    </p>
                </CardContent>
            </Card>

            {/* Functional Requirements */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.functionalRequirements.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {result.functionalRequirements.items.map(
                            (item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-sm"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                                        {index + 1}
                                    </span>
                                    <span className="text-muted-foreground pt-0.5">
                                        {item}
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                </CardContent>
            </Card>

            {/* MVP vs Nice-to-Have */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.mvpVsNiceToHave.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Badge variant="default">MVP</Badge>
                                <span className="text-muted-foreground font-normal">
                                    Core Features
                                </span>
                            </h4>
                            <ul className="space-y-2">
                                {result.mvpVsNiceToHave.mvp.map(
                                    (item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                            {item}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Badge variant="secondary">Nice-to-Have</Badge>
                                <span className="text-muted-foreground font-normal">
                                    Future Features
                                </span>
                            </h4>
                            <ul className="space-y-2">
                                {result.mvpVsNiceToHave.niceToHave.map(
                                    (item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                                            {item}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Technical Stack */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.technicalStack.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {result.technicalStack.categories.map(
                            (category, index) => (
                                <div key={index}>
                                    <h4 className="text-sm font-medium mb-3">
                                        {category.name}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map(
                                            (item, itemIndex) => (
                                                <Badge
                                                    key={itemIndex}
                                                    variant="outline"
                                                    className="font-normal"
                                                >
                                                    {item}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Risks and Assumptions */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.risksAndAssumptions.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium mb-3">
                                Identified Risks
                            </h4>
                            <div className="space-y-2">
                                {result.risksAndAssumptions.risks.map(
                                    (risk, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 text-sm"
                                        >
                                            <Badge
                                                variant={
                                                    risk.level === "high"
                                                        ? "destructive"
                                                        : risk.level ===
                                                            "medium"
                                                          ? "secondary"
                                                          : "default"
                                                }
                                                className="shrink-0 capitalize"
                                            >
                                                {risk.level}
                                            </Badge>
                                            <span className="text-muted-foreground">
                                                {risk.description}
                                            </span>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-3">
                                Assumptions
                            </h4>
                            <ul className="space-y-2">
                                {result.risksAndAssumptions.assumptions.map(
                                    (assumption, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                                            {assumption}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Missing Information */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.missingInformation.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {result.missingInformation.questions.map(
                            (question, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-sm"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-medium">
                                        ?
                                    </span>
                                    <span className="text-muted-foreground pt-0.5">
                                        {question}
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                </CardContent>
            </Card>

            {/* Rough Estimation */}
            <Card className="gap-2">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {result.roughEstimation.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Phases Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 font-medium">
                                        Phase
                                    </th>
                                    <th className="text-left py-2 font-medium">
                                        Duration
                                    </th>
                                    <th className="text-left py-2 font-medium">
                                        Effort
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.roughEstimation.phases.map(
                                    (phase, index) => (
                                        <tr
                                            key={index}
                                            className="border-b last:border-0"
                                        >
                                            <td className="py-2 text-muted-foreground">
                                                {phase.name}
                                            </td>
                                            <td className="py-2 font-mono text-muted-foreground">
                                                {phase.duration}
                                            </td>
                                            <td className="py-2 font-mono text-muted-foreground">
                                                {phase.effort}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4">
                            <div className="text-xs text-muted-foreground mb-1">
                                Total Duration
                            </div>
                            <div className="text-lg font-semibold">
                                {result.roughEstimation.totalDuration}
                            </div>
                        </div>
                        <div className="rounded-lg border p-4">
                            <div className="text-xs text-muted-foreground mb-1">
                                Total Effort
                            </div>
                            <div className="text-lg font-semibold">
                                {result.roughEstimation.totalEffort}
                            </div>
                        </div>
                        <div className="rounded-lg border p-4">
                            <div className="text-xs text-muted-foreground mb-1">
                                Recommended Team
                            </div>
                            <div className="text-lg font-semibold">
                                {result.roughEstimation.teamSize}
                            </div>
                        </div>
                    </div>

                    {/* Caveats */}
                    <div>
                        <h4 className="text-sm font-medium mb-2">Caveats</h4>
                        <ul className="space-y-1">
                            {result.roughEstimation.caveats.map(
                                (caveat, index) => (
                                    <li
                                        key={index}
                                        className="text-xs text-muted-foreground flex items-center gap-2"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                                        {caveat}
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
