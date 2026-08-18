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
  fullName?: string;
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

const CLUB_CATEGORIES = ["All", "Technical", "Cultural", "Entrepreneurship", "Editorial"];

const CLUBS: Club[] = [
  // ── Technical Societies ─────────────────────────────────────────
  {
    id: 1,
    name: "ASCE",
    fullName: "American Society of Civil Engineers",
    category: "Technical",
    description: "Civil engineering innovations, structural design challenges, concrete canoe, CAD workshops & site visits.",
    members: 245,
    emoji: "🏗️",
    gradient: "from-blue-500/20 to-sky-500/10",
    joined: false,
    tags: ["Civil", "Structures", "Design"],
  },
  {
    id: 2,
    name: "ASME",
    fullName: "American Society of Mechanical Engineers",
    category: "Technical",
    description: "Mechanical engineering, CAD/CAM design, robotics, aeromodelling and global engineering competitions.",
    members: 310,
    emoji: "⚙️",
    gradient: "from-amber-500/20 to-orange-500/10",
    joined: false,
    tags: ["Mechanical", "CAD/CAM", "Robotics"],
  },
  {
    id: 3,
    name: "ASPS",
    fullName: "Astronomy & Space Physics Society",
    category: "Technical",
    description: "Stargazing night sky sessions, astrophysics discussions, telescope handling and space science quizzes.",
    members: 195,
    emoji: "🌌",
    gradient: "from-indigo-500/20 to-violet-500/10",
    joined: false,
    tags: ["Astronomy", "Astrophysics", "Stargazing"],
  },
  {
    id: 4,
    name: "ATS",
    fullName: "Aero Technical Society",
    category: "Technical",
    description: "RC planes, aeromodelling, drone development, flight mechanics and national aviation competitions.",
    members: 220,
    emoji: "✈️",
    gradient: "from-cyan-500/20 to-blue-500/10",
    joined: false,
    tags: ["Aerospace", "Drones", "RC Planes"],
  },
  {
    id: 5,
    name: "IEEE",
    fullName: "Institute of Electrical and Electronics Engineers",
    category: "Technical",
    description: "Electronics, embedded systems, signal processing, IoT, research paper publishing and hackathons.",
    members: 410,
    emoji: "⚡",
    gradient: "from-sky-500/20 to-indigo-500/10",
    joined: true,
    tags: ["Electrical", "Electronics", "IoT"],
  },
  {
    id: 6,
    name: "IIM",
    fullName: "Indian Institute of Metals",
    category: "Technical",
    description: "Materials science, metallurgy workshops, industrial research and advanced materials characterization.",
    members: 160,
    emoji: "🔬",
    gradient: "from-teal-500/20 to-emerald-500/10",
    joined: false,
    tags: ["Metallurgy", "Materials", "Research"],
  },
  {
    id: 7,
    name: "IGS",
    fullName: "Indian Geotechnical Society",
    category: "Technical",
    description: "Soil mechanics, foundation engineering, geotechnical research, surveying and earth sciences.",
    members: 140,
    emoji: "🌍",
    gradient: "from-emerald-500/20 to-teal-500/10",
    joined: false,
    tags: ["Geotech", "Soil Mechanics", "Surveys"],
  },
  {
    id: 8,
    name: "Robotics Society",
    fullName: "Robotics & Automation Society",
    category: "Technical",
    description: "Autonomous bots, combat robotics, microcontrollers, ROS, computer vision and Robowars in PECFEST.",
    members: 380,
    emoji: "🤖",
    gradient: "from-primary/20 to-violet-500/10",
    joined: true,
    tags: ["Robotics", "Hardware", "Robowars"],
  },
  {
    id: 9,
    name: "SAE",
    fullName: "Society of Automotive Engineers",
    category: "Technical",
    description: "Formula Student, BAJA SAE, electric vehicle design, chassis fabrication and engine tuning.",
    members: 290,
    emoji: "🏎️",
    gradient: "from-rose-500/20 to-orange-500/10",
    joined: false,
    tags: ["Automotive", "BAJA", "EV"],
  },
  {
    id: 10,
    name: "SME",
    fullName: "Society of Manufacturing Engineers",
    category: "Technical",
    description: "Advanced manufacturing, 3D printing, CNC machining, rapid prototyping and production technology.",
    members: 175,
    emoji: "🏭",
    gradient: "from-slate-500/20 to-zinc-500/10",
    joined: false,
    tags: ["Manufacturing", "3D Printing", "CNC"],
  },
  {
    id: 11,
    name: "SESI",
    fullName: "Solar Energy Society of India",
    category: "Technical",
    description: "Renewable solar energy projects, photovoltaic installations, sustainability and green campus drives.",
    members: 155,
    emoji: "☀️",
    gradient: "from-amber-500/20 to-yellow-500/10",
    joined: false,
    tags: ["Solar", "Clean Energy", "Green Tech"],
  },
  {
    id: 12,
    name: "ACM CSS",
    fullName: "Association for Computing Machinery (Computer Science Society)",
    category: "Technical",
    description: "Competitive programming, open source, AI/ML, web development, algorithms and premier college hackathons.",
    members: 490,
    emoji: "💻",
    gradient: "from-violet-500/20 to-purple-500/10",
    joined: true,
    tags: ["CP", "DSA", "Hackathons", "WebDev"],
  },

  // ── Cultural Clubs ──────────────────────────────────────────────
  {
    id: 13,
    name: "APC",
    fullName: "Art & Photography Club",
    category: "Cultural",
    description: "Fine arts, digital painting, photography walks, photo editing, college magazine shoots & exhibitions.",
    members: 230,
    emoji: "🎨",
    gradient: "from-fuchsia-500/20 to-pink-500/10",
    joined: false,
    tags: ["Art", "Photography", "Painting"],
  },
  {
    id: 14,
    name: "Music Club",
    fullName: "Music Club",
    category: "Cultural",
    description: "Vocal and instrumental, jamming sessions, rock band performances, classical music and PECFEST concerts.",
    members: 280,
    emoji: "🎸",
    gradient: "from-purple-500/20 to-pink-500/10",
    joined: true,
    tags: ["Band", "Vocals", "Guitar", "Jamming"],
  },
  {
    id: 15,
    name: "Dramatics Club",
    fullName: "Dramatics Club",
    category: "Cultural",
    description: "Annual stage plays, nukkad natak (street play), monoacts, script writing and acting workshops.",
    members: 210,
    emoji: "🎭",
    gradient: "from-pink-500/20 to-rose-500/10",
    joined: false,
    tags: ["Theatre", "Street Play", "Acting"],
  },
  {
    id: 16,
    name: "SAASC",
    fullName: "Speakers Association & Study Circle",
    category: "Cultural",
    description: "Parliamentary debates, Model United Nations (MUN), extempore, GDs, group discussions and public speaking.",
    members: 225,
    emoji: "🎙️",
    gradient: "from-blue-500/20 to-indigo-500/10",
    joined: false,
    tags: ["Debating", "MUN", "Public Speaking"],
  },
  {
    id: 17,
    name: "PDC",
    fullName: "Projection & Design Club",
    category: "Cultural",
    description: "Stage visual mapping, graphic designing, UI/UX, video editing, after-effects and fest production.",
    members: 190,
    emoji: "📽️",
    gradient: "from-cyan-500/20 to-teal-500/10",
    joined: false,
    tags: ["Design", "Video Editing", "VFX"],
  },
  {
    id: 18,
    name: "Rotaract Club",
    fullName: "Rotaract Club of PEC",
    category: "Cultural",
    description: "Youth empowerment, community outreach, blood donation camps, environmental initiatives and social leadership.",
    members: 320,
    emoji: "🤝",
    gradient: "from-rose-500/20 to-pink-500/10",
    joined: false,
    tags: ["Social Service", "Leadership", "Outreach"],
  },
  {
    id: 19,
    name: "CIM",
    fullName: "Communication, Information & Media Cell",
    category: "Cultural",
    description: "Official campus media, journalism, newsletters, social media PR, interviewing and PEC event coverage.",
    members: 205,
    emoji: "📰",
    gradient: "from-amber-500/20 to-red-500/10",
    joined: false,
    tags: ["Media", "Journalism", "PR"],
  },

  // ── Entrepreneurship ───────────────────────────────────────────
  {
    id: 20,
    name: "EIC",
    fullName: "Entrepreneurship & Incubation Cell",
    category: "Entrepreneurship",
    description: "Startups, innovation, incubation, mentorship, networking, Startup Fair, E-Summit, pitch events and SproutX startup funding.",
    members: 450,
    emoji: "🚀",
    gradient: "from-emerald-500/20 to-cyan-500/10",
    joined: true,
    tags: ["Startups", "Funding", "E-Summit", "SproutX"],
  },

  // ── Editorial Boards ────────────────────────────────────────────
  {
    id: 21,
    name: "English Editorial Board",
    fullName: "English Editorial Board (EEB)",
    category: "Editorial",
    description: "Creative writing, literature, poetry, essays, PEC annual magazine editorial and blog publishing.",
    members: 130,
    emoji: "✍️",
    gradient: "from-sky-500/20 to-blue-500/10",
    joined: false,
    tags: ["Writing", "Magazine", "Literature"],
  },
  {
    id: 22,
    name: "Hindi Editorial Board",
    fullName: "Hindi Editorial Board (HEB)",
    category: "Editorial",
    description: "Kavita lekhan, sahitya charcha, Hindi creative writing, natak lekhan aur college magazine Hindi anubhaag.",
    members: 115,
    emoji: "📖",
    gradient: "from-orange-500/20 to-amber-500/10",
    joined: false,
    tags: ["Hindi", "Sahitya", "Kavita"],
  },
  {
    id: 23,
    name: "Punjabi Editorial Board",
    fullName: "Punjabi Editorial Board (PEB)",
    category: "Editorial",
    description: "Punjabi sahitya, cultural essays, Punjabi poetry, Maa Boli promotions and college magazine Punjabi section.",
    members: 110,
    emoji: "📜",
    gradient: "from-yellow-500/20 to-amber-500/10",
    joined: false,
    tags: ["Punjabi", "Culture", "Poetry"],
  },
];

