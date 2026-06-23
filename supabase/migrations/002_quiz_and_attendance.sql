-- Quiz sessions (one active quiz per channel)
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel                text NOT NULL CHECK (channel IN ('free', 'paid')),
  phase                  text NOT NULL DEFAULT 'idle'
                           CHECK (phase IN ('idle','countdown','question','reveal','leaderboard','attendance','ended')),
  current_question_index integer NOT NULL DEFAULT 0,
  question_started_at    timestamptz,
  questions              jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at             timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS quiz_sessions_channel_idx ON public.quiz_sessions (channel);

-- Per-student answers
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_session_id  uuid NOT NULL REFERENCES public.quiz_sessions(id) ON DELETE CASCADE,
  channel          text NOT NULL,
  student_name     text NOT NULL,
  user_id          uuid,
  question_index   integer NOT NULL,
  selected_option  integer NOT NULL,
  is_correct       boolean NOT NULL,
  time_taken_ms    integer NOT NULL,
  points           integer NOT NULL DEFAULT 0,
  submitted_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (quiz_session_id, student_name, question_index)
);

-- Attendance logs
CREATE TABLE IF NOT EXISTS public.attendance_logs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel         text NOT NULL,
  quiz_session_id uuid REFERENCES public.quiz_sessions(id) ON DELETE SET NULL,
  student_name    text NOT NULL,
  user_id         uuid,
  module_title    text,
  logged_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_sessions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_logs   ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Quiz sessions public read" ON public.quiz_sessions;
DROP POLICY IF EXISTS "Quiz sessions admin write" ON public.quiz_sessions;
CREATE POLICY "Quiz sessions public read" ON public.quiz_sessions FOR SELECT USING (true);
CREATE POLICY "Quiz sessions admin write" ON public.quiz_sessions FOR ALL
  USING  ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Quiz submissions insert" ON public.quiz_submissions;
DROP POLICY IF EXISTS "Quiz submissions read"   ON public.quiz_submissions;
CREATE POLICY "Quiz submissions insert" ON public.quiz_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Quiz submissions read"   ON public.quiz_submissions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Attendance insert" ON public.attendance_logs;
DROP POLICY IF EXISTS "Attendance read"   ON public.attendance_logs;
CREATE POLICY "Attendance insert" ON public.attendance_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Attendance read"   ON public.attendance_logs FOR SELECT USING (true);

INSERT INTO public.quiz_sessions (channel) VALUES ('free'), ('paid') ON CONFLICT DO NOTHING;
