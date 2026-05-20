import { useClientConfig } from "@/lib/use-client-config";

export function InsuranceBanner() {
  const config = useClientConfig();
  // Duplicate items so the marquee loops seamlessly
  const items = [...config.insuranceAccepted, ...config.insuranceAccepted];

  return (
    <div
      className="w-full overflow-hidden py-2"
      style={{ backgroundColor: "#1B4D5C" }}
      aria-label="Insurance accepted"
    >
      <div className="flex items-center gap-2 px-4">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-white/70 mr-3 hidden sm:block">
          Accepted Insurance
        </span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track gap-10">
            {items.map((insurer, i) => (
              <span
                key={i}
                className="shrink-0 text-sm font-medium text-white/90 px-3 py-0.5 rounded-full border border-white/20"
              >
                {insurer}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
