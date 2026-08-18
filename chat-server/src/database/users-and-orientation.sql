-- ============================================================
--  Campus Connect — Users, OTP Verification & Orientation Schema
--  Run this in Supabase SQL Editor / PostgreSQL DB
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. USERS TABLE
-- ────────────────────────────────────────────────────────────
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'account_type_enum') THEN
        CREATE TYPE account_type_enum AS ENUM ('pec_verified', 'fresher_temp');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    auth_user_id TEXT UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(150),
    account_type account_type_enum DEFAULT 'pec_verified',
    email_verified BOOLEAN DEFAULT false,
    pec_email VARCHAR(255),
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- If users table already existed without these columns, alter them safely:
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'account_type') THEN
        ALTER TABLE users ADD COLUMN account_type account_type_enum DEFAULT 'pec_verified';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'email_verified') THEN
        ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'pec_email') THEN
        ALTER TABLE users ADD COLUMN pec_email VARCHAR(255);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'is_admin') THEN
        ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT false;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_pec_email ON users(pec_email);
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_users_account_type ON users(account_type);

-- ────────────────────────────────────────────────────────────
-- 2. EMAIL OTPS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS email_otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    otp_type VARCHAR(50) NOT NULL DEFAULT 'signup_verification', -- 'signup_verification', 'pec_link'
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT false,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_otps_lookup ON email_otps(email, otp_type, verified);

-- ────────────────────────────────────────────────────────────
-- 3. ORIENTATION CONTENT TABLE
-- ────────────────────────────────────────────────────────────
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'orientation_content_type') THEN
        CREATE TYPE orientation_content_type AS ENUM ('map', 'venue', 'schedule');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS orientation_content (
    id SERIAL PRIMARY KEY,
    type orientation_content_type NOT NULL,
    title VARCHAR(200),
    image_url TEXT,
    extracted_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orientation_content_type ON orientation_content(type);

-- ────────────────────────────────────────────────────────────
-- 4. ORIENTATION SCHEDULE ITEMS TABLE
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orientation_schedule_items (
    id SERIAL PRIMARY KEY,
    time_slot VARCHAR(100) NOT NULL,
    activity TEXT NOT NULL,
    venue VARCHAR(200) NOT NULL,
    coordinator VARCHAR(200),
    category VARCHAR(50) DEFAULT 'general',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orientation_schedule_order ON orientation_schedule_items(sort_order);

-- ────────────────────────────────────────────────────────────
-- SEED INITIAL ORIENTATION CONTENT IF EMPTY
-- ────────────────────────────────────────────────────────────
INSERT INTO orientation_content (type, title, image_url, extracted_text)
SELECT 'map', 'PEC Campus Map & Reporting Zones', '/orientation/pec-campus-map.png', 'Auditorium, New Academic Block (NAB), Library, Senate Hall, Student Center'
WHERE NOT EXISTS (SELECT 1 FROM orientation_content WHERE type = 'map');

INSERT INTO orientation_content (type, title, image_url, extracted_text)
SELECT 'venue', 'First Year Branch Reporting Venues', '/orientation/reporting-venues.png', 'Computer Science & Engineering: Auditorium; CSE (Data Science) & CSE (AI): NAB L-26; Electronics & Communication: NAB L-27; Electrical Engineering: NAB L-28; Mechanical: NAB L-29; Civil: NAB L-30; Aerospace & Materials & Production: NAB L-31'
WHERE NOT EXISTS (SELECT 1 FROM orientation_content WHERE type = 'venue');

INSERT INTO orientation_schedule_items (time_slot, activity, venue, coordinator, category, sort_order)
SELECT * FROM (VALUES
    ('8:30 AM – 9:30 AM', 'Attendance in respective rooms/venues (Annexure 1)', 'Respective Branch Venues (Auditorium / NAB L-26 to L-31)', 'Faculty Incharges & Student Branch Incharges', 'morning', 1),
    ('9:30 AM – 10:00 AM', 'Distribution of Welcome Kit', 'Auditorium', 'Prof. Amandeep Kaur, Prof. Shilpi Chaudhary, Prof. Nidhi Tanwar', 'morning', 2),
    ('10:00 AM – 10:05 AM', 'Welcoming the Batch of 2026/2030 & Welcoming Dignitaries', 'Auditorium', 'Student Anchors', 'inaugural', 3),
    ('10:05 AM – 10:10 AM', 'Inaugural & Traditional Lamp Lighting', 'Auditorium', 'Dignitaries & Deans', 'inaugural', 4),
    ('10:10 AM – 10:15 AM', 'Know Your Director Video / Presentation', 'Auditorium', 'Audio-Visual Team', 'inaugural', 5),
    ('10:15 AM – 10:35 AM', 'Address by Director, PEC', 'Auditorium', 'Director, Punjab Engineering College', 'inaugural', 6),
    ('10:35 AM – 10:55 AM', 'Address by Chief Guest', 'Auditorium', 'Chief Guest', 'inaugural', 7),
    ('10:55 AM – 11:15 AM', 'Address by Guest of Honour', 'Auditorium', 'Guest of Honour', 'inaugural', 8),
    ('11:15 AM – 11:30 AM', 'Vote of Thanks & National Anthem', 'Auditorium', 'Dean Student Affairs', 'inaugural', 9),
    ('11:30 AM – 12:30 PM', 'High Tea & Campus Interaction', 'Student Center Lawn', 'Organizing Committee', 'lunch', 10),
    ('12:30 PM – 1:30 PM', 'Academic System & Curriculum Overview', 'Auditorium', 'Dean Academic Affairs', 'afternoon', 11),
    ('1:30 PM – 2:30 PM', 'Hostel & Campus Life Briefing', 'Auditorium', 'Chief Warden & Student Council', 'afternoon', 12),
    ('2:30 PM – 4:30 PM', 'Guided Campus Tour & Department Visit', 'Various Campus Departments', 'Student Mentors & NCC Cadets', 'afternoon', 13)
) AS v(time_slot, activity, venue, coordinator, category, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM orientation_schedule_items LIMIT 1);
