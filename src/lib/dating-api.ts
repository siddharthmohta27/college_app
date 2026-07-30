// Campus Match V3 API Client
// TanStack Query compatible API functions

import { firebaseAuth } from "@/lib/firebase";

const isLocal =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const API_BASE = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api/dating`
  : isLocal
    ? "http://localhost:3001/api/dating"
    : "/api/dating";

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await firebaseAuth.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────

export interface DatingProfile {
  id: number;
  auth_user_id: string;
  name: string;
  first_name?: string;
  last_name?: string;
  age: number;
  year?: string;
  major?: string;
  bio?: string;
  interests: string[];
  emoji: string;
  verified: boolean;
  college_email?: string;
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

export interface ProfileBadge {
  id: number;
  profile_id: number;
  badge_type: string;
  badge_data: Record<string, unknown>;
  awarded_at: string;
}

export interface PromptLike {
  id: number;
  liker_profile_id: number;
  target_profile_id: number;
  prompt_id: number;
  created_at: string;
  liker_name?: string;
  prompt_text?: string;
  prompt_category?: string;
}

export interface PhotoLike {
  id: number;
  liker_profile_id: number;
  target_profile_id: number;
  photo_id: number;
  created_at: string;
  liker_name?: string;
  photo_url?: string;
}

export interface FriendRequest {
  id: number;
  sender_profile_id: number;
  receiver_profile_id: number;
  status: "pending" | "accepted" | "rejected" | "blocked";
  created_at: string;
  updated_at: string;
  sender_name?: string;
  sender_photo_url?: string;
  sender_emoji?: string;
}

export interface Friend {
  id: number;
  profile1_id: number;
  profile2_id: number;
  created_at: string;
  friend_id: number;
  friend_name: string;
  friend_photo_url?: string;
  friend_emoji?: string;
  friend_branch?: string;
  friend_year?: string;
  friend_major?: string;
}

export interface Match {
  id: number;
  user1_id: number;
  user2_id: number;
  matched_at: string;
  name: string;
  major?: string;
  emoji: string;
  year?: string;
  profile_photo_url?: string;
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
  reasons: Array<{ type: string; label: string; weight: number }>;
  calculated_at: string;
  other_id: number;
  other_name: string;
  other_photo_url?: string;
  other_emoji?: string;
  other_branch?: string;
  other_year?: string;
  other_major?: string;
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
  rsvp_count?: number;
  user_rsvp_status?: string;
}

export interface ConversationStarter {
  id: number;
  match_id: number;
  starter_text: string;
  context: Record<string, unknown>;
  created_at: string;
}

export interface ChatRedirectInfo {
  currentChatUserId: number;
  targetChatUserId: number | null;
  targetAuthUserId: string;
  conversationId: string | null;
}

export interface SavedProfile {
  id: number;
  saver_profile_id: number;
  saved_profile_id: number;
  created_at: string;
  name: string;
  profile_photo_url?: string;
  emoji: string;
  branch?: string;
  year?: string;
  major?: string;
}

export interface DailyPick {
  id: number;
  profile_id: number;
  pick_date: string;
  rank: number;
  name: string;
  profile_photo_url?: string;
  emoji: string;
  branch?: string;
  year?: string;
  major?: string;
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
  college_email?: string;
  branch?: string;
  year?: string;
  is_verified: boolean;
  is_incognito: boolean;
  created_at: string;
  chat_status?: string;
  last_seen?: string;
}

export interface Report {
  id: number;
  reporter_profile_id: number;
  reported_profile_id: number;
  reason: string;
  description?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  resolved_at?: string;
  reporter_name?: string;
  reporter_email?: string;
  reported_name?: string;
  reported_photo_url?: string;
}

// ──────────────────────────────────────────────────────────────
// Profile API
// ──────────────────────────────────────────────────────────────

export const profileApi = {
  getMe: (): Promise<{ profile: DatingProfile }> => fetchApi("/profile/me"),

  updateMe: (data: Partial<DatingProfile>): Promise<{ profile: DatingProfile }> =>
    fetchApi("/profile/me", { method: "PUT", body: JSON.stringify(data) }),

  getById: (id: string): Promise<{ profile: DatingProfile }> => fetchApi(`/profile/${id}`),
};

// ──────────────────────────────────────────────────────────────
// Photos API
// ──────────────────────────────────────────────────────────────

export const photosApi = {
  getMine: (): Promise<{ photos: ProfilePhoto[] }> => fetchApi("/photos"),

  upload: (data: {
    url: string;
    storage_path: string;
    is_main?: boolean;
    width?: number;
    height?: number;
    file_size?: number;
    mime_type?: string;
  }): Promise<{ photo: ProfilePhoto }> =>
    fetchApi("/photos", { method: "POST", body: JSON.stringify(data) }),

  update: (
    id: string,
    data: { is_main?: boolean; display_order?: number },
  ): Promise<{ photo: ProfilePhoto }> =>
    fetchApi(`/photos/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: string): Promise<{ success: boolean }> =>
    fetchApi(`/photos/${id}`, { method: "DELETE" }),

  reorder: (
    photoOrders: Array<{ id: number; display_order: number }>,
  ): Promise<{ photos: ProfilePhoto[] }> =>
    fetchApi("/photos/reorder", { method: "PUT", body: JSON.stringify({ photoOrders }) }),
};

