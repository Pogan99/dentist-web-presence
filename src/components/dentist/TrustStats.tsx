import { useEffect, useRef, useState } from "react";
import { useClientConfig } from "@/lib/use-client-config";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-2xl" style={{ color: "#C9963A" }}>
      {"★".repeat(Math.round(rating))}
    </span>
  );
}

export function TrustStats() {
  const config = useClientConfig();

  const stats = [
    {
      value: <CountUp target={config.yearsInPractice} suffix="+" />,
      label: "Years in Practice",
      sub: "Serving Jacksonville since 2006",
    },
    {
      value: <CountUp target={config.patientsServed} suffix="+" />,
      label: "Patients Served",
      sub: "Families throughout NE Florida",
    },
    {
      value: (
        <span className="flex flex-col items-center gap-1">
          <Stars rating={config.googleRating} />
          <span className="text-3xl font-bold font-sans" style={{ color: "#1A1A1A" }}>
            {config.googleRating}
          </span>
        </span>
      ),
      label: "Google Rating",
      sub: "Verified patient reviews",
    },
    {
      value: <CountUp target={config.googleReviewCount} suffix="+" />,
      label: "5-Star Reviews",
      sub: "Real patients, real feedback",
    },
  ];

  return (
    <section className="w-full py-12" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} card-lift flex flex-col items-center rounded-xl bg-white p-6 text-center`}
              style={{ boxShadow: "0 2px 16px 0 rgba(27,77,92,0.07)" }}
            >
              <div
                className="mb-1 text-4xl font-bold font-sans"
                style={{ color: "#1B4D5C" }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "#1A1A1A" }}>
                {s.label}
              </div>
              <div className="mt-1 text-xs" style={{ color: "#6B7280" }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
