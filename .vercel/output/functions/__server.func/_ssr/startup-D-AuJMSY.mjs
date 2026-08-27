import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Megaphone, M as Rocket, Pt as ChartNoAxesColumnIncreasing, Tt as Code, V as Palette, b as Sparkles, ft as Funnel, tt as Lightbulb } from "../_libs/lucide-react.mjs";
import { j as useStartupMatches } from "./use-dating-api-CYSx6-cH.mjs";
import { t as ProfileCard } from "./ProfileCard-Dhz2XB2B.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/startup-D-AuJMSY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STARTUP_ROLES = [
	{
		value: "cofounder",
		label: "Co-founder",
		icon: Lightbulb
	},
	{
		value: "developer",
		label: "Developer",
		icon: Code
	},
	{
		value: "designer",
		label: "Designer",
		icon: Palette
	},
	{
		value: "ml_engineer",
		label: "ML Engineer",
		icon: Sparkles
	},
	{
		value: "marketing",
		label: "Marketing",
		icon: Megaphone
	},
	{
		value: "business",
		label: "Business",
		icon: ChartNoAxesColumnIncreasing
	}
];
function StartupMatchPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [selectedRoles, setSelectedRoles] = (0, import_react.useState)([]);
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const { data: profiles = [], isLoading, refetch } = useStartupMatches(20);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const handleRoleToggle = (role) => {
		setSelectedRoles((prev) => prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]);
	};
	const filteredProfiles = selectedRoles.length > 0 ? profiles.filter((p) => p.startup_role && selectedRoles.includes(p.startup_role)) : profiles;
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
	const hasActiveFilters = selectedRoles.length > 0;
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Startup Match"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Find co-founders and build your founding team"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border glass min-h-[460px] animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[3/4] skeleton" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-3/4 skeleton rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 skeleton rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-full skeleton rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-20 skeleton rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-24 skeleton rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-20 skeleton rounded-full" })
							]
						})
					]
				})]
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
					children: "Startup Match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Find co-founders and build your founding team"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowFilters(!showFilters),
						className: `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${showFilters || hasActiveFilters ? "bg-primary/10 text-primary border border-primary/30" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }),
							"Filters",
							" ",
							hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold",
								children: "*"
							})
						]
					})
				})]
			}),
			showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Filter by Role Seeking"
					}), hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSelectedRoles([]),
						className: "text-xs text-primary hover:underline",
						children: "Clear all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: STARTUP_ROLES.map(({ value, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => handleRoleToggle(value),
						className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${selectedRoles.includes(value) ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:border-primary hover:text-primary border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
					}, value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: filteredProfiles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "No startup matches found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
							children: hasActiveFilters ? "Try adjusting your role filters or check back later!" : "Complete your profile and enable 'Looking for startup team' to find co-founders."
						}),
						!hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({ to: "/app/dating/profile" }),
							className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), "Update Profile"]
						})
					]
				}) : filteredProfiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
					profile,
					onLike: handleLike,
					onPass: handlePass,
					onSave: handleSave,
					onSuperLike: handleSuperLike,
					onChat: handleChat,
					onProfileClick: () => handleProfileClick(profile.id),
					showActions: true
				}, profile.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface/50 p-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
					children: "Roles in Startup Match"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: STARTUP_ROLES.map(({ value, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
					}, value))
				})]
			})
		]
	});
}
//#endregion
export { StartupMatchPage as component };
