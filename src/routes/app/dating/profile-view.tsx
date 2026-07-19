import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ChevronLeft, ChevronRight, Heart, X, Star, MessageSquare, Share2, Flag, Shield, MapPin, Briefcase, BookOpen, Music, Coffee, Globe, Linkedin, Github, Instagram, MoreHorizontal, Loader2, Users, GraduationCap, Briefcase as BriefcaseIcon, Rocket, Sparkles, MapPin as MapPinIcon, TrendingUp, Clock, Zap,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useProfile } from "@/hooks/use-dating-api";
import { ProfileCard } from "@/components/dating/ProfileCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/dating/profile/$profileId")({
  head: () => ({
    meta: [{ title: "Profile — Campus Match" }],
  }),
  component: ProfileView,
});

function ProfileView() {
  const navigate = useNavigate();
  const { profileId } = useParams({ from: "/app/dating/profile/$profileId", strict: false });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showPromptAnswers, setShowPromptAnswers] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showCompatibilityDetails, setShowCompatibilityDetails] = useState(false);

  const { data: profileData, isLoading, error } = useProfile(profileId || "");

  const profile = profileData?.profile;
  const photos = profile?.photos?.filter(p => p.url).sort((a, b) => a.display_order - b.display_order) ?? [];
  const mainPhoto = photos.find(p => p.is_main) || photos[0];
  const currentPhoto = photos[photoIndex] || mainPhoto;
  const prompts = profile?.prompts?.sort((a, b) => a.display_order - b.display_order) ?? [];

  const nextPhoto = () => {
    if (photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (photos.length > 1) {
      setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  const relationshipLabels: Record<string, string> = {
    friends: "Friends",
    dating: "Dating",
    study_buddy: "Study Buddy",
    networking: "Networking",
    startup_partner: "Startup Partner",
  };

  const formatInterest = (interest: string) => 
    interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, " ");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10">
            <Flag className="h-8 w-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold">Profile not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">This profile doesn't exist or is private</p>
          <button
            onClick={() => navigate({ to: "/app/dating" })}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Match
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Photo Carousel - Full Screen */}
      <div className="relative flex-1">
        {photos.length > 0 ? (
          <>
            <img
              src={currentPhoto?.url || "/placeholder-profile.jpg"}
              alt={`${profile.name}'s photo ${photoIndex + 1} of ${photos.length}`}
              className="w-full h-full object-cover"
            />
            
            {/* Photo Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Photo Indicators */}
            {photos.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      i === photoIndex
                        ? "bg-primary w-8"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
              <div className="flex items-start justify-between">
                <button
                  onClick={() => navigate({ to: "/app/dating" })}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:hidden"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => {}}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Share profile"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {}}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label="Report profile"
                  >
                    <Flag className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {profile.name}, {profile.age}
                    </h1>
                    {profile.is_verified && (
                      <Shield className="h-5 w-5 fill-primary text-primary-foreground shrink-0" />
                    )}
                  </div>
                  <p className="text-white/90 mt-1 text-sm md:text-base">
                    {profile.branch || profile.major || "Student"} • {profile.year || "Year unknown"}
                  </p>
                  {profile.hostel && (
                    <p className="text-white/70 mt-0.5 text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.hostel}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate({ to: `/app/dating/chat/${profile.id}` })}
                    className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-colors"
                    aria-label="Chat"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {}}
                    className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Like"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-surface">
            <div className="text-8xl">👤</div>
          </div>
        )}

        {/* Compatibility Badge */}
        {profileData?.score !== undefined && (
          <div 
            className="absolute top-6 right-6 md:top-8 md:right-8 z-10 cursor-pointer"
            onClick={() => setShowCompatibilityDetails(true)}
          >
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-14 w-14 md:h-16 md:w-16 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary/20"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="url(#compatibility-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(profileData.score || 0) * 1.256} 125.6`}
                  className="text-primary"
                  style={{ strokeDashoffset: 31.4 - (profileData.score || 0) * 1.256 }}
                />
                <defs>
                  <linearGradient id="compatibility-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.84 0.18 85)" />
                    <stop offset="100%" stopColor="oklch(0.9 0.15 90)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-bold text-primary-foreground">
                {profileData.score}%
              </span>
            </div>
            <p className="text-center text-xs text-white/80 mt-1">Match Score</p>
          </div>
        )}

        {/* Profile Details Drawer - Mobile */}
        <div className="hidden lg:block fixed inset-y-0 right-0 z-50 w-96 bg-background border-l border-border overflow-y-auto">
          <div className="p-6 space-y-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Profile Details</h2>
              <button
                onClick={() => navigate({ to: "/app/dating" })}
                className="p-2 rounded-lg hover:bg-surface transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="rounded-xl border border-border glass p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">About</h3>
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="text-xs text-primary hover:underline"
                  >
                    {showFullBio ? "Show less" : "Show more"}
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{profile.bio}</p>
              </div>
            )}

            {/* Prompts */}
            {prompts.length > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prompts</h3>
                  <button
                    onClick={() => setShowPromptAnswers(!showPromptAnswers)}
                    className="text-xs text-primary hover:underline"
                  >
                    {showPromptAnswers ? "Show less" : `Show all (${prompts.length})`}
                  </button>
                </div>
                <div className="space-y-3">
                  {prompts.slice(0, showPromptAnswers ? prompts.length : 2).map((prompt) => (
                    <div key={prompt.id} className="rounded-lg border border-border bg-surface/50 p-3">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        {prompt.prompt_category || "Prompt"}
                      </p>
                      <p className="text-sm font-medium text-foreground">{prompt.prompt_text}</p>
                      <p className="mt-1 text-sm text-foreground/90 italic">"{prompt.answer}"</p>
                    </div>
                  ))}
                  {prompts.length > 2 && !showPromptAnswers && (
                    <button
                      onClick={() => setShowPromptAnswers(true)}
                      className="w-full text-center text-sm text-primary hover:underline py-2"
                    >
                      View all {prompts.length} prompts
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Interests */}
            {(profile.interests?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Interests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.interests.slice(0, 10).map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                    >
                      {formatInterest(interest)}
                    </span>
                  ))}
                  {(profile.interests.length > 10) && (
                    <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                      +{profile.interests.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Clubs */}
            {(profile.clubs?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Clubs & Societies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.clubs.slice(0, 6).map((club) => (
                    <span
                      key={club}
                      className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(profile.skills?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.slice(0, 8).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Relationship Preferences */}
            {(profile.relationship_preference?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Looking For</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.relationship_preference.map((pref) => (
                    <span
                      key={pref}
                      className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-400"
                    >
                      <Heart className="h-3 w-3 fill-current" />
                      {relationshipLabels[pref] || pref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Study Preferences */}
            {(profile.study_subjects?.length ?? 0) > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Study Preferences
                </h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Subjects:</span> {profile.study_subjects.join(", ")}</p>
                  {profile.study_cgpa_goal && <p><span className="font-medium">CGPA Goal:</span> {profile.study_cgpa_goal}</p>}
                  {profile.study_preferred_time && <p><span className="font-medium">Preferred Time:</span> {profile.study_preferred_time}</p>}
                  {profile.study_preferred_location && <p><span className="font-medium">Preferred Location:</span> {profile.study_preferred_location}</p>}
                </div>
              </div>
            )}

            {/* Startup Preferences */}
            {profile.startup_looking_for && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Startup Match
                </h3>
                <div className="space-y-2 text-sm">
                  {profile.startup_role && <p><span className="font-medium">Role:</span> {profile.startup_role}</p>}
                  {profile.startup_skills.length > 0 && <p><span className="font-medium">Skills:</span> {profile.startup_skills.join(", ")}</p>}
                </div>
              </div>
            )}

            {/* Social Links */}
            {[
              { label: "Instagram", url: profile.instagram_url, icon: Instagram, color: "text-pink-400" },
              { label: "LinkedIn", url: profile.linkedin_url, icon: Linkedin, color: "text-blue-400" },
              { label: "GitHub", url: profile.github_url, icon: Github, color: "text-gray-400" },
            ].filter(s => s.url).length > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Social</h3>
                <div className="flex gap-3">
                  {[
                    { label: "Instagram", url: profile.instagram_url, icon: Instagram, color: "text-pink-400" },
                    { label: "LinkedIn", url: profile.linkedin_url, icon: Linkedin, color: "text-blue-400" },
                    { label: "GitHub", url: profile.github_url, icon: Github, color: "text-gray-400" },
                  ].filter(s => s.url).map((social) => (
                    <a
                      key={social.label}
                      href={social.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", social.color, "hover:opacity-75")}
                    >
                      <social.icon className="h-4 w-4" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            {profile.badges && profile.badges.length > 0 && (
              <div className="rounded-xl border border-border glass p-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge) => (
                    <BadgeBadge key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compatibility Details Modal */}
      {showCompatibilityDetails && profileData?.reasons && profileData.reasons.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-primary/30 glass-strong p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Compatibility Breakdown</h3>
              <button
                onClick={() => setShowCompatibilityDetails(false)}
                className="p-1 rounded-lg hover:bg-surface transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {profileData.reasons.map((reason: any) => (
                <div key={reason.type} className="flex items-center gap-4 p-3 rounded-xl bg-surface/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <span className="text-xl">{getReasonIcon(reason.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{reason.label}</p>
                    <p className="text-xs text-muted-foreground">{reason.detail || `Weight: ${reason.weight}%`}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+{reason.weight}%</p>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-border flex justify-between font-bold">
                <span>Total Score</span>
                <span className="text-primary">{profileData.score}%</span>
              </div>
            </div>
            <button
              onClick={() => setShowCompatibilityDetails(false)}
              className="mt-6 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BadgeBadge({ badge }: { badge: any }) {
  const badgeConfig: Record<string, { label: string; icon: string; color: string }> = {
    verified_student: { label: "Verified Student", icon: "🎓", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    club_lead: { label: "Club Lead", icon: "👑", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    hackathon_winner: { label: "Hackathon Winner", icon: "🏆", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    startup_founder: { label: "Startup Founder", icon: "🚀", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    placement_coordinator: { label: "Placement Coordinator", icon: "💼", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
    athlete: { label: "Athlete", icon: "🏃", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    alumni_mentor: { label: "Alumni Mentor", icon: "🧑‍🏫", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  };

  const config = badgeConfig[badge.badge_type] || { label: badge.badge_type, icon: "🏅", color: "bg-primary/20 text-primary border-primary/30" };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold", config.color)}>
      <span className="text-sm">{config.icon}</span>
      {config.label}
    </span>
  );
}

function getReasonIcon(type: string): string {
  const icons: Record<string, string> = {
    same_branch: "🏫",
    same_year: "📅",
    common_interests: "❤️",
    common_clubs: "👥",
    mutual_friends: "🤝",
    common_courses: "📚",
    hackathon_participation: "💻",
    startup_interest: "🚀",
    sports: "🏃",
    shared_prompt: "💬",
    same_hostel: "🏠",
    common_languages: "🗣️",
    same_skills: "⚡",
  };
  return icons[type] || "✨";
}