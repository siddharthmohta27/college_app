import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as Clock, Ht as BookOpen, It as Calendar, M as Rocket, Nt as Check, Tt as Code, b as Sparkles, ft as Funnel, i as X, l as Users, r as Zap, st as Heart, wt as Coffee } from "../_libs/lucide-react.mjs";
import { D as useRsvpToEvent, b as useMyRsvps, f as useEvents } from "./use-dating-api-CYSx6-cH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-B-ReoyBy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EVENT_TYPES = [
	{
		value: "hackathon",
		label: "Hackathon",
		icon: Code,
		color: "text-purple-400",
		bg: "bg-purple-500/10"
	},
	{
		value: "sports",
		label: "Sports",
		icon: Zap,
		color: "text-green-400",
		bg: "bg-green-500/10"
	},
	{
		value: "pec_fest",
		label: "PEC Fest",
		icon: Sparkles,
		color: "text-pink-400",
		bg: "bg-pink-500/10"
	},
	{
		value: "startup_fair",
		label: "Startup Fair",
		icon: Rocket,
		color: "text-yellow-400",
		bg: "bg-yellow-500/10"
	},
	{
		value: "coding_contest",
		label: "Coding Contest",
		icon: Coffee,
		color: "text-orange-400",
		bg: "bg-orange-500/10"
	},
	{
		value: "seminar",
		label: "Seminar",
		icon: BookOpen,
		color: "text-blue-400",
		bg: "bg-blue-500/10"
	},
	{
		value: "workshop",
		label: "Workshop",
		icon: Users,
		color: "text-indigo-400",
		bg: "bg-indigo-500/10"
	},
	{
		value: "other",
		label: "Other",
		icon: Calendar,
		color: "text-gray-400",
		bg: "bg-gray-500/10"
	}
];
function EventsPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("upcoming");
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [selectedTypes, setSelectedTypes] = (0, import_react.useState)([]);
	const { data: events = [], isLoading, refetch } = useEvents(void 0, activeTab === "upcoming");
	const { data: myRsvps = [] } = useMyRsvps();
	const rsvpEvent = useRsvpToEvent();
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const filteredEvents = selectedTypes.length > 0 ? events.filter((e) => selectedTypes.includes(e.event_type)) : events;
	const handleTypeToggle = (type) => {
		setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
	};
	const handleRsvp = async (eventId, status) => {
		try {
			await rsvpEvent.mutateAsync({
				eventId: eventId.toString(),
				status
			});
			toast.success(status === "going" ? "Going!" : status === "interested" ? "Interested" : "Not going");
		} catch {
			toast.error("Failed to RSVP");
		}
	};
	const getMyRsvpStatus = (eventId) => {
		return myRsvps.find((r) => r.id === eventId)?.status || "none";
	};
	const getEventTypeConfig = (type) => {
		return EVENT_TYPES.find((t) => t.value === type) || EVENT_TYPES[7];
	};
	const formatDate = (dateStr) => {
		return new Date(dateStr).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric"
		});
	};
	const formatTime = (dateStr) => {
		return new Date(dateStr).toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Events"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Discover and RSVP to campus events"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border glass p-4 animate-pulse",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 w-16 skeleton rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 skeleton rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 skeleton rounded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-full skeleton rounded" })
						]
					})]
				})
			}, i))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Discover and RSVP to campus events"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowFilters(!showFilters),
						className: `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${showFilters || selectedTypes.length > 0 ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }),
							"Filters",
							" ",
							selectedTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold",
								children: selectedTypes.length
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-xl border border-border bg-surface p-1",
				children: [
					{
						id: "upcoming",
						label: "Upcoming",
						icon: Calendar
					},
					{
						id: "past",
						label: "Past",
						icon: Clock
					},
					{
						id: "my_rsvps",
						label: "My RSVPs",
						icon: Check
					}
				].map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${isActive ? "text-primary-foreground" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
					}, tab.id);
				})
			}),
			showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Filter by Event Type"
					}), selectedTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSelectedTypes([]),
						className: "text-xs text-primary hover:underline",
						children: "Clear all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: EVENT_TYPES.slice(0, 7).map(({ value, label, icon: Icon, color, bg }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => handleTypeToggle(value),
						className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${selectedTypes.includes(value) ? `${color} ${bg} border border-current/30` : "text-muted-foreground hover:border-primary hover:text-primary border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
					}, value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: filteredEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "No events found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
							children: selectedTypes.length > 0 ? "Try adjusting your filters or check back later!" : "No events scheduled right now. Check back soon!"
						})
					]
				}) : filteredEvents.map((event) => {
					const config = getEventTypeConfig(event.event_type);
					const Icon = config.icon;
					const myStatus = getMyRsvpStatus(event.id);
					const isGoing = myStatus === "going";
					const isInterested = myStatus === "interested";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30 hover:shadow-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${config.bg}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-7 w-7 ${config.color}` })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-semibold truncate",
													children: event.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground truncate",
													children: [
														config.label,
														" • ",
														event.location || "Location TBD"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-2 flex items-center gap-3 text-xs text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), formatDate(event.start_time)]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), formatTime(event.start_time)]
														}),
														event.end_time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "–" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
																formatTime(event.end_time)
															]
														})
													]
												})
											]
										}), event.max_attendees && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
												event.rsvp_count || 0,
												"/",
												event.max_attendees
											]
										})]
									}),
									event.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-foreground/80 line-clamp-2",
										children: event.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleRsvp(event.id, "going"),
												disabled: rsvpEvent.isPending,
												className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isGoing ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-surface text-muted-foreground hover:border-primary hover:text-primary border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), isGoing ? "Going" : "Going"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleRsvp(event.id, "interested"),
												disabled: rsvpEvent.isPending,
												className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isInterested ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-surface text-muted-foreground hover:border-primary hover:text-primary border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3" }), isInterested ? "Interested" : "Interested"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleRsvp(event.id, "not_going"),
												disabled: rsvpEvent.isPending,
												className: "flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-rose-500/30 hover:text-rose-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" }), "Not Going"]
											})
										]
									})
								]
							})]
						})
					}, event.id);
				})
			})
		]
	});
}
//#endregion
export { EventsPage as component };
