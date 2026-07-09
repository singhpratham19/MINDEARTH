import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

// Always fetch live from Supabase. Without this, Next.js 14 caches the GET
// handler at build time and freezes the row count until the next deploy.
export const dynamic = "force-dynamic";

// GET all published insights (public)
export async function GET() {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ insights: [] });
  }
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ insights: [], warning: error.message });
  }
  return NextResponse.json({ insights: data || [] });
}
