import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, C as Shield, Ht as BookOpen, J as MapPin, M as Rocket, Mt as ChevronLeft, T as Share2, W as MessageSquare, dt as Github, et as Linkedin, ht as Flag, i as X, it as Instagram, jt as ChevronRight, st as Heart } from "../_libs/lucide-react.mjs";
import { S as useProfile } from "./use-dating-api-CYSx6-cH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-view-DUZh-bVz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileView() {
	const navigate = useNavigate();
	const profileId = useSearch({ strict: false }).profileId;
	const [photoIndex, setPhotoIndex] = (0, import_react.useState)(0);
	const [showPromptAnswers, setShowPromptAnswers] = (0, import_react.useState)(false);
	const [showFullBio, setShowFullBio] = (0, import_react.useState)(false);
	const [showCompatibilityDetails, setShowCompatibilityDetails] = (0, import_react.useState)(false);
	const { data: profileData, isLoading, error } = useProfile(profileId || "");
	const profile = profileData;
	const photos = profile?.photos?.filter((p) => p.url).sort((a, b) => a.display_order - b.display_order) ?? [];
	const mainPhoto = photos.find((p) => p.is_main) || photos[0];
	const currentPhoto = photos[photoIndex] || mainPhoto;
	const prompts = profile?.prompts?.sort((a, b) => a.display_order - b.display_order) ?? [];
	const nextPhoto = () => {
		if (photos.length > 1) setPhotoIndex((prev) => (prev + 1) % photos.length);
	};
	const prevPhoto = () => {
		if (photos.length > 1) setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
	};
	const relationshipLabels = {
		friends: "Friends",
		dating: "Dating",
		study_buddy: "Study Buddy",
		networking: "Networking",
		startup_partner: "Startup Partner"
	};
	const formatInterest = (interest) => interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, " ");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" })
	});
	if (error || !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-8 w-8 text-rose-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Profile not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "This profile doesn't exist or is private"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/app/dating" }),
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Back to Match"]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex-1",
			children: [
				photos.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: currentPhoto?.url || "/placeholder-profile.jpg",
						alt: `${profile.name}'s photo ${photoIndex + 1} of ${photos.length}`,
						className: "w-full h-full object-cover"
					}),
					photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: prevPhoto,
						className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:left-6",
						"aria-label": "Previous photo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: nextPhoto,
						className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:right-6",
						"aria-label": "Next photo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
					})] }),
					photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2",
						children: photos.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPhotoIndex(i),
							className: cn("h-2 w-2 rounded-full transition-all", i === photoIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white/75"),
							"aria-label": `Photo ${i + 1}`
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 left-0 right-0 z-10 p-4 md:p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => navigate({ to: "/app/dating" }),
								className: "p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 ml-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {},
									className: "p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
									"aria-label": "Share profile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {},
									className: "p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
									"aria-label": "Report profile",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5" })
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "text-2xl md:text-3xl font-bold text-white",
										children: [
											profile.name,
											", ",
											profile.age
										]
									}), profile.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 fill-primary text-primary-foreground shrink-0" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-white/90 mt-1 text-sm md:text-base",
									children: [
										profile.branch || profile.major || "Student",
										" •",
										" ",
										profile.year || "Year unknown"
									]
								}),
								profile.hostel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-white/70 mt-0.5 text-sm flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), profile.hostel]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: `/app/dating/chat/${profile.id}` }),
									className: "p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-colors",
									"aria-label": "Chat",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {},
									className: "p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors",
									"aria-label": "Like",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 fill-current" })
								})]
							})]
						})
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-8xl",
						children: "👤"
					})
				}),
				profile?.score !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-6 right-6 md:top-8 md:right-8 z-10 cursor-pointer",
					onClick: () => setShowCompatibilityDetails(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative inline-flex items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "h-14 w-14 md:h-16 md:w-16 transform -rotate-90",
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
									strokeDasharray: `${(profile.score || 0) * 1.256} 125.6`,
									className: "text-primary",
									style: { strokeDashoffset: 31.4 - (profile.score || 0) * 1.256 }
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
							className: "absolute inset-0 flex items-center justify-center text-sm md:text-base font-bold text-primary-foreground",
							children: [profile.score, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-white/80 mt-1",
						children: "Match Score"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden lg:block fixed inset-y-0 right-0 z-50 w-96 bg-background border-l border-border overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 space-y-6 max-h-[calc(100vh-2rem)] overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Profile Details"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/app/dating" }),
									className: "p-2 rounded-lg hover:bg-surface transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
								})]
							}),
							profile.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "About"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setShowFullBio(!showFullBio),
										className: "text-xs text-primary hover:underline",
										children: showFullBio ? "Show less" : "Show more"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-foreground/90",
									children: profile.bio
								})]
							}),
							prompts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Prompts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setShowPromptAnswers(!showPromptAnswers),
										className: "text-xs text-primary hover:underline",
										children: showPromptAnswers ? "Show less" : `Show all (${prompts.length})`
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [prompts.slice(0, showPromptAnswers ? prompts.length : 2).map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-surface/50 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1",
												children: prompt.prompt_category || "Prompt"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-foreground",
												children: prompt.prompt_text
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-foreground/90 italic",
												children: [
													"\"",
													prompt.answer,
													"\""
												]
											})
										]
									}, prompt.id)), prompts.length > 2 && !showPromptAnswers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setShowPromptAnswers(true),
										className: "w-full text-center text-sm text-primary hover:underline py-2",
										children: [
											"View all ",
											prompts.length,
											" prompts"
										]
									})]
								})]
							}),
							(profile.interests?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Interests"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [profile.interests.slice(0, 10).map((interest) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground",
										children: formatInterest(interest)
									}, interest)), profile.interests.length > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground",
										children: [
											"+",
											profile.interests.length - 10,
											" more"
										]
									})]
								})]
							}),
							(profile.clubs?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Clubs & Societies"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: profile.clubs.slice(0, 6).map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary",
										children: club
									}, club))
								})]
							}),
							(profile.skills?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Skills"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: profile.skills.slice(0, 8).map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400",
										children: skill
									}, skill))
								})]
							}),
							(profile.relationship_preference?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Looking For"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: profile.relationship_preference.map((pref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-xs text-rose-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-current" }), relationshipLabels[pref] || pref]
									}, pref))
								})]
							}),
							(profile.study_subjects?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }), "Study Preferences"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Subjects:"
											}),
											" ",
											profile.study_subjects.join(", ")
										] }),
										profile.study_cgpa_goal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "CGPA Goal:"
											}),
											" ",
											profile.study_cgpa_goal
										] }),
										profile.study_preferred_time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Preferred Time:"
											}),
											" ",
											profile.study_preferred_time
										] }),
										profile.study_preferred_location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Preferred Location:"
											}),
											" ",
											profile.study_preferred_location
										] })
									]
								})]
							}),
							profile.startup_looking_for && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }), "Startup Match"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 text-sm",
									children: [profile.startup_role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Role:"
										}),
										" ",
										profile.startup_role
									] }), profile.startup_skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Skills:"
										}),
										" ",
										profile.startup_skills.join(", ")
									] })]
								})]
							}),
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
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
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
							profile.badges && profile.badges.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border glass p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3",
									children: "Badges"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: profile.badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeBadge, { badge }, badge.id))
								})]
							})
						]
					})
				})
			]
		}), showCompatibilityDetails && profile?.reasons && profile.reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						children: [profile.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
								children: [profile.score, "%"]
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
export { ProfileView as component };
