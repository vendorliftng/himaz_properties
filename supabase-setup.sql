-- Himaz Properties — Supabase Schema Setup
-- Run this in your Supabase SQL Editor

-- Enable RLS (Row Level Security)

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  interest TEXT DEFAULT 'general',
  budget TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (website form submissions)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy for authenticated reads (admin dashboard)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT TO authenticated
  USING (true);

-- Create policy for authenticated updates (admin status changes)
CREATE POLICY "Allow authenticated updates" ON leads
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
