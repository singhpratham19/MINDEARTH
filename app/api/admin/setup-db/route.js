import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CREATE_REPORTS_TABLE_SQL = `
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

const REPORTS_POLICIES_SQL = `
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

const CREATE_INSIGHTS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  cat TEXT DEFAULT 'TRENDS',
  date TEXT,
  read_time TEXT,
  author TEXT DEFAULT 'MindEarth Research Team',
  img TEXT,
  summary TEXT,
  key_takeaways JSONB DEFAULT '[]'::jsonb,
  sections JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  related JSONB DEFAULT '[]'::jsonb,
  pdf_url TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
`;

const INSIGHTS_POLICIES_SQL = `
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'insights' AND policyname = 'Service role full access insights') THEN
    CREATE POLICY "Service role full access insights" ON insights FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'insights' AND policyname = 'Public read published insights') THEN
    CREATE POLICY "Public read published insights" ON insights FOR SELECT USING (published = true);
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

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      db: { schema: "public" },
    });

    // Check which tables exist
    const { error: reportsError } = await supabase.from("reports").select("id").limit(1);
    const { error: insightsError } = await supabase.from("insights").select("id").limit(1);

    const reportsExists = !reportsError || !reportsError.message.includes("schema cache");
    const insightsExists = !insightsError || !insightsError.message.includes("schema cache");

    if (reportsExists && insightsExists) {
      return NextResponse.json({ success: true, message: "Database is already set up! Both reports and insights tables exist." });
    }

    // Build SQL for missing tables
    let sql = "";
    const missingTables = [];

    if (!reportsExists) {
      sql += CREATE_REPORTS_TABLE_SQL + REPORTS_POLICIES_SQL;
      missingTables.push("reports");
    }
    if (!insightsExists) {
      sql += CREATE_INSIGHTS_TABLE_SQL + INSIGHTS_POLICIES_SQL;
      missingTables.push("insights");
    }

    return NextResponse.json({
      success: false,
      needsManualSetup: true,
      message: `The following table(s) need to be created: ${missingTables.join(", ")}. Copy the SQL below and run it in Supabase Dashboard → SQL Editor.`,
      sql,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
