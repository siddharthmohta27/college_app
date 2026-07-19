export interface DatingProfile {
  id: number;
  auth_user_id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  college_email?: string;
  age: number;
  year?: string;
  major?: string;
  bio?: string;
  interests: string[];
  emoji?: string;
  verified: boolean;
  profile_photo_url?: string;
  gender?: string;
  pronouns?: string;
  relationship_preference: string[];
  branch?: string;
  hostel?: string;
  languages: string[];
  clubs: string[];
  societies: string[];
  skills: string[];
  favorite_cafe?: string;
  favorite_sport?: string;
  instagram_url?: string;
  linkedin_url?: string;
  github_url?: string;
  study_subjects: string[];
  study_cgpa_goal?: string;
  study_preferred_time?: string;
  study_preferred_location?: string;
  startup_looking_for: boolean;
  startup_role?: string;
  startup_skills: string[];
  is_incognito: boolean;
  show_only: string;
  is_verified: boolean;
  photo_verified: boolean;
  created_at: string;
  updated_at: string;
  photos?: ProfilePhoto[];
  prompts?: ProfilePrompt[];
  badges?: ProfileBadge[];
  main_photo_url?: string;
  already_swiped?: boolean;
  score?: number;
  reasons?: CompatibilityReason[];
}

export interface ProfilePhoto {
  id: number;
  profile_id: number;
  url: string;
  storage_path: string;
  is_main: boolean;
  display_order: number;
  width?: number;
  height?: number;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

export interface Prompt {
  id: number;
  text: string;
  category: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface ProfilePrompt {
  id: number;
  profile_id: number;
  prompt_id: number;
  answer: string;
  display_order: number;
  created_at: string;
  prompt_text?: string;
  prompt_category?: string;
}

export interface PromptLike {
  id: number;
  liker_profile_id: number;
  target_profile_id: number;
  prompt_id: number;
  created_at: string;
  prompt_text?: string;
  prompt_category?: string;
  liker_name?: string;
}

export interface PhotoLike {
  id: number;
  liker_profile_id: number;
  target_profile_id: number;
  photo_id: number;
  created_at: string;
  photo_url?: string;
  liker_name?: string;
}

export interface FriendRequest {
  id: number;
  sender_profile_id: number;
  receiver_profile_id: number;
  status: "pending" | "accepted" | "rejected" | "blocked";
  created_at: string;
  updated_at: string;
  sender_name?: string;
  sender_photo?: string;
  sender_emoji?: string;
  receiver_name?: string;
  receiver_photo?: string;
  receiver_emoji?: string;
}

export interface Friend {
  id: number;
  profile1_id: number;
  profile2_id: number;
  created_at: string;
  friend_id: number;
  friend_name: string;
  friend_photo?: string;
  friend_emoji?: string;
  branch?: string;
  year?: string;
  major?: string;
}

export interface Block {
  id: number;
  blocker_profile_id: number;
  blocked_profile_id: number;
  reason?: string;
  created_at: string;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
}

export interface Report {
  id: number;
  reporter_profile_id: number;
  reported_profile_id: number;
  reason: string;
  description?: string;
  status: "pending" | "reviewed" | "dismissed" | "action_taken";
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
  reporter_name?: string;
  reporter_email?: string;
  reported_name?: string;
  reported_photo?: string;
}

export interface Notification {
  id: number;
  profile_id: number;
  type: string;
  title: string;
  body?: string;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface CompatibilityScore {
  id: number;
  profile1_id: number;
  profile2_id: number;
  score: number;
  reasons: CompatibilityReason[];
  calculated_at: string;
  other_id?: number;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
  branch?: string;
  year?: string;
  major?: string;
}

export interface CompatibilityReason {
  type: string;
  label: string;
  weight: number;
  detail?: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  event_type: string;
  start_time: string;
  end_time?: string;
  location?: string;
  organizer?: string;
  max_attendees?: number;
  image_url?: string;
  registration_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRsvp {
  id: number;
  event_id: number;
  profile_id: number;
  status: "going" | "interested" | "not_going";
  created_at: string;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
  branch?: string;
  year?: string;
  title?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  event_type?: string;
}

export interface SavedProfile {
  id: number;
  saver_profile_id: number;
  saved_profile_id: number;
  created_at: string;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
  branch?: string;
  year?: string;
  major?: string;
}

export interface DailyPick {
  id: number;
  profile_id: number;
  pick_date: string;
  rank: number;
  created_at: string;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
  branch?: string;
  year?: string;
  major?: string;
}

export interface ConversationStarter {
  id: number;
  match_id: number;
  starter_text: string;
  context: Record<string, unknown>;
  created_at: string;
}

export interface ProfileBadge {
  id: number;
  profile_id: number;
  badge_type: string;
  badge_data: Record<string, unknown>;
  awarded_at: string;
}

export interface CampusGraphEdge {
  id: number;
  source_profile_id: number;
  target_profile_id: number;
  edge_type: string;
  weight: number;
  metadata: Record<string, unknown>;
  created_at: string;
  name?: string;
  profile_photo_url?: string;
  emoji?: string;
  branch?: string;
  year?: string;
}

export interface ChatRedirectInfo {
  currentChatUserId: number;
  targetChatUserId: number | null;
  targetAuthUserId: string;
  conversationId: string | null;
}

export interface Match {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
  matched_at?: string;
  name?: string;
  major?: string;
  emoji?: string;
  year?: string;
  profile_photo_url?: string;
}

export interface AdminStats {
  totalProfiles: number;
  totalMatches: number;
  pendingFriendRequests: number;
  pendingReports: number;
  onlineUsers: number;
  newUsers24h: number;
  verifiedUsers: number;
}

export interface AdminUser {
  id: number;
  name: string;
  college_email: string;
  branch?: string;
  year?: string;
  is_verified: boolean;
  is_incognito: boolean;
  created_at: string;
  chat_status?: string;
  last_seen?: string;
}