-- ============================================================
--  Campus Connect — Full Database Schema
--  Run this in Supabase SQL Editor to set up all tables
-- ============================================================


-- ────────────────────────────────────────────────────────────
--  SECTION 1: CHAT
-- ────────────────────────────────────────────────────────────

-- Chat users (one row per connected student)
CREATE TABLE IF NOT EXISTS chat_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    avatar VARCHAR(10) DEFAULT 'SM',
    role VARCHAR(50) DEFAULT 'Student',       -- Student, TA, Mod, HOD
    color VARCHAR(30) DEFAULT 'bg-primary',   -- Tailwind class for avatar bg
    status VARCHAR(20) DEFAULT 'offline',     -- online | idle | offline
    college_email VARCHAR(200) UNIQUE,
    last_seen TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Channels (general, announcements, assignments, random, internships …)
CREATE TABLE IF NOT EXISTS channels (
    id VARCHAR(50) PRIMARY KEY,               -- e.g. 'general', 'assignments'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_voice BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Chat messages (all text messages across all channels)
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id VARCHAR(50) REFERENCES channels(id) ON DELETE CASCADE,
    sender_id INT REFERENCES chat_users(id) ON DELETE SET NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Emoji reactions on messages (WhatsApp style: 1 reaction per user per message)
CREATE TABLE IF NOT EXISTS reactions (
    id SERIAL PRIMARY KEY,
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    user_id INT REFERENCES chat_users(id) ON DELETE CASCADE,
    emoji VARCHAR(10) NOT NULL,
    UNIQUE(message_id, user_id)        -- strictly one reaction per user per message
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reactions_message ON reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_users_status ON chat_users(status);

-- Seed default channels
INSERT INTO channels (id, name, description) VALUES
  ('general',       'general',          'Open campus discussion'),
  ('announcements', 'announcements',    'Official notices from admin'),
  ('assignments',   'assignments-help', 'Ask for help with assignments'),
  ('random',        'random',           'Memes, fun, and everything else'),
  ('internships',   'internships',      'Internship leads and placement news')
ON CONFLICT DO NOTHING;


-- ────────────────────────────────────────────────────────────
--  SECTION 2: DATING (Campus Match)
-- ────────────────────────────────────────────────────────────


-- Dating profiles table
CREATE TABLE IF NOT EXISTS dating_profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    year VARCHAR(50),
    major VARCHAR(100),
    bio TEXT,
    interests TEXT[],
    emoji VARCHAR(10) DEFAULT '🎓',
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Swipe actions (like or pass)
CREATE TABLE IF NOT EXISTS swipes (
    id SERIAL PRIMARY KEY,
    swiper_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    swiped_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    action VARCHAR(10) CHECK (action IN ('like', 'pass')),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(swiper_id, swiped_id)
);

-- Mutual matches
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    user2_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user1_id, user2_id)
);

-- Index for fast profile fetching (exclude already-swiped profiles)
CREATE INDEX IF NOT EXISTS idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX IF NOT EXISTS idx_matches_users ON matches(user1_id, user2_id);

-- Seed some initial profiles for testing
INSERT INTO dating_profiles (name, age, year, major, bio, interests, emoji, verified)
VALUES
  ('Anjali Sharma',  20, '3rd Year', 'Design',            'Always sketchin'' in class. Coffee lover, indie music fan, and looking for someone to review campus cafes with!', ARRAY['Art', 'Indie Rock', 'Cafes', 'UI/UX'], '🎨', true),
  ('Vikram Sen',     21, '4th Year', 'Mechanical Eng.',   'Car enthusiast, amateur guitar player, and gym regular. Let''s study (or skip lectures) together.',              ARRAY['Gym', 'Guitars', 'Anime', 'Formula 1'], '🎸', false),
  ('Kavya Iyer',     19, '2nd Year', 'Economics',         'If you love debate, board games, and late night chai, we will probably get along. Bookworm 📚',                  ARRAY['Chai', 'Debating', 'Chess', 'Reading'], '♟️', true),
  ('Rohan Varma',    20, '3rd Year', 'Computer Science',  'I build websites and compile errors for fun. Let''s match if you want someone to debug your life.',              ARRAY['Coding', 'Hackathons', 'Valorant', 'Memes'], '💻', true),
  ('Tanya Kapoor',   20, '3rd Year', 'English Lit.',      'Poetry, street photography, and vintage vinyl records are my jam. Tell me your favorite movie?',                ARRAY['Poetry', 'Cinema', 'Vinyls', 'Travel'], '📷', false),
  ('Siddharth M.',   20, '3rd Year', 'Computer Science',  'Building campus apps for fun. Hackathon enthusiast. Ask me about my startup idea.',                             ARRAY['Coding', 'Startups', 'Chess', 'Coffee'], '🚀', true)
ON CONFLICT DO NOTHING;

