import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Et as Clock, J as MapPin, O as Search, Ot as CircleCheck, P as Plus, S as ShoppingBag, W as MessageSquare, ft as Funnel, h as Trash2, i as X, st as Heart } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-Bz5bubvX.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-ChufjFAU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formatListingTime = (dateStr) => {
	if (!dateStr) return "recently";
	try {
		const d = new Date(dateStr);
		return isNaN(d.getTime()) ? "recently" : formatDistanceToNow(d, { addSuffix: true });
	} catch {
		return "recently";
	}
};
var CATEGORIES = [
	"All",
	"Books",
	"Electronics",
	"Dorm Gear",
	"Tickets",
	"Clothes",
	"Others"
];
var CONDITIONS = [
	"New",
	"Like New",
	"Good",
	"Acceptable"
];
var EMOJI_MAP = {
	Books: "📚",
	Electronics: "💻",
	"Dorm Gear": "🛏️",
	Tickets: "🎟️",
	Clothes: "👕",
	Others: "📦"
};
function getInitials(name, email) {
	if (name) {
		const parts = name.trim().split(" ");
		return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
	}
	if (email) return email.slice(0, 2).toUpperCase();
	return "??";
}
var AVATAR_COLORS = [
	"from-violet-500 to-purple-700",
	"from-blue-500 to-indigo-700",
	"from-emerald-500 to-teal-700",
	"from-rose-500 to-pink-700",
	"from-amber-500 to-orange-700",
	"from-cyan-500 to-sky-700"
];
function hashColor(uid) {
	let hash = 0;
	for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
var SEED_LISTINGS = [
	{
		title: "Calculus by Thomas (12th ed.)",
		description: "Barely used, all pages intact. Great for first-years.",
		price: 350,
		category: "Books",
		condition: "Like New",
		location: "Main Library lobby",
		emoji: "📚",
		seller_auth_id: "seed",
		seller_name: "Rahul Sharma",
		seller_initials: "RS",
		seller_color: "from-violet-500 to-purple-700",
		seller_email: "rahul@pec.edu.in",
		is_sold: false
	},
	{
		title: "Dell Laptop Charger 65W",
		description: "Works perfectly. Lost my laptop so selling the charger.",
		price: 500,
		category: "Electronics",
		condition: "Good",
		location: "Hostel D, Room 12",
		emoji: "💻",
		seller_auth_id: "seed",
		seller_name: "Priya Singh",
		seller_initials: "PS",
		seller_color: "from-blue-500 to-indigo-700",
		seller_email: "priya@pec.edu.in",
		is_sold: false
	},
	{
		title: "Badminton Racket (Yonex)",
		description: "Used for one semester. Strings are good.",
		price: 800,
		category: "Others",
		condition: "Good",
		location: "Sports Complex",
		emoji: "📦",
		seller_auth_id: "seed",
		seller_name: "Arjun Mehta",
		seller_initials: "AM",
		seller_color: "from-emerald-500 to-teal-700",
		seller_email: "arjun@pec.edu.in",
		is_sold: false
	}
];
function Marketplace() {
	const navigate = useNavigate();
	const [listings, setListings] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("newest");
	const [showPost, setShowPost] = (0, import_react.useState)(false);
	const [posting, setPosting] = (0, import_react.useState)(false);
	const [postError, setPostError] = (0, import_react.useState)(null);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({
				uid: user.uid,
				email: user.email,
				displayName: user.displayName
			});
			else setCurrentUser(null);
		});
	}, []);
	const fetchListings = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const { data: rows, error } = await supabase.from("marketplace_listings").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			if (!rows || rows.length === 0) {
				const { data: seeded, error: seedError } = await supabase.from("marketplace_listings").insert(SEED_LISTINGS).select("*");
				if (seedError) console.warn("Seed failed:", seedError.message);
				setListings((seeded || []).map((l) => ({
					...l,
					saved: false
				})));
				setLoading(false);
				return;
			}
			const uid = firebaseAuth.currentUser?.uid;
			let savedIds = /* @__PURE__ */ new Set();
			if (uid) {
				const { data: saves } = await supabase.from("marketplace_saves").select("listing_id").eq("saver_auth_id", uid);
				if (saves) savedIds = new Set(saves.map((s) => s.listing_id));
			}
			setListings(rows.map((l) => ({
				...l,
				saved: savedIds.has(l.id)
			})));
		} catch (err) {
			console.error("Failed to fetch listings:", err?.message ?? err);
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchListings();
	}, [fetchListings]);
	const toggleSave = async (id) => {
		if (!currentUser) return;
		const listing = listings.find((l) => l.id === id);
		if (!listing) return;
		setListings((prev) => prev.map((l) => l.id === id ? {
			...l,
			saved: !l.saved
		} : l));
		try {
			if (listing.saved) await supabase.from("marketplace_saves").delete().eq("listing_id", id).eq("saver_auth_id", currentUser.uid);
			else await supabase.from("marketplace_saves").insert({
				listing_id: id,
				saver_auth_id: currentUser.uid
			});
		} catch (_) {
			setListings((prev) => prev.map((l) => l.id === id ? {
				...l,
				saved: !l.saved
			} : l));
		}
	};
	const deleteListing = async (id) => {
		if (!confirm("Delete this listing?")) return;
		try {
			const { error } = await supabase.from("marketplace_listings").delete().eq("id", id);
			if (error) throw error;
			setListings((prev) => prev.filter((l) => l.id !== id));
		} catch (err) {
			alert("Failed to delete listing: " + (err?.message ?? "Unknown error"));
		}
	};
	const markSold = async (id) => {
		try {
			const { error } = await supabase.from("marketplace_listings").update({ is_sold: true }).eq("id", id);
			if (error) throw error;
			setListings((prev) => prev.map((l) => l.id === id ? {
				...l,
				is_sold: true
			} : l));
		} catch (err) {
			alert("Failed to mark as sold: " + (err?.message ?? "Unknown error"));
		}
	};
	const handlePost = async (e) => {
		e.preventDefault();
		if (!currentUser) return;
		const form = e.currentTarget;
		const data = new FormData(form);
		const category = data.get("category");
		setPosting(true);
		setPostError(null);
		const sellerName = currentUser.displayName || currentUser.email?.split("@")[0] || "Anonymous";
		const sellerInitials = getInitials(currentUser.displayName, currentUser.email);
		const sellerColor = hashColor(currentUser.uid);
		try {
			const { data: inserted, error } = await supabase.from("marketplace_listings").insert({
				title: data.get("title"),
				description: data.get("description") || "",
				price: Number(data.get("price")),
				category,
				condition: data.get("condition"),
				location: data.get("location") || "",
				emoji: EMOJI_MAP[category] || "📦",
				seller_auth_id: currentUser.uid,
				seller_name: sellerName,
				seller_initials: sellerInitials,
				seller_color: sellerColor,
				seller_email: currentUser.email || ""
			}).select("*").single();
			if (error) throw error;
			setListings((prev) => [{
				...inserted,
				saved: false
			}, ...prev]);
			setShowPost(false);
			form.reset();
		} catch (err) {
			setPostError(err?.message || "Failed to post listing");
		} finally {
			setPosting(false);
		}
	};
	const filtered = listings.filter((l) => {
		if (l.is_sold) return false;
		const matchCat = selectedCategory === "All" || l.category === selectedCategory;
		const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || (l.description || "").toLowerCase().includes(search.toLowerCase());
		return matchCat && matchSearch;
	}).sort((a, b) => {
		if (sortBy === "price-low") return a.price - b.price;
		if (sortBy === "price-high") return b.price - a.price;
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Student Marketplace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-0.5",
					children: "Buy, sell and swap with your campus peers"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					id: "post-listing-btn",
					onClick: () => setShowPost(true),
					className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition glow-primary btn-press",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Post Listing"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 animate-fade-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-52",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "marketplace-search",
							placeholder: "Search listings...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "marketplace-sort",
						value: sortBy,
						onChange: (e) => setSortBy(e.target.value),
						className: "rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest First"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-low",
								children: "Price: Low → High"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price-high",
								children: "Price: High → Low"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-muted-foreground transition hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), " Filter"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 animate-fade-up",
				children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: `cat-${cat.toLowerCase().replace(/ /g, "-")}`,
					onClick: () => setSelectedCategory(cat),
					className: `rounded-full px-4 py-1.5 text-xs font-medium transition ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"}`,
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: loading ? "Loading listings..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: filtered.length
					}),
					" ",
					"listings",
					search && ` for "${search}"`
				] })
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center py-20 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin mr-2" }), " Loading marketplace..."]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-muted-foreground gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-10 w-10 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: "No listings found. Be the first to post!"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((listing, i) => {
					const isOwner = currentUser?.uid === listing.seller_auth_id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: `listing-${listing.id}`,
						className: "group relative flex flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-200 animate-fade-up card-hover",
						style: { animationDelay: `${i * 50}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-32 items-center justify-center bg-surface-elevated text-5xl",
							children: [
								listing.emoji,
								isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 right-2 flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => markSold(listing.id),
										title: "Mark as sold",
										className: "rounded-full bg-emerald-500/20 p-1.5 text-emerald-400 hover:bg-emerald-500/40 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => deleteListing(listing.id),
										title: "Delete listing",
										className: "rounded-full bg-rose-500/20 p-1.5 text-rose-400 hover:bg-rose-500/40 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								}),
								isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 left-2 rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-semibold text-primary",
									children: "Your listing"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "truncate font-semibold text-sm",
											children: listing.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted-foreground line-clamp-2",
											children: listing.description
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggleSave(listing.id),
										className: `shrink-0 transition ${listing.saved ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${listing.saved ? "fill-current" : ""}` })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted-foreground",
										children: listing.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2 py-0.5 text-[10px] ${listing.condition === "New" || listing.condition === "Like New" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`,
										children: listing.condition
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto pt-3 border-t border-border flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${listing.seller_color} text-[9px] font-bold text-white`,
											children: listing.seller_initials
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium",
											children: listing.seller_name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-base font-bold text-primary",
											children: ["₹", listing.price]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-[10px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-2.5 w-2.5" }), formatListingTime(listing.created_at)]
										})]
									})]
								}),
								listing.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-1 text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-2.5 w-2.5" }), listing.location]
								}),
								!isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => navigate({ to: "/app/chat" }),
									className: "mt-3 w-full rounded-lg bg-primary/15 py-2 text-xs font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-primary-foreground btn-press inline-flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3" }), " Contact Seller"]
								})
							]
						})]
					}, listing.id);
				})
			}),
			showPost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl glass-strong neon-border p-6 animate-fade-up max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-lg font-bold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-primary" }), " Post a Listing"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "close-post-modal",
							onClick: () => {
								setShowPost(false);
								setPostError(null);
							},
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), !currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground text-center py-4",
						children: "Please sign in to post a listing."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-4",
						onSubmit: handlePost,
						children: [
							postError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-xs text-rose-400",
								children: postError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								htmlFor: "post-title",
								children: "Title *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "post-title",
								name: "title",
								required: true,
								placeholder: "e.g. Calculus textbook 3rd ed.",
								className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-medium text-muted-foreground",
									htmlFor: "post-price",
									children: "Price (₹) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "post-price",
									name: "price",
									required: true,
									type: "number",
									min: 0,
									placeholder: "500",
									className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-medium text-muted-foreground",
									htmlFor: "post-category",
									children: "Category *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "post-category",
									name: "category",
									className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary",
									children: CATEGORIES.filter((c) => c !== "All").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								htmlFor: "post-condition",
								children: "Condition *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "post-condition",
								name: "condition",
								className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary",
								children: CONDITIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								htmlFor: "post-desc",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "post-desc",
								name: "description",
								rows: 3,
								placeholder: "Describe your item...",
								className: "w-full resize-none rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								htmlFor: "post-location",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "inline h-3 w-3 mr-1" }), "Pickup Location"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "post-location",
								name: "location",
								placeholder: "e.g. Hostel Block A, Room 204",
								className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "post-submit-btn",
								type: "submit",
								disabled: posting,
								className: "w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary disabled:opacity-50 inline-flex items-center justify-center gap-2",
								children: posting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Posting..."] }) : "Post Listing"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { Marketplace as component };
