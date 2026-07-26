import React, { useState, useEffect } from "react";
import {
  X,
  GraduationCap,
  Mail,
  Award,
  Hash,
  BookOpen,
  Calendar,
  Building2,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Edit2,
  Check,
} from "lucide-react";
import { parsePecEmail, setStoredRollNo } from "@/lib/pec-email";
import { useNavigate } from "@tanstack/react-router";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string | null | undefined;
  displayName: string | null | undefined;
  onSignOut: () => void;
}

export function UserProfileModal({
  isOpen,
  onClose,
  email,
  displayName,
  onSignOut,
}: UserProfileModalProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => parsePecEmail(email, displayName));
  const [isEditingRoll, setIsEditingRoll] = useState(false);
  const [rollInput, setRollInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      const parsed = parsePecEmail(email, displayName);
      setProfile(parsed);
      setRollInput(parsed.rollNo);
      setIsEditingRoll(false);
    }
  }, [isOpen, email, displayName]);

  if (!isOpen) return null;

  const handleSaveRoll = () => {
    if (email && rollInput.trim()) {
      setStoredRollNo(email, rollInput.trim());
      setProfile(parsePecEmail(email, displayName));
    }
    setIsEditingRoll(false);
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "PEC";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl glass-strong border border-border/80 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow decoration */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-border/50 bg-surface/60 text-muted-foreground transition hover:bg-surface hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground shadow-lg glow-primary">
                {initials}
              </div>
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
            </div>

            {/* User Title Info */}
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-lg font-bold tracking-tight text-foreground">
                  {profile.name}
                </h2>
                <span title="Verified PEC Student">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                </span>
              </div>

              <div className="mt-0.5 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>PEC Student</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="space-y-4 p-6 pt-2">
          {/* Roll No / Batch Highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border/60 bg-surface/50 p-3 relative group">
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-primary" />
                  <span>Roll No / ID</span>
                </div>
                {!isEditingRoll && (
                  <button
                    onClick={() => setIsEditingRoll(true)}
                    className="text-muted-foreground hover:text-primary transition"
                    title="Edit Roll Number"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                )}
              </div>

              {isEditingRoll ? (
                <div className="mt-1 flex items-center gap-1">
                  <input
                    type="text"
                    value={rollInput}
                    onChange={(e) => setRollInput(e.target.value)}
                    className="w-full rounded-lg border border-primary bg-background px-2 py-0.5 text-xs font-bold text-foreground outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveRoll}
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-sm font-bold tracking-wide text-foreground">
                  {profile.rollNo}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border/60 bg-surface/50 p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>Batch Year</span>
              </div>
              <p className="mt-1 text-sm font-bold text-foreground">Class of {profile.batch}</p>
            </div>
          </div>

          {/* Academic Info List */}
          <div className="rounded-2xl border border-border/60 bg-surface/40 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-muted-foreground">Branch & Program</span>
                <p className="truncate text-xs font-semibold text-foreground">
                  {profile.branch} ({profile.degree})
                </p>
              </div>
            </div>

            <div className="h-px bg-border/40" />

            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-muted-foreground">Institution</span>
                <p className="truncate text-xs font-semibold text-foreground">{profile.college}</p>
              </div>
            </div>

            <div className="h-px bg-border/40" />

            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-muted-foreground">College Email</span>
                <p className="truncate text-xs font-mono font-medium text-foreground">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onClose();
                navigate({ to: "/app/dating/profile" });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Edit Dating & Social Profile</span>
              <ExternalLink className="h-3.5 w-3.5 ml-auto" />
            </button>

            <button
              onClick={() => {
                onClose();
                onSignOut();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
