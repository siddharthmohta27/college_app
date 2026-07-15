import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  X,
  Sparkles,
  MessageSquare,
  Star,
  Award,
  Shield,
  Loader2,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";

export const Route = createFileRoute("/app/dating")({
  head: () => ({
    meta: [{ title: "Campus Match — Campus Connect" }],
  }),
  component: CampusDating,
});

// Base URL of the mock backend (chat-server)
const API =
  typeof window !== "undefined"
    ? `http://${window.location.hostname}:3001/api/dating`
    : "http://localhost:3001/api/dating";

type Profile = {
  id: number;
  name: string;
  age: number;
  year: string;
  major: string;
  bio: string;
  interests: string[];
  emoji: string;
  verified: boolean;
};

type Match = {
  id: number;
  name: string;
  major: string;
  emoji: string;
  year: string;
  matched_at: string;
};

function CampusDating() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileIndex, setProfileIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);
  const [dbStatus, setDbStatus] = useState<"database" | "fallback" | null>(null);
  const [checkingUpdates, setCheckingUpdates] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);

  // Get current user from Firebase auth
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setCurrentUser(null);
      }
    });
    return unsub;
  }, []);

  // Get Firebase ID token for authenticated requests
  const getAuthHeaders = async () => {
    const token = await firebaseAuth.getIdToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchProfiles = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/profiles`, { headers });
      const data = await res.json();
      setProfiles(data.profiles || []);
      setDbStatus(data.source);
    } catch {
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const checkForNewProfiles = async () => {
    if (!currentUser) return;
    setCheckingUpdates(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/profiles`, { headers });
      const data = await res.json();
      const newProfiles = data.profiles || [];
      setProfiles(newProfiles);
      setDbStatus(data.source);
      setProfileIndex(0);
    } catch {
      // Silently handle error, keep existing profiles
    } finally {
      setCheckingUpdates(false);
    }
  };

  // Fetch profiles from backend on mount
  useEffect(() => {
    fetchProfiles();
  }, [currentUser]);

  // Fetch matches from backend on mount
  useEffect(() => {
    if (!currentUser) return;
    getAuthHeaders()
      .then((headers) =>
        fetch(`${API}/matches/${currentUser.uid}`, { headers })
          .then((r) => r.json())
          .then((data) => setMatches(data.matches || []))
          .catch(() => setMatches([]))
      )
      .catch(() => setMatches([]));
  }, [currentUser, showMatchModal]);

  const activeProfile = profiles[profileIndex];

  const handleAction = async (like: boolean) => {
    if (!activeProfile || swiping || !currentUser) return;
    setSwiping(true);

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/swipe`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          swipedId: activeProfile.id,
          action: like ? "like" : "pass",
        }),
      });
      const data = await res.json();

      if (data.isMatch) {
        setMatchedProfile(activeProfile);
        setShowMatchModal(true);
      }
    } catch {
      // Server offline — silently move on
    }

    setProfileIndex((prev) => prev + 1);
    setSwiping(false);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Campus Match</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Find study partners, coffee buddies, or matches on campus
          </p>
        </div>
        {dbStatus && (
          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
              dbStatus === "database"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-400"
            }`}
          >
            {dbStatus === "database" ? "🟢 Live DB" : "🟡 Offline Mode"}
          </span>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Swiper card */}
        <div className="md:col-span-2 space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading profiles...</p>
            </div>
          ) : activeProfile ? (
            <div className="relative overflow-hidden rounded-2xl border border-border glass p-6 flex flex-col justify-between min-h-[460px] animate-fade-up">
              {/* Top info */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{activeProfile.emoji}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-bold">
                          {activeProfile.name}, {activeProfile.age}
                        </h3>
                        {activeProfile.verified && (
                          <Shield className="h-4 w-4 fill-primary text-primary-foreground shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activeProfile.year} · {activeProfile.major}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <Sparkles className="h-3 w-3" /> Campus Match
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    About
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {activeProfile.bio}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(activeProfile.interests || []).map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Profile counter */}
                <p className="mt-4 text-[10px] text-muted-foreground text-center">
                  {profileIndex + 1} of {profiles.length} profiles
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  id="dating-pass-btn"
                  onClick={() => handleAction(false)}
                  disabled={swiping}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:bg-red-500/10 hover:border-red-500/40 text-red-400 transition disabled:opacity-50"
                >
                  <X className="h-6 w-6" />
                </button>
                <button
                  id="dating-like-btn"
                  onClick={() => handleAction(true)}
                  disabled={swiping}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition glow-primary disabled:opacity-50"
                >
                  {swiping ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Heart className="h-7 w-7 fill-current" />
                  )}
                </button>
                <button
                  onClick={() => setProfileIndex((p) => p + 1)}
                  disabled={swiping}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition disabled:opacity-50"
                >
                  <Star className="h-5 w-5 fill-current" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border glass p-8 text-center min-h-[460px] flex flex-col justify-center items-center animate-fade-up">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">You're all caught up! 🎉</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                You've explored all available Campus Match profiles for now.
              </p>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                New students join Campus Match every day. Check back later to discover new study
                partners, coffee buddies, and meaningful campus connections.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-semibold text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                No new profiles available
              </span>
              <button
                onClick={checkForNewProfiles}
                disabled={checkingUpdates}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20 disabled:opacity-50"
              >
                {checkingUpdates ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Check Again
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar — Matches */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border glass p-5">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Heart className="h-4 w-4 text-primary fill-current" /> Your Matches ({matches.length}
              )
            </h3>
            {matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition hover:bg-surface-elevated"
                  >
                    <span className="text-2xl shrink-0">{match.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold truncate">{match.name}</h4>
                      <p className="text-[10px] text-muted-foreground truncate">{match.major}</p>
                    </div>
                    <button className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-muted-foreground">Swipe on profiles to find a match!</p>
              </div>
            )}
          </div>

          {/* Safety card */}
          <div className="rounded-2xl border border-border bg-yellow-500/5 p-4 text-xs text-primary flex items-start gap-3">
            <Award className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              <strong>Campus Safety First:</strong> All profiles are verified with active college
              emails. Always meet in public spots on campus.
            </p>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-primary/30 glass-strong p-6 text-center animate-fade-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-4xl animate-bounce">
              🎉
            </div>
            <h3 className="mt-4 text-xl font-bold">It's a Match!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You and <strong className="text-foreground">{matchedProfile.name}</strong> liked each
              other.
            </p>

            <div className="my-6 flex justify-center gap-4">
              <div className="text-5xl">🚀</div>
              <div className="text-5xl">{matchedProfile.emoji}</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowMatchModal(false)}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
              >
                Send a Message
              </button>
              <button
                onClick={() => setShowMatchModal(false)}
                className="w-full rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
