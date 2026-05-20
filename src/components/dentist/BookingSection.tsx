import { useState } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type PreferredTime = "morning" | "afternoon" | "evening";

interface FormState {
  name: string;
  phone: string;
  preferredTime: PreferredTime | "";
  newPatient: boolean;
}

const TODAY = new Date().toLocaleDateString("en-US", { weekday: "long" });

export function BookingSection() {
  const config = useClientConfig();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    preferredTime: "",
    newPatient: true,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.preferredTime) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          preferredTime: form.preferredTime,
          newPatient: form.newPatient,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const hoursEntries = Object.entries(config.hours);

  return (
    <section id="contact" className="w-full py-20" style={{ backgroundColor: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl" style={{ color: "#1A1A1A" }}>
            Book Your Appointment
          </h2>
          <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
            We&apos;ll call you back within 2 business hours to confirm.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Form */}
          <div
            className="reveal rounded-2xl p-8"
            style={{ backgroundColor: "#F8F6F1", boxShadow: "0 2px 24px 0 rgba(27,77,92,0.08)" }}
          >
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-5xl">✓</div>
                <h3 className="font-serif text-2xl" style={{ color: "#1B4D5C" }}>
                  Request received!
                </h3>
                <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                  We&apos;ll call you at {form.phone} soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="(904) 555-0000"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                    Best Time to Call
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["morning", "afternoon", "evening"] as PreferredTime[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, preferredTime: t }))}
                        className="rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-all"
                        style={
                          form.preferredTime === t
                            ? { backgroundColor: "#1B4D5C", color: "#fff", borderColor: "#1B4D5C" }
                            : { backgroundColor: "#fff", color: "#1A1A1A", borderColor: "#e5e7eb" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newPatient"
                    checked={form.newPatient}
                    onChange={(e) => setForm((f) => ({ ...f, newPatient: e.target.checked }))}
                    className="h-4 w-4 rounded"
                  />
                  <label htmlFor="newPatient" className="text-sm" style={{ color: "#6B7280" }}>
                    I am a new patient
                  </label>
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please call us directly at {config.phone}.
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 w-full font-bold"
                  style={{ backgroundColor: "#1B4D5C", color: "#fff" }}
                >
                  {status === "submitting" ? "Sending…" : "Request a Callback"}
                </Button>
                <p className="text-center text-xs" style={{ color: "#6B7280" }}>
                  We only collect name and phone — your health info stays private.
                </p>
              </form>
            )}
          </div>

          {/* Info card */}
          <div className="reveal reveal-delay-1 flex flex-col gap-6">
            {/* Address */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#F8F6F1", boxShadow: "0 2px 16px 0 rgba(27,77,92,0.07)" }}
            >
              <h3 className="font-serif text-lg mb-2" style={{ color: "#1B4D5C" }}>
                Find Us
              </h3>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                {config.address}
              </p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(config.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm underline"
                style={{ color: "#C9963A" }}
              >
                Open in Google Maps
              </a>
              {/* Map embed */}
              <div className="mt-4 overflow-hidden rounded-lg" style={{ height: 180 }}>
                <iframe
                  title="Office location"
                  width="100%"
                  height="180"
                  loading="lazy"
                  className="border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(config.address)}&output=embed`}
                />
              </div>
            </div>

            {/* Hours */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#F8F6F1", boxShadow: "0 2px 16px 0 rgba(27,77,92,0.07)" }}
            >
              <h3 className="font-serif text-lg mb-3" style={{ color: "#1B4D5C" }}>
                Hours
              </h3>
              <div className="flex flex-col gap-1.5">
                {hoursEntries.map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex justify-between rounded-md px-3 py-1.5 text-sm"
                    style={
                      day === TODAY
                        ? { backgroundColor: "#1B4D5C", color: "#fff", fontWeight: 600 }
                        : { color: "#6B7280" }
                    }
                  >
                    <span>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency */}
            {config.emergencyLine && (
              <div
                className="rounded-2xl p-5 flex items-center gap-4"
                style={{ backgroundColor: "#FEF3C7" }}
              >
                <div className="text-2xl">🚨</div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#92400E" }}>
                    Dental Emergency?
                  </p>
                  <a
                    href={`tel:${config.emergencyLine.replace(/[^0-9+]/g, "")}`}
                    className="text-base font-bold underline"
                    style={{ color: "#C9963A" }}
                  >
                    {config.emergencyLine}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
