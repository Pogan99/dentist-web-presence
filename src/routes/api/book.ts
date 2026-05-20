import { createFileRoute } from "@tanstack/react-router";
import { clientConfig } from "@/client-config";

// HIPAA-safe: only accept name, phone, preferredTime, newPatient
// No symptoms, no insurance #, no DOB, no email
interface BookingRequest {
  name: string;
  phone: string;
  preferredTime: "morning" | "afternoon" | "evening";
  newPatient: boolean;
}

const ALLOWED_FIELDS = new Set<string>(["name", "phone", "preferredTime", "newPatient"]);

function validate(
  raw: Record<string, unknown>
): { ok: true; data: BookingRequest } | { ok: false; error: string } {
  // Reject any field not in the allowed list
  for (const key of Object.keys(raw)) {
    if (!ALLOWED_FIELDS.has(key)) {
      return { ok: false, error: `Field not allowed: ${key}` };
    }
  }

  const { name, phone, preferredTime, newPatient } = raw;

  if (!name || typeof name !== "string" || !name.trim())
    return { ok: false, error: "name required" };
  if (!phone || typeof phone !== "string" || !phone.trim())
    return { ok: false, error: "phone required" };
  if (preferredTime !== "morning" && preferredTime !== "afternoon" && preferredTime !== "evening")
    return { ok: false, error: "preferredTime must be morning, afternoon, or evening" };

  return {
    ok: true,
    data: {
      name: String(name).trim().slice(0, 200),
      phone: String(phone).trim().slice(0, 50),
      preferredTime: preferredTime as "morning" | "afternoon" | "evening",
      newPatient: newPatient === true,
    },
  };
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${clientConfig.businessName} <onboarding@resend.dev>`,
      to: [to],
      subject,
      html,
    }),
  });
}

export const Route = createFileRoute("/api/book")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
          return new Response(JSON.stringify({ error: "Expected object" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const result = validate(raw as Record<string, unknown>);
        if (!result.ok) {
          return new Response(JSON.stringify({ error: result.error }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const d = result.data;

        const intakeHtml = `
          <h2>New Appointment Request — ${escape(clientConfig.businessName)}</h2>
          <p><strong>Name:</strong> ${escape(d.name)}</p>
          <p><strong>Phone:</strong> ${escape(d.phone)}</p>
          <p><strong>Best time to call:</strong> ${escape(d.preferredTime)}</p>
          <p><strong>New patient:</strong> ${d.newPatient ? "Yes" : "No"}</p>
          <hr>
          <p style="color:#888;font-size:12px;">This request was submitted via the website booking form. No health information was collected.</p>
        `;

        try {
          await sendEmail(
            clientConfig.email,
            `New Appointment Request — ${d.name}`,
            intakeHtml
          );
        } catch {
          // Never log PII
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
