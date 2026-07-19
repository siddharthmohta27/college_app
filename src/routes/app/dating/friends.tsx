import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft, Users, UserPlus, UserCheck, UserX, Heart, MessageSquare, Search, Loader2, X, CheckCircle2, Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { firebaseAuth } from "@/lib/firebase";
import { useFriendRequests, useSentFriendRequests, useFriends, useSendFriendRequest, useRespondToFriendRequest, useRemoveFriend } from "@/hooks/use-dating-api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dating/friends")({
  head: () => ({
    meta: [{ title: "Friends — Campus Match" }],
  }),
  component: FriendsPage,
});

const TABS = [
  { id: "requests", label: "Requests", icon: UserPlus, count: 0 },
  { id: "sent", label: "Sent", icon: UserPlus, count: 0 },
  { id: "friends", label: "Friends", icon: Users, count: 0 },
] as const;

function FriendsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TABS[number]["id"]>("requests");

  const { data: requestsData, isLoading: requestsLoading, refetch: refetchRequests } = useFriendRequests();
  const { data: sentData, isLoading: sentLoading, refetch: refetchSent } = useSentFriendRequests();
  const { data: friendsData, isLoading: friendsLoading, refetch: refetchFriends } = useFriends();

  const sendRequest = useSendFriendRequest();
  const respondRequest = useRespondToFriendRequest();
  const removeFriend = useRemoveFriend();

  // Update tab counts
  const tabs = TABS.map(tab => ({
    ...tab,
    count: tab.id === "requests" ? requestsData?.requests?.length || 0 :
           tab.id === "sent" ? sentData?.requests?.length || 0 :
           friendsData?.friends?.length || 0
  }));

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

  const handleAccept = async (requestId: string) => {
    try {
      await respondRequest.mutateAsync({ requestId, action: "accept" });
      toast.success("Friend request accepted!");
      refetchRequests();
      refetchFriends();
    } catch {
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await respondRequest.mutateAsync({ requestId, action: "reject" });
      toast.success("Friend request declined");
      refetchRequests();
    } catch {
      toast.error("Failed to reject request");
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    try {
      await removeFriend.mutateAsync(friendId);
      toast.success("Friend removed");
      refetchFriends();
    } catch {
      toast.error("Failed to remove friend");
    }
  };

  const handleSendRequest = async (profileId: number) => {
    try {
      await sendRequest.mutateAsync(profileId);
      toast.success("Friend request sent!");
      refetchSent();
    } catch {
      toast.error("Failed to send request");
    }
  };

  if (requestsLoading || sentLoading || friendsLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Friends</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">Manage your connections</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass min-h-[400px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading friends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Friends</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage your connections</p>
        </div>
        <button
          onClick={() => navigate({ to: "/app/dating" })}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-elevated"
        >
          <Search className="h-4 w-4" />
          Find Friends
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "text-primary-foreground")} />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={cn(
                  "h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold",
                  isActive ? "bg-primary/20 text-primary-foreground" : "bg-surface text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-3">
        {activeTab === "requests" && (
          <>
            {requestsData?.requests?.length === 0 ? (
              <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                  <UserPlus className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold">No friend requests</h3>
                <p className="mt-1 text-sm text-muted-foreground">When someone sends you a request, it'll appear here</p>
              </div>
            ) : (
              requestsData?.requests?.map((request: any) => (
                <FriendRequestCard
                  key={request.id}
                  request={request}
                  onAccept={() => handleAccept(request.id)}
                  onReject={() => handleReject(request.id)}
                />
              ))
            )}
          </>
        )}

        {activeTab === "sent" && (
          <>
            {sentData?.requests?.length === 0 ? (
              <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10">
                  <UserPlus className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold">No sent requests</h3>
                <p className="mt-1 text-sm text-muted-foreground">Your sent friend requests will appear here</p>
              </div>
            ) : (
              sentData?.requests?.map((request: any) => (
                <SentRequestCard key={request.id} request={request} />
              ))
            )}
          </>
        )}

        {activeTab === "friends" && (
          <>
            {friendsData?.friends?.length === 0 ? (
              <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <Users className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold">No friends yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Accept friend requests or send new ones to build your network</p>
                <button
                  onClick={() => navigate({ to: "/app/dating" })}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
                >
                  <UserPlus className="h-4 w-4" />
                  Find Friends
                </button>
              </div>
            ) : (
              friendsData?.friends?.map((friend: any) => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onChat={() => navigate({ to: `/app/dating/chat/${friend.friend_id}` })}
                  onRemove={() => handleRemoveFriend(String(friend.friend_id))}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FriendRequestCard({ request, onAccept, onReject }: any) {
  return (
    <div className="rounded-2xl border border-border glass p-4 animate-fade-up">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/20">
            <span className="text-2xl">{request.sender_emoji || "👤"}</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">{request.sender_name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {request.sender_branch} • {request.sender_year}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Sent {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReject}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
            aria-label="Decline"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={onAccept}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90"
            aria-label="Accept"
          >
            <CheckCircle2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SentRequestCard({ request }: any) {
  return (
    <div className="rounded-2xl border border-border glass p-4 animate-fade-up">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface">
            <span className="text-2xl">{request.receiver_emoji || "👤"}</span>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500">
            <Clock className="h-3 w-3 text-amber-500-foreground" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">{request.receiver_name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {request.receiver_branch} • {request.receiver_year}
          </p>
          <p className="mt-1 text-xs text-amber-400">
            Pending • Sent {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
          Pending
        </span>
      </div>
    </div>
  );
}

function FriendCard({ friend, onChat, onRemove }: any) {
  return (
    <div className="rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/20">
            <span className="text-2xl">{friend.friend_emoji || "👤"}</span>
          </div>
          {friend.friend_is_verified && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
              <Heart className="h-2.5 w-2.5 fill-current text-primary-foreground" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold truncate">{friend.friend_name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {friend.branch} • {friend.year}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onChat}
            className="p-2 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition"
            aria-label="Chat"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            onClick={onRemove}
            className="p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition"
            aria-label="Remove friend"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}