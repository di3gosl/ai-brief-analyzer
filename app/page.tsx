import Link from "next/link";
import {
    Zap,
    Clock,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Target,
    TrendingUp,
    Check,
    Crown,
    Infinity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
    BENEFITS,
    FEATURES,
    FREE_FEATURES,
    PREMIUM_FEATURES,
    STEPS,
} from "@/data/landing";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <LandingHeader />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 bg-primary/8 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 md:px-6 pt-20 pb-24 md:pt-32 md:pb-36">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <Badge
                            variant="secondary"
                            className="rounded-full px-4 py-1.5 text-sm font-medium"
                        >
                            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                            AI-Powered Brief Analysis
                        </Badge>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Turn vague briefs into{" "}
                            <span className="text-primary">
                                actionable plans
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Stop wasting hours deciphering unclear project
                            requirements. Our AI analyzes any brief and delivers
                            structured, technical documentation in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/analyze">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 text-base h-12 gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                                >
                                    Analyze Your Brief
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <a href="#features">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full px-8 text-base h-12"
                                >
                                    See How It Works
                                </Button>
                            </a>
                        </div>

                        {/* Social proof / quick stats */}
                        <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>Results in seconds</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                <span>Multiple AI models</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <span>Full cost tracking</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 md:py-28 bg-muted/80">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                        <Badge
                            variant="outline"
                            className="rounded-full px-4 py-1"
                        >
                            Features
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Everything you need to analyze briefs effectively
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Powerful AI analysis with complete transparency into
                            cost, performance, and quality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {FEATURES.map((feature) => (
                            <Card
                                key={feature.title}
                                className="group border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            >
                                <CardContent className="pt-6 pb-6 px-6 space-y-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                        <Badge
                            variant="outline"
                            className="rounded-full px-4 py-1"
                        >
                            How It Works
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            From brief to breakdown in three steps
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            No complicated setup. No learning curve. Just paste,
                            analyze, and build.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {STEPS.map((item, index) => (
                            <div
                                key={item.step}
                                className="relative text-center space-y-4"
                            >
                                {/* Connector line (desktop only) */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-border" />
                                )}
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits / What You Get Section */}
            <section id="benefits" className="py-20 md:py-28 bg-muted/80">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <div className="space-y-6">
                            <Badge
                                variant="outline"
                                className="rounded-full px-4 py-1"
                            >
                                What You Get
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                A complete project breakdown, every time
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Every analysis delivers a structured,
                                comprehensive report that transforms ambiguity
                                into clarity. No more guessing what the client
                                actually needs.
                            </p>
                            <Link href="/analyze">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 gap-2 mt-2"
                                >
                                    Try It Now
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Right - checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {BENEFITS.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium leading-snug">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans" className="py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                        <Badge
                            variant="outline"
                            className="rounded-full px-4 py-1"
                        >
                            Plans
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Simple, transparent pricing
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Start for free with full-featured access. Upgrade
                            when you need more power.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Free Plan */}
                        <Card className="relative border-border/50 bg-background flex flex-col">
                            <CardContent className="pt-8 pb-8 px-8 flex flex-col flex-1">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                                            <Zap className="h-5 w-5 text-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Free
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Starter
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold">
                                            $0
                                        </span>
                                        <span className="text-muted-foreground">
                                            /month
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Core access to the complete AI analysis
                                        workflow. Includes multi-model support
                                        (economy-tier models), structured
                                        output, cost observability, and detailed
                                        budget estimation.
                                    </p>
                                </div>

                                <Separator className="mb-6" />

                                <ul className="space-y-3 mb-8 flex-1">
                                    {FREE_FEATURES.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/analyze" className="w-full">
                                    <Button
                                        size="lg"
                                        className="w-full rounded-full gap-2"
                                    >
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Optimized for focused project validation and
                                    structured technical analysis.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Premium Plan */}
                        <Card className="relative border-primary/40 bg-background shadow-lg shadow-primary/5 flex flex-col">
                            {/* Coming Soon badge */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <Badge className="rounded-full px-4 py-1 text-xs font-semibold shadow-sm">
                                    Coming Soon
                                </Badge>
                            </div>

                            <CardContent className="pt-8 pb-8 px-8 flex flex-col flex-1">
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                            <Crown className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Premium
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Professional
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-muted-foreground">
                                            TBD
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Advanced AI orchestration and extended
                                        analytical capabilities for professional
                                        use. Designed for agencies, CTOs, and
                                        product teams requiring deeper modeling
                                        and advanced exports.
                                    </p>
                                </div>

                                <Separator className="mb-6" />

                                <ul className="space-y-3 mb-8 flex-1">
                                    {PREMIUM_FEATURES.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full rounded-full gap-2"
                                    disabled
                                >
                                    <Infinity className="h-4 w-4" />
                                    Coming Soon
                                </Button>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Built for teams requiring deeper technical
                                    modeling and strategic planning.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-muted/80">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <Card className="border-primary/20 bg-linear-to-br from-primary/5 via-background to-primary/5 overflow-hidden relative">
                            {/* Decorative glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-primary/10 rounded-full blur-3xl z-0" />

                            <CardContent className="relative z-10 py-16 px-6 md:px-12 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                    Ready to transform your project briefs?
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                                    Start analyzing briefs with AI-powered
                                    precision today. No sign-up required — just
                                    paste your brief and go.
                                </p>
                                <div className="pt-4">
                                    <Link href="/analyze">
                                        <Button
                                            size="lg"
                                            className="rounded-full px-10 text-base h-12 gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                                        >
                                            Analyze Your First Brief
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
