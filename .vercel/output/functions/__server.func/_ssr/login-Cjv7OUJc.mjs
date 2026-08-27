import { r as __toESM } from "../_runtime.mjs";
import { i as isValidPecEmail, n as firebaseAuth, r as isValidAnyEmail } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, At as CircleAlert, Ct as Compass, Jt as ArrowRight, Y as Mail, Z as Lock, _t as Eye, b as Sparkles, lt as GraduationCap, vt as EyeOff, w as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cjv7OUJc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [isFresherMode, setIsFresherMode] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const cleanEmail = email.trim();
		if (!isFresherMode && !isValidPecEmail(cleanEmail)) {
			setError("Please enter a valid @pec.edu.in email ID, or click below if you are a Fresher without a PEC ID.");
			return;
		}
		if (isFresherMode && !isValidAnyEmail(cleanEmail)) {
			setError("Please enter a valid email address (e.g. name@gmail.com).");
			return;
		}
		setLoading(true);
		try {
			if (mode === "signup") await firebaseAuth.signUp(cleanEmail, password, name, isFresherMode);
			else await firebaseAuth.signIn(cleanEmail, password, isFresherMode);
			navigate({ to: "/app" });
		} catch (err) {
			const code = err.code ?? "";
			const msg = err.message;
			setError(friendlyError(code, msg));
		} finally {
			setLoading(false);
		}
	};
	const handleGoogle = async () => {
		setError(null);
		setGoogleLoading(true);
		try {
			await firebaseAuth.signInWithGoogle(true);
			navigate({ to: "/app" });
		} catch (err) {
			const code = err.code ?? "";
			const msg = err.message;
			setError(friendlyError(code, msg));
		} finally {
			setGoogleLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen w-full items-center justify-center bg-background p-4 overflow-x-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md animate-fade-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 border border-primary/25 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-7 w-7 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Campus Connect"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Punjab Engineering College · Student Portal & Community"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border glass p-6 sm:p-8 shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex rounded-xl border border-border bg-surface p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "signin-tab",
							type: "button",
							onClick: () => {
								setMode("signin");
								setError(null);
							},
							className: `flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition ${mode === "signin" ? "bg-primary text-primary-foreground shadow-sm glow-primary" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							id: "signup-tab",
							type: "button",
							onClick: () => {
								setMode("signup");
								setError(null);
							},
							className: `flex-1 rounded-lg py-2 text-xs sm:text-sm font-semibold transition ${mode === "signup" ? "bg-primary text-primary-foreground shadow-sm glow-primary" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign Up"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: isFresherMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Fresher Mode (Any Email)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsFresherMode(false);
									setError(null);
								},
								className: "text-[11px] underline hover:text-amber-400 font-medium",
								children: "Use PEC ID"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Primary: Punjab Engineering College ID"
							})]
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm text-rose-400 animate-in fade-in duration-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "name",
								className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
								children: "Full Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "name",
								type: "text",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "e.g. Siddharth Mohta",
								required: true,
								className: "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1.5 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "email",
										className: "block text-xs font-semibold text-muted-foreground",
										children: isFresherMode ? "Personal / Any Email ID" : "PEC Email ID"
									}), !isFresherMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-primary font-medium",
										children: "@pec.edu.in"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "email",
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: isFresherMode ? "yourname@gmail.com" : "xxxx@pec.edu.in",
										required: true,
										className: `w-full rounded-xl border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-1 ${isFresherMode ? "border-amber-500/40 focus:border-amber-500 focus:ring-amber-500/30" : "border-border focus:border-primary focus:ring-primary/30 font-medium"}`
									})]
								}),
								!isFresherMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: "Default primary flow: Enter your official PEC email ID."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "password",
								className: "mb-1.5 block text-xs font-semibold text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "password",
										type: showPassword ? "text" : "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••",
										required: true,
										minLength: 6,
										className: "w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowPassword(!showPassword),
										className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
										children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								id: "submit-btn",
								type: "submit",
								disabled: loading,
								className: "w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50 glow-primary flex items-center justify-center gap-2",
								children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), mode === "signin" ? isFresherMode ? "Sign In (Fresher Access)" : "Sign In with PEC ID" : isFresherMode ? "Create Fresher Account" : "Create Account with PEC ID"]
							})
						]
					}),
					!isFresherMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 pt-3 border-t border-border/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							id: "fresher-toggle-btn",
							onClick: () => {
								setIsFresherMode(true);
								setError(null);
							},
							className: "w-full text-left group p-3 rounded-xl border border-dashed border-border hover:border-primary/40 bg-surface/50 hover:bg-surface-elevated transition duration-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5",
										children: ["New / Fresher and don't have your PEC ID yet?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5 leading-snug",
										children: "Continue with any email to access the unofficial college dashboard & Orientation guide."
									})]
								})]
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 pt-3 border-t border-border/60 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setIsFresherMode(false);
								setError(null);
							},
							className: "text-xs text-muted-foreground hover:text-primary transition-colors underline font-medium",
							children: "← Already have an official @pec.edu.in ID? Switch back"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "or"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						id: "google-signin-btn",
						onClick: handleGoogle,
						disabled: googleLoading,
						className: "flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface py-2.5 text-sm font-medium transition hover:bg-surface-elevated disabled:opacity-50",
						children: [googleLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
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
						className: "mt-5 text-center text-[11px] text-muted-foreground",
						children: [
							"By continuing, you agree to our",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-primary hover:underline",
								children: "Terms"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-primary hover:underline",
								children: "Privacy Policy"
							}),
							"."
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
