-- Run this in your Supabase project → SQL Editor
-- Creates the testimonials table for the graduate feedback system

CREATE TABLE IF NOT EXISTS testimonials (
  id                  uuid              DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name      text              NOT NULL,
  display_name        text,
  location            text,
  course_name         text              NOT NULL,
  belt_level          text              NOT NULL,
  rating_overall      integer           NOT NULL CHECK (rating_overall BETWEEN 1 AND 5),
  rating_content      integer           CHECK (rating_content BETWEEN 1 AND 5),
  rating_instructor   integer           CHECK (rating_instructor BETWEEN 1 AND 5),
  rating_practical    integer           CHECK (rating_practical BETWEEN 1 AND 5),
  rating_support      integer           CHECK (rating_support BETWEEN 1 AND 5),
  would_recommend     boolean,
  enjoyed_most        text,
  suggestions         text,
  message_for_future  text,
  approved            boolean           DEFAULT false,
  created_at          timestamptz       DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback (insert)
CREATE POLICY "allow_feedback_insert"
  ON testimonials FOR INSERT
  WITH CHECK (true);

-- Only approved rows are readable publicly
CREATE POLICY "allow_approved_select"
  ON testimonials FOR SELECT
  USING (approved = true);
