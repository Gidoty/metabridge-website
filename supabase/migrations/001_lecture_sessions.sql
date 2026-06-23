CREATE TABLE IF NOT EXISTS public.lecture_sessions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel             text NOT NULL CHECK (channel IN ('free', 'paid')),
  is_live             boolean NOT NULL DEFAULT false,
  daily_room_url      text,
  recording_active    boolean NOT NULL DEFAULT false,
  streaming_active    boolean NOT NULL DEFAULT false,
  youtube_rtmp_key    text,
  youtube_replay_url  text,
  current_slide_index integer NOT NULL DEFAULT 0,
  slides              jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Exactly one row per channel
CREATE UNIQUE INDEX IF NOT EXISTS lecture_sessions_channel_idx ON public.lecture_sessions (channel);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN new.updated_at = now(); RETURN new; END; $$;

DROP TRIGGER IF EXISTS lecture_sessions_updated_at ON public.lecture_sessions;
CREATE TRIGGER lecture_sessions_updated_at
  BEFORE UPDATE ON public.lecture_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.lecture_sessions ENABLE ROW LEVEL SECURITY;

-- Anon users (guest cookie, no Supabase session) can read
DROP POLICY IF EXISTS "Public read" ON public.lecture_sessions;
CREATE POLICY "Public read" ON public.lecture_sessions FOR SELECT USING (true);

-- Only admin JWT can write
DROP POLICY IF EXISTS "Admin write" ON public.lecture_sessions;
CREATE POLICY "Admin write" ON public.lecture_sessions FOR ALL
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Seed sessions (one per channel)
INSERT INTO public.lecture_sessions (channel, slides) VALUES
  ('free', '[
    {"id":"f1","title":"Welcome to Free Cohort","content":"Today we cover digital foundations.","type":"content"},
    {"id":"f2","title":"What is Cybersecurity?","content":"The practice of protecting systems, networks, and programs from digital attacks.","type":"content"},
    {"id":"f3","title":"Critical Thinking","content":"Apply what you have learned.","type":"question","question":{"text":"Name one cybersecurity threat you have personally encountered.","isOpenEnded":true}}
  ]'::jsonb),
  ('paid', '[
    {"id":"p1","title":"Pro Session","content":"Advanced professional curriculum begins now.","type":"content"},
    {"id":"p2","title":"Threat Modelling","content":"STRIDE model: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation.","type":"content"},
    {"id":"p3","title":"Take-Home Assignment","content":"Complete the network audit exercise.","type":"assignment","question":{"text":"Perform a vulnerability scan on your test environment and document 3 findings with CVSS scores.","isOpenEnded":true}}
  ]'::jsonb)
ON CONFLICT DO NOTHING;
