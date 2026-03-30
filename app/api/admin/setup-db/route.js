import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
`;

const POLICIES_SQL = `
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  // Use the Supabase SQL API (available via PostgREST pg_net or the /sql endpoint)
  // The service role key has full DB access
  try {
    // Method 1: Use supabase-js to run raw SQL via the pg_catalog
    const supabase = createClient(supabaseUrl, serviceKey, {
      db: { schema: "public" },
    });

    // Try running SQL through the Supabase HTTP SQL endpoint
    const sqlRes = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
    });

    // The most reliable way: use the postgres connection through the Supabase SQL API
    // POST to /sql endpoint (available on Supabase projects)
    const createRes = await fetch(`${supabaseUrl.replace('.supabase.co', '.supabase.co')}/rest/v1/rpc/`, {
      method: "OPTIONS",
      headers: { apikey: serviceKey },
    });

    // Since direct SQL execution through the REST API is limited,
    // let's try a different approach: use the service role client to check if table exists
    // and provide clear instructions
    const { data, error } = await supabase.from("reports").select("id").limit(1);

    if (error && error.message.includes("schema cache")) {
      // Table doesn't exist — we need to create it
      // Unfortunately, Supabase REST API doesn't support DDL directly
      // Return the SQL for the user to run
      return NextResponse.json({
        success: false,
        needsManualSetup: true,
        message: "The reports table needs to be created. Copy the SQL below and run it in Supabase Dashboard → SQL Editor.",
        sql: CREATE_TABLE_SQL + POLICIES_SQL,
      });
    }

    // Table exists
    return NextResponse.json({ success: true, message: "Database is already set up!" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
