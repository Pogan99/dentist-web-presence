import { createFileRoute } from "@tanstack/react-router";
import { clientConfig } from "@/client-config";

interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  contactMethod: "phone" | "email";
  bestTimeToCall?: "morning" | "afternoon" | "evening";
  message: string;
  clientSlug: string;
}

function validate(b: Partial<BookingRequest>): { ok: true; data: BookingRequest } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!b.name || typeof b.name !== "string" || !b.name.trim()) errors.name = "Required";
  if (!b.phone || typeof b.phone !== "string" || !b.phone.trim()) errors.phone = "Required";
  if (!b.email || typeof b.email !== "string" || !/^\S+@\S+\.\S+$/.test(b.email)) errors.email = "Valid email required";
  if (!b.message || typeof b.message !== "string" || !b.message.trim()) errors.message = "Required";
  if (b.message && b.message.length > 500) errors.message = "Too long";
  if (b.contactMethod !== "phone" && b.contactMethod !== "email") errors.contactMethod = "Invalid";
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      name: b.name!.trim().slice(0, 200),
      phone: b.phone!.trim().slice(0, 50),
      email: b.email!.trim().slice(0, 200),
      message: b.message!.trim().slice(0, 500),
      contactMethod: b.contactMethod as "phone" | "email",
      bestTimeToCall: b.bestTimeToCall,
      clientSlug: String(b.clientSlug ?? "").slice(0, 100),
    },
  };
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
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
        let body: unknown;
        try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { "Content-Type": "application/json" } }); }
        const result = validate((body ?? {}) as Partial<BookingRequest>);
        if (!result.ok) {
          return new Response(JSON.stringify({ error: "Validation failed", fields: result.errors }), {
            status: 400, headers: { "Content-Type": "application/json" },
          });
        }
        const d = result.data;
        const intakeHtml = `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${escape(d.name)}</p>
          <p><strong>Phone:</strong> ${escape(d.phone)}</p>
          <p><strong>Email:</strong> ${escape(d.email)}</p>
          <p><strong>Preferred contact:</strong> ${escape(d.contactMethod)}${d.bestTimeToCall ? ` (${escape(d.bestTimeToCall)})` : ""}</p>
          <p><strong>Message:</strong></p>
          <p>${escape(d.message).replace(/\n/g, "<br>")}</p>
        `;
        const replyHtml = `
          <p>Hello ${escape(d.name)},</p>
          <p>Thank you for reaching out to ${escape(clientConfig.businessName)}. We've received your message and ${escape(clientConfig.responsePromise.toLowerCase())}</p>
          <p style="color:#666;font-size:12px;margin-top:32px;">This is an automated confirmation. No attorney-client relationship has been formed.</p>
        `;
        try {
          await Promise.all([
            sendEmail(clientConfig.email, `New Consultation Request — ${d.name}`, intakeHtml),
            sendEmail(d.email, `We received your message — ${clientConfig.businessName}`, replyHtml),
          ]);
        } catch {
          // intentionally swallow — never log PII
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200, headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
