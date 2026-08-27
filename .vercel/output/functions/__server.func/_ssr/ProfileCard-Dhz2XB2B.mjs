import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as Shield, J as MapPin, Mt as ChevronLeft, T as Share2, W as MessageSquare, dt as Github, et as Linkedin, ht as Flag, i as X, it as Instagram, jt as ChevronRight, st as Heart, v as Star } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfileCard-Dhz2XB2B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileCard({ profile, onLike, onPass, onSuperLike, onSave, onShare, onReport, onChat, isSaved, showCompatibility = true, compatibilityScore, compatibilityReasons, showActions = true, className }) {
	const [photoIndex, setPhotoIndex] = (0, import_react.useState)(0);
	const [showPromptAnswers, setShowPromptAnswers] = (0, import_react.useState)(false);
	const [showFullBio, setShowFullBio] = (0, import_react.useState)(false);
	const [showCompatibilityDetails, setShowCompatibilityDetails] = (0, import_react.useState)(false);
	const photos = profile.photos?.filter((p) => p.url).sort((a, b) => a.display_order - b.display_order) ?? [];
	const mainPhoto = photos.find((p) => p.is_main) || photos[0];
	const currentPhoto = photos[photoIndex] || mainPhoto;
	const prompts = profile.prompts?.sort((a, b) => a.display_order - b.display_order) ?? [];
	const nextPhoto = (0, import_react.useCallback)(() => {
		if (photos.length > 1) setPhotoIndex((prev) => (prev + 1) % photos.length);
	}, [photos.length]);
	const prevPhoto = (0, import_react.useCallback)(() => {
		if (photos.length > 1) setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
	}, [photos.length]);
	const relationshipLabels = {
		friends: "Friends",
		dating: "Dating",
		study_buddy: "Study Buddy",
		networking: "Networking",
		startup_partner: "Startup Partner"
	};
	const formatInterest = (interest) => interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, " ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative rounded-2xl border border-border glass overflow-hidden animate-fade-up", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/4] overflow-hidden",
				children: [
					photos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: currentPhoto?.url || "/placeholder-profile.jpg",
							alt: `${profile.name}'s photo ${photoIndex + 1} of ${photos.length}`,
							className: "w-full h-full object-cover transition-opacity duration-300"
						}),
						photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: prevPhoto,
							className: "absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
							"aria-label": "Previous photo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: nextPhoto,
							className: "absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
							"aria-label": "Next photo",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
						})] }),
						photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5",
							children: photos.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPhotoIndex(i),
								className: cn("h-1.5 w-1.5 rounded-full transition-all", i === photoIndex ? "bg-primary w-5" : "bg-white/50 hover:bg-white/75"),
								"aria-label": `Photo ${i + 1}`
							}, i))
						}),
						photos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 left-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), "Main Photo"]
							})
						}),
						profile.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 fill-current" }), "Verified"]
						}),
						showCompatibility && compatibilityScore !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 right-3 cursor-pointer",
							onClick: (e) => {
								e.stopPropagation();
								setShowCompatibilityDetails(true);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative inline-flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "h-12 w-12 transform -rotate-90",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "24",
											cy: "24",
											r: "20",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "4",
											className: "text-primary/20"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "24",
											cy: "24",
											r: "20",
											fill: "none",
											stroke: "url(#compatibility-gradient)",
											strokeWidth: "4",
											strokeLinecap: "round",
											strokeDasharray: `${compatibilityScore * 1.256} 125.6`,
											className: "text-primary",
											style: { strokeDashoffset: 31.4 - compatibilityScore * 1.256 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "compatibility-gradient",
											x1: "0%",
											y1: "0%",
											x2: "100%",
											y2: "0%",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.84 0.18 85)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.9 0.15 90)"
											})]
										}) })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-foreground",
									children: [compatibilityScore, "%"]
								})]
							})
						}),
						profile.photo_verified && currentPhoto?.is_main && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[10px] font-semibold text-emerald-500-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 fill-current text-emerald-500" }), "Photo Verified"]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full items-center justify-center bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-6xl",
							children: "👤"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xl font-bold text-white",
										children: [
											profile.name,
											", ",
											profile.age
										]
									}), profile.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 fill-primary text-primary-foreground shrink-0" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-white/90 mt-1",
									children: [
										profile.branch || profile.major || "Student",
										" • ",
										profile.year || "Year unknown"
									]
								}),
								profile.hostel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-white/70 mt-0.5 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), profile.hostel]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										onShare?.(profile.id);
									},
									className: "p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
									"aria-label": "Share profile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.stopPropagation();
										onReport?.(profile.id);
									},
									className: "p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
									"aria-label": "Report profile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-4 w-4" })
								})]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 space-y-5",
				children: [
					profile.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
							children: "About"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowFullBio(!showFullBio),
							className: "text-xs text-primary hover:underline",
							children: showFullBio ? "Show less" : "Show more"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-foreground/90 line-clamp-3 transition-all",
						children: showFullBio ? profile.bio : profile.bio
					})] }),
					prompts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
							children: "Prompts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowPromptAnswers(!showPromptAnswers),
							className: "text-xs text-primary hover:underline",
							children: showPromptAnswers ? "Show less" : `Show all (${prompts.length})`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-3",
						children: [prompts.slice(0, showPromptAnswers ? prompts.length : 2).map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptCard, {
							prompt,
							onLike: () => onLike?.(profile.id, "prompt", prompt.prompt_id),
							compatibilityReasons
						}, prompt.id)), prompts.length > 2 && !showPromptAnswers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowPromptAnswers(true),
							className: "w-full text-center text-sm text-primary hover:underline py-2",
							children: [
								"View all ",
								prompts.length,
								" prompts"
							]
						})]
					})] }),
					(profile.interests?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Interests"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: [profile.interests.slice(0, 8).map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground",
							children: formatInterest(interest)
						}, interest)), profile.interests.length > 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground",
							children: [
								"+",
								profile.interests.length - 8,
								" more"
							]
						})]
					})] }),
					(profile.clubs?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Clubs & Societies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: profile.clubs.slice(0, 5).map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary",
							children: club
						}, club))
					})] }),
					(profile.skills?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Skills"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: profile.skills.slice(0, 6).map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400",
							children: skill
						}, skill))
					})] }),
					(profile.relationship_preference?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Looking For"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: profile.relationship_preference.map((pref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-current" }), relationshipLabels[pref] || pref]
						}, pref))
					})] }),
					[
						{
							label: "Instagram",
							url: profile.instagram_url,
							icon: Instagram,
							color: "text-pink-400"
						},
						{
							label: "LinkedIn",
							url: profile.linkedin_url,
							icon: Linkedin,
							color: "text-blue-400"
						},
						{
							label: "GitHub",
							url: profile.github_url,
							icon: Github,
							color: "text-gray-400"
						}
					].filter((s) => s.url).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-3 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2",
							children: "Social"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3",
							children: [
								{
									label: "Instagram",
									url: profile.instagram_url,
									icon: Instagram,
									color: "text-pink-400"
								},
								{
									label: "LinkedIn",
									url: profile.linkedin_url,
									icon: Linkedin,
									color: "text-blue-400"
								},
								{
									label: "GitHub",
									url: profile.github_url,
									icon: Github,
									color: "text-gray-400"
								}
							].filter((s) => s.url).map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: social.url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: cn("flex items-center gap-1.5 text-sm font-medium transition-colors", social.color, "hover:opacity-75"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(social.icon, { className: "h-4 w-4" }), social.label]
							}, social.label))
						})]
					}),
					profile.badges && profile.badges.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Badges"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: profile.badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeBadge, { badge }, badge.id))
					})] }),
					showActions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4 border-t border-border flex items-center justify-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onPass?.(profile.id),
								disabled: !onPass,
								className: "flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:bg-red-500/10 hover:border-red-500/40 text-red-400 transition disabled:opacity-50",
								"aria-label": "Pass",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onSave?.(profile.id),
								disabled: !onSave,
								className: cn("flex h-12 w-12 items-center justify-center rounded-full transition disabled:opacity-50", isSaved ? "bg-primary/20 text-primary border border-primary/30" : "bg-surface border border-border text-muted-foreground hover:border-primary hover:text-primary"),
								"aria-label": isSaved ? "Unsave" : "Save",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("h-5 w-5 fill-current", isSaved ? "text-primary" : "") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onLike?.(profile.id, "profile"),
								disabled: !onLike,
								className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition glow-primary disabled:opacity-50",
								"aria-label": "Like",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-7 w-7 fill-current" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onSuperLike?.(profile.id),
								disabled: !onSuperLike,
								className: "flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition disabled:opacity-50",
								"aria-label": "Super Like",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-current text-primary" })
							}),
							onChat && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => onChat(profile.id),
								className: "flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface hover:border-primary hover:text-primary transition",
								"aria-label": "Chat",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" })
							})
						]
					})
				]
			}),
			showCompatibilityDetails && compatibilityReasons && compatibilityReasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl border border-primary/30 glass-strong p-6 animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "Compatibility Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowCompatibilityDetails(false),
								className: "p-1 rounded-lg hover:bg-surface transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [compatibilityReasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 p-3 rounded-xl bg-surface/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl",
											children: getReasonIcon(reason.type)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: reason.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: reason.detail || `Weight: ${reason.weight}%`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-bold text-primary",
											children: [
												"+",
												reason.weight,
												"%"
											]
										})
									})
								]
							}, reason.type)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3 border-t border-border flex justify-between font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Score" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-primary",
									children: [compatibilityScore, "%"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowCompatibilityDetails(false),
							className: "mt-6 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
							children: "Got it!"
						})
					]
				})
			})
		]
	});
}
function PromptCard({ prompt, onLike, compatibilityReasons }) {
	const isMatchingPrompt = compatibilityReasons?.some((r) => r.type === "shared_prompt" && r.detail?.includes(prompt.prompt_id?.toString() ?? ""));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative rounded-xl border p-4 transition", isMatchingPrompt ? "border-primary/30 bg-primary/5" : "border-border bg-surface/50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1",
						children: prompt.prompt_category ? prompt.prompt_category.charAt(0).toUpperCase() + prompt.prompt_category.slice(1) : "Prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: prompt.prompt_text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-foreground/90 italic",
						children: [
							"\"",
							prompt.answer,
							"\""
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onLike,
				className: "shrink-0 p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition",
				"aria-label": "Like this prompt answer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 fill-current" })
			})]
		}), isMatchingPrompt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), "Matching prompt!"]
		})]
	});
}
function BadgeBadge({ badge }) {
	const config = {
		verified_student: {
			label: "Verified Student",
			icon: "🎓",
			color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
		},
		club_lead: {
			label: "Club Lead",
			icon: "👑",
			color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
		},
		hackathon_winner: {
			label: "Hackathon Winner",
			icon: "🏆",
			color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
		},
		startup_founder: {
			label: "Startup Founder",
			icon: "🚀",
			color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
		},
		placement_coordinator: {
			label: "Placement Coordinator",
			icon: "💼",
			color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
		},
		athlete: {
			label: "Athlete",
			icon: "🏃",
			color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
		},
		alumni_mentor: {
			label: "Alumni Mentor",
			icon: "🧑‍🏫",
			color: "bg-pink-500/20 text-pink-400 border-pink-500/30"
		}
	}[badge.badge_type] || {
		label: badge.badge_type,
		icon: "🏅",
		color: "bg-primary/20 text-primary border-primary/30"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold", config.color),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: config.icon
		}), config.label]
	});
}
function getReasonIcon(type) {
	return {
		same_branch: "🏫",
		same_year: "📅",
		common_interests: "❤️",
		common_clubs: "👥",
		mutual_friends: "🤝",
		common_courses: "📚",
		hackathon_participation: "💻",
		startup_interest: "🚀",
		sports: "🏃",
		shared_prompt: "💬",
		same_hostel: "🏠",
		common_languages: "🗣️",
		same_skills: "⚡"
	}[type] || "✨";
}
//#endregion
export { ProfileCard as t };
