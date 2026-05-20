import { useClientConfig } from "@/lib/use-client-config";

export function Hero() {
  const config = useClientConfig();

  return (
    <section
      id="top"
      className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-28"
    >
      {/* Text */}
      <div>
        <p className="animate-fade-up mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9963A" }}>
          Jacksonville, FL · New Patients Welcome
        </p>
        <h1
          className="animate-fade-up-delay-1 font-serif text-4xl italic leading-tight md:text-5xl lg:text-6xl"
          style={{ color: "#1A1A1A" }}
        >
          {config.tagline}
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 text-lg leading-relaxed" style={{ color: "#6B7280" }}>
          {config.businessName} — where every appointment feels less like a chore
          and more like a visit with people who actually know your name.
        </p>
        <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1B4D5C" }}
          >
            Book an Appointment
          </a>
          <a
            href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-block rounded-lg border-2 px-6 py-3 text-sm font-bold transition-colors hover:bg-[#1B4D5C] hover:text-white"
            style={{ borderColor: "#1B4D5C", color: "#1B4D5C" }}
          >
            Call Now
          </a>
        </div>
        {config.emergencyLine && (
          <p className="animate-fade-up-delay-3 mt-4 text-sm" style={{ color: "#6B7280" }}>
            Dental emergency?{" "}
            <a
              href={`tel:${config.emergencyLine.replace(/[^0-9+]/g, "")}`}
              className="font-semibold underline"
              style={{ color: "#C9963A" }}
            >
              {config.emergencyLine}
            </a>
          </p>
        )}
      </div>

      {/* Image with offset frame */}
      <div className="relative flex items-center justify-center img-zoom">
        <div
          className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-2xl"
          style={{ boxShadow: "12px 12px 0 #1B4D5C" }}
        >
          <img
            src={config.heroImage}
            alt="Coastal Family Dentistry office"
            className="block h-[420px] w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
