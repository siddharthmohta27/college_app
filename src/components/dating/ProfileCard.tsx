import { useState, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  X,
  Star,
  Shield,
  Loader2,
  MapPin,
  Briefcase,
  BookOpen,
  Music,
  Coffee,
  Globe,
  Linkedin,
  Github,
  Instagram,
  MoreHorizontal,
  Flag,
  MessageSquare,
  Share2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type {
  DatingProfile,
  ProfilePhoto,
  ProfilePrompt,
  CompatibilityReason,
  ProfileBadge,
} from "@/lib/dating-types";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: DatingProfile;
  onLike?: (profileId: number, type: "profile" | "photo" | "prompt", targetId?: number) => void;
  onPass?: (profileId: number) => void;
  onSuperLike?: (profileId: number) => void;
  onSave?: (profileId: number) => void;
  onShare?: (profileId: number) => void;
  onReport?: (profileId: number) => void;
  onChat?: (profileId: number) => void;
  onProfileClick?: (profileId: number) => void;
  isSaved?: boolean;
  showCompatibility?: boolean;
  compatibilityScore?: number;
  compatibilityReasons?: CompatibilityReason[];
  showActions?: boolean;
  className?: string;
}

export function ProfileCard({
  profile,
  onLike,
  onPass,
  onSuperLike,
  onSave,
  onShare,
  onReport,
  onChat,
  isSaved,
  showCompatibility = true,
  compatibilityScore,
  compatibilityReasons,
  showActions = true,
  className,
}: ProfileCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showPromptAnswers, setShowPromptAnswers] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showCompatibilityDetails, setShowCompatibilityDetails] = useState(false);

  const photos =
    profile.photos?.filter((p) => p.url).sort((a, b) => a.display_order - b.display_order) ?? [];
  const mainPhoto = photos.find((p) => p.is_main) || photos[0];
  const currentPhoto = photos[photoIndex] || mainPhoto;
  const prompts = profile.prompts?.sort((a, b) => a.display_order - b.display_order) ?? [];

  const nextPhoto = useCallback(() => {
    if (photos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }
  }, [photos.length]);

  const prevPhoto = useCallback(() => {
    if (photos.length > 1) {
      setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  }, [photos.length]);

  const relationshipLabels: Record<string, string> = {
    friends: "Friends",
    dating: "Dating",
    study_buddy: "Study Buddy",
    networking: "Networking",
    startup_partner: "Startup Partner",
  };

  const formatInterest = (interest: string) =>
    interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, " ");

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border glass overflow-hidden animate-fade-up",
        className,
      )}
    >
      {/* Photo Carousel */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {photos.length > 0 ? (
          <>
            <img
              src={currentPhoto?.url || "/placeholder-profile.jpg"}
              alt={`${profile.name}'s photo ${photoIndex + 1} of ${photos.length}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />

            {/* Photo Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Photo Indicators */}
            {photos.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-all",
                      i === photoIndex ? "bg-primary w-5" : "bg-white/50 hover:bg-white/75",
                    )}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Main Photo Badge */}
            {photos.length > 0 && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Main Photo
                </span>
              </div>
            )}

            {/* Verified Badge */}
            {profile.is_verified && (
              <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground">
                <Shield className="h-3 w-3 fill-current" />
                Verified
              </div>
            )}

            {/* Compatibility Badge */}
            {showCompatibility && compatibilityScore !== undefined && (
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCompatibilityDetails(true);
                }}
              >
                <div className="relative inline-flex items-center justify-center">
                  <svg className="h-12 w-12 transform -rotate-90">
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
                      strokeDasharray={`${compatibilityScore * 1.256} 125.6`}
                      className="text-primary"
                      style={{ strokeDashoffset: 31.4 - compatibilityScore * 1.256 }}
                    />
                    <defs>
                      <linearGradient id="compatibility-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="oklch(0.84 0.18 85)" />
                        <stop offset="100%" stopColor="oklch(0.9 0.15 90)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {compatibilityScore}%
                  </span>
                </div>
              </div>
            )}

            {/* Photo Verified Badge */}
            {profile.photo_verified && currentPhoto?.is_main && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-semibold text-emerald-500-foreground">
                <Shield className="h-3 w-3 fill-current text-emerald-500" />
                Photo Verified
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-surface">
            <div className="text-6xl">👤</div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Name, Age, Location */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {profile.name}, {profile.age}
                </h3>
                {profile.is_verified && (
                  <Shield className="h-4 w-4 fill-primary text-primary-foreground shrink-0" />
                )}
              </div>
              <p className="text-sm text-white/90 mt-1">
                {profile.branch || profile.major || "Student"} • {profile.year || "Year unknown"}
              </p>
              {profile.hostel && (
                <p className="text-xs text-white/70 mt-0.5 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.hostel}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.(profile.id);
                }}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Share profile"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReport?.(profile.id);
                }}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label="Report profile"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-5">
        {/* Bio */}
        {profile.bio && (
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                About
              </h4>
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-xs text-primary hover:underline"
              >
                {showFullBio ? "Show less" : "Show more"}
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 line-clamp-3 transition-all">
              {showFullBio ? profile.bio : profile.bio}
            </p>
          </div>
        )}

        {/* Prompts */}
        {prompts.length > 0 && (
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Prompts
              </h4>
              <button
                onClick={() => setShowPromptAnswers(!showPromptAnswers)}
                className="text-xs text-primary hover:underline"
              >
                {showPromptAnswers ? "Show less" : `Show all (${prompts.length})`}
              </button>
            </div>
            <div className="mt-3 space-y-3">
              {prompts.slice(0, showPromptAnswers ? prompts.length : 2).map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onLike={() => onLike?.(profile.id, "prompt", prompt.prompt_id)}
                  compatibilityReasons={compatibilityReasons}
                />
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
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Interests
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.interests.slice(0, 8).map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                >
                  {formatInterest(interest)}
                </span>
              ))}
              {profile.interests.length > 8 && (
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
                  +{profile.interests.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Clubs */}
        {(profile.clubs?.length ?? 0) > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Clubs & Societies
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.clubs.slice(0, 5).map((club) => (
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
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Skills
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {profile.skills.slice(0, 6).map((skill) => (
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
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Looking For
            </h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
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

        {/* Social Links */}
        {[
          {
            label: "Instagram",
            url: profile.instagram_url,
            icon: Instagram,
            color: "text-pink-400",
          },
          { label: "LinkedIn", url: profile.linkedin_url, icon: Linkedin, color: "text-blue-400" },
          { label: "GitHub", url: profile.github_url, icon: Github, color: "text-gray-400" },
        ].filter((s) => s.url).length > 0 && (
          <div className="pt-3 border-t border-border">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Social
            </h4>
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  url: profile.instagram_url,
                  icon: Instagram,
                  color: "text-pink-400",
                },
                {
                  label: "LinkedIn",
                  url: profile.linkedin_url,
                  icon: Linkedin,
                  color: "text-blue-400",
                },
                { label: "GitHub", url: profile.github_url, icon: Github, color: "text-gray-400" },
              ]
                .filter((s) => s.url)
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium transition-colors",
                      social.color,
                      "hover:opacity-75",
                    )}
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
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Badges
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.badges.map((badge) => (
                <BadgeBadge key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="pt-4 border-t border-border flex items-center justify-center gap-3">
            <button
              onClick={() => onPass?.(profile.id)}
              disabled={!onPass}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:bg-red-500/10 hover:border-red-500/40 text-red-400 transition disabled:opacity-50"
              aria-label="Pass"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={() => onSave?.(profile.id)}
              disabled={!onSave}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition disabled:opacity-50",
                isSaved
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-surface border border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
              aria-label={isSaved ? "Unsave" : "Save"}
            >
              <Star className={cn("h-5 w-5 fill-current", isSaved ? "text-primary" : "")} />
            </button>
            <button
              onClick={() => onLike?.(profile.id, "profile")}
              disabled={!onLike}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition glow-primary disabled:opacity-50"
              aria-label="Like"
            >
              <Heart className="h-7 w-7 fill-current" />
            </button>
            <button
              onClick={() => onSuperLike?.(profile.id)}
              disabled={!onSuperLike}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition disabled:opacity-50"
              aria-label="Super Like"
            >
              <Star className="h-5 w-5 fill-current text-primary" />
            </button>
            {onChat && (
              <button
                onClick={() => onChat(profile.id)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition"
                aria-label="Chat"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Compatibility Details Modal */}
      {showCompatibilityDetails && compatibilityReasons && compatibilityReasons.length > 0 && (
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
              {compatibilityReasons.map((reason) => (
                <div
                  key={reason.type}
                  className="flex items-center gap-4 p-3 rounded-xl bg-surface/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <span className="text-xl">{getReasonIcon(reason.type)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{reason.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {reason.detail || `Weight: ${reason.weight}%`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">+{reason.weight}%</p>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-border flex justify-between font-bold">
                <span>Total Score</span>
                <span className="text-primary">{compatibilityScore}%</span>
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

function PromptCard({
  prompt,
  onLike,
  compatibilityReasons,
}: {
  prompt: ProfilePrompt;
  onLike?: () => void;
  compatibilityReasons?: CompatibilityReason[];
}) {
  const isMatchingPrompt = compatibilityReasons?.some(
    (r) => r.type === "shared_prompt" && r.detail?.includes(prompt.prompt_id?.toString() ?? ""),
  );

  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 transition",
        isMatchingPrompt ? "border-primary/30 bg-primary/5" : "border-border bg-surface/50",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            {prompt.prompt_category
              ? prompt.prompt_category.charAt(0).toUpperCase() + prompt.prompt_category.slice(1)
              : "Prompt"}
          </p>
          <p className="text-sm font-medium text-foreground">{prompt.prompt_text}</p>
          <p className="mt-2 text-sm text-foreground/90 italic">"{prompt.answer}"</p>
        </div>
        <button
          onClick={onLike}
          className="shrink-0 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
          aria-label="Like this prompt answer"
        >
          <Heart className="h-4 w-4 fill-current" />
        </button>
      </div>
      {isMatchingPrompt && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Matching prompt!
        </div>
      )}
    </div>
  );
}

function BadgeBadge({ badge }: { badge: ProfileBadge }) {
  const badgeConfig: Record<string, { label: string; icon: string; color: string }> = {
    verified_student: {
      label: "Verified Student",
      icon: "🎓",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    club_lead: {
      label: "Club Lead",
      icon: "👑",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
    hackathon_winner: {
      label: "Hackathon Winner",
      icon: "🏆",
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    },
    startup_founder: {
      label: "Startup Founder",
      icon: "🚀",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    placement_coordinator: {
      label: "Placement Coordinator",
      icon: "💼",
      color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
    athlete: {
      label: "Athlete",
      icon: "🏃",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
    alumni_mentor: {
      label: "Alumni Mentor",
      icon: "🧑‍🏫",
      color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    },
  };

  const config = badgeConfig[badge.badge_type] || {
    label: badge.badge_type,
    icon: "🏅",
    color: "bg-primary/20 text-primary border-primary/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold",
        config.color,
      )}
    >
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
