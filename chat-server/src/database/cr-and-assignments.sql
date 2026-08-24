-- ============================================================
-- Campus Connect: CR Subgroup Roles, Timetable Overrides & Section Assignments
-- ============================================================

-- 1. CR Assignments Table
CREATE TABLE IF NOT EXISTS cr_assignments (
    id SERIAL PRIMARY KEY,
    auth_user_id TEXT NOT NULL,
    college_email TEXT,
    student_name VARCHAR(120),
    section VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, auth_user_id)
);

CREATE INDEX IF NOT EXISTS idx_cr_section ON cr_assignments(section);
CREATE INDEX IF NOT EXISTS idx_cr_auth_user ON cr_assignments(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_cr_email ON cr_assignments(college_email);

-- 2. Timetable Overrides Table
CREATE TABLE IF NOT EXISTS timetable_overrides (
    id SERIAL PRIMARY KEY,
    section VARCHAR(32) NOT NULL,
    override_date DATE NOT NULL,
    day_of_week VARCHAR(8) NOT NULL,
    start_time VARCHAR(8) NOT NULL,
    end_time VARCHAR(8) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'cancelled', -- 'cancelled', 'room_change', 'extra_class', 'rescheduled'
    subject VARCHAR(120),
    code VARCHAR(32),
    faculty VARCHAR(120),
    original_room VARCHAR(64),
    updated_room VARCHAR(64),
    reason TEXT,
    created_by_auth_id TEXT NOT NULL,
    created_by_name VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tt_overrides_section_date ON timetable_overrides(section, override_date);

-- 3. Section Assignments Table
CREATE TABLE IF NOT EXISTS section_assignments (
    id SERIAL PRIMARY KEY,
    section VARCHAR(32) NOT NULL,
    subject VARCHAR(120) NOT NULL,
    subject_code VARCHAR(32),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    submission_format VARCHAR(100) NOT NULL DEFAULT 'PDF on Google Classroom',
    material_url TEXT,
    max_marks INT,
    created_by_auth_id TEXT NOT NULL,
    created_by_name VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assignments_section ON section_assignments(section);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON section_assignments(due_date);

-- 4. Student Assignment Progress (Personal 'Mark as Done' Tracker)
CREATE TABLE IF NOT EXISTS student_assignment_progress (
    id SERIAL PRIMARY KEY,
    assignment_id INT REFERENCES section_assignments(id) ON DELETE CASCADE,
    auth_user_id TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(assignment_id, auth_user_id)
);

CREATE INDEX IF NOT EXISTS idx_student_asg_progress ON student_assignment_progress(assignment_id, auth_user_id);
