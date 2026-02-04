// Mock data for the AI Brief Analyzer application

export const providers = [
    { id: "openai", name: "OpenAI" },
    { id: "anthropic", name: "Anthropic" },
    { id: "google", name: "Google" },
] as const;

export const modelsByProvider: Record<
    string,
    { id: string; name: string; costPer1kTokens: number }[]
> = {
    openai: [
        { id: "gpt-4o", name: "GPT-4o", costPer1kTokens: 0.005 },
        { id: "gpt-4o-mini", name: "GPT-4o Mini", costPer1kTokens: 0.00015 },
        { id: "gpt-4-turbo", name: "GPT-4 Turbo", costPer1kTokens: 0.01 },
    ],
    anthropic: [
        {
            id: "claude-3-5-sonnet",
            name: "Claude 3.5 Sonnet",
            costPer1kTokens: 0.003,
        },
        { id: "claude-3-opus", name: "Claude 3 Opus", costPer1kTokens: 0.015 },
        {
            id: "claude-3-haiku",
            name: "Claude 3 Haiku",
            costPer1kTokens: 0.00025,
        },
    ],
    google: [
        {
            id: "gemini-1.5-pro",
            name: "Gemini 1.5 Pro",
            costPer1kTokens: 0.00125,
        },
        {
            id: "gemini-1.5-flash",
            name: "Gemini 1.5 Flash",
            costPer1kTokens: 0.000075,
        },
    ],
};

export const mockMetrics = {
    inputTokens: 1247,
    outputTokens: 2856,
    totalTokens: 4103,
    estimatedCost: 0.0205,
    latency: 3.42,
    status: "success" as const,
};

export const mockAnalysisResult = {
    projectSummary: {
        title: "Project Summary",
        content: `The client is requesting a modern task management platform designed for distributed teams. The application should enable real-time collaboration, task assignment, progress tracking, and team communication. The primary goal is to replace their existing legacy system with a more intuitive and scalable solution.

Key objectives include improving team productivity by 25%, reducing task completion time, and providing comprehensive analytics for management oversight.`,
    },
    functionalRequirements: {
        title: "Functional Requirements",
        items: [
            "User authentication and role-based access control (Admin, Manager, Member)",
            "Project creation with customizable workflows and templates",
            "Task management with subtasks, dependencies, and priority levels",
            "Real-time updates and notifications via WebSocket",
            "File attachments and document management per task",
            "Time tracking and timesheet functionality",
            "Comments and @mentions within tasks",
            "Dashboard with customizable widgets",
            "Search and filtering across all projects and tasks",
            "Export functionality for reports (PDF, CSV)",
            "Integration APIs for third-party tools",
            "Mobile-responsive web application",
        ],
    },
    mvpVsNiceToHave: {
        title: "MVP vs Nice-to-Have",
        mvp: [
            "User authentication and basic roles",
            "Project and task CRUD operations",
            "Task assignment and status updates",
            "Basic dashboard view",
            "Email notifications",
            "File attachments",
        ],
        niceToHave: [
            "Real-time WebSocket updates",
            "Advanced analytics dashboard",
            "Time tracking features",
            "Custom workflow templates",
            "Third-party integrations",
            "Mobile native applications",
            "AI-powered task suggestions",
        ],
    },
    technicalStack: {
        title: "Suggested Technical Stack",
        categories: [
            {
                name: "Frontend",
                items: [
                    "Next.js 14 with App Router",
                    "TypeScript",
                    "TailwindCSS",
                    "React Query for data fetching",
                    "Zustand for state management",
                ],
            },
            {
                name: "Backend",
                items: [
                    "Node.js with Express or Fastify",
                    "PostgreSQL for primary database",
                    "Redis for caching and sessions",
                    "WebSocket for real-time features",
                ],
            },
            {
                name: "Infrastructure",
                items: [
                    "AWS or Vercel for hosting",
                    "Docker for containerization",
                    "GitHub Actions for CI/CD",
                    "CloudWatch for monitoring",
                ],
            },
            {
                name: "Third-Party Services",
                items: [
                    "Auth0 or Clerk for authentication",
                    "SendGrid for email notifications",
                    "S3 for file storage",
                    "Stripe for billing (if needed)",
                ],
            },
        ],
    },
    risksAndAssumptions: {
        title: "Risks and Assumptions",
        risks: [
            {
                level: "high",
                description:
                    "Data migration from legacy system may be complex and time-consuming",
            },
            {
                level: "high",
                description:
                    "Real-time features may require significant infrastructure investment",
            },
            {
                level: "medium",
                description:
                    "User adoption may be slow without proper training materials",
            },
            {
                level: "medium",
                description:
                    "Integration with existing tools may have compatibility issues",
            },
            {
                level: "low",
                description:
                    "Mobile responsiveness may require additional testing cycles",
            },
        ],
        assumptions: [
            "Client has access to their legacy database for migration",
            "Team size will remain under 500 users initially",
            "Browser support limited to modern evergreen browsers",
            "Client will provide design assets and brand guidelines",
            "Staging environment will be available for testing",
        ],
    },
    missingInformation: {
        title: "Missing Information & Questions",
        questions: [
            "What is the expected number of concurrent users at peak times?",
            "Are there specific compliance requirements (GDPR, SOC2, HIPAA)?",
            "What is the data retention policy for completed tasks?",
            "Should the system support multiple languages/localization?",
            "What existing tools need integration (Slack, Jira, etc.)?",
            "Is SSO/SAML authentication required for enterprise clients?",
            "What is the budget range for infrastructure and third-party services?",
            "Are there any specific accessibility requirements (WCAG level)?",
        ],
    },
    roughEstimation: {
        title: "Rough Estimation",
        phases: [
            {
                name: "Discovery & Planning",
                duration: "2 weeks",
                effort: "40 hours",
            },
            {
                name: "Design & Prototyping",
                duration: "3 weeks",
                effort: "80 hours",
            },
            {
                name: "MVP Development",
                duration: "8-10 weeks",
                effort: "400-500 hours",
            },
            { name: "Testing & QA", duration: "2 weeks", effort: "60 hours" },
            {
                name: "Deployment & Launch",
                duration: "1 week",
                effort: "20 hours",
            },
        ],
        totalDuration: "16-18 weeks",
        totalEffort: "600-700 hours",
        teamSize: "3-4 developers + 1 designer + 1 QA",
        caveats: [
            "Estimates assume no major scope changes during development",
            "Real-time features may add 2-3 weeks if included in MVP",
            "Third-party integrations estimated separately per integration",
        ],
    },
};

