import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Heart, MessageSquare, Loader2, X, ChevronLeft, Sparkles, Clock, Coffee, Zap, Users, BookOpen, Rocket, Briefcase,
} from "lucide-react";
import { useMatches, useConversationStarters } from "@/hooks/use-dating-api";
import { useChatRedirectInfo } from "@/hooks/use-dating-api";
import { firebaseAuth } from "@/lib/firebase";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/app/dating/matches")({
  head: () => ({
    meta: [{ title: "Matches — Campus Match" }],
  }),
  component: MatchesPage,
});

function MatchesPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [showStarters, setShowStarters] = useState<string | null>(null);
  const [starters, setStarters] = useState<string[]>([]);

  const { data: matchesData, isLoading, refetch } = useMatches();
  const matches = matchesData?.matches || [];

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid });
      } else {
        setCurrentUser(null);
        navigate({ to: "/login" });
      }
    });
    return unsub;
  }, [navigate]);

  const handleStartChat = async (match: any) => {
    // Get chat redirect info
    // For now, navigate directly to chat with the match's profile ID
    // The chat page will handle DM creation
    navigate({ to: `/app/dating/chat/${match.id}` });
  };

  const handleShowStarters = async (matchId: string) => {
    setShowStarters(matchId);
    // Fetch conversation starters
    try {
      // This would call the API
      // For now, generate some mock starters
      setStarters([
        "You both love Hackathons — ask about their latest project! 💻",
        "You both play Badminton — challenge them for a game! 🏸",
        "You both like Anime — what's their favorite this season? 🎌",
        "You're both in the same department — talk about that tough assignment! 📚",
      ]);
    } catch {
      setStarters(["Great match! Start the conversation! 🚀"]);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Your Matches</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {matches.length} mutual connections
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Your Matches</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {matches.length} mutual connection{matches.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-400">
            <Heart className="h-3.5 w-3.5 fill-current" />
            {matches.length}
          </span>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
              <Heart className="h-8 w-8 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold">No matches yet</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
              Start swiping on profiles to find your match! When you both like each other, you'll appear here.
            </p>
            <button
              onClick={() => navigate({ to: "/app/dating" })}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" />
              Start Swiping
            </button>
          </div>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onChat={() => handleStartChat(match)}
              onStarters={() => handleShowStarters(String(match.id))}
              showStarters={showStarters === String(match.id)}
              starters={starters}
              onCloseStarters={() => setShowStarters(null)}
            />
          ))
        )}
      </div>

      {/* Conversation Starters Modal */}
      {showStarters && starters.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-primary/30 glass-strong p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Conversation Starters</h3>
              <button
                onClick={() => { setShowStarters(null); setStarters([]); }}
                className="p-1 rounded-lg hover:bg-surface transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {starters.map((starter, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-border bg-surface p-4 group cursor-pointer transition hover:border-primary/30 hover:bg-primary/5"
                  onClick={() => {
                    navigator.clipboard.writeText(starter);
                    toast.success("Copied to clipboard!");
                    setShowStarters(null);
                    setStarters([]);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-foreground/90 flex-1">{starter}</p>
                  </div>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground">
                    Tap to copy
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setShowStarters(null); setStarters([]); }}
              className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface MatchCardProps {
  match: any;
  onChat: () => void;
  onStarters: () => void;
  showStarters: boolean;
  starters: string[];
  onCloseStarters: () => void;
}

function MatchCard({ match, onChat, onStarters, showStarters, starters, onCloseStarters }: MatchCardProps) {
  const timeAgo = match.matched_at ? formatDistanceToNow(new Date(match.matched_at), { addSuffix: true }) : "Recently";

  return (
    <div className="rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
          <span className="text-3xl">{match.emoji || "👤"}</span>
          {match.is_verified && (
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Heart className="h-3 w-3 fill-current text-primary-foreground" />
            </span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{match.name}</h3>
            {match.is_verified && (
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary">
                <Heart className="h-2.5 w-2.5 fill-current text-primary-foreground" />
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {match.major || match.branch} • {match.year}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Matched {timeAgo}
            </span>
            {match.compatibility_score && (
              <span className="flex items-center gap-1 text-primary font-medium">
                <Zap className="h-3 w-3" />
                {match.compatibility_score}% match
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStarters}
            className="p-2 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition"
            aria-label="Conversation starters"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <button
            onClick={onChat}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            aria-label="Start chat"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Starter Preview */}
      {showStarters && starters.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-up">
          <p className="text-xs text-muted-foreground mb-2">AI Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {starters.slice(0, 3).map((starter, i) => (
              <button
                key={i}
                onClick={() => {
                  navigator.clipboard.writeText(starter);
                  toast.success("Copied!");
                  onCloseStarters();
                }}
                className="text-xs rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition"
              >
                {starter.slice(0, 50)}...
              </button>
            ))}
            {starters.length > 3 && (
              <button
                onClick={onCloseStarters}
                className="text-xs rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition"
              >
                +{starters.length - 3} more
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}