import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Users,
  Search,
  MapPin,
  Clock,
  Tag,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

export const Route = createFileRoute("/app/clubs")({
  head: () => ({
    meta: [{ title: "Clubs & Events — Campus Connect" }],
  }),
  component: ClubsEvents,
});

type Club = {
  id: number;
  name: string;
  category: string;
  description: string;
  members: number;
  emoji: string;
  gradient: string;
  joined: boolean;
  tags: string[];
};

type Event = {
  id: number;
  title: string;
  clubName: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  emoji: string;
  rsvpd: boolean;
  spots: number;
  spotsLeft: number;
};

const CLUB_CATEGORIES = ["All", "Tech", "Cultural", "Sports", "Social", "Arts"];

const CLUBS: Club[] = [
  {
    id: 1,
    name: "Coding Club",
    category: "Tech",
    description: "Competitive programming, hackathons and open-source contributions.",
    members: 342,
    emoji: "💻",
    gradient: "from-primary/20 to-violet-500/10",
    joined: true,
    tags: ["Hackathons", "CP", "Open Source"],
  },
  {
    id: 2,
    name: "AI/ML Society",
    category: "Tech",
    description: "Exploring machine learning, deep learning and AI research papers.",
    members: 218,
    emoji: "🤖",
    gradient: "from-cyan-500/20 to-blue-500/10",
    joined: false,
    tags: ["ML", "Research", "Python"],
  },
  {
    id: 3,
    name: "Drama Club",
    category: "Cultural",
    description: "Annual theatre productions, improv sessions and acting workshops.",
    members: 156,
    emoji: "🎭",
    gradient: "from-pink-500/20 to-rose-500/10",
    joined: false,
    tags: ["Theatre", "Acting", "Improv"],
  },
  {
    id: 4,
    name: "Cricket Club",
    category: "Sports",
    description: "Inter-college tournaments, practice sessions and weekend matches.",
    members: 89,
    emoji: "🏏",
    gradient: "from-emerald-500/20 to-teal-500/10",
    joined: true,
    tags: ["Cricket", "Tournaments", "Practice"],
  },
  {
    id: 5,
    name: "Photography Club",
    category: "Arts",
    description: "Photo walks, editing workshops and annual college magazine shots.",
    members: 134,
    emoji: "📸",
    gradient: "from-amber-500/20 to-orange-500/10",
    joined: false,
    tags: ["DSLR", "Editing", "Photo walks"],
  },
  {
    id: 6,
    name: "NSS Cell",
    category: "Social",
    description: "Social service camps, blood donation drives and community outreach.",
    members: 450,
    emoji: "🤝",
    gradient: "from-rose-500/20 to-pink-500/10",
    joined: false,
    tags: ["Service", "Camps", "Leadership"],
  },
  {
    id: 7,
    name: "Music Society",
    category: "Arts",
    description: "Classical and western music, band rehearsals and annual fest performances.",
    members: 201,
    emoji: "🎸",
    gradient: "from-violet-500/20 to-purple-500/10",
    joined: false,
    tags: ["Band", "Classical", "Fest"],
  },
  {
    id: 8,
    name: "Debate Club",
    category: "Cultural",
    description: "MUN simulations, parliamentary debates and public speaking training.",
    members: 112,
    emoji: "🗣️",
    gradient: "from-sky-500/20 to-indigo-500/10",
    joined: false,
    tags: ["MUN", "Debate", "Public Speaking"],
  },
];

const EVENTS: Event[] = [
  {
    id: 1,
    title: "HackNight 2026 — 24hr Hackathon",
    clubName: "Coding Club",
    date: "July 8",
    time: "8:00 PM – July 9, 8:00 PM",
    venue: "Innovation Lab, Block C",
    category: "Tech",
    emoji: "⚡",
    rsvpd: true,
    spots: 100,
    spotsLeft: 23,
  },
  {
    id: 2,
    title: "AI Paper Reading Session",
    clubName: "AI/ML Society",
    date: "July 9",
    time: "5:00 PM – 7:00 PM",
    venue: "Seminar Hall 2",
    category: "Tech",
    emoji: "🤖",
    rsvpd: false,
    spots: 50,
    spotsLeft: 18,
  },
  {
    id: 3,
    title: "Open Mic Night — Season 4",
    clubName: "Music Society",
    date: "July 11",
    time: "7:00 PM – 10:00 PM",
    venue: "College Amphitheatre",
    category: "Arts",
    emoji: "🎤",
    rsvpd: false,
    spots: 200,
    spotsLeft: 67,
  },
  {
    id: 4,
    title: "Blood Donation Drive",
    clubName: "NSS Cell",
    date: "July 12",
    time: "9:00 AM – 3:00 PM",
    venue: "Main Hall, Ground Floor",
    category: "Social",
    emoji: "🩸",
    rsvpd: false,
    spots: 150,
    spotsLeft: 89,
  },
  {
    id: 5,
    title: "Inter-Dept Cricket Match",
    clubName: "Cricket Club",
    date: "July 13",
    time: "7:00 AM – 12:00 PM",
    venue: "Sports Ground",
    category: "Sports",
    emoji: "🏏",
    rsvpd: true,
    spots: 22,
    spotsLeft: 4,
  },
];

