"use client";

import Link from "next/link";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Benefits", href: "#benefits" },
    { name: "Plans", href: "#plans" },
];

export function LandingHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
                        <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">
                        AI Brief Analyzer
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/analyze">
                        <Button size="sm" className="rounded-full px-5">
                            Get Started Free
                        </Button>
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            href="/analyze"
                            onClick={() => setMobileOpen(false)}
                        >
                            <Button
                                size="sm"
                                className="rounded-full w-full mt-2"
                            >
                                Get Started Free
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
