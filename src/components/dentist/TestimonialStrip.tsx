import { useClientConfig } from "@/lib/use-client-config";

function Stars({ count }: { count: number }) {
  return (
    <span style={{ color: "#C9963A" }}>
      {"★".repeat(Math.round(count))}
    </span>
  );
}

export function TestimonialStrip() {
  const config = useClientConfig();
  // Show all except the first (used in PullQuote)
  const rest = config.testimonials.slice(1);

  return (
    <section className="w-full py-16" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="reveal mb-10 text-center font-serif text-3xl md:text-4xl" style={{ color: "#1A1A1A" }}>
          What Patients Say
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {rest.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} card-lift rounded-2xl bg-white p-7`}
              style={{ boxShadow: "0 2px 16px 0 rgba(27,77,92,0.07)" }}
            >
              <Stars count={t.rating} />
              <p className="mt-3 text-base italic leading-relaxed" style={{ color: "#1A1A1A" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
