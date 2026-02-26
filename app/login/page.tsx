"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    FileText,
    Mail,
    ArrowRight,
    CheckCircle2,
    Loader2,
} from "lucide-react";

type LoginState = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<LoginState>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        setState("loading");
        setErrorMessage("");

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                emailRedirectTo: `${window.location.origin}/auth/confirm`,
            },
        });

        if (error) {
            setState("error");
            setErrorMessage(error.message);
        } else {
            setState("sent");
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <div className="flex h-14 items-center px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <FileText className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-lg">
                            AI Brief Analyzer
                        </span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-8 pb-8 px-8">
                        {state === "sent" ? (
                            /* Success state */
                            <div className="text-center space-y-4">
                                <div className="flex justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        Check your email
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        We sent a magic link to{" "}
                                        <span className="font-medium text-foreground">
                                            {email}
                                        </span>
                                        . Click the link in the email to sign
                                        in.
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="mt-4"
                                    onClick={() => {
                                        setState("idle");
                                        setEmail("");
                                    }}
                                >
                                    Use a different email
                                </Button>
                            </div>
                        ) : (
                            /* Login form */
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <div className="flex justify-center mb-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                                            <Mail className="h-7 w-7 text-primary" />
                                        </div>
                                    </div>
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        Sign in to continue
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Enter your email and we&apos;ll send you
                                        a magic link to sign in, no password
                                        needed.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            autoFocus
                                            disabled={state === "loading"}
                                        />
                                    </div>

                                    {state === "error" && errorMessage && (
                                        <p className="text-sm text-destructive">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full gap-2"
                                        disabled={
                                            state === "loading" || !email.trim()
                                        }
                                    >
                                        {state === "loading" ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Sending magic link...
                                            </>
                                        ) : (
                                            <>
                                                Send magic link
                                                <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
