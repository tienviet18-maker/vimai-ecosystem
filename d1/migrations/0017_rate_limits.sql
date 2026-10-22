-- D1-backed fixed-window rate limiter (src/lib/d1-rate-limit.ts).
-- One row per (key, window). key = "<action>:<sha256(action:subject)>" — the raw IP or
-- email is never stored. Rows past expires_at are deleted opportunistically by the app.
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT NOT NULL,
  window_start INTEGER NOT NULL,              -- epoch seconds
  count INTEGER NOT NULL DEFAULT 0,
  expires_at INTEGER NOT NULL,                -- epoch seconds
  PRIMARY KEY (key, window_start)
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires ON rate_limits (expires_at);
