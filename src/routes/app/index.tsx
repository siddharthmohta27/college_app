import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShoppingBag, UtensilsCrossed, MessageSquare, Calendar, BookOpen,
  TrendingUp, Bell, Clock, Megaphone, ChevronRight, Zap, Star,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "Dashboard — Campus Connect" }],
  }),
  component: Dashboard,
});

const ANNOUNCEMENTS = [
  { id: 1, badge: "Exam", badgeColor: "bg-rose-500/20 text-rose-400", title: "End Semester Exams Start July 14", time: "2 hours ago", urgent: true },
  { id: 2, badge: "Holiday", badgeColor: "bg-emerald-500/20 text-emerald-400", title: "College closed on July 8 — Muharram", time: "5 hours ago", urgent: false },
  { id: 3, badge: "Fee", badgeColor: "bg-amber-500/20 text-amber-400", title: "Last date to pay semester fees: July 10", time: "Yesterday", urgent: true },
  { id: 4, badge: "Event", badgeColor: "bg-primary/20 text-primary", title: "Tech Fest 2026 registrations now open!", time: "2 days ago", urgent: false },
];

const QUICK_LINKS = [
  { to: "/app/marketplace", label: "Marketplace", icon: ShoppingBag, color: "from-violet-500/20 to-violet-600/10", iconColor: "text-neon-violet", count: "24 new listings" },
  { to: "/app/canteen", label: "Canteen Menu", icon: UtensilsCrossed, color: "from-cyan-500/20 to-cyan-600/10", iconColor: "text-neon-cyan", count: "Lunch: 12:00 - 2:30" },
  { to: "/app/chat", label: "Campus Chat", icon: MessageSquare, color: "from-pink-500/20 to-pink-600/10", iconColor: "text-neon-pink", count: "12 unread" },
  { to: "/app/clubs", label: "Clubs & Events", icon: Calendar, color: "from-accent/20 to-accent/10", iconColor: "text-accent", count: "3 events this week" },
  { to: "/app/study", label: "Study Rooms", icon: BookOpen, color: "from-primary/20 to-primary/10", iconColor: "text-primary", count: "2 rooms available" },
];

const TRENDING = [
  { text: "DS Lab files due tonight — share in #assignments", tag: "CS Dept", time: "14 min ago" },
  { text: "NVIDIA GPU for sale — ₹18,000 OBO", tag: "Marketplace", time: "32 min ago" },
  { text: "Tonight's dinner: Paneer Butter Masala 🔥", tag: "Canteen", time: "1 hr ago" },
  { text: "Coding Club hackathon — register by Sunday", tag: "Events", time: "3 hr ago" },
];

function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 pb-24 md:pb-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-2xl neon-border p-6 glass-strong animate-fade-up">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-8 bottom-0 opacity-10">
          <GraduationCapBig />
        </div>
        <div className="relative">
          <p className="text-sm text-muted-foreground">{greeting} 👋</p>
          <h2 className="mt-1 text-2xl font-bold">Siddharth Mohta</h2>
          <p className="mt-1 text-sm text-muted-foreground">3rd Year · Computer Science · Roll No. CS21B027</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs text-primary">
              <Zap className="h-3 w-3" /> 8 days to exams
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">
              <Star className="h-3 w-3" /> CGPA: 8.6
            </span>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Unread Messages", value: "12", icon: MessageSquare, color: "text-neon-pink" },
          { label: "Active Listings", value: "3", icon: ShoppingBag, color: "text-neon-violet" },
          { label: "Events This Week", value: "5", icon: Calendar, color: "text-accent" },
          { label: "Study Hours Today", value: "2.5h", icon: Clock, color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl glass p-4 animate-fade-up">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <div className="mt-2 text-2xl font-bold">{stat.value}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Quick nav cards */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          <TrendingUp className="h-4 w-4" /> Quick Access
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map(({ to, label, icon: Icon, color, iconColor, count }, i) => (
            <Link
              key={to}
              to={to}
              id={`dashboard-${label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-br ${color} border border-border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg animate-fade-up`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface/60 backdrop-blur">
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm">{label}</div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">{count}</div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom two-col grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Announcements */}
        <section className="animate-fade-up">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <Megaphone className="h-4 w-4" /> Announcements
          </h2>
          <div className="space-y-2">
            {ANNOUNCEMENTS.map((a) => (
              <div key={a.id} className={`rounded-xl border p-3.5 transition hover:bg-surface-elevated ${a.urgent ? "border-rose-500/30 bg-rose-500/5" : "border-border glass"}`}>
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${a.badgeColor}`}>
                    {a.badge}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                  {a.urgent && <Bell className="h-3.5 w-3.5 shrink-0 text-rose-400" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending on campus */}
        <section className="animate-fade-up">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" /> Trending on Campus
          </h2>
          <div className="space-y-2">
            {TRENDING.map((t, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border glass p-3.5 transition hover:bg-surface-elevated">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/15 text-[10px] font-bold text-primary">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug">{t.text}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-md bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground">{t.tag}</span>
                    <span className="text-[10px] text-muted-foreground">{t.time}</span>
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
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );
}
