import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth, t as auth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Ct as Compass, Ht as BookOpen, It as Calendar, Jt as ArrowRight, Lt as CalendarDays, S as ShoppingBag, W as MessageSquare, Y as Mail, Z as Lock, b as Sparkles, c as UtensilsCrossed, gt as FileText, l as Users, lt as GraduationCap, y as SquareCheckBig } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-BFpCBOQ5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4If32lZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_bg_default = "/assets/hero-bg-D-qyQynd.jpg";
function Landing() {
	const [mode, setMode] = (0, import_react.useState)("landing");
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!auth) return;
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) navigate({ to: "/app" });
		});
	}, [navigate]);
	const friendlyError = (code, message) => {
		if (message && message.includes("@pec.edu.in")) return message;
		return {
			"auth/user-not-found": "No account found with this email.",
			"auth/wrong-password": "Incorrect password. Please try again.",
			"auth/email-already-in-use": "An account with this email already exists.",
			"auth/weak-password": "Password must be at least 6 characters.",
			"auth/invalid-email": "Please enter a valid email address.",
			"auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
			"auth/popup-closed-by-user": "Google sign-in was cancelled.",
			"auth/network-request-failed": "Network error. Check your internet connection."
		}[code] ?? message ?? "Something went wrong. Please try again.";
	};
	const handleAuthSubmit = async (e, type, formData, isFresherMode = false) => {
		e.preventDefault();
		setAuthLoading(true);
		setAuthError(null);
		try {
			if (type === "signup") await firebaseAuth.signUp(formData.email, formData.password, formData.name, isFresherMode);
			else await firebaseAuth.signIn(formData.email, formData.password, isFresherMode);
			if (auth.currentUser) navigate({ to: "/app" });
		} catch (err) {
			setAuthError(friendlyError(err.code || "", err.message));
		} finally {
			setAuthLoading(false);
		}
	};
	const handleGoogleSignIn = async () => {
		setAuthLoading(true);
		setAuthError(null);
		try {
			await firebaseAuth.signInWithGoogle(true);
			if (auth.currentUser) navigate({ to: "/app" });
		} catch (err) {
			setAuthError(friendlyError(err.code || "", err.message));
			setAuthLoading(false);
		}
	};
	const [authError, setAuthError] = (0, import_react.useState)(null);
	const [authLoading, setAuthLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		email: "",
		password: "",
		name: "",
		college: ""
	});
	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
		setAuthError(null);
	};
	const handleSignupSubmit = (e) => {
		handleAuthSubmit(e, "signup", formData);
	};
	const handleLoginSubmit = (e) => {
		handleAuthSubmit(e, "login", formData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 -z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_bg_default,
						alt: "",
						className: "h-full w-full object-cover opacity-20",
						width: 1920,
						height: 1280
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-30" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/20 animate-pulse-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-bold tracking-tight sm:text-lg",
								children: "Campus Connect"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden ml-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-mono uppercase text-primary sm:inline",
								children: "beta"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-8 text-sm text-muted-foreground md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								className: "hover:text-foreground transition",
								children: "Features"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#marketplace",
								className: "hover:text-foreground transition",
								children: "Marketplace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#canteen",
								className: "hover:text-foreground transition",
								children: "Canteen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#community",
								className: "hover:text-foreground transition",
								children: "Community"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "signin-btn",
								onClick: () => {
									setMode("login");
									setAuthError(null);
								},
								className: "hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:block",
								children: "Sign in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "getstarted-btn",
								onClick: () => {
									setMode("signup");
									setAuthError(null);
								},
								className: "rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-primary sm:px-4",
								children: "Get started"
							})
						]
					})
				]
			}),
			mode === "landing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10 mx-auto max-w-7xl px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "pt-10 pb-16 text-center animate-fade-up sm:pt-16 sm:pb-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Making your PEC journey smoother, connected & effortless 🚀" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl",
								children: ["Your campus, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: "supercharged"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg",
								children: "Orientation schedules, section timetables, hostel mess menus, student marketplace, real-time chat, clubs & academic resources — everything you need for college life, beautifully unified."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									id: "hero-getstarted-btn",
									onClick: () => {
										setMode("signup");
										setAuthError(null);
									},
									className: "group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",
									children: ["Join Campus Connect", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setMode("login");
										setAuthError(null);
									},
									className: "inline-flex items-center gap-2 rounded-xl border border-border glass px-7 py-3.5 text-sm font-semibold transition hover:bg-surface-elevated",
									children: "Sign in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto",
								children: [
									{
										icon: Compass,
										label: "Orientation 2026",
										color: "text-amber-500"
									},
									{
										icon: CalendarDays,
										label: "My Timetable",
										color: "text-primary"
									},
									{
										icon: UtensilsCrossed,
										label: "Mess Menu",
										color: "text-primary"
									},
									{
										icon: ShoppingBag,
										label: "Marketplace",
										color: "text-primary"
									},
									{
										icon: MessageSquare,
										label: "Campus Chat",
										color: "text-primary"
									},
									{
										icon: Calendar,
										label: "Clubs & PECFEST",
										color: "text-primary"
									},
									{
										icon: BookOpen,
										label: "Study Rooms & Pomodoro",
										color: "text-primary"
									},
									{
										icon: SquareCheckBig,
										label: "Attendance 75% Tracker",
										color: "text-primary"
									},
									{
										icon: FileText,
										label: "Notes & PYQs",
										color: "text-primary"
									}
								].map(({ icon: Icon, label, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/50 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur hover:text-foreground hover:border-primary/40 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 ${color}` }), label]
								}, label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "features",
						className: "pb-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center mb-12 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl font-bold",
								children: "Everything your college life needs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-lg mx-auto",
								children: "Purpose-built tools to navigate academics, hostel dining, campus events and student commerce at PEC."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
							children: [
								{
									icon: Compass,
									title: "Orientation & Campus Maps",
									desc: "Day-by-day official induction timetable, reporting venues across Audi & Seminar Halls, and hostel guide.",
									color: "text-amber-500",
									glow: "group-hover:bg-amber-500/10",
									id: "orientation"
								},
								{
									icon: CalendarDays,
									title: "Section Timetables",
									desc: "Auto-detected by student roll number. Never miss a lecture, lab session or room venue change.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "timetable"
								},
								{
									icon: UtensilsCrossed,
									title: "Hostel Mess Menus",
									desc: "Weekly 4-meal cycle for Kurukshetra, Shivalik, Himalaya, Kalpana Chawla & Vindhya with live meal timings.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "canteen"
								},
								{
									icon: ShoppingBag,
									title: "Student Marketplace",
									desc: "Buy, sell and swap textbooks, electronics, cycle, drafter and gear directly with campus batchmates.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "marketplace"
								},
								{
									icon: MessageSquare,
									title: "Campus Chat & Channels",
									desc: "Branch groups, hostel chats, assignments help, and voice study rooms — all in one Discord-style hub.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "chat"
								},
								{
									icon: Calendar,
									title: "Clubs & PECFEST",
									desc: "Explore 15+ student societies, technical fests, cultural nights and PECFEST dates & event registrations.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "clubs"
								},
								{
									icon: SquareCheckBig,
									title: "Attendance Tracker",
									desc: "Target 75% attendance calculator with safe bnk predictor and per-subject lecture logs.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "attendance"
								},
								{
									icon: BookOpen,
									title: "Study Rooms & Pomodoro",
									desc: "Real-time study hall occupancy, seat reservations, and focused Pomodoro grind sessions with friends.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "study"
								},
								{
									icon: FileText,
									title: "Academic Notes & PYQs",
									desc: "Curated previous year papers, verified class notes, syllabus breakdown and semester resources.",
									color: "text-primary",
									glow: "group-hover:bg-primary/10",
									id: "resources"
								}
							].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: `feature-${f.id}`,
								className: "group relative overflow-hidden rounded-2xl glass p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up border border-border/80",
								style: { animationDelay: `${i * 60}ms` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition duration-500 ${f.glow}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-elevated`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: `h-6 w-6 ${f.color}` })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-semibold",
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground leading-relaxed",
										children: f.desc
									})
								]
							}, f.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "community",
						className: "mb-24 rounded-3xl glass-strong neon-border p-8 md:p-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 text-center space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl sm:text-2xl font-bold",
								children: "Built Exclusively for Punjab Engineering College"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground",
								children: "Crafted for PECians — from Freshers Orientation to Final Year Placements"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-8",
							children: [
								["100%", "PEC Batch Coverage"],
								["10+", "Branch Timetables"],
								["5", "Hostel Mess Menus"],
								["#1", "Student Super-App"]
							].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold gradient-text sm:text-4xl",
									children: n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground font-medium",
									children: l
								})]
							}, l))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "pb-10 text-center text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Campus Connect. Built for students, by students."
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, {
				mode,
				setMode,
				formData,
				setFormData,
				handleChange,
				authError,
				setAuthError,
				authLoading,
				handleSignupSubmit,
				handleLoginSubmit,
				handleGoogleSignIn
			})
		]
	});
}
function AuthCard({ mode, setMode, formData, setFormData, handleChange, authError, setAuthError, authLoading, handleSignupSubmit, handleLoginSubmit, handleGoogleSignIn }) {
	const isSignup = mode === "signup";
	const [isFresherMode, setIsFresherMode] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative z-10 mx-auto flex max-w-md flex-col items-center px-6 pt-8 pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full rounded-3xl glass-strong neon-border p-8 shadow-elevated animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 animate-pulse-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-7 w-7 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold",
							children: isSignup ? "Join Campus Connect" : "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: isFresherMode ? "Fresher Access · Any email format accepted" : isSignup ? "Create your student account" : "Sign in to your college dashboard"
						})
					]
				}),
				authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-sm text-rose-400",
					children: authError
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => isSignup ? handleSignupSubmit(e, isFresherMode) : handleLoginSubmit(e, isFresherMode),
					className: "space-y-4",
					children: [
						isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							type: "text",
							id: "signup-name",
							name: "name",
							placeholder: "Your Name",
							value: formData.name,
							onChange: handleChange
						}),
						isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "College / University",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" }),
							type: "text",
							id: "signup-college",
							name: "college",
							placeholder: "Punjab Engineering College",
							value: formData.college,
							onChange: handleChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: isFresherMode ? "Personal / Any Email Address" : "Enter your PEC email ID",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
							type: "email",
							id: "auth-email",
							name: "email",
							placeholder: isFresherMode ? "yourname@gmail.com" : "xxxx@pec.edu.in",
							value: formData.email,
							onChange: handleChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Password",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
							type: "password",
							id: "auth-password",
							name: "password",
							placeholder: "••••••••",
							value: formData.password,
							onChange: handleChange
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "auth-submit-btn",
							type: "submit",
							disabled: authLoading,
							className: "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary disabled:opacity-50",
							children: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), isSignup ? "Creating account..." : "Signing in..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isSignup ? isFresherMode ? "Create Fresher Account" : "Create Account" : isFresherMode ? "Sign In (Fresher)" : "Sign In", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						})
					]
				}),
				!isFresherMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 pt-3 border-t border-border/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsFresherMode(true);
							setAuthError(null);
						},
						className: "w-full text-left p-3 rounded-xl border border-dashed border-border hover:border-primary/40 bg-surface/50 hover:bg-surface-elevated transition duration-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-foreground hover:text-primary transition-colors",
								children: "New / Fresher and don't have your PEC ID yet?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-0.5 leading-snug",
								children: "Continue with any email to access the unofficial college dashboard & Orientation."
							})] })]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsFresherMode(false);
							setAuthError(null);
						},
						className: "text-xs text-muted-foreground hover:text-primary underline",
						children: "← Have a PEC ID? Use @pec.edu.in"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OR CONTINUE WITH" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					id: "google-auth-btn",
					type: "button",
					onClick: handleGoogleSignIn,
					disabled: authLoading,
					className: "flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated disabled:opacity-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "h-4 w-4",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							})
						]
					}), "Continue with Google"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [isSignup ? "Already have an account? " : "New to Campus Connect? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "font-medium text-accent hover:underline",
						onClick: () => {
							setMode(isSignup ? "login" : "signup");
							setFormData({
								email: "",
								password: "",
								name: "",
								college: ""
							});
						},
						children: isSignup ? "Sign in" : "Create one"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				setMode("landing");
				setAuthError(null);
				setFormData({
					email: "",
					password: "",
					name: "",
					college: ""
				});
			},
			className: "mt-6 text-xs text-muted-foreground hover:text-foreground",
			children: "← Back home"
		})]
	});
}
function Field({ label, icon, id, name, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		htmlFor: id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...props,
				id,
				name,
				required: true,
				className: "w-full rounded-xl border border-border bg-input/60 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
			})]
		})]
	});
}
//#endregion
export { Landing as component };
