import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as parsePecEmail } from "./pec-email-B1YgkvDT.mjs";
import { Dt as CircleX, Gt as Ban, Ht as BookOpen, It as Calendar, Nt as Check, Ot as CircleCheck, P as Plus, b as Sparkles, h as Trash2, i as X, p as TriangleAlert, r as Zap } from "../_libs/lucide-react.mjs";
import { i as getTodaySchedule, n as getSectionFromRollNo, r as getTimetableForSection } from "./pec-timetable-C8LUof1w.mjs";
import { a as mergeTimetableWithSaved, i as loadLocalAttendance, n as extractSubjectsFromTimetable, o as saveLocalAttendance, r as fetchSupabaseAttendance, s as syncSupabaseAttendance, t as calculateSubjectStats } from "./attendance-_nwc91w_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-CtPROof1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttendanceTracker() {
	const [userEmail, setUserEmail] = (0, import_react.useState)(null);
	const [userName, setUserName] = (0, import_react.useState)(null);
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [subjects, setSubjects] = (0, import_react.useState)([]);
	const [timetable, setTimetable] = (0, import_react.useState)(null);
	const [section, setSection] = (0, import_react.useState)(null);
	const [newSubjectName, setNewSubjectName] = (0, import_react.useState)("");
	const [newSubjectCode, setNewSubjectCode] = (0, import_react.useState)("");
	const [showAddModal, setShowAddModal] = (0, import_react.useState)(false);
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const isPecEmail = Boolean(userEmail && userEmail.toLowerCase().endsWith("@pec.edu.in"));
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				setUserEmail(user.email);
				setUserName(user.displayName);
				setUserId(user.uid);
				if (Boolean(user.email && user.email.toLowerCase().endsWith("@pec.edu.in"))) {
					const sec = getSectionFromRollNo(parsePecEmail(user.email, user.displayName).rollNo);
					setSection(sec);
					if (sec) {
						const tt = getTimetableForSection(sec);
						setTimetable(tt);
					}
				} else {
					const manualSec = localStorage.getItem("campus_connect_manual_section");
					if (manualSec) {
						setSection(manualSec);
						const tt = getTimetableForSection(manualSec);
						setTimetable(tt);
					} else {
						setSection(null);
						setTimetable(null);
					}
				}
			}
		});
	}, []);
	const handleSelectSection = (chosenSec) => {
		if (!chosenSec) {
			setSection(null);
			setTimetable(null);
			localStorage.removeItem("campus_connect_manual_section");
			const onlyCustom = subjects.filter((s) => s.isCustom);
			updateSubjectsState(onlyCustom);
			return;
		}
		setSection(chosenSec);
		localStorage.setItem("campus_connect_manual_section", chosenSec);
		const tt = getTimetableForSection(chosenSec);
		setTimetable(tt);
		if (tt) {
			const merged = mergeTimetableWithSaved(extractSubjectsFromTimetable(tt), subjects);
			updateSubjectsState(merged);
		}
	};
	(0, import_react.useEffect)(() => {
		async function loadAttendanceData() {
			setIsSyncing(true);
			let saved = loadLocalAttendance();
			if (userId) {
				const remote = await fetchSupabaseAttendance(userId);
				if (remote && remote.length > 0) {
					saved = remote;
					saveLocalAttendance(remote);
				}
			}
			let timetableSubjects = [];
			if (timetable) timetableSubjects = extractSubjectsFromTimetable(timetable);
			const merged = mergeTimetableWithSaved(timetableSubjects, saved);
			setSubjects(merged);
			setIsSyncing(false);
		}
		loadAttendanceData();
	}, [timetable, userId]);
	const updateSubjectsState = (updated) => {
		setSubjects(updated);
		saveLocalAttendance(updated);
		if (userId) syncSupabaseAttendance(userId, updated);
	};
	const [dailyLogs, setDailyLogs] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return {};
		try {
			const saved = localStorage.getItem("campus_connect_daily_logs_v1");
			return saved ? JSON.parse(saved) : {};
		} catch (_) {
			return {};
		}
	});
	const saveDailyLogs = (logs) => {
		setDailyLogs(logs);
		try {
			localStorage.setItem("campus_connect_daily_logs_v1", JSON.stringify(logs));
		} catch (_) {}
	};
	const handleMarkDailySlot = (slotKey, code, newStatus) => {
		const prevStatus = dailyLogs[slotKey];
		if (prevStatus === newStatus) return;
		const updatedSubjects = subjects.map((sub) => {
			if (sub.code === code) {
				let attended = sub.lecturesAttended;
				let absent = sub.lecturesAbsent;
				let cancelled = sub.lecturesCancelled;
				if (prevStatus === "present" && attended > 0) attended -= 1;
				if (prevStatus === "absent" && absent > 0) absent -= 1;
				if (prevStatus === "cancelled" && cancelled > 0) cancelled -= 1;
				if (newStatus === "present") attended += 1;
				if (newStatus === "absent") absent += 1;
				if (newStatus === "cancelled") cancelled += 1;
				return {
					...sub,
					lecturesAttended: attended,
					lecturesAbsent: absent,
					lecturesCancelled: cancelled,
					lastUpdated: `Today (${newStatus})`
				};
			}
			return sub;
		});
		updateSubjectsState(updatedSubjects);
		saveDailyLogs({
			...dailyLogs,
			[slotKey]: newStatus
		});
	};
	const handleUndoDailySlot = (slotKey, code) => {
		const prevStatus = dailyLogs[slotKey];
		if (!prevStatus) return;
		const updatedSubjects = subjects.map((sub) => {
			if (sub.code === code) {
				let attended = sub.lecturesAttended;
				let absent = sub.lecturesAbsent;
				let cancelled = sub.lecturesCancelled;
				if (prevStatus === "present" && attended > 0) attended -= 1;
				if (prevStatus === "absent" && absent > 0) absent -= 1;
				if (prevStatus === "cancelled" && cancelled > 0) cancelled -= 1;
				return {
					...sub,
					lecturesAttended: attended,
					lecturesAbsent: absent,
					lecturesCancelled: cancelled
				};
			}
			return sub;
		});
		const newLogs = { ...dailyLogs };
		delete newLogs[slotKey];
		updateSubjectsState(updatedSubjects);
		saveDailyLogs(newLogs);
	};
	const handleMarkAttendance = (code, status) => {
		const updated = subjects.map((sub) => {
			if (sub.code === code) return {
				...sub,
				lecturesAttended: sub.lecturesAttended + (status === "present" ? 1 : 0),
				lecturesAbsent: sub.lecturesAbsent + (status === "absent" ? 1 : 0),
				lecturesCancelled: sub.lecturesCancelled + (status === "cancelled" ? 1 : 0),
				lastUpdated: `Just now (${status})`
			};
			return sub;
		});
		updateSubjectsState(updated);
	};
	const handleDecrement = (code, field) => {
		const updated = subjects.map((sub) => {
			if (sub.code === code) {
				if (field === "attended" && sub.lecturesAttended > 0) return {
					...sub,
					lecturesAttended: sub.lecturesAttended - 1
				};
				if (field === "absent" && sub.lecturesAbsent > 0) return {
					...sub,
					lecturesAbsent: sub.lecturesAbsent - 1
				};
				if (field === "cancelled" && sub.lecturesCancelled > 0) return {
					...sub,
					lecturesCancelled: sub.lecturesCancelled - 1
				};
			}
			return sub;
		});
		updateSubjectsState(updated);
	};
	const handleAddSubject = (e) => {
		e.preventDefault();
		if (!newSubjectName || !newSubjectCode) return;
		const newSub = {
			id: newSubjectCode.trim().toUpperCase(),
			name: newSubjectName.trim(),
			code: newSubjectCode.trim().toUpperCase(),
			lecturesAttended: 0,
			lecturesAbsent: 0,
			lecturesCancelled: 0,
			lastUpdated: "Just added",
			isCustom: true
		};
		const updated = [...subjects, newSub];
		updateSubjectsState(updated);
		setNewSubjectName("");
		setNewSubjectCode("");
		setShowAddModal(false);
	};
	const handleDeleteCustom = (code) => {
		const updated = subjects.filter((s) => s.code !== code);
		updateSubjectsState(updated);
	};
	const totalAttended = subjects.reduce((sum, s) => sum + s.lecturesAttended, 0);
	const totalAbsent = subjects.reduce((sum, s) => sum + s.lecturesAbsent, 0);
	const totalCancelled = subjects.reduce((sum, s) => sum + s.lecturesCancelled, 0);
	const totalConducted = totalAttended + totalAbsent;
	const overallPct = totalConducted > 0 ? totalAttended / totalConducted * 100 : 100;
	const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
	const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
	const todayClasses = todaySchedule ? todaySchedule.slots.filter((ts) => ts.slot && ts.slot.type !== "free" && ts.slot.type !== "lunch") : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black tracking-tight",
						children: "Attendance Tracker"
					}), section && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-bold text-primary",
						children: ["Section ", section]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: isPecEmail ? "Auto-linked to your PEC section timetable. Mark classes as Present, Absent, or Cancelled." : "Track your 75% attendance rule. Add custom courses or select your branch section."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddModal(true),
						className: "inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Course"]
					})
				})]
			}),
			!isPecEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-foreground flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
							"Personal Email (",
							userEmail || "Signed in",
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-[11px]",
						children: "Select your PEC branch section to load official semester timetable courses, or track custom subjects."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 w-full sm:w-auto shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: section || "",
						onChange: (e) => handleSelectSection(e.target.value),
						className: "w-full sm:w-auto rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground outline-none focus:border-primary shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select PEC Section"
						}), [
							{
								value: "DS1",
								label: "CSE (Data Science) — DS1"
							},
							{
								value: "DS2",
								label: "CSE (Data Science) — DS2"
							},
							{
								value: "DS3",
								label: "CSE (Data Science) — DS3"
							},
							{
								value: "CSE-1",
								label: "CSE Core — Group 1 (CSE-1)"
							},
							{
								value: "CSE-2",
								label: "CSE Core — Group 1 (CSE-2)"
							},
							{
								value: "CSE-3",
								label: "CSE Core — Group 1 (CSE-3)"
							},
							{
								value: "CSE-4",
								label: "CSE Core — Group 2 (CSE-4)"
							},
							{
								value: "CSE-5",
								label: "CSE Core — Group 2 (CSE-5)"
							},
							{
								value: "CSE-6",
								label: "CSE Core — Group 2 (CSE-6)"
							},
							{
								value: "AI-1",
								label: "CSE (AI) — Group 1 (AI-1)"
							},
							{
								value: "AI-2",
								label: "CSE (AI) — Group 2 (AI-2)"
							},
							{
								value: "ECE-G1",
								label: "ECE — Group 1 (LSG1)"
							},
							{
								value: "ECE-G2",
								label: "ECE — Group 2 (LSG1)"
							},
							{
								value: "ECE-G3",
								label: "ECE — Group 3 (LSG1)"
							},
							{
								value: "ECE-G4",
								label: "ECE — Group 4 (LSG2)"
							},
							{
								value: "ECE-G5",
								label: "ECE — Group 5 (LSG2)"
							},
							{
								value: "ECE-G6",
								label: "ECE — Group 6 (LSG2)"
							},
							{
								value: "CIVIL-C1",
								label: "Civil Engineering — C1"
							},
							{
								value: "CIVIL-C2",
								label: "Civil Engineering — C2"
							},
							{
								value: "CIVIL-C3",
								label: "Civil Engineering — C3"
							},
							{
								value: "CIVIL-C4",
								label: "Civil Engineering — C4"
							},
							{
								value: "CIVIL-C5",
								label: "Civil Engineering — C5"
							},
							{
								value: "CIVIL-C6",
								label: "Civil Engineering — C6"
							}
						].map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: sec.value,
							children: sec.label
						}, sec.value))]
					})
				})]
			}),
			subjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border/80 glass p-8 sm:p-12 text-center space-y-4 animate-fade-up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md mx-auto space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground",
							children: "No Courses Tracked Yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: isPecEmail ? "No timetable subjects detected for your section yet. Click Add Course to manually track custom electives and labs." : `You are signed in with a personal email. Select your branch section above to auto-load official courses, or click Add Course below.`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-center gap-3 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setShowAddModal(true),
							className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm glow-primary hover:opacity-90 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add Custom Course"]
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-3xl border border-border glass p-6 md:p-8 animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 md:grid md:grid-cols-12 md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-8 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5" }), " Semester Summary"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-4xl font-black tracking-tight",
										children: [overallPct.toFixed(1), "%"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1 text-xs font-bold ${overallPct >= 75 ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`,
										children: overallPct >= 75 ? "Safe Zone (Above 75%)" : "Danger Zone (Below 75%)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: [
										"Attended ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: totalAttended
										}),
										" out of",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: totalConducted
										}),
										" conducted lectures.",
										totalCancelled > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											" ",
											"(",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-amber-400",
												children: totalCancelled
											}),
											" classes cancelled by faculty — not counted in penalty)."
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-4 pt-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Present: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: totalAttended
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-rose-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Absent: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: totalAbsent
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 rounded-xl bg-surface-elevated px-3 py-2 border border-border/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Cancelled: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: totalCancelled
											})] })]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-4 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-32 w-32 shrink-0 flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "-rotate-90 h-full w-full",
									viewBox: "0 0 100 100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "50",
										r: "40",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "8",
										className: "text-surface-elevated"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "50",
										r: "40",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "8",
										strokeDasharray: 2 * Math.PI * 40,
										strokeDashoffset: 2 * Math.PI * 40 * (1 - overallPct / 100),
										className: overallPct >= 75 ? "text-primary" : "text-rose-400",
										strokeLinecap: "round"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xl font-black",
										children: [overallPct.toFixed(0), "%"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[9px] uppercase tracking-wider text-muted-foreground",
										children: "Target 75%"
									})]
								})]
							})
						})]
					})]
				}),
				todayClasses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary" }), " Today's Scheduled Classes"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: "1-click per class slot today"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: todayClasses.map((ts, idx) => {
							const slot = ts.slot;
							const code = slot.code || slot.subject;
							const slotKey = `${todayStr}_${code}_${ts.start}`;
							const markedStatus = dailyLogs[slotKey];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `group relative rounded-2xl border glass p-4 transition duration-300 ${markedStatus ? "border-primary/40 bg-primary/5" : "border-border/80 hover:border-primary/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-mono font-semibold text-primary",
											children: [
												ts.start,
												" – ",
												ts.end
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-sm text-foreground mt-0.5",
											children: slot.subject
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-mono",
											children: code
										})
									] }), slot.type === "lab" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[9px] font-semibold text-violet-400",
										children: "Lab"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 pt-2 border-t border-border/50",
									children: markedStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold ${markedStatus === "present" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : markedStatus === "absent" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : "bg-amber-500/10 border border-amber-500/20 text-amber-400"}`,
											children: [
												markedStatus === "present" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }),
												markedStatus === "absent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }),
												markedStatus === "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "capitalize",
													children: ["Marked ", markedStatus]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleUndoDailySlot(slotKey, code),
											className: "text-[11px] text-muted-foreground hover:text-foreground transition underline font-medium",
											children: "Change"
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkDailySlot(slotKey, code, "present"),
												className: "flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20",
												title: "Mark Present for Today's Class",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Present"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkDailySlot(slotKey, code, "absent"),
												className: "flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-rose-500/10 border border-rose-500/20 py-1.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20",
												title: "Mark Absent for Today's Class",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " Absent"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkDailySlot(slotKey, code, "cancelled"),
												className: "flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-amber-500/10 border border-amber-500/20 py-1.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-500/20",
												title: "Class Cancelled by Faculty Today",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }), " Cancelled"]
											})
										]
									})
								})]
							}, idx);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4 animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-primary" }), " Course Attendance Breakdown"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								subjects.length,
								" Course",
								subjects.length === 1 ? "" : "s",
								" Tracked"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: subjects.map((sub) => {
							const stats = calculateSubjectStats(sub);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "group relative rounded-2xl border border-border/80 glass p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs font-bold text-primary",
													children: sub.code
												}), sub.isCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-surface-elevated px-2 py-0.5 text-[9px] font-medium text-muted-foreground",
													children: "Custom"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-0.5 truncate text-base font-bold text-foreground",
												children: sub.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-xl font-black ${stats.conducted === 0 ? "text-muted-foreground" : stats.percentage >= 75 ? "text-emerald-400" : "text-rose-400"}`,
												children: stats.conducted > 0 ? `${stats.percentage.toFixed(0)}%` : "N/A"
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2 w-full overflow-hidden rounded-full bg-surface-elevated",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full transition-all duration-500 ${stats.percentage >= 75 ? "bg-primary" : "bg-rose-500"}`,
												style: { width: `${Math.min(100, Math.max(0, stats.percentage))}%` }
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											"Attended: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: sub.lecturesAttended
											}),
											" /",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: stats.conducted
											})
										] }), sub.lecturesCancelled > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-amber-400 font-semibold",
											children: [sub.lecturesCancelled, " Cancelled"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-3 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${stats.conducted === 0 ? "bg-surface-elevated text-muted-foreground" : stats.percentage >= 75 ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border border-rose-500/20 text-rose-400"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [stats.isDanger ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0" }), stats.adviceMsg]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-2 pt-2 border-t border-border/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkAttendance(sub.code, "present"),
												className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 py-2 text-xs font-bold text-emerald-400 transition hover:bg-emerald-500/20",
												title: "Add Attended Class (+1 Present)",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Present"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkAttendance(sub.code, "absent"),
												className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 py-2 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20",
												title: "Add Bunked/Missed Class (+1 Absent)",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " Absent"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleMarkAttendance(sub.code, "cancelled"),
												className: "flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 py-2 text-xs font-bold text-amber-400 transition hover:bg-amber-500/20",
												title: "Class Cancelled by Teacher/College (Doesn't affect attendance %)",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-3.5 w-3.5" }), " Cancelled"]
											})
										]
									}),
									(sub.lecturesAttended > 0 || sub.lecturesAbsent > 0 || sub.lecturesCancelled > 0 || sub.isCustom) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between text-[10px] text-muted-foreground pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [
												sub.lecturesAttended > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDecrement(sub.code, "attended"),
													className: "hover:text-rose-400 transition underline",
													children: "-1 Present"
												}),
												sub.lecturesAbsent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDecrement(sub.code, "absent"),
													className: "hover:text-emerald-400 transition underline",
													children: "-1 Absent"
												}),
												sub.lecturesCancelled > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDecrement(sub.code, "cancelled"),
													className: "hover:text-amber-400 transition underline",
													children: "-1 Cancelled"
												})
											]
										}), sub.isCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleDeleteCustom(sub.code),
											className: "text-rose-400 hover:underline flex items-center gap-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remove"]
										})]
									})
								]
							}, sub.code);
						})
					})]
				})
			] }),
			showAddModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-md rounded-3xl glass-strong border border-border/80 p-6 shadow-2xl animate-scale-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowAddModal(false),
							className: "absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border/50 bg-surface/60 text-muted-foreground transition hover:bg-surface hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-foreground",
							children: "Add Custom Course"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Add extra electives, minor courses, or lab subjects not listed in your section timetable."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleAddSubject,
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Course Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. Deep Learning Elective",
									value: newSubjectName,
									onChange: (e) => setNewSubjectName(e.target.value),
									className: "mt-1 w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Course Code"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. CSN3005",
									value: newSubjectCode,
									onChange: (e) => setNewSubjectCode(e.target.value),
									className: "mt-1 w-full rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowAddModal(false),
										className: "flex-1 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-elevated",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",
										children: "Add Course"
									})]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AttendanceTracker as component };
