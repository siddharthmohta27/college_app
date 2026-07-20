import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  Loader2,
  Calendar,
  MapPin,
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  Rocket,
  MapPin as MapPinIcon,
  TrendingUp,
  Sparkles,
  Clock,
  Coffee,
  X,
  Filter,
  Check,
  MoreHorizontal,
  Code,
  Zap,
  BookOpen,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { firebaseAuth } from "@/lib/firebase";
import { useEvents, useRsvpToEvent, useMyRsvps } from "@/hooks/use-dating-api";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dating/events")({
  head: () => ({
    meta: [{ title: "Events — Campus Match" }],
  }),
  component: EventsPage,
});

const EVENT_TYPES = [
  {
    value: "hackathon",
    label: "Hackathon",
    icon: Code,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  { value: "sports", label: "Sports", icon: Zap, color: "text-green-400", bg: "bg-green-500/10" },
  {
    value: "pec_fest",
    label: "PEC Fest",
    icon: Sparkles,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    value: "startup_fair",
    label: "Startup Fair",
    icon: Rocket,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    value: "coding_contest",
    label: "Coding Contest",
    icon: Coffee,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    value: "seminar",
    label: "Seminar",
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    value: "workshop",
    label: "Workshop",
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  { value: "other", label: "Other", icon: Calendar, color: "text-gray-400", bg: "bg-gray-500/10" },
];

function EventsPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "my_rsvps">("upcoming");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { data: events = [], isLoading, refetch } = useEvents(undefined, activeTab === "upcoming");
  const { data: myRsvps = [] } = useMyRsvps();
  const rsvpEvent = useRsvpToEvent();

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

  const filteredEvents =
    selectedTypes.length > 0 ? events.filter((e) => selectedTypes.includes(e.event_type)) : events;

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleRsvp = async (eventId: number, status: "going" | "interested" | "not_going") => {
    try {
      await rsvpEvent.mutateAsync({ eventId: eventId.toString(), status });
      toast.success(
        status === "going" ? "Going!" : status === "interested" ? "Interested" : "Not going",
      );
    } catch {
      toast.error("Failed to RSVP");
    }
  };

  const getMyRsvpStatus = (eventId: number) => {
    const rsvp = myRsvps.find((r) => r.id === eventId);
    return rsvp?.status || "none";
  };

  const getEventTypeConfig = (type: string) => {
    return EVENT_TYPES.find((t) => t.value === type) || EVENT_TYPES[7];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
        <div className="animate-fade-up flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold">Events</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Discover and RSVP to campus events
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border glass p-4 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 skeleton rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 skeleton rounded" />
                  <div className="h-3 w-1/2 skeleton rounded" />
                  <div className="h-8 w-full skeleton rounded" />
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
          <h2 className="text-xl font-bold">Events</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Discover and RSVP to campus events</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              showFilters || selectedTypes.length > 0
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters{" "}
            {selectedTypes.length > 0 && (
              <span className="h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                {selectedTypes.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
        {[
          { id: "upcoming", label: "Upcoming", icon: Calendar },
          { id: "past", label: "Past", icon: Clock },
          { id: "my_rsvps", label: "My RSVPs", icon: Check },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="rounded-xl border border-border bg-surface/50 p-4 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Filter by Event Type
            </h3>
            {selectedTypes.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTypes([])}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.slice(0, 7).map(({ value, label, icon: Icon, color, bg }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleTypeToggle(value)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selectedTypes.includes(value)
                    ? `${color} ${bg} border border-current/30`
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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-border glass p-12 text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold">No events found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs mx-auto">
              {selectedTypes.length > 0
                ? "Try adjusting your filters or check back later!"
                : "No events scheduled right now. Check back soon!"}
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const config = getEventTypeConfig(event.event_type);
            const Icon = config.icon;
            const myStatus = getMyRsvpStatus(event.id);
            const isGoing = myStatus === "going";
            const isInterested = myStatus === "interested";

            return (
              <div
                key={event.id}
                className="rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${config.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{event.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {config.label} • {event.location || "Location TBD"}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(event.start_time)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(event.start_time)}
                          </span>
                          {event.end_time && (
                            <span className="flex items-center gap-1">
                              <span>–</span>
                              <Clock className="h-3 w-3" />
                              {formatTime(event.end_time)}
                            </span>
                          )}
                        </div>
                      </div>
                      {event.max_attendees && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                          <Users className="h-3 w-3" />
                          {event.rsvp_count || 0}/{event.max_attendees}
                        </span>
                      )}
                    </div>

                    {event.description && (
                      <p className="mt-2 text-sm text-foreground/80 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    {/* RSVP Actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleRsvp(event.id, "going")}
                        disabled={rsvpEvent.isPending}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          isGoing
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-surface text-muted-foreground hover:border-primary hover:text-primary border-border"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                        {isGoing ? "Going" : "Going"}
                      </button>
                      <button
                        onClick={() => handleRsvp(event.id, "interested")}
                        disabled={rsvpEvent.isPending}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          isInterested
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-surface text-muted-foreground hover:border-primary hover:text-primary border-border"
                        }`}
                      >
                        <Heart className="h-3 w-3" />
                        {isInterested ? "Interested" : "Interested"}
                      </button>
                      <button
                        onClick={() => handleRsvp(event.id, "not_going")}
                        disabled={rsvpEvent.isPending}
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-rose-500/30 hover:text-rose-400"
                      >
                        <X className="h-3 w-3" />
                        Not Going
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
