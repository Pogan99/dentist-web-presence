import { Resend } from 'resend';

function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', ...(init?.headers ?? {}) },
  });
}

function parseToUTC(date: string, timeSlot: string): Date {
  let hour = 9;
  if (timeSlot.startsWith('Afternoon')) hour = 12;
  else if (timeSlot.startsWith('Late')) hour = 16;
  const utcOffsetHours = 4;
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour + utcOffsetHours, 0, 0));
}

function toICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function buildICS(params: {
  summary: string; dtStart: Date; dtEnd: Date;
  description: string; organizerName: string; organizerEmail: string; location: string;
}): string {
  const { summary, dtStart, dtEnd, description, organizerName, organizerEmail, location } = params;
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ClientSiteTemplate//BookingAPI//EN',
    'CALSCALE:GREGORIAN', 'METHOD:REQUEST', 'BEGIN:VEVENT',
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@booking.local`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(dtStart)}`, `DTEND:${toICSDate(dtEnd)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${(description || 'No notes.').replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/\n/g, ', ')}`,
    `ORGANIZER;CN=${organizerName}:mailto:${organizerEmail}`,
    'STATUS:TENTATIVE', 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 16px 10px 0;color:#64748b;font-size:14px;font-weight:600;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f1f5f9;">${label}</td>
    <td style="padding:10px 0;color:#1a2e44;font-size:14px;border-bottom:1px solid #f1f5f9;">${value}</td>
  </tr>`;
}

function ownerHtml(p: { businessName: string; name: string; phone: string; email: string; date: string; time: string; service: string; message: string }): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Booking</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;"><tr><td>
<table width="600" align="center" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;margin:0 auto;">
<tr><td style="background:#1a2e44;padding:32px 40px;">
  <h1 style="margin:0;color:#fff;font-size:22px;">${p.businessName}</h1>
  <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">New Booking Request</p>
</td></tr>
<tr><td style="padding:40px;">
  <table width="100%" style="border-collapse:collapse;">
    ${row('Service', p.service)}${row('Date', p.date)}${row('Time', p.time)}
    ${row('Customer', p.name)}${row('Phone', p.phone)}${row('Email', p.email)}
    ${p.message ? row('Notes', p.message) : ''}
  </table>
  <p style="margin:32px 0 0;color:#64748b;font-size:13px;">ICS calendar invite attached.</p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

function customerHtml(p: { businessName: string; address: string; phone: string; date: string; time: string; service: string }): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Appointment Request</title></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;"><tr><td>
<table width="600" align="center" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;margin:0 auto;">
<tr><td style="background:#1a2e44;padding:32px 40px;">
  <h1 style="margin:0;color:#fff;font-size:22px;">${p.businessName}</h1>
  <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Appointment Request Received</p>
</td></tr>
<tr><td style="padding:40px;">
  <p style="color:#475569;font-size:15px;line-height:1.6;">Thanks! We will confirm within 2 business hours.</p>
  <table width="100%" style="border-collapse:collapse;background:#f8fafc;border-radius:8px;">
    ${row('Service', p.service)}${row('Preferred Date', p.date)}${row('Preferred Time', p.time)}
  </table>
  <p style="margin-top:24px;color:#475569;font-size:14px;">${p.address.replace(/\n/g, '<br>')} &bull; ${p.phone}</p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

export async function handleBookingRequest(
  request: Request,
  env: Record<string, string>,
): Promise<Response> {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, phone, email, date, time, service, message = '' } = body;

  const missing = (['name', 'phone', 'date', 'time', 'service'] as const).filter((k) => !body[k]?.trim());
  if (missing.length) {
    return json({ error: `Missing required fields: ${missing.join(', ')}` }, { status: 400 });
  }

  const ownerEmail = env['OWNER_EMAIL'] ?? 'pogan.93@gmail.com';
  const businessName = env['BUSINESS_NAME'] ?? 'Local Business';
  const businessAddress = env['BUSINESS_ADDRESS'] ?? 'Jacksonville, FL';
  const businessPhone = env['BUSINESS_PHONE'] ?? '';

  const apiKey = env['RESEND_API_KEY'] ?? '';
  if (!apiKey) {
    console.warn('[book] RESEND_API_KEY not set');
    return json({ error: 'Email service not configured.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const dtStart = parseToUTC(date, time);
  const dtEnd = new Date(dtStart.getTime() + 60 * 60 * 1000);
  const icsContent = buildICS({
    summary: `${service} — ${name}`,
    dtStart, dtEnd,
    description: message || 'No additional notes.',
    organizerName: name,
    organizerEmail: email || 'noreply@booking.local',
    location: businessAddress,
  });
  const icsBase64 = btoa(unescape(encodeURIComponent(icsContent)));

  const FROM = 'onboarding@resend.dev';

  const ownerResult = await resend.emails.send({
    from: FROM,
    to: [ownerEmail],
    replyTo: email || undefined,
    subject: `New booking — ${service} on ${date} at ${time}`,
    html: ownerHtml({ businessName, name, phone, email, date, time, service, message }),
    attachments: [{ filename: 'appointment.ics', content: icsBase64 }],
  });

  if (ownerResult.error) {
    console.error('[book] Resend error:', ownerResult.error);
    return json({ error: 'Failed to send booking email.' }, { status: 500 });
  }

  if (email) {
    resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Your request at ${businessName} — ${date}`,
      html: customerHtml({ businessName, address: businessAddress, phone: businessPhone, date, time, service }),
    }).catch(e => console.warn('[book] customer email warning:', e));
  }

  return json({ success: true, message: 'Booking request sent.' });
}
