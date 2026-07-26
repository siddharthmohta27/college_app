import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  MessageSquare,
  Calendar,
  BookOpen,
  GraduationCap,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  Heart,
  CheckSquare,
  FileText,
  LogOut,
  User,
  CalendarDays,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SearchProvider } from "@/components/search";
import { SearchTrigger } from "@/components/search";
import { SearchOverlay } from "@/components/search";
import { FloatingActionButton } from "@/components/fab";
import { firebaseAuth, isValidPecEmail } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { UserProfileModal } from "@/components/user-profile-modal";
import { parsePecEmail } from "@/lib/pec-email";

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    if (!auth) {
      console.warn("Firebase not configured — skipping auth check");
      return { userId: null, email: null, displayName: null };
    }
    const user = auth.currentUser;
    if (!user || !isValidPecEmail(user.email)) {
      throw new Error("UNAUTHORIZED");
    }
    // Return plain serializable data only (no Firebase User object)
    return { userId: user.uid, email: user.email, displayName: user.displayName };
  },
  component: AppShell,
});

const NAV_ITEMS = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/app/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/app/canteen", label: "Canteen", icon: UtensilsCrossed },
  { to: "/app/chat", label: "Chat", icon: MessageSquare },
  { to: "/app/clubs", label: "Clubs & Events", icon: Calendar },
  { to: "/app/study", label: "Study Rooms", icon: BookOpen },
  { to: "/app/dating", label: "Campus Match", icon: Heart },
  { to: "/app/attendance", label: "Attendance", icon: CheckSquare },
  { to: "/app/resources", label: "Resources", icon: FileText },
];

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const location = useLocation();
  const loaderData = Route.useLoaderData() as
    { userId: string | null; email: string | null; displayName: string | null } | undefined;
  const [displayName, setDisplayName] = useState<string | null>(loaderData?.displayName ?? null);
  const [email, setEmail] = useState<string | null>(loaderData?.email ?? null);

  // Keep user state in sync with Firebase auth
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((fbUser) => {
      if (fbUser && !isValidPecEmail(fbUser.email)) {
        firebaseAuth.signOut().then(() => {
          window.location.href = "/login";
        });
        return;
      }
      setDisplayName(fbUser?.displayName ?? null);
      setEmail(fbUser?.email ?? null);
    });
    return unsub;
  }, []);

  const pecProfile = parsePecEmail(email, displayName);

  const initials =
    pecProfile.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "PEC";

  const currentPage = NAV_ITEMS.find((n) =>
    n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to),
  );

  const handleSignOut = async () => {
    await firebaseAuth.signOut();
    window.location.href = "/login";
  };

  return (
    <SearchProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface/80 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5">
            <Link to="/app" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/20 animate-pulse-glow">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight">Campus Connect</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  PEC Chandigarh
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-muted-foreground transition hover:text-foreground md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick search button */}
          <div className="px-4 pb-3">
            <SearchTrigger />
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
            {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
              const active = exact ? location.pathname === to : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition duration-150 ${
                    active
                      ? "bg-primary text-primary-foreground font-semibold glow-primary"
                      : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                    <span>{label}</span>
                  </div>
                  {active && (
                    <ChevronRight className="h-3.5 w-3.5 text-primary/60 transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User profile bottom */}
          <div className="border-t border-border px-4 py-3">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-surface-elevated group"
              title="View Profile"
            >
              <div className="relative">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
                  {initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pecProfile.name}
                </div>
                <div className="truncate text-[10px] text-muted-foreground">
                  {pecProfile.branch} · {pecProfile.rollNo}
                </div>
              </div>
            </button>
            <button
              onClick={handleSignOut}
              className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between border-b border-border bg-background/60 px-5 py-3.5 backdrop-blur">
            <div className="flex items-center gap-3">
              <button
                id="sidebar-toggle-btn"
                className="text-muted-foreground transition hover:text-foreground md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-sm font-semibold">{currentPage?.label ?? "Campus Connect"}</h1>
                <p className="text-[10px] text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="notifications-btn"
                className="relative grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground icon-hover"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary bell-pulse" />
              </button>
              <button
                onClick={() => setProfileModalOpen(true)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground transition hover:opacity-90 hover:scale-105"
                title="View Profile"
              >
                {initials}
              </button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>

        {/* Profile Modal */}
        <UserProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          email={email}
          displayName={displayName}
          onSignOut={handleSignOut}
        />

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-border bg-surface/90 backdrop-blur-xl md:hidden">
          {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[9px] transition ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                <span className="font-medium">{label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <SearchOverlay />
      <FloatingActionButton />
    </SearchProvider>
  );
}
