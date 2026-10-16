import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message, recaptchaToken } = body;

    if (!(await verifyRecaptcha(recaptchaToken, "contact_submit"))) {
      return NextResponse.json({ error: "Unable to verify submission" }, { status: 403 });
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    try {
      // Initialize Resend with API key
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email 1: Notification to Rachel
      await resend.emails.send({
        from: "Rewire Hypnosis <notifications@rewirehypnosis.ca>",
        to: ["rachel@rewirehypnosis.ca", "rachelmoore018@gmail.com"],
        subject: `New screening request from ${name}`,
        html: `
          <h2>New Screening Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${service ? `<p><strong>Service Interest:</strong> ${service}</p>` : ""}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Submitted via rewirehypnosis.ca contact form
          </p>
        `,
      });

      // Email 2: Confirmation to user
      await resend.emails.send({
        from: "Rewire Hypnosis <notifications@rewirehypnosis.ca>",
        to: email,
        subject: "Your Rewire Hypnosis Screening Request",
        html: `
          <h2>Thank you for your interest in Rewire Hypnosis!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out. I've received your inquiry and will be in touch.</p>
          <p>This message does not book an appointment. You can book a 60-minute free screening on our website, and complete your screening questions on the website after your booking is confirmed.</p>
          <p>I look forward to connecting with you soon!</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Rachel</strong><br>Rewire Hypnosis</p>
        `,
      });

      console.log("Form submission received and emails sent:", { name, email, service, message });
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      return NextResponse.json({ error: "Failed to send confirmation emails. Please try again." }, { status: 500 });
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We've received your message. This does not book an appointment.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 });
  }
}
