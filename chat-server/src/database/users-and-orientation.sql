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

ALTER TABLE IF EXISTS orientation_schedule_items ADD COLUMN IF NOT EXISTS day_number INT DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_orientation_schedule_day ON orientation_schedule_items(day_number, sort_order);

-- ────────────────────────────────────────────────────────────
-- SEED INITIAL ORIENTATION CONTENT IF EMPTY
-- ────────────────────────────────────────────────────────────
INSERT INTO orientation_content (type, title, image_url, extracted_text)
SELECT 'map', 'PEC Campus Map & Reporting Zones', '/orientation/pec-campus-map.png', 'Auditorium, New Academic Block (NAB), Library, Senate Hall, Student Center'
WHERE NOT EXISTS (SELECT 1 FROM orientation_content WHERE type = 'map');

INSERT INTO orientation_content (type, title, image_url, extracted_text)
SELECT 'venue', 'First Year Branch Reporting Venues', '/orientation/reporting-venues.png', 'Computer Science & Engineering: Auditorium; CSE (Data Science) & CSE (AI): NAB L-26; Electronics & Communication: NAB L-27; Electrical Engineering: NAB L-28; Mechanical: NAB L-29; Civil: NAB L-30; Aerospace & Materials & Production: NAB L-31'
WHERE NOT EXISTS (SELECT 1 FROM orientation_content WHERE type = 'venue');

-- Clear and insert official 3-day orientation schedule (Days 1, 2, 3)
TRUNCATE TABLE orientation_schedule_items;