// ──────────────────────────────────────────────────────────────
// Prompts API
// ──────────────────────────────────────────────────────────────

export const promptsApi = {
  getAll: (): Promise<{ prompts: Prompt[] }> => fetchApi("/prompts"),

  getMine: (): Promise<{ prompts: ProfilePrompt[] }> => fetchApi("/prompts/me"),

  upsert: (data: {
    prompt_id: number;
    answer: string;
    display_order?: number;
  }): Promise<{ prompt: ProfilePrompt }> =>
    fetchApi("/prompts/me", { method: "POST", body: JSON.stringify(data) }),

  delete: (promptId: string): Promise<{ success: boolean }> =>
    fetchApi(`/prompts/me/${promptId}`, { method: "DELETE" }),
};

// ──────────────────────────────────────────────────────────────
// Prompt Likes API
// ──────────────────────────────────────────────────────────────

export const promptLikesApi = {
  like: (promptId: string, targetProfileId: number): Promise<{ like: PromptLike }> =>
    fetchApi(`/prompts/${promptId}/like`, {
      method: "POST",
      body: JSON.stringify({ targetProfileId }),
    }),

  unlike: (promptId: string, targetProfileId: number): Promise<{ success: boolean }> =>
    fetchApi(`/prompts/${promptId}/like`, {
      method: "DELETE",
      body: JSON.stringify({ targetProfileId }),
    }),

  getForProfile: (targetProfileId: number): Promise<{ likes: PromptLike[] }> =>
    fetchApi(`/prompts/likes/${targetProfileId}`),
};

// ──────────────────────────────────────────────────────────────
// Photo Likes API
// ──────────────────────────────────────────────────────────────

export const photoLikesApi = {
  like: (photoId: string, targetProfileId: number): Promise<{ like: PhotoLike }> =>
    fetchApi(`/photos/${photoId}/like`, {
      method: "POST",
      body: JSON.stringify({ targetProfileId }),
    }),

  unlike: (photoId: string, targetProfileId: number): Promise<{ success: boolean }> =>
    fetchApi(`/photos/${photoId}/like`, {
      method: "DELETE",
      body: JSON.stringify({ targetProfileId }),
    }),

  getForProfile: (targetProfileId: number): Promise<{ likes: PhotoLike[] }> =>
    fetchApi(`/photos/likes/${targetProfileId}`),
};

// ──────────────────────────────────────────────────────────────
// Friends API
// ──────────────────────────────────────────────────────────────

export const friendsApi = {
  sendRequest: (receiverProfileId: number): Promise<{ request: FriendRequest }> =>
    fetchApi("/friends/request", {
      method: "POST",
      body: JSON.stringify({ receiverProfileId }),
    }),

  respond: (
    requestId: string,
    action: "accept" | "reject",
  ): Promise<{ success: boolean; action: string }> =>
    fetchApi(`/friends/request/${requestId}`, {
      method: "PUT",
      body: JSON.stringify({ action }),
    }),

  getRequests: (): Promise<{ requests: FriendRequest[] }> => fetchApi("/friends/requests"),

  getSentRequests: (): Promise<{ requests: FriendRequest[] }> => fetchApi("/friends/requests/sent"),

  getFriends: (): Promise<{ friends: Friend[] }> => fetchApi("/friends"),

  remove: (friendId: string): Promise<{ success: boolean }> =>
    fetchApi(`/friends/${friendId}`, { method: "DELETE" }),
};

// ──────────────────────────────────────────────────────────────
// Blocks API
// ──────────────────────────────────────────────────────────────

export const blocksApi = {
  block: (blockedProfileId: number, reason?: string): Promise<{ block: unknown }> =>
    fetchApi("/blocks", {
      method: "POST",
      body: JSON.stringify({ blockedProfileId, reason }),
    }),

  unblock: (blockedProfileId: string): Promise<{ success: boolean }> =>
    fetchApi(`/blocks/${blockedProfileId}`, { method: "DELETE" }),

  getBlocked: (): Promise<{
    blocked: Array<{ id: number; name: string; profile_photo_url?: string; emoji: string }>;
  }> => fetchApi("/blocks"),
};

