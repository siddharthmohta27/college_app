-- ============================================================
--  Campus Connect — Auth Migration
--  Links existing tables to Supabase Auth users
--  Run this in Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  CHAT USERS - Link to Supabase Auth
-- ────────────────────────────────────────────────────────────
ALTER TABLE IF EXISTS chat_users 
ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_chat_users_auth ON chat_users(auth_user_id);
ALTER TABLE chat_users
ADD COLUMN IF NOT EXISTS last_seen TIMESTAMP DEFAULT NOW();
-- ────────────────────────────────────────────────────────────
--  DATING PROFILES - Link to Supabase Auth
-- ────────────────────────────────────────────────────────────
ALTER TABLE IF EXISTS dating_profiles 
ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id);

CREATE INDEX IF NOT EXISTS idx_dating_profiles_auth ON dating_profiles(auth_user_id);

-- ────────────────────────────────────────────────────────────
--  HELPER FUNCTION: Get or create chat user for auth user
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_or_create_chat_user(
    p_auth_user_id UUID,
    p_username VARCHAR(100),
    p_avatar VARCHAR(10),
    p_role VARCHAR(50) DEFAULT 'Student',
    p_color VARCHAR(30) DEFAULT 'bg-primary',
    p_email VARCHAR(200) DEFAULT NULL
)
RETURNS TABLE (
    id INT,
    username VARCHAR(100),
    avatar VARCHAR(10),
    role VARCHAR(50),
    color VARCHAR(30),
    status VARCHAR(20),
    auth_user_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO chat_users (
        username,
        avatar,
        role,
        color,
        status,
        college_email,
        auth_user_id
    )
    VALUES (
        p_username,
        p_avatar,
        p_role,
        p_color,
        'online',
        p_email,
        p_auth_user_id
    )
    ON CONFLICT (auth_user_id)
    DO UPDATE SET
        username = EXCLUDED.username,
        avatar = EXCLUDED.avatar,
        role = EXCLUDED.role,
        color = EXCLUDED.color,
        status = 'online',
        last_seen = NOW()
    RETURNING
        chat_users.id,
        chat_users.username,
        chat_users.avatar,
        chat_users.role,
        chat_users.color,
        chat_users.status,
        chat_users.auth_user_id;
END;
$$;
-- ────────────────────────────────────────────────────────────
--  HELPER FUNCTION: Get or create dating profile for auth user
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_or_create_dating_profile(
    p_auth_user_id UUID,
    p_name VARCHAR(100),
    p_age INT DEFAULT 20,
    p_year VARCHAR(50) DEFAULT '3rd Year',
    p_major VARCHAR(100) DEFAULT 'Computer Science',
    p_bio TEXT DEFAULT 'Hey there! I''m new to Campus Connect.',
    p_interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    p_emoji VARCHAR(10) DEFAULT '🎓',
    p_verified BOOLEAN DEFAULT false
)
RETURNS TABLE (
    id INT,
    name VARCHAR(100),
    age INT,
    year VARCHAR(50),
    major VARCHAR(100),
    bio TEXT,
    interests TEXT[],
    emoji VARCHAR(10),
    verified BOOLEAN,
    auth_user_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO dating_profiles (
        name,
        age,
        year,
        major,
        bio,
        interests,
        emoji,
        verified,
        auth_user_id
    )
    VALUES (
        p_name,
        p_age,
        p_year,
        p_major,
        p_bio,
        p_interests,
        p_emoji,
        p_verified,
        p_auth_user_id
    )
    ON CONFLICT (auth_user_id)
    DO UPDATE SET
        name = EXCLUDED.name,
        age = EXCLUDED.age,
        year = EXCLUDED.year,
        major = EXCLUDED.major,
        bio = EXCLUDED.bio,
        interests = EXCLUDED.interests,
        emoji = EXCLUDED.emoji,
        verified = EXCLUDED.verified
    RETURNING
        dating_profiles.id,
        dating_profiles.name,
        dating_profiles.age,
        dating_profiles.year,
        dating_profiles.major,
        dating_profiles.bio,
        dating_profiles.interests,
        dating_profiles.emoji,
        dating_profiles.verified,
        dating_profiles.auth_user_id;
END;
$$;

-- ────────────────────────────────────────────────────────────
--  TRIGGER: Auto-create profiles when user signs up (optional)
--  Uncomment if you want automatic profile creation
-- ────────────────────────────────────────────────────────────
/*
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create chat user
    PERFORM get_or_create_chat_user(
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        UPPER(SUBSTRING(COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email) FROM 1 FOR 2)),
        'Student',
        'bg-primary',
        NEW.email
    );
    
    -- Create dating profile
    PERFORM get_or_create_dating_profile(
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
        20,
        'Student',
        'Undeclared',
        'Hey there! I''m new to Campus Connect.',
        ARRAY[]::TEXT[],
        '🎓',
        false
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
*/