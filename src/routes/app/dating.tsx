import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  Rocket,
  MapPin,
  TrendingUp,
  Loader2,
  RefreshCw,
  Settings,
  User,
  MessageSquare,
  Star,
  Bell,
  ChevronLeft,
  X,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { firebaseAuth } from "@/lib/firebase";
import { DiscoveryTabs } from "@/components/dating/DiscoveryTabs";
import {
  useMyProfile,
  useDiscoverProfiles,
  useLikeProfile,
  usePassProfile,
  useUndoSwipe,
  useSaveProfile,
} from "@/hooks/use-dating-api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dating")({
  head: () => ({
    meta: [{ title: "Campus Match — Campus Connect" }],
  }),
  component: CampusMatch,
});

const TABS = [
  { id: "recommended", label: "Recommended", icon: Sparkles },
  { id: "friends", label: "Friends", icon: Users },
  { id: "dating", label: "Dating", icon: Heart },
  { id: "study_buddy", label: "Study Buddy", icon: GraduationCap },
  { id: "networking", label: "Networking", icon: Briefcase },
  { id: "startup_partner", label: "Startup", icon: Rocket },
  { id: "new_students", label: "New Students", icon: Sparkles },
  { id: "nearby", label: "Nearby", icon: MapPin },
  { id: "trending", label: "Trending", icon: TrendingUp },
] as const;

function CampusMatch() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<{
    id: number;
    name: string;
    emoji?: string;
  } | null>(null);
  const [lastSwiped, setLastSwiped] = useState<{
    profileId: number;
    action: "like" | "pass";
  } | null>(null);

  const { data: myProfile, isLoading: profileLoading } = useMyProfile();
  const { data: profiles = [], isLoading: discoverLoading, refetch } = useDiscoverProfiles(20, 0);
  const likeProfile = useLikeProfile();
  const passProfile = usePassProfile();
  const undoSwipe = useUndoSwipe();
  const saveProfile = useSaveProfile();

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
      } else {
        setCurrentUser(null);
        navigate({ to: "/login" });
      }
    });
    return unsub;
  }, [navigate]);

  const handleLike = async (profileId: number) => {
    likeProfile.mutate(profileId, {
      onSuccess: (data) => {
        if (data.isMatch) {
          const match = profiles.find((p) => p.id === profileId);
          setMatchedProfile({ id: profileId, name: match?.name || "Match!", emoji: match?.emoji });
          setShowMatchModal(true);
          toast.success("It's a match! 🎉");
        }
      },
    });
    setLastSwiped({ profileId, action: "like" });
  };

  const handlePass = (profileId: number) => {
    passProfile.mutate(profileId);
    setLastSwiped({ profileId, action: "pass" });
  };

  const handleSave = (profileId: number) => {
    saveProfile.mutate(profileId);
    toast.success("Profile saved");
  };

  const handleSuperLike = (profileId: number) => {
    // TODO: Implement super like
    handleLike(profileId);
  };

  const handleUndo = () => {
    if (lastSwiped) {
      undoSwipe.mutate();
      setLastSwiped(null);
      toast.success("Last swipe undone");
    }
  };

  const handleChat = (profileId: number) => {
    navigate({ to: `/app/dating/chat/${profileId}` });
  };

  const handleProfileClick = (profileId: number) => {
    navigate({ to: `/app/dating/profile/${profileId}` });
  };

  if (profileLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Campus Match</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Find study partners, coffee buddies, or matches on campus
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!myProfile) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Campus Match</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Find study partners, coffee buddies, or matches on campus
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass p-8 text-center min-h-[460px] flex flex-col justify-center items-center animate-fade-up">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-6 text-xl font-bold">Complete Your Profile</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            You need to set up your Campus Match profile first to start discovering people.
          </p>
          <button
            onClick={() => navigate({ to: "/app/dating/profile" })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <User className="h-4 w-4" />
            Create Profile
          </button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ to: "/app/dating/notifications" })}
            className="relative grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
          </button>
          <button
            onClick={() => navigate({ to: "/app/dating/profile" })}
            className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Undo Bar */}
      {lastSwiped && (
        <div className="animate-fade-up flex items-center justify-between p-4 rounded-xl border border-border bg-surface">
          <span className="text-sm text-muted-foreground">
            {lastSwiped.action === "like" ? "Liked" : "Passed"} a profile
          </span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium transition hover:bg-surface-elevated"
          >
            <RotateCcw className="h-4 w-4" />
            Undo
          </button>
        </div>
      )}

      {/* Discovery Tabs */}
      <DiscoveryTabs
        currentProfileId={myProfile.id}
        onLike={handleLike}
        onPass={handlePass}
        onSave={handleSave}
        onSuperLike={handleSuperLike}
        onChat={handleChat}
        onProfileClick={handleProfileClick}
      />

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
                onClick={() => {
                  setShowMatchModal(false);
                  handleChat(matchedProfile.id);
                }}
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
