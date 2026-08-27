import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as parsePecEmail } from "./pec-email-B1YgkvDT.mjs";
import { Et as Clock, Ht as BookOpen, J as MapPin, Lt as CalendarDays, Ut as BookMarked, jt as ChevronRight, lt as GraduationCap, mt as FlaskConical, p as TriangleAlert, u as User } from "../_libs/lucide-react.mjs";
import { i as getTodaySchedule, n as getSectionFromRollNo, r as getTimetableForSection, t as getNextClass } from "./pec-timetable-C8LUof1w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/timetable-BwBVgZtu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAYS = [
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI"
];
var DAY_LABELS = {
	MON: "Monday",
	TUE: "Tuesday",
	WED: "Wednesday",
	THU: "Thursday",
	FRI: "Friday"
};
function slotColors(type) {
	switch (type) {
		case "lecture": return "bg-primary/10 border-primary/30 text-primary font-medium";
		case "lab": return "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-400 font-medium";
		case "tutorial": return "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 font-medium";
		case "lunch": return "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-medium";
		default: return "bg-transparent border-transparent text-muted-foreground/40";
	}
}
function SlotIcon({ type }) {
	switch (type) {
		case "lab": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-3.5 w-3.5 shrink-0" });
		case "tutorial": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookMarked, { className: "h-3.5 w-3.5 shrink-0" });
		case "lunch": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base leading-none",
			children: "🍽️"
		});
		case "lecture": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5 shrink-0" });
		default: return null;
	}
}
function formatTime(t) {
	const [h, m] = t.split(":").map(Number);
	const suffix = h < 12 ? "AM" : "PM";
	return `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${m.toString().padStart(2, "0")} ${suffix}`;
}
function SlotCard({ ts, isNow }) {
	const slot = ts.slot;
	if (!slot) return null;
	if (slot.type === "free") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 py-1 pl-4 opacity-30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-24 shrink-0 text-right text-[10px] font-mono text-muted-foreground",
			children: formatTime(ts.start)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 border-t border-dashed border-border" })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative flex items-start gap-3 rounded-xl border px-4 py-3 transition ${slotColors(slot.type)} ${isNow ? "ring-2 ring-primary/60 shadow-lg shadow-primary/10" : ""}`,
		children: [
			isNow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-2 right-3 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground animate-pulse",
				children: "Now"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-16 shrink-0 pt-0.5 sm:w-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-mono leading-tight",
					children: formatTime(ts.start)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-mono text-muted-foreground leading-tight",
					children: formatTime(ts.end)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotIcon, { type: slot.type }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold leading-tight",
							children: slot.subject
						}),
						slot.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 rounded bg-black/20 px-1.5 py-0.5 text-[9px] font-mono opacity-70",
							children: slot.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${slotColors(slot.type)}`,
							children: slot.type
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1.5 flex flex-wrap items-center gap-3 text-[11px] opacity-80",
					children: [
						slot.room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), slot.room]
						}),
						slot.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), slot.faculty]
						}),
						slot.groups && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3 w-3" }), slot.groups]
						})
					]
				})]
			})
		]
	});
}
function TodayHero({ todaySchedule, section }) {
	const nextInfo = todaySchedule ? getNextClass(todaySchedule) : null;
	const dayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	][(/* @__PURE__ */ new Date()).getDay()];
	const isWeekend = (/* @__PURE__ */ new Date()).getDay() === 0 || (/* @__PURE__ */ new Date()).getDay() === 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 animate-fade-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 right-0 opacity-5 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-28 w-28" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-mono text-muted-foreground",
							children: dayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-primary/20 border border-primary/30 px-2.5 py-0.5 text-[10px] font-bold text-primary",
							children: ["Section ", section]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: "Today's Schedule"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/timetable",
						className: "flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-primary/20",
						children: ["Full Week ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
					})]
				}), isWeekend ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "It's the weekend — enjoy your break! 🎉"
				}) : !todaySchedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No schedule data available for today."
				}) : !nextInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "All classes for today are done. 🎓"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start gap-4 rounded-xl border border-primary/20 bg-surface-elevated p-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${slotColors(nextInfo.slot.slot.type)}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotIcon, { type: nextInfo.slot.slot.type })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${nextInfo.status === "ongoing" ? "bg-emerald-500 text-white animate-pulse" : "bg-primary/20 text-primary"}`,
									children: nextInfo.status === "ongoing" ? "🔴 Live" : "Up Next"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-bold text-foreground",
								children: nextInfo.slot.slot.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap gap-3 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
											formatTime(nextInfo.slot.start),
											" – ",
											formatTime(nextInfo.slot.end)
										]
									}),
									nextInfo.slot.slot.room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), nextInfo.slot.slot.room]
									}),
									nextInfo.slot.slot.faculty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3" }), nextInfo.slot.slot.faculty]
									})
								]
							})
						]
					})]
				})]
			})
		]
	});
}
function TimetablePage() {
	const [email, setEmail] = (0, import_react.useState)(null);
	const [displayName, setDisplayName] = (0, import_react.useState)(null);
	const todayDayIndex = (/* @__PURE__ */ new Date()).getDay();
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(todayDayIndex >= 1 && todayDayIndex <= 5 ? DAYS[todayDayIndex - 1] : "MON");
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((u) => {
			setEmail(u?.email ?? null);
			setDisplayName(u?.displayName ?? null);
		});
	}, []);
	const profile = parsePecEmail(email, displayName);
	const section = getSectionFromRollNo(profile.rollNo);
	const timetable = section ? getTimetableForSection(section) : null;
	const todaySchedule = timetable ? getTodaySchedule(timetable) : null;
	const selectedSchedule = timetable?.schedule.find((d) => d.day === selectedDay) ?? null;
	const now = /* @__PURE__ */ new Date();
	const nowMins = now.getHours() * 60 + now.getMinutes();
	const isTodaySelected = selectedDay === DAYS[(todayDayIndex === 0 ? 7 : todayDayIndex) - 1];
	function isSlotNow(ts) {
		if (!isTodaySelected) return false;
		const [sh, sm] = ts.start.split(":").map(Number);
		const [eh, em] = ts.end.split(":").map(Number);
		return nowMins >= sh * 60 + sm && nowMins < eh * 60 + em;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-6 p-6 pb-24 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app",
							className: "hover:text-foreground transition",
							children: "Dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-semibold",
							children: "Timetable"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-2xl font-bold tracking-tight",
					children: "My Timetable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: timetable ? `${timetable.branch} · ${timetable.semester} · ${timetable.period}` : "B.Tech · 3rd Sem · Jul–Dec 2026"
				}),
				(section?.startsWith("ECE") || section?.startsWith("CSE") || section?.startsWith("AI")) && timetable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[11px] font-semibold text-cyan-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3 w-3" }),
							" Group ",
							section.replace("ECE-", "").replace("CSE-", "CSE ").replace("AI-", "AI ")
						]
					}), timetable.labSubgroup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-[11px] font-semibold text-violet-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-3 w-3" }),
							" Lab Subgroup: ",
							timetable.labSubgroup
						]
					})]
				})
			]
		}), !section ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto h-8 w-8 text-amber-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-bold text-foreground",
					children: "Section could not be determined"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Your roll number (",
						profile.rollNo,
						") doesn't match any known section. Please update your roll number in your profile."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-xl border border-border bg-surface/50 p-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "CSE:"
						}),
						" 25101001–25101999 \xA0|\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "AI:"
						}),
						" 25106501–25106599 \xA0|\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "DS:"
						}),
						" 25106001–25106064 \xA0|\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-foreground",
							children: "ECE:"
						}),
						" 25105001–25105999"
					]
				})
			]
		}) : !timetable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border bg-surface/50 p-8 text-center animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mx-auto h-10 w-10 text-muted-foreground/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex items-center justify-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary",
						children: ["Section ", section]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-bold text-foreground",
					children: "Timetable Not Yet Uploaded"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"The schedule for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: section }),
						" hasn't been added yet. Check back soon — your coordinator will upload it."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-border bg-surface/50 p-3 text-xs text-muted-foreground",
					children: ["Available: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "CSE 1–6, AI 1–2, DS 1–4, ECE G1–G6"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayHero, {
				todaySchedule,
				section
			}),
			timetable.approximate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[11px] text-amber-300 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This schedule was extracted from the dept timetable image (w.e.f. 27/07/26). Individual lab slots rotate between groups — verify exact slot with your group coordinator." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-4 w-4 text-violet-400" }), " Weekly Lab Summary"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: timetable.schedule.flatMap((d) => d.slots.filter((ts) => ts.slot?.type === "lab").map((ts) => ({
						day: d.day,
						ts
					}))).map(({ day, ts }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedDay(day),
						className: "rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-left transition hover:bg-violet-500/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[10px] font-bold text-violet-400 uppercase",
								children: day
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs font-semibold text-foreground leading-snug",
								children: ts.slot.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-[10px] text-muted-foreground",
								children: [
									formatTime(ts.start),
									" · ",
									ts.slot.room
								]
							})
						]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex gap-1.5 overflow-x-auto pb-1",
					children: DAYS.map((d) => {
						const isToday = d === DAYS[(todayDayIndex === 0 ? 7 : todayDayIndex) - 1];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedDay(d),
							className: `flex shrink-0 flex-col items-center rounded-xl border px-4 py-2 text-xs font-semibold transition ${selectedDay === d ? "border-primary bg-primary text-primary-foreground shadow-sm" : isToday ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] uppercase tracking-wider opacity-70",
									children: d
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: DAY_LABELS[d].slice(0, 3)
								}),
								isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 h-1 w-1 rounded-full bg-current opacity-60" })
							]
						}, d);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: selectedSchedule?.slots.map((ts, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotCard, {
						ts,
						isNow: isSlotNow(ts)
					}, i)) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "No schedule for this day."
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4 rounded-xl border border-border/50 bg-surface/30 px-4 py-3 text-[11px] text-muted-foreground animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-foreground",
					children: "Legend:"
				}), [
					"lecture",
					"lab",
					"tutorial",
					"lunch"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${slotColors(t)}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotIcon, { type: t }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: t
					})]
				}, t))]
			})
		] })]
	});
}
//#endregion
export { TimetablePage as component };
