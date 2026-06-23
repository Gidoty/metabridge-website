-- Student progress tracking (pro users; guests use localStorage)
CREATE TABLE IF NOT EXISTS public.student_progress (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel           text NOT NULL CHECK (channel IN ('free', 'paid')),
  completed_modules integer[] NOT NULL DEFAULT '{}',
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, channel)
);

CREATE TRIGGER student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own progress"
  ON public.student_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin read all progress"
  ON public.student_progress FOR SELECT
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Capstone submissions
CREATE TABLE IF NOT EXISTS public.capstone_submissions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  channel          text NOT NULL,
  student_name     text NOT NULL,
  student_email    text NOT NULL,
  drive_url        text NOT NULL,
  approved         boolean NOT NULL DEFAULT false,
  approved_at      timestamptz,
  submitted_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.capstone_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students submit capstone"
  ON public.capstone_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin manage capstones"
  ON public.capstone_submissions FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
