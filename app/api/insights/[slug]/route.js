import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

// GET single published insight by slug (public)
export async function GET(req, { params }) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ insight: null, warning: "Supabase not configured" });
  }

  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    return NextResponse.json({ insight: null, warning: error.message });
  }

  return NextResponse.json({ insight: data });
}
