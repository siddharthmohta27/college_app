-- ============================================================
--  Campus Connect — Firebase Auth Migration
--  Links existing tables to Firebase Auth users
--  Run this in Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  CHAT USERS - Link to Firebase Auth
-- ────────────────────────────────────────────────────────────
ALTER TABLE IF EXISTS chat_users 
ADD COLUMN IF NOT EXISTS auth_user_id TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_chat_users_auth ON chat_users(auth_user_id);

-- ────────────────────────────────────────────────────────────
--  DATING PROFILES - Link to Firebase Auth
-- ────────────────────────────────────────────────────────────
ALTER TABLE IF EXISTS dating_profiles 
ADD COLUMN IF NOT EXISTS auth_user_id TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_dating_profiles_auth ON dating_profiles(auth_user_id);

-- ────────────────────────────────────────────────────────────
--  VERIFY COLUMNS EXIST
-- ────────────────────────────────────────────────────────────
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name IN ('chat_users', 'dating_profiles') 
AND column_name = 'auth_user_id';