"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Get the authenticated user's ID.
 * Redirects to /login if not authenticated.
 */
export async function getAuthUserId(): Promise<string> {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return user.id;
}

/**
 * Sign out the current user and redirect to the landing page.
 */
export async function signOut(): Promise<void> {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/");
}
