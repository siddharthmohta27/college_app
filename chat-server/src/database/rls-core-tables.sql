-- ============================================================
-- Campus Connect — Core Tables RLS Policies
-- Run this in Supabase SQL Editor AFTER schema.sql
-- Enables Row Level Security on all core tables
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- ENABLE RLS ON CORE TABLES
-- ────────────────────────────────────────────────────────────
ALTER TABLE chat_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dating_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_saves ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────
-- CHAT_USERS POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view their own profile
CREATE POLICY "Users can view own chat profile" ON chat_users
    FOR SELECT USING (auth_user_id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own chat profile" ON chat_users
    FOR UPDATE USING (auth_user_id = auth.uid());

-- Users can insert their own profile (for getOrCreateChatUser)
CREATE POLICY "Users can insert own chat profile" ON chat_users
    FOR INSERT WITH CHECK (auth_user_id = auth.uid());

-- Public read for online status display (limited columns)
CREATE POLICY "Public can view online users" ON chat_users
    FOR SELECT USING (status = 'online')
    WITH CHECK (false);

-- ────────────────────────────────────────────────────────────
-- CHANNELS POLICIES
-- ────────────────────────────────────────────────────────────
-- All authenticated users can view channels
CREATE POLICY "Authenticated users can view channels" ON channels
    FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can manage channels
CREATE POLICY "Admins can manage channels" ON channels
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM chat_users cu
            WHERE cu.auth_user_id = auth.uid()
            AND cu.role IN ('Mod', 'HOD', 'Admin')
        )
    );

-- ────────────────────────────────────────────────────────────
-- MESSAGES POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view messages in channels they have access to
CREATE POLICY "Users can view channel messages" ON messages
    FOR SELECT USING (
        auth.role() = 'authenticated'
        AND EXISTS (
            SELECT 1 FROM channels c WHERE c.id = messages.channel_id
        )
    );

-- Users can insert their own messages
CREATE POLICY "Users can insert own messages" ON messages
    FOR INSERT WITH CHECK (
        sender_id IN (
            SELECT id FROM chat_users WHERE auth_user_id = auth.uid()
        )
    );

-- Users can update their own messages
CREATE POLICY "Users can update own messages" ON messages
    FOR UPDATE USING (
        sender_id IN (
            SELECT id FROM chat_users WHERE auth_user_id = auth.uid()
        )
    );

-- Users can delete their own messages
CREATE POLICY "Users can delete own messages" ON messages
    FOR DELETE USING (
        sender_id IN (
            SELECT id FROM chat_users WHERE auth_user_id = auth.uid()
        )
    );

-- ────────────────────────────────────────────────────────────
-- REACTIONS POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view reactions on messages they can see
CREATE POLICY "Users can view reactions on accessible messages" ON reactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM messages m
            JOIN channels c ON c.id = m.channel_id
            WHERE m.id = reactions.message_id
            AND auth.role() = 'authenticated'
        )
    );

-- Users can add their own reactions
CREATE POLICY "Users can add own reactions" ON reactions
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT id FROM chat_users WHERE auth_user_id = auth.uid()
        )
    );

-- Users can remove their own reactions
CREATE POLICY "Users can remove own reactions" ON reactions
    FOR DELETE USING (
        user_id IN (
            SELECT id FROM chat_users WHERE auth_user_id = auth.uid()
        )
    );

-- ────────────────────────────────────────────────────────────
-- DATING_PROFILES POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view their own full profile
CREATE POLICY "Users can view own dating profile" ON dating_profiles
    FOR SELECT USING (auth_user_id = auth.uid());

-- Users can view other profiles (for discovery) - but not incognito
CREATE POLICY "Users can view public dating profiles" ON dating_profiles
    FOR SELECT USING (
        auth.role() = 'authenticated'
        AND is_incognito = false
        AND auth_user_id != auth.uid()
    );

-- Users can insert their own profile
CREATE POLICY "Users can insert own dating profile" ON dating_profiles
    FOR INSERT WITH CHECK (auth_user_id = auth.uid());

-- Users can update their own profile
CREATE POLICY "Users can update own dating profile" ON dating_profiles
    FOR UPDATE USING (auth_user_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- SWIPES POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view their own swipes
CREATE POLICY "Users can view own swipes" ON swipes
    FOR SELECT USING (
        swiper_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
    );

-- Users can insert their own swipes
CREATE POLICY "Users can insert own swipes" ON swipes
    FOR INSERT WITH CHECK (
        swiper_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
    );

-- Users can update their own swipes (for undo)
CREATE POLICY "Users can update own swipes" ON swipes
    FOR UPDATE USING (
        swiper_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
    );

-- Users can delete their own swipes (for undo)
CREATE POLICY "Users can delete own swipes" ON swipes
    FOR DELETE USING (
        swiper_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
    );

-- ────────────────────────────────────────────────────────────
-- MATCHES POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view matches they are part of
CREATE POLICY "Users can view own matches" ON matches
    FOR SELECT USING (
        user1_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
        OR user2_id IN (SELECT id FROM dating_profiles WHERE auth_user_id = auth.uid())
    );

-- System can insert matches (via trigger/function)
CREATE POLICY "System can insert matches" ON matches
    FOR INSERT WITH CHECK (true);

-- ────────────────────────────────────────────────────────────
-- MARKETPLACE_LISTINGS POLICIES
-- ────────────────────────────────────────────────────────────
-- All authenticated users can view active listings
CREATE POLICY "Authenticated users can view active listings" ON marketplace_listings
    FOR SELECT USING (
        auth.role() = 'authenticated'
        AND is_sold = false
    );

-- Users can view their own listings (including sold)
CREATE POLICY "Users can view own listings" ON marketplace_listings
    FOR SELECT USING (seller_auth_id = auth.uid());

-- Users can insert their own listings
CREATE POLICY "Users can insert own listings" ON marketplace_listings
    FOR INSERT WITH CHECK (seller_auth_id = auth.uid());

-- Users can update their own listings
CREATE POLICY "Users can update own listings" ON marketplace_listings
    FOR UPDATE USING (seller_auth_id = auth.uid());

-- Users can delete their own listings
CREATE POLICY "Users can delete own listings" ON marketplace_listings
    FOR DELETE USING (seller_auth_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- MARKETPLACE_SAVES POLICIES
-- ────────────────────────────────────────────────────────────
-- Users can view their own saves
CREATE POLICY "Users can view own saves" ON marketplace_saves
    FOR SELECT USING (saver_auth_id = auth.uid());

-- Users can insert their own saves
CREATE POLICY "Users can insert own saves" ON marketplace_saves
    FOR INSERT WITH CHECK (saver_auth_id = auth.uid());

-- Users can delete their own saves
CREATE POLICY "Users can delete own saves" ON marketplace_saves
    FOR DELETE USING (saver_auth_id = auth.uid());

-- ────────────────────────────────────────────────────────────
-- FIX ATTENDANCE TABLE RLS (currently allows public access)
-- ────────────────────────────────────────────────────────────
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public select on user_attendance" ON user_attendance;
DROP POLICY IF EXISTS "Allow public insert/update on user_attendance" ON user_attendance;

-- Users can only view their own attendance
CREATE POLICY "Users can view own attendance" ON user_attendance
    FOR SELECT USING (user_id = auth.uid());

-- Users can insert/update their own attendance
CREATE POLICY "Users can manage own attendance" ON user_attendance
    FOR ALL USING (user_id = auth.uid());