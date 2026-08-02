import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { QuoteForm } from "@/components/forms/quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Tell us about your ICT or renewable energy project and get a scoped proposal.",
};

export default function RequestQuotePage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Request a Quote"
        title="Tell us about your project"
        description="Give us enough detail to scope it properly and we'll respond within two business days."
      />
      <section className="py-20">
        <div className="container max-w-2xl">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
