import { useClientConfig } from "@/lib/use-client-config";

export function InsuranceGrid() {
  const config = useClientConfig();

  return (
    <section id="insurance" className="w-full py-16" style={{ backgroundColor: "#F8F6F1" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "#1A1A1A" }}>
            Insurance We Accept
          </h2>
          <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
            Don&apos;t see yours? Call us — we work with most plans.
          </p>
        </div>
        <div className="reveal flex flex-wrap justify-center gap-3">
          {config.insuranceAccepted.map((ins) => (
            <span
              key={ins}
              className="rounded-full border bg-white px-5 py-2 text-sm font-medium"
              style={{ borderColor: "#e5e7eb", color: "#1A1A1A" }}
            >
              {ins}
            </span>
          ))}
        </div>
        <p className="reveal mt-8 text-center text-sm" style={{ color: "#6B7280" }}>
          We also offer flexible payment plans and CareCredit financing.{" "}
          <a href="#contact" className="underline" style={{ color: "#1B4D5C" }}>
            Ask us at your appointment.
          </a>
        </p>
      </div>
    </section>
  );
}
