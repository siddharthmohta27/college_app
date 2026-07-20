import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  Filter,
  Loader2,
  ChevronLeft,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Rocket,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { useSearchProfiles } from "@/hooks/use-dating-api";
import { ProfileCard } from "@/components/dating/ProfileCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dating/search")({
  head: () => ({
    meta: [{ title: "Search — Campus Match" }],
  }),
  component: SearchPage,
});

const RELATIONSHIP_OPTIONS = [
  { value: "friends", label: "Friends" },
  { value: "dating", label: "Dating" },
  { value: "study_buddy", label: "Study Buddy" },
  { value: "networking", label: "Networking" },
  { value: "startup_partner", label: "Startup Partner" },
];

const YEAR_OPTIONS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year",
  "Grad Student",
  "PhD",
  "Alumni",
];

const BRANCH_OPTIONS = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
  "Biotechnology",
  "Information Technology",
  "AI & ML",
  "Data Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Economics",
  "Management",
  "Design",
  "Architecture",
];

const INTEREST_SUGGESTIONS = [
  "Coding",
  "Hackathons",
  "Coffee",
  "Anime",
  "Gaming",
  "Music",
  "Reading",
  "Sports",
  "Photography",
  "Travel",
  "Cooking",
  "Movies",
  "Startup",
  "AI/ML",
  "Web Dev",
  "Design",
];

function SearchPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    branch: "",
    year: "",
    interests: [] as string[],
    clubs: [] as string[],
    skills: [] as string[],
    relationship_preference: [] as string[],
    gender: "",
    startup_looking_for: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    data: profiles = [],
    isLoading,
    isError,
  } = useSearchProfiles({
    q: debouncedQuery,
    ...filters,
    limit: 20,
    offset: 0,
  });

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

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayFilter = (key: string, item: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked
        ? [...(prev[key as keyof typeof filters] as string[]), item]
        : (prev[key as keyof typeof filters] as string[]).filter((i) => i !== item),
    }));
  };

  const handleTagInput = (key: string, value: string) => {
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setFilters((prev) => ({ ...prev, [key]: tags }));
  };

  const clearFilters = () => {
    setFilters({
      branch: "",
      year: "",
      interests: [],
      clubs: [],
      skills: [],
      relationship_preference: [],
      gender: "",
      startup_looking_for: false,
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== "" && v !== false,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedQuery(query);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Search</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Find people by name, interests, branch, and more
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
          <h2 className="text-xl font-bold">Search</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Find people by name, interests, branch, and more
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-border glass p-4 animate-fade-up"
      >
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, bio, branch, interests..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 pl-10 text-sm outline-none focus:border-primary"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-elevated"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition",
              showFilters || hasActiveFilters
                ? "bg-primary/10 text-primary border-primary/30"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border",
            )}
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 animate-fade-up space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Branch
                </label>
                <select
                  value={filters.branch}
                  onChange={(e) => handleFilterChange("branch", e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">All Branches</option>
                  {BRANCH_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange("year", e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">All Years</option>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non_binary">Non-binary</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Looking For
                </label>
                <div className="flex flex-wrap gap-2">
                  {RELATIONSHIP_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs cursor-pointer transition hover:border-primary hover:bg-surface-elevated"
                    >
                      <input
                        type="checkbox"
                        checked={filters.relationship_preference.includes(opt.value)}
                        onChange={(e) =>
                          handleArrayFilter("relationship_preference", opt.value, e.target.checked)
                        }
                        className="h-3.5 w-3.5 text-primary rounded border-border focus:ring-primary"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Interests (comma separated)
                </label>
                <input
                  value={filters.interests.join(", ")}
                  onChange={(e) => handleTagInput("interests", e.target.value)}
                  placeholder="Coding, Hackathons, Coffee, Anime"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
                <div className="mt-2 flex flex-wrap gap-1">
                  {INTEREST_SUGGESTIONS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() =>
                        handleArrayFilter(
                          "interests",
                          interest,
                          !filters.interests.includes(interest),
                        )
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition",
                        filters.interests.includes(interest)
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "text-muted-foreground hover:border-primary hover:text-primary border-border",
                      )}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Clubs (comma separated)
                </label>
                <input
                  value={filters.clubs.join(", ")}
                  onChange={(e) => handleTagInput("clubs", e.target.value)}
                  placeholder="ACM, IEEE, Dance Club, Debate Society"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                  Skills (comma separated)
                </label>
                <input
                  value={filters.skills.join(", ")}
                  onChange={(e) => handleTagInput("skills", e.target.value)}
                  placeholder="React, Python, Figma, Public Speaking"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated">
                  <input
                    type="checkbox"
                    checked={filters.startup_looking_for}
                    onChange={(e) => handleFilterChange("startup_looking_for", e.target.checked)}
                    className="h-4 w-4 text-primary rounded border-border focus:ring-primary"
                  />
                  <span className="font-medium">Looking for startup co-founder/team</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Results */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isError ? (
          <div className="col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
              <X className="h-8 w-8 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold">Error loading results</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please try again</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold">No profiles found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
              {debouncedQuery
                ? `No results for "${debouncedQuery}". Try adjusting your filters.`
                : "Start searching to find people!"}
            </p>
          </div>
        ) : (
          profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onLike={(profileId) => {
                /* handled by discovery tabs */
              }}
              onPass={(profileId) => {}}
              onSave={(profileId) => {}}
              onSuperLike={(profileId) => {}}
              onChat={(profileId) => navigate({ to: `/app/dating/chat/${profileId}` })}
              onProfileClick={() => navigate({ to: `/app/dating/profile/${profile.id}` })}
              showActions={true}
            />
          ))
        )}
      </div>

      {profiles.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-4">
          Showing {profiles.length} result{profiles.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
