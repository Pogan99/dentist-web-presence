import { useEffect, useRef } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import {
  Smile,
  Sparkles,
  Zap,
  AlignCenter,
  Anchor,
  Heart,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  tooth: <Smile className="h-6 w-6" />,
  sparkles: <Sparkles className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  "align-center": <AlignCenter className="h-6 w-6" />,
  anchor: <Anchor className="h-6 w-6" />,
  heart: <Heart className="h-6 w-6" />,
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((node, i) => {
            setTimeout(() => node.classList.add("is-visible"), i * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function Services() {
  const config = useClientConfig();
  const ref = useReveal();

  return (
    <section id="services" className="w-full py-20" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="reveal mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "#1A1A1A" }}>
            Everything Your Family Needs
          </h2>
          <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
            From first cleanings to complete smile makeovers — all under one roof.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {config.services.map((svc, i) => (
            <div
              key={svc.name}
              className={`reveal reveal-delay-${(i % 3) + 1} card-lift group relative rounded-xl bg-white p-6 overflow-hidden`}
              style={{
                boxShadow: "0 2px 16px 0 rgba(27,77,92,0.07)",
                borderLeft: "3px solid #e5e7eb",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = "#1B4D5C")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderLeftColor = "#e5e7eb")
              }
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: "#1B4D5C" }}
              >
                {iconMap[svc.icon] ?? <Smile className="h-6 w-6" />}
              </div>
              <h3 className="mb-2 font-serif text-xl" style={{ color: "#1A1A1A" }}>
                {svc.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                {svc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
