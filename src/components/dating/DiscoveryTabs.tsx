import { useState, useCallback } from "react";
import {
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Rocket,
  Sparkles,
  MapPin,
  TrendingUp,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useDiscoveryTab, useRecommendedProfiles } from "@/hooks/use-dating-api";
import type { DatingProfile } from "@/lib/dating-types";
import { ProfileCard } from "./ProfileCard";
import { cn } from "@/lib/utils";

interface DiscoveryTabsProps {
  currentProfileId: number;
  onLike: (profileId: number, source: "profile" | "photo" | "prompt") => void;
  onPass: (profileId: number) => void;
  onSave: (profileId: number) => void;
  onSuperLike: (profileId: number) => void;
  onChat: (profileId: number) => void;
  onProfileClick: (profileId: number) => void;
}

const TABS = [
  {
    id: "recommended",
    label: "Recommended",
    icon: Sparkles,
    description: "AI-powered matches for you",
  },
  { id: "friends", label: "Friends", icon: Users, description: "Looking for friendships" },
  { id: "dating", label: "Dating", icon: Heart, description: "Looking for relationships" },
  {
    id: "study_buddy",
    label: "Study Buddy",
    icon: GraduationCap,
    description: "Find study partners",
  },
  {
    id: "networking",
    label: "Networking",
    icon: Briefcase,
    description: "Professional connections",
  },
  { id: "startup_partner", label: "Startup", icon: Rocket, description: "Co-founders & team" },
  {
    id: "new_students",
    label: "New Students",
    icon: Sparkles,
    description: "Recently joined campus",
  },
  { id: "nearby", label: "Nearby", icon: MapPin, description: "Students near you" },
  { id: "trending", label: "Trending", icon: TrendingUp, description: "Popular this week" },
] as const;

export function DiscoveryTabs({
  currentProfileId,
  onLike,
  onPass,
  onSave,
  onSuperLike,
  onChat,
  onProfileClick,
}: DiscoveryTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("recommended");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const queryClient = useQueryClient();

  // Fetch profiles for current tab
  const {
    data: profiles = [],
    isLoading,
    isError,
    refetch,
  } = useDiscoveryTab(activeTab, undefined, 20, offset);

  // Fetch recommended profiles separately
  const { data: recommendedProfiles = [] } = useRecommendedProfiles(10);

  const currentProfiles =
    activeTab === "recommended" && offset === 0 ? recommendedProfiles : profiles;

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    setOffset((prev) => prev + 20);

    // Prefetch next page
    await queryClient.prefetchQuery({
      queryKey: ["discovery", activeTab, undefined, 20, offset + 20],
    });

    setIsLoadingMore(false);
  }, [activeTab, hasMore, isLoadingMore, offset, queryClient]);

  const handleTabChange = (tabId: (typeof TABS)[number]["id"]) => {
    setActiveTab(tabId);
    setOffset(0);
    setHasMore(true);
    refetch();
  };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoadingMore && hasMore) {
        handleLoadMore();
      }
    },
    [handleLoadMore, isLoadingMore, hasMore],
  );

  // Check if we have more results
  const lastProfile = currentProfiles[currentProfiles.length - 1];
  const loadMoreRef = lastProfile ? { current: lastProfile.id } : { current: null };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="overflow-x-auto pb-2 -mx-6 px-6">
        <div className="flex gap-2 min-w-max">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-foreground border border-primary/30 shadow-sm"
                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border",
                )}
                title={tab.description}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && offset === 0 ? (
          // Skeleton loaders
          Array.from({ length: 8 }).map((_, i) => (
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
          ))
        ) : currentProfiles.length === 0 ? (
          // Empty state
          <div className="col-span-full rounded-2xl border border-border glass p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">No profiles found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
              {activeTab === "recommended"
                ? "No recommendations yet. Complete your profile to get better matches!"
                : `No profiles in ${TABS.find((t) => t.id === activeTab)?.label} yet. Check back later!`}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        ) : (
          <>
            {currentProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onLike={onLike}
                onPass={onPass}
                onSave={onSave}
                onSuperLike={onSuperLike}
                onChat={onChat}
                onProfileClick={() => onProfileClick(profile.id)}
                showActions={true}
              />
            ))}

            {/* Load more trigger */}
            {hasMore && (
              <div
                ref={(el) => {
                  if (el) {
                    const observer = new IntersectionObserver(handleIntersection, {
                      rootMargin: "200px",
                    });
                    observer.observe(el);
                    return () => observer.disconnect();
                  }
                }}
                className="col-span-full flex justify-center py-4"
              >
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading more...
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* End of results */}
      {!hasMore && currentProfiles.length > 0 && !isLoading && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          You've seen all profiles in this tab
        </div>
      )}
    </div>
  );
}
