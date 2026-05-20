import { useClientConfig } from "@/lib/use-client-config";

export function NewPatientBanner() {
  const config = useClientConfig();

  return (
    <div
      className="w-full px-4 py-3 text-center animate-fade-up"
      style={{ backgroundColor: "#C9963A" }}
    >
      <p className="text-sm font-semibold text-white sm:text-base">
        <span className="font-bold">{config.newPatientOffer}</span>
        {"  "}
        <span className="opacity-90">— Mention this offer when you call.</span>
        {"  "}
        <a
          href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
          className="ml-2 inline-block rounded-full border-2 border-white px-4 py-0.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#C9963A] transition-colors"
        >
          Call to Redeem
        </a>
      </p>
    </div>
  );
}
