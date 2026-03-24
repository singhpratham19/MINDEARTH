-- ============================================
-- MindEarth Supabase Setup
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Sample Requests (when someone requests a sample PDF)
CREATE TABLE IF NOT EXISTS sample_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  job_title TEXT,
  phone TEXT,
  report_slug TEXT,
  report_title TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Report Inquiries (Buy Report / Custom Request)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  report_slug TEXT,
  report_title TEXT,
  inquiry_type TEXT DEFAULT 'buy_report',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Report Files (uploaded PDFs, Excel files)
CREATE TABLE IF NOT EXISTS report_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_slug TEXT UNIQUE NOT NULL,
  full_pdf_url TEXT,
  sample_pdf_url TEXT,
  excel_url TEXT,
  white_paper_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_files ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for API routes)
CREATE POLICY "Service role full access" ON sample_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON subscribers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON report_files FOR ALL USING (true) WITH CHECK (true);

-- 6. Create storage bucket for report files
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to report files
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'reports');

-- Allow service role to upload
CREATE POLICY "Service role upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reports');
CREATE POLICY "Service role update" ON storage.objects FOR UPDATE USING (bucket_id = 'reports');
CREATE POLICY "Service role delete" ON storage.objects FOR DELETE USING (bucket_id = 'reports');
