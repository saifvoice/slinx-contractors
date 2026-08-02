import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter, Zap } from "lucide-react";

const columns = [
  {
    title: "ICT Solutions",
    links: [
      { label: "Networking", href: "/services/ict/networking" },
      { label: "Cybersecurity", href: "/services/ict/cybersecurity" },
      { label: "Cloud", href: "/services/ict/cloud" },
      { label: "Software Development", href: "/services/ict/software-development" },
    ],
  },
  {
    title: "Renewable Energy",
    links: [
      { label: "Commercial Solar", href: "/services/renewable-energy/commercial-solar" },
      { label: "Battery Storage", href: "/services/renewable-energy/battery-storage" },
      { label: "EV Charging", href: "/services/renewable-energy/ev-charging" },
      { label: "Energy Audits", href: "/services/renewable-energy/energy-audits" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Zap className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold">S-LINx Contractors</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Powering digital infrastructure. Energizing sustainable futures.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-primary-foreground/15 transition-colors hover:bg-primary-foreground/10"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-primary-foreground">{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container flex flex-col gap-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} S-LINx Contractors. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> +234 000 000 0000
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> hello@slinxcontractors.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Lagos, Nigeria
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
