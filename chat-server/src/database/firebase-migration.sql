-- ============================================================
--  Campus Connect — Firebase Auth Migration
--  Run this in Supabase SQL Editor AFTER running schema.sql
--  Replaces Supabase auth_user_id columns with firebase_uid
-- ============================================================

-- ─── CHAT USERS ─────────────────────────────────────────────

-- Remove Supabase auth reference (if exists)
ALTER TABLE chat_users
  DROP COLUMN IF EXISTS auth_user_id;

-- Add Firebase UID column
ALTER TABLE chat_users
  ADD COLUMN IF NOT EXISTS firebase_uid VARCHAR(128) UNIQUE;

-- Index for fast lookups by Firebase UID
CREATE INDEX IF NOT EXISTS idx_chat_users_firebase ON chat_users(firebase_uid);

-- ─── DATING PROFILES ─────────────────────────────────────────

-- Remove Supabase auth reference (if exists)
ALTER TABLE dating_profiles
  DROP COLUMN IF EXISTS auth_user_id;

-- Add Firebase UID column
ALTER TABLE dating_profiles
  ADD COLUMN IF NOT EXISTS firebase_uid VARCHAR(128) UNIQUE;

-- Index for fast lookups by Firebase UID
CREATE INDEX IF NOT EXISTS idx_dating_profiles_firebase ON dating_profiles(firebase_uid);

-- ─── UPDATE SEED DATA (assign placeholder firebase_uid for testing) ─

-- This allows the seed profiles to be visible before real users log in
-- In production, real firebase_uid will be assigned when users log in
UPDATE dating_profiles SET firebase_uid = 'seed-' || id::text WHERE firebase_uid IS NULL;
UPDATE chat_users SET firebase_uid = 'seed-' || id::text WHERE firebase_uid IS NULL;
