import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, company, jobTitle, phone, reportSlug, reportTitle } = body;

    if (!name || !email || !company) {
      return NextResponse.json({ error: "Name, email, and company are required" }, { status: 400 });
    }

    const supabase = getServiceClient();

    // Save lead to Supabase
    if (supabase) {
      const { error: dbError } = await supabase.from("sample_requests").insert({
        name, email, company, job_title: jobTitle, phone,
        report_slug: reportSlug, report_title: reportTitle,
      });
      if (dbError) console.error("DB Error:", dbError);
    }

    // Send notification + sample email
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "MindEarth <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL || "hello@mindearth.co",
          subject: `Sample Request: ${reportTitle} — ${name} (${company})`,
          html: `<h2>New Sample PDF Request</h2><p><strong>Report:</strong> ${reportTitle}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company}</p><p><strong>Job Title:</strong> ${jobTitle || "N/A"}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p>`,
        });

        // Send sample to requester if PDF exists
        if (supabase) {
          const { data: reportData } = await supabase
            .from("report_files")
            .select("sample_pdf_url")
            .eq("report_slug", reportSlug)
            .single();

          if (reportData?.sample_pdf_url) {
            await resend.emails.send({
              from: "MindEarth Research <onboarding@resend.dev>",
              to: email,
              subject: `Your Sample Report: ${reportTitle}`,
              html: `<h2>Thank you for your interest, ${name}!</h2><p>Here is your complimentary sample of <strong>${reportTitle}</strong>.</p><p><a href="${reportData.sample_pdf_url}" style="background:#0B6E4F;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:16px 0;">Download Sample PDF</a></p><p>For the full report, visit our website or contact our research team.</p><p>Best regards,<br>MindEarth Research Team</p>`,
            });
          }
        }
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Sample request received! Check your email shortly." });
  } catch (err) {
    console.error("Sample request error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