const categoryColors: Record<string, string> = {
  Tech: "bg-primary/20 text-primary",
  Cultural: "bg-pink-500/20 text-pink-400",
  Sports: "bg-emerald-500/20 text-emerald-400",
  Social: "bg-rose-500/20 text-rose-400",
  Arts: "bg-amber-500/20 text-amber-400",
};

function ClubsEvents() {
  const [tab, setTab] = useState<"clubs" | "events">("clubs");
  const [catFilter, setCatFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState(CLUBS);
  const [events, setEvents] = useState(EVENTS);

  const filteredClubs = clubs.filter((c) => {
    const matchCat = catFilter === "All" || c.category === catFilter;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleJoin = (id: number) =>
    setClubs((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 }
          : c,
      ),
    );

  const toggleRSVP = (id: number) =>
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, rsvpd: !e.rsvpd, spotsLeft: e.rsvpd ? e.spotsLeft + 1 : e.spotsLeft - 1 }
          : e,
      ),
    );

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Clubs & Events</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Discover communities and upcoming events on campus
        </p>
      </div>

      {/* Tab toggle */}
      <div className="flex rounded-xl border border-border bg-surface p-1 animate-fade-up w-fit">
        {(["clubs", "events"] as const).map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            onClick={() => setTab(t)}
            className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition ${
              tab === t
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "clubs" ? "🏛️ Clubs" : "📅 Events"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative animate-fade-up">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={`${tab}-search`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tab === "clubs" ? "Search clubs..." : "Search events..."}
          className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>

      {/* Category filter for clubs */}
      {tab === "clubs" && (
        <div className="flex flex-wrap gap-2 animate-fade-up">
          {CLUB_CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`clubcat-${cat.toLowerCase()}`}
              onClick={() => setCatFilter(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                catFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Clubs grid */}
      {tab === "clubs" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredClubs.map((club, i) => (
            <div
              key={club.id}
              id={`club-${club.id}`}
              className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${club.gradient} p-5 animate-fade-up card-hover`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{club.emoji}</span>
                  <div>
                    <h3 className="font-bold">{club.name}</h3>
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${categoryColors[club.category] ?? "bg-surface text-muted-foreground"}`}
                    >
                      {club.category}
                    </span>
                  </div>
                </div>
                <button
                  id={`join-club-${club.id}`}
                  onClick={() => toggleJoin(club.id)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition btn-press ${
                    club.joined
                      ? "bg-primary/20 text-primary"
                      : "bg-surface-elevated border border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {club.joined ? "✓ Joined" : "+ Join"}
                </button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {club.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {club.members} members
                </div>
                <div className="flex flex-wrap gap-1">
                  {club.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface/60 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events list */}
      {tab === "events" && (
        <div className="space-y-4">
          {events
            .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
            .map((event, i) => {
              const spotsPct = ((event.spots - event.spotsLeft) / event.spots) * 100;
              const almostFull = event.spotsLeft < 10;
              return (
                <div
                  key={event.id}
                  id={`event-${event.id}`}
                  className="group overflow-hidden rounded-2xl border border-border glass p-5 animate-fade-up card-hover"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface-elevated text-3xl">
                      {event.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h3 className="font-bold leading-tight">{event.title}</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground">{event.clubName}</p>
                        </div>
                        <button
                          id={`rsvp-event-${event.id}`}
                          onClick={() => toggleRSVP(event.id)}
                          className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition btn-press ${
                            event.rsvpd
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {event.rsvpd && <CheckCircle className="h-3.5 w-3.5" />}
                          {event.rsvpd ? "RSVP'd" : "RSVP Now"}
                        </button>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary/60" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 text-primary/60" />
                          {event.time.split("–")[0].trim()}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary/60" />
                          {event.venue}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>
                            {event.spots - event.spotsLeft} / {event.spots} spots filled
                          </span>
                          {almostFull && (
                            <span className="text-amber-400 font-semibold">
                              ⚠ Only {event.spotsLeft} left!
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated">
                          <div
                            className={`h-full rounded-full transition-all ${almostFull ? "bg-amber-500" : "bg-primary"}`}
                            style={{ width: `${spotsPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
