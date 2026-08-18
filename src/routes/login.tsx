import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { firebaseAuth, isValidPecEmail, isValidAnyEmail } from "@/lib/firebase";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Campus Connect" },
      { name: "description", content: "Sign in to Campus Connect with your college or fresher email." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [isFresherMode, setIsFresherMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in redirect to app
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) navigate({ to: "/app" });
    });
    return unsub;
  }, [navigate]);

  const friendlyError = (code: string, message?: string) => {
    if (message && message.includes("@pec.edu.in")) {
      return message;
    }
    const map: Record<string, string> = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
      "auth/popup-closed-by-user": "Google sign-in was cancelled.",
      "auth/network-request-failed": "Network error. Check your internet connection.",
    };
    return map[code] ?? message ?? "Something went wrong. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!isFresherMode && !isValidPecEmail(cleanEmail)) {
      setError("Please enter a valid @pec.edu.in email ID, or click below if you are a Fresher without a PEC ID.");
      return;
    }

    if (isFresherMode && !isValidAnyEmail(cleanEmail)) {
      setError("Please enter a valid email address (e.g. name@gmail.com).");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await firebaseAuth.signUp(cleanEmail, password, name, isFresherMode);
      } else {
        await firebaseAuth.signIn(cleanEmail, password, isFresherMode);
      }
      navigate({ to: "/app" });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const msg = (err as { message?: string }).message;
      setError(friendlyError(code, msg));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await firebaseAuth.signInWithGoogle(true);
      navigate({ to: "/app" });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const msg = (err as { message?: string }).message;
      setError(friendlyError(code, msg));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background p-4 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-up">
        {/* Logo & Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 border border-primary/25 shadow-sm">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Campus Connect</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Punjab Engineering College · Student Portal & Community
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-border glass p-6 sm:p-8 shadow-xl">
          {/* Tab toggle */}
          <div className="mb-5 flex rounded-xl border border-border bg-surface p-1">
            <button
              id="signin-tab"
              type="button"
              onClick={() => {
                setMode("signin");
                setError(null);
              }}
              className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition ${
                mode === "signin"
                  ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              id="signup-tab"
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground shadow-sm glow-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Mode banner indicator */}
          <div className="mb-4">
            {isFresherMode ? (
              <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="font-semibold">Fresher Mode (Any Email)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsFresherMode(false);
                    setError(null);
                  }}
                  className="text-[11px] underline hover:text-amber-400 font-medium"
                >
                  Use PEC ID
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs text-primary">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span className="font-medium">Primary: Punjab Engineering College ID</span>
              </div>
            )}
          </div>

          {/* Error notice */}
          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm text-rose-400 animate-in fade-in duration-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-semibold text-muted-foreground"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Siddharth Mohta"
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-muted-foreground"
                >
                  {isFresherMode ? "Personal / Any Email ID" : "PEC Email ID"}
                </label>
                {!isFresherMode && (
                  <span className="text-[10px] font-mono text-primary font-medium">@pec.edu.in</span>
                )}
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isFresherMode
                      ? "yourname@gmail.com"
                      : "xxxx@pec.edu.in"
                  }
                  required
                  className={`w-full rounded-xl border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-1 ${
                    isFresherMode
                      ? "border-amber-500/40 focus:border-amber-500 focus:ring-amber-500/30"
                      : "border-border focus:border-primary focus:ring-primary/30 font-medium"
                  }`}
                />
              </div>
              {!isFresherMode && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Default primary flow: Enter your official PEC email ID.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="submit-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 glow-primary flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin"
                ? isFresherMode
                  ? "Sign In (Fresher Access)"
                  : "Sign In with PEC ID"
                : isFresherMode
                  ? "Create Fresher Account"
                  : "Create Account with PEC ID"}
            </button>
          </form>

          {/* Secondary Fresher Option (Prominent yet visually lighter) */}
          {!isFresherMode ? (
            <div className="mt-4 pt-3 border-t border-border/60">
              <button
                type="button"
                id="fresher-toggle-btn"
                onClick={() => {
                  setIsFresherMode(true);
                  setError(null);
                }}
                className="w-full text-left group p-3 rounded-xl border border-dashed border-border hover:border-primary/40 bg-surface/50 hover:bg-surface-elevated transition duration-200"
              >
                <div className="flex items-start gap-2.5">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform mt-0.5">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      New / Fresher and don't have your PEC ID yet?
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                      Continue with any email to access the unofficial college dashboard & Orientation guide.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsFresherMode(false);
                  setError(null);
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline font-medium"
              >
                ← Already have an official @pec.edu.in ID? Switch back
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google Sign In */}
          <button
            id="google-signin-btn"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface py-2.5 text-sm font-medium transition hover:bg-surface-elevated disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
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
            )}
            Continue with Google
          </button>

          <p className="mt-5 text-center text-[11px] text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
