import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShoppingBag,
  UtensilsCrossed,
  MessageSquare,
  Calendar,
  BookOpen,
  TrendingUp,
  Bell,
  Clock,
  Megaphone,
  ChevronRight,
  Zap,
  Star,
  Heart,
  CheckSquare,
  FileText,
  GraduationCap,
  CalendarDays,
  MapPin,
  User,
  FlaskConical,
} from "lucide-react";
import { TodaysOverview } from "@/components/dashboard/todays-overview";
import { useState, useEffect } from "react";
import { firebaseAuth } from "@/lib/firebase";
import { parsePecEmail } from "@/lib/pec-email";
import { getSectionFromRollNo, getTimetableForSection, getTodaySchedule, getNextClass } from "@/lib/pec-timetable";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Dashboard — Campus Connect" }],
  }),
  component: Dashboard,
});

const ANNOUNCEMENTS = [
  {
    id: 1,
    badge: "Exam",
    badgeColor: "bg-red-500/10 text-red-400 border border-red-500/20",
    title: "End Semester Exams Start July 14",
    time: "2 hours ago",
    urgent: true,
  },
  {
    id: 2,
    badge: "Holiday",
    badgeColor: "bg-yellow-500/10 text-primary border border-yellow-500/20",
    title: "College closed on July 8 — Holiday",
    time: "5 hours ago",
    urgent: false,
  },
  {
    id: 3,
    badge: "Fee",
    badgeColor: "bg-red-500/10 text-red-400 border border-red-500/20",
    title: "Last date to pay semester fees: July 10",
    time: "Yesterday",
    urgent: true,
  },
  {
    id: 4,
    badge: "Event",
    badgeColor: "bg-yellow-500/10 text-primary border border-yellow-500/20",
    title: "Tech Fest 2026 registrations now open!",
    time: "2 days ago",
    urgent: false,
  },
];

const QUICK_LINKS = [
  {
    to: "/app/timetable",
    label: "My Timetable",
    icon: CalendarDays,
    iconColor: "text-primary",
    count: "Auto-detected by section",
  },
  {
    to: "/app/marketplace",
    label: "Marketplace",
    icon: ShoppingBag,
    iconColor: "text-primary",
    count: "24 new listings",
  },
  {
    to: "/app/canteen",
    label: "Canteen Menu",
    icon: UtensilsCrossed,
    iconColor: "text-primary",
    count: "Lunch: 12:00 - 2:30",
  },
  {
    to: "/app/chat",
    label: "Campus Chat",
    icon: MessageSquare,
    iconColor: "text-primary",
    count: "12 unread",
  },
  {
    to: "/app/clubs",
    label: "Clubs & Events",
    icon: Calendar,
    iconColor: "text-primary",
    count: "3 events this week",
  },
  {
    to: "/app/study",
    label: "Study Rooms",
    icon: BookOpen,
    iconColor: "text-primary",
    count: "2 rooms available",
  },
  {
    to: "/app/dating",
    label: "Campus Match",
    icon: Heart,
    iconColor: "text-primary",
    count: "Dating / swiping matches",
  },
  {
    to: "/app/attendance",
    label: "Attendance Tracker",
    icon: CheckSquare,
    iconColor: "text-primary",
    count: "82% overall avg",
  },
  {
    to: "/app/resources",
    label: "Academic Resources",
    icon: FileText,
    iconColor: "text-primary",
    count: "Syllabus, notes, papers",
  },
];

const TRENDING = [
  { text: "DS Lab files due tonight — share in #assignments", tag: "CS Dept", time: "14 min ago" },
  { text: "NVIDIA GPU for sale — ₹18,000 OBO", tag: "Marketplace", time: "32 min ago" },
  { text: "Today's Special lunch: Paneer Butter Masala", tag: "Canteen", time: "1 hr ago" },
  { text: "Coding Club hackathon — register by Sunday", tag: "Events", time: "3 hr ago" },
];

