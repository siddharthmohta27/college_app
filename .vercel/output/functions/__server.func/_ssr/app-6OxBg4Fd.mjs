import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useLocation, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./app-DPCzitxh.mjs";
import { n as setStoredRollNo, t as parsePecEmail } from "./pec-email-B1YgkvDT.mjs";
import { Ct as Compass, Et as Clock, G as Menu, Ht as BookOpen, It as Calendar, Lt as CalendarDays, Nt as Check, O as Search, P as Plus, R as Pen, S as ShoppingBag, St as Cpu, Tt as Code, Vt as Book, W as MessageSquare, X as LogOut, Y as Mail, b as Sparkles, c as UtensilsCrossed, ct as Hash, f as Upload, g as Tag, gt as FileText, i as X, jt as ChevronRight, k as SearchX, l as Users, lt as GraduationCap, m as TrendingUp, nt as LayoutDashboard, r as Zap, st as Heart, ut as Globe, w as ShieldCheck, xt as Database, y as SquareCheckBig, yt as ExternalLink, zt as Building2 } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-BFpCBOQ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-6OxBg4Fd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEARCH_DATA = [
	{
		id: "page-dashboard",
		title: "Dashboard",
		subtitle: "Your home feed and overview",
		category: "Pages",
		icon: LayoutDashboard,
		href: "/app",
		keywords: [
			"home",
			"overview",
			"stats"
		]
	},
	{
		id: "page-orientation",
		title: "Orientation 2026",
		subtitle: "Freshers Guide, Reporting Venues, Schedule & Maps",
		category: "Pages",
		icon: Compass,
		href: "/app/orientation",
		keywords: [
			"orientation",
			"fresher",
			"freshers",
			"map",
			"day 1",
			"reporting",
			"venue",
			"schedule",
			"auditorium",
			"nab"
		]
	},
	{
		id: "page-marketplace",
		title: "Marketplace",
		subtitle: "Buy and sell items on campus",
		category: "Pages",
		icon: ShoppingBag,
		href: "/app/marketplace",
		keywords: [
			"buy",
			"sell",
			"listings",
			"shop"
		]
	},
	{
		id: "page-canteen",
		title: "Mess Menu",
		subtitle: "Hostel mess menus and campus dining",
		category: "Pages",
		icon: UtensilsCrossed,
		href: "/app/canteen",
		keywords: [
			"food",
			"lunch",
			"menu",
			"eat",
			"mess",
			"kurukshetra",
			"hostel"
		]
	},
	{
		id: "page-chat",
		title: "Campus Chat",
		subtitle: "Channels, DMs and group messages",
		category: "Pages",
		icon: MessageSquare,
		href: "/app/chat",
		keywords: [
			"messages",
			"dm",
			"group",
			"channels"
		]
	},
	{
		id: "page-clubs",
		title: "Clubs & Events",
		subtitle: "Student clubs and campus events",
		category: "Pages",
		icon: Calendar,
		href: "/app/clubs",
		keywords: [
			"events",
			"hackathon",
			"club",
			"activities"
		]
	},
	{
		id: "page-study",
		title: "Study Rooms",
		subtitle: "Book a quiet study space",
		category: "Pages",
		icon: BookOpen,
		href: "/app/study",
		keywords: [
			"library",
			"room",
			"book",
			"quiet"
		]
	},
	{
		id: "page-dating",
		title: "Campus Match",
		subtitle: "Find connections on campus",
		category: "Pages",
		icon: Heart,
		href: "/app/dating",
		keywords: [
			"dating",
			"match",
			"swipe",
			"connect"
		]
	},
	{
		id: "page-attendance",
		title: "Attendance Tracker",
		subtitle: "Monitor your class attendance",
		category: "Pages",
		icon: SquareCheckBig,
		href: "/app/attendance",
		keywords: [
			"present",
			"absent",
			"classes",
			"percentage"
		]
	},
	{
		id: "page-resources",
		title: "Academic Resources",
		subtitle: "Notes, syllabus and past papers",
		category: "Pages",
		icon: FileText,
		href: "/app/resources",
		keywords: [
			"notes",
			"syllabus",
			"papers",
			"academic"
		]
	},
	{
		id: "res-dbms-notes",
		title: "DBMS Notes — Unit 1-5",
		subtitle: "By Priya S. · PDF · 4.2 MB",
		category: "Resources",
		icon: Database,
		href: "/app/resources",
		keywords: [
			"dbms",
			"database",
			"sql",
			"notes",
			"pdf"
		]
	},
	{
		id: "res-os-notes",
		title: "OS Notes — Complete",
		subtitle: "By Rohan K. · PDF · 6.1 MB",
		category: "Resources",
		icon: Cpu,
		href: "/app/resources",
		keywords: [
			"os",
			"operating system",
			"notes",
			"pdf"
		]
	},
	{
		id: "res-dsa-cheatsheet",
		title: "DSA Cheat Sheet",
		subtitle: "By Arjun V. · PDF · 1.8 MB",
		category: "Resources",
		icon: Code,
		href: "/app/resources",
		keywords: [
			"dsa",
			"algorithms",
			"data structures",
			"cheatsheet"
		]
	},
	{
		id: "res-cn-notes",
		title: "Computer Networks — Full Notes",
		subtitle: "By Sneha T. · PDF · 5.4 MB",
		category: "Resources",
		icon: Globe,
		href: "/app/resources",
		keywords: [
			"cn",
			"networking",
			"protocols",
			"notes"
		]
	},
	{
		id: "res-ml-lab",
		title: "Machine Learning Lab Manual",
		subtitle: "By Prof. Sharma · PDF · 2.9 MB",
		category: "Resources",
		icon: Zap,
		href: "/app/resources",
		keywords: [
			"ml",
			"machine learning",
			"lab",
			"manual"
		]
	},
	{
		id: "mkt-gpu",
		title: "NVIDIA RTX 3060 Ti",
		subtitle: "₹18,000 · GPU for Sale · Like New",
		category: "Marketplace",
		icon: Cpu,
		href: "/app/marketplace",
		keywords: [
			"gpu",
			"nvidia",
			"graphics card",
			"rtx",
			"sale"
		]
	},
	{
		id: "mkt-dsa-book",
		title: "Introduction to Algorithms (CLRS)",
		subtitle: "₹450 · Textbook · Good Condition",
		category: "Marketplace",
		icon: Book,
		href: "/app/marketplace",
		keywords: [
			"book",
			"clrs",
			"algorithms",
			"dsa",
			"textbook"
		]
	},
	{
		id: "mkt-calculator",
		title: "Casio FX-991EX Calculator",
		subtitle: "₹700 · Calculator · Used",
		category: "Marketplace",
		icon: Tag,
		href: "/app/marketplace",
		keywords: [
			"calculator",
			"casio",
			"scientific"
		]
	},
	{
		id: "mkt-laptop",
		title: "Dell Inspiron i5 11th Gen",
		subtitle: "₹32,000 · Laptop · 2 yrs old",
		category: "Marketplace",
		icon: Cpu,
		href: "/app/marketplace",
		keywords: [
			"laptop",
			"dell",
			"computer",
			"sale"
		]
	},
	{
		id: "mkt-cycle",
		title: "Hero Sprint Bicycle",
		subtitle: "₹2,500 · Bicycle · Working Condition",
		category: "Marketplace",
		icon: Tag,
		href: "/app/marketplace",
		keywords: [
			"bicycle",
			"cycle",
			"transport",
			"sale"
		]
	},
	{
		id: "club-coding",
		title: "Coding Club",
		subtitle: "Weekly DSA sessions · 120 members",
		category: "Clubs",
		icon: Code,
		href: "/app/clubs",
		keywords: [
			"coding",
			"programming",
			"competitive",
			"dsa"
		]
	},
	{
		id: "club-robotics",
		title: "Robotics Club",
		subtitle: "Build robots & compete · 65 members",
		category: "Clubs",
		icon: Cpu,
		href: "/app/clubs",
		keywords: [
			"robotics",
			"arduino",
			"hardware",
			"iot"
		]
	},
	{
		id: "club-drama",
		title: "Drama & Arts Society",
		subtitle: "Theatre, music and fine arts · 88 members",
		category: "Clubs",
		icon: Users,
		href: "/app/clubs",
		keywords: [
			"drama",
			"arts",
			"theatre",
			"music",
			"culture"
		]
	},
	{
		id: "club-nss",
		title: "NSS — National Service Scheme",
		subtitle: "Community service & social work · 200 members",
		category: "Clubs",
		icon: Users,
		href: "/app/clubs",
		keywords: [
			"nss",
			"community",
			"service",
			"volunteering"
		]
	},
	{
		id: "event-hackathon",
		title: "Hackathon 2026",
		subtitle: "July 20–21 · Register by July 15",
		category: "Events",
		icon: Zap,
		href: "/app/clubs",
		keywords: [
			"hackathon",
			"coding",
			"competition",
			"prize"
		]
	},
	{
		id: "event-ai-workshop",
		title: "AI Workshop — Prompt Engineering",
		subtitle: "July 12 · Lab 3 · Free Entry",
		category: "Events",
		icon: Zap,
		href: "/app/clubs",
		keywords: [
			"ai",
			"workshop",
			"prompt",
			"llm",
			"chatgpt"
		]
	},
	{
		id: "event-techfest",
		title: "Tech Fest 2026",
		subtitle: "Aug 1–3 · Main Auditorium",
		category: "Events",
		icon: Calendar,
		href: "/app/clubs",
		keywords: [
			"techfest",
			"fest",
			"tech",
			"event"
		]
	},
	{
		id: "event-sports",
		title: "Inter-College Sports Meet",
		subtitle: "July 25 · Sports Ground",
		category: "Events",
		icon: Users,
		href: "/app/clubs",
		keywords: [
			"sports",
			"inter college",
			"athletics",
			"cricket"
		]
	},
	{
		id: "student-priya",
		title: "Priya Sharma",
		subtitle: "3rd Year · CS · Roll CS21B019",
		category: "Students",
		icon: GraduationCap,
		keywords: [
			"priya",
			"sharma",
			"cs",
			"3rd year"
		]
	},
	{
		id: "student-rohan",
		title: "Rohan Kapoor",
		subtitle: "2nd Year · ECE · Roll EC22B041",
		category: "Students",
		icon: GraduationCap,
		keywords: [
			"rohan",
			"kapoor",
			"ece",
			"2nd year"
		]
	},
	{
		id: "student-sneha",
		title: "Sneha Tripathi",
		subtitle: "4th Year · IT · Roll IT20B008",
		category: "Students",
		icon: GraduationCap,
		keywords: [
			"sneha",
			"tripathi",
			"it",
			"4th year"
		]
	},
	{
		id: "student-arjun",
		title: "Arjun Verma",
		subtitle: "1st Year · MECH · Roll ME23B055",
		category: "Students",
		icon: GraduationCap,
		keywords: [
			"arjun",
			"verma",
			"mech",
			"1st year"
		]
	},
	{
		id: "chat-cs-gen",
		title: "#cs-general",
		subtitle: "CS department general chat · 145 members",
		category: "Chat",
		icon: Hash,
		href: "/app/chat",
		keywords: [
			"cs",
			"general",
			"department",
			"channel"
		]
	},
	{
		id: "chat-assignments",
		title: "#assignments",
		subtitle: "Share and discuss assignments · 220 members",
		category: "Chat",
		icon: Hash,
		href: "/app/chat",
		keywords: [
			"assignments",
			"homework",
			"submit",
			"channel"
		]
	},
	{
		id: "chat-placements",
		title: "#placements",
		subtitle: "Jobs, internships and placement news · 310 members",
		category: "Chat",
		icon: Hash,
		href: "/app/chat",
		keywords: [
			"placements",
			"jobs",
			"internship",
			"career"
		]
	},
	{
		id: "chat-random",
		title: "#random",
		subtitle: "Off-topic fun and memes · 405 members",
		category: "Chat",
		icon: Hash,
		href: "/app/chat",
		keywords: [
			"random",
			"memes",
			"fun",
			"off-topic"
		]
	}
];
var TRENDING_SEARCHES = [
	"AI Workshop",
	"DBMS Notes",
	"GPU for Sale",
	"Coding Club",
	"Hackathon"
];
var QUICK_ACTIONS = [
	{
		id: "qa-upload",
		label: "Upload Notes",
		icon: Upload,
		href: "/app/resources",
		description: "Share resources with classmates"
	},
	{
		id: "qa-sell",
		label: "Sell Item",
		icon: Tag,
		href: "/app/marketplace",
		description: "List something on marketplace"
	},
	{
		id: "qa-study",
		label: "Book Study Room",
		icon: BookOpen,
		href: "/app/study",
		description: "Reserve a quiet study space"
	},
	{
		id: "qa-event",
		label: "Create Event",
		icon: Calendar,
		href: "/app/clubs",
		description: "Organise a club event"
	}
];
var RECENT_KEY = "cc_recent_searches";
function getRecentSearches() {
	try {
		const raw = localStorage.getItem(RECENT_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function addRecentSearch(term) {
	if (!term.trim()) return;
	const next = [term, ...getRecentSearches().filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 5);
	localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}
function clearRecentSearches() {
	localStorage.removeItem(RECENT_KEY);
}
function filterSearchResults(query) {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return SEARCH_DATA.filter((item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.keywords?.some((k) => k.toLowerCase().includes(q))).slice(0, 20);
}
var SearchContext = (0, import_react.createContext)(null);
function SearchProvider({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [recentSearches, setRecentSearches] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setRecentSearches(getRecentSearches());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) setQuery("");
	}, [open]);
	const toggle = (0, import_react.useCallback)(() => setOpen((prev) => !prev), []);
	const addRecentSearch$1 = (0, import_react.useCallback)((term) => {
		if (!term.trim()) return;
		addRecentSearch(term);
		setRecentSearches(getRecentSearches());
	}, []);
	const clearRecentSearches$1 = (0, import_react.useCallback)(() => {
		clearRecentSearches();
		setRecentSearches([]);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchContext.Provider, {
		value: {
			open,
			setOpen,
			toggle,
			query,
			setQuery,
			recentSearches,
			addRecentSearch: addRecentSearch$1,
			clearRecentSearches: clearRecentSearches$1
		},
		children
	});
}
function useSearch$1() {
	const context = (0, import_react.useContext)(SearchContext);
	if (!context) throw new Error("useSearch must be used inside SearchProvider");
	return context;
}
function SearchTrigger() {
	const { setOpen } = useSearch$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "relative w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-14 text-left text-xs text-muted-foreground transition hover:border-primary/40 hover:bg-surface-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" }),
			"Quick search...",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-surface-elevated px-1.5 py-0.5 text-[9px] md:block",
				children: "Ctrl K"
			})
		]
	});
}
var CATEGORY_COLORS = {
	Pages: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
	Resources: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
	Marketplace: "bg-yellow-500/10 text-primary border border-yellow-500/20",
	Clubs: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
	Events: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
	Students: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
	Chat: "bg-sky-500/10 text-sky-400 border border-sky-500/20"
};
function CategoryBadge({ category }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[category]}`,
		children: category
	});
}
function SearchItem({ result, isActive, onSelect, onHover, index }) {
	const Icon = result.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		id: `search-result-${index}`,
		role: "option",
		"aria-selected": isActive,
		onClick: () => onSelect(result),
		onMouseEnter: onHover,
		className: `
        group flex w-full items-center gap-3 rounded-xl px-3 py-2.5
        text-left transition-all duration-150
        ${isActive ? "border border-primary/50 bg-primary/8 shadow-[0_0_12px_rgba(0,0,0,0.3)] ring-1 ring-primary/20" : "border border-transparent hover:border-border hover:bg-surface-elevated"}
      `,
		style: { animationDelay: `${index * 25}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `
          grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-150
          ${isActive ? "bg-primary/15 text-primary" : "bg-surface-elevated text-muted-foreground group-hover:text-foreground"}
        `,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `truncate text-sm font-semibold ${isActive ? "text-foreground" : "text-foreground/90"}`,
					children: result.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate text-[11px] text-muted-foreground",
					children: result.subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { category: result.category }),
			isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-[10px] text-muted-foreground",
				children: "↵"
			})
		]
	});
}
function SearchResults({ results, activeIndex, onSelect, onHover, query }) {
	if (results.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-12 w-12 place-items-center rounded-2xl bg-surface-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "h-5 w-5 text-muted-foreground" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: "No results found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-0.5 text-xs text-muted-foreground",
			children: ["No results for ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-medium text-foreground",
				children: [
					"\"",
					query,
					"\""
				]
			})]
		})] })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "listbox",
		"aria-label": "Search results",
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
			children: [
				results.length,
				" result",
				results.length !== 1 ? "s" : ""
			]
		}), results.map((result, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchItem, {
			result,
			isActive: index === activeIndex,
			index,
			onSelect,
			onHover: () => onHover(index)
		}, result.id))]
	});
}
function QuickActions() {
	const { setOpen } = useSearch$1();
	const navigate = useNavigate();
	const handleAction = (href) => {
		if (href) {
			navigate({ to: href });
			setOpen(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "Quick Actions"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-2.5",
		children: QUICK_ACTIONS.map((action) => {
			const Icon = action.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				id: `qa-${action.id}`,
				onClick: () => handleAction(action.href),
				className: "\n                group flex items-start gap-3 rounded-xl border border-border bg-background p-3\n                text-left transition-all duration-150\n                hover:border-primary/30 hover:bg-surface-elevated hover:-translate-y-0.5\n                hover:shadow-md active:scale-[0.98]\n              ",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-foreground",
						children: action.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-[10px] text-muted-foreground",
						children: action.description
					})]
				})]
			}, action.id);
		})
	})] });
}
function RecentSearches() {
	const { recentSearches, clearRecentSearches, setQuery } = useSearch$1();
	if (recentSearches.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary" }), "Recent Searches"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: clearRecentSearches,
			className: "text-[10px] text-muted-foreground transition hover:text-foreground",
			children: "Clear"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-1",
		children: recentSearches.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setQuery(item),
			className: "flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition hover:bg-surface-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-foreground/80",
					children: item
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: "↵"
			})]
		}, item))
	})] });
}
function TrendingSearches() {
	const { setQuery } = useSearch$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 text-primary" }), "Trending"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: TRENDING_SEARCHES.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setQuery(term),
			className: "\n              rounded-full border border-border bg-background px-3 py-1.5 text-xs\n              transition-all duration-150\n              hover:border-primary/40 hover:bg-surface-elevated hover:-translate-y-0.5\n              hover:shadow-sm active:scale-95\n            ",
			children: ["🔥 ", term]
		}, term))
	})] });
}
function SearchOverlay() {
	const { open, setOpen, toggle, query, setQuery, addRecentSearch } = useSearch$1();
	const navigate = useNavigate();
	const inputRef = (0, import_react.useRef)(null);
	const overlayRef = (0, import_react.useRef)(null);
	const resultsRef = (0, import_react.useRef)(null);
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(-1);
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const results = query.trim() ? filterSearchResults(query) : [];
	(0, import_react.useEffect)(() => {
		if (open) {
			setIsVisible(true);
			setActiveIndex(-1);
		} else {
			const t = setTimeout(() => setIsVisible(false), 200);
			return () => clearTimeout(t);
		}
	}, [open]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				toggle();
				return;
			}
			if (e.key === "/" && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
				e.preventDefault();
				setOpen(true);
				return;
			}
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggle, setOpen]);
	(0, import_react.useEffect)(() => {
		if (open) requestAnimationFrame(() => inputRef.current?.focus());
	}, [open]);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		if (!open) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((prev) => results.length === 0 ? -1 : Math.min(prev + 1, results.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((prev) => Math.max(prev - 1, -1));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (activeIndex >= 0 && results[activeIndex]) handleSelect(results[activeIndex]);
			else if (query.trim()) addRecentSearch(query.trim());
		} else if (e.key === "Escape") setOpen(false);
	}, [
		open,
		activeIndex,
		results,
		query
	]);
	(0, import_react.useEffect)(() => {
		if (activeIndex >= 0) document.getElementById(`search-result-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
	}, [activeIndex]);
	const handleSelect = (0, import_react.useCallback)((result) => {
		addRecentSearch(result.title);
		if (result.href) navigate({ to: result.href });
		setOpen(false);
	}, [
		addRecentSearch,
		navigate,
		setOpen
	]);
	const handleTrapFocus = (0, import_react.useCallback)((e) => {
		if (e.key !== "Tab") return;
		const focusable = overlayRef.current?.querySelectorAll("button, input, [tabindex]:not([tabindex='-1'])");
		if (!focusable || focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		} else if (document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}, []);
	if (!isVisible) return null;
	const isEmpty = !query.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Global search",
		className: `
        fixed inset-0 z-[100] flex items-start justify-center
        bg-black/70 backdrop-blur-md
        px-4 sm:px-6
        transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
      `,
		onClick: () => setOpen(false),
		onKeyDown: handleTrapFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: overlayRef,
			onClick: (e) => e.stopPropagation(),
			onKeyDown: handleKeyDown,
			className: `
          mt-16 sm:mt-20 w-full
          max-w-[720px]
          overflow-hidden rounded-2xl
          border border-border
          bg-surface shadow-2xl
          transition-all duration-200
          ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"}
        `,
			style: { boxShadow: open ? "0 25px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)" : void 0 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-border px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4.5 w-4.5 shrink-0 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							value: query,
							onChange: (e) => {
								setQuery(e.target.value);
								setActiveIndex(-1);
							},
							spellCheck: false,
							autoComplete: "off",
							autoCorrect: "off",
							autoFocus: true,
							placeholder: "Search Campus Connect...",
							"aria-label": "Search",
							"aria-autocomplete": "list",
							"aria-controls": "search-results-list",
							className: "\n              flex-1 bg-transparent text-sm outline-none\n              placeholder:text-muted-foreground\n              transition-colors duration-150\n            "
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setQuery("");
								setActiveIndex(-1);
							},
							className: "text-xs text-muted-foreground transition hover:text-foreground px-1",
							"aria-label": "Clear search",
							children: "✕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border border-border bg-surface-elevated px-2 py-1 text-[10px] text-muted-foreground",
							children: "ESC"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: resultsRef,
					id: "search-results-list",
					className: "max-h-[480px] overflow-y-auto overscroll-contain p-4 space-y-5",
					children: isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentSearches, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingSearches, {})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResults, {
						results,
						activeIndex,
						onSelect: handleSelect,
						onHover: (index) => setActiveIndex(index),
						query
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-5 py-2.5 text-[11px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono",
								children: "↑↓"
							}),
							" ",
							"Navigate"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono",
								children: "↵"
							}),
							" ",
							"Select"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono",
							children: "Esc"
						}),
						" ",
						"Close"
					] })]
				})
			]
		})
	});
}
var FAB_ACTIONS = [
	{
		id: "fab-upload-notes",
		label: "Upload Notes",
		icon: Upload,
		href: "/app/resources",
		ariaLabel: "Upload study notes & PYQs"
	},
	{
		id: "fab-marketplace-listing",
		label: "Sell on Marketplace",
		icon: ShoppingBag,
		href: "/app/marketplace",
		ariaLabel: "List an item for sale on Marketplace"
	},
	{
		id: "fab-book-room",
		label: "Book Study Room",
		icon: BookOpen,
		href: "/app/study",
		ariaLabel: "Book a study hall or start timer"
	},
	{
		id: "fab-explore-clubs",
		label: "Clubs & Events",
		icon: Calendar,
		href: "/app/clubs",
		ariaLabel: "Explore PEC clubs, societies & events"
	}
];
function FloatingActionItem({ action, index, total, onSelect }) {
	const navigate = useNavigate();
	const Icon = action.icon;
	const delay = (total - 1 - index) * 40;
	const handleClick = () => {
		if (action.href) navigate({ to: action.href });
		else console.log(`[FAB] ${action.label}`);
		onSelect();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		id: action.id,
		"aria-label": action.ariaLabel,
		onClick: handleClick,
		className: "\n        fab-item\n        group flex items-center gap-3\n        rounded-full\n        border border-border/90\n        bg-surface\n        px-4 py-2.5\n        text-xs sm:text-sm font-semibold text-foreground\n        shadow-xl\n        transition-all duration-180 ease-out\n        hover:border-primary/60 hover:bg-surface-elevated hover:-translate-y-0.5\n        hover:shadow-2xl hover:text-primary\n        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60\n        active:scale-95\n      ",
		style: { animationDelay: `${delay}ms` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-colors duration-150 group-hover:bg-primary/20 group-hover:scale-110",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "whitespace-nowrap font-medium text-foreground",
			children: action.label
		})]
	});
}
function FloatingActionMenu({ open, onClose }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 bg-background/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
		onClick: onClose,
		"aria-hidden": "true"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "menu",
		"aria-label": "Quick actions",
		className: "\n          fab-menu\n          absolute bottom-[calc(100%+14px)] right-0\n          z-50\n          flex flex-col items-end gap-2.5\n          w-max\n          sm:w-auto\n          max-sm:right-0\n          max-sm:items-end\n        ",
		children: FAB_ACTIONS.map((action, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActionItem, {
			action,
			index: i,
			total: FAB_ACTIONS.length,
			onSelect: onClose
		}, action.id))
	})] });
}
function FloatingActionButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const location = useLocation();
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	(0, import_react.useEffect)(() => {
		close();
	}, [location.pathname, close]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				close();
				triggerRef.current?.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, close]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onPointer = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) close();
		};
		document.addEventListener("pointerdown", onPointer, true);
		return () => document.removeEventListener("pointerdown", onPointer, true);
	}, [open, close]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
		"div",
		/**
		* Positioning:
		*  - Desktop/Tablet (md+): fixed bottom-8 right-8, z-50
		*  - Mobile (<md): fixed bottom above the 56px bottom nav +
		*    safe-area, right-4, z-50
		*
		* The mobile bottom nav is ~56px + safe area. We use:
		*   bottom-[calc(56px+env(safe-area-inset-bottom)+16px)]  on mobile
		*   bottom-8 on md+
		*/
		{
			ref: containerRef,
			className: "\n        fixed z-50 right-4 md:right-8\n        bottom-[calc(56px+env(safe-area-inset-bottom,0px)+16px)]\n        md:bottom-8\n        flex flex-col items-end\n      ",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActionMenu, {
				open,
				onClose: close
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: triggerRef,
				id: "fab-trigger",
				"aria-label": open ? "Close quick actions" : "Open quick actions",
				"aria-expanded": open,
				"aria-haspopup": "menu",
				onClick: () => setOpen((prev) => !prev),
				className: "\n          relative\n          grid place-items-center\n          h-[60px] w-[60px]\n          max-sm:h-[56px] max-sm:w-[56px]\n          rounded-full\n          bg-[oklch(0.13_0.005_250)]\n          border border-[oklch(0.84_0.18_85/0.55)]\n          text-[oklch(0.84_0.18_85)]\n          shadow-[0_8px_32px_oklch(0_0_0/0.5),0_0_0_1px_oklch(0.84_0.18_85/0.12),0_0_18px_oklch(0.84_0.18_85/0.18)]\n          transition-all duration-200 ease-out\n          hover:scale-105\n          hover:shadow-[0_8px_36px_oklch(0_0_0/0.6),0_0_0_1px_oklch(0.84_0.18_85/0.25),0_0_28px_oklch(0.84_0.18_85/0.30)]\n          hover:border-[oklch(0.84_0.18_85/0.8)]\n          focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.84_0.18_85/0.7)]\n          active:scale-95\n        ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					className: "h-6 w-6 transition-transform duration-250 ease-out",
					style: { transform: open ? "rotate(45deg)" : "rotate(0deg)" }
				})
			})]
		}
	);
}
function UserProfileModal({ isOpen, onClose, email, displayName, onSignOut }) {
	const navigate = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(() => parsePecEmail(email, displayName));
	const [isEditingRoll, setIsEditingRoll] = (0, import_react.useState)(false);
	const [rollInput, setRollInput] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			const parsed = parsePecEmail(email, displayName);
			setProfile(parsed);
			setRollInput(parsed.rollNo);
			setIsEditingRoll(false);
		}
	}, [
		isOpen,
		email,
		displayName
	]);
	if (!isOpen) return null;
	const handleSaveRoll = () => {
		if (email && rollInput.trim()) {
			setStoredRollNo(email, rollInput.trim());
			setProfile(parsePecEmail(email, displayName));
		}
		setIsEditingRoll(false);
	};
	const initials = profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "PEC";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-3xl glass-strong border border-border/80 shadow-2xl animate-scale-up",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-border/50 bg-surface/60 text-muted-foreground transition hover:bg-surface hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-xl font-bold text-primary-foreground shadow-lg glow-primary",
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate text-lg font-bold tracking-tight text-foreground",
									children: profile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "Verified PEC Student",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-400 shrink-0" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PEC Student" })]
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-6 pt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-surface/50 p-3 relative group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs font-medium text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Roll No / ID" })]
									}), !isEditingRoll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setIsEditingRoll(true),
										className: "text-muted-foreground hover:text-primary transition",
										title: "Edit Roll Number",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-3 w-3" })
									})]
								}), isEditingRoll ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: rollInput,
										onChange: (e) => setRollInput(e.target.value),
										className: "w-full rounded-lg border border-primary bg-background px-2 py-0.5 text-xs font-bold text-foreground outline-none",
										autoFocus: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleSaveRoll,
										className: "grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm font-bold tracking-wide text-foreground",
									children: profile.rollNo
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/60 bg-surface/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Batch Year" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm font-bold text-foreground",
									children: ["Class of ", profile.batch]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-surface/40 p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[11px] font-medium text-muted-foreground",
											children: "Branch & Program"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-xs font-semibold text-foreground",
											children: [
												profile.branch,
												" (",
												profile.degree,
												")"
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[11px] font-medium text-muted-foreground",
											children: "Institution"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs font-semibold text-foreground",
											children: profile.college
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-border/40" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[11px] font-medium text-muted-foreground",
											children: "College Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs font-mono font-medium text-foreground",
											children: profile.email
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									onClose();
									navigate({ to: "/app/dating/profile" });
								},
								className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Dating & Social Profile" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 ml-auto" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									onClose();
									onSignOut();
								},
								className: "flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
							})]
						})
					]
				})
			]
		})
	});
}
var NAV_ITEMS = [
	{
		to: "/app",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/app/orientation",
		label: "Orientation",
		icon: Compass
	},
	{
		to: "/app/timetable",
		label: "Timetable",
		icon: CalendarDays
	},
	{
		to: "/app/marketplace",
		label: "Marketplace",
		icon: ShoppingBag
	},
	{
		to: "/app/canteen",
		label: "Mess Menu",
		icon: UtensilsCrossed
	},
	{
		to: "/app/chat",
		label: "Chat",
		icon: MessageSquare
	},
	{
		to: "/app/clubs",
		label: "Clubs & Events",
		icon: Calendar
	},
	{
		to: "/app/study",
		label: "Study Rooms",
		icon: BookOpen
	},
	{
		to: "/app/dating",
		label: "Campus Match",
		icon: Heart
	},
	{
		to: "/app/attendance",
		label: "Attendance",
		icon: SquareCheckBig
	},
	{
		to: "/app/resources",
		label: "Resources",
		icon: FileText
	}
];
function AppShell() {
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [profileModalOpen, setProfileModalOpen] = (0, import_react.useState)(false);
	const location = useLocation();
	const loaderData = Route.useLoaderData();
	const [displayName, setDisplayName] = (0, import_react.useState)(loaderData?.displayName ?? null);
	const [email, setEmail] = (0, import_react.useState)(loaderData?.email ?? null);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((fbUser) => {
			if (!fbUser) return;
			setDisplayName(fbUser.displayName ?? null);
			setEmail(fbUser.email ?? null);
		});
	}, []);
	const pecProfile = parsePecEmail(email, displayName);
	const initials = pecProfile.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "PEC";
	const currentPage = NAV_ITEMS.find((n) => n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to));
	const isChatRoute = location.pathname.startsWith("/app/chat");
	const handleSignOut = async () => {
		await firebaseAuth.signOut();
		window.location.href = "/login";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SearchProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-screen w-full overflow-hidden bg-background",
			children: [
				sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden",
					onClick: () => setSidebarOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface/80 backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-6 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/app",
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-primary/20 animate-pulse-glow",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base font-bold tracking-tight",
										children: "Campus Connect"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
									children: "PEC Chandigarh"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSidebarOpen(false),
								className: "text-muted-foreground transition hover:text-foreground md:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 pb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchTrigger, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex-1 space-y-1 overflow-y-auto px-3 py-2",
							children: NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
								const active = exact ? location.pathname === to : location.pathname.startsWith(to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to,
									onClick: () => setSidebarOpen(false),
									className: `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium transition duration-150 ${active ? "bg-primary text-primary-foreground font-semibold glow-primary" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
									}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-primary/60 transition-transform duration-200 group-hover:translate-x-0.5" })]
								}, to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setProfileModalOpen(true),
								className: "flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-surface-elevated group",
								title: "View Profile",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-sm group-hover:scale-105 transition-transform",
										children: initials
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-500" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors",
										children: pecProfile.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-[10px] text-muted-foreground",
										children: [
											pecProfile.branch,
											" · ",
											pecProfile.rollNo
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSignOut,
								className: "mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-rose-500/10 hover:text-rose-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Sign Out"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between border-b border-border bg-background/60 px-5 py-3.5 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "sidebar-toggle-btn",
								"aria-label": "Open Navigation Menu",
								className: "grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary shadow-sm transition-all duration-150 hover:bg-primary/20 hover:border-primary/50 hover:scale-105 active:scale-95 md:hidden",
								onClick: () => setSidebarOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
									className: "h-5 w-5",
									strokeWidth: 2.5
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-sm font-semibold",
								children: currentPage?.label ?? "Campus Connect"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
									year: "numeric"
								})
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setProfileModalOpen(true),
								className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground transition hover:opacity-90 hover:scale-105",
								title: "View Profile",
								children: initials
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1 overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfileModal, {
					isOpen: profileModalOpen,
					onClose: () => setProfileModalOpen(false),
					email,
					displayName,
					onSignOut: handleSignOut
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed bottom-0 left-0 right-0 z-30 flex overflow-x-auto scrollbar-hide border-t border-border bg-surface/90 backdrop-blur-xl md:hidden",
					style: { paddingBottom: "env(safe-area-inset-bottom, 0px)" },
					children: NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
						const active = exact ? location.pathname === to : location.pathname.startsWith(to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							className: `flex shrink-0 flex-col items-center gap-0.5 px-3 py-2.5 text-[9px] transition ${active ? "text-primary" : "text-muted-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${active ? "text-primary" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium whitespace-nowrap",
								children: label.split(" ")[0]
							})]
						}, to);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchOverlay, {}),
		!isChatRoute && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingActionButton, {})
	] });
}
//#endregion
export { AppShell as component };
