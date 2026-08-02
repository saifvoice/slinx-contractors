import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-gradient-to-br from-primary to-primary/90 p-10 text-primary-foreground sm:p-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            <h2 className="text-2xl font-display font-semibold sm:text-3xl">
              Ready to scope your project?
            </h2>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Tell us what you're building and we'll come back with a scoped proposal —
              usually within two business days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact/quote">
              <Button variant="accent" size="lg">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Talk to us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
