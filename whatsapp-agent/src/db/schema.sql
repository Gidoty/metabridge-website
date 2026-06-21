-- ═══════════════════════════════════════════════════════════════════
-- METABRIDGE WHATSAPP AGENT — DATABASE SCHEMA
-- SQLite. Run automatically on first start (see src/db/db.js).
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_number TEXT UNIQUE NOT NULL,        -- WhatsApp number, digits only
  display_name TEXT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  joined_at TEXT NOT NULL DEFAULT (datetime('now')),
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT,                            -- local path to the file, if a document
  link_url TEXT,                              -- external link, if a URL instead
  module_tag TEXT,                            -- e.g. "Module 3", "Week 5"
  added_at TEXT NOT NULL DEFAULT (datetime('now')),
  added_by TEXT                               -- admin phone number who added it
);

CREATE TABLE IF NOT EXISTS deadlines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  title TEXT NOT NULL,
  description TEXT,
  due_at TEXT NOT NULL,                       -- ISO datetime
  reminder_sent_24h INTEGER NOT NULL DEFAULT 0,
  reminder_sent_1h INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lectures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  title TEXT NOT NULL,
  starts_at TEXT NOT NULL,                    -- ISO datetime
  link_url TEXT,                              -- Zoom/Meet link if virtual
  reminder_sent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  tags TEXT,                                  -- comma-separated keywords
  added_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS nudges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cohort_id TEXT NOT NULL DEFAULT 'default-cohort',
  content TEXT NOT NULL,
  module_tag TEXT,
  used INTEGER NOT NULL DEFAULT 0,            -- marked 1 once sent, so we don't repeat
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Rolling log of group messages, used for the summarisation feature.
-- Old rows are pruned automatically after a summary is generated
-- (see src/features/summarization.js) to avoid storing data indefinitely.
CREATE TABLE IF NOT EXISTS message_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id TEXT NOT NULL,
  sender_number TEXT NOT NULL,
  sender_name TEXT,
  message_text TEXT,
  sent_at TEXT NOT NULL DEFAULT (datetime('now')),
  flagged_as_spam INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_message_log_group_time ON message_log(group_id, sent_at);
CREATE INDEX IF NOT EXISTS idx_deadlines_due ON deadlines(due_at);
CREATE INDEX IF NOT EXISTS idx_lectures_starts ON lectures(starts_at);
