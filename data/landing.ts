import {
    FileText,
    Zap,
    BarChart3,
    Shield,
    Layers,
    DollarSign,
} from "lucide-react";

export const FEATURES = [
    {
        icon: Layers,
        title: "Multi-Model Intelligence",
        description:
            "Choose from leading AI providers to find the perfect balance of quality, speed, and cost for your analysis.",
    },
    {
        icon: FileText,
        title: "Structured Output",
        description:
            "Get clear project summaries, functional requirements, MVP scope, risk assessments, and time estimations — every time.",
    },
    {
        icon: DollarSign,
        title: "Cost Transparency",
        description:
            "Track exactly how much each analysis costs with real-time token usage, pricing breakdowns, and cost-per-request metrics.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description:
            "Get comprehensive project breakdowns in seconds, not hours. Latency tracking shows you exactly how fast each model performs.",
    },
    {
        icon: BarChart3,
        title: "Usage Analytics",
        description:
            "Monitor your usage patterns with a built-in dashboard. Track costs over time, model usage distribution, and performance trends.",
    },
    {
        icon: Shield,
        title: "Production Ready",
        description:
            "Built with rate limiting, usage safeguards, and robust error handling to handle real-world workloads reliably.",
    },
];

export const STEPS = [
    {
        step: "01",
        title: "Paste Your Brief",
        description:
            "Drop in any project brief — from a one-liner idea to a multi-page document. No formatting required.",
    },
    {
        step: "02",
        title: "Choose Your AI Model",
        description:
            "Select from multiple AI providers and models. Compare quality and cost to find your perfect fit.",
    },
    {
        step: "03",
        title: "Get Actionable Results",
        description:
            "Receive a structured breakdown with requirements, MVP scope, tech stack suggestions, risks, and time estimates.",
    },
];

export const BENEFITS = [
    "Project summary and clear scope definition",
    "Functional requirements extraction",
    "MVP vs. Nice-to-Have prioritization",
    "Suggested technical stack recommendations",
    "Risk assessment and assumptions",
    "Missing information and follow-up questions",
    "Rough timeline and effort estimation",
    "Full token usage and cost reporting",
];

export const FREE_FEATURES = [
    "3 analyses per day",
    "Up to 3,000 characters per brief",
    "Economy AI Models (GPT-4o-mini, Claude Haiku, Gemini Flash)",
    "Multi-model selection",
    "Structured technical breakdown",
    "MVP scope definition",
    "Risk assessment & missing requirements detection",
    "Budget estimation with detailed breakdown",
    "Token usage & cost tracking",
    "Latency measurement",
    "User-level analytics dashboard",
    "Limited history storage",
];

export const PREMIUM_FEATURES = [
    "Extended monthly analysis limits",
    "Long-form briefs (up to 15,000 characters)",
    "Access to advanced AI models",
    "Advanced multi-model comparison",
    "Detailed development timeline simulation",
    "Configurable hourly rates & role-based costing",
    "Exportable reports (PDF / Markdown)",
    "Extended analytics & performance insights",
    "Priority processing queue",
    "Full history access",
];
