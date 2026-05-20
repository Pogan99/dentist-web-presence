import { useRef, useState } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Errors = Partial<Record<"name" | "phone" | "form", string>>;

const TIME_SLOTS = ["Morning (9–12)", "Afternoon (12–4)", "Late Afternoon (4–6)"] as const;

export function ConsultationForm() {
  const config = useClientConfig();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const date = String(fd.get("date") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!phone) next.phone = "Please enter a phone number.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone,
          date: date || today,
          time: time || "Morning (9–12)",
          service: "Free consultation",
          message,
          clientSlug: config.domain,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setSuccess(true);
    } catch {
      setErrors({ form: "Something went wrong. Please call us instead." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">Request a Free Consultation</h2>
        <p className="mt-3 text-muted-foreground">
          Submitting this form does not create an attorney-client relationship.
        </p>

        {success ? (
          <div className="mt-8 rounded-md border border-primary/30 bg-primary/5 p-8 text-center" role="status">
            <p className="font-serif text-xl text-foreground">Thank you.</p>
            <p className="mt-2 text-muted-foreground">We'll call you to confirm your consultation.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" error={errors.name}>
                <Input id="name" name="name" autoComplete="name" aria-required="true" />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone}>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" aria-required="true" />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="date" label="Preferred date">
                <Input id="date" name="date" type="date" min={today} ref={dateRef}
                  onClick={() => dateRef.current?.showPicker?.()} className="cursor-pointer" />
              </Field>
              <div>
                <Label className="mb-1.5 block text-sm">Best time to call</Label>
                <div className="flex flex-col gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <label key={slot} className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${time === slot ? "border-primary bg-primary/5 font-medium" : "border-border hover:border-primary/50"}`}>
                      <input type="radio" name="time-slot" value={slot} checked={time === slot}
                        onChange={() => setTime(slot)} className="accent-primary" />
                      {slot}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Field id="message" label="Briefly describe your situation (optional)">
              <Textarea id="message" name="message" rows={4} maxLength={400}
                placeholder="A few sentences is enough. We'll discuss details on the call." />
            </Field>

            {errors.form && <p role="alert" className="text-sm text-destructive">{errors.form}</p>}

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground sm:max-w-md">{config.disclaimer}</p>
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Sending…" : "Request Consultation"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p role="alert" className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
