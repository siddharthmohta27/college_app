import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Bell,
  Heart,
  Users,
  MessageSquare,
  Sparkles,
  Camera,
  X,
  Check,
  Loader2,
  MoreVertical,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { firebaseAuth } from "@/lib/firebase";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/hooks/use-dating-api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dating/notifications")({
  head: () => ({
    meta: [{ title: "Notifications — Campus Match" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const { data: notificationsData, isLoading, refetch } = useNotifications(50, filter === "unread");
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notificationsData?.unreadCount || 0;

  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "friend_request":
        return <Users className="h-5 w-5 text-blue-400" />;
      case "friend_accepted":
        return <Users className="h-5 w-5 text-emerald-400" />;
      case "match":
        return <Heart className="h-5 w-5 fill-current text-rose-400" />;
      case "prompt_like":
        return <Sparkles className="h-5 w-5 text-purple-400" />;
      case "photo_like":
        return <Camera className="h-5 w-5 text-amber-400" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "friend_request":
        return "bg-blue-500/10 border-blue-500/20";
      case "friend_accepted":
        return "bg-emerald-500/10 border-emerald-500/20";
      case "match":
        return "bg-rose-500/10 border-rose-500/20";
      case "prompt_like":
        return "bg-purple-500/10 border-purple-500/20";
      case "photo_like":
        return "bg-amber-500/10 border-amber-500/20";
      case "message":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-surface border-border";
    }
  };

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    if (!notification.is_read) {
      markRead.mutate(String(notification.id));
    }

    // Navigate based on type
    switch (notification.type) {
      case "friend_request":
      case "friend_accepted":
        navigate({ to: "/app/dating/friends" });
        break;
      case "match":
        navigate({ to: "/app/dating/matches" });
        break;
      case "prompt_like":
      case "photo_like":
        if (notification.data?.likerProfileId) {
          navigate({ to: `/app/dating/profile/${notification.data.likerProfileId}` });
        }
        break;
      case "message":
        navigate({ to: "/app/chat" });
        break;
    }
  };

  const handleMarkAllRead = async () => {
    await markAllRead.mutateAsync();
    toast.success("All notifications marked as read");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Stay updated with your Campus Match activity
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border glass min-h-[400px] flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold">Notifications</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Stay updated with your Campus Match activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markAllRead.isPending}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50"
            >
              <Check className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition",
            filter === "all"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition",
            filter === "unread"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Unread{" "}
          {unreadCount > 0 && (
            <span className="ml-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-primary/20 text-primary-foreground text-[10px] font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold">No notifications</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "unread"
                ? "You're all caught up!"
                : "No notifications yet. You'll see them here when you get matches, friend requests, or likes."}
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              icon={getNotificationIcon(notification.type)}
              color={getNotificationColor(notification.type)}
              onClick={() => handleNotificationClick(notification)}
              onMarkRead={() => markRead.mutate(String(notification.id))}
            />
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <p className="text-center text-xs text-muted-foreground py-4">Pull to refresh</p>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: any;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
  onMarkRead: () => void;
}

function NotificationItem({
  notification,
  icon,
  color,
  onClick,
  onMarkRead,
}: NotificationItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group flex items-start gap-3 rounded-xl border p-4 transition hover:shadow-lg",
        notification.is_read ? "opacity-70" : "ring-1 ring-primary/30",
        color,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate">{notification.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">{notification.body}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[10px] text-muted-foreground">
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
            </span>
            {!notification.is_read && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead();
                }}
                className="p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition opacity-0 group-hover:opacity-100"
                aria-label="Mark as read"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
        {notification.data && Object.keys(notification.data).length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">{JSON.stringify(notification.data)}</p>
        )}
      </div>
    </div>
  );
}
