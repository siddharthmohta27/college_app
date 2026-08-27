import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Et as Clock, W as MessageSquare, b as Sparkles, i as X, r as Zap, st as Heart } from "../_libs/lucide-react.mjs";
import { _ as useMatches } from "./use-dating-api-CYSx6-cH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matches-TJ9cwY1s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MatchesPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [showStarters, setShowStarters] = (0, import_react.useState)(null);
	const [starters, setStarters] = (0, import_react.useState)([]);
	const { data: matches = [], isLoading, refetch } = useMatches();
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const handleStartChat = async (match) => {
		navigate({ to: `/app/dating/chat/${match.other_id || match.id}` });
	};
	const handleShowStarters = async (matchId) => {
		setShowStarters(matchId);
		try {
			setStarters([
				"You both love Hackathons — ask about their latest project! 💻",
				"You both play Badminton — challenge them for a game! 🏸",
				"You both like Anime — what's their favorite this season? 🎌",
				"You're both in the same department — talk about that tough assignment! 📚"
			]);
		} catch {
			setStarters(["Great match! Start the conversation! 🚀"]);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Your Matches"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: [matches.length, " mutual connections"]
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border glass min-h-[460px] flex flex-col items-center justify-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading matches..."
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
					children: "Your Matches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: [
						matches.length,
						" mutual connection",
						matches.length !== 1 ? "s" : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3.5 w-3.5 fill-current" }), matches.length]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-8 w-8 text-rose-400" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold",
							children: "No matches yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-xs mx-auto",
							children: "Start swiping on profiles to find your match! When you both like each other, you'll appear here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({ to: "/app/dating" }),
							className: "mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Start Swiping"]
						})
					]
				}) : matches.map((match) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchCard, {
					match,
					onChat: () => handleStartChat(match),
					onStarters: () => handleShowStarters(String(match.id)),
					showStarters: showStarters === String(match.id),
					starters,
					onCloseStarters: () => setShowStarters(null)
				}, match.id))
			}),
			showStarters && starters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl border border-primary/30 glass-strong p-6 animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "Conversation Starters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShowStarters(null);
									setStarters([]);
								},
								className: "p-1 rounded-lg hover:bg-surface transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: starters.map((starter, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-xl border border-border bg-surface p-4 group cursor-pointer transition hover:border-primary/30 hover:bg-primary/5",
								onClick: () => {
									navigator.clipboard.writeText(starter);
									toast.success("Copied to clipboard!");
									setShowStarters(null);
									setStarters([]);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-foreground/90 flex-1",
										children: starter
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground",
									children: "Tap to copy"
								})]
							}, index))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setShowStarters(null);
								setStarters([]);
							},
							className: "mt-4 w-full rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground",
							children: "Close"
						})
					]
				})
			})
		]
	});
}
function MatchCard({ match, onChat, onStarters, showStarters, starters, onCloseStarters }) {
	const timeAgo = match.matched_at ? formatDistanceToNow(new Date(match.matched_at), { addSuffix: true }) : "Recently";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30 hover:shadow-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-3xl",
						children: match.emoji || "👤"
					}), match.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-current text-primary-foreground" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold truncate",
								children: match.name
							}), match.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-2.5 w-2.5 fill-current text-primary-foreground" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: [
								match.major || match.branch,
								" • ",
								match.year
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									"Matched ",
									timeAgo
								]
							}), match.compatibility_score && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-primary font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }),
									match.compatibility_score,
									"% match"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onStarters,
						className: "p-2 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition",
						"aria-label": "Conversation starters",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onChat,
						className: "p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition",
						"aria-label": "Start chat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" })
					})]
				})
			]
		}), showStarters && starters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 pt-4 border-t border-border animate-fade-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground mb-2",
				children: "AI Suggestions:"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [starters.slice(0, 3).map((starter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						navigator.clipboard.writeText(starter);
						toast.success("Copied!");
						onCloseStarters();
					},
					className: "text-xs rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition",
					children: [starter.slice(0, 50), "..."]
				}, i)), starters.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onCloseStarters,
					className: "text-xs rounded-full border border-border bg-surface px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-primary transition",
					children: [
						"+",
						starters.length - 3,
						" more"
					]
				})]
			})]
		})]
	});
}
//#endregion
export { MatchesPage as component };
