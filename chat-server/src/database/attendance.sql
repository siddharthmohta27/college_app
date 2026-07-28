CREATE TABLE IF NOT EXISTS public.user_attendance (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  subject_code VARCHAR(100) NOT NULL,
  subject_name VARCHAR(255) NOT NULL,
  attended INT DEFAULT 0,
  absent INT DEFAULT 0,
  cancelled INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT user_subject_unique UNIQUE (user_id, subject_code)
);