import { NextResponse } from "next/server";
import { getReportBySlugFromDB } from "@/lib/reports";

export async function GET(req, { params }) {
  const { slug } = params;
  const report = await getReportBySlugFromDB(slug);
  if (!report) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(report);
}
