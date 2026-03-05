import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description:
        "Sign in to AI Brief Analyzer with a magic link to access your analysis history and usage dashboard.",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
