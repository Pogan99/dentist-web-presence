import { createFileRoute } from "@tanstack/react-router";
import { clientConfig } from "@/client-config";
import { Nav } from "@/components/attorney/Nav";
import { TrustStrip } from "@/components/attorney/TrustStrip";
import { Hero } from "@/components/attorney/Hero";
import { PracticeAreas } from "@/components/attorney/PracticeAreas";
import { AboutAttorneys } from "@/components/attorney/AboutAttorneys";
import { Testimonials } from "@/components/attorney/Testimonials";
import { ConsultationBanner } from "@/components/attorney/ConsultationBanner";
import { ConsultationForm } from "@/components/attorney/ConsultationForm";
import { HoursLocation } from "@/components/attorney/HoursLocation";
import { Footer } from "@/components/attorney/Footer";

const config = clientConfig;

const hoursToSchema = () => {
  const map: Record<string, string> = {
    monday: "Mo", tuesday: "Tu", wednesday: "We",
    thursday: "Th", friday: "Fr", saturday: "Sa", sunday: "Su",
  };
  return Object.entries(config.hours)
    .filter(([, v]) => v && !/closed|appointment/i.test(v))
    .map(([k, v]) => `${map[k]} ${v.replace(/\s/g, "")}`);
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: config.businessName,
  telephone: config.phone,
  email: config.email,
  address: { "@type": "PostalAddress", streetAddress: config.address },
  geo: { "@type": "GeoCoordinates", latitude: config.lat, longitude: config.lng },
  openingHours: hoursToSchema(),
  url: `https://${config.domain}`,
};

const title = `${config.businessName} | Attorney in Jacksonville, FL`;
const description = `${config.tagline} — ${config.practiceAreas[0]?.name ?? "Legal services"} and more. Serving Jacksonville, FL. Free consultation. Call ${config.phone}.`;

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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <TrustStrip />
        <Hero />
        <PracticeAreas />
        <AboutAttorneys />
        <Testimonials />
        <ConsultationBanner />
        <ConsultationForm />
        <HoursLocation />
      </main>
      <Footer />
    </div>
  );
}