const EVENTS: Event[] = [
  {
    id: 1,
    title: "Freshers Orientation 2026 — Day 1: Welcome & Director's Address",
    clubName: "PEC Administration & Student Council",
    date: "Aug 19, 2026",
    time: "9:00 AM – 1:00 PM",
    venue: "Main Auditorium, PEC",
    category: "Orientation",
    emoji: "🎉",
    rsvpd: true,
    spots: 850,
    spotsLeft: 42,
  },
  {
    id: 2,
    title: "Freshers Orientation 2026 — Day 2: Academic Curriculum & Branch Mentorship",
    clubName: "Dean Academics & HoDs",
    date: "Aug 20, 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Respective Branch Lecture Theatres (Annexure 1)",
    category: "Orientation",
    emoji: "🎓",
    rsvpd: true,
    spots: 850,
    spotsLeft: 60,
  },
  {
    id: 3,
    title: "Freshers Orientation 2026 — Day 3: Technical & Cultural Clubs Fair",
    clubName: "Clubs & Societies Council",
    date: "Aug 21, 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Open Air Theatre & Student Centre",
    category: "Orientation",
    emoji: "🎪",
    rsvpd: false,
    spots: 850,
    spotsLeft: 120,
  },
  {
    id: 4,
    title: "Freshers Orientation 2026 — Day 4: Life at PEC & Campus Heritage Tour",
    clubName: "Student Council & Alumni Cell",
    date: "Aug 22, 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Central Library & Heritage Campus Grounds",
    category: "Orientation",
    emoji: "🏛️",
    rsvpd: false,
    spots: 850,
    spotsLeft: 95,
  },
  {
    id: 5,
    title: "Freshers Orientation 2026 — Day 5: Sports, Fitness & NCC/NSS Orientation",
    clubName: "Sports Department & NSS Cell",
    date: "Aug 23, 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "PEC Sports Complex & Gymnasium",
    category: "Orientation",
    emoji: "🏆",
    rsvpd: false,
    spots: 850,
    spotsLeft: 140,
  },
  {
    id: 6,
    title: "Freshers Orientation 2026 — Day 6: Innovation, Startups & EIC SproutX Fair",
    clubName: "Entrepreneurship & Incubation Cell (EIC)",
    date: "Aug 24, 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Siemens Centre of Excellence & EIC Hub",
    category: "Orientation",
    emoji: "🚀",
    rsvpd: true,
    spots: 850,
    spotsLeft: 75,
  },
  {
    id: 7,
    title: "Freshers Orientation 2026 — Day 7: Valedictory Ceremony & Cultural Evening",
    clubName: "Cultural Clubs Council",
    date: "Aug 25, 2026",
    time: "9:00 AM – 6:00 PM",
    venue: "Main Auditorium, PEC",
    category: "Orientation",
    emoji: "✨",
    rsvpd: true,
    spots: 850,
    spotsLeft: 18,
  },
];

