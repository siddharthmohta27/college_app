import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase credentials not found. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// ──────────────────────────────────────────────────────────────
// Helper functions for common queries (type-safe wrappers)
// ──────────────────────────────────────────────────────────────

export const supabaseHelpers = {
  // ── Dating ────────────────────────────────────────────────
  async getProfilesForSwiping(userId: number) {
    const { data, error } = await supabase
      .from("dating_profiles")
      .select("*")
      .neq("id", userId)
      .order("created_at", { ascending: false });
    return { data, error };
  },

  async recordSwipe(swiperId: number, swipedId: number, action: "like" | "pass") {
    const { data, error } = await supabase
      .from("swipes")
      .upsert(
        { swiper_id: swiperId, swiped_id: swipedId, action },
        { onConflict: "swiper_id,swiped_id" },
      )
      .select()
      .single();
    return { data, error };
  },

  async checkMutualMatch(user1Id: number, user2Id: number) {
    const { data, error } = await supabase
      .from("swipes")
      .select("id")
      .eq("swiper_id", user2Id)
      .eq("swiped_id", user1Id)
      .eq("action", "like")
      .maybeSingle();
    return { data, error, isMatch: !!data };
  },

  async createMatch(user1Id: number, user2Id: number) {
    const [u1, u2] = [user1Id, user2Id].sort((a, b) => a - b);
    const { data, error } = await supabase
      .from("matches")
      .insert({ user1_id: u1, user2_id: u2 })
      .select()
      .single();
    return { data, error };
  },

  async getMatches(userId: number) {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `
        id,
        created_at,
        dating_profiles!matches_user1_id_fkey ( id, name, major, emoji, year ),
        dating_profiles!matches_user2_id_fkey ( id, name, major, emoji, year )
      `,
      )
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order("created_at", { ascending: false });
    return { data, error };
  },

  // ── Chat / Messages ────────────────────────────────────────
  async getMessages(channelId: string, limit = 50) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("created_at", { ascending: false })
      .limit(limit);
    return { data: data?.reverse() ?? [], error };
  },

  async sendMessage(channelId: string, userId: number, content: string) {
    const { data, error } = await supabase
      .from("messages")
      .insert({ channel_id: channelId, user_id: userId, content })
      .select()
      .single();
    return { data, error };
  },

  async addReaction(messageId: string, emoji: string, userId: number) {
    const { data, error } = await supabase
      .from("message_reactions")
      .upsert(
        { message_id: messageId, emoji, user_id: userId },
        { onConflict: "message_id,emoji,user_id" },
      )
      .select()
      .single();
    return { data, error };
  },

  // ── Auth ──────────────────────────────────────────────────
  async signUp(email: string, password: string, metadata?: Record<string, unknown>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  // ── Realtime Subscriptions ────────────────────────────────
  subscribeToMessages(channelId: string, callback: (payload: unknown) => void) {
    return supabase
      .channel(`messages:${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${channelId}`,
        },
        callback,
      )
      .subscribe();
  },

  subscribeToMatches(userId: number, callback: (payload: unknown) => void) {
    return supabase
      .channel(`matches:${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "matches", filter: `user1_id=eq.${userId}` },
        callback,
      )
      .subscribe();
  },
};

// ──────────────────────────────────────────────────────────────
// Type helpers (extend as you add tables)
// ──────────────────────────────────────────────────────────────

export type DatingProfile = {
  id: number;
  name: string;
  age: number;
  year: string | null;
  major: string | null;
  bio: string | null;
  interests: string[] | null;
  emoji: string | null;
  verified: boolean;
  created_at: string;
};

export type Swipe = {
  id: number;
  swiper_id: number;
  swiped_id: number;
  action: "like" | "pass";
  created_at: string;
};

export type Match = {
  id: number;
  user1_id: number;
  user2_id: number;
  created_at: string;
  dating_profiles: DatingProfile | DatingProfile[];
};

export type Message = {
  id: string;
  channel_id: string;
  user_id: number;
  content: string;
  created_at: string;
};
