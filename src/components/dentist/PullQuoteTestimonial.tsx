import { useClientConfig } from "@/lib/use-client-config";

export function PullQuoteTestimonial() {
  const config = useClientConfig();
  const featured = config.testimonials[0];

  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ backgroundColor: "#1B4D5C" }}
    >
      {/* Background image with tint */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1588776814546-1ffbb9782a61?w=1600&q=60)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          {/* Decorative quote + text */}
          <div className="flex-1">
            <div
              className="font-serif leading-none select-none"
              style={{
                fontSize: "10rem",
                color: "#C9963A",
                opacity: 0.2,
                lineHeight: 0.7,
                marginBottom: "-1rem",
              }}
              aria-hidden
            >
              "
            </div>
            <blockquote
              className="font-serif text-2xl italic leading-relaxed text-white md:text-3xl lg:text-4xl"
              style={{ maxWidth: "640px" }}
            >
              {featured.quote}
            </blockquote>
            <p
              className="mt-6 text-sm font-semibold uppercase tracking-[0.15em]"
              style={{ color: "#C9963A" }}
            >
              — {featured.author}
            </p>
          </div>

          {/* Patient photo */}
          <div className="shrink-0">
            <div
              className="h-48 w-48 rounded-full overflow-hidden border-4"
              style={{ borderColor: "#C9963A" }}
            >
              <img
                src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&q=80"
                alt="Happy patient"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
