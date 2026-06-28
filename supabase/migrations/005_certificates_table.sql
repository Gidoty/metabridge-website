-- Ensure the correct certificates table exists with the right columns.
-- Run each block separately if needed; the IF NOT EXISTS guards make them safe to re-run.

-- 1. Create the canonical certificates table (if it doesn't already exist)
CREATE TABLE IF NOT EXISTS public.certificates (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_code text NOT NULL,
  certificate_type text,
  candidate_name   text NOT NULL,
  course_name      text NOT NULL,
  cohort           text,
  serial_number    text,
  year_issued      text,
  date_issued      date,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- 2. Unique index so lookups are fast and codes can't be duplicated
CREATE UNIQUE INDEX IF NOT EXISTS certificates_code_idx
  ON public.certificates (certificate_code);

-- 3. RLS — anyone can look up a certificate; only admin can insert/update/delete
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can verify" ON public.certificates;
CREATE POLICY "Anyone can verify" ON public.certificates
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manages certificates" ON public.certificates;
CREATE POLICY "Admin manages certificates" ON public.certificates
  FOR ALL USING ((auth.jwt()->'app_metadata'->>'role') = 'admin');

-- 4. Drop the duplicate "Certificate" table (capital C, created by accident).
--    IMPORTANT: only run this line AFTER confirming all your real data
--    is in the lowercase "certificates" table above.
-- DROP TABLE IF EXISTS public."Certificate";
