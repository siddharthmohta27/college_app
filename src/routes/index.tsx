import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Zap, ShoppingBag, Users, ArrowRight, Github, Mail, Lock, GraduationCap } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [mode, setMode] = useState<"landing" | "login" | "signup">("landing");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/chat" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover opacity-30"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Nexus" className="h-9 w-9 animate-float" width={40} height={40} />
          <span className="text-lg font-semibold tracking-tight">Nexus</span>
          <span className="ml-2 rounded-full border border-border bg-surface/60 px-2 py-0.5 text-[10px] font-mono uppercase text-muted-foreground">beta</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#marketplace" className="hover:text-foreground transition">Marketplace</a>
          <a href="#community" className="hover:text-foreground transition">Community</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("login")}
            className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            Sign in
          </button>
          <button
            onClick={() => setMode("signup")}
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
              <span>Built for the next generation of students</span>
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Your campus,{" "}
              <span className="gradient-text">reimagined</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Real-time chat, study groups, a student marketplace and more —
              wrapped in a futuristic experience made for college life.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setMode("signup")}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
              >
                Launch Nexus
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-xl border border-border glass px-6 py-3 text-sm font-semibold transition hover:bg-surface-elevated"
              >
                Try the demo
              </Link>
            </div>
          </section>

          {/* Feature grid */}
          <section id="features" className="grid gap-6 pb-24 md:grid-cols-3">
            {[
              { icon: Zap, title: "Real-time chat", desc: "Discord-style servers, channels, DMs and voice — instant and lag-free.", color: "text-neon-cyan" },
              { icon: ShoppingBag, title: "Student marketplace", desc: "Buy, sell and swap textbooks, tickets and dorm gear across campus.", color: "text-neon-violet" },
              { icon: Users, title: "Study rooms", desc: "Focus timers, shared whiteboards and note channels for every class.", color: "text-neon-pink" },
            ].map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
                <f.icon className={`h-8 w-8 ${f.color}`} />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </section>

          {/* Stats strip */}
          <section id="community" className="mb-24 rounded-3xl glass-strong neon-border p-8 md:p-12">
            <div className="grid gap-8 text-center md:grid-cols-4">
              {[
                ["120+", "Campuses"],
                ["48k", "Students"],
                ["1.2M", "Messages / day"],
                ["99.9%", "Uptime"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold gradient-text sm:text-4xl">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </section>

          <footer className="pb-10 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nexus. Built for students, by students.
          </footer>
        </main>
      ) : (
        <AuthCard mode={mode} setMode={setMode} onSubmit={submit} />
      )}
    </div>
  );
}

function AuthCard({
  mode,
  setMode,
  onSubmit,
}: {
  mode: "login" | "signup";
  setMode: (m: "landing" | "login" | "signup") => void;
  onSubmit: (e: React.FormEvent) => void;
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
            {isSignup ? "Join Nexus" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup ? "Create your student account" : "Sign in to your campus"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {isSignup && (
            <Field label="Full name" icon={<Users className="h-4 w-4" />} type="text" placeholder="Ada Lovelace" />
          )}
          <Field label="College email" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@university.edu" />
          <Field label="Password" icon={<Lock className="h-4 w-4" />} type="password" placeholder="••••••••" />

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
          >
            {isSignup ? "Create account" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialBtn icon={<Github className="h-4 w-4" />} label="GitHub" />
          <SocialBtn icon={<Mail className="h-4 w-4" />} label="Google" />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to Nexus? "}
          <button
            className="font-medium text-accent hover:underline"
            onClick={() => setMode(isSignup ? "login" : "signup")}
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>

      <button
        onClick={() => setMode("landing")}
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
  ...props
}: { label: string; icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          {...props}
          required
          className="w-full rounded-xl border border-border bg-input/60 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
    </label>
  );
}

function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated"
    >
      {icon}
      {label}
    </button>
  );
}
