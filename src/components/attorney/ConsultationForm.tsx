import { useState } from "react";
import { useClientConfig } from "@/lib/use-client-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

export function ConsultationForm() {
  const config = useClientConfig();
  const [contactMethod, setContactMethod] = useState<"phone" | "email">("phone");
  const [bestTimeToCall, setBestTimeToCall] = useState<"morning" | "afternoon" | "evening">("morning");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!phone) next.phone = "Please enter a phone number.";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email.";
    if (!message) next.message = "Please tell us briefly about your situation.";
    if (message.length > 500) next.message = "Please keep your message under 500 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email, message,
          contactMethod,
          bestTimeToCall: contactMethod === "phone" ? bestTimeToCall : undefined,
          clientSlug: config.domain,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSuccess(true);
    } catch {
      setErrors({ message: "Something went wrong. Please call us instead." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-foreground md:text-4xl">Request a Consultation</h2>
        <p className="mt-3 text-muted-foreground">
          Your message is confidential. Submitting this form does not create an attorney-client relationship.
        </p>

        {success ? (
          <div className="mt-8 rounded-md border border-primary/30 bg-primary/5 p-8 text-center" role="status">
            <p className="font-serif text-xl text-foreground">Thank you.</p>
            <p className="mt-2 text-muted-foreground">
              We'll be in touch {config.responsePromise.toLowerCase()}
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <Field id="name" label="Full name" error={errors.name}>
              <Input id="name" name="name" autoComplete="name" aria-required="true" />
            </Field>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="phone" label="Phone" error={errors.phone}>
                <Input id="phone" name="phone" type="tel" autoComplete="tel" aria-required="true" />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <Input id="email" name="email" type="email" autoComplete="email" aria-required="true" />
              </Field>
            </div>

            <div>
              <Label className="text-sm">Preferred contact method</Label>
              <RadioGroup
                value={contactMethod}
                onValueChange={(v) => setContactMethod(v as "phone" | "email")}
                className="mt-2 flex gap-6"
              >
                <label className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value="phone" id="cm-phone" /> Phone
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <RadioGroupItem value="email" id="cm-email" /> Email
                </label>
              </RadioGroup>
            </div>

            {contactMethod === "phone" && (
              <div>
                <Label className="text-sm">Best time to call</Label>
                <RadioGroup
                  value={bestTimeToCall}
                  onValueChange={(v) => setBestTimeToCall(v as "morning" | "afternoon" | "evening")}
                  className="mt-2 flex flex-wrap gap-6"
                >
                  {(["morning", "afternoon", "evening"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm capitalize">
                      <RadioGroupItem value={t} id={`t-${t}`} /> {t}
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}

            <Field id="message" label="Tell us about your situation" error={errors.message}>
              <Textarea id="message" name="message" rows={5} maxLength={500} aria-required="true" />
            </Field>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground sm:max-w-md">{config.disclaimer}</p>
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id, label, error, children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
