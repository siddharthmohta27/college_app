import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Loader2,
  RefreshCw,
  Sparkles,
  Heart,
  Calendar,
  BookOpen,
  Coffee,
  Users,
  Globe,
  Briefcase,
  Rocket,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { useDailyPicks } from "@/hooks/use-dating-api";
import { ProfileCard } from "@/components/dating/ProfileCard";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dating/daily-picks")({
  head: () => ({
    meta: [{ title: "Daily Picks — Campus Match" }],
  }),
  component: DailyPicksPage,
});

function DailyPicksPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const { data: picks = [], isLoading, refetch } = useDailyPicks(date);

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

  const handleLike = (profileId: number) => {
    // TODO: wire to like API
    toast.success("Liked!");
  };

  const handlePass = (profileId: number) => {
    // TODO: wire to pass API
  };

  const handleSave = (profileId: number) => {
    toast.success("Saved!");
  };

  const handleSuperLike = (profileId: number) => {
    toast.success("Super liked!");
  };

  const handleChat = (profileId: number) => {
    navigate({ to: `/app/dating/chat/${profileId}` });
  };

  const handleProfileClick = (profileId: number) => {
    navigate({ to: `/app/dating/profile/${profileId}` });
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Refreshed!");
  };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const isToday = date === new Date().toISOString().split("T")[0];
  const isFuture = date > new Date().toISOString().split("T")[0];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Daily Picks</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">Curated profiles for you today</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading daily picks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Daily Picks</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Curated profiles for you today</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDate(yesterdayStr)}
            disabled={isFuture}
            className="p-2 rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            max={isToday ? undefined : yesterdayStr}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => setDate(new Date().toISOString().split("T")[0])}
            className="p-2 rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
            aria-label="Today"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Date Context */}
      <div className="rounded-xl border border-border bg-surface/50 p-3 animate-fade-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                {isToday
                  ? "Today's picks"
                  : isFuture
                    ? "Future date - no picks available"
                    : "Past picks"}
              </p>
            </div>
          </div>
          {picks.length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {picks.length} pick{picks.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Picks Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {picks.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold">No daily picks yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
              {isFuture
                ? "Daily picks are generated each morning. Check back tomorrow!"
                : "Complete your profile and start swiping to get personalized daily picks!"}
            </p>
            {!isFuture && (
              <button
                onClick={() => navigate({ to: "/app/dating/profile" })}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <BookOpen className="h-4 w-4" />
                Complete Profile
              </button>
            )}
          </div>
        ) : (
          picks.map((pick) => (
            <ProfileCard
              key={pick.id}
              profile={pick as unknown as import("@/lib/dating-types").DatingProfile}
              onLike={handleLike}
              onPass={handlePass}
              onSave={handleSave}
              onSuperLike={handleSuperLike}
              onChat={handleChat}
              onProfileClick={() => handleProfileClick(pick.id)}
              showActions={true}
            />
          ))
        )}
      </div>

      {/* Badges Legend */}
      <div className="rounded-xl border border-border bg-surface/50 p-4 animate-fade-up">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          What makes a Daily Pick?
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3 w-3" /> High Compatibility
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Heart className="h-3 w-3 fill-current" /> Mutual Interests
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            <BookOpen className="h-3 w-3" /> Same Branch/Year
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
            <Rocket className="h-3 w-3" /> Startup Interest
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <Coffee className="h-3 w-3" /> Campus Hotspots
          </span>
        </div>
      </div>
    </div>
  );
}
