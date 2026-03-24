import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Save to Supabase
    const supabase = getServiceClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name, email, company, phone, subject, message,
      });
      if (dbError) console.error("DB Error:", dbError);
    }

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "MindEarth <notifications@mindearth.co>",
          to: process.env.NOTIFICATION_EMAIL || "hello@mindearth.co",
          subject: `New Contact: ${subject || "General Inquiry"} — ${name}`,
          html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company || "N/A"}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Subject:</strong> ${subject || "General"}</p><p><strong>Message:</strong></p><p>${message}</p>`,
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
