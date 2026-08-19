import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useState, useEffect } from "react";
import { loadLocalAttendance, fetchSupabaseAttendance } from "@/lib/attendance";
import { firebaseAuth } from "@/lib/firebase";
import { parsePecEmail } from "@/lib/pec-email";
import {
  getSectionFromRollNo,
  getTimetableForSection,
  getTodaySchedule,
  getNextClass,
} from "@/lib/pec-timetable";

type OverviewItem = {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  href?: string;
};

function OverviewCard({ item, index }: { item: OverviewItem; index: number }) {
  const Icon = item.icon;

  const content = (
    <article
      className="group relative z-0 min-w-[220px] shrink-0 rounded-2xl border border-border glass p-4 transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-up md:min-w-0 h-full cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Today</span>
      </div>

      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {item.title}
      </p>
      <h3 className="mt-1 truncate text-base font-bold">{item.value}</h3>
      <p className="mt-1 truncate text-xs text-muted-foreground">{item.subtitle}</p>
    </article>
  );

  if (item.href) {
    return (
      <Link to={item.href as any} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

export function TodaysOverview() {
  const [attendanceData, setAttendanceData] = useState<{ value: string; msg: string }>({
    value: "0/0 Classes",
    msg: "Target: 75% Attendance",
  });
  const [nextClassInfo, setNextClassInfo] = useState<{ value: string; subtitle: string }>({
    value: "Loading...",
    subtitle: "Checking schedule",
  });

  // Calculate real attendance stats matching actual recorded classes
  useEffect(() => {
    async function loadStats(user: any) {
      let list = loadLocalAttendance();
      if (user?.uid) {
        try {
          const remote = await fetchSupabaseAttendance(user.uid);
          if (remote && remote.length > 0) {
            list = remote;
          }
        } catch (_) {}
      }

      if (list && list.length > 0) {
        const conducted = list.reduce((s, a) => s + a.lecturesAttended + a.lecturesAbsent, 0);
        const attended = list.reduce((s, a) => s + a.lecturesAttended, 0);
        if (conducted > 0) {
          const pct = Math.round((attended / conducted) * 100);
          setAttendanceData({
            value: `${pct}%`,
            msg: pct >= 75 ? `${attended}/${conducted} classes (Safe)` : `${attended}/${conducted} classes (Below 75%)`,
          });
        } else {
          setAttendanceData({
            value: "0/0 Classes",
            msg: "Target: 75% Attendance",
          });
        }
      } else {
        setAttendanceData({
          value: "0/0 Classes",
          msg: "Target: 75% Attendance",
        });
      }
    }

    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      loadStats(user);
    });

    return unsub;
  }, []);

  // Detect real next class from PEC timetable & roll number
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      const email = user?.email ?? null;
      const displayName = user?.displayName ?? null;
      const profile = parsePecEmail(email, displayName);
      const section = getSectionFromRollNo(profile.rollNo);
      const timetable = section ? getTimetableForSection(section) : null;
      const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
      const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
      const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;

      if (isWeekend) {
        setNextClassInfo({ value: "Weekend 🎉", subtitle: "No classes scheduled" });
      } else if (!section) {
        setNextClassInfo({ value: "Set Roll No", subtitle: "Update profile for timetable" });
      } else if (!timetable) {
        setNextClassInfo({ value: `Section ${section}`, subtitle: "Schedule coming soon" });
      } else if (!nextInfo) {
        setNextClassInfo({ value: "All Done 🎓", subtitle: "No more classes today" });
      } else {
        const slot = nextInfo.slot.slot;
        const subject = slot?.subject || "Class";
        const room = slot?.room ? `Room ${slot.room}` : "";
        const [sh, sm] = nextInfo.slot.start.split(":").map(Number);
        const suffix = sh < 12 ? "AM" : "PM";
        const h12 = sh > 12 ? sh - 12 : sh === 0 ? 12 : sh;
        const timeStr = `${h12}:${sm.toString().padStart(2, "0")} ${suffix}`;
        const prefix = nextInfo.status === "ongoing" ? "🔴 Live · " : "";

        setNextClassInfo({
          value: subject,
          subtitle: `${prefix}${timeStr}${room ? ` · ${room}` : ""}`,
        });
      }
    });

    return unsub;
  }, []);

  const TODAY_OVERVIEW: OverviewItem[] = [
    {
      icon: BookOpen,
      title: "Next Class",
      value: nextClassInfo.value,
      subtitle: nextClassInfo.subtitle,
      href: "/app/timetable",
    },
    {
      icon: UtensilsCrossed,
      title: "Mess Menu",
      value: "Kurukshetra / Vindhya",
      subtitle: "Scheduled 4-Meal Menu",
      href: "/app/canteen",
    },
    {
      icon: CheckSquare,
      title: "Attendance Status",
      value: attendanceData.value,
      subtitle: attendanceData.msg,
      href: "/app/attendance",
    },
    {
      icon: Calendar,
      title: "Orientation & Events",
      value: "Freshers Week 2026",
      subtitle: "7-Day Schedule Live",
      href: "/app/clubs",
    },
  ];

  return (
    <section className="relative z-10 animate-fade-up">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Zap className="h-4 w-4 text-primary" />
        Today&apos;s Overview
      </h2>

      <div className="relative -mx-6 overflow-visible px-6 py-1">
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
          {TODAY_OVERVIEW.map((item, index) => (
            <OverviewCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
