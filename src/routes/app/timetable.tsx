import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Zap,
  AlertTriangle,
  ChevronRight,
  BookMarked,
  Ban,
  Plus,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";
import { parsePecEmail } from "@/lib/pec-email";
import { firebaseAuth } from "@/lib/firebase";
import {
  getSectionFromRollNo,
  getTimetableForSection,
  getTodaySchedule,
  getNextClass,
  type WeeklyTimetable,
  type DaySchedule,
  type TimeSlot,
  type ClassType,
} from "@/lib/pec-timetable";
import {
  getSem1SectionFromRollNo,
  getSem1Timetable,
} from "@/lib/pec-timetable-sem1";
import {
  fetchTimetableOverrides,
  createTimetableOverride,
  deleteTimetableOverride,
  checkCRStatus,
  type TimetableOverride,
  type CRStatus,
} from "@/lib/cr-api";

export const Route = createFileRoute("/app/timetable")({
  head: () => ({
    meta: [{ title: "My Timetable — Campus Connect" }],
  }),
  component: TimetablePage,
});

// ─── Day tabs ────────────────────────────────────────────────────────────────
const DAYS = ["MON", "TUE", "WED", "THU", "FRI"] as const;
type Day = (typeof DAYS)[number];

const DAY_LABELS: Record<Day, string> = {
  MON: "Monday",
  TUE: "Tuesday",
  WED: "Wednesday",
  THU: "Thursday",
  FRI: "Friday",
};

// ─── Styling helpers ─────────────────────────────────────────────────────────
function slotColors(type: ClassType): string {
  switch (type) {
    case "lecture":
      return "bg-primary/10 border-primary/30 text-primary font-medium";
    case "lab":
      return "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-400 font-medium";
    case "tutorial":
      return "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 font-medium";
    case "lunch":
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-medium";
    default:
      return "bg-transparent border-transparent text-muted-foreground/40";
  }
}

function SlotIcon({ type }: { type: ClassType }) {
  switch (type) {
    case "lab":
      return <FlaskConical className="h-3.5 w-3.5 shrink-0" />;
    case "tutorial":
      return <BookMarked className="h-3.5 w-3.5 shrink-0" />;
    case "lunch":
      return <span className="text-base leading-none">🍽️</span>;
    case "lecture":
      return <BookOpen className="h-3.5 w-3.5 shrink-0" />;
    default:
      return null;
  }
}

