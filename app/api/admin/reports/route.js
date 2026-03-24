import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ reportFiles: [], sampleRequests: [], inquiries: [], contacts: [], subscribers: [] });
  }

  const { data: files } = await supabase.from("report_files").select("*");
  const { data: samples } = await supabase.from("sample_requests").select("*").order("created_at", { ascending: false }).limit(50);
  const { data: inquiries } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(50);
  const { data: contacts } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(50);
  const { data: subscribers } = await supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false });

  return NextResponse.json({
    reportFiles: files || [],
    sampleRequests: samples || [],
    inquiries: inquiries || [],
    contacts: contacts || [],
    subscribers: subscribers || [],
  });
}
