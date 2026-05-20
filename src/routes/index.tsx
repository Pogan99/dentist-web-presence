import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { clientConfig } from "@/client-config";
import { InsuranceBanner } from "@/components/dentist/InsuranceBanner";
import { Nav } from "@/components/dentist/Nav";
import { NewPatientBanner } from "@/components/dentist/NewPatientBanner";
import { Hero } from "@/components/dentist/Hero";
import { TrustStats } from "@/components/dentist/TrustStats";
import { Services } from "@/components/dentist/Services";
import { PullQuoteTestimonial } from "@/components/dentist/PullQuoteTestimonial";
import { Team } from "@/components/dentist/Team";
import { InsuranceGrid } from "@/components/dentist/InsuranceGrid";
import { BookingSection } from "@/components/dentist/BookingSection";
import { TestimonialStrip } from "@/components/dentist/TestimonialStrip";
import { Footer } from "@/components/dentist/Footer";

const config = clientConfig;

const hoursToSchema = () => {
  const map: Record<string, string> = {
    Monday: "Mo", Tuesday: "Tu", Wednesday: "We",
    Thursday: "Th", Friday: "Fr", Saturday: "Sa", Sunday: "Su",
  };
  return Object.entries(config.hours)
    .filter(([, v]) => v && !/closed|appointment/i.test(v))
    .map(([k, v]) => `${map[k] ?? k} ${v.replace(/\s/g, "")}`);
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: config.businessName,
  telephone: config.phone,
  email: config.email,
  address: { "@type": "PostalAddress", streetAddress: config.address },
  geo: config.lat ? { "@type": "GeoCoordinates", latitude: config.lat, longitude: config.lng } : undefined,
  openingHours: hoursToSchema(),
  url: config.domain ? `https://${config.domain}` : undefined,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: config.googleRating,
    reviewCount: config.googleReviewCount,
  },
};

const title = `${config.businessName} | Family Dentist in Jacksonville, FL`;
const description = `${config.tagline} — General, cosmetic & emergency dentistry. ${config.googleReviewCount}+ five-star reviews. New patients welcome. Call ${config.phone}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Index,
});

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Index() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F1", color: "#1A1A1A" }}>
      <InsuranceBanner />
      <Nav />
      <NewPatientBanner />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <PullQuoteTestimonial />
        <Team />
        <InsuranceGrid />
        <BookingSection />
        <TestimonialStrip />
      </main>
      <Footer />
    </div>
  );
}
