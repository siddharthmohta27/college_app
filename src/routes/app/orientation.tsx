import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import { fetchOrientationData, OrientationData } from "@/lib/orientation-api";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  FileText,
  Building,
  Users,
  ChevronRight,
  Info,
  Sparkles,
  Navigation,
  Utensils,
  GraduationCap,
  Shield,
  Layers,
  X,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/app/orientation")({
  head: () => ({
    meta: [
      { title: "Orientation 2026 — Campus Connect" },
      {
        name: "description",
        content: "PEC Freshers Orientation 2026 guide, campus maps, reporting venues, and Day 1 schedule.",
      },
    ],
  }),
  component: OrientationPage,
});

// ─── Data Definitions ────────────────────────────────────────────────────────

interface ScheduleEvent {
  id: string;
  time: string;
  activity: string;
  venue: string;
  coordinator?: string;
  category: "morning" | "inaugural" | "lunch" | "afternoon";
  highlight?: boolean;
  notes?: string;
}

const DAY1_SCHEDULE: ScheduleEvent[] = [
  {
    id: "s1",
    time: "8:30 AM – 9:30 AM",
    activity: "Attendance in respective rooms/venues (Annexure 1)",
    venue: "Respective Branch Venues (Auditorium / NAB L-26 to L-31)",
    coordinator: "Respective Faculty Incharges & Student Branch Incharges",
    category: "morning",
    highlight: true,
    notes: "Mandatory reporting for all first-year freshers. Check your branch venue below.",
  },
  {
    id: "s2",
    time: "9:30 AM – 10:00 AM",
    activity: "Distribution of Welcome Kit",
    venue: "Auditorium",
    coordinator: "Prof. Amandeep Kaur, Prof. Shilpi Chaudhary, Prof. Nidhi Tanwar",
    category: "morning",
  },
  {
    id: "s3",
    time: "10:00 AM – 10:05 AM",
    activity: "Welcoming the Batch of 2029/2030 & Welcoming Dignitaries",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s4",
    time: "10:05 AM – 10:10 AM",
    activity: "Inaugural & Traditional Lamp Lighting",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s5",
    time: "10:10 AM – 10:15 AM",
    activity: "Know Your Director Video / Presentation",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s6",
    time: "10:15 AM – 10:35 AM",
    activity: "Address by Director, PEC",
    venue: "Auditorium",
    category: "inaugural",
    highlight: true,
  },
  {
    id: "s7",
    time: "10:35 AM – 10:40 AM",
    activity: "Introduction of the Chief Guest",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s8",
    time: "10:40 AM – 11:10 AM",
    activity: "Opening Keynote Address by Chief Guest",
    venue: "Auditorium",
    category: "inaugural",
    highlight: true,
  },
  {
    id: "s9",
    time: "11:10 AM – 11:20 AM",
    activity: "Felicitation Ceremony",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s10",
    time: "11:20 AM – 11:25 AM",
    activity: "Vote of Thanks",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s11",
    time: "11:25 AM – 11:30 AM",
    activity: "PEC Heritage Documentary Video",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s12",
    time: "11:30 AM – 11:40 AM",
    activity: "Introduction to Heads of Departments, Deans & Registrar",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s13",
    time: "11:40 AM – 12:00 PM",
    activity: "Address by Dean of Academic Affairs (DAA)",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s14",
    time: "12:00 PM – 12:15 PM",
    activity: "Address by Dean of Student Affairs (DSA)",
    venue: "Auditorium",
    category: "inaugural",
  },
  {
    id: "s15",
    time: "12:15 PM – 12:45 PM",
    activity: "Dispersal of Students to Respective Hostels",
    venue: "Respective Hostels (Kalpana Chawla / Shivalik / Aravali / Kurukshetra)",
    category: "lunch",
  },
  {
    id: "s16",
    time: "12:45 PM – 2:00 PM",
    activity: "Orientation Lunch (Annexure 2)",
    venue: "Centenary Hall / Shivalik Hostel / Kalpana Chawla Hostel",
    coordinator: "Student Branch Incharges & Discipline Incharges",
    category: "lunch",
    highlight: true,
    notes: "All Girls at Kalpana Chawla Hostel. Hosteller Boys at Shivalik Hostel. Day Scholars at Centenary Hall & KC Hostel.",
  },
  {
    id: "s17",
    time: "2:00 PM – 4:00 PM",
    activity: "Department Visits & Interactive Sessions (Annexure 3)",
    venue: "Respective Department Venues & Labs",
    coordinator: "Address by Respective HOD, Interaction with Faculty & Lab Visits",
    category: "afternoon",
    highlight: true,
  },
  {
    id: "s18",
    time: "4:00 PM – 4:30 PM",
    activity: "Evening Refreshments & Snacks",
    venue: "Department Venues / Annexure 3 Locations",
    category: "afternoon",
  },
  {
    id: "s19",
    time: "4:30 PM – 5:00 PM",
    activity: "Guided Institute & Campus Tour",
    venue: "Campus Grounds, Sports Complex, Library & CDGC",
    coordinator: "Student Branch Incharges & Discipline Incharges",
    category: "afternoon",
    notes: "Visit athletic grounds, swimming pool, central library, and student activity center.",
  },
];

