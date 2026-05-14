// app/api/booking/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Nodemailer transporter ──────────────────────────────────────────────────
// Set these in your .env.local:
//   EMAIL_USER=your@gmail.com
//   EMAIL_PASS=your_app_password   ← Gmail App Password (not your login password)
//   OWNER_EMAIL=owner@chaibaaz.com
//
// For Gmail: enable 2FA → Google Account → Security → App Passwords → generate one.
const transporter = nodemailer.createTransport({
  host: "smtp.zohocloud.ca",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Owner notification email ────────────────────────────────────────────────
function ownerHtml(data: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestRange: string;
  serviceType: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#F6F0E7;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(42,22,13,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2A160D,#4A2E1A);padding:40px 40px 32px;text-align:center;">
      <p style="color:#C9A46A;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">New Booking Inquiry</p>
      <h1 style="color:#fff;font-size:32px;font-weight:300;margin:0;line-height:1.2;">Chaibaaz Luxury</h1>
      <div style="width:48px;height:1px;background:#C9A46A;margin:16px auto 0;"></div>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <p style="color:#5B4636;font-size:15px;line-height:1.8;margin:0 0 28px;">
        A new inquiry has been received. Here are the details:
      </p>

      <!-- Details table -->
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ["Name",         data.name],
          ["Email",        data.email],
          ["Phone",        data.phone || "—"],
          ["Event Type",   data.eventType],
          ["Guest Count",  data.guestRange],
          ["Service",      data.serviceType],
        ]
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:12px 16px;background:#F6F0E7;border-radius:8px 0 0 8px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#B88B4A;width:36%;font-family:Arial,sans-serif;">${label}</td>
            <td style="padding:12px 16px;background:#FBF7F2;border-radius:0 8px 8px 0;font-size:15px;color:#2A160D;">${value}</td>
          </tr>
          <tr><td colspan="2" style="height:6px;"></td></tr>`
          )
          .join("")}
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#F6F0E7;padding:24px 40px;text-align:center;border-top:1px solid rgba(201,164,106,0.2);">
      <p style="color:#7A6A5A;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0;">
        Chaibaaz · Luxury Chai Hospitality
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── Guest thank-you email ───────────────────────────────────────────────────
function guestHtml(name: string, eventType: string) {
  const firstName = name.split(" ")[0];
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#F6F0E7;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(42,22,13,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2A160D,#4A2E1A);padding:48px 40px 40px;text-align:center;">
      <p style="color:#C9A46A;font-size:11px;letter-spacing:4px;text-transform:uppercase;margin:0 0 16px;">Thank You</p>
      <h1 style="color:#fff;font-size:36px;font-weight:300;margin:0 0 8px;line-height:1.15;">Your inquiry has<br/>been received</h1>
      <div style="width:48px;height:1px;background:#C9A46A;margin:20px auto 0;"></div>
    </div>

    <!-- Body -->
    <div style="padding:44px 40px;">
      <p style="color:#2A160D;font-size:20px;font-weight:300;margin:0 0 20px;">
        Dear ${firstName},
      </p>
      <p style="color:#5B4636;font-size:15px;line-height:1.85;margin:0 0 20px;">
        Thank you for reaching out to Chaibaaz. We're delighted to hear you're planning a <strong style="color:#2A160D;font-weight:400;">${eventType}</strong> and would love to be part of making it truly unforgettable.
      </p>
      <p style="color:#5B4636;font-size:15px;line-height:1.85;margin:0 0 32px;">
        Our concierge team will personally review your inquiry and get in touch with you shortly to begin crafting your bespoke luxury chai experience.
      </p>

      <!-- Divider -->
      <div style="display:flex;align-items:center;gap:12px;margin:32px 0;">
        <div style="flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(201,164,106,0.5));"></div>
        <span style="color:#C9A46A;font-size:14px;">✦</span>
        <div style="flex:1;height:1px;background:linear-gradient(to left,transparent,rgba(201,164,106,0.5));"></div>
      </div>

      <p style="color:#7A6A5A;font-size:13px;line-height:1.7;margin:0;font-style:italic;text-align:center;">
        "Every great gathering deserves a signature moment.<br/>Yours is being crafted with care."
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#F6F0E7;padding:28px 40px;text-align:center;border-top:1px solid rgba(201,164,106,0.2);">
      <p style="color:#2A160D;font-size:13px;margin:0 0 4px;">Chaibaaz Luxury Chai Hospitality</p>
      <p style="color:#7A6A5A;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0;">
        Weddings · Events · Private Gatherings
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, eventType, guestRange, serviceType } = body;

    // Basic server-side validation
    if (!name || !email || !eventType || !guestRange || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Send both emails concurrently
    await Promise.all([
      // 1. Owner notification
      transporter.sendMail({
        from: `"Chaibaaz Bookings" <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL,
        subject: `✦ New Booking Inquiry — ${eventType} · ${name}`,
        html: ownerHtml({ name, email, phone, eventType, guestRange, serviceType }),
      }),

      // 2. Guest thank-you
      transporter.sendMail({
        from: `"Chaibaaz Luxury" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thank you for your inquiry — Chaibaaz Luxury Chai",
        html: guestHtml(name, eventType),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}