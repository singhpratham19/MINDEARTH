import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name, email, company, phone, subject, message,
      });
      if (dbError) console.error("DB Error:", dbError);
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Admin notification
        await resend.emails.send({
          from: "MindEarth <noreply@mindearthconsultancy.com>",
          to: process.env.NOTIFICATION_EMAIL || "hello@mindearthconsultancy.com",
          reply_to: email,
          subject: `Contact form: ${name} (${subject || "General Inquiry"})`,
          text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nPhone: ${phone || "N/A"}\nSubject: ${subject || "General"}\n\nMessage:\n${message}`,
          html: `<p>New contact form submission</p><table cellpadding="4"><tr><td><strong>Name</strong></td><td>${name}</td></tr><tr><td><strong>Email</strong></td><td>${email}</td></tr><tr><td><strong>Company</strong></td><td>${company || "N/A"}</td></tr><tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr><tr><td><strong>Subject</strong></td><td>${subject || "General"}</td></tr></table><p><strong>Message:</strong><br>${message}</p>`,
        });

        // Auto-reply to user
        await resend.emails.send({
          from: "MindEarth <noreply@mindearthconsultancy.com>",
          to: email,
          reply_to: "hello@mindearthconsultancy.com",
          subject: `We received your message — MindEarth Consultancy`,
          text: `Hi ${name},\n\nThank you for reaching out to MindEarth Consultancy. We have received your message and will get back to you within 24 hours.\n\nBest regards,\nMindEarth Consultancy Team`,
          html: `<p>Hi ${name},</p><p>Thank you for reaching out to MindEarth Consultancy. We have received your message and will get back to you within 24 hours.</p><p>Best regards,<br>MindEarth Consultancy Team</p>`,
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Thank you! We'll get back to you within 24 hours." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
