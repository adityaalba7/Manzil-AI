CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(100)  NOT NULL,
  email            VARCHAR(255)  UNIQUE NOT NULL,
  password_hash    VARCHAR(255),
  college          VARCHAR(200),
  monthly_budget   INTEGER       DEFAULT 800000,
  language_pref    VARCHAR(20)   DEFAULT 'english',
  trimind_score    SMALLINT      DEFAULT 0,
  streak_days      SMALLINT      DEFAULT 0,
  exam_date        DATE,
  onboarding_goal  VARCHAR(50),
  created_at       TIMESTAMPTZ   DEFAULT NOW(),
  last_active_at   TIMESTAMPTZ
);
