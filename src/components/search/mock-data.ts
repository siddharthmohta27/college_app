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
    title: "Canteen Menu",
    subtitle: "Today's food menu and specials",
    category: "Pages",
    icon: UtensilsCrossed,
    href: "/app/canteen",
    keywords: ["food", "lunch", "menu", "eat"],
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
    id: "club-coding",
    title: "Coding Club",
    subtitle: "Weekly DSA sessions · 120 members",
    category: "Clubs",
    icon: Code,
    href: "/app/clubs",
    keywords: ["coding", "programming", "competitive", "dsa"],
  },
  {
    id: "club-robotics",
    title: "Robotics Club",
    subtitle: "Build robots & compete · 65 members",
    category: "Clubs",
    icon: Cpu,
    href: "/app/clubs",
    keywords: ["robotics", "arduino", "hardware", "iot"],
  },
  {
    id: "club-drama",
    title: "Drama & Arts Society",
    subtitle: "Theatre, music and fine arts · 88 members",
    category: "Clubs",
    icon: Users,
    href: "/app/clubs",
    keywords: ["drama", "arts", "theatre", "music", "culture"],
  },
  {
    id: "club-nss",
    title: "NSS — National Service Scheme",
    subtitle: "Community service & social work · 200 members",
    category: "Clubs",
    icon: Users,
    href: "/app/clubs",
    keywords: ["nss", "community", "service", "volunteering"],
  },

  // ── Events ──────────────────────────────────────────────────────────────
  {
    id: "event-hackathon",
    title: "Hackathon 2026",
    subtitle: "July 20–21 · Register by July 15",
    category: "Events",
    icon: Zap,
    href: "/app/clubs",
    keywords: ["hackathon", "coding", "competition", "prize"],
  },
  {
    id: "event-ai-workshop",
    title: "AI Workshop — Prompt Engineering",
    subtitle: "July 12 · Lab 3 · Free Entry",
    category: "Events",
    icon: Zap,
    href: "/app/clubs",
    keywords: ["ai", "workshop", "prompt", "llm", "chatgpt"],
  },
  {
    id: "event-techfest",
    title: "Tech Fest 2026",
    subtitle: "Aug 1–3 · Main Auditorium",
    category: "Events",
    icon: Calendar,
    href: "/app/clubs",
    keywords: ["techfest", "fest", "tech", "event"],
  },
  {
    id: "event-sports",
    title: "Inter-College Sports Meet",
    subtitle: "July 25 · Sports Ground",
    category: "Events",
    icon: Users,
    href: "/app/clubs",
    keywords: ["sports", "inter college", "athletics", "cricket"],
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
