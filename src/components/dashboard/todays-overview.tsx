import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

import { useState, useEffect } from "react";
import { loadLocalAttendance } from "@/lib/attendance";

type OverviewItem = {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
};

function OverviewCard({ item, index }: { item: OverviewItem; index: number }) {
  const Icon = item.icon;

  return (
    <article
      className="group relative z-0 min-w-[220px] shrink-0 rounded-2xl border border-border glass p-4 transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-up md:min-w-0"
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
}

export function TodaysOverview() {
  const [attendanceData, setAttendanceData] = useState({ pct: 82, msg: "Safe Zone" });

  useEffect(() => {
    const list = loadLocalAttendance();
    if (list && list.length > 0) {
      const conducted = list.reduce((s, a) => s + a.lecturesAttended + a.lecturesAbsent, 0);
      const attended = list.reduce((s, a) => s + a.lecturesAttended, 0);
      if (conducted > 0) {
        const pct = (attended / conducted) * 100;
        setAttendanceData({
          pct: Math.round(pct),
          msg: pct >= 75 ? "Above 75% Target" : "Below 75% Target",
        });
      }
    }
  }, []);

  const TODAY_OVERVIEW: OverviewItem[] = [
    {
      icon: BookOpen,
      title: "Next Class",
      value: "DBMS Lab",
      subtitle: "10:00 AM · Room C204",
    },
    {
      icon: FileText,
      title: "Assignment Due",
      value: "DSA Lab Report",
      subtitle: "Due Today · 11:59 PM",
    },
    {
      icon: UtensilsCrossed,
      title: "Today's Meal",
      value: "Paneer Butter Masala",
      subtitle: "₹45 · 520 kcal",
    },
    {
      icon: Calendar,
      title: "Upcoming Event",
      value: "AI Workshop",
      subtitle: "5:00 PM · Auditorium",
    },
    {
      icon: CheckSquare,
      title: "Attendance Status",
      value: `${attendanceData.pct}%`,
      subtitle: attendanceData.msg,
    },
    {
      icon: Clock,
      title: "Study Room Booking",
      value: "Room A",
      subtitle: "Booked · 7:00 PM",
    },
  ];

  return (
    <section className="relative z-10 animate-fade-up">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Zap className="h-4 w-4 text-primary" />
        Today&apos;s Overview
      </h2>

      <div className="relative -mx-6 overflow-visible px-6 py-1">
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0 xl:grid-cols-6">
          {TODAY_OVERVIEW.map((item, index) => (
            <OverviewCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
