import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles, Clock } from "lucide-react";

export const Route = createFileRoute("/app/dating")({
  head: () => ({
    meta: [{ title: "Campus Match — Campus Connect" }],
  }),
  component: CampusMatch,
});

function CampusMatch() {
  return (
    <div className="flex min-h-[calc(100vh-57px-60px)] flex-col items-center justify-center p-6 md:min-h-[calc(100vh-57px)]">
      <div className="animate-fade-up w-full max-w-sm text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 backdrop-blur">
            <Heart className="h-9 w-9 text-primary" fill="currentColor" />
          </div>
          <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-amber-400 animate-bounce" />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold">Campus Match</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Connect with study partners, coffee buddies &amp; more — right on campus.
        </p>

        {/* Coming Soon badge */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Coming Soon</span>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          We're putting the finishing touches on this feature. Stay tuned! 🚀
        </p>
      </div>
    </div>
  );
}
