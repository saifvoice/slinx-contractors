import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with S-LINx Contractors — phone, email, WhatsApp or send us a message.",
};

const contactChannels = [
  { icon: Phone, label: "Phone", value: "+234 000 000 0000", href: "tel:+2340000000000" },
  { icon: Mail, label: "Email", value: "hello@slinxcontractors.com", href: "mailto:hello@slinxcontractors.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/2340000000000" },
  { icon: MapPin, label: "Office", value: "Lagos, Nigeria", href: "#map" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Reach us directly, or send a message and we'll route it to the right team."
      />

      <section className="py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {contactChannels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              </a>
            ))}

            <div id="map" className="overflow-hidden rounded-lg border border-border">
              <iframe
                title="S-LINx Contractors office location"
                src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              For project quotes, use the{" "}
              <a href="/contact/quote" className="text-accent hover:underline">
                dedicated quote form
              </a>{" "}
              instead — you'll get a faster, more scoped response.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
