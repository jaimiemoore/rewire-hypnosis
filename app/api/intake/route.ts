import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { intakeServices, type IntakeServiceId } from "@/lib/intake";
import { verifyRecaptcha } from "@/lib/recaptcha";

type IntakeRequestBody = {
  serviceId?: IntakeServiceId;
  responses?: Record<string, unknown>;
  recaptchaToken?: string;
};

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const body = (await request.json()) as IntakeRequestBody;

    if (!(await verifyRecaptcha(body.recaptchaToken, "intake_submit"))) {
      return NextResponse.json({ error: "Unable to verify submission" }, { status: 403 });
    }

    const service = body.serviceId ? intakeServices[body.serviceId] : null;

    if (!service || !body.responses || typeof body.responses !== "object") {
      return NextResponse.json({ error: "A valid service and intake form are required" }, { status: 400 });
    }

    const values = service.fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = normalizeValue(body.responses?.[field.id]);
      return acc;
    }, {});

    const missingRequiredField = service.fields.find((field) => field.required && !values[field.id]);

    if (missingRequiredField) {
      return NextResponse.json(
        { error: `${missingRequiredField.label} is required` },
        { status: 400 }
      );
    }

    if (!isValidEmail(values.email)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const submittedRows = service.fields
      .map((field) => {
        const value = values[field.id] || "Not provided";

        return `
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e6ece8; color: #568673; font-weight: 700; vertical-align: top;">
              ${escapeHtml(field.label)}
            </td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e6ece8; color: #333333; white-space: pre-line;">
              ${escapeHtml(value)}
            </td>
          </tr>
        `;
      })
      .join("");

    const resend = getResend();
    const safeName = escapeHtml(values.name);
    const safeEmail = escapeHtml(values.email);
    const safeServiceLabel = escapeHtml(service.label);

    await resend.emails.send({
      from: "Rewire Hypnosis <notifications@rewirehypnosis.ca>",
      to: ["rachel@rewirehypnosis.ca"],
      replyTo: values.email,
      subject: `Free screening intake: ${service.label} - ${values.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333333; line-height: 1.5;">
          <h2 style="color: #182d27;">New Free Screening Intake</h2>
          <p><strong>Selected service:</strong> ${safeServiceLabel}</p>
          <p><strong>Client:</strong> ${safeName} &lt;<a href="mailto:${safeEmail}">${safeEmail}</a>&gt;</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 18px;">
            <tbody>${submittedRows}</tbody>
          </table>
          <p style="color: #7a7a7a; font-size: 12px; margin-top: 20px;">
            Submitted via the intake-gated free screening flow on rewirehypnosis.ca.
          </p>
        </div>
      `,
    });

    await resend.emails.send({
      from: "Rewire Hypnosis <notifications@rewirehypnosis.ca>",
      to: values.email,
      subject: "Your Rewire Hypnosis intake was received",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333333; line-height: 1.6;">
          <h2 style="color: #182d27;">Thank you, ${safeName}</h2>
          <p>Your intake for <strong>${safeServiceLabel}</strong> has been received.</p>
          <p>You can now choose a free screening time in the booking calendar on the website. After booking, Cal.com will send the appointment confirmation and calendar invitation.</p>
          <p>If you have questions before your screening, you can reply to this email.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Rachel</strong><br>Rewire Hypnosis</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing intake submission:", error);
    return NextResponse.json({ error: "Failed to process your intake" }, { status: 500 });
  }
}
