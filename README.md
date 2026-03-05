# AI Brief Analyzer

**Transform vague project briefs into structured, actionable technical breakdowns using AI.**

AI Brief Analyzer is a full-stack web application that takes any project brief — from a one-liner idea to a multi-page document — and produces a comprehensive technical analysis including functional requirements, MVP scope, tech stack suggestions, risk assessments, and budget estimations. It supports multiple AI providers and models, giving users full transparency into cost, performance, and quality.

> **Live demo:** [ai-brief.diegosalazar.dev](https://ai-brief.diegosalazar.dev)

---

## Features

- **Multi-Model AI Analysis** — Choose from OpenAI, Anthropic, and Google models to analyze briefs. Compare quality, speed, and cost across providers.
- **Structured Output** — Every analysis returns a consistent, schema-validated breakdown: project summary, functional requirements, MVP vs. nice-to-have prioritization, suggested tech stack, risks & assumptions, missing information, and rough estimations.
- **Budget Estimation** — AI-generated phased effort breakdowns with person-hours, cost ranges, and team size recommendations based on industry-standard blended rates.
- **Cost & Token Transparency** — Real-time tracking of input/output tokens, per-request cost, and latency for every analysis.
- **Usage Analytics Dashboard** — Built-in dashboard to monitor analysis trends, cost over time, model usage distribution, and performance metrics.
- **Analysis History** — Persistent history of all analyses with full detail retrieval, stored in PostgreSQL via Prisma.
- **Magic Link Authentication** — Passwordless email authentication powered by Supabase Auth with custom HTML email templates.
- **Dark/Light Theme** — System-aware theme switching with manual override, built with `next-themes`.
- **Rate Limiting & Safeguards** — Daily analysis limits (3/day free tier) and brief character limits to control costs.
- **Responsive Design** — Fully responsive UI from mobile to desktop using Tailwind CSS and Radix UI primitives.
- **SEO Optimized** — Dynamic metadata, OpenGraph/Twitter cards, sitemap, robots.txt, and web app manifest.
- **Analytics** — Google Analytics and Vercel Analytics integration for production monitoring.

---

## Tech Stack

| Layer              | Technology                                                    |
| ------------------ | ------------------------------------------------------------- |
| **Framework**      | Next.js (App Router)                                          |
| **Language**       | TypeScript                                                    |
| **UI**             | React                                                         |
| **Styling**        | TailwindCSS                                                   |
| **Components**     | shadcn/ui                                                     |
| **AI SDK**         | Vercel AI SDK                                                 |
| **AI Providers**   | OpenAI, Anthropic, Google Gemini                              |
| **Database**       | PostgreSQL via Prisma ORM                                     |
| **Authentication** | Supabase Auth (Magic Links)                                   |
| **Validation**     | Zod                                                           |
| **Forms**          | React Hook Form                                               |
| **Email**          | Resend                                                        |
| **Analytics**      | Google Analytics, Vercel Analytics                            |
| **Deployment**     | Vercel                                                        |

---

## AI Models Supported

| Provider    | Model               | Context Window |
| ----------- | ------------------- | -------------- |
| **OpenAI**  | GPT-5 Mini          | 400K tokens    |
|             | GPT-5 Nano          | 400K tokens    |
|             | GPT-4.1 Mini        | 1M tokens      |
|             | GPT-4.1 Nano        | 1M tokens      |
|             | GPT-4o Mini         | 128K tokens    |
| **Anthropic** | Claude 4.6 Sonnet | 200K tokens    |
|             | Claude 4.5 Haiku    | 200K tokens    |
| **Google**  | Gemini 2.5 Flash    | 1M tokens      |
|             | Gemini 2.5 Flash Lite | 1M tokens   |

Each model displays real-time token usage, cost breakdown, and latency metrics after every analysis.

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database (or a [Supabase](https://supabase.com/) project)
- API keys for at least one AI provider (OpenAI, Anthropic, or Google)

### Installation

```bash
git clone https://github.com/di3gosl/ai-brief-analyzer.git
cd ai-brief-analyzer
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# ─── Database ────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# ─── Supabase ────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# ─── AI Providers (add at least one) ─────────────────
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_GENERATIVE_AI_API_KEY="AI..."

# ─── Email (Resend) ─────────────────────────────────
RESEND_API_KEY="re_..."

# ─── Analytics (optional) ───────────────────────────
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# ─── Site URL (optional, used for SEO) ──────────────
NEXT_PUBLIC_SITE_URL="https://ai-brief.diegosalazar.dev"
```

### Database Setup

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/
├── layout.tsx              # Root layout with SEO metadata, theme, analytics
├── page.tsx                # Landing page with features, pricing, CTA
├── robots.ts               # Dynamic robots.txt generation
├── sitemap.ts              # Dynamic sitemap.xml generation
├── manifest.ts             # Web app manifest (PWA support)
├── analyze/
│   ├── page.tsx            # Brief analysis page
│   └── actions.ts          # Server actions: AI calls, rate limiting, persistence
├── history/
│   ├── page.tsx            # Analysis history list
│   └── [id]/page.tsx       # Individual analysis detail view
├── usage/
│   └── page.tsx            # Usage analytics dashboard
├── login/
│   └── page.tsx            # Magic link authentication
└── auth/
    └── confirm/route.ts    # Auth callback handler

components/
├── AnalysisResults.tsx     # Structured analysis output renderer
├── landing/                # Landing page sections
├── layout/                 # App header, theme selectors
└── ui/                     # Radix-based UI primitives (button, card, dialog, etc.)

lib/
├── site-config.ts          # Centralised SEO & site metadata configuration
├── constants.ts            # Usage limits and app-wide constants
├── models.ts               # AI model configs, pricing, cost calculation
├── prompts.ts              # System prompt for brief analysis
├── schemas.ts              # Zod schemas for structured AI output
├── prisma.ts               # Prisma client singleton
└── supabase/               # Supabase client (browser, server, proxy)

prisma/
├── schema.prisma           # Database schema (14 models)
└── migrations/             # Migration history

types/                      # TypeScript type definitions
```

---

## Key Technical Decisions

| Decision                              | Rationale                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Vercel AI SDK with structured output** | Enforces Zod schema validation on AI responses, ensuring consistent JSON structure across all providers.       |
| **Server Actions over API Routes**    | Colocates data mutations with UI, reduces boilerplate, and leverages Next.js progressive enhancement.          |
| **Multi-provider model registry**     | Centralised `MODEL_CONFIGS` object maps model IDs to pricing/context, enabling transparent cost calculation.    |
| **Prisma with PostgreSQL**            | Type-safe ORM with migration history, direct Supabase Postgres integration via `@prisma/adapter-pg`.          |
| **Supabase Magic Link Auth**          | Passwordless UX with zero friction — users authenticate via email without managing credentials.                |
| **Rate limiting at application layer** | Simple per-user daily limits enforced in Server Actions before AI calls, avoiding external rate-limit services. |
| **Dynamic SEO routes**                | `robots.ts`, `sitemap.ts`, and `manifest.ts` use Next.js Metadata API for type-safe, dynamic generation.      |

---

## License

This project is open source for reference and learning purposes. Feel free to explore the code, but please don't use it to directly replicate the site as your own portfolio.
