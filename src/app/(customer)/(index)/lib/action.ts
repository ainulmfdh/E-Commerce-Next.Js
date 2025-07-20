"use server";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResult } from "@/types";

export async function Logout(_: unknown, formData: FormData): Promise<ActionResult> {
    const sessionCookieName = lucia.sessionCookieName;
    const sessionId = cookies().get(sessionCookieName)?.value;

    if (sessionId) {
        await lucia.invalidateSession(sessionId);
        cookies().delete(sessionCookieName);
    }

    redirect("/sign-in");
}