INSERT INTO orientation_schedule_items (day_number, time_slot, activity, venue, coordinator, category, sort_order) VALUES
-- DAY 1 (19th August 2026, Wednesday)
(1, '9:30 AM – 10:00 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 1)', 'Annexure 1 (Day 1) Reporting Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 1),
(1, '10:00 AM – 10:30 AM', 'Distribution of Welcome kit', 'Auditorium', 'Prof. Amandeep Kaur', 'morning', 2),
(1, '10:30 AM – 10:35 AM', 'Welcoming the Batch of 2030 & Welcoming Dignitaries', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 3),
(1, '10:35 AM – 10:40 AM', 'Inaugural & Lamp Lighting', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 4),
(1, '10:40 AM – 10:45 AM', 'Know Your Director', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 5),
(1, '10:45 AM – 11:05 AM', 'Address By Director', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 6),
(1, '11:05 AM – 11:15 AM', 'Introduction to Heads, Deans, Registrar', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 7),
(1, '11:15 AM – 11:35 AM', 'Address By DAA', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 8),
(1, '11:35 AM – 11:50 AM', 'Address By DSA', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 9),
(1, '11:50 AM – 12:05 PM', 'Address By Head, Computer Centre', 'Auditorium', 'Prof. Amandeep Kaur', 'inaugural', 10),
(1, '12:05 PM – 12:30 PM', 'Dispersal Of Students to Resp. Hostels', 'Auditorium', 'Prof. Amandeep Kaur', 'lunch', 11),
(1, '12:30 PM – 1:45 PM', 'Lunch', 'Annexure 2', 'Student Branch Incharges & Discipline Incharges', 'lunch', 12),
(1, '1:45 PM – 1:55 PM', 'Documentary', 'Auditorium', 'Prof. Shilpa', 'afternoon', 13),
(1, '1:55 PM – 2:00 PM', 'Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar', 'Auditorium', 'Prof. Shilpa', 'afternoon', 14),
(1, '2:00 PM – 3:00 PM', 'Address By Professor Rajeev Ahuja', 'Auditorium', 'Prof. Shilpa', 'afternoon', 15),
(1, '3:00 PM – 3:10 PM', 'Felicitation Ceremony', 'Auditorium', 'Prof. Shilpa', 'afternoon', 16),
(1, '3:10 PM – 3:15 PM', 'Vote of Thanks', 'Auditorium', 'Prof. Shilpa', 'afternoon', 17),
(1, '3:30 PM – 4:30 PM', 'Department Visit(s)', 'Annexure 3', 'Address by Respective HOD, Interaction With Faculty, Department Lab Visit(s)', 'afternoon', 18),
(1, '4:30 PM – 5:00 PM', 'SNACKS', 'Annexure 3', 'Organizing Committee', 'afternoon', 19),
(1, '5:00 PM – 5:30 PM', 'Institute Tour', 'Campus', 'Student Branch Incharges & Discipline Incharges', 'afternoon', 20),

-- DAY 2 (20th August 2026, Thursday)
(2, '8:45 AM – 9:15 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)', 'Annexure 1 (Day 2)', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 21),
(2, '9:15 AM – 9:25 AM', 'Address by Head, Physics', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 22),
(2, '9:25 AM – 9:35 AM', 'Address by Head, Chemistry', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 23),
(2, '9:35 AM – 9:45 AM', 'Address by Head, Mathematics', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 24),
(2, '9:45 AM – 9:55 AM', 'Address by Head, CMH', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 25),
(2, '9:55 AM – 10:40 AM', 'Speaker Session', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 26),
(2, '10:40 AM – 10:55 AM', 'Address by ADSA, Cultural', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 27),
(2, '10:55 AM – 11:10 AM', 'Address by ADSA, Technical', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 28),
(2, '11:10 AM – 11:30 AM', 'Address by ADSA Hostels - Anti ragging session', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 29),
(2, '11:30 AM – 11:40 AM', 'Introduction to P/Is Clubs, Technical Societies, Cells & Wardens', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 30),
(2, '11:40 AM – 11:45 AM', 'Vote of Thanks', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Amandeep Kaur', 'morning', 31),
(2, '11:45 AM – 12:15 PM', 'Group Presentations Slot 1: Group A (HEB - L-26), Group B (EEB - L-27), Group C (SAASC - L-28), Group D (ACM - L-29), Group E (PDC - Auditorium), Group F (WEC - Aero Audi), Group G (NCC - L-30), Group H (Robotics - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 32),
(2, '12:15 PM – 12:45 PM', 'Group Presentations Slot 2: Group A (SAE - L-26), Group B (ASCE - L-27), Group C (SME - L-28), Group D (CIM - L-29), Group E (EEB - Auditorium), Group F (ASME - Aero Audi), Group G (APC - L-30), Group H (SESI - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 33),
(2, '12:45 PM – 2:15 PM', 'Lunch', 'Annexure 3', 'Student Branch Incharges & Discipline Incharges', 'lunch', 34),
(2, '2:15 PM – 2:30 PM', 'Movement of Students', 'Respective Venues', 'Student Mentors', 'afternoon', 35),
(2, '2:30 PM – 3:00 PM', 'Group Presentations Slot 3: Group A (Rotaract - L-26), Group B (ELC - L-27), Group C (ASPS - L-28), Group D (ATS - L-29), Group E (IIM - Auditorium), Group F (IEEE - Aero Audi), Group G (NSS - L-30), Group H (IGS - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 36),
(2, '3:00 PM – 3:30 PM', 'Group Presentations Slot 4: Group A (ELC - L-26), Group B (ASPS - L-27), Group C (ATS - L-28), Group D (IIM - L-29), Group E (IEEE - Auditorium), Group F (NSS - Aero Audi), Group G (IGS - L-30), Group H (ES - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 37),
(2, '3:30 PM – 4:00 PM', 'Evening Snacks', 'Campus / Respective Venues', 'Organizing Committee', 'afternoon', 38),
(2, '4:00 PM – 4:15 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 39),
(2, '4:15 PM – 5:45 PM', 'Parallel Displays: Technical Display (T1 in Centenary Hall) | Sports (S1 in Athletic Ground) | Music (A3 in Auditorium)', 'Centenary Hall / Athletic Ground / Auditorium', 'Respective P/I’s of Club, Societies, Cells & Sports to coordinate and supervise.', 'afternoon', 40),

-- DAY 3 (21st August 2026, Friday)
(3, '8:30 AM – 9:15 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)', 'Annexure 1 (Day 3)', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 41),
(3, '9:15 AM – 9:30 AM', 'Address by Head, SCC', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 42),
(3, '9:30 AM – 9:45 AM', 'Address By Head, Alumni Relations', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 43),
(3, '9:45 AM – 10:00 AM', 'Address by Head, Library', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 44),
(3, '10:00 AM – 10:20 AM', 'Address by Head, CDGC', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 45),
(3, '10:20 AM – 11:20 AM', 'Speaker session', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 46),
(3, '11:20 AM – 12:20 PM', 'Speaker session', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 47),
(3, '12:20 PM – 12:30 PM', 'Felicitation and Vote of Thanks', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 48),
(3, '12:30 PM – 12:45 PM', 'Movement of Students to Respective Hostels', 'Annexure 3', 'Student Branch Incharges & Discipline Incharges', 'lunch', 49),
(3, '12:45 PM – 2:15 PM', 'Lunch', 'Annexure 3', 'Student Branch Incharges & Discipline Incharges', 'lunch', 50),
(3, '2:15 PM – 2:30 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 51),
(3, '2:30 PM – 3:00 PM', 'Group Presentations Slot 5: Group A (Robotics - L-26), Group B (HEB - Aero Audi), Group C (EEB - L-27), Group D (SAASC - L-28), Group E (ACM - L-29), Group F (EIC - L-30), Group G (WEC - Auditorium), Group H (NCC - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 52),
(3, '3:00 PM – 3:30 PM', 'Group Presentations Slot 6: Group A (SCC - L-26), Group B (SAE - Aero Audi), Group C (PDC - L-27), Group D (SME - L-28), Group E (CIM - L-29), Group F (ASCE - L-30), Group G (Robotics - Auditorium), Group H (APC - L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 53),
(3, '3:30 PM – 4:00 PM', 'Evening Snacks', 'Campus', 'Organizing Committee', 'afternoon', 54),
(3, '4:00 PM – 4:15 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 55),
(3, '4:15 PM – 5:45 PM', 'Parallel Displays: Tech Display (T2 in Centenary Hall) | Sports (S2 in Athletic Ground) | Drams (A1 in Auditorium)', 'Centenary Hall / Athletic Ground / Auditorium', 'Respective P/I’s of Club, Societies, Cells & Sports to supervise.', 'afternoon', 56);

-- NOTE: Other days timetable will be added after official confirmation.