const categoryColors: Record<string, string> = {
  Technical: "bg-primary/20 text-primary",
  Cultural: "bg-pink-500/20 text-pink-400",
  Entrepreneurship: "bg-emerald-500/20 text-emerald-400",
  Editorial: "bg-amber-500/20 text-amber-400",
  Orientation: "bg-cyan-500/20 text-cyan-400",
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
      (c.fullName && c.fullName.toLowerCase().includes(search.toLowerCase())) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
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
          Official Technical Societies, Cultural Clubs, Entrepreneurship & Editorial Boards of Punjab Engineering College
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
            {t === "clubs" ? "🏛️ Official Clubs (23)" : "📅 Orientation Events (7)"}
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
          placeholder={tab === "clubs" ? "Search clubs (e.g. ASCE, EIC, Music Club, Robotics)..." : "Search orientation events..."}
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
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0 mt-0.5">{club.emoji}</span>
                  <div>
                    <h3 className="font-bold text-foreground text-base leading-tight">{club.name}</h3>
                    {club.fullName && club.fullName !== club.name && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{club.fullName}</p>
                    )}
                    <span
                      className={`inline-block mt-1.5 rounded-md px-2 py-0.5 text-[10px] font-semibold ${categoryColors[club.category] ?? "bg-surface text-muted-foreground"}`}
                    >
                      {club.category}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {club.description}
              </p>
              <div className="mt-3.5 flex items-center justify-end">
                <div className="flex flex-wrap gap-1.5">
                  {club.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface/70 border border-border/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
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
            .map((event, i) => (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className="group overflow-hidden rounded-2xl border border-border glass p-5 animate-fade-up card-hover"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface-elevated text-3xl">
                    {event.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-bold text-foreground text-base leading-tight">{event.title}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground font-medium">{event.clubName}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                        Official Event
                      </span>
                    </div>
                    <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary/70 shrink-0" />
                        <span className="font-medium text-foreground">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary/70 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary/70 shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
