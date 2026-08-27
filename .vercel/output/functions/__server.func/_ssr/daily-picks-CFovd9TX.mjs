import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Ht as BookOpen, It as Calendar, M as Rocket, Mt as ChevronLeft, N as RefreshCw, b as Sparkles, st as Heart, wt as Coffee } from "../_libs/lucide-react.mjs";
import { l as useDailyPicks } from "./use-dating-api-CYSx6-cH.mjs";
import { t as ProfileCard } from "./ProfileCard-Dhz2XB2B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-picks-CFovd9TX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DailyPicksPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const { data: picks = [], isLoading, refetch } = useDailyPicks(date);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const handleLike = (profileId) => {
		toast.success("Liked!");
	};
	const handlePass = (profileId) => {};
	const handleSave = (profileId) => {
		toast.success("Saved!");
	};
	const handleSuperLike = (profileId) => {
		toast.success("Super liked!");
	};
	const handleChat = (profileId) => {
		navigate({ to: `/app/dating/chat/${profileId}` });
	};
	const handleProfileClick = (profileId) => {
		navigate({ to: `/app/dating/profile/${profileId}` });
	};
	const handleDateChange = (newDate) => {
		setDate(newDate);
	};
	const handleRefresh = () => {
		refetch();
		toast.success("Refreshed!");
	};
	const yesterday = /* @__PURE__ */ new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	const yesterdayStr = yesterday.toISOString().split("T")[0];
	const tomorrow = /* @__PURE__ */ new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.toISOString().split("T")[0];
	const isToday = date === (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const isFuture = date > (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Daily Picks"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Curated profiles for you today"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading daily picks..."
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Daily Picks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Curated profiles for you today"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDate(yesterdayStr),
							disabled: isFuture,
							className: "p-2 rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed",
							"aria-label": "Previous day",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: date,
							onChange: (e) => handleDateChange(e.target.value),
							max: isToday ? void 0 : yesterdayStr,
							className: "rounded-xl border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDate((/* @__PURE__ */ new Date()).toISOString().split("T")[0]),
							className: "p-2 rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground",
							"aria-label": "Today",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleRefresh,
							disabled: isLoading,
							className: "flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "Refresh"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-3 animate-fade-up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: new Date(date).toLocaleDateString("en-US", {
								weekday: "long",
								month: "long",
								day: "numeric"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: isToday ? "Today's picks" : isFuture ? "Future date - no picks available" : "Past picks"
						})] })]
					}), picks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
							picks.length,
							" pick",
							picks.length !== 1 ? "s" : ""
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: picks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "No daily picks yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
							children: isFuture ? "Daily picks are generated each morning. Check back tomorrow!" : "Complete your profile and start swiping to get personalized daily picks!"
						}),
						!isFuture && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({ to: "/app/dating/profile" }),
							className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), "Complete Profile"]
						})
					]
				}) : picks.map((pick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
					profile: pick,
					onLike: handleLike,
					onPass: handlePass,
					onSave: handleSave,
					onSuperLike: handleSuperLike,
					onChat: handleChat,
					onProfileClick: () => handleProfileClick(pick.id),
					showActions: true
				}, pick.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
					children: "What makes a Daily Pick?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " High Compatibility"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-current" }), " Mutual Interests"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }), " Same Branch/Year"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-3 w-3" }), " Startup Interest"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-3 w-3" }), " Campus Hotspots"]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { DailyPicksPage as component };