interface ReportingBranch {
  name: string;
  code: string;
  group: string;
  venueName: string;
  building: string;
  floor: string;
  routeType: "audi" | "nab";
  gateDirections: string;
  studentsCount?: number;
  deptVisitVenue?: string;
}

const REPORTING_BRANCHES: ReportingBranch[] = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    group: "Group A",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 137,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    group: "Group B",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 137,
    deptVisitVenue: "Aero Auditorium",
  },
  {
    name: "VLSI Design & Technology",
    code: "VLSI",
    group: "Group C",
    venueName: "Main Auditorium",
    building: "Auditorium Complex",
    floor: "Ground Floor",
    routeType: "audi",
    gateDirections: "Enter Gate 2 -> Go straight through PEC Roundabout -> Turn RIGHT to Auditorium.",
    studentsCount: 36,
    deptVisitVenue: "Aero Auditorium",
  },
  {
    name: "Bachelor of Design (B.Design)",
    code: "B.Design",
    group: "Group C",
    venueName: "Lecture Hall L-26",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 25,
    deptVisitVenue: "L-17",
  },
  {
    name: "Aerospace Engineering",
    code: "AERO",
    group: "Group C",
    venueName: "Lecture Hall L-26",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Seminar Hall, Aero Department",
  },
  {
    name: "Electrical Engineering",
    code: "Electrical",
    group: "Group D",
    venueName: "Lecture Hall L-27",
    building: "New Academic Block (NAB)",
    floor: "Ground Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 136,
    deptVisitVenue: "L-27",
  },
  {
    name: "Civil Engineering",
    code: "Civil",
    group: "Group E",
    venueName: "Lecture Hall L-28",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 136,
    deptVisitVenue: "L-26",
  },
  {
    name: "CSE (Artificial Intelligence)",
    code: "AI",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "CSE (Data Science)",
    code: "DS",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 67,
    deptVisitVenue: "Auditorium",
  },
  {
    name: "Mathematics & Computing",
    code: "M&C",
    group: "Group F",
    venueName: "Lecture Hall L-29",
    building: "New Academic Block (NAB)",
    floor: "1st Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 36,
    deptVisitVenue: "Mathematics Lab near T5",
  },
  {
    name: "Mechanical Engineering",
    code: "Mechanical",
    group: "Group G",
    venueName: "Lecture Hall L-30",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 137,
    deptVisitVenue: "L-28",
  },
  {
    name: "Materials & Metallurgical Engineering",
    code: "Metallurgy",
    group: "Group H",
    venueName: "Lecture Hall L-31",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 69,
    deptVisitVenue: "Seminar Hall, MMED",
  },
  {
    name: "Production & Industrial Engineering",
    code: "Production",
    group: "Group H",
    venueName: "Lecture Hall L-31",
    building: "New Academic Block (NAB)",
    floor: "2nd Floor",
    routeType: "nab",
    gateDirections: "Enter Gate 2 -> Roundabout -> Go straight past Library -> Turn RIGHT past CSRC & Nescafe to NAB.",
    studentsCount: 46,
    deptVisitVenue: "L-17",
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────

function OrientationPage() {
  const [activeTab, setActiveTab] = useState<"all" | "venues" | "map" | "schedule">("all");
  const [selectedBranchCode, setSelectedBranchCode] = useState<string>("CSE");
  const [venueRouteTab, setVenueRouteTab] = useState<"audi" | "nab">("audi");
  const [scheduleCategory, setScheduleCategory] = useState<string>("all");
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [activeAnnexure, setActiveAnnexure] = useState<"none" | "1" | "2" | "3">("none");
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(DAY1_SCHEDULE);
  
  // Lightbox modal state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Map interactive zoom state
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Fetch dynamic orientation content on mount
  useEffect(() => {
    fetchOrientationData().then((data) => {
      if (data && Array.isArray(data.schedule) && data.schedule.length > 0) {
        const formatted: ScheduleEvent[] = data.schedule.map((item) => ({
          id: String(item.id),
          time: item.time_slot || item.time || "",
          activity: item.activity,
          venue: item.venue,
          coordinator: item.coordinator,
          category: (item.category as any) || "morning",
        }));
        setScheduleEvents(formatted);
      }
    });
  }, []);

  const selectedBranch = useMemo(() => {
    return REPORTING_BRANCHES.find((b) => b.code === selectedBranchCode) || REPORTING_BRANCHES[0];
  }, [selectedBranchCode]);

  const filteredSchedule = useMemo(() => {
    return scheduleEvents.filter((item) => {
      const matchCategory =
        scheduleCategory === "all" || item.category === scheduleCategory;
      const matchSearch =
        scheduleSearch.trim() === "" ||
        item.activity.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
        item.venue.toLowerCase().includes(scheduleSearch.toLowerCase()) ||
        (item.coordinator && item.coordinator.toLowerCase().includes(scheduleSearch.toLowerCase())) ||
        item.time.toLowerCase().includes(scheduleSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [scheduleEvents, scheduleCategory, scheduleSearch]);

  const handleZoomIn = () => setMapZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setMapZoom((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => {
    setMapZoom(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - mapPosition.x, y: e.clientY - mapPosition.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="min-h-screen w-full bg-background pb-20 text-foreground overflow-x-hidden">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between pb-3 text-white">
              <h3 className="text-sm font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                {lightboxImage.title}
              </h3>
              <button
                onClick={() => setLightboxImage(null)}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="w-full overflow-auto rounded-2xl border border-white/10 bg-black/50 p-2 flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
            <p className="mt-3 text-xs text-neutral-400 text-center">
              Pinch / zoom supported on touch devices · Tap background or press close button to exit
            </p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <header className="relative border-b border-border/80 bg-gradient-to-b from-primary/10 via-surface to-background px-4 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                <Compass className="h-3.5 w-3.5" />
                <span>Punjab Engineering College · Freshers Hub</span>
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
                Orientation 2026 <span className="gradient-text">· Batch 2026–2030</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Day 1 Reporting Venues, Campus Map, and Tentative Schedule for Wednesday, 19th August 2026.
                Find your reporting room, auditorium routes, lunch distribution, and department visit schedule.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-start">
              <a
                href="/orientation/orientation-day1-schedule.pdf"
                target="_blank"
                rel="noreferrer"
                download="PEC_Orientation_Day1_Schedule.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition"
              >
                <Download className="h-4 w-4" />
                <span>Download Schedule PDF</span>
              </a>
              <a
                href="/orientation/pec-orientation-map.png"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium hover:bg-surface-elevated transition"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>Open Full Map</span>
              </a>
            </div>
          </div>

          {/* Quick Filter Navigation Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/50 pt-4">
            {[
              { id: "all", label: "Overview & All Info", icon: Layers },
              { id: "venues", label: "Day 1 Reporting Venues", icon: Building },
              { id: "map", label: "Orientation Campus Map", icon: MapPin },
              { id: "schedule", label: "Day 1 Schedule & Annexures", icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground font-semibold glow-primary"
                      : "bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground border border-border/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 space-y-12">
        
        {/* ─── SECTION 1: REPORTING VENUE SELECTOR & MAPS ───────────────── */}
        {(activeTab === "all" || activeTab === "venues") && (
          <section id="reporting-venues" className="space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-500">
                    <Building className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Day 1 Reporting Venues</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Mandatory attendance reporting at <strong>8:30 AM – 9:30 AM</strong> on Wednesday, 19th August 2026.
                </p>
              </div>

              {/* Branch Selector Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="branch-select" className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  Select Your Branch:
                </label>
                <select
                  id="branch-select"
                  value={selectedBranchCode}
                  onChange={(e) => {
                    setSelectedBranchCode(e.target.value);
                    const b = REPORTING_BRANCHES.find((item) => item.code === e.target.value);
                    if (b) setVenueRouteTab(b.routeType);
                  }}
                  className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                  {REPORTING_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} — {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Personalized Branch Fast Card */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                      {selectedBranch.code}
                    </span>
                    <span className="rounded-lg bg-surface border border-border px-2.5 py-1 text-xs font-mono font-semibold text-muted-foreground">
                      {selectedBranch.group}
                    </span>
                    <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                      Reporting: 8:30 AM – 9:30 AM
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedBranch.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="rounded-xl border border-border/80 bg-surface/80 p-3">
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Assigned Venue / Room
                      </span>
                      <strong className="text-sm text-primary">{selectedBranch.venueName}</strong>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-surface/80 p-3">
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Building & Floor
                      </span>
                      <strong className="text-sm text-foreground">
                        {selectedBranch.building} ({selectedBranch.floor})
                      </strong>
                    </div>
                    <div className="rounded-xl border border-border/80 bg-surface/80 p-3 sm:col-span-2 md:col-span-1">
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                        Afternoon Dept Visit (2 PM)
                      </span>
                      <strong className="text-sm text-foreground">
                        {selectedBranch.deptVisitVenue || "Auditorium"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Gate Directions highlight */}
                <div className="lg:max-w-md rounded-xl border border-border bg-surface p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span>How to Reach from Gate</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedBranch.gateDirections}
                  </p>
                  <button
                    onClick={() => setVenueRouteTab(selectedBranch.routeType)}
                    className="mt-1 text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>View route map below</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Route Map Tabs and Visual Guide */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 cols: Map Visual */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex rounded-xl border border-border bg-surface p-1">
                  <button
                    onClick={() => setVenueRouteTab("audi")}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                      venueRouteTab === "audi"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Auditorium Route (CSE, ECE, VLSI)
                  </button>
                  <button
                    onClick={() => setVenueRouteTab("nab")}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                      venueRouteTab === "nab"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    NAB Route (Aero, Elec, Civil, AI, DS, Mech, etc.)
                  </button>
                </div>

                {/* Image Display Card with Lightbox Trigger */}
                <div className="relative rounded-2xl border border-border bg-surface/40 overflow-hidden shadow-lg group">
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() =>
                        setLightboxImage({
                          src:
                            venueRouteTab === "audi"
                              ? "/orientation/reporting-venue-audi.png"
                              : "/orientation/reporting-venue-nab.png",
                          title:
                            venueRouteTab === "audi"
                              ? "Auditorium Reporting Route Map"
                              : "New Academic Block (NAB) Reporting Route Map",
                        })
                      }
                      className="flex items-center gap-1.5 rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-medium text-white hover:bg-black/80 transition"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Expand / Zoom</span>
                    </button>
                  </div>

                  <img
                    src={
                      venueRouteTab === "audi"
                        ? "/orientation/reporting-venue-audi.png"
                        : "/orientation/reporting-venue-nab.png"
                    }
                    alt={
                      venueRouteTab === "audi"
                        ? "Reporting on Day 1 for CSE, ECE, VLSI"
                        : "Reporting on Day 1 for NAB Branches"
                    }
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01] cursor-pointer"
                    onClick={() =>
                      setLightboxImage({
                        src:
                          venueRouteTab === "audi"
                            ? "/orientation/reporting-venue-audi.png"
                            : "/orientation/reporting-venue-nab.png",
                        title:
                          venueRouteTab === "audi"
                            ? "Auditorium Reporting Route Map"
                            : "New Academic Block (NAB) Reporting Route Map",
                      })
                    }
                  />
                  <div className="border-t border-border/60 bg-surface/90 px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
                    <span>
                      {venueRouteTab === "audi"
                        ? "📌 Route: Gate 2 ➔ PEC Roundabout ➔ Right to Auditorium"
                        : "📌 Route: Gate 2 ➔ Roundabout ➔ Past Library ➔ Right to New Academic Block (NAB)"}
                    </span>
                    <span className="text-[10px] font-mono text-primary">Tap image to zoom</span>
                  </div>
                </div>
              </div>

              {/* Right 5 cols: Structured Extract Text */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl border border-border glass p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold tracking-tight flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      {venueRouteTab === "audi"
                        ? "Auditorium Venue Breakdown"
                        : "New Academic Block (NAB) Floor Guide"}
                    </h4>
                    <span className="text-[10px] font-mono uppercase bg-surface-elevated px-2 py-0.5 rounded border border-border">
                      {venueRouteTab === "audi" ? "3 Branches" : "10 Branches"}
                    </span>
                  </div>

                  {venueRouteTab === "audi" ? (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-primary">Auditorium Complex</span>
                          <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">
                            Main Stage & Seating
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Reporting Venue for <strong>CSE (Group A)</strong>, <strong>ECE (Group B)</strong>, and <strong>VLSI (Group C)</strong>.
                        </p>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border">
                          <div>
                            <span className="font-semibold block">Computer Science (CSE)</span>
                            <span className="text-[11px] text-muted-foreground">Group A · 137 Students</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-primary">Auditorium</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border">
                          <div>
                            <span className="font-semibold block">Electronics (ECE)</span>
                            <span className="text-[11px] text-muted-foreground">Group B · 137 Students</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-primary">Auditorium</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-surface border border-border">
                          <div>
                            <span className="font-semibold block">VLSI Design & Tech</span>
                            <span className="text-[11px] text-muted-foreground">Group C · 36 Students</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-primary">Auditorium</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      {/* Ground Floor */}
                      <div className="rounded-xl border border-border/80 bg-surface/80 p-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">
                          Ground Floor (NAB)
                        </span>
                        <div className="flex items-center justify-between">
                          <span>B.Design, Aerospace</span>
                          <strong className="font-mono text-foreground">Room L-26</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Electrical Engineering</span>
                          <strong className="font-mono text-foreground">Room L-27</strong>
                        </div>
                      </div>

                      {/* 1st Floor */}
                      <div className="rounded-xl border border-border/80 bg-surface/80 p-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block">
                          1st Floor (NAB)
                        </span>
                        <div className="flex items-center justify-between">
                          <span>Civil Engineering</span>
                          <strong className="font-mono text-foreground">Room L-28</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>CSE (AI), CSE (DS), M&C</span>
                          <strong className="font-mono text-foreground">Room L-29</strong>
                        </div>
                      </div>

                      {/* 2nd Floor */}
                      <div className="rounded-xl border border-border/80 bg-surface/80 p-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">
                          2nd Floor (NAB)
                        </span>
                        <div className="flex items-center justify-between">
                          <span>Mechanical Engineering</span>
                          <strong className="font-mono text-foreground">Room L-30</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Metallurgy, Production</span>
                          <strong className="font-mono text-foreground">Room L-31</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Landmarks on Way */}
                  <div className="border-t border-border/60 pt-3 text-[11px] text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">Key Landmarks Passed on Route:</p>
                    <p>• Central Library (on your left after Roundabout)</p>
                    <p>• CSRC Building & Nescafe Kiosk (on your right)</p>
                    <p>• New Academic Block (NAB) entrance right opposite Nescafe</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 2: FULL CAMPUS ORIENTATION MAP ─────────────────── */}
        {(activeTab === "all" || activeTab === "map") && (
          <section id="campus-map" className="space-y-4 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Orientation 2026 Campus Map</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pinch or drag to zoom and pan. Click any point or tap fullscreen to inspect in high resolution.
                </p>
              </div>

              {/* Map Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="rounded-lg border border-border bg-surface p-2 text-foreground hover:bg-surface-elevated transition"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="rounded-lg border border-border bg-surface p-2 text-foreground hover:bg-surface-elevated transition"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  className="rounded-lg border border-border bg-surface p-2 text-foreground hover:bg-surface-elevated transition"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setLightboxImage({
                      src: "/orientation/pec-orientation-map.png",
                      title: "PEC Chandigarh — Orientation 2026 Master Campus Map",
                    })
                  }
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Lightbox / Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Interactive Zoomable Map Card */}
            <div className="relative rounded-3xl border border-border bg-black/40 overflow-hidden shadow-2xl">
              {/* Top info badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10 shadow-sm flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  PEC Campus Master Map
                </span>
                <span className="hidden sm:inline-block rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] text-neutral-300 border border-white/10">
                  Zoom: {Math.round(mapZoom * 100)}%
                </span>
              </div>

              {/* Map viewport container */}
              <div
                className="relative w-full h-[400px] sm:h-[550px] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={() => {}}
              >
                <img
                  src="/orientation/pec-orientation-map.png"
                  alt="Punjab Engineering College Orientation 2026 Map"
                  style={{
                    transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`,
                    transition: isDragging ? "none" : "transform 0.15s ease-out",
                  }}
                  className="max-w-none w-full h-auto object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Quick Jump Hotspot Badges */}
              <div className="border-t border-border/60 bg-surface/90 px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-muted-foreground mr-1">Quick Spots:</span>
                  {[
                    "Auditorium",
                    "New Academic Block (NAB)",
                    "Gate 2 (Main Entrance)",
                    "Central Library",
                    "Hostels (Shivalik & Kalpana Chawla)",
                    "Centenary Hall (Lunch)",
                    "Sports Complex & Gym",
                  ].map((spot) => (
                    <span
                      key={spot}
                      className="rounded-lg bg-surface-elevated border border-border/80 px-2 py-1 text-[11px] text-foreground font-medium"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Need high-res print?{" "}
                  <a
                    href="/orientation/pec-orientation-map.png"
                    download="PEC_Orientation_Map_2026.png"
                    className="text-primary font-semibold hover:underline"
                  >
                    Download Map PNG
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 3: DAY 1 STRUCTURED SCHEDULE & TIMELINE ─────────── */}
        {(activeTab === "all" || activeTab === "schedule") && (
          <section id="day1-schedule" className="space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Day 1 Schedule (19th August 2026)</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Chronological breakdown of events, activities, reporting venues, and faculty coordinators.
                </p>
              </div>

              {/* Schedule Search & Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={scheduleSearch}
                    onChange={(e) => setScheduleSearch(e.target.value)}
                    placeholder="Search event, venue, or coordinator..."
                    className="w-48 sm:w-64 rounded-xl border border-border bg-surface py-2 pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                  {scheduleSearch && (
                    <button
                      onClick={() => setScheduleSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex rounded-xl border border-border bg-surface p-1">
                  {[
                    { id: "all", label: "All Day" },
                    { id: "morning", label: "Morning" },
                    { id: "inaugural", label: "Inaugural" },
                    { id: "lunch", label: "Lunch" },
                    { id: "afternoon", label: "Afternoon" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setScheduleCategory(cat.id)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                        scheduleCategory === cat.id
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule Table / Timeline Component */}
            <div className="rounded-2xl border border-border glass overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-surface-elevated/70 text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6 w-36 sm:w-44">Time</th>
                      <th className="py-3.5 px-4 sm:px-6">Activity / Event</th>
                      <th className="py-3.5 px-4 sm:px-6 w-44 sm:w-56">Venue</th>
                      <th className="py-3.5 px-4 sm:px-6 w-48 sm:w-64">Coordinator / Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredSchedule.map((item) => (
                      <tr
                        key={item.id}
                        className={`transition hover:bg-surface-elevated/50 ${
                          item.highlight ? "bg-primary/5" : ""
                        }`}
                      >
                        {/* Time */}
                        <td className="py-3.5 px-4 sm:px-6 font-mono font-semibold text-primary whitespace-nowrap align-top">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                            <span>{item.time}</span>
                          </div>
                        </td>

                        {/* Activity */}
                        <td className="py-3.5 px-4 sm:px-6 align-top">
                          <div className="font-semibold text-foreground text-sm">
                            {item.activity}
                          </div>
                          {item.notes && (
                            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                              {item.notes}
                            </p>
                          )}
                        </td>

                        {/* Venue */}
                        <td className="py-3.5 px-4 sm:px-6 align-top">
                          <span className="inline-flex items-center gap-1 font-medium text-foreground bg-surface border border-border/80 px-2 py-1 rounded-lg">
                            <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                            <span>{item.venue}</span>
                          </span>
                        </td>

                        {/* Coordinator / Details */}
                        <td className="py-3.5 px-4 sm:px-6 text-muted-foreground align-top">
                          {item.coordinator ? (
                            <span className="font-medium text-foreground block">
                              {item.coordinator}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/60">—</span>
                          )}
                        </td>
                      </tr>
                    ))}

                    {filteredSchedule.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-muted-foreground">
                          No schedule items matched your search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Annexures Interactive Accordions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Official Annexures (From Schedule Document)
                </h3>
                <span className="text-xs text-muted-foreground">Click to toggle details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Annexure 1: Reporting for Attendance */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "1" ? "none" : "1")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "1"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-lg bg-primary/20 text-xs font-bold text-primary">
                        1
                      </span>
                      <strong className="text-xs font-bold text-foreground">
                        Annexure 1: Attendance Reporting
                      </strong>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "1" ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Branch-wise group distribution (Group A to H) and assigned room numbers.
                  </p>
                </div>

                {/* Annexure 2: Lunch Group Distribution */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "2" ? "none" : "2")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "2"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-500">
                        2
                      </span>
                      <strong className="text-xs font-bold text-foreground">
                        Annexure 2: Lunch Distribution
                      </strong>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "2" ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Venues for Day Scholars & Hostellers (Shivalik & Kalpana Chawla Hostels).
                  </p>
                </div>

                {/* Annexure 3: Department Visits */}
                <div
                  onClick={() => setActiveAnnexure(activeAnnexure === "3" ? "none" : "3")}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${
                    activeAnnexure === "3"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-surface hover:border-primary/40 hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-500">
                        3
                      </span>
                      <strong className="text-xs font-bold text-foreground">
                        Annexure 3: Dept Visits (2 PM)
                      </strong>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        activeAnnexure === "3" ? "rotate-90 text-primary" : ""
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Afternoon lab & department venues with batch student counts.
                  </p>
                </div>
              </div>

              {/* Active Annexure Details Drawer */}
              {activeAnnexure !== "none" && (
                <div className="rounded-2xl border border-border glass p-5 animate-in fade-in duration-200">
                  {activeAnnexure === "1" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                        <span>Annexure 1: Reporting for Attendance, Day 1 (Wednesday, 19th August 2026)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                        {REPORTING_BRANCHES.map((b) => (
                          <div key={b.code} className="rounded-xl border border-border bg-surface p-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <strong className="text-foreground">{b.code}</strong>
                              <span className="font-mono text-[10px] text-primary">{b.group}</span>
                            </div>
                            <div className="text-muted-foreground text-[11px]">
                              {b.name}
                            </div>
                            <div className="font-semibold text-foreground pt-1">
                              Venue: {b.venueName} ({b.building})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeAnnexure === "2" && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                        <Utensils className="h-4 w-4" />
                        <span>Annexure 2: Lunch Group Distribution (12:45 PM – 2:00 PM)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase">
                            Day Scholars
                          </span>
                          <p className="text-sm font-bold text-foreground">
                            Centenary Hall & Kalpana Chawla Hostel
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            Day scholar students proceed to Centenary Hall for lunch catering.
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase">
                            Hostellers
                          </span>
                          <p className="text-sm font-bold text-foreground">
                            Shivalik Hostels & Kalpana Chawla Hostel
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            Hosteller boys at Shivalik Hostel mess; all girls at Kalpana Chawla Hostel.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-500 font-medium">
                        ⚠️ <strong>Important Note:</strong> All Girls will have their lunch at Kalpana Chawla Hostel & All Hosteller Boys will have their lunch at Shivalik Hostel.
                      </div>
                    </div>
                  )}

                  {activeAnnexure === "3" && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-amber-500 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>Annexure 3: Department Visits on Day 1 (2:00 PM – 4:00 PM)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                        {REPORTING_BRANCHES.map((b) => (
                          <div key={b.code} className="rounded-xl border border-border bg-surface p-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <strong className="text-foreground">{b.code}</strong>
                              <span className="font-mono text-[10px] bg-surface-elevated px-2 py-0.5 rounded border border-border">
                                {b.studentsCount} Students · {b.group}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground">
                              Visit Venue: <strong className="text-foreground">{b.deptVisitVenue}</strong>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
