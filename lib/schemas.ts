import { z } from "zod";

/**
 * Zod schema for structured AI analysis output.
 */
export const briefAnalysisSchema = z.object({
    projectSummary: z
        .object({
            title: z
                .string()
                .describe(
                    "A short project title inferred from the brief or taken from it directly",
                ),
            content: z
                .string()
                .describe(
                    "A concise 2-4 paragraph summary identifying the core problem, target audience, and key business objectives",
                ),
        })
        .describe("High-level project summary"),

    functionalRequirements: z
        .object({
            items: z
                .array(
                    z
                        .string()
                        .describe(
                            "A self-contained functional requirement statement",
                        ),
                )
                .describe(
                    "Every functional requirement extracted or reasonably inferred from the brief",
                ),
        })
        .describe("List of functional requirements"),

    mvpVsNiceToHave: z
        .object({
            mvp: z
                .array(z.string())
                .describe(
                    "Minimum set of features needed to launch a usable first version",
                ),
            niceToHave: z
                .array(z.string())
                .describe(
                    "Features that add value but can be deferred to later iterations",
                ),
        })
        .describe("Feature prioritization split into MVP and nice-to-have"),

    technicalStack: z
        .object({
            categories: z
                .array(
                    z.object({
                        name: z
                            .string()
                            .describe(
                                "Category name (e.g., Frontend, Backend, Database, Infrastructure)",
                            ),
                        items: z
                            .array(z.string())
                            .describe(
                                "Recommended technologies with brief justification",
                            ),
                    }),
                )
                .describe(
                    "Technology recommendations grouped by category, tailored to the project scale",
                ),
        })
        .describe("Suggested technology stack"),

    risksAndAssumptions: z
        .object({
            risks: z
                .array(
                    z.object({
                        level: z
                            .enum(["high", "medium", "low"])
                            .describe("Severity level of the risk"),
                        description: z
                            .string()
                            .describe(
                                "Description of the risk (technical, timeline, or business)",
                            ),
                    }),
                )
                .describe("Potential risks with severity levels"),
            assumptions: z
                .array(z.string())
                .describe(
                    "Assumptions about the project that, if wrong, could change the analysis",
                ),
        })
        .describe("Risk assessment and assumptions"),

    missingInformation: z
        .object({
            questions: z
                .array(z.string())
                .describe(
                    "Questions or information gaps to clarify with the client before development",
                ),
        })
        .describe("Missing information and clarification questions"),

    roughEstimation: z
        .object({
            phases: z
                .array(
                    z.object({
                        name: z.string().describe("Phase name"),
                        duration: z
                            .string()
                            .describe('Duration estimate (e.g., "2 weeks")'),
                        effort: z
                            .string()
                            .describe(
                                'Effort estimate in person-hours (e.g., "40 hours")',
                            ),
                    }),
                )
                .describe("Breakdown of effort by project phase"),
            totalDuration: z
                .string()
                .describe('Overall duration estimate (e.g., "16-18 weeks")'),
            totalEffort: z
                .string()
                .describe('Overall effort estimate (e.g., "600-700 hours")'),
            teamSize: z
                .string()
                .describe(
                    'Recommended team composition (e.g., "3-4 developers + 1 designer + 1 QA")',
                ),
            caveats: z
                .array(z.string())
                .describe("Important caveats about the estimation"),
        })
        .describe("Rough effort and timeline estimation"),
});

/**
 * TypeScript type inferred from the schema.
 */
export type BriefAnalysis = z.infer<typeof briefAnalysisSchema>;