function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${display}:${m.toString().padStart(2, "0")} ${suffix}`;
}

// ─── Slot Card with Override Status ──────────────────────────────────────────
function SlotCard({
  ts,
  isNow,
  override,
  isCR,
  onOpenCROptions,
  onRestoreOverride,
}: {
  ts: TimeSlot;
  isNow?: boolean;
  override?: TimetableOverride;
  isCR?: boolean;
  onOpenCROptions?: (ts: TimeSlot, override?: TimetableOverride) => void;
  onRestoreOverride?: (overrideId: number) => void;
}) {
  const slot = ts.slot;
  if (!slot && !override) return null;

  if (slot?.type === "free" && !override) {
    return (
      <div className="flex items-center gap-3 py-1 pl-4 opacity-30">
        <span className="w-24 shrink-0 text-right text-[10px] font-mono text-muted-foreground">
          {formatTime(ts.start)}
        </span>
        <div className="h-px flex-1 border-t border-dashed border-border" />
      </div>
    );
  }

  const isCancelled = override?.status === "cancelled";
  const isRoomChange = override?.status === "room_change";
  const isExtra = override?.status === "extra_class";

  return (
    <div
      className={`group relative flex flex-col sm:flex-row sm:items-start gap-3 rounded-2xl border px-4 py-3.5 transition ${
        isCancelled
          ? "border-rose-500/40 bg-rose-500/5 text-rose-300"
          : isExtra
          ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
          : isRoomChange
          ? "border-amber-500/40 bg-amber-500/5"
          : slot
          ? slotColors(slot.type)
          : "bg-surface/50 border-border"
      } ${isNow && !isCancelled ? "ring-2 ring-primary/60 shadow-lg shadow-primary/10" : ""}`}
    >
      {isNow && !isCancelled && (
        <span className="absolute -top-2 right-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground animate-pulse">
          Now
        </span>
      )}

      {/* Time */}
      <div className="w-20 shrink-0 pt-0.5 sm:w-24">
        <div className={`text-[11px] font-mono font-bold leading-tight ${isCancelled ? "line-through opacity-70" : ""}`}>
          {formatTime(ts.start)}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground leading-tight">
          {formatTime(ts.end)}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {slot && <SlotIcon type={slot.type} />}
          <span className={`text-sm font-bold leading-tight ${isCancelled ? "line-through text-muted-foreground" : "text-foreground"}`}>
            {override?.subject || slot?.subject || "Extra Lecture"}
          </span>

          {(override?.code || slot?.code) && (
            <span className="ml-1 rounded bg-black/20 px-1.5 py-0.5 text-[9px] font-mono opacity-70">
              {override?.code || slot?.code}
            </span>
          )}

          {/* Status Badges */}
          {isCancelled && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[10px] font-black uppercase text-rose-400">
              <Ban className="h-2.5 w-2.5" /> Cancelled by CR
            </span>
          )}

          {isRoomChange && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-400">
              Room Shifted
            </span>
          )}

          {isExtra && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
              ✨ Extra Class
            </span>
          )}

          {slot && !override && (
            <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${slotColors(slot.type)}`}>
              {slot.type}
            </span>
          )}
        </div>

        {/* Reason / Notice */}
        {override?.reason && (
          <div className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-amber-300/90 bg-black/20 rounded-lg p-2 border border-white/5">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-400" />
            <span>
              <strong>CR Notice:</strong> {override.reason}
            </span>
          </div>
        )}

        {/* Room & Faculty Details */}
        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] opacity-80">
          {/* Room Display with Override */}
          {isRoomChange ? (
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <MapPin className="h-3 w-3 text-amber-400" />
              {override.updated_room}
              <span className="line-through text-[10px] opacity-50 ml-1">({override.original_room || slot?.room})</span>
            </span>
          ) : (override?.updated_room || slot?.room) ? (
            <span className={`flex items-center gap-1 ${isCancelled ? "line-through opacity-60" : ""}`}>
              <MapPin className="h-3 w-3" />
              {override?.updated_room || slot?.room}
            </span>
          ) : null}

          {(override?.faculty || slot?.faculty) && (
            <span className={`flex items-center gap-1 ${isCancelled ? "line-through opacity-60" : ""}`}>
              <User className="h-3 w-3" />
              {override?.faculty || slot?.faculty}
            </span>
          )}

          {slot?.groups && (
            <span className="flex items-center gap-1 opacity-60">
              <GraduationCap className="h-3 w-3" />
              {slot.groups}
            </span>
          )}
        </div>
      </div>

      {/* CR Quick Action Buttons */}
      {isCR && (
        <div className="flex items-center gap-1.5 shrink-0 sm:self-center mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
          {override ? (
            <button
              onClick={() => onRestoreOverride?.(override.id)}
              className="inline-flex items-center gap-1 rounded-xl bg-surface border border-border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition"
              title="Restore original class"
            >
              <RotateCcw className="h-3 w-3 text-primary" /> Restore
            </button>
          ) : slot && slot.type !== "lunch" ? (
            <button
              onClick={() => onOpenCROptions?.(ts)}
              className="inline-flex items-center gap-1 rounded-xl bg-primary/10 border border-primary/30 px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-primary/20 transition shadow-sm"
              title="CR Options for this class"
            >
              <Zap className="h-3 w-3" /> CR Action
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ─── Today's hero card ────────────────────────────────────────────────────────
function TodayHero({
  todaySchedule,
  section,
  overrides,
}: {
  todaySchedule: DaySchedule | null;
  section: string;
  overrides: TimetableOverride[];
}) {
  const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

  const todayCancelledCount = overrides.filter(
    (o) => o.status === "cancelled" && o.override_date === new Date().toISOString().split("T")[0]
  ).length;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 animate-fade-up">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 opacity-5 text-primary">
        <CalendarDays className="h-28 w-28" />
      </div>
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">{dayName}</span>
              <span className="rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                Section {section}
              </span>
              {todayCancelledCount > 0 && (
                <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                  {todayCancelledCount} Class Cancelled Today
                </span>
              )}
            </div>
            <h2 className="mt-1 text-xl font-bold">Today's Schedule</h2>
          </div>
          <Link
            to="/app/assignments"
            className="flex items-center gap-1 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary/20 shadow-sm"
          >
            <FileText className="h-3.5 w-3.5" /> Due ASG Hub <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {isWeekend ? (
          <p className="mt-4 text-sm text-muted-foreground">It's the weekend — enjoy your break! 🎉</p>
        ) : !todaySchedule ? (
          <p className="mt-4 text-sm text-muted-foreground">No schedule data available for today.</p>
        ) : !nextInfo ? (
          <p className="mt-4 text-sm text-muted-foreground">All classes for today are done. 🎓</p>
        ) : (
          <div className="mt-4 flex items-start gap-4 rounded-xl border border-primary/20 bg-surface-elevated p-3.5">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${slotColors(nextInfo.slot.slot!.type)}`}
            >
              <SlotIcon type={nextInfo.slot.slot!.type} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                    nextInfo.status === "ongoing" ? "bg-emerald-500 text-white animate-pulse" : "bg-primary/20 text-primary"
                  }`}
                >
                  {nextInfo.status === "ongoing" ? "🔴 Live" : "Up Next"}
                </span>
              </div>
              <div className="mt-1 font-bold text-foreground">{nextInfo.slot.slot!.subject}</div>
              <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(nextInfo.slot.start)} – {formatTime(nextInfo.slot.end)}
                </span>
                {nextInfo.slot.slot!.room && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {nextInfo.slot.slot!.room}
                  </span>
                )}
                {nextInfo.slot.slot!.faculty && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {nextInfo.slot.slot!.faculty}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function TimetablePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<TimetableOverride[]>([]);
  const [crStatus, setCrStatus] = useState<CRStatus>({ isCR: false, assignedSections: [], isAdmin: false });

  const todayDayIndex = new Date().getDay();
  const defaultDay: Day = todayDayIndex >= 1 && todayDayIndex <= 5
    ? DAYS[todayDayIndex - 1]
    : "MON";
  const [selectedDay, setSelectedDay] = useState<Day>(defaultDay);

  // CR Action Modal state
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedSlotForAction, setSelectedSlotForAction] = useState<TimeSlot | null>(null);
  const [actionType, setActionType] = useState<"cancelled" | "room_change" | "extra_class">("cancelled");
  const [actionReason, setActionReason] = useState("");
  const [actionNewRoom, setActionNewRoom] = useState("");
  const [actionDate, setActionDate] = useState(new Date().toISOString().split("T")[0]);
  const [extraSubject, setExtraSubject] = useState("Python for Data Science");
  const [extraStartTime, setExtraStartTime] = useState("16:00");
  const [extraEndTime, setExtraEndTime] = useState("17:00");
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((u) => {
      setEmail(u?.email ?? null);
      setDisplayName(u?.displayName ?? null);
    });
    return unsub;
  }, []);

  const profile = parsePecEmail(email, displayName);
  // For 2026 batch (roll starts with 26), use 1st-semester timetable;
  // fall back to 3rd-semester lookup for 2025 batch and others.
  const is2026Batch = /^26/.test(profile.rollNo?.replace(/\D/g, "") ?? "");
  const sem1Section = is2026Batch ? getSem1SectionFromRollNo(profile.rollNo) : null;
  const section = sem1Section ?? getSectionFromRollNo(profile.rollNo);
  const timetable: WeeklyTimetable | null = sem1Section
    ? getSem1Timetable(sem1Section)
    : section
    ? getTimetableForSection(section)
    : null;

  const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
  const selectedSchedule = timetable?.schedule.find((d) => d.day === selectedDay) ?? null;

  // Load CR authority
  useEffect(() => {
    checkCRStatus(email).then(setCrStatus);
  }, [email]);

  const isCRForCurrentSection =
    Boolean(section) &&
    (crStatus.isAdmin ||
      crStatus.assignedSections.map((s) => s.toUpperCase()).includes(section!.toUpperCase()));

  // Load overrides from PostgreSQL
  const loadOverrides = async () => {
    if (!section) return;
    const data = await fetchTimetableOverrides(section);
    setOverrides(data);
  };

  useEffect(() => {
    loadOverrides();
  }, [section]);

  // Determine "now" slots for highlight
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const isTodaySelected =
    selectedDay === DAYS[(todayDayIndex === 0 ? 7 : todayDayIndex) - 1];

  function isSlotNow(ts: TimeSlot): boolean {
    if (!isTodaySelected) return false;
    const [sh, sm] = ts.start.split(":").map(Number);
    const [eh, em] = ts.end.split(":").map(Number);
    return nowMins >= sh * 60 + sm && nowMins < eh * 60 + em;
  }

  // Open CR Action Modal for an existing slot
  const handleOpenCROptions = (ts: TimeSlot) => {
    setSelectedSlotForAction(ts);
    setActionType("cancelled");
    setActionReason("");
    setActionNewRoom(ts.slot?.room || "");
    setShowActionModal(true);
  };

  // Open CR Modal for adding an extra class
  const handleOpenAddExtra = () => {
    setSelectedSlotForAction(null);
    setActionType("extra_class");
    setActionReason("");
    setActionNewRoom("L-405");
    setShowActionModal(true);
  };

  // Submit CR Action
  const handleSubmitAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!section) return;

    setSubmittingAction(true);

    const startTime = selectedSlotForAction ? selectedSlotForAction.start : extraStartTime;
    const endTime = selectedSlotForAction ? selectedSlotForAction.end : extraEndTime;
    const subject = selectedSlotForAction ? selectedSlotForAction.slot?.subject : extraSubject;
    const code = selectedSlotForAction ? selectedSlotForAction.slot?.code : undefined;
    const faculty = selectedSlotForAction ? selectedSlotForAction.slot?.faculty : undefined;
    const originalRoom = selectedSlotForAction ? selectedSlotForAction.slot?.room : undefined;

    const res = await createTimetableOverride({
      section,
      overrideDate: actionDate,
      dayOfWeek: selectedDay,
      startTime,
      endTime,
      status: actionType,
      subject,
      code,
      faculty,
      originalRoom,
      updatedRoom: actionType === "room_change" ? actionNewRoom : undefined,
      reason: actionReason.trim() || undefined,
    });

    setSubmittingAction(false);

    if (res.success && res.override) {
      setOverrides((prev) => [res.override!, ...prev]);
      setShowActionModal(false);
    } else {
      alert(res.error || "Failed to update timetable");
    }
  };

  // Restore override
  const handleRestoreOverride = async (overrideId: number) => {
    if (!window.confirm("Restore this class back to original schedule?")) return;
    const res = await deleteTimetableOverride(overrideId);
    if (res.success) {
      setOverrides((prev) => prev.filter((o) => o.id !== overrideId));
    } else {
      alert(res.error || "Failed to restore class");
    }
  };

  // Merge static timetable with dynamic overrides for selected day
  const mergedDaySlots = useMemo(() => {
    if (!selectedSchedule) return [];

    const dayOverrides = overrides.filter(
      (o) => o.day_of_week.toUpperCase() === selectedDay.toUpperCase()
    );

    // Map existing slots with overrides
    const slotsWithOverrides = selectedSchedule.slots.map((ts) => {
      const match = dayOverrides.find((o) => o.start_time === ts.start);
      return {
        ts,
        override: match,
      };
    });

    // Find any extra classes not in static schedule
    const extraOverrides = dayOverrides.filter(
      (o) => o.status === "extra_class" && !selectedSchedule.slots.some((ts) => ts.start === o.start_time)
    );

    extraOverrides.forEach((extra) => {
      slotsWithOverrides.push({
        ts: {
          start: extra.start_time,
          end: extra.end_time,
          slot: {
            subject: extra.subject || "Extra Lecture",
            code: extra.code || "",
            type: "lecture",
            room: extra.updated_room || "TBA",
            faculty: extra.faculty || "",
          },
        },
        override: extra,
      });
    });

    // Sort by start time
    slotsWithOverrides.sort((a, b) => a.ts.start.localeCompare(b.ts.start));

    return slotsWithOverrides;
  }, [selectedSchedule, overrides, selectedDay]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition">Dashboard</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Timetable</span>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Timetable</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {timetable
                ? `${timetable.branch} · ${timetable.semester} · ${timetable.period}`
                : "B.Tech · 3rd Sem · Jul–Dec 2026"}
            </p>
          </div>

          {/* Quick ASG Link */}
          <Link
            to="/app/assignments"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition shadow-sm"
          >
            <FileText className="h-4 w-4" /> Assignments & Deadlines Hub
          </Link>
        </div>

        {/* Group info badge + CR Authority */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {section && timetable && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-400">
              <GraduationCap className="h-3 w-3" /> Group {section.replace("ECE-", "").replace("CSE-", "CSE ").replace("AI-", "AI ")}
            </span>
          )}

          {timetable?.labSubgroup && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-[11px] font-semibold text-violet-400">
              <FlaskConical className="h-3 w-3" /> Lab Subgroup: {timetable.labSubgroup}
            </span>
          )}

          {isCRForCurrentSection && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-400 animate-pulse">
              <Sparkles className="h-3 w-3" /> Section {section} CR Controls Enabled
            </span>
          )}
        </div>
      </div>

      {/* No section or timetable available */}
      {!section ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center animate-fade-up">
          <AlertTriangle className="mx-auto h-8 w-8 text-amber-400" />
          <h3 className="mt-3 font-bold text-foreground">Section could not be determined</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your roll number ({profile.rollNo}) doesn't match any known section. Please update your roll number in your profile.
          </p>
          <div className="mt-3 rounded-xl border border-border bg-surface/50 p-3 text-xs text-muted-foreground">
            <strong className="text-foreground">CSE:</strong> 25101001–25101999 &nbsp;|&nbsp;
            <strong className="text-foreground">AI:</strong> 25106501–25106599 &nbsp;|&nbsp;
            <strong className="text-foreground">DS:</strong> 25106001–25106064 &nbsp;|&nbsp;
            <strong className="text-foreground">ECE:</strong> 25105001–25105999
          </div>
        </div>
      ) : !timetable ? (
        <div className="rounded-2xl border border-border bg-surface/50 p-8 text-center animate-fade-up">
          <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary">
              Section {section}
            </span>
          </div>
          <h3 className="mt-3 font-bold text-foreground">Timetable Not Yet Uploaded</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The schedule for <strong>{section}</strong> hasn't been added yet. Check back soon — your coordinator will upload it.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-surface/50 p-3 text-xs text-muted-foreground">
            Available: <strong className="text-foreground">CSE 1–6, AI 1–2, DS 1–4, ECE G1–G6</strong>
          </div>
        </div>
      ) : (
        <>
          {/* Today's hero */}
          <TodayHero todaySchedule={todaySchedule} section={section} overrides={overrides} />

          {/* Approximate data notice for ECE */}
          {timetable.approximate && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[11px] text-amber-300 animate-fade-up">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
              <span>
                This schedule was extracted from the dept timetable image (w.e.f. 27/07/26). Individual lab slots rotate between groups — verify exact slot with your group coordinator.
              </span>
            </div>
          )}

          {/* Lab summary */}
          <section className="animate-fade-up">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <FlaskConical className="h-4 w-4 text-violet-400" /> Weekly Lab Summary
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {timetable.schedule.flatMap((d) =>
                d.slots
                  .filter((ts) => ts.slot?.type === "lab")
                  .map((ts) => ({ day: d.day, ts }))
              ).map(({ day, ts }, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day as Day)}
                  className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-left transition hover:bg-violet-500/10"
                >
                  <span className="block text-[10px] font-bold text-violet-400 uppercase">{day}</span>
                  <span className="mt-1 block text-xs font-semibold text-foreground leading-snug">
                    {ts.slot!.subject}
                  </span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    {formatTime(ts.start)} · {ts.slot!.room}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Day tabs & CR Add Extra Action */}
          <section className="animate-fade-up">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                {DAYS.map((d) => {
                  const isToday = d === DAYS[(todayDayIndex === 0 ? 7 : todayDayIndex) - 1];
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                        selectedDay === d
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : isToday
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider opacity-70">{d}</span>
                      <span className="text-sm">{DAY_LABELS[d].slice(0, 3)}</span>
                      {isToday && <span className="mt-0.5 h-1 w-1 rounded-full bg-current opacity-60" />}
                    </button>
                  );
                })}
              </div>

              {isCRForCurrentSection && (
                <button
                  onClick={handleOpenAddExtra}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-3 py-2 text-xs font-bold text-black shadow-md transition hover:opacity-90 active:scale-95"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Extra Class
                </button>
              )}
            </div>

            {/* Slots for selected day */}
            <div className="space-y-2.5">
              {mergedDaySlots.length > 0 ? (
                mergedDaySlots.map(({ ts, override }, i) => (
                  <SlotCard
                    key={`${ts.start}_${i}`}
                    ts={ts}
                    isNow={isSlotNow(ts)}
                    override={override}
                    isCR={isCRForCurrentSection}
                    onOpenCROptions={handleOpenCROptions}
                    onRestoreOverride={handleRestoreOverride}
                  />
                ))
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">No schedule for this day.</p>
              )}
            </div>
          </section>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/50 bg-surface/30 px-4 py-3 text-[11px] text-muted-foreground animate-fade-up">
            <span className="font-semibold text-foreground">Legend:</span>
            {(["lecture", "lab", "tutorial", "lunch"] as ClassType[]).map((t) => (
              <span key={t} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${slotColors(t)}`}>
                <SlotIcon type={t} />
                <span className="capitalize">{t}</span>
              </span>
            ))}
            <span className="flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-rose-400 font-semibold">
              <Ban className="h-3 w-3" /> Cancelled
            </span>
          </div>
        </>
      )}

      {/* ─── CR ACTION MODAL ──────────────────────────────────────────────── */}
      {showActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl animate-scale-in my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">
                  {selectedSlotForAction ? "Manage Timetable Slot" : "Add Extra Class"}
                </h2>
              </div>
              <button
                onClick={() => setShowActionModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-surface"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitAction} className="mt-4 space-y-4 text-xs">
              {/* Selected Slot Information */}
              {selectedSlotForAction && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                  <span className="text-[10px] font-bold text-primary uppercase">Target Lecture</span>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedSlotForAction.slot?.subject}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {formatTime(selectedSlotForAction.start)} – {formatTime(selectedSlotForAction.end)} · Room: {selectedSlotForAction.slot?.room || "TBA"}
                  </p>
                </div>
              )}

              {/* Action Type Selector */}
              {selectedSlotForAction && (
                <div>
                  <label className="block font-semibold text-foreground mb-1.5">Choose Action</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActionType("cancelled")}
                      className={`rounded-xl border p-2.5 font-bold transition flex items-center justify-center gap-1.5 ${
                        actionType === "cancelled"
                          ? "border-rose-500 bg-rose-500/20 text-rose-300"
                          : "border-border bg-surface text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Ban className="h-4 w-4" /> Mark Cancelled
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionType("room_change")}
                      className={`rounded-xl border p-2.5 font-bold transition flex items-center justify-center gap-1.5 ${
                        actionType === "room_change"
                          ? "border-amber-500 bg-amber-500/20 text-amber-300"
                          : "border-border bg-surface text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <MapPin className="h-4 w-4" /> Change Room
                    </button>
                  </div>
                </div>
              )}

              {/* Extra Class Fields */}
              {!selectedSlotForAction && (
                <>
                  <div>
                    <label className="block font-semibold text-foreground mb-1">Subject Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Python for Data Science"
                      value={extraSubject}
                      onChange={(e) => setExtraSubject(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-foreground mb-1">Start Time</label>
                      <input
                        type="time"
                        value={extraStartTime}
                        onChange={(e) => setExtraStartTime(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-foreground mb-1">End Time</label>
                      <input
                        type="time"
                        value={extraEndTime}
                        onChange={(e) => setExtraEndTime(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Room Change Field */}
              {(actionType === "room_change" || !selectedSlotForAction) && (
                <div>
                  <label className="block font-semibold text-foreground mb-1">New Room / Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. L-21 or L-405"
                    value={actionNewRoom}
                    onChange={(e) => setActionNewRoom(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              {/* Date & Reason */}
              <div>
                <label className="block font-semibold text-foreground mb-1">Applicable Date</label>
                <input
                  type="date"
                  required
                  value={actionDate}
                  onChange={(e) => setActionDate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Reason / Notice to Students</label>
                <input
                  type="text"
                  placeholder="e.g. Faculty on medical leave / Test rescheduled"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowActionModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAction}
                  className={`rounded-xl px-5 py-2 text-xs font-bold text-black shadow-lg transition ${
                    actionType === "cancelled"
                      ? "bg-rose-400 hover:bg-rose-300 shadow-rose-500/20"
                      : "bg-primary hover:bg-primary/90 shadow-primary/20"
                  } disabled:opacity-50`}
                >
                  {submittingAction
                    ? "Updating..."
                    : actionType === "cancelled"
                    ? "Confirm Cancellation"
                    : "Save Timetable Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