// ──────────────────────────────────────────────────────────────
// Reports API
// ──────────────────────────────────────────────────────────────

export const reportsApi = {
  create: (data: {
    reportedProfileId: number;
    reason: string;
    description?: string;
  }): Promise<{ report: Report }> =>
    fetchApi("/reports", { method: "POST", body: JSON.stringify(data) }),
};

// ──────────────────────────────────────────────────────────────
// Notifications API
// ──────────────────────────────────────────────────────────────

export const notificationsApi = {
  get: (
    limit = 50,
    unreadOnly = false,
  ): Promise<{ notifications: Notification[]; unreadCount: number }> =>
    fetchApi(`/notifications?limit=${limit}&unread=${unreadOnly}`),

  markRead: (id: string): Promise<{ notification: Notification }> =>
    fetchApi(`/notifications/${id}/read`, { method: "PUT" }),

  markAllRead: (): Promise<{ success: boolean }> =>
    fetchApi("/notifications/read-all", { method: "PUT" }),

  getUnreadCount: (): Promise<{ count: number }> => fetchApi("/notifications/unread-count"),
};

// ──────────────────────────────────────────────────────────────
// Compatibility API
// ──────────────────────────────────────────────────────────────

export const compatibilityApi = {
  getWithProfile: (profileId: string): Promise<{ score: CompatibilityScore | null }> =>
    fetchApi(`/compatibility/${profileId}`),

  getTop: (limit = 20): Promise<{ scores: CompatibilityScore[] }> =>
    fetchApi(`/compatibility/top?limit=${limit}`),
};

// ──────────────────────────────────────────────────────────────
// Events API
// ──────────────────────────────────────────────────────────────

export const eventsApi = {
  get: (type?: string, upcomingOnly = true): Promise<{ events: Event[] }> => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (!upcomingOnly) params.set("upcoming", "false");
    return fetchApi(`/events?${params.toString()}`);
  },

  rsvp: (eventId: string, status = "going"): Promise<{ rsvp: unknown }> =>
    fetchApi(`/events/${eventId}/rsvp`, { method: "POST", body: JSON.stringify({ status }) }),

  getRsvps: (
    eventId: string,
  ): Promise<{
    rsvps: Array<{
      id: number;
      name: string;
      profile_photo_url?: string;
      emoji: string;
      branch?: string;
      year?: string;
    }>;
  }> => fetchApi(`/events/${eventId}/rsvps`),

  getMyRsvps: (): Promise<{
    rsvps: Array<{
      id: number;
      status: string;
      title: string;
      start_time: string;
      end_time?: string;
      location?: string;
      event_type: string;
    }>;
  }> => fetchApi("/events/rsvps/me"),
};

// ──────────────────────────────────────────────────────────────
// Saved Profiles API
// ──────────────────────────────────────────────────────────────

export const savedProfilesApi = {
  save: (savedProfileId: number): Promise<{ saved: SavedProfile }> =>
    fetchApi("/saved", { method: "POST", body: JSON.stringify({ savedProfileId }) }),

  unsave: (savedProfileId: string): Promise<{ success: boolean }> =>
    fetchApi(`/saved/${savedProfileId}`, { method: "DELETE" }),

  getSaved: (): Promise<{ saved: SavedProfile[] }> => fetchApi("/saved"),

  check: (savedProfileId: string): Promise<{ isSaved: boolean }> =>
    fetchApi(`/saved/check/${savedProfileId}`),
};

// ──────────────────────────────────────────────────────────────
// Daily Picks API
// ──────────────────────────────────────────────────────────────

export const dailyPicksApi = {
  get: (date?: string): Promise<{ picks: DailyPick[] }> => {
    const params = date ? `?date=${date}` : "";
    return fetchApi(`/daily-picks${params}`);
  },
};

// ──────────────────────────────────────────────────────────────
// Conversation Starters API
// ──────────────────────────────────────────────────────────────

export const conversationStartersApi = {
  getForMatch: (matchId: string): Promise<{ starters: ConversationStarter[] }> =>
    fetchApi(`/matches/${matchId}/starters`),
};

// ──────────────────────────────────────────────────────────────
// Badges API
// ──────────────────────────────────────────────────────────────

export const badgesApi = {
  getAll: (): Promise<{
    badges: Array<{ type: string; label: string; icon: string; description: string }>;
  }> => fetchApi("/badges"),

  getMine: (): Promise<{ badges: ProfileBadge[] }> => fetchApi("/badges/me"),
};

