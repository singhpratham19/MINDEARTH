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

    if (supabase) {
      const { error: dbError } = await supabase.from("sample_requests").insert({
        name, email, company, job_title: jobTitle, phone,
        report_slug: reportSlug, report_title: reportTitle,
      });
      if (dbError) console.error("DB Error:", dbError);
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Internal notification
        await resend.emails.send({
          from: "MindEarth <noreply@mindearthconsultancy.com>",
          to: process.env.NOTIFICATION_EMAIL || "hello@mindearthconsultancy.com",
          reply_to: email,
          subject: `Sample request: ${name} (${company}) — ${reportTitle}`,
          text: `New sample PDF request\n\nReport: ${reportTitle}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nJob Title: ${jobTitle || "N/A"}\nPhone: ${phone || "N/A"}`,
          html: `<p>New sample PDF request</p><table cellpadding="4"><tr><td><strong>Report</strong></td><td>${reportTitle}</td></tr><tr><td><strong>Name</strong></td><td>${name}</td></tr><tr><td><strong>Email</strong></td><td>${email}</td></tr><tr><td><strong>Company</strong></td><td>${company}</td></tr><tr><td><strong>Job Title</strong></td><td>${jobTitle || "N/A"}</td></tr><tr><td><strong>Phone</strong></td><td>${phone || "N/A"}</td></tr></table>`,
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
              from: "MindEarth <noreply@mindearthconsultancy.com>",
              to: email,
              reply_to: "hello@mindearthconsultancy.com",
              subject: `Your sample report — ${reportTitle}`,
              text: `Hi ${name},\n\nThank you for your interest in ${reportTitle}.\n\nYou can download your sample here:\n${reportData.sample_pdf_url}\n\nFor the full report or to speak with our research team, reply to this email.\n\nBest regards,\nMindEarth Consultancy`,
              html: `<p>Hi ${name},</p><p>Thank you for your interest in <strong>${reportTitle}</strong>.</p><p><a href="${reportData.sample_pdf_url}">Download your sample report</a></p><p>For the full report or to speak with our research team, reply to this email.</p><p>Best regards,<br>MindEarth Consultancy</p>`,
            });
          }
        }
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    }

    let downloadUrl = null;
    if (supabase) {
      const { data: fileData } = await supabase
        .from("report_files")
        .select("sample_pdf_url")
        .eq("report_slug", reportSlug)
        .single();
      if (fileData?.sample_pdf_url) downloadUrl = fileData.sample_pdf_url;
    }

    return NextResponse.json({ success: true, message: "Sample request received!", downloadUrl });
  } catch (err) {
    console.error("Sample request error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
