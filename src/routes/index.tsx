import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  ShoppingBag,
  Users,
  ArrowRight,
  Mail,
  Lock,
  GraduationCap,
  UtensilsCrossed,
  BookOpen,
  Calendar,
  MessageSquare,
  Zap,
  Loader2,
} from "lucide-react";
import { supabase, supabaseAuth } from "@/lib/supabase";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Connect — Your College, All in One Place" },
      {
        name: "description",
        content:
          "Campus Connect brings together your college marketplace, canteen menu, chat, clubs, and study rooms in one premium app.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [mode, setMode] = useState<"landing" | "login" | "signup">("landing");
  const navigate = useNavigate();

  const handleAuthSubmit = async (
    e: React.FormEvent,
    type: "login" | "signup",
    formData: { email: string; password: string; name?: string; college?: string },
  ) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      let result;

      if (type === "signup") {
        result = await supabaseAuth.signUp(formData.email, formData.password, {
          full_name: formData.name,
          college: formData.college,
        });
      } else {
        result = await supabaseAuth.signIn(formData.email, formData.password);
      }

      if (result.error) {
        setAuthError(result.error.message);
        return;
      }

      // Wait for session to be established
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate({ to: "/app" });
      }
    } catch (err) {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setAuthError(error.message);
        setAuthLoading(false);
      }
      // OAuth redirects - won't reach here
    } catch (err) {
      setAuthError("Google sign-in failed. Please try again.");
      setAuthLoading(false);
    }
  };

  // Auth form state
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    college: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setAuthError(null);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    handleAuthSubmit(e, "signup", formData);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    handleAuthSubmit(e, "login", formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-20"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/20 animate-pulse-glow">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight">Campus Connect</span>
          <span className="ml-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase text-primary">
            beta
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">
            Features
          </a>
          <a href="#marketplace" className="hover:text-foreground transition">
            Marketplace
          </a>
          <a href="#canteen" className="hover:text-foreground transition">
            Canteen
          </a>
          <a href="#community" className="hover:text-foreground transition">
            Community
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            id="signin-btn"
            onClick={() => {
              setMode("login");
              setAuthError(null);
            }}
            className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </button>
          <button
            id="getstarted-btn"
            onClick={() => {
              setMode("signup");
              setAuthError(null);
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-primary"
          >
            Get started
          </button>
        </div>
      </header>

      {mode === "landing" ? (
        <main className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Hero */}
          <section className="pt-16 pb-24 text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>Your entire college life, in one place</span>
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Your campus, <span className="gradient-text">supercharged</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Marketplace, canteen menus, real-time chat, club events and study rooms — everything
              your college life needs, beautifully unified.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                id="hero-getstarted-btn"
                onClick={() => {
                  setMode("signup");
                  setAuthError(null);
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
              >
                Join Campus Connect
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  setMode("login");
                  setAuthError(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-border glass px-7 py-3.5 text-sm font-semibold transition hover:bg-surface-elevated"
              >
                Sign in
              </button>
            </div>

            {/* Mini preview badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: ShoppingBag, label: "Marketplace", color: "text-primary" },
                { icon: UtensilsCrossed, label: "Canteen Menu", color: "text-primary" },
                { icon: MessageSquare, label: "Campus Chat", color: "text-primary" },
                { icon: Calendar, label: "Club Events", color: "text-primary" },
                { icon: BookOpen, label: "Study Rooms", color: "text-primary" },
              ].map(({ icon: Icon, label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
                >
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  {label}
                </span>
              ))}
            </div>
          </section>

          {/* Feature grid */}
          <section id="features" className="pb-24">
            <h2 className="mb-10 text-center text-2xl font-bold">Everything your college needs</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ShoppingBag,
                  title: "Student Marketplace",
                  desc: "Buy, sell and swap textbooks, electronics, dorm gear and event tickets across your campus. Safe, fast, peer-to-peer.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "marketplace",
                },
                {
                  icon: UtensilsCrossed,
                  title: "Canteen Menu",
                  desc: "View today's breakfast, lunch, snacks and dinner menu in real time. Pre-order meals and never wait in line again.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "canteen",
                },
                {
                  icon: MessageSquare,
                  title: "Campus Chat",
                  desc: "Department channels, study group DMs, event chats and voice rooms — all in one Discord-style experience.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "chat",
                },
                {
                  icon: Calendar,
                  title: "Clubs & Events",
                  desc: "Discover and join clubs — tech, cultural, sports and more. RSVP to events and get reminders before they start.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "clubs",
                },
                {
                  icon: BookOpen,
                  title: "Study Rooms",
                  desc: "Book a study room, fire up a Pomodoro timer, and collaborate with classmates on shared notes — all in one tab.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "study",
                },
                {
                  icon: Zap,
                  title: "Campus Announcements",
                  desc: "Never miss an important notice. Exam schedules, fee deadlines, holidays and emergency alerts — all curated for you.",
                  color: "text-primary",
                  glow: "group-hover:bg-primary/10",
                  id: "announcements",
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  id={`feature-${f.id}`}
                  className="group relative overflow-hidden rounded-2xl glass p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition duration-500 ${f.glow}`}
                  />
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-elevated`}
                  >
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats strip */}
          <section
            id="community"
            className="mb-24 rounded-3xl glass-strong neon-border p-8 md:p-12"
          >
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold">Trusted by students across campuses</h2>
            </div>
            <div className="grid gap-8 text-center md:grid-cols-4">
              {[
                ["50+", "Colleges"],
                ["12k+", "Students"],
                ["3.2k", "Marketplace Listings"],
                ["99.9%", "Uptime"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold gradient-text sm:text-4xl">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="pb-10 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Campus Connect. Built for students, by students.
          </footer>
        </main>
      ) : (
        <AuthCard
          mode={mode}
          setMode={setMode}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          authError={authError}
          setAuthError={setAuthError}
          authLoading={authLoading}
          handleSignupSubmit={handleSignupSubmit}
          handleLoginSubmit={handleLoginSubmit}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      )}
    </div>
  );
}

function AuthCard({
  mode,
  setMode,
  formData,
  setFormData,
  handleChange,
  authError,
  setAuthError,
  authLoading,
  handleSignupSubmit,
  handleLoginSubmit,
  handleGoogleSignIn,
}: {
  mode: "login" | "signup";
  setMode: (m: "landing" | "login" | "signup") => void;
  formData: { email: string; password: string; name: string; college: string };
  setFormData: (d: { email: string; password: string; name: string; college: string }) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  authError: string | null;
  setAuthError: (e: string | null) => void;
  authLoading: boolean;
  handleSignupSubmit: (e: React.FormEvent) => void;
  handleLoginSubmit: (e: React.FormEvent) => void;
  handleGoogleSignIn: () => void;
}) {
  const isSignup = mode === "signup";

  return (
    <main className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 pt-8 pb-16">
      <div className="w-full rounded-3xl glass-strong neon-border p-8 shadow-elevated animate-fade-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 animate-pulse-glow">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">
            {isSignup ? "Join Campus Connect" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup ? "Create your student account" : "Sign in to your campus"}
          </p>
        </div>

        {authError && (
          <div className="mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-sm text-rose-400">
            {authError}
          </div>
        )}

        <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit} className="space-y-4">
          {isSignup && (
            <Field
              label="Full name"
              icon={<Users className="h-4 w-4" />}
              type="text"
              id="signup-name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          {isSignup && (
            <Field
              label="College / University"
              icon={<GraduationCap className="h-4 w-4" />}
              type="text"
              id="signup-college"
              name="college"
              placeholder="e.g. IIT Delhi, Delhi University"
              value={formData.college}
              onChange={handleChange}
            />
          )}
          <Field
            label="College email"
            icon={<Mail className="h-4 w-4" />}
            type="email"
            id="auth-email"
            name="email"
            placeholder="you@university.edu"
            value={formData.email}
            onChange={handleChange}
          />
          <Field
            label="Password"
            icon={<Lock className="h-4 w-4" />}
            type="password"
            id="auth-password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            id="auth-submit-btn"
            type="submit"
            disabled={authLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary disabled:opacity-50"
          >
            {authLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isSignup ? "Creating account..." : "Signing in..."}
              </>
            ) : (
              <>
                {isSignup ? "Create account" : "Sign in"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          id="google-auth-btn"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={authLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to Campus Connect? "}
          <button
            className="font-medium text-accent hover:underline"
            onClick={() => {
              setMode(isSignup ? "login" : "signup");
              setFormData({ email: "", password: "", name: "", college: "" });
            }}
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>

      <button
        onClick={() => {
          setMode("landing");
          setAuthError(null);
          setFormData({ email: "", password: "", name: "", college: "" });
        }}
        className="mt-6 text-xs text-muted-foreground hover:text-foreground"
      >
        ← Back home
      </button>
    </main>
  );
}

function Field({
  label,
  icon,
  id,
  name,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
  id: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          {...props}
          id={id}
          name={name}
          required
          className="w-full rounded-xl border border-border bg-input/60 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </label>
  );
}
