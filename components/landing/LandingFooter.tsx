import Link from "next/link";
import { FileText } from "lucide-react";

export function LandingFooter() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <FileText className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">
                                AI Brief Analyzer
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                            Transform vague project briefs into structured,
                            actionable technical documentation — powered by the
                            best AI models available.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Product</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <a
                                    href="#features"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#how-it-works"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#benefits"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Benefits
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#plans"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Plans
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Get Started */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Get Started</h4>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    href="/analyze"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Analyze a Brief
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/history"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    View History
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/usage"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Usage Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Divider & Copyright */}
                <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} AI Brief Analyzer. All
                        rights reserved.
                    </p>
                    {/* <p className="text-xs text-muted-foreground">
                        Built with AI-driven precision.
                    </p> */}
                </div>
            </div>
        </footer>
    );
}
