-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/YOUR_PROJECT/sql)
-- This creates all the tables needed for MindEarth backend

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample PDF requests (leads)
CREATE TABLE IF NOT EXISTS sample_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT,
  phone TEXT,
  report_slug TEXT,
  report_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- General report inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  report_slug TEXT,
  report_title TEXT,
  inquiry_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report file URLs (links to uploaded PDFs/Excel in Storage)
CREATE TABLE IF NOT EXISTS report_files (
  id BIGSERIAL PRIMARY KEY,
  report_slug TEXT UNIQUE NOT NULL,
  sample_pdf_url TEXT,
  full_pdf_url TEXT,
  excel_url TEXT,
  white_paper_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_files ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API routes use service key)
CREATE POLICY "Service role full access" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON sample_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON report_files FOR ALL USING (true) WITH CHECK (true);

-- Create storage bucket for report files
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true) ON CONFLICT DO NOTHING;

-- Allow public read access to report files
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'reports');
-- Allow service role to upload
CREATE POLICY "Service upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reports');
CREATE POLICY "Service update" ON storage.objects FOR UPDATE USING (bucket_id = 'reports');
