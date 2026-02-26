"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, History, BarChart3, Menu, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { signOut } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";

const ThemeSelect = dynamic(() => import("./ThemeSelect"), { ssr: false });
const MobileThemeSelect = dynamic(() => import("./MobileThemeSelect"), {
    ssr: false,
});

const navigation = [
    { name: "Analyze", href: "/analyze", icon: FileText },
    { name: "History", href: "/history", icon: History },
    { name: "Usage", href: "/usage", icon: BarChart3 },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            setUserEmail(data.user?.email ?? null);
        });
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 items-center px-4 md:px-6">
                {/* Logo and App Name */}
                <div className="flex items-center gap-2 mr-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <FileText className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-lg hidden sm:inline-block">
                        AI Brief Analyzer
                    </span>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-1">
                    {navigation.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(item.href + "/");
                        return (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    size="sm"
                                    className={cn(
                                        "gap-2",
                                        isActive && "bg-secondary",
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className="hidden sm:inline-block">
                                        {item.name}
                                    </span>
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Theme Selector and User Controls */}
                <div className="flex items-center gap-2">
                    {/* Theme Selector - Desktop */}
                    <ThemeSelect />

                    {/* User Email - Desktop */}
                    {userEmail && (
                        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground max-w-36 border-l pl-3">
                            <User className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{userEmail}</span>
                        </div>
                    )}

                    {/* Sign Out - Desktop */}
                    <form action={signOut}>
                        <Button
                            type="submit"
                            variant="ghost"
                            size="sm"
                            className="hidden md:flex gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                        </Button>
                    </form>

                    {/* Mobile Menu */}
                    <Sheet
                        open={mobileMenuOpen}
                        onOpenChange={setMobileMenuOpen}
                    >
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="sm" className="ml-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-70">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4">
                                {/* User Email - Mobile */}
                                {userEmail && (
                                    <div className="flex items-center gap-2 px-4 py-2 border-b">
                                        <User className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <span className="text-sm text-muted-foreground truncate">
                                            {userEmail}
                                        </span>
                                    </div>
                                )}
                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2">
                                    {navigation.map((item) => {
                                        const isActive =
                                            pathname === item.href ||
                                            pathname.startsWith(
                                                item.href + "/",
                                            );
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                <Button
                                                    variant={
                                                        isActive
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                    size="sm"
                                                    className={cn(
                                                        "w-full justify-start gap-2 rounded-none px-4!",
                                                        isActive &&
                                                            "bg-secondary",
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Button>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Theme Selector */}
                                <div className="border-t p-4">
                                    <label className="text-sm font-medium mb-2 block">
                                        Theme
                                    </label>
                                    <MobileThemeSelect />
                                </div>

                                {/* Sign Out */}
                                <div className="border-t p-4">
                                    <form action={signOut}>
                                        <Button
                                            type="submit"
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign out
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
