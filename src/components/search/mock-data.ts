import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  MessageSquare,
  Calendar,
  BookOpen,
  Heart,
  CheckSquare,
  FileText,
  Users,
  Zap,
  Upload,
  Tag,
  Book,
  Code,
  Cpu,
  Database,
  Globe,
  Hash,
  GraduationCap,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type SearchCategory =
  "Pages" | "Resources" | "Marketplace" | "Clubs" | "Events" | "Students" | "Chat";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  icon: LucideIcon;
  href?: string;
  keywords?: string[];
}

export const SEARCH_DATA: SearchResult[] = [
  // ── Pages ──────────────────────────────────────────────────────────────
  {
    id: "page-dashboard",
    title: "Dashboard",
    subtitle: "Your home feed and overview",
    category: "Pages",
    icon: LayoutDashboard,
    href: "/app",
    keywords: ["home", "overview", "stats"],
  },
  {
    id: "page-orientation",
    title: "Orientation 2026",
    subtitle: "Freshers Guide, Reporting Venues, Schedule & Maps",
    category: "Pages",
    icon: Compass,
    href: "/app/orientation",
    keywords: ["orientation", "fresher", "freshers", "map", "day 1", "reporting", "venue", "schedule", "auditorium", "nab"],
  },
  {
    id: "page-marketplace",
    title: "Marketplace",
    subtitle: "Buy and sell items on campus",
    category: "Pages",
    icon: ShoppingBag,
    href: "/app/marketplace",
    keywords: ["buy", "sell", "listings", "shop"],
  },
  {
    id: "page-canteen",
    title: "Mess Menu",
    subtitle: "Hostel mess menus and campus dining",
    category: "Pages",
    icon: UtensilsCrossed,
    href: "/app/canteen",
    keywords: ["food", "lunch", "menu", "eat", "mess", "kurukshetra", "hostel"],
  },
  {
    id: "page-chat",
    title: "Campus Chat",
    subtitle: "Channels, DMs and group messages",
    category: "Pages",
    icon: MessageSquare,
    href: "/app/chat",
    keywords: ["messages", "dm", "group", "channels"],
  },
  {
    id: "page-clubs",
    title: "Clubs & Events",
    subtitle: "Student clubs and campus events",
    category: "Pages",
    icon: Calendar,
    href: "/app/clubs",
    keywords: ["events", "hackathon", "club", "activities"],
  },
  {
    id: "page-study",
    title: "Study Rooms",
    subtitle: "Book a quiet study space",
    category: "Pages",
    icon: BookOpen,
    href: "/app/study",
    keywords: ["library", "room", "book", "quiet"],
  },
  {
    id: "page-dating",
    title: "Campus Match",
    subtitle: "Find connections on campus",
    category: "Pages",
    icon: Heart,
    href: "/app/dating",
    keywords: ["dating", "match", "swipe", "connect"],
  },
  {
    id: "page-attendance",
    title: "Attendance Tracker",
    subtitle: "Monitor your class attendance",
    category: "Pages",
    icon: CheckSquare,
    href: "/app/attendance",
    keywords: ["present", "absent", "classes", "percentage"],
  },
  {
    id: "page-resources",
    title: "Academic Resources",
    subtitle: "Notes, syllabus and past papers",
    category: "Pages",
    icon: FileText,
    href: "/app/resources",
    keywords: ["notes", "syllabus", "papers", "academic"],
  },

  // ── Resources ──────────────────────────────────────────────────────────
  {
    id: "res-dbms-notes",
    title: "DBMS Notes — Unit 1-5",
    subtitle: "By Priya S. · PDF · 4.2 MB",
    category: "Resources",
    icon: Database,
    href: "/app/resources",
    keywords: ["dbms", "database", "sql", "notes", "pdf"],
  },
  {
    id: "res-os-notes",
    title: "OS Notes — Complete",
    subtitle: "By Rohan K. · PDF · 6.1 MB",
    category: "Resources",
    icon: Cpu,
    href: "/app/resources",
    keywords: ["os", "operating system", "notes", "pdf"],
  },
  {
    id: "res-dsa-cheatsheet",
    title: "DSA Cheat Sheet",
    subtitle: "By Arjun V. · PDF · 1.8 MB",
    category: "Resources",
    icon: Code,
    href: "/app/resources",
    keywords: ["dsa", "algorithms", "data structures", "cheatsheet"],
  },
  {
    id: "res-cn-notes",
    title: "Computer Networks — Full Notes",
    subtitle: "By Sneha T. · PDF · 5.4 MB",
    category: "Resources",
    icon: Globe,
    href: "/app/resources",
    keywords: ["cn", "networking", "protocols", "notes"],
  },
  {
    id: "res-ml-lab",
    title: "Machine Learning Lab Manual",
    subtitle: "By Prof. Sharma · PDF · 2.9 MB",
    category: "Resources",
    icon: Zap,
    href: "/app/resources",
    keywords: ["ml", "machine learning", "lab", "manual"],
  },

  // ── Marketplace ─────────────────────────────────────────────────────────
  {
    id: "mkt-gpu",
    title: "NVIDIA RTX 3060 Ti",
    subtitle: "₹18,000 · GPU for Sale · Like New",
    category: "Marketplace",
    icon: Cpu,
    href: "/app/marketplace",
    keywords: ["gpu", "nvidia", "graphics card", "rtx", "sale"],
  },
  {
    id: "mkt-dsa-book",
    title: "Introduction to Algorithms (CLRS)",
    subtitle: "₹450 · Textbook · Good Condition",
    category: "Marketplace",
    icon: Book,
    href: "/app/marketplace",
    keywords: ["book", "clrs", "algorithms", "dsa", "textbook"],
  },
  {
    id: "mkt-calculator",
    title: "Casio FX-991EX Calculator",
    subtitle: "₹700 · Calculator · Used",
    category: "Marketplace",
    icon: Tag,
    href: "/app/marketplace",
    keywords: ["calculator", "casio", "scientific"],
  },
  {
    id: "mkt-laptop",
    title: "Dell Inspiron i5 11th Gen",
    subtitle: "₹32,000 · Laptop · 2 yrs old",
    category: "Marketplace",
    icon: Cpu,
    href: "/app/marketplace",
    keywords: ["laptop", "dell", "computer", "sale"],
  },
  {
    id: "mkt-cycle",
    title: "Hero Sprint Bicycle",
    subtitle: "₹2,500 · Bicycle · Working Condition",
    category: "Marketplace",
    icon: Tag,
    href: "/app/marketplace",
    keywords: ["bicycle", "cycle", "transport", "sale"],
  },

  // ── Clubs ───────────────────────────────────────────────────────────────
  {
    id: "club-eic",
    title: "EIC — Entrepreneurship & Incubation Cell",
    subtitle: "Startups, SproutX funding & E-Summit · 450 members",
    category: "Clubs",
    icon: Zap,
    href: "/app/clubs",
    keywords: ["eic", "startups", "entrepreneurship", "sproutx", "incubation", "funding"],
  },
  {
    id: "club-acm",
    title: "ACM CSS — Computer Science Society",
    subtitle: "Competitive programming & hackathons · 490 members",
    category: "Clubs",
    icon: Code,
    href: "/app/clubs",
    keywords: ["acm", "css", "coding", "programming", "hackathons", "dsa"],
  },
  {
    id: "club-robotics",
    title: "Robotics Society",
    subtitle: "Combat bots, IoT & Robowars · 380 members",
    category: "Clubs",
    icon: Cpu,
    href: "/app/clubs",
    keywords: ["robotics", "arduino", "hardware", "iot", "robowars"],
  },
  {
    id: "club-ieee",
    title: "IEEE Student Branch",
    subtitle: "Electronics & embedded research · 410 members",
    category: "Clubs",
    icon: Zap,
    href: "/app/clubs",
    keywords: ["ieee", "electronics", "electrical", "iot"],
  },
  {
    id: "club-asce",
    title: "ASCE — Civil Engineers Society",
    subtitle: "Structures & design · 245 members",
    category: "Clubs",
    icon: Users,
    href: "/app/clubs",
    keywords: ["asce", "civil", "structural", "design"],
  },
  {
    id: "club-asme",
    title: "ASME — Mechanical Engineers Society",
    subtitle: "CAD/CAM & robotics · 310 members",
    category: "Clubs",
    icon: Cpu,
    href: "/app/clubs",
    keywords: ["asme", "mechanical", "cad", "cam"],
  },
  {
    id: "club-sae",
    title: "SAE — Automotive Engineers",
    subtitle: "Formula Student & BAJA SAE · 290 members",
    category: "Clubs",
    icon: Tag,
    href: "/app/clubs",
    keywords: ["sae", "baja", "automotive", "car", "formula"],
  },
  {
    id: "club-music",
    title: "Music Club",
    subtitle: "Bands, vocals & fest concerts · 280 members",
    category: "Clubs",
    icon: Users,
    href: "/app/clubs",
    keywords: ["music", "band", "singing", "guitar", "pecfest"],
  },
  {
    id: "club-dramatics",
    title: "Dramatics Club",
    subtitle: "Stage plays & street theatre · 210 members",
    category: "Clubs",
    icon: Users,
    href: "/app/clubs",
    keywords: ["dramatics", "drama", "theatre", "nukkad natak", "acting"],
  },
  {
    id: "club-apc",
    title: "APC — Art & Photography Club",
    subtitle: "Photography walks & fine arts · 230 members",
    category: "Clubs",
    icon: FileText,
    href: "/app/clubs",
    keywords: ["apc", "art", "photography", "photos", "painting"],
  },
  {
    id: "club-editorial",
    title: "Editorial Boards (EEB / HEB / PEB)",
    subtitle: "English, Hindi & Punjabi literature · 350 members",
    category: "Clubs",
    icon: BookOpen,
    href: "/app/clubs",
    keywords: ["editorial", "eeb", "heb", "peb", "magazine", "literature", "writing"],
  },

  // ── Events ──────────────────────────────────────────────────────────────
  {
    id: "event-orientation-d1",
    title: "Freshers Orientation 2026 — Day 1",
    subtitle: "Aug 19 · Welcome & Director's Address · Auditorium",
    category: "Events",
    icon: Compass,
    href: "/app/orientation",
    keywords: ["orientation", "day 1", "aug 19", "auditorium", "fresher"],
  },
  {
    id: "event-orientation-d2",
    title: "Freshers Orientation 2026 — Day 2",
    subtitle: "Aug 20 · Academic Curriculum & Mentorship",
    category: "Events",
    icon: BookOpen,
    href: "/app/orientation",
    keywords: ["orientation", "day 2", "aug 20", "academics", "branch"],
  },
  {
    id: "event-orientation-d3",
    title: "Freshers Orientation 2026 — Day 3",
    subtitle: "Aug 21 · Technical & Cultural Clubs Fair · OAT",
    category: "Events",
    icon: Calendar,
    href: "/app/clubs",
    keywords: ["orientation", "day 3", "clubs fair", "oat", "aug 21"],
  },
  {
    id: "event-orientation-d6",
    title: "Freshers Orientation 2026 — Day 6",
    subtitle: "Aug 24 · Innovation & EIC SproutX Startup Fair",
    category: "Events",
    icon: Zap,
    href: "/app/clubs",
    keywords: ["orientation", "day 6", "eic", "startups", "sproutx", "aug 24"],
  },
  {
    id: "event-orientation-d7",
    title: "Freshers Orientation 2026 — Day 7",
    subtitle: "Aug 25 · Valedictory & Cultural Evening · Auditorium",
    category: "Events",
    icon: Calendar,
    href: "/app/orientation",
    keywords: ["orientation", "day 7", "cultural", "valedictory", "aug 25"],
  },

  // ── Students ────────────────────────────────────────────────────────────
  {
    id: "student-priya",
    title: "Priya Sharma",
    subtitle: "3rd Year · CS · Roll CS21B019",
    category: "Students",
    icon: GraduationCap,
    keywords: ["priya", "sharma", "cs", "3rd year"],
  },
  {
    id: "student-rohan",
    title: "Rohan Kapoor",
    subtitle: "2nd Year · ECE · Roll EC22B041",
    category: "Students",
    icon: GraduationCap,
    keywords: ["rohan", "kapoor", "ece", "2nd year"],
  },
  {
    id: "student-sneha",
    title: "Sneha Tripathi",
    subtitle: "4th Year · IT · Roll IT20B008",
    category: "Students",
    icon: GraduationCap,
    keywords: ["sneha", "tripathi", "it", "4th year"],
  },
  {
    id: "student-arjun",
    title: "Arjun Verma",
    subtitle: "1st Year · MECH · Roll ME23B055",
    category: "Students",
    icon: GraduationCap,
    keywords: ["arjun", "verma", "mech", "1st year"],
  },

  // ── Chat Channels ───────────────────────────────────────────────────────
  {
    id: "chat-cs-gen",
    title: "#cs-general",
    subtitle: "CS department general chat · 145 members",
    category: "Chat",
    icon: Hash,
    href: "/app/chat",
    keywords: ["cs", "general", "department", "channel"],
  },
  {
    id: "chat-assignments",
    title: "#assignments",
    subtitle: "Share and discuss assignments · 220 members",
    category: "Chat",
    icon: Hash,
    href: "/app/chat",
    keywords: ["assignments", "homework", "submit", "channel"],
  },
  {
    id: "chat-placements",
    title: "#placements",
    subtitle: "Jobs, internships and placement news · 310 members",
    category: "Chat",
    icon: Hash,
    href: "/app/chat",
    keywords: ["placements", "jobs", "internship", "career"],
  },
  {
    id: "chat-random",
    title: "#random",
    subtitle: "Off-topic fun and memes · 405 members",
    category: "Chat",
    icon: Hash,
    href: "/app/chat",
    keywords: ["random", "memes", "fun", "off-topic"],
  },
];

export const TRENDING_SEARCHES = [
  "AI Workshop",
  "DBMS Notes",
  "GPU for Sale",
  "Coding Club",
  "Hackathon",
];

export const QUICK_ACTIONS = [
  {
    id: "qa-upload",
    label: "Upload Notes",
    icon: Upload,
    href: "/app/resources",
    description: "Share resources with classmates",
  },
  {
    id: "qa-sell",
    label: "Sell Item",
    icon: Tag,
    href: "/app/marketplace",
    description: "List something on marketplace",
  },
  {
    id: "qa-study",
    label: "Book Study Room",
    icon: BookOpen,
    href: "/app/study",
    description: "Reserve a quiet study space",
  },
  {
    id: "qa-event",
    label: "Create Event",
    icon: Calendar,
    href: "/app/clubs",
    description: "Organise a club event",
  },
];

const RECENT_KEY = "cc_recent_searches";

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  if (!term.trim()) return;
  const existing = getRecentSearches().filter((s) => s.toLowerCase() !== term.toLowerCase());
  const next = [term, ...existing].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function clearRecentSearches(): void {
  localStorage.removeItem(RECENT_KEY);
}

export function filterSearchResults(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q)),
  ).slice(0, 20);
}
