import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Search, ft as Funnel, i as X } from "../_libs/lucide-react.mjs";
import { O as useSearchProfiles } from "./use-dating-api-CYSx6-cH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as ProfileCard } from "./ProfileCard-Dhz2XB2B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-lFFK36I-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RELATIONSHIP_OPTIONS = [
	{
		value: "friends",
		label: "Friends"
	},
	{
		value: "dating",
		label: "Dating"
	},
	{
		value: "study_buddy",
		label: "Study Buddy"
	},
	{
		value: "networking",
		label: "Networking"
	},
	{
		value: "startup_partner",
		label: "Startup Partner"
	}
];
var YEAR_OPTIONS = [
	"1st Year",
	"2nd Year",
	"3rd Year",
	"4th Year",
	"5th Year",
	"Grad Student",
	"PhD",
	"Alumni"
];
var BRANCH_OPTIONS = [
	"Computer Science",
	"Electronics",
	"Mechanical",
	"Civil",
	"Electrical",
	"Chemical",
	"Biotechnology",
	"Information Technology",
	"AI & ML",
	"Data Science",
	"Mathematics",
	"Physics",
	"Chemistry",
	"Economics",
	"Management",
	"Design",
	"Architecture"
];
var INTEREST_SUGGESTIONS = [
	"Coding",
	"Hackathons",
	"Coffee",
	"Anime",
	"Gaming",
	"Music",
	"Reading",
	"Sports",
	"Photography",
	"Travel",
	"Cooking",
	"Movies",
	"Startup",
	"AI/ML",
	"Web Dev",
	"Design"
];
function SearchPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filters, setFilters] = (0, import_react.useState)({
		branch: "",
		year: "",
		interests: [],
		clubs: [],
		skills: [],
		relationship_preference: [],
		gender: "",
		startup_looking_for: false
	});
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const [debouncedQuery, setDebouncedQuery] = (0, import_react.useState)("");
	const { data: profiles = [], isLoading, isError } = useSearchProfiles({
		q: debouncedQuery,
		...filters,
		limit: 20,
		offset: 0
	});
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);
		return () => clearTimeout(timer);
	}, [query]);
	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value
		}));
	};
	const handleArrayFilter = (key, item, checked) => {
		setFilters((prev) => ({
			...prev,
			[key]: checked ? [...prev[key], item] : prev[key].filter((i) => i !== item)
		}));
	};
	const handleTagInput = (key, value) => {
		const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
		setFilters((prev) => ({
			...prev,
			[key]: tags
		}));
	};
	const clearFilters = () => {
		setFilters({
			branch: "",
			year: "",
			interests: [],
			clubs: [],
			skills: [],
			relationship_preference: [],
			gender: "",
			startup_looking_for: false
		});
	};
	const hasActiveFilters = Object.values(filters).some((v) => Array.isArray(v) ? v.length > 0 : v !== "" && v !== false);
	const handleSearch = (e) => {
		e.preventDefault();
		setDebouncedQuery(query);
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Search"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Find people by name, interests, branch, and more"
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Search"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Find people by name, interests, branch, and more"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSearch,
				className: "rounded-2xl border border-border glass p-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search by name, bio, branch, interests...",
								className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 pl-10 text-sm outline-none focus:border-primary"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setQuery("");
									setDebouncedQuery("");
								},
								className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-muted-foreground" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowFilters(!showFilters),
						className: cn("flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition", showFilters || hasActiveFilters ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground hover:border-border"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }),
							"Filters",
							" ",
							hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-5 w-5 flex items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] font-bold",
								children: "*"
							})
						]
					})]
				}), showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 animate-fade-up space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Filters"
							}), hasActiveFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearFilters,
								className: "text-xs text-primary hover:underline",
								children: "Clear all"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Branch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filters.branch,
									onChange: (e) => handleFilterChange("branch", e.target.value),
									className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "All Branches"
									}), BRANCH_OPTIONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: b,
										children: b
									}, b))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filters.year,
									onChange: (e) => handleFilterChange("year", e.target.value),
									className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "All Years"
									}), YEAR_OPTIONS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: y,
										children: y
									}, y))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Gender"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filters.gender,
									onChange: (e) => handleFilterChange("gender", e.target.value),
									className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All Genders"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "male",
											children: "Male"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "female",
											children: "Female"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "non_binary",
											children: "Non-binary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "prefer_not_to_say",
											children: "Prefer not to say"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Looking For"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: RELATIONSHIP_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: filters.relationship_preference.includes(opt.value),
											onChange: (e) => handleArrayFilter("relationship_preference", opt.value, e.target.checked),
											className: "h-3.5 w-3.5 text-primary rounded border-border focus:ring-primary"
										}), opt.label]
									}, opt.value))
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
										children: "Interests (comma separated)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: filters.interests.join(", "),
										onChange: (e) => handleTagInput("interests", e.target.value),
										placeholder: "Coding, Hackathons, Coffee, Anime",
										className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-1",
										children: INTEREST_SUGGESTIONS.map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => handleArrayFilter("interests", interest, !filters.interests.includes(interest)),
											className: cn("rounded-full border px-3 py-1 text-xs transition", filters.interests.includes(interest) ? "bg-primary/20 text-primary border-primary/30" : "text-muted-foreground hover:border-primary hover:text-primary border-border"),
											children: interest
										}, interest))
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Clubs (comma separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: filters.clubs.join(", "),
									onChange: (e) => handleTagInput("clubs", e.target.value),
									placeholder: "ACM, IEEE, Dance Club, Debate Society",
									className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
									children: "Skills (comma separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: filters.skills.join(", "),
									onChange: (e) => handleTagInput("skills", e.target.value),
									placeholder: "React, Python, Figma, Public Speaking",
									className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: filters.startup_looking_for,
										onChange: (e) => handleFilterChange("startup_looking_for", e.target.checked),
										className: "h-4 w-4 text-primary rounded border-border focus:ring-primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Looking for startup co-founder/team"
									})]
								}) })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
				children: isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-8 w-8 text-rose-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Error loading results"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Please try again"
						})
					]
				}) : profiles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "No profiles found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground max-w-xs mx-auto",
							children: debouncedQuery ? `No results for "${debouncedQuery}". Try adjusting your filters.` : "Start searching to find people!"
						})
					]
				}) : profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
					profile,
					onLike: (profileId) => {},
					onPass: (profileId) => {},
					onSave: (profileId) => {},
					onSuperLike: (profileId) => {},
					onChat: (profileId) => navigate({ to: `/app/dating/chat/${profileId}` }),
					onProfileClick: () => navigate({ to: `/app/dating/profile/${profile.id}` }),
					showActions: true
				}, profile.id))
			}),
			profiles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted-foreground py-4",
				children: [
					"Showing ",
					profiles.length,
					" result",
					profiles.length !== 1 ? "s" : ""
				]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
