import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.slinxcontractors.com";

export const metadata: Metadata = {
  title: {
    default: "S-LINx Contractors | ICT Solutions & Renewable Energy",
    template: "%s | S-LINx Contractors",
  },
  description:
    "S-LINx Contractors delivers ICT infrastructure and renewable energy solutions — networking, cybersecurity, cloud, solar and battery storage — for commercial and industrial clients.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "S-LINx Contractors",
    description: "Powering digital infrastructure. Energizing sustainable futures.",
    type: "website",
    url: SITE_URL,
    siteName: "S-LINx Contractors",
  },
  twitter: {
    card: "summary_large_image",
    title: "S-LINx Contractors",
    description: "Powering digital infrastructure. Energizing sustainable futures.",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "S-LINx Contractors",
  url: SITE_URL,
  description: "ICT Solutions and Renewable Energy contractor.",
  slogan: "Powering Digital Infrastructure. Energizing Sustainable Futures.",
  areaServed: "NG",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body text-foreground">
        <JsonLd data={organizationSchema} />
        {children}
      </body>
    </html>
  );
}
