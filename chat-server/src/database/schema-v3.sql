-- ============================================================
--  Campus Connect — Campus Match V3 Database Schema Migration
--  Run this in Supabase SQL Editor to add all V3 tables
--  Compatible with existing schema.sql (extends, doesn't replace)
-- ============================================================

-- ────────────────────────────────────────────────────────────
--  EXTEND EXISTING: dating_profiles (add new columns)
-- ────────────────────────────────────────────────────────────
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS auth_user_id TEXT UNIQUE;
ALTER TABLE chat_users ADD COLUMN IF NOT EXISTS auth_user_id TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_chat_users_auth_user ON chat_users(auth_user_id);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS first_name VARCHAR(50);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS last_name VARCHAR(50);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS college_email VARCHAR(200);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS profile_photo_url TEXT;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS pronouns VARCHAR(50);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS relationship_preference VARCHAR(20)[] DEFAULT '{}';
-- Options: 'friends', 'dating', 'study_buddy', 'networking', 'startup_partner'
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS branch VARCHAR(100);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS year VARCHAR(20);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS hostel VARCHAR(100);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS languages TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS clubs TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS societies TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS favorite_cafe VARCHAR(100);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS favorite_sport VARCHAR(100);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS study_subjects TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS study_cgpa_goal VARCHAR(10);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS study_preferred_time VARCHAR(50);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS study_preferred_location VARCHAR(50);
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS startup_looking_for BOOLEAN DEFAULT false;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS startup_role VARCHAR(50);
-- Options: 'cofounder', 'developer', 'designer', 'ml_engineer', 'marketing', 'business'
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS startup_skills TEXT[] DEFAULT '{}';
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS is_incognito BOOLEAN DEFAULT false;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS show_only VARCHAR(20) DEFAULT 'all';
-- Options: 'all', 'friends', 'dating'
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS photo_verified BOOLEAN DEFAULT false;
ALTER TABLE dating_profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_dating_profiles_auth_user ON dating_profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_dating_profiles_branch_year ON dating_profiles(branch, year);
CREATE INDEX IF NOT EXISTS idx_dating_profiles_verified ON dating_profiles(is_verified) WHERE is_verified = true;

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: profile_photos (max 3 per user)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profile_photos (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    width INT,
    height INT,
    file_size INT,
    mime_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profile_photos_profile ON profile_photos(profile_id);
CREATE INDEX IF NOT EXISTS idx_profile_photos_main ON profile_photos(profile_id, is_main) WHERE is_main = true;

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: prompts (Hinge-style)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed default prompts
INSERT INTO prompts (text, category, display_order) VALUES
    ('We''ll get along if...', 'general', 1),
    ('Green flag...', 'general', 2),
    ('My biggest flex...', 'general', 3),
    ('Dream campus date...', 'dating', 4),
    ('Best PEC memory...', 'campus', 5),
    ('Two truths and a lie...', 'fun', 6),
    ('My ideal weekend...', 'lifestyle', 7),
    ('I''m weirdly good at...', 'fun', 8),
    ('The way to my heart is...', 'dating', 9),
    ('Unpopular opinion...', 'fun', 10),
    ('Currently learning...', 'growth', 11),
    ('My startup idea...', 'startup', 12),
    ('Best hackathon project...', 'tech', 13),
    ('Go-to study spot...', 'study', 14),
    ('Weekend plans usually...', 'lifestyle', 15)
ON CONFLICT DO NOTHING;

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: profile_prompts (user answers to prompts)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profile_prompts (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    prompt_id INT REFERENCES prompts(id) ON DELETE CASCADE,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(profile_id, prompt_id)
);

CREATE INDEX IF NOT EXISTS idx_profile_prompts_profile ON profile_prompts(profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: prompt_likes (like a specific prompt answer)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prompt_likes (
    id SERIAL PRIMARY KEY,
    liker_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    target_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    prompt_id INT REFERENCES prompts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(liker_profile_id, target_profile_id, prompt_id)
);

CREATE INDEX IF NOT EXISTS idx_prompt_likes_target ON prompt_likes(target_profile_id);
CREATE INDEX IF NOT EXISTS idx_prompt_likes_liker ON prompt_likes(liker_profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: photo_likes (like a specific photo)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS photo_likes (
    id SERIAL PRIMARY KEY,
    liker_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    target_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    photo_id INT REFERENCES profile_photos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(liker_profile_id, target_profile_id, photo_id)
);

CREATE INDEX IF NOT EXISTS idx_photo_likes_target ON photo_likes(target_profile_id);
CREATE INDEX IF NOT EXISTS idx_photo_likes_liker ON photo_likes(liker_profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: friend_requests
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS friend_requests (
    id SERIAL PRIMARY KEY,
    sender_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    receiver_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',
    -- Options: 'pending', 'accepted', 'rejected', 'blocked'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(sender_profile_id, receiver_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_friend_requests_receiver ON friend_requests(receiver_profile_id, status);
CREATE INDEX IF NOT EXISTS idx_friend_requests_sender ON friend_requests(sender_profile_id, status);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: friends (mutual friendship)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS friends (
    id SERIAL PRIMARY KEY,
    profile1_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    profile2_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(profile1_id, profile2_id)
);

CREATE INDEX IF NOT EXISTS idx_friends_profile1 ON friends(profile1_id);
CREATE INDEX IF NOT EXISTS idx_friends_profile2 ON friends(profile2_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: blocks
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blocks (
    id SERIAL PRIMARY KEY,
    blocker_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    blocked_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    reason TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(blocker_profile_id, blocked_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_profile_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocked ON blocks(blocked_profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: reports
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    reported_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    reason VARCHAR(50) NOT NULL,
    -- Options: 'fake_profile', 'inappropriate_photos', 'harassment', 'spam', 'underage', 'other'
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    -- Options: 'pending', 'reviewed', 'dismissed', 'action_taken'
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_reported ON reports(reported_profile_id, status);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: notifications
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    -- Types: 'friend_request', 'friend_accepted', 'match', 'prompt_like', 'photo_like', 'message', 'event_match', 'conversation_starter'
    title TEXT NOT NULL,
    body TEXT,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_profile ON notifications(profile_id, is_read, created_at DESC);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: compatibility_scores (cached AI scores)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS compatibility_scores (
    id SERIAL PRIMARY KEY,
    profile1_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    profile2_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score >= 0 AND score <= 100),
    reasons JSONB DEFAULT '[]',
    -- Array of reason objects: { "type": "same_branch", "label": "Same Department", "weight": 25 }
    calculated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(profile1_id, profile2_id)
);

CREATE INDEX IF NOT EXISTS idx_compatibility_profile1 ON compatibility_scores(profile1_id);
CREATE INDEX IF NOT EXISTS idx_compatibility_profile2 ON compatibility_scores(profile2_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: events (campus events for event matching)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL,
    -- Types: 'hackathon', 'sports', 'pec_fest', 'startup_fair', 'coding_contest', 'seminar', 'workshop', 'other'
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    location VARCHAR(200),
    organizer VARCHAR(200),
    max_attendees INT,
    image_url TEXT,
    registration_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_type_time ON events(event_type, start_time);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active) WHERE is_active = true;

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: event_rsvps
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS event_rsvps (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'going',
    -- Options: 'going', 'interested', 'not_going'
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(event_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_event_rsvps_event ON event_rsvps(event_id, status);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_profile ON event_rsvps(profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: saved_profiles (bookmarks)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS saved_profiles (
    id SERIAL PRIMARY KEY,
    saver_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    saved_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(saver_profile_id, saved_profile_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_profiles_saver ON saved_profiles(saver_profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: daily_picks (curated daily profiles)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_picks (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    pick_date DATE NOT NULL,
    rank INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(profile_id, pick_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_picks_date ON daily_picks(pick_date);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: conversation_starters (AI-generated)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversation_starters (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id) ON DELETE CASCADE,
    starter_text TEXT NOT NULL,
    context JSONB,
    -- e.g., { "type": "shared_interest", "interest": "Hackathons" }
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversation_starters_match ON conversation_starters(match_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: profile_badges
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profile_badges (
    id SERIAL PRIMARY KEY,
    profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    badge_type VARCHAR(50) NOT NULL,
    -- Types: 'verified_student', 'club_lead', 'hackathon_winner', 'startup_founder', 'placement_coordinator', 'athlete', 'alumni_mentor'
    badge_data JSONB DEFAULT '{}',
    awarded_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(profile_id, badge_type)
);

CREATE INDEX IF NOT EXISTS idx_profile_badges_profile ON profile_badges(profile_id);

-- ────────────────────────────────────────────────────────────
--  NEW TABLE: campus_graph_edges (relationship graph)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_graph_edges (
    id SERIAL PRIMARY KEY,
    source_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    target_profile_id INT REFERENCES dating_profiles(id) ON DELETE CASCADE,
    edge_type VARCHAR(30) NOT NULL,
    -- Types: 'friend', 'match', 'club_mate', 'classmate', 'event_buddy', 'mutual_friend'
    weight FLOAT DEFAULT 1.0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(source_profile_id, target_profile_id, edge_type)
);

CREATE INDEX IF NOT EXISTS idx_campus_graph_source ON campus_graph_edges(source_profile_id);
CREATE INDEX IF NOT EXISTS idx_campus_graph_target ON campus_graph_edges(target_profile_id);
CREATE INDEX IF NOT EXISTS idx_campus_graph_type ON campus_graph_edges(edge_type);

-- ────────────────────────────────────────────────────────────
--  UPDATE EXISTING TABLES: Add missing columns
-- ────────────────────────────────────────────────────────────
-- Add auth_user_id to swipes if not exists
ALTER TABLE swipes ADD COLUMN IF NOT EXISTS auth_user_id TEXT;

-- Add matched_at to matches
ALTER TABLE matches ADD COLUMN IF NOT EXISTS matched_at TIMESTAMP DEFAULT NOW();

-- ────────────────────────────────────────────────────────────
--  VIEWS FOR COMMON QUERIES
-- ────────────────────────────────────────────────────────────

-- View: Profile with main photo
CREATE OR REPLACE VIEW profile_with_main_photo AS
SELECT
    dp.*,
    pp.url AS main_photo_url,
    pp.storage_path AS main_photo_path
FROM dating_profiles dp
LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true;

-- View: Profile with all photos
CREATE OR REPLACE VIEW profile_with_photos AS
SELECT
    dp.*,
    json_agg(
        json_build_object(
            'id', pp.id,
            'url', pp.url,
            'is_main', pp.is_main,
            'display_order', pp.display_order
        ) ORDER BY pp.display_order
    ) FILTER (WHERE pp.id IS NOT NULL) AS photos
FROM dating_profiles dp
LEFT JOIN profile_photos pp ON pp.profile_id = dp.id
GROUP BY dp.id;

-- View: Profile with prompts
CREATE OR REPLACE VIEW profile_with_prompts AS
SELECT
    dp.*,
    json_agg(
        json_build_object(
            'id', pp.id,
            'prompt_id', p.id,
            'prompt_text', p.text,
            'prompt_category', p.category,
            'answer', pp.answer,
            'display_order', pp.display_order
        ) ORDER BY pp.display_order
    ) FILTER (WHERE pp.id IS NOT NULL) AS prompts
FROM dating_profiles dp
LEFT JOIN profile_prompts pp ON pp.profile_id = dp.id
LEFT JOIN prompts p ON p.id = pp.prompt_id
GROUP BY dp.id;

-- View: Match with starter
CREATE OR REPLACE VIEW match_with_starter AS
SELECT
    m.*,
    cs.starter_text,
    cs.context
FROM matches m
LEFT JOIN conversation_starters cs ON cs.match_id = m.id;

-- ────────────────────────────────────────────────────────────
--  FUNCTIONS & TRIGGERS
-- ────────────────────────────────────────────────────────────

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS update_dating_profiles_updated_at ON dating_profiles;
CREATE TRIGGER update_dating_profiles_updated_at
    BEFORE UPDATE ON dating_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_friend_requests_updated_at ON friend_requests;
CREATE TRIGGER update_friend_requests_updated_at
    BEFORE UPDATE ON friend_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Create friendship edge in campus graph
CREATE OR REPLACE FUNCTION create_friendship_edge(profile1 INT, profile2 INT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO campus_graph_edges (source_profile_id, target_profile_id, edge_type, weight)
    VALUES (profile1, profile2, 'friend', 1.0)
    ON CONFLICT (source_profile_id, target_profile_id, edge_type) DO NOTHING;
    
    INSERT INTO campus_graph_edges (source_profile_id, target_profile_id, edge_type, weight)
    VALUES (profile2, profile1, 'friend', 1.0)
    ON CONFLICT (source_profile_id, target_profile_id, edge_type) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Function: Create match edge in campus graph
CREATE OR REPLACE FUNCTION create_match_edge(profile1 INT, profile2 INT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO campus_graph_edges (source_profile_id, target_profile_id, edge_type, weight)
    VALUES (profile1, profile2, 'match', 1.5)
    ON CONFLICT (source_profile_id, target_profile_id, edge_type) DO NOTHING;
    
    INSERT INTO campus_graph_edges (source_profile_id, target_profile_id, edge_type, weight)
    VALUES (profile2, profile1, 'match', 1.5)
    ON CONFLICT (source_profile_id, target_profile_id, edge_type) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- Function: Get mutual friends count
CREATE OR REPLACE FUNCTION get_mutual_friends_count(profile1 INT, profile2 INT)
RETURNS INT AS $$
DECLARE
    count INT;
BEGIN
    SELECT COUNT(*) INTO count
    FROM friends f1
    JOIN friends f2 ON (
        (f1.profile1_id = f2.profile1_id OR f1.profile1_id = f2.profile2_id OR f1.profile2_id = f2.profile1_id OR f1.profile2_id = f2.profile2_id)
        AND f1.profile1_id != f2.profile1_id AND f1.profile1_id != f2.profile2_id
        AND f1.profile2_id != f2.profile1_id AND f1.profile2_id != f2.profile2_id
    )
    WHERE (f1.profile1_id = profile1 OR f1.profile2_id = profile1)
      AND (f2.profile1_id = profile2 OR f2.profile2_id = profile2)
      AND f1.profile1_id = f2.profile1_id OR f1.profile1_id = f2.profile2_id OR f1.profile2_id = f2.profile1_id OR f1.profile2_id = f2.profile2_id;
    
    RETURN COALESCE(count, 0);
END;
$$ LANGUAGE plpgsql;

-- ────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY (RLS) POLICIES
-- ────────────────────────────────────────────────────────────
-- Enable RLS on new tables
ALTER TABLE profile_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_starters ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE campus_graph_edges ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own data
CREATE POLICY "Users can view own photos" ON profile_photos
    FOR SELECT USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can manage own photos" ON profile_photos
    FOR ALL USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own prompts" ON profile_prompts
    FOR SELECT USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can manage own prompts" ON profile_prompts
    FOR ALL USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view received prompt likes" ON prompt_likes
    FOR SELECT USING (target_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can create prompt likes" ON prompt_likes
    FOR INSERT WITH CHECK (liker_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view received photo likes" ON photo_likes
    FOR SELECT USING (target_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can create photo likes" ON photo_likes
    FOR INSERT WITH CHECK (liker_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own friend requests" ON friend_requests
    FOR SELECT USING (sender_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()) OR receiver_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can send friend requests" ON friend_requests
    FOR INSERT WITH CHECK (sender_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can update received friend requests" ON friend_requests
    FOR UPDATE USING (receiver_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own friendships" ON friends
    FOR SELECT USING (profile1_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()) OR profile2_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can manage own blocks" ON blocks
    FOR ALL USING (blocker_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can create reports" ON reports
    FOR INSERT WITH CHECK (reporter_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can view own reports" ON reports
    FOR SELECT USING (reporter_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own compatibility scores" ON compatibility_scores
    FOR SELECT USING (profile1_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()) OR profile2_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can manage own event RSVPs" ON event_rsvps
    FOR ALL USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));
CREATE POLICY "Users can view event RSVPs for events they RSVP'd to" ON event_rsvps
    FOR SELECT USING (event_id IN (SELECT event_id FROM event_rsvps WHERE profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())));

CREATE POLICY "Users can manage own saved profiles" ON saved_profiles
    FOR ALL USING (saver_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view daily picks" ON daily_picks
    FOR SELECT USING (true);

CREATE POLICY "Users can view starters for their matches" ON conversation_starters
    FOR SELECT USING (match_id IN (SELECT id FROM matches WHERE user1_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()) OR user2_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())));

CREATE POLICY "Users can view own badges" ON profile_badges
    FOR SELECT USING (profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

CREATE POLICY "Users can view own graph edges" ON campus_graph_edges
    FOR SELECT USING (source_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()) OR target_profile_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid()));

-- Public read policies for reference data
CREATE POLICY "Prompts are publicly readable" ON prompts FOR SELECT USING (is_active = true);
CREATE POLICY "Events are publicly readable" ON events FOR SELECT USING (is_active = true);