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
        await resend.emails.send({
          from: "MindEarth <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL || "hello@mindearth.co",
          subject: `Inquiry: ${inquiryType || "General"} — ${reportTitle || "No report"} — ${name}`,
          html: `<h2>New Report Inquiry</h2><p><strong>Type:</strong> ${inquiryType || "General"}</p><p><strong>Report:</strong> ${reportTitle || "N/A"}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || "N/A"}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Message:</strong> ${message || "N/A"}</p>`,
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