export const mockHistoryItems = [
    {
        id: "1",
        title: "Task Management Platform for Distributed Teams",
        model: "GPT-4o",
        provider: "OpenAI",
        cost: 0.0205,
        date: "2026-02-03T10:30:00Z",
        inputTokens: 1247,
        outputTokens: 2856,
    },
    {
        id: "2",
        title: "E-commerce Mobile App Redesign",
        model: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        cost: 0.0156,
        date: "2026-02-02T14:15:00Z",
        inputTokens: 892,
        outputTokens: 2341,
    },
    {
        id: "3",
        title: "Healthcare Patient Portal",
        model: "GPT-4o",
        provider: "OpenAI",
        cost: 0.0312,
        date: "2026-02-01T09:45:00Z",
        inputTokens: 1856,
        outputTokens: 4102,
    },
    {
        id: "4",
        title: "Real-time Analytics Dashboard",
        model: "Gemini 1.5 Pro",
        provider: "Google",
        cost: 0.0089,
        date: "2026-01-31T16:20:00Z",
        inputTokens: 1102,
        outputTokens: 2789,
    },
    {
        id: "5",
        title: "Internal HR Management System",
        model: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        cost: 0.0178,
        date: "2026-01-30T11:00:00Z",
        inputTokens: 1045,
        outputTokens: 2567,
    },
    {
        id: "6",
        title: "IoT Device Monitoring Platform",
        model: "GPT-4o Mini",
        provider: "OpenAI",
        cost: 0.0042,
        date: "2026-01-29T13:30:00Z",
        inputTokens: 987,
        outputTokens: 2234,
    },
    {
        id: "7",
        title: "Learning Management System",
        model: "GPT-4 Turbo",
        provider: "OpenAI",
        cost: 0.0456,
        date: "2026-01-27T15:10:00Z",
        inputTokens: 1678,
        outputTokens: 3892,
    },
];

export const mockAnalyticsData = {
    totalAnalyses: 847,
    totalCost: 142.56,
    averageCost: 0.168,
    mostUsedModel: "GPT-4o",
    mostUsedProvider: "OpenAI",
    analysesThisMonth: 127,
    costThisMonth: 21.34,
    modelUsage: [
        { model: "GPT-4o", count: 312, percentage: 36.8 },
        { model: "Claude 3.5 Sonnet", count: 234, percentage: 27.6 },
        { model: "Gemini 1.5 Pro", count: 156, percentage: 18.4 },
        { model: "GPT-4o Mini", count: 89, percentage: 10.5 },
        { model: "Other", count: 56, percentage: 6.6 },
    ],
    costOverTime: [
        { month: "Sep 2025", cost: 18.45 },
        { month: "Oct 2025", cost: 22.12 },
        { month: "Nov 2025", cost: 28.67 },
        { month: "Dec 2025", cost: 31.98 },
        { month: "Jan 2026", cost: 26.78 },
        { month: "Feb 2026", cost: 21.34 },
    ],
    analysesOverTime: [
        { month: "Sep 2025", count: 98 },
        { month: "Oct 2025", count: 124 },
        { month: "Nov 2025", count: 156 },
        { month: "Dec 2025", count: 178 },
        { month: "Jan 2026", count: 164 },
        { month: "Feb 2026", count: 127 },
    ],
};

export const sampleBrief = `Project Brief: Task Management Platform

Client: TechCorp Solutions
Date: February 2026

Overview:
We need a modern task management platform for our distributed team of 150+ employees across 5 countries. Our current system is outdated and doesn't support our remote-first workflow.

Requirements:
- User management with different permission levels
- Project organization with folders and tags  
- Task creation with subtasks and dependencies
- Real-time collaboration features
- File sharing and attachments
- Basic reporting and analytics
- Integration with Slack and Google Calendar

Timeline: We'd like to launch an MVP within 4 months.

Budget: Flexible, but looking for cost-effective solutions.

Additional Notes:
- Must be mobile-friendly
- Security is important as we handle client data
- Would like to migrate existing data from our current system`;
