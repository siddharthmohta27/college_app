-- ============================================================
--  Campus Connect — Marketplace Schema
--  Run this in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS marketplace_listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    condition VARCHAR(30) NOT NULL DEFAULT 'Good',
    location VARCHAR(200),
    emoji VARCHAR(10) DEFAULT '📦',
    seller_auth_id TEXT NOT NULL,
    seller_name VARCHAR(100),
    seller_initials VARCHAR(5),
    seller_color VARCHAR(100) DEFAULT 'from-violet-400 to-purple-600',
    seller_email VARCHAR(200),
    is_sold BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_marketplace_seller ON marketplace_listings(seller_auth_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_category ON marketplace_listings(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_created ON marketplace_listings(created_at DESC);

CREATE TABLE IF NOT EXISTS marketplace_saves (
    id SERIAL PRIMARY KEY,
    listing_id INT REFERENCES marketplace_listings(id) ON DELETE CASCADE,
    saver_auth_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(listing_id, saver_auth_id)
);

CREATE INDEX IF NOT EXISTS idx_marketplace_saves_user ON marketplace_saves(saver_auth_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_saves_listing ON marketplace_saves(listing_id);
