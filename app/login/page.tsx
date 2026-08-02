"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, type AuthActionState } from "@/lib/supabase/auth-actions";

const initialState: AuthActionState = {};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const justRegistered = searchParams.get("registered") === "true";

  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <>
      <Navbar />
      <section className="flex min-h-[75vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
          <h1 className="font-display text-xl font-semibold">Client Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to view quotes, invoices and project updates.
          </p>

          {justRegistered && (
            <p className="mt-4 rounded-md bg-secondary/10 px-3 py-2 text-xs text-secondary">
              Account created — check your email to confirm, then sign in.
            </p>
          )}

          <form action={formAction} className="mt-6 space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />

            {state?.error && <p className="text-xs text-destructive">{state.error}</p>}

            <Button type="submit" variant="accent" className="w-full" disabled={pending}>
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs">
            <Link href="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-foreground">
              Create an account
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
