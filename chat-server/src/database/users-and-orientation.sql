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

-- Clear and insert official 7-day orientation schedule (Days 1 to 7)
TRUNCATE TABLE orientation_schedule_items;

INSERT INTO orientation_schedule_items (day_number, time_slot, activity, venue, coordinator, category, sort_order) VALUES
-- DAY 1 (19th August 2026, Wednesday)
(1, '9:30 AM – 10:00 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 1)', 'Annexure 1 (Day 1) Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 1),
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
(1, '12:30 PM – 1:45 PM', 'Lunch', 'Annexure 2 Venues (Centenary Hall / Shivalik / KC Hostel)', 'Student Branch Incharges & Discipline Incharges', 'lunch', 12),
(1, '1:45 PM – 1:55 PM', 'Documentary', 'Auditorium', 'Prof. Shilpa', 'afternoon', 13),
(1, '1:55 PM – 2:00 PM', 'Introduction to Honorable Professor Rajeev Ahuja, Director, IIT Ropar', 'Auditorium', 'Prof. Shilpa', 'afternoon', 14),
(1, '2:00 PM – 3:00 PM', 'Address By Professor Rajeev Ahuja', 'Auditorium', 'Prof. Shilpa', 'afternoon', 15),
(1, '3:00 PM – 3:10 PM', 'Felicitation Ceremony', 'Auditorium', 'Prof. Shilpa', 'afternoon', 16),
(1, '3:10 PM – 3:15 PM', 'Vote of Thanks', 'Auditorium', 'Prof. Shilpa', 'afternoon', 17),
(1, '3:30 PM – 4:30 PM', 'Department Visit(s)', 'Annexure 3 Venues', 'Address by Respective HOD, Interaction With Faculty, Department Lab Visit(s)', 'afternoon', 18),
(1, '4:30 PM – 5:00 PM', 'SNACKS', 'Annexure 3', 'Organizing Committee', 'afternoon', 19),
(1, '5:00 PM – 5:30 PM', 'Institute Tour', 'Campus', 'Student Branch Incharges & Discipline Incharges', 'afternoon', 20),

-- DAY 2 (20th August 2026, Thursday)
(2, '8:45 AM – 9:15 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 2)', 'Annexure 1 (Day 2) Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 21),
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
(2, '11:45 AM – 12:15 PM', 'Club Presentations Slot 1: Group A (HEB in L-26), Group B (EEB in L-27), Group C (SAASC in L-28), Group D (ACM in L-29), Group E (PDC in Auditorium), Group F (WEC in Aero Audi), Group G (NCC in L-30), Group H (Robotics in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 32),
(2, '12:15 PM – 12:45 PM', 'Club Presentations Slot 2: Group A (SAE in L-26), Group B (ASCE in L-27), Group C (SME in L-28), Group D (CIM in L-29), Group E (EEB in Auditorium), Group F (ASME in Aero Audi), Group G (APC in L-30), Group H (SESI in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 33),
(2, '12:45 PM – 2:15 PM', 'Lunch', 'Annexure 3 Venues', 'Student Branch Incharges & Discipline Incharges', 'lunch', 34),
(2, '2:15 PM – 2:30 PM', 'Movement of Students', 'Respective Venues', 'Student Mentors', 'afternoon', 35),
(2, '2:30 PM – 3:00 PM', 'Club Presentations Slot 3: Group A (Rotaract in L-26), Group B (ELC in L-27), Group C (ASPS in L-28), Group D (ATS in L-29), Group E (IIM in Auditorium), Group F (IEEE in Aero Audi), Group G (NSS in L-30), Group H (IGS in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 36),
(2, '3:00 PM – 3:30 PM', 'Club Presentations Slot 4: Group A (ELC in L-26), Group B (ASPS in L-27), Group C (ATS in L-28), Group D (IIM in L-29), Group E (IEEE in Auditorium), Group F (NSS in Aero Audi), Group G (IGS in L-30), Group H (ES in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 37),
(2, '3:30 PM – 4:00 PM', 'Evening Snacks', 'Campus / Respective Venues', 'Organizing Committee', 'afternoon', 38),
(2, '4:00 PM – 4:15 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 39),
(2, '4:15 PM – 5:45 PM', 'Parallel Displays: Technical Display (T1 in Centenary Hall) | Sports (S1 in Athletic Ground) | Music (A3 in Auditorium)', 'Centenary Hall / Athletic Ground / Auditorium', 'Respective P/I’s of Club, Societies, Cells & Sports to coordinate and supervise.', 'afternoon', 40),

-- DAY 3 (21st August 2026, Friday)
(3, '8:30 AM – 9:15 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 3)', 'Annexure 1 (Day 3) Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 41),
(3, '9:15 AM – 9:30 AM', 'Address by Head, SCC', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 42),
(3, '9:30 AM – 9:45 AM', 'Address By Head, Alumni Relations', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 43),
(3, '9:45 AM – 10:00 AM', 'Address by Head, Library', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 44),
(3, '10:00 AM – 10:20 AM', 'Address by Head, CDGC', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 45),
(3, '10:20 AM – 11:20 AM', 'Speaker session 1', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 46),
(3, '11:20 AM – 12:20 PM', 'Speaker session 2', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 47),
(3, '12:20 PM – 12:30 PM', 'Felicitation and Vote of Thanks', 'Auditorium', 'Prof. Nidhi Tanwar, Prof. Shilpa', 'morning', 48),
(3, '12:30 PM – 12:45 PM', 'Movement of Students to Respective Hostels', 'Annexure 3', 'Student Branch Incharges & Discipline Incharges', 'lunch', 49),
(3, '12:45 PM – 2:15 PM', 'Lunch', 'Annexure 3 Venues', 'Student Branch Incharges & Discipline Incharges', 'lunch', 50),
(3, '2:15 PM – 2:30 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 51),
(3, '2:30 PM – 3:00 PM', 'Club Presentations Slot 5: Group A (Robotics in L-26), Group B (HEB in Aero Audi), Group C (EEB in L-27), Group D (SAASC in L-28), Group E (ACM in L-29), Group F (EIC in L-30), Group G (WEC in Auditorium), Group H (NCC in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 52),
(3, '3:00 PM – 3:30 PM', 'Club Presentations Slot 6: Group A (SCC in L-26), Group B (SAE in Aero Audi), Group C (PDC in L-27), Group D (SME in L-28), Group E (CIM in L-29), Group F (ASCE in L-30), Group G (Robotics in Auditorium), Group H (APC in L-31)', 'Respective Lecture Halls / Audi', 'Respective P/I’s of Club, Societies, Cells, NSS & NCC to coordinate and supervise.', 'afternoon', 53),
(3, '3:30 PM – 4:00 PM', 'Evening Snacks', 'Campus', 'Organizing Committee', 'afternoon', 54),
(3, '4:00 PM – 4:15 PM', 'Movement of Students to Respective Venues', 'Respective Venues', 'Student Mentors', 'afternoon', 55),
(3, '4:15 PM – 5:45 PM', 'Parallel Displays: Tech Display (T2 in Centenary Hall) | Sports (S2 in Athletic Ground) | Drams (A1 in Auditorium)', 'Centenary Hall / Athletic Ground / Auditorium', 'Respective P/I’s of Club, Societies, Cells & Sports to supervise.', 'afternoon', 56),

-- DAY 4 (22nd August 2026, Saturday)
(4, '9:00 AM – 9:30 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 4)', 'Annexure 1 (Day 4) Venues', 'Respective Faculty Incharges & Student Branch Incharges', 'morning', 57),
(4, '9:30 AM – 10:30 AM', 'Speaker Session', 'Auditorium', 'Faculty Coordinators', 'morning', 58),
(4, '10:30 AM – 11:00 AM', 'Club Slot 7: Group A (SME in L-31), Group B (CIM in L-26), Group C (IGS in Aero Audi), Group D (ES in L-27)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 59),
(4, '11:00 AM – 11:30 AM', 'Club Slot 8: Group A (ATS in L-31), Group B (IIM in L-26), Group C (APC in Aero Audi), Group D (SESI in L-27)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 60),
(4, '11:30 AM – 12:00 PM', 'Club Slot 9: Group A (EEB in L-31), Group B (IEEE in L-26), Group C (HEB in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 61),
(4, '10:30 AM – 12:00 PM', 'Cultural / PEB: Group A2 (PEB in Auditorium)', 'Auditorium', 'Cultural Committee', 'morning', 62),
(4, '12:00 PM – 12:15 PM', 'Movement of Students to Respective Hostels', 'Campus', 'Student Branch Incharges', 'lunch', 63),
(4, '12:15 PM – 1:45 PM', 'Lunch', 'Annexure 3 Venues', 'Student Branch Incharges & Discipline Incharges', 'lunch', 64),
(4, '1:45 PM – 2:00 PM', 'Movement of Students to Respective Venues', 'Campus', 'Student Mentors', 'afternoon', 65),
(4, '1:15 PM – 2:45 PM', 'Group A3 (Music in Auditorium)', 'Auditorium', 'Music Society', 'afternoon', 66),
(4, '2:45 PM – 4:15 PM', 'Group A3 (PEB in Auditorium)', 'Auditorium', 'Cultural Committee', 'afternoon', 67),
(4, '2:00 PM – 2:30 PM', 'Club Slot 10: Group A (IIM in L-31), Group B (SME in L-26), Group E (WEC in L-27), Group G (PDC in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 68),
(4, '2:30 PM – 3:00 PM', 'Club Slot 11: Group A (NSS in L-31), Group B (IGS in L-26), Group E (EIC in L-27), Group G (ASME in L-29)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 69),
(4, '3:00 PM – 3:30 PM', 'Club Slot 12: Group A (ASCE in L-31), Group B (ACM in L-26), Group E (NCC in L-27), Group G (HEB in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 70),
(4, '3:30 PM – 4:00 PM', 'Club Slot 13: Group A (ASPS in L-31), Group B (ATS in L-26), Group E (HEB in L-27), Group G (ELC in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 71),
(4, '4:00 PM – 4:30 PM', 'SNACKS', 'Respective Venues', 'Organizing Committee', 'afternoon', 72),
(4, '4:30 PM – 4:40 PM', 'Movement of Students to Respective Venues', 'Campus', 'Student Mentors', 'afternoon', 73),
(4, '4:40 PM – 6:00 PM', 'Parallel Evening Displays: Drams (A2 in Auditorium) | Technical Display (T4 in Centenary Hall) | Sports (S4 in Athletics Ground)', 'Auditorium / Centenary Hall / Athletics Ground', 'Respective P/I''s of Club, Societies, Cells & Sports', 'afternoon', 74),

-- DAY 5 (23rd August 2026, Sunday)
(5, '8:30 AM – 9:00 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 5)', 'Annexure 1 (Day 5) Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 75),
(5, '9:00 AM – 9:45 AM', 'Speaker Session', 'Auditorium', 'Faculty Coordinators', 'morning', 76),
(5, '9:45 AM – 11:15 AM', 'Cultural / Drams: Group A1 (Drams in Auditorium)', 'Auditorium', 'Dramatics Club', 'morning', 77),
(5, '9:45 AM – 10:15 AM', 'Club Slot 14: Group C (CIM in L-30), Group D (ASCE in L-31), Group E (APC in L-26), Group F (NCC in L-27), Group G (Rotaract in L-28), Group H (SAASC in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 78),
(5, '10:15 AM – 10:45 AM', 'Club Slot 15: Group C (ES in L-30), Group D (EIC in L-31), Group E (IGS in L-26), Group F (ELC in L-27), Group G (SCC in L-28), Group H (HEB in L-29)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 79),
(5, '10:45 AM – 11:15 AM', 'Club Slot 16: Group A (SAASC in Auditorium), Group B (WEC in L-29), Group C (IIM in L-30), Group D (ASME in L-31), Group E (EIC in L-26), Group F (HEB in L-27), Group H (ELC in Aero Audi)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 80),
(5, '11:15 AM – 11:45 AM', 'Club Slot 17: Group A (EIC in L-28), Group B (NSS in L-29), Group C (NCC in L-30), Group D (SAE in L-31)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 81),
(5, '11:45 AM – 12:15 PM', 'Club Slot 18: Group A (IEEE in L-28), Group B (ASME in L-29), Group D (NSS in L-31)', 'Respective Venues', 'P/Is of Club, Societies, Cells, NSS & NCC', 'morning', 82),
(5, '11:45 AM – 1:15 PM', 'Cultural / PEB: Group A2 (PEB in Auditorium)', 'Auditorium', 'Cultural Committee', 'morning', 83),

-- DAY 6 (24th August 2026, Monday)
(6, '9:00 AM – 9:30 AM', 'Attendance in respective rooms/Venue mentioned in Annexure 1 (Day 6)', 'Annexure 1 (Day 6) Venues', 'Respective Faculty Incharges & Student Branch Incharge', 'morning', 84),
(6, '9:30 AM – 10:30 AM', 'Speaker Session', 'Auditorium', 'Faculty Coordinators', 'morning', 85),
(6, '10:30 AM – 11:00 AM', 'Club Slot 19: Group A (ES in L-29), Group B (SCC in L-30), Group C (ACM in L-31), Group D (EEB in Auditorium), Group E (SAASC in Aero Audi), Group F (CIM in L-26), Group G (EIC in L-27), Group H (WEC in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'morning', 86),
(6, '11:00 AM – 11:30 AM', 'Club Slot 20: Group A (NCC in L-29), Group B (Robotics in L-30), Group C (SAE in L-31), Group D (PDC in Auditorium), Group E (SME in Aero Audi), Group F (ES in L-26), Group G (ASCE in L-27), Group H (ASME in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'morning', 87),
(6, '11:30 AM – 12:00 PM', 'Club Slot 21: Group A (APC in L-29), Group B (SESI in L-30), Group C (Rotaract in L-31), Group D (ELC in Auditorium), Group E (ASPS in Aero Audi), Group F (ATS in L-26), Group G (IIM in L-27), Group H (IEEE in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'morning', 88),
(6, '12:00 PM – 12:30 PM', 'Club Slot 22: Group C (ASCE in L-31), Group G (EEB in L-27), Group E (SCC in Aero Audi), Group F (PDC in L-26), Group H (ACM in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'morning', 89),
(6, '12:00 PM – 12:15 PM', 'Movement of Students to Respective Venues', 'Campus', 'Student Branch Incharge', 'lunch', 90),
(6, '12:45 PM – 2:15 PM', 'Lunch', 'Annexure 3 Venues', 'Student Branch Incharges & Discipline Incharges', 'lunch', 91),
(6, '2:15 PM – 2:30 PM', 'Movement of Students to Respective Venues', 'Campus', 'Student Mentors', 'afternoon', 92),
(6, '2:30 PM – 3:00 PM', 'Club Slot 23: Group A (IGS in L-29), Group B (ES in L-30), Group C (Robotics in L-31), Group D (HEB in Auditorium), Group E (ASCE in Aero Audi), Group F (SAASC in L-26), Group G (ACM in L-27), Group H (EIC in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 93),
(6, '3:00 PM – 3:30 PM', 'Club Slot 24: Group A (WEC in L-29), Group B (NCC in L-30), Group C (SCC in L-31), Group D (Robotics in Auditorium), Group E (ASME in Aero Audi), Group F (SME in L-26), Group G (CIM in L-27), Group H (ASCE in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 94),
(6, '3:30 PM – 4:00 PM', 'Club Slot 25: Group A (ASME in L-29), Group B (APC in L-30), Group C (SESI in L-31), Group D (Rotaract in Auditorium), Group E (ELC in Aero Audi), Group F (ASPS in L-26), Group G (ATS in L-27), Group H (IIM in L-28)', 'Respective Venues', 'P/Is of Club, Societies & Cells', 'afternoon', 95),
(6, '4:00 PM – 4:30 PM', 'Evening Snacks', 'Respective Venues', 'Organizing Committee', 'afternoon', 96),
(6, '4:30 PM – 4:40 PM', 'Movement of Students to Respective Venues', 'Campus', 'Student Mentors', 'afternoon', 97),
(6, '4:40 PM – 6:00 PM', 'Parallel Evening Displays: Technical Display (T3 in Centenary Hall) | Sports (S3 in Athletics Ground) | Music (A2 in Auditorium)', 'Centenary Hall / Athletics Ground / Auditorium', 'Respective P/I''s of Club, Societies, Cells & Sports', 'afternoon', 98),

-- DAY 7 (25th August 2026, Tuesday)
(7, '8:30 AM – 9:00 AM', 'Attendance in respective rooms/venue mentioned in Annexure 1 (Day 7)', 'Annexure 1 (Day 7)', 'Respective Faculty Incharges & Student Branch Inchargess', 'morning', 99),
(7, '9:15 AM – 9:45 AM', 'Group A (PDC in Auditorium), Group B (PDC in Auditorium), Group C (IEEE in Aero Auditorium), Group D (ASPS in L-30), Group F (IGS in L-26), Group G (SME in L-29), Group H (SAASC in L-27)', 'Auditorium / Aero Audi / L-30 / L-26 / L-29 / L-27', 'Respective Faculty Incharges & Student Branch Incharges', 'morning', 100),
(7, '9:45 AM – 10:15 AM', 'Group A (ATS in Auditorium), Group B (ATS in Auditorium), Group C (EIC in Aero Auditorium), Group D (IGS in L-30), Group E (ELC in L-31), Group F (SCC in L-26), Group G (SAASC in L-29), Group H (EEB in L-27)', 'Auditorium / Aero Audi / L-30 / L-31 / L-26 / L-29 / L-27', 'Respective Faculty Incharges & Student Branch Incharges', 'morning', 101),
(7, '10:15 AM – 10:45 AM', 'Group A (SAASC in Auditorium), Group B (SAASC in Auditorium), Group C (IGS in Aero Audi), Group D (ASCE in L-30), Group E (Rotaract in L-31), Group F (NCC in L-26), Group G (ASPS in L-29), Group H (SAE in L-27)', 'Auditorium / Aero Audi / L-30 / L-31 / L-26 / L-29 / L-27', 'Respective Faculty Incharges & Student Branch Incharges', 'morning', 102),
(7, '10:45 AM – 11:15 AM', 'Group A (CIM in Auditorium), Group B (CIM in Auditorium), Group C (APC in Aero Audi), Group D (SAE in L-30), Group E (ES in L-31), Group F (HEB in L-26), Group G (SCC in L-29), Group H (ELC in L-27)', 'Auditorium / Aero Audi / L-30 / L-31 / L-26 / L-29 / L-27', 'Respective Faculty Incharges & Student Branch Incharges', 'morning', 103),
(7, '11:30 AM – 12:30 PM', 'Speaker session', 'Auditorium', 'Organizing Committee', 'morning', 104),
(7, '12:30 PM – 12:45 PM', 'Movement of Students to Respective Hostels', 'Campus', 'Student Mentors & Discipline Incharges', 'lunch', 105),
(7, '12:45 PM – 2:00 PM', 'Lunch', 'Annexure 3', 'Student Branch Incharges & Discipline Incharges', 'lunch', 106),
(7, '2:00 PM – 2:45 PM', 'Orientation Quiz & CR Elections', 'Respective Rooms / Venues', 'Faculty & Student Branch Incharges', 'afternoon', 107),
(7, '2:45 PM – 3:15 PM', 'Group A (EEB in L-30), Group B (IEEE in L-28), Group C (WEC in Aero Audi), Group D (SESI in Auditorium), Group E (SAE in L-31), Group F (ACM in L-26), Group G (Rotaract in L-29), Group H (ATS in L-27)', 'L-30 / L-28 / Aero Audi / Auditorium / L-31 / L-26 / L-29 / L-27', 'Respective P/I''s of Club, Societies, Cells, NSS & NCC', 'afternoon', 108),
(7, '3:15 PM – 3:45 PM', 'Group A (SESI in L-30), Group B (Rotaract in L-28), Group C (ASME in Aero Audi), Group D (EIC in Auditorium), Group F (IIM in L-26), Group H (NSS in L-27)', 'L-30 / L-28 / Aero Audi / Auditorium / L-26 / L-27', 'Respective P/I''s of Club, Societies, Cells, NSS & NCC', 'afternoon', 109),
(7, '3:45 PM – 4:15 PM', 'Group A (SME in L-30), Group B (NCC in L-28), Group C (ES in Aero Audi), Group D (SCC in Auditorium), Group F (APC in L-26), Group H (PDC in L-27)', 'L-30 / L-28 / Aero Audi / Auditorium / L-26 / L-27', 'Respective P/I''s of Club, Societies, Cells, NSS & NCC', 'afternoon', 110),
(7, '4:15 PM – 4:45 PM', 'Group C (HEB in L-29)', 'Lecture Hall L-29', 'Respective P/I''s of Club & Societies', 'afternoon', 111),
(7, '4:15 PM – 4:30 PM', 'Movement of students', 'Campus', 'Student Branch Incharges & Discipline Incharges', 'afternoon', 112),
(7, '4:30 PM onwards', 'Grand FUN Event 🎉', 'Auditorium / Campus', 'Student Branch Incharges & Cultural Committee', 'afternoon', 113);
