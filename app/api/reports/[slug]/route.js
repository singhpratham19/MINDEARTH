import { NextResponse } from "next/server";
import { getReportBySlugFromDB } from "@/lib/reports";

// Always fetch live so newly-added reports resolve without a redeploy.
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const { slug } = params;
  const report = await getReportBySlugFromDB(slug);
  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(report);
}
