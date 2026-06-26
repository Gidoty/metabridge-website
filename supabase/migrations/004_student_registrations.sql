CREATE TABLE IF NOT EXISTS public.student_registrations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    text NOT NULL,
  email        text NOT NULL,
  whatsapp     text NOT NULL,
  course       text NOT NULL,
  status       text NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  approved_at  timestamptz
);

ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON public.student_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manages registrations"
  ON public.student_registrations FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
