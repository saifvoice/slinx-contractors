import { Navbar } from "@/components/navigation/navbar";
import { Hero } from "@/components/hero/hero";
import { TrustedCompanies } from "@/components/home/trusted-companies";
import { Stats } from "@/components/home/stats";
import { FeaturedServices } from "@/components/home/featured-services";
import { Industries } from "@/components/home/industries";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Testimonials } from "@/components/home/testimonials";
import { LatestNews } from "@/components/home/latest-news";
import { CallToAction } from "@/components/home/call-to-action";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Stats />
      <FeaturedServices />
      <Industries />
      <FeaturedProjects />
      <Testimonials />
      <LatestNews />
      <CallToAction />
      <Footer />
    </>
  );
}
