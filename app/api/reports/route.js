import { NextResponse } from "next/server";
import { getAllReports } from "@/lib/reports";

// Always fetch live from Supabase. Without this, Next.js 14 caches the GET
// handler at build time and freezes the row count until the next deploy.
export const dynamic = "force-dynamic";

export async function GET() {
  const reports = await getAllReports();
  return NextResponse.json(reports);
}