function TodaysScheduleWidget() {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((u) => {
      setEmail(u?.email ?? null);
      setDisplayName(u?.displayName ?? null);
    });
    return unsub;
  }, []);

  const profile = parsePecEmail(email, displayName);
  const section = getSectionFromRollNo(profile.rollNo);
  const timetable = section ? getTimetableForSection(section) : null;
  const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
  const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

  function fmt(t: string) {
    const [h, m] = t.split(":").map(Number);
    const suffix = h < 12 ? "AM" : "PM";
    const d = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${d}:${m.toString().padStart(2, "0")} ${suffix}`;
  }

  return (
    <section className="animate-fade-up">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <CalendarDays className="h-4 w-4 text-primary" /> Today's Classes
        </h2>
        <Link to="/app/timetable" className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
          Full Timetable <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="rounded-2xl border border-border glass p-4">
        {!section ? (
          <p className="text-sm text-muted-foreground">Update your roll number in profile to see your timetable.</p>
        ) : !timetable ? (
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-surface-elevated">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold">Section {section}</div>
              <div className="text-xs text-muted-foreground">Timetable not yet uploaded</div>
            </div>
          </div>
        ) : isWeekend ? (
          <p className="text-sm text-muted-foreground">Weekend — no classes today! 🎉</p>
        ) : !nextInfo ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <div className="text-sm font-semibold">All done for today!</div>
              <div className="text-xs text-muted-foreground">No more classes today</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
              nextInfo.slot.slot?.type === "lab"
                ? "bg-violet-500/10 border-violet-500/30 text-violet-400"
                : "bg-primary/10 border-primary/30 text-primary"
            }`}>
              {nextInfo.slot.slot?.type === "lab"
                ? <FlaskConical className="h-4 w-4" />
                : <BookOpen className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                  nextInfo.status === "ongoing" ? "bg-emerald-500 text-white animate-pulse" : "bg-primary/20 text-primary"
                }`}>
                  {nextInfo.status === "ongoing" ? "Live Now" : "Up Next"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {fmt(nextInfo.slot.start)} – {fmt(nextInfo.slot.end)}
                </span>
              </div>
              <div className="mt-0.5 text-sm font-bold">{nextInfo.slot.slot?.subject}</div>
              <div className="mt-0.5 flex gap-3 text-[11px] text-muted-foreground">
                {nextInfo.slot.slot?.room && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{nextInfo.slot.slot.room}</span>}
                {nextInfo.slot.slot?.faculty && <span className="flex items-center gap-1"><User className="h-3 w-3" />{nextInfo.slot.slot.faculty}</span>}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[10px] text-muted-foreground">Section</div>
              <div className="text-sm font-bold text-primary">{section}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
        setDisplayName(user.displayName);
      }
    });
    return unsub;
  }, []);

  const profile = parsePecEmail(email, displayName);

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 pb-24 md:pb-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-yellow-500/5 p-6 animate-fade-up">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-8 bottom-0 opacity-5 text-primary">
          <GraduationCapBig />
        </div>
        <div className="relative">
          <p className="text-sm text-muted-foreground">{greeting} 👋</p>
          <h2 className="mt-1 text-2xl font-bold">{profile.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.yearLabel} · {profile.branch} · Roll No. {profile.rollNo}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary">
              <Zap className="h-3 w-3" /> End Semester Exams Coming Up
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary">
              <Star className="h-3 w-3" /> Batch of {profile.batch} ({profile.degree})
            </span>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Unread Messages", value: "12", icon: MessageSquare, color: "text-primary" },
          { label: "Active Listings", value: "3", icon: ShoppingBag, color: "text-primary" },
          { label: "Events This Week", value: "5", icon: Calendar, color: "text-primary" },
          { label: "Study Hours Today", value: "2.5h", icon: Clock, color: "text-primary" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border glass p-4 animate-fade-up card-hover"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <stat.icon className={`h-5 w-5 ${stat.color} icon-hover`} />
            <div
              className="mt-2 text-2xl font-bold stat-count"
              style={{ animationDelay: `${i * 60 + 200}ms` }}
            >
              {stat.value}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      <TodaysOverview />

      <TodaysScheduleWidget />

      {/* Quick nav cards */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <GraduationCap className="h-4 w-4 text-primary" /> Navigation
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map(({ to, label, icon: Icon, iconColor, count }, i) => (
            <Link
              key={to}
              to={to}
              id={`dashboard-${label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className="group flex items-center gap-4 rounded-2xl border border-border glass p-4 transition duration-200 animate-fade-up card-hover"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-elevated transition-transform duration-150 group-hover:scale-105">
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-foreground">{label}</div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">{count}</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom two-col grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Announcements */}
        <section className="animate-fade-up">
          <h2 className="mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Megaphone className="h-4 w-4 text-primary" /> Announcements
          </h2>
          <div className="space-y-2.5">
            {ANNOUNCEMENTS.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-3.5 transition hover:bg-surface-elevated ${a.urgent ? "border-red-500/20 bg-red-500/5" : "border-border glass"}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${a.badgeColor}`}
                  >
                    {a.badge}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug">{a.title}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                  {a.urgent && <Bell className="h-3.5 w-3.5 shrink-0 text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending on campus */}
        <section className="animate-fade-up">
          <h2 className="mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <TrendingUp className="h-4 w-4 text-primary" /> Trending on Campus
          </h2>
          <div className="space-y-2.5">
            {TRENDING.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border glass p-3.5 transition hover:bg-surface-elevated"
              >
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug">{t.text}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded bg-surface px-1.5 py-0.5 text-[9px] text-muted-foreground border border-border">
                      {t.tag}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{t.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function GraduationCapBig() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
