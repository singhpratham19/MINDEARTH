import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

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
