import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, AlertTriangle, Calendar, Plus, BookOpen, Star, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({
    meta: [{ title: "Attendance Tracker — Campus Connect" }],
  }),
  component: AttendanceTracker,
});

type Subject = {
  id: number;
  name: string;
  code: string;
  lecturesConducted: number;
  lecturesAttended: number;
  lastUpdated: string;
};

const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 1,
    name: "Design & Analysis of Algorithms",
    code: "CS301",
    lecturesConducted: 24,
    lecturesAttended: 20,
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: 2,
    name: "Database Management Systems",
    code: "CS302",
    lecturesConducted: 20,
    lecturesAttended: 18,
    lastUpdated: "Yesterday",
  },
  {
    id: 3,
    name: "Operating Systems",
    code: "CS303",
    lecturesConducted: 22,
    lecturesAttended: 15,
    lastUpdated: "July 3",
  },
  {
    id: 4,
    name: "Compiler Design",
    code: "CS304",
    lecturesConducted: 18,
    lecturesAttended: 12,
    lastUpdated: "July 2",
  },
  {
    id: 5,
    name: "Machine Learning Basic",
    code: "CS305",
    lecturesConducted: 16,
    lecturesAttended: 14,
    lastUpdated: "Today, 11:30 AM",
  },
];

function AttendanceTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectCode, setNewSubjectCode] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdate = (id: number, attend: boolean) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            lecturesConducted: sub.lecturesConducted + 1,
            lecturesAttended: sub.lecturesAttended + (attend ? 1 : 0),
            lastUpdated: "Just now",
          };
        }
        return sub;
      }),
    );
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName || !newSubjectCode) return;
    const newSub: Subject = {
      id: Date.now(),
      name: newSubjectName,
      code: newSubjectCode,
      lecturesConducted: 0,
      lecturesAttended: 0,
      lastUpdated: "Just created",
    };
    setSubjects((prev) => [...prev, newSub]);
    setNewSubjectName("");
    setNewSubjectCode("");
    setShowAddModal(false);
  };

  // Calculate overall metrics
  const totalConducted = subjects.reduce((sum, s) => sum + s.lecturesConducted, 0);
  const totalAttended = subjects.reduce((sum, s) => sum + s.lecturesAttended, 0);
  const overallPct = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-up">
        <div>
          <h2 className="text-xl font-bold">Attendance Tracker</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Keep track of your classes and ensure you stay above the 75% limit
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
        >
          <Plus className="h-4 w-4" /> Add Course
        </button>
      </div>

      {/* Overview Card */}
      <div className="rounded-2xl border border-border bg-yellow-500/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-up">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
            Overview
          </span>
          <h3 className="text-2xl font-black">Semester Attendance</h3>
          <p className="text-sm text-muted-foreground">
            You have attended <span className="font-semibold text-foreground">{totalAttended}</span>{" "}
            out of <span className="font-semibold text-foreground">{totalConducted}</span> total
            lectures conducted.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="text-xs text-muted-foreground">
              Required: <span className="font-bold text-foreground">75.0%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Current:{" "}
              <span
                className={`font-bold ${overallPct >= 75 ? "text-emerald-400" : "text-rose-400"}`}
              >
                {overallPct.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Large Circle Progress */}
        <div className="relative h-28 w-28 shrink-0 flex items-center justify-center">
          <svg className="-rotate-90 h-full w-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-surface-elevated"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={2 * Math.PI * 42 * (1 - overallPct / 100)}
              className={overallPct >= 75 ? "text-primary" : "text-rose-400"}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-xl font-black">{overallPct.toFixed(0)}%</span>
            <span className="block text-[8px] uppercase tracking-wider text-muted-foreground">
              Overall
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((sub, i) => {
          const pct =
            sub.lecturesConducted > 0 ? (sub.lecturesAttended / sub.lecturesConducted) * 100 : 100;
          const isDanger = pct < 75;

          // Calculate safe skips: number of future classes we can miss OR need to attend to reach 75%
          let safeSkipsMsg = "";
          if (sub.lecturesConducted > 0) {
            if (pct >= 75) {
              // safe to skip = floor((attended - 0.75 * conducted) / 0.75)
              const maxSkip = Math.floor(
                (sub.lecturesAttended - 0.75 * sub.lecturesConducted) / 0.75,
              );
              safeSkipsMsg =
                maxSkip > 0 ? `Safe to skip ${maxSkip} next classes` : "Cannot skip next class";
            } else {
              // need to attend = ceiling((0.75 * conducted - attended) / 0.25)
              const needAttend = Math.ceil(
                (0.75 * sub.lecturesConducted - sub.lecturesAttended) / 0.25,
              );
              safeSkipsMsg = `Must attend next ${needAttend} classes`;
            }
          } else {
            safeSkipsMsg = "No classes conducted yet";
          }

          return (
            <div
              key={sub.id}
              id={`subject-${sub.id}`}
              className={`rounded-2xl border glass p-5 flex flex-col justify-between animate-fade-up ${
                isDanger ? "border-rose-500/20 bg-rose-500/5" : "border-border"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground">{sub.code}</span>
                    <h4 className="font-bold text-sm leading-snug">{sub.name}</h4>
                  </div>
                  <span
                    className={`text-base font-black ${isDanger ? "text-rose-400" : "text-primary"}`}
                  >
                    {pct.toFixed(0)}%
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Attended:{" "}
                    <strong className="text-foreground">
                      {sub.lecturesAttended}/{sub.lecturesConducted}
                    </strong>
                  </span>
                  <span className="text-[10px] flex items-center gap-1">
                    <RefreshCw className="h-2.5 w-2.5" /> {sub.lastUpdated}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isDanger ? "bg-rose-500" : "bg-primary"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-2">
                <span
                  className={`text-[10px] font-semibold flex items-center gap-1 ${isDanger ? "text-rose-400" : "text-emerald-400"}`}
                >
                  {isDanger ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  {safeSkipsMsg}
                </span>

                {/* Action buttons to quickly log attendance */}
                <div className="flex gap-1.5">
                  <button
                    id={`btn-absent-${sub.id}`}
                    onClick={() => handleUpdate(sub.id, false)}
                    className="flex h-7 px-2.5 items-center justify-center rounded-lg border border-border bg-surface-elevated text-[10px] font-bold text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    Absent
                  </button>
                  <button
                    id={`btn-present-${sub.id}`}
                    onClick={() => handleUpdate(sub.id, true)}
                    className="flex h-7 px-2.5 items-center justify-center rounded-lg bg-primary text-primary-foreground text-[10px] font-bold transition hover:opacity-90"
                  >
                    Present
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-border glass-strong p-6 animate-fade-up">
            <h3 className="mb-4 text-base font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Add New Course
            </h3>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  htmlFor="add-code"
                >
                  Course Code
                </label>
                <input
                  id="add-code"
                  required
                  placeholder="e.g. CS301"
                  value={newSubjectCode}
                  onChange={(e) => setNewSubjectCode(e.target.value)}
                  className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  htmlFor="add-name"
                >
                  Course Name
                </label>
                <input
                  id="add-name"
                  required
                  placeholder="e.g. Design & Analysis of Algorithms"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  id="submit-add-course"
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
