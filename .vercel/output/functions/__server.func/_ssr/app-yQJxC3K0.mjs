import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as parsePecEmail } from "./pec-email-B1YgkvDT.mjs";
import { Ct as Compass, Et as Clock, Ht as BookOpen, It as Calendar, J as MapPin, K as Megaphone, Lt as CalendarDays, S as ShoppingBag, W as MessageSquare, Wt as Bell, c as UtensilsCrossed, gt as FileText, jt as ChevronRight, lt as GraduationCap, m as TrendingUp, mt as FlaskConical, r as Zap, st as Heart, u as User, v as Star, y as SquareCheckBig } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-Bz5bubvX.mjs";
import { i as getTodaySchedule, n as getSectionFromRollNo, r as getTimetableForSection, t as getNextClass } from "./pec-timetable-C8LUof1w.mjs";
import { i as loadLocalAttendance } from "./attendance-_nwc91w_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-yQJxC3K0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OverviewCard({ item, index }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative z-0 min-w-[220px] shrink-0 rounded-2xl border border-border glass p-4 transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] animate-fade-up md:min-w-0",
		style: { animationDelay: `${index * 60}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground",
					children: "Today"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
				children: item.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 truncate text-base font-bold",
				children: item.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate text-xs text-muted-foreground",
				children: item.subtitle
			})
		]
	});
}
function TodaysOverview() {
	const [attendanceData, setAttendanceData] = (0, import_react.useState)({
		pct: 82,
		msg: "Safe Zone"
	});
	const [nextClassInfo, setNextClassInfo] = (0, import_react.useState)({
		value: "Loading...",
		subtitle: "Checking schedule"
	});
	(0, import_react.useEffect)(() => {
		const list = loadLocalAttendance();
		if (list && list.length > 0) {
			const conducted = list.reduce((s, a) => s + a.lecturesAttended + a.lecturesAbsent, 0);
			const attended = list.reduce((s, a) => s + a.lecturesAttended, 0);
			if (conducted > 0) {
				const pct = attended / conducted * 100;
				setAttendanceData({
					pct: Math.round(pct),
					msg: pct >= 75 ? "Above 75% Target" : "Below 75% Target"
				});
			}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			const section = getSectionFromRollNo(parsePecEmail(user?.email ?? null, user?.displayName ?? null).rollNo);
			const timetable = section ? getTimetableForSection(section) : null;
			const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
			const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
			if ((/* @__PURE__ */ new Date()).getDay() === 0 || (/* @__PURE__ */ new Date()).getDay() === 6) setNextClassInfo({
				value: "Weekend 🎉",
				subtitle: "No classes scheduled"
			});
			else if (!section) setNextClassInfo({
				value: "Set Roll No",
				subtitle: "Update profile for timetable"
			});
			else if (!timetable) setNextClassInfo({
				value: `Section ${section}`,
				subtitle: "Schedule coming soon"
			});
			else if (!nextInfo) setNextClassInfo({
				value: "All Done 🎓",
				subtitle: "No more classes today"
			});
			else {
				const slot = nextInfo.slot.slot;
				const subject = slot?.subject || "Class";
				const room = slot?.room ? `Room ${slot.room}` : "";
				const [sh, sm] = nextInfo.slot.start.split(":").map(Number);
				const suffix = sh < 12 ? "AM" : "PM";
				const timeStr = `${sh > 12 ? sh - 12 : sh === 0 ? 12 : sh}:${sm.toString().padStart(2, "0")} ${suffix}`;
				const prefix = nextInfo.status === "ongoing" ? "🔴 Live · " : "";
				setNextClassInfo({
					value: subject,
					subtitle: `${prefix}${timeStr}${room ? ` · ${room}` : ""}`
				});
			}
		});
	}, []);
	const [studyBooking, setStudyBooking] = (0, import_react.useState)({
		value: "Available",
		subtitle: "Browse study halls"
	});
	(0, import_react.useEffect)(() => {
		try {
			const booked = localStorage.getItem("bookedRooms");
			if (booked) {
				const parsed = JSON.parse(booked);
				if (Array.isArray(parsed) && parsed.length > 0) setStudyBooking({
					value: `${parsed.length} Active`,
					subtitle: "Booked today"
				});
			}
		} catch {}
	}, []);
	const TODAY_OVERVIEW = [
		{
			icon: BookOpen,
			title: "Next Class",
			value: nextClassInfo.value,
			subtitle: nextClassInfo.subtitle
		},
		{
			icon: UtensilsCrossed,
			title: "Mess Menu",
			value: "Kurukshetra Mess",
			subtitle: "Scheduled 4-Meal Menu"
		},
		{
			icon: SquareCheckBig,
			title: "Attendance Status",
			value: `${attendanceData.pct}%`,
			subtitle: attendanceData.msg
		},
		{
			icon: Clock,
			title: "Study Room",
			value: studyBooking.value,
			subtitle: studyBooking.subtitle
		},
		{
			icon: Calendar,
			title: "Events",
			value: "Campus Fests",
			subtitle: "Clubs & societies live"
		},
		{
			icon: FileText,
			title: "Assignments",
			value: "All Caught Up",
			subtitle: "No pending submissions"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 animate-fade-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-primary" }), "Today's Overview"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative -mx-6 overflow-visible px-6 py-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0 xl:grid-cols-6",
				children: TODAY_OVERVIEW.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewCard, {
					item,
					index
				}, item.title))
			})
		})]
	});
}
var ANNOUNCEMENTS = [
	{
		id: 0,
		badge: "Orientation",
		badgeColor: "bg-primary/10 text-primary border border-primary/20",
		title: "Freshers Orientation 2026 — Day 1 Schedule & Venues Live!",
		time: "Latest",
		urgent: true
	},
	{
		id: 1,
		badge: "PECFEST",
		badgeColor: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
		title: "PECFEST 2026 Official Dates Announced: Oct 30, Oct 31 & Nov 1 🎉",
		time: "Official Announcement",
		urgent: true
	},
	{
		id: 2,
		badge: "Lunch Venue",
		badgeColor: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
		title: "Freshers Lunch (1:00 PM – 2:30 PM): Shivalik Hostel (Boys) & Kalpana Chawla Hostel (Girls)",
		time: "Annexure 2",
		urgent: false
	},
	{
		id: 3,
		badge: "Campus Buzz",
		badgeColor: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
		title: "Breaking: Freshers spotted exploring PEC campus with peak excitement (and Google Maps open 🗺️)",
		time: "Just now",
		urgent: false
	}
];
var QUICK_LINKS = [
	{
		to: "/app/orientation",
		label: "Orientation 2026",
		icon: Compass,
		iconColor: "text-amber-500",
		count: "Reporting Venues & Maps"
	},
	{
		to: "/app/timetable",
		label: "My Timetable",
		icon: CalendarDays,
		iconColor: "text-primary",
		count: "Auto-detected by section"
	},
	{
		to: "/app/marketplace",
		label: "Marketplace",
		icon: ShoppingBag,
		iconColor: "text-primary",
		count: "Buy, sell & swap"
	},
	{
		to: "/app/canteen",
		label: "Mess Menu",
		icon: UtensilsCrossed,
		iconColor: "text-primary",
		count: "Hostels & Campus Dining"
	},
	{
		to: "/app/chat",
		label: "Campus Chat",
		icon: MessageSquare,
		iconColor: "text-primary",
		count: "Channels & Direct Messages"
	},
	{
		to: "/app/clubs",
		label: "Clubs & Events",
		icon: Calendar,
		iconColor: "text-primary",
		count: "Explore clubs & fests"
	},
	{
		to: "/app/study",
		label: "Study Rooms",
		icon: BookOpen,
		iconColor: "text-primary",
		count: "Book hall & Pomodoro"
	},
	{
		to: "/app/dating",
		label: "Campus Match",
		icon: Heart,
		iconColor: "text-primary",
		count: "Profiles & Matches"
	},
	{
		to: "/app/attendance",
		label: "Attendance Tracker",
		icon: SquareCheckBig,
		iconColor: "text-primary",
		count: "Target 75% Tracker"
	},
	{
		to: "/app/resources",
		label: "Academic Resources",
		icon: FileText,
		iconColor: "text-primary",
		count: "PYQs, Notes & Syllabus"
	}
];
var TRENDING = [
	{
		text: "sproutX by EIC for startup funding & incubation grants",
		tag: "EIC / Startup",
		time: "Trending #1"
	},
	{
		text: "Clubs & Societies introduction sessions & freshers recruitments",
		tag: "Clubs",
		time: "Trending #2"
	},
	{
		text: "Orientation Day 1 reporting venues & campus navigation",
		tag: "Orientation",
		time: "Trending #3"
	},
	{
		text: "Kurukshetra Hostel Mess Menu live for the week",
		tag: "Mess Menu",
		time: "Trending #4"
	}
];
function TodaysScheduleWidget() {
	const [email, setEmail] = (0, import_react.useState)(null);
	const [displayName, setDisplayName] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((u) => {
			setEmail(u?.email ?? null);
			setDisplayName(u?.displayName ?? null);
		});
	}, []);
	const section = getSectionFromRollNo(parsePecEmail(email, displayName).rollNo);
	const timetable = section ? getTimetableForSection(section) : null;
	const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
	const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
	const isWeekend = (/* @__PURE__ */ new Date()).getDay() === 0 || (/* @__PURE__ */ new Date()).getDay() === 6;
	function fmt(t) {
		const [h, m] = t.split(":").map(Number);
		const suffix = h < 12 ? "AM" : "PM";
		return `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, "0")} ${suffix}`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "animate-fade-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-primary" }), " Today's Classes"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/timetable",
				className: "text-[11px] font-semibold text-primary hover:underline flex items-center gap-1",
				children: ["Full Timetable ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-border glass p-4",
			children: !section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Update your roll number in profile to see your timetable."
			}) : !timetable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-xl bg-surface-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-muted-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm font-semibold",
					children: ["Section ", section]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "Timetable not yet uploaded"
				})] })]
			}) : isWeekend ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Weekend — no classes today! 🎉"
			}) : !nextInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl",
					children: "🎓"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "All done for today!"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "No more classes today"
				})] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${nextInfo.slot.slot?.type === "lab" ? "bg-violet-500/10 border-violet-500/30 text-violet-400" : "bg-primary/10 border-primary/30 text-primary"}`,
						children: nextInfo.slot.slot?.type === "lab" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${nextInfo.status === "ongoing" ? "bg-emerald-500 text-white animate-pulse" : "bg-primary/20 text-primary"}`,
									children: nextInfo.status === "ongoing" ? "Live Now" : "Up Next"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] font-mono text-muted-foreground",
									children: [
										fmt(nextInfo.slot.start),
										" – ",
										fmt(nextInfo.slot.end)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-sm font-bold",
								children: nextInfo.slot.slot?.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 flex gap-3 text-[11px] text-muted-foreground",
								children: [nextInfo.slot.slot?.room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), nextInfo.slot.slot.room]
								}), nextInfo.slot.slot?.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), nextInfo.slot.slot.faculty]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted-foreground",
							children: "Section"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-bold text-primary",
							children: section
						})]
					})
				]
			})
		})]
	});
}
function Dashboard() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
	const [email, setEmail] = (0, import_react.useState)(null);
	const [displayName, setDisplayName] = (0, import_react.useState)(null);
	const [unreadMessages, setUnreadMessages] = (0, import_react.useState)(0);
	const [activeListings, setActiveListings] = (0, import_react.useState)(0);
	const [eventsThisWeek, setEventsThisWeek] = (0, import_react.useState)(0);
	const [studyHoursToday, setStudyHoursToday] = (0, import_react.useState)("0h");
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				setEmail(user.email);
				setDisplayName(user.displayName);
			}
		});
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const storedUnread = localStorage.getItem("campus_unread_count");
			setUnreadMessages(storedUnread ? parseInt(storedUnread, 10) : 0);
		} catch {
			setUnreadMessages(0);
		}
		async function loadMarketplaceCount() {
			try {
				const { count, error } = await supabase.from("marketplace_listings").select("id", {
					count: "exact",
					head: true
				}).eq("is_sold", false);
				if (!error && typeof count === "number") setActiveListings(count);
				else setActiveListings(0);
			} catch {
				setActiveListings(0);
			}
		}
		loadMarketplaceCount();
		try {
			const storedEvents = localStorage.getItem("campus_events_week");
			setEventsThisWeek(storedEvents ? parseInt(storedEvents, 10) : 0);
		} catch {
			setEventsThisWeek(0);
		}
		try {
			const storedStudyTime = localStorage.getItem("pomodoro_today_mins");
			const bookedRooms = localStorage.getItem("bookedRooms");
			if (storedStudyTime) {
				const mins = parseInt(storedStudyTime, 10);
				setStudyHoursToday(mins >= 60 ? `${(mins / 60).toFixed(1)}h` : `${mins}m`);
			} else if (bookedRooms) {
				const parsed = JSON.parse(bookedRooms);
				setStudyHoursToday(Array.isArray(parsed) && parsed.length > 0 ? `${parsed.length} booked` : "0h");
			} else setStudyHoursToday("0h");
		} catch {
			setStudyHoursToday("0h");
		}
	}, []);
	const profile = parsePecEmail(email, displayName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-6 pb-24 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-2xl border border-primary/20 bg-yellow-500/5 p-6 animate-fade-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-8 bottom-0 opacity-5 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCapBig, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [greeting, " 👋"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl font-bold",
								children: profile.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									profile.yearLabel,
									" · ",
									profile.branch,
									" · Roll No. ",
									profile.rollNo
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs text-primary font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3" }),
										" Batch of ",
										profile.batch,
										" (",
										profile.degree,
										")"
									]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-4",
				children: [
					{
						label: "Unread Messages",
						value: String(unreadMessages),
						icon: MessageSquare,
						color: "text-primary"
					},
					{
						label: "Active Listings",
						value: String(activeListings),
						icon: ShoppingBag,
						color: "text-primary"
					},
					{
						label: "Events This Week",
						value: String(eventsThisWeek),
						icon: Calendar,
						color: "text-primary"
					},
					{
						label: "Study Hours Today",
						value: studyHoursToday,
						icon: Clock,
						color: "text-primary"
					}
				].map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass p-4 animate-fade-up card-hover",
					style: { animationDelay: `${i * 60}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(stat.icon, { className: `h-5 w-5 ${stat.color} icon-hover` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-2xl font-bold stat-count",
							style: { animationDelay: `${i * 60 + 200}ms` },
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: stat.label
						})
					]
				}, stat.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodaysOverview, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodaysScheduleWidget, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-primary" }), " Navigation"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: QUICK_LINKS.map(({ to, label, icon: Icon, iconColor, count }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					id: `dashboard-${label.toLowerCase().replace(/[^a-z]/g, "-")}`,
					className: "group flex items-center gap-4 rounded-2xl border border-border glass p-4 transition duration-200 animate-fade-up card-hover",
					style: { animationDelay: `${i * 55}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-elevated transition-transform duration-150 group-hover:scale-105",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${iconColor}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-sm text-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 truncate text-xs text-muted-foreground",
								children: count
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" })
					]
				}, to))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "h-4 w-4 text-primary" }), " Announcements"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: ANNOUNCEMENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-xl border p-3.5 transition hover:bg-surface-elevated ${a.urgent ? "border-red-500/20 bg-red-500/5" : "border-border glass"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${a.badgeColor}`,
										children: a.badge
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold leading-snug",
											children: a.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: a.time
										})]
									}),
									a.urgent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3.5 w-3.5 shrink-0 text-red-400" })
								]
							})
						}, a.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-4 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), " Trending on Campus"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2.5",
						children: TRENDING.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-xl border border-border glass p-3.5 transition hover:bg-surface-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-6 w-6 shrink-0 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold leading-snug",
									children: t.text
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-surface px-1.5 py-0.5 text-[9px] text-muted-foreground border border-border",
										children: t.tag
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] text-muted-foreground",
										children: t.time
									})]
								})]
							})]
						}, i))
					})]
				})]
			})
		]
	});
}
function GraduationCapBig() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "120",
		height: "120",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 12v5c3 3 9 3 12 0v-5" })]
	});
}
//#endregion
export { Dashboard as component };
