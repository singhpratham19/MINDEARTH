import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { reports as hardcodedReports } from "@/lib/data";
import { mapToDB } from "@/lib/reports";

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  code TEXT,
  cat TEXT DEFAULT 'Energy',
  badge TEXT,
  img TEXT,
  price INTEGER DEFAULT 4500,
  pages INTEGER DEFAULT 250,
  size TEXT,
  cagr TEXT,
  period TEXT,
  base_year TEXT DEFAULT '2025',
  description TEXT,
  overview TEXT,
  companies JSONB DEFAULT '[]'::jsonb,
  domains JSONB DEFAULT '[]'::jsonb,
  company_table JSONB DEFAULT '[]'::jsonb,
  segments JSONB DEFAULT '[]'::jsonb,
  segments_by_tech JSONB,
  segments_by_app JSONB,
  regions JSONB DEFAULT '[]'::jsonb,
  segment_tables JSONB,
  market_concentration TEXT,
  fastest_growing_region TEXT,
  largest_region TEXT,
  key_takeaways JSONB,
  drivers JSONB,
  restraints JSONB,
  region_table JSONB,
  developments JSONB,
  analysis_content JSONB,
  toc JSONB DEFAULT '[]'::jsonb,
  esg_content JSONB,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Service role full access') THEN
    CREATE POLICY "Service role full access" ON reports FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reports' AND policyname = 'Public read published') THEN
    CREATE POLICY "Public read published" ON reports FOR SELECT USING (published = true);
  END IF;
END $$;
`;

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  // Auto-create table if it doesn't exist
  const { error: sqlError } = await supabase.rpc("exec_sql", { query: CREATE_TABLE_SQL }).maybeSingle();
  // rpc may not exist — fall back to direct SQL via REST
  if (sqlError) {
    // Try using the Supabase SQL endpoint directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    try {
      const sqlRes = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ query: CREATE_TABLE_SQL }),
      });
      if (!sqlRes.ok) {
        // Last resort: try the pg endpoint
        const pgRes = await fetch(`${supabaseUrl}/pg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({ query: CREATE_TABLE_SQL }),
        });
        // If this also fails, we'll try seeding anyway and let the upsert error tell us
      }
    } catch {
      // Continue — the table might already exist
    }
  }

  // Try seeding
  const results = [];
  for (const report of hardcodedReports) {
    const dbRow = mapToDB(report);
    const { error } = await supabase
      .from("reports")
      .upsert(dbRow, { onConflict: "slug" });
    results.push({ slug: report.slug, error: error?.message || null });
  }

  const failed = results.filter(r => r.error);

  if (failed.length > 0 && failed[0].error?.includes("schema cache")) {
    return NextResponse.json({
      success: false,
      error: "table_not_found",
      message: "Could not auto-create the reports table. Please run the SQL migration manually: go to your Supabase Dashboard → SQL Editor → paste the contents of supabase-reports-table.sql → click Run.",
    });
  }

  return NextResponse.json({
    success: failed.length === 0,
    total: results.length,
    failed,
    message: failed.length === 0
      ? `Successfully seeded ${results.length} reports`
      : `${results.length - failed.length} succeeded, ${failed.length} failed`,
  });
}