// ──────────────────────────────────────────────────────────────
// Search API
// ──────────────────────────────────────────────────────────────

export const searchApi = {
  search: (params: {
    q?: string;
    branch?: string;
    year?: string;
    interests?: string[];
    clubs?: string[];
    skills?: string[];
    relationship_preference?: string[];
    gender?: string;
    startup_looking_for?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ profiles: DatingProfile[] }> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else {
          searchParams.set(key, String(value));
        }
      }
    });
    return fetchApi(`/search?${searchParams.toString()}`);
  },
};

// ──────────────────────────────────────────────────────────────
// Discovery API
// ──────────────────────────────────────────────────────────────

export const discoveryApi = {
  getTab: (
    tab: string,
    filters?: { branch?: string; year?: string; interests?: string[] },
    limit = 20,
    offset = 0,
  ): Promise<{ profiles: DatingProfile[]; tab: string }> => {
    const params = new URLSearchParams({ tab });
    if (filters?.branch) params.set("branch", filters.branch);
    if (filters?.year) params.set("year", filters.year);
    if (filters?.interests?.length) filters.interests.forEach((i) => params.append("interests", i));
    params.set("limit", String(limit));
    params.set("offset", String(offset));
    return fetchApi(`/discover/${params.get("tab")}?${params.toString()}`);
  },

  getRecommended: (limit = 10): Promise<{ profiles: DatingProfile[] }> =>
    fetchApi(`/discover/recommended?limit=${limit}`),

  getDiscover: (limit = 20, offset = 0): Promise<{ profiles: DatingProfile[] }> =>
    fetchApi(`/discover?limit=${limit}&offset=${offset}`),

  likeProfile: (targetProfileId: number): Promise<{ isMatch: boolean; matchId?: number }> =>
    fetchApi("/like", { method: "POST", body: JSON.stringify({ targetProfileId }) }),

  passProfile: (targetProfileId: number): Promise<{ success: boolean }> =>
    fetchApi("/pass", { method: "POST", body: JSON.stringify({ targetProfileId }) }),

  undoLastSwipe: (): Promise<{ success: boolean }> => fetchApi("/undo", { method: "POST" }),
};

// ──────────────────────────────────────────────────────────────
// Matches API
// ──────────────────────────────────────────────────────────────

export const matchesApi = {
  getMatches: (): Promise<{ matches: Match[] }> => fetchApi("/matches"),
};

// ──────────────────────────────────────────────────────────────
// Study Buddy API
// ──────────────────────────────────────────────────────────────

export const studyBuddyApi = {
  getMatches: (subjects?: string[], limit = 20): Promise<{ profiles: DatingProfile[] }> => {
    const params = new URLSearchParams();
    if (subjects?.length) subjects.forEach((s) => params.append("subjects", s));
    params.set("limit", String(limit));
    return fetchApi(`/study-buddies?${params.toString()}`);
  },
};

// ──────────────────────────────────────────────────────────────
// Startup Match API
// ──────────────────────────────────────────────────────────────

export const startupMatchApi = {
  getMatches: (limit = 20): Promise<{ profiles: DatingProfile[] }> =>
    fetchApi(`/startup-matches?limit=${limit}`),
};

// ──────────────────────────────────────────────────────────────
// Chat Redirect API
// ──────────────────────────────────────────────────────────────

export const chatRedirectApi = {
  getInfo: (profileId: string): Promise<ChatRedirectInfo> => fetchApi(`/chat/${profileId}`),
};

// ──────────────────────────────────────────────────────────────
// Admin API
// ──────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: (): Promise<{ stats: AdminStats }> => fetchApi("/admin/stats"),

  getUsers: (page = 1, limit = 50, search = ""): Promise<{ users: AdminUser[] }> => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.set("search", search);
    return fetchApi(`/admin/users?${params.toString()}`);
  },

  getReports: (status = "pending"): Promise<{ reports: Report[] }> =>
    fetchApi(`/admin/reports?status=${status}`),

  updateReport: (id: string, status: string, adminNotes?: string): Promise<{ report: Report }> =>
    fetchApi(`/admin/reports/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status, adminNotes }),
    }),

  suspendUser: (id: string, reason: string): Promise<{ user: AdminUser }> =>
    fetchApi(`/admin/users/${id}/suspend`, { method: "PUT", body: JSON.stringify({ reason }) }),

  unsuspendUser: (id: string): Promise<{ user: AdminUser }> =>
    fetchApi(`/admin/users/${id}/unsuspend`, { method: "PUT" }),

  verifyUser: (id: string): Promise<{ user: AdminUser }> =>
    fetchApi(`/admin/users/${id}/verify`, { method: "PUT" }),
};
