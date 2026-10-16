import { NextRequest, NextResponse } from "next/server";
import { getScreeningFields, intakeServices, isIntakeServiceId, validateScreeningResponses } from "@/lib/intake";
import { verifyRecaptcha } from "@/lib/recaptcha";

export const maxDuration = 60;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

async function sendEmail(payload: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Rewire Hypnosis <notifications@rewirehypnosis.ca>", ...payload }),
    signal: AbortSignal.timeout(15000),
  });
  const result = await response.json();
  if (!response.ok || result.error || !result.id) throw new Error("Email delivery was not accepted");
}

export async function POST(request: NextRequest) {
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "A submission is required" }, { status: 400 });
  let text = "";
  let size = 0;
  const decoder = new TextDecoder();
  let body: { serviceId?: unknown; responses?: unknown; recaptchaToken?: unknown } | null;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) {
        await reader.cancel();
        return NextResponse.json({ error: "Submission is too large" }, { status: 413 });
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "A valid JSON submission is required" }, { status: 400 });
  } finally {
    reader.releaseLock();
  }

  if (!body || !isIntakeServiceId(body.serviceId) || !body.responses ||
      typeof body.responses !== "object" || Array.isArray(body.responses)) {
    return NextResponse.json({ error: "A valid focus and screening answers are required" }, { status: 400 });
  }
  const serviceId = body.serviceId;
  const { error, values } = validateScreeningResponses(serviceId, body.responses as Record<string, unknown>);
  if (error) return NextResponse.json({ error }, { status: 400 });
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is temporarily unavailable. Your booking is unaffected." }, { status: 503 });
  }
  if (!(await verifyRecaptcha(body.recaptchaToken, "intake_submit"))) {
    return NextResponse.json({ error: "Unable to verify submission. Your booking is unaffected." }, { status: 403 });
  }

  const service = intakeServices[serviceId];
  const rows = getScreeningFields(serviceId).filter((field) => values[field.id])
    .map((field) => `<tr><td style="padding:10px;font-weight:bold;vertical-align:top">${escapeHtml(field.label)}</td><td style="padding:10px;white-space:pre-line">${escapeHtml(values[field.id])}</td></tr>`).join("");
  const name = escapeHtml(values.name);
  const label = escapeHtml(service.label);
  try {
    await sendEmail({
      to: ["rachel@rewirehypnosis.ca"],
      reply_to: values.email,
      subject: `Screening form completed: ${service.label} - ${values.name.replace(/[\r\n]/g, " ")}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Screening form completed</h2><p>Focus: ${label}</p><table>${rows}</table><p>Match to the Cal.com appointment using the supplied booking email. This submission does not create or verify a booking.</p></div>`,
    });
  } catch {
    console.error("Screening notification delivery could not be confirmed");
    return NextResponse.json({ error: "Delivery could not be confirmed. Your answers remain on this page and your booking is unaffected. Please contact Rachel before sending again." }, { status: 503 });
  }
  try {
    await sendEmail({
      to: values.email,
      reply_to: "rachel@rewirehypnosis.ca",
      subject: "Your Rewire Hypnosis screening answers were received",
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Thank you, ${name}</h2><p>Your screening answers for ${label} were received.</p><p>Your appointment is managed separately through Cal.com. This form does not book, cancel or change an appointment.</p><p>You can reply to this email with any questions.</p><p>Rachel<br>Rewire Hypnosis</p></div>`,
    });
  } catch {
    // Rachel's notification was already accepted. Do not ask for a duplicate.
    console.error("Screening receipt delivery failed after notification was accepted");
  }
  return NextResponse.json({ success: true });
}
