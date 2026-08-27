import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Et as Clock, F as Play, Ht as BookOpen, It as Calendar, Q as LockOpen, Z as Lock, j as RotateCcw, kt as CircleCheckBig, l as Users, wt as Coffee, z as Pause } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-CSScsOZO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIME_SLOTS = [
	"8:00",
	"9:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00",
	"18:00",
	"19:00",
	"20:00"
];
var ROOMS = [
	{
		id: 1,
		name: "Study Hall A",
		capacity: 20,
		occupied: 14,
		floor: "Ground Floor",
		features: [
			"Wi-Fi",
			"Whiteboard",
			"AC",
			"Projector"
		],
		isBooked: false,
		bookings: [
			"9:00",
			"10:00",
			"14:00",
			"15:00"
		]
	},
	{
		id: 2,
		name: "Quiet Zone B",
		capacity: 12,
		occupied: 12,
		floor: "1st Floor",
		features: [
			"Wi-Fi",
			"AC",
			"No Phone"
		],
		isBooked: true,
		bookings: [
			"8:00",
			"9:00",
			"10:00",
			"11:00",
			"12:00",
			"13:00"
		]
	},
	{
		id: 3,
		name: "Group Room C",
		capacity: 8,
		occupied: 3,
		floor: "1st Floor",
		features: [
			"Wi-Fi",
			"Whiteboard",
			"TV Screen"
		],
		isBooked: false,
		bookings: ["11:00", "12:00"]
	},
	{
		id: 4,
		name: "Discussion Pod D",
		capacity: 6,
		occupied: 0,
		floor: "2nd Floor",
		features: ["Wi-Fi", "Soundproof"],
		isBooked: false,
		bookings: []
	},
	{
		id: 5,
		name: "Library Annex E",
		capacity: 30,
		occupied: 21,
		floor: "2nd Floor",
		features: [
			"Wi-Fi",
			"Whiteboard",
			"AC",
			"Books"
		],
		isBooked: false,
		bookings: [
			"10:00",
			"11:00",
			"12:00",
			"16:00",
			"17:00"
		]
	},
	{
		id: 6,
		name: "Tech Lab F",
		capacity: 25,
		occupied: 18,
		floor: "Ground Floor",
		features: [
			"Wi-Fi",
			"Computers",
			"AC",
			"Whiteboard"
		],
		isBooked: false,
		bookings: [
			"13:00",
			"14:00",
			"15:00",
			"16:00"
		]
	}
];
var ACTIVE_USERS = [
	{
		name: "Priya S.",
		avatar: "PS",
		color: "bg-fuchsia-500",
		subject: "Algorithms",
		time: "2h 14m"
	},
	{
		name: "Aisha R.",
		avatar: "AR",
		color: "bg-emerald-500",
		subject: "DBMS",
		time: "45m"
	},
	{
		name: "Marcus K.",
		avatar: "MK",
		color: "bg-cyan-500",
		subject: "Maths III",
		time: "1h 30m"
	},
	{
		name: "Leo T.",
		avatar: "LT",
		color: "bg-amber-500",
		subject: "OS Concepts",
		time: "3h 02m"
	}
];
function StudyRooms() {
	const [selectedRoom, setSelectedRoom] = (0, import_react.useState)(null);
	const [bookingSlot, setBookingSlot] = (0, import_react.useState)(null);
	const [bookedRooms, setBookedRooms] = (0, import_react.useState)([2]);
	const [showBookingModal, setShowBookingModal] = (0, import_react.useState)(false);
	const [pomMode, setPomMode] = (0, import_react.useState)("focus");
	const [pomRunning, setPomRunning] = (0, import_react.useState)(false);
	const [pomSeconds, setPomSeconds] = (0, import_react.useState)(1500);
	const timerRef = (0, import_react.useRef)(null);
	const POM_DURATIONS = {
		focus: 1500,
		short: 300,
		long: 900
	};
	(0, import_react.useEffect)(() => {
		if (pomRunning) timerRef.current = setInterval(() => {
			setPomSeconds((s) => {
				if (s <= 1) {
					clearInterval(timerRef.current);
					setPomRunning(false);
					return 0;
				}
				return s - 1;
			});
		}, 1e3);
		else if (timerRef.current) clearInterval(timerRef.current);
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [pomRunning]);
	const resetTimer = () => {
		setPomRunning(false);
		setPomSeconds(POM_DURATIONS[pomMode]);
	};
	const switchMode = (mode) => {
		setPomMode(mode);
		setPomRunning(false);
		setPomSeconds(POM_DURATIONS[mode]);
	};
	const mins = String(Math.floor(pomSeconds / 60)).padStart(2, "0");
	const secs = String(pomSeconds % 60).padStart(2, "0");
	const progress = 1 - pomSeconds / POM_DURATIONS[pomMode];
	const circumference = 2 * Math.PI * 54;
	const bookRoom = (roomId) => {
		setBookedRooms((prev) => [...prev, roomId]);
		setShowBookingModal(false);
		setSelectedRoom(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Study Rooms"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Book a room, focus with a Pomodoro timer, and study smarter"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 lg:col-span-2 order-2 lg:order-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-xs text-muted-foreground animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500" }), " Available"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-500" }), " Almost Full"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-rose-500" }), " Full"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-primary" }), " Your Booking"]
							})
						]
					}), ROOMS.map((room, i) => {
						const isMyBooking = bookedRooms.includes(room.id);
						const pct = room.occupied / room.capacity;
						const statusColor = isMyBooking ? "bg-primary/20 border-primary/40" : pct >= 1 ? "bg-rose-500/10 border-rose-500/30" : pct > .7 ? "bg-amber-500/10 border-amber-500/30" : "border-border";
						const dotColor = isMyBooking ? "bg-primary" : pct >= 1 ? "bg-rose-500" : pct > .7 ? "bg-amber-500" : "bg-emerald-500";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: `room-${room.id}`,
							className: `rounded-2xl border glass p-5 animate-fade-up card-hover ${statusColor}`,
							style: { animationDelay: `${i * 50}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${dotColor}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold",
												children: room.name
											}),
											isMyBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary",
												children: "Your Booking"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
											room.floor,
											" \xA0·\xA0",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
											room.occupied,
											"/",
											room.capacity,
											" people"
										]
									})] }), !isMyBooking && pct < 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										id: `book-room-${room.id}`,
										onClick: () => {
											setSelectedRoom(room);
											setShowBookingModal(true);
										},
										className: "rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition btn-press",
										children: "Book Room"
									}) : isMyBooking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-1.5 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }), " Booked"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-xl bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-400",
										children: "Full"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-elevated",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-full rounded-full transition-all ${isMyBooking ? "bg-primary" : pct >= 1 ? "bg-rose-500" : pct > .7 ? "bg-amber-500" : "bg-emerald-500"}`,
											style: { width: `${room.occupied / room.capacity * 100}%` }
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: room.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] text-muted-foreground",
										children: f
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1",
									children: TIME_SLOTS.slice(0, 8).map((slot) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded px-1.5 py-0.5 font-mono text-[9px] ${room.bookings.includes(slot) ? "bg-rose-500/20 text-rose-400" : "bg-surface text-muted-foreground"}`,
											children: slot
										}, slot);
									})
								})
							]
						}, room.id);
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 order-1 lg:order-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass-strong neon-border p-5 text-center animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "mb-4 flex items-center justify-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Focus Timer"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-5 flex rounded-xl border border-border bg-surface p-1",
								children: [
									"focus",
									"short",
									"long"
								].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									id: `pom-mode-${mode}`,
									onClick: () => switchMode(mode),
									className: `flex-1 rounded-lg py-1.5 text-[11px] font-medium capitalize transition ${pomMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
									children: mode === "focus" ? "Focus" : mode === "short" ? "Short" : "Long"
								}, mode))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto mb-5 grid h-36 w-36 place-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "-rotate-90 absolute inset-0",
									viewBox: "0 0 120 120",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "60",
										cy: "60",
										r: "54",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "8",
										className: "text-surface-elevated"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "60",
										cy: "60",
										r: "54",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "8",
										strokeDasharray: circumference,
										strokeDashoffset: circumference * (1 - progress),
										className: "text-primary transition-all duration-1000",
										strokeLinecap: "round"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-3xl font-bold font-mono tabular-nums",
									children: [
										mins,
										":",
										secs
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-[10px] capitalize text-muted-foreground",
									children: [pomMode, " session"]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										id: "pom-reset-btn",
										onClick: resetTimer,
										className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										id: "pom-toggle-btn",
										onClick: () => setPomRunning((r) => !r),
										className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition hover:opacity-90 glow-primary",
										children: pomRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5 translate-x-0.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										id: "pom-coffee-btn",
										onClick: () => switchMode("short"),
										className: "grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition hover:text-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-4 w-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[10px] text-muted-foreground",
								children: pomMode === "focus" ? "25 min deep focus" : pomMode === "short" ? "5 min short break" : "15 min long break"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl glass p-5 animate-fade-up",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-4 flex items-center gap-2 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" }), " Studying Now"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: ACTIVE_USERS.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-9 w-9 shrink-0 place-items-center rounded-xl ${user.color} text-xs font-bold text-white`,
										children: user.avatar
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: user.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: user.subject
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-primary font-mono",
											children: user.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground",
											children: "active"
										})]
									})
								]
							}, user.name))
						})]
					})]
				})]
			}),
			showBookingModal && selectedRoom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl glass-strong neon-border p-6 animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "mb-1 text-lg font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-primary" }),
								" Book ",
								selectedRoom.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-5 text-sm text-muted-foreground",
							children: [
								selectedRoom.floor,
								" · ",
								selectedRoom.capacity,
								" seats"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-xs font-medium text-muted-foreground",
								children: "Select Time Slot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: TIME_SLOTS.map((slot) => {
									const taken = selectedRoom.bookings.includes(slot);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										id: `slot-${slot.replace(":", "")}`,
										disabled: taken,
										onClick: () => setBookingSlot(bookingSlot === slot ? null : slot),
										className: `rounded-lg px-3 py-1.5 font-mono text-xs transition ${taken ? "cursor-not-allowed bg-rose-500/10 text-rose-400/60" : bookingSlot === slot ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary hover:text-primary"}`,
										children: [taken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "inline h-3 w-3 mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "inline h-3 w-3 mr-1 opacity-0 group-hover:opacity-100" }), slot]
									}, slot);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-medium text-muted-foreground",
								htmlFor: "booking-purpose",
								children: "Purpose (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "booking-purpose",
								placeholder: "e.g. Group study for DS exam",
								className: "w-full rounded-xl border border-border bg-input/60 py-2.5 px-3 text-sm outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setShowBookingModal(false);
									setBookingSlot(null);
								},
								className: "flex-1 rounded-xl border border-border py-2.5 text-sm text-muted-foreground transition hover:text-foreground",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "confirm-booking-btn",
								disabled: !bookingSlot,
								onClick: () => bookRoom(selectedRoom.id),
								className: "flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition btn-press disabled:opacity-40",
								children: "Confirm Booking"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { StudyRooms as component };
