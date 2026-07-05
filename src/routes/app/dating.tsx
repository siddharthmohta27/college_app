import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, X, Sparkles, MessageSquare, Star, Award, Shield } from "lucide-react";

export const Route = createFileRoute("/app/dating")({
  head: () => ({
    meta: [{ title: "Campus Match — Campus Connect" }],
  }),
  component: CampusDating,
});

type Profile = {
  id: number;
  name: string;
  age: number;
  year: string;
  major: string;
  bio: string;
  interests: string[];
  emoji: string;
  verified: boolean;
};

const PROFILES: Profile[] = [
  { id: 1, name: "Anjali Sharma", age: 20, year: "3rd Year", major: "Design", bio: "Always sketchin' in class. Coffee lover, indie music fan, and looking for someone to review campus cafes with!", interests: ["Art", "Indie Rock", "Cafes", "UI/UX"], emoji: "🎨", verified: true },
  { id: 2, name: "Vikram Sen", age: 21, year: "4th Year", major: "Mechanical Eng.", bio: "Car enthusiast, amateur guitar player, and gym regular. Let's study (or skip lectures) together.", interests: ["Gym", "Guitars", "Anime", "Formula 1"], emoji: "🎸", verified: false },
  { id: 3, name: "Kavya Iyer", age: 19, year: "2nd Year", major: "Economics", bio: "If you love debate, board games, and late night chai, we will probably get along. Bookworm 📚", interests: ["Chai", "Debating", "Chess", "Reading"], emoji: "♟️", verified: true },
  { id: 4, name: "Rohan Varma", age: 20, year: "3rd Year", major: "Computer Science", bio: "I build websites and compile errors for fun. Let's match if you want someone to debug your life.", interests: ["Coding", "Hackathons", "Valorant", "Memes"], emoji: "💻", verified: true },
  { id: 5, name: "Tanya Kapoor", age: 20, year: "3rd Year", major: "English Lit.", bio: "Poetry, street photography, and vintage vinyl records are my jam. Tell me your favorite movie?", interests: ["Poetry", "Cinema", "Vinyls", "Travel"], emoji: "📷", verified: false },
];

function CampusDating() {
  const [profileIndex, setProfileIndex] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const activeProfile = PROFILES[profileIndex];

  const handleAction = (like: boolean) => {
    if (like) {
      // Simulate random matching chance (70% for demo purposes)
      if (Math.random() > 0.3) {
        setMatchedProfile(activeProfile);
        setMatches((prev) => [...prev, activeProfile]);
        setShowMatchModal(true);
      }
    }
    nextProfile();
  };

  const nextProfile = () => {
    setProfileIndex((prev) => (prev + 1) % PROFILES.length);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Campus Match</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Find study partners, coffee buddies, or matches on campus</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Swiper card */}
        <div className="md:col-span-2 space-y-4">
          {activeProfile ? (
            <div className="relative overflow-hidden rounded-2xl border border-border glass p-6 flex flex-col justify-between min-h-[460px] animate-fade-up">
              {/* Top info */}
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{activeProfile.emoji}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-bold">{activeProfile.name}, {activeProfile.age}</h3>
                        {activeProfile.verified && (
                          <Shield className="h-4 w-4 fill-primary text-primary-foreground shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{activeProfile.year} · {activeProfile.major}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <Sparkles className="h-3 w-3" /> Campus Match
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">About</h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">{activeProfile.bio}</p>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProfile.interests.map((interest) => (
                      <span key={interest} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  id="dating-pass-btn"
                  onClick={() => handleAction(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:bg-red-500/10 hover:border-red-500/40 text-red-400 transition"
                >
                  <X className="h-6 w-6" />
                </button>
                <button
                  id="dating-like-btn"
                  onClick={() => handleAction(true)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition glow-primary"
                >
                  <Heart className="h-7 w-7 fill-current" />
                </button>
                <button
                  onClick={nextProfile}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition"
                >
                  <Star className="h-5 w-5 fill-current" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-border glass p-8 text-center min-h-[460px] flex flex-col justify-center items-center">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <h3 className="mt-4 font-bold">Looking for more students...</h3>
              <p className="mt-1 text-sm text-muted-foreground">You have viewed all active profiles on campus today.</p>
            </div>
          )}
        </div>

        {/* Sidebar list of Matches */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border glass p-5">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Heart className="h-4 w-4 text-primary fill-current" /> Your Matches ({matches.length})
            </h3>
            {matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((match) => (
                  <div key={match.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition hover:bg-surface-elevated">
                    <span className="text-2xl shrink-0">{match.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold truncate">{match.name}</h4>
                      <p className="text-[10px] text-muted-foreground truncate">{match.major}</p>
                    </div>
                    <button className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground hover:opacity-90">
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-muted-foreground">Swipe on profiles to find a match!</p>
              </div>
            )}
          </div>

          {/* Safety card */}
          <div className="rounded-2xl border border-border bg-yellow-500/5 p-4 text-xs text-primary flex items-start gap-3">
            <Award className="h-4 w-4 shrink-0 mt-0.5" />
            <p><strong>Campus Safety First:</strong> All profiles are verified with active college emails. Always meet in public spots on campus.</p>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-primary/30 glass-strong p-6 text-center animate-fade-up">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-4xl animate-bounce">
              🎉
            </div>
            <h3 className="mt-4 text-xl font-bold">It's a Match!</h3>
            <p className="mt-2 text-sm text-muted-foreground">You and <strong className="text-foreground">{matchedProfile.name}</strong> liked each other.</p>

            <div className="my-6 flex justify-center gap-4">
              <div className="text-5xl">⚡</div>
              <div className="text-5xl">{matchedProfile.emoji}</div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowMatchModal(false)}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
              >
                Send a Message
              </button>
              <button
                onClick={() => setShowMatchModal(false)}
                className="w-full rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
