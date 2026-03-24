import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const reportSlug = formData.get("reportSlug");
    const fileType = formData.get("fileType");

    if (!file || !reportSlug || !fileType) {
      return NextResponse.json({ error: "File, reportSlug, and fileType are required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured. Add env variables." }, { status: 500 });
    }

    const fileName = `${reportSlug}/${fileType}-${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("reports")
      .upload(fileName, buffer, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("reports").getPublicUrl(fileName);

    const updateObj = {};
    if (fileType === "full_pdf") updateObj.full_pdf_url = urlData.publicUrl;
    if (fileType === "sample_pdf") updateObj.sample_pdf_url = urlData.publicUrl;
    if (fileType === "excel") updateObj.excel_url = urlData.publicUrl;
    if (fileType === "white_paper") updateObj.white_paper_url = urlData.publicUrl;

    await supabase
      .from("report_files")
      .upsert(
        { report_slug: reportSlug, ...updateObj, updated_at: new Date().toISOString() },
        { onConflict: "report_slug" }
      );

    return NextResponse.json({ success: true, url: urlData.publicUrl, message: `${fileType} uploaded successfully` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
