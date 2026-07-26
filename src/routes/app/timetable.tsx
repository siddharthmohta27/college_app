import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
      return "bg-primary/10 border-primary/30 text-primary";
    case "lab":
      return "bg-violet-500/10 border-violet-500/30 text-violet-400";
    case "tutorial":
      return "bg-amber-500/10 border-amber-500/30 text-amber-400";
    case "lunch":
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
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

// ─── Single slot card ─────────────────────────────────────────────────────────
function SlotCard({ ts, isNow }: { ts: TimeSlot; isNow?: boolean }) {
  const slot = ts.slot;
  if (!slot) return null;
  if (slot.type === "free") {
    return (
      <div className="flex items-center gap-3 py-1 pl-4 opacity-30">
        <span className="w-24 shrink-0 text-right text-[10px] font-mono text-muted-foreground">
          {formatTime(ts.start)}
        </span>
        <div className="h-px flex-1 border-t border-dashed border-border" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-start gap-3 rounded-xl border px-4 py-3 transition ${slotColors(slot.type)} ${isNow ? "ring-2 ring-primary/60 shadow-lg shadow-primary/10" : ""}`}
    >
      {isNow && (
        <span className="absolute -top-2 right-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground animate-pulse">
          Now
        </span>
      )}
      {/* Time */}
      <div className="w-24 shrink-0 pt-0.5">
        <div className="text-[10px] font-mono leading-tight">
          {formatTime(ts.start)}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground leading-tight">
          {formatTime(ts.end)}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <SlotIcon type={slot.type} />
          <span className="text-sm font-bold leading-tight">{slot.subject}</span>
          {slot.code && (
            <span className="ml-1 rounded bg-black/20 px-1.5 py-0.5 text-[9px] font-mono opacity-70">
              {slot.code}
            </span>
          )}
          <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${slotColors(slot.type)}`}>
            {slot.type}
          </span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[11px] opacity-80">
          {slot.room && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {slot.room}
            </span>
          )}
          {slot.faculty && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {slot.faculty}
            </span>
          )}
          {slot.groups && (
            <span className="flex items-center gap-1 opacity-60">
              <GraduationCap className="h-3 w-3" />
              {slot.groups}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Today's hero card ────────────────────────────────────────────────────────
function TodayHero({
  todaySchedule,
  section,
}: {
  todaySchedule: DaySchedule | null;
  section: string;
}) {
  const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

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
            </div>
            <h2 className="mt-1 text-xl font-bold">Today's Schedule</h2>
          </div>
          <Link
            to="/app/timetable"
            className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-primary/20"
          >
            Full Week <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {isWeekend ? (
          <p className="mt-4 text-sm text-muted-foreground">It's the weekend — enjoy your break! 🎉</p>
        ) : !todaySchedule ? (
          <p className="mt-4 text-sm text-muted-foreground">No schedule data available for today.</p>
        ) : !nextInfo ? (
          <p className="mt-4 text-sm text-muted-foreground">All classes for today are done. 🎓</p>
        ) : (
          <div className="mt-4 flex items-start gap-4 rounded-xl border border-primary/20 bg-black/20 p-3.5">
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${slotColors(nextInfo.slot.slot!.type)}`}
            >
              <SlotIcon type={nextInfo.slot.slot!.type} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${nextInfo.status === "ongoing" ? "bg-emerald-500 text-white animate-pulse" : "bg-primary/20 text-primary"}`}
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

  const todayDayIndex = new Date().getDay();
  const defaultDay: Day = todayDayIndex >= 1 && todayDayIndex <= 5
    ? DAYS[todayDayIndex - 1]
    : "MON";
  const [selectedDay, setSelectedDay] = useState<Day>(defaultDay);

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((u) => {
      setEmail(u?.email ?? null);
      setDisplayName(u?.displayName ?? null);
    });
    return unsub;
  }, []);

  const profile = parsePecEmail(email, displayName);
  const section = getSectionFromRollNo(profile.rollNo);
  const timetable: WeeklyTimetable | null = section ? getTimetableForSection(section) : null;

  const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
  const selectedSchedule = timetable?.schedule.find((d) => d.day === selectedDay) ?? null;

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

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/app" className="hover:text-foreground transition">Dashboard</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Timetable</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">My Timetable</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {timetable
            ? `${timetable.branch} · ${timetable.semester} · ${timetable.period}`
            : "B.Tech · 3rd Sem · Jul–Dec 2026"}
        </p>
        {/* ECE group info */}
        {section?.startsWith("ECE") && timetable && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-400">
              <GraduationCap className="h-3 w-3" /> Group {section.replace("ECE-", "")}
            </span>
            {timetable.labSubgroup && (
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-[11px] font-semibold text-violet-400">
                <FlaskConical className="h-3 w-3" /> Lab Subgroup: {timetable.labSubgroup}
              </span>
            )}
          </div>
        )}
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
            Available: <strong className="text-foreground">DS1, DS4, ECE G1–G6</strong>
          </div>
        </div>
      ) : (
        <>
          {/* Today's hero */}
          <TodayHero todaySchedule={todaySchedule} section={section} />

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

          {/* Day tabs */}
          <section className="animate-fade-up">
            <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
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

            {/* Slots for selected day */}
            <div className="space-y-2">
              {selectedSchedule?.slots.map((ts, i) => (
                <SlotCard key={i} ts={ts} isNow={isSlotNow(ts)} />
              )) ?? (
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
          </div>
        </>
      )}
    </div>
  );
}
