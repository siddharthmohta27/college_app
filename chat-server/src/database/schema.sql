-- Run this file to initialize the Campus Match dating tables
-- Execute with: psql -d YOUR_DB_NAME -f src/database/schema.sql

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

