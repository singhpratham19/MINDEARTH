import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, phone, reportSlug, reportTitle, inquiryType, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("inquiries").insert({
        name, email, company, phone,
        report_slug: reportSlug, report_title: reportTitle,
        inquiry_type: inquiryType, message,
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
          subject: `Report inquiry: ${name} — ${reportTitle || "General"}`,
          text: `New report inquiry\n\nType: ${inquiryType || "General"}\nReport: ${reportTitle || "N/A"}\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nPhone: ${phone || "N/A"}\nMessage: ${message || "N/A"}`,
          html: `<p>New report inquiry</p><table cellpadding="4"><tr><td><strong>Type</strong></td><td>${inquiryType || "General"}</td></tr><tr><td><strong>Report</strong></td><td>${reportTitle || "N/A"}</td></tr><tr><td><strong>Name</strong></td><td>${name}</td></tr><tr><td><strong>Email</strong></td><td>${email}</td></tr><tr><td><strong>Company</strong></td><td>${company || "N/A"}</td></tr><tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr><tr><td><strong>Message</strong></td><td>${message || "N/A"}</td></tr></table>`,
        });

        // Auto-reply to user
        await resend.emails.send({
          from: "MindEarth <noreply@mindearthconsultancy.com>",
          to: email,
          reply_to: "hello@mindearthconsultancy.com",
          subject: `We received your inquiry — MindEarth Consultancy`,
          text: `Hi ${name},\n\nThank you for your interest in ${reportTitle || "our research"}. We have received your inquiry and will contact you within 24 hours to discuss your requirements.\n\nBest regards,\nMindEarth Consultancy Team`,
          html: `<p>Hi ${name},</p><p>Thank you for your interest in <strong>${reportTitle || "our research"}</strong>. We have received your inquiry and will contact you within 24 hours to discuss your requirements.</p><p>Best regards,<br>MindEarth Consultancy Team</p>`,
        });
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Inquiry received! Our team will contact you within 24 hours." });
  } catch (err) {
    console.error("Inquiry error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
