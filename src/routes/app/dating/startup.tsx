import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Loader2,
  Rocket,
  Briefcase,
  Coffee,
  Users,
  Heart,
  GraduationCap,
  MapPin,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  X,
  Code,
  Palette,
  BarChart,
  Megaphone,
  Lightbulb,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { useStartupMatches } from "@/hooks/use-dating-api";
import { ProfileCard } from "@/components/dating/ProfileCard";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dating/startup")({
  head: () => ({
    meta: [{ title: "Startup Match — Campus Match" }],
  }),
  component: StartupMatchPage,
});

const STARTUP_ROLES = [
  { value: "cofounder", label: "Co-founder", icon: Lightbulb },
  { value: "developer", label: "Developer", icon: Code },
  { value: "designer", label: "Designer", icon: Palette },
  { value: "ml_engineer", label: "ML Engineer", icon: Sparkles },
  { value: "marketing", label: "Marketing", icon: Megaphone },
  { value: "business", label: "Business", icon: BarChart },
];

function StartupMatchPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: profiles = [], isLoading, refetch } = useStartupMatches(20);

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

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const filteredProfiles =
    selectedRoles.length > 0
      ? profiles.filter((p) => p.startup_role && selectedRoles.includes(p.startup_role))
      : profiles;

  const handleLike = (profileId: number) => {
    toast.success("Liked!");
  };

  const handlePass = (profileId: number) => {
    // pass
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

  const hasActiveFilters = selectedRoles.length > 0;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Startup Match</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Find co-founders and build your founding team
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border glass min-h-[460px] animate-pulse"
            >
              <div className="aspect-[3/4] skeleton" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 skeleton rounded" />
                <div className="h-3 w-1/2 skeleton rounded" />
                <div className="h-8 w-full skeleton rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 skeleton rounded-full" />
                  <div className="h-6 w-24 skeleton rounded-full" />
                  <div className="h-6 w-20 skeleton rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Startup Match</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Find co-founders and build your founding team
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              showFilters || hasActiveFilters
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters{" "}
            {hasActiveFilters && (
              <span className="h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                *
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-surface/50 p-4 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Filter by Role Seeking
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setSelectedRoles([])}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {STARTUP_ROLES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRoleToggle(value)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selectedRoles.includes(value)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:border-primary hover:text-primary border-border"
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProfiles.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold">No startup matches found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
              {hasActiveFilters
                ? "Try adjusting your role filters or check back later!"
                : "Complete your profile and enable 'Looking for startup team' to find co-founders."}
            </p>
            {!hasActiveFilters && (
              <button
                onClick={() => navigate({ to: "/app/dating/profile" })}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Rocket className="h-4 w-4" />
                Update Profile
              </button>
            )}
          </div>
        ) : (
          filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onLike={handleLike}
              onPass={handlePass}
              onSave={handleSave}
              onSuperLike={handleSuperLike}
              onChat={handleChat}
              onProfileClick={() => handleProfileClick(profile.id)}
              showActions={true}
            />
          ))
        )}
      </div>

      {/* Role Badges */}
      <div className="rounded-xl border border-border bg-surface/50 p-4 animate-fade-up">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Roles in Startup Match
        </h3>
        <div className="flex flex-wrap gap-2">
          {STARTUP_ROLES.map(({ value, label, icon: Icon }) => (
            <span
              key={value}
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400"
            >
              <Icon className="h-3 w-3" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
