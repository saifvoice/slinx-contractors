import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Zap className="h-7 w-7" />
        </span>
        <p className="mt-6 font-display text-6xl font-semibold text-primary">404</p>
        <h1 className="mt-3 font-display text-xl font-semibold">This page isn't connected</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have moved. Check the URL, or head
          back to somewhere useful.
        </p>
        <Link href="/" className="mt-8">
          <Button variant="accent">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Button>
        </Link>
      </section>
      <Footer />
    </>
  );
}
