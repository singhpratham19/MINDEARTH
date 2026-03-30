-- ============================================
-- MindEarth: Reports Content Table
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

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

  -- Companies
  companies JSONB DEFAULT '[]'::jsonb,
  domains JSONB DEFAULT '[]'::jsonb,
  company_table JSONB DEFAULT '[]'::jsonb,

  -- Segments & Regions
  segments JSONB DEFAULT '[]'::jsonb,
  segments_by_tech JSONB,
  segments_by_app JSONB,
  regions JSONB DEFAULT '[]'::jsonb,
  segment_tables JSONB,

  -- Market stats
  market_concentration TEXT,
  fastest_growing_region TEXT,
  largest_region TEXT,

  -- Key takeaways
  key_takeaways JSONB,

  -- Drivers & Restraints
  drivers JSONB,
  restraints JSONB,

  -- Region table
  region_table JSONB,

  -- Developments
  developments JSONB,

  -- Analysis content (deep-dive paragraphs, FAQs, scope)
  analysis_content JSONB,

  -- Table of Contents
  toc JSONB DEFAULT '[]'::jsonb,

  -- ESG & GRI Analysis tab content
  esg_content JSONB,

  -- Publishing
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role full access" ON reports FOR ALL USING (true) WITH CHECK (true);

-- Allow public read for published reports
CREATE POLICY "Public read published" ON reports FOR SELECT USING (published = true);
