import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Paperclip, D as Send, E as Settings, Ht as BookOpen, I as Pin, L as Phone, O as Search, P as Plus, S as ShoppingBag, Wt as Bell, a as Volume2, b as Sparkles, ct as Hash, l as Users, lt as GraduationCap, o as Video, x as Smile } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CeSVmoUP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var logo_default = "/assets/logo-CXpXwYIJ.png";
var SERVERS = [
	{
		id: "cs",
		name: "CS",
		color: "from-fuchsia-500 to-violet-600"
	},
	{
		id: "math",
		name: "MA",
		color: "from-cyan-400 to-blue-600"
	},
	{
		id: "hall",
		name: "H4",
		color: "from-pink-500 to-rose-600"
	},
	{
		id: "club",
		name: "AI",
		color: "from-emerald-400 to-teal-600"
	},
	{
		id: "mkt",
		name: "MK",
		color: "from-amber-400 to-orange-600"
	}
];
var CHANNELS = {
	text: [
		{
			id: "general",
			name: "general",
			unread: 3
		},
		{
			id: "announcements",
			name: "announcements",
			unread: 0
		},
		{
			id: "assignments",
			name: "assignments-help",
			unread: 12
		},
		{
			id: "random",
			name: "random",
			unread: 0
		},
		{
			id: "internships",
			name: "internships",
			unread: 5
		}
	],
	voice: [
		{
			id: "study-1",
			name: "Study Room 1",
			users: 4
		},
		{
			id: "study-2",
			name: "Late Night Grind",
			users: 2
		},
		{
			id: "chill",
			name: "Chill Lounge",
			users: 8
		}
	]
};
var INITIAL_MSGS = [
	{
		id: "1",
		user: "Priya S.",
		color: "text-fuchsia-400",
		avatar: "PS",
		time: "10:24",
		text: "yo did anyone finish the algo pset? 😭 stuck on Q3",
		reactions: [{
			emoji: "😭",
			count: 4
		}]
	},
	{
		id: "2",
		user: "Marcus K.",
		color: "text-cyan-400",
		avatar: "MK",
		time: "10:26",
		text: "same boat. the DP transition is cursed"
	},
	{
		id: "3",
		user: "Aisha R.",
		color: "text-emerald-400",
		avatar: "AR",
		time: "10:28",
		text: "hop in Study Room 1 — im screensharing rn",
		reactions: [{
			emoji: "🔥",
			count: 6
		}, {
			emoji: "🙏",
			count: 3
		}]
	},
	{
		id: "4",
		user: "Leo T.",
		color: "text-amber-400",
		avatar: "LT",
		time: "10:31",
		text: "btw someone selling a used GPU in #marketplace, checked it, legit"
	},
	{
		id: "5",
		user: "Priya S.",
		color: "text-fuchsia-400",
		avatar: "PS",
		time: "10:33",
		text: "omw to the study room 🚀"
	}
];
var MEMBERS = [
	{
		name: "Priya S.",
		status: "online",
		role: "TA",
		color: "bg-fuchsia-500"
	},
	{
		name: "Marcus K.",
		status: "online",
		role: "Student",
		color: "bg-cyan-500"
	},
	{
		name: "Aisha R.",
		status: "online",
		role: "Mod",
		color: "bg-emerald-500"
	},
	{
		name: "Leo T.",
		status: "idle",
		role: "Student",
		color: "bg-amber-500"
	},
	{
		name: "Sana M.",
		status: "dnd",
		role: "Student",
		color: "bg-rose-500"
	},
	{
		name: "Kenji O.",
		status: "offline",
		role: "Student",
		color: "bg-slate-500"
	}
];
function ChatApp() {
	const [activeServer, setActiveServer] = (0, import_react.useState)("cs");
	const [activeChannel, setActiveChannel] = (0, import_react.useState)("general");
	const [messages, setMessages] = (0, import_react.useState)(INITIAL_MSGS);
	const [draft, setDraft] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	const send = () => {
		if (!draft.trim()) return;
		setMessages((m) => [...m, {
			id: crypto.randomUUID(),
			user: "You",
			color: "text-primary",
			avatar: "YO",
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			text: draft.trim()
		}]);
		setDraft("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen w-full overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex w-[76px] flex-col items-center gap-3 border-r border-border bg-background/60 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "grid h-12 w-12 place-items-center rounded-2xl glass transition hover:bg-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logo_default,
							alt: "Nexus",
							className: "h-7 w-7",
							width: 28,
							height: 28
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px w-8 bg-border" }),
					SERVERS.map((s) => {
						const active = s.id === activeServer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveServer(s.id),
							className: `group relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-xs font-bold text-white transition-all hover:rounded-xl ${active ? "rounded-xl shadow-lg shadow-primary/30" : "opacity-80 hover:opacity-100"}`,
							children: [s.name, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" })]
						}, s.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-12 w-12 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-64 flex-col border-r border-border bg-surface/40 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-4 py-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: "CS Department"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-5 overflow-y-auto px-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGroup, {
								label: "Text Channels",
								children: CHANNELS.text.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelBtn, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4" }),
									label: c.name,
									badge: c.unread,
									active: c.id === activeChannel,
									onClick: () => setActiveChannel(c.id)
								}, c.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGroup, {
								label: "Voice / Study",
								children: CHANNELS.voice.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelBtn, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }),
									label: c.name,
									subtle: `${c.users} in`
								}, c.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChannelGroup, {
								label: "Campus",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelBtn, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }),
										label: "marketplace",
										pill: "new"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelBtn, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4" }),
										label: "notes-share"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelBtn, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }),
										label: "events"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-t border-border bg-background/50 px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground",
									children: "YO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: "You"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-mono text-[10px] text-muted-foreground",
									children: "online · #4210"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-lg p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between border-b border-border bg-background/40 px-5 py-3 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate font-semibold",
									children: activeChannel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-xs text-muted-foreground md:inline",
									children: "| Ask questions, share memes, find study buddies"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-4 w-4" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "h-4 w-4" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderIcon, { icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative ml-2 hidden md:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										placeholder: "Search",
										className: "w-44 rounded-lg border border-border bg-surface/60 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: scrollRef,
						className: "flex-1 space-y-1 overflow-y-auto px-4 py-4 md:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto mb-6 max-w-2xl rounded-2xl glass p-5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid h-10 w-10 place-items-center rounded-xl bg-primary/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-5 w-5 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "mt-2 font-semibold",
									children: ["Welcome to #", activeChannel]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "This is the start of the channel. Say hi 👋"
								})
							]
						}), messages.map((m, i) => {
							const prev = messages[i - 1];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
								m,
								grouped: prev && prev.user === m.user
							}, m.id);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pb-4 md:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 rounded-2xl border border-border bg-surface/70 p-2 backdrop-blur transition focus-within:border-primary focus-within:shadow-[0_0_30px_-8px_var(--primary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft,
									onChange: (e) => setDraft(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									},
									rows: 1,
									placeholder: `Message #${activeChannel}`,
									className: "max-h-40 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: send,
									disabled: !draft.trim(),
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40 disabled:hover:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1.5 px-2 text-[10px] text-muted-foreground",
							children: [
								"Press ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "rounded bg-surface px-1 font-mono",
									children: "Enter"
								}),
								" to send ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "rounded bg-surface px-1 font-mono",
									children: "Shift+Enter"
								}),
								" for newline"
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-60 flex-col border-l border-border bg-surface/40 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-4 py-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold",
						children: ["Members — ", MEMBERS.length]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 space-y-4 overflow-y-auto px-2 py-3",
					children: [
						"online",
						"idle",
						"dnd",
						"offline"
					].map((s) => {
						const list = MEMBERS.filter((m) => m.status === s);
						if (!list.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground",
							children: [
								s === "dnd" ? "Do not disturb" : s,
								" — ",
								list.length
							]
						}), list.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-surface-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-8 w-8 place-items-center rounded-full ${m.color} text-[10px] font-bold text-white`,
									children: m.name.split(" ").map((n) => n[0]).join("")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: m.status })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `truncate text-sm ${s === "offline" ? "text-muted-foreground" : ""}`,
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-[10px] text-muted-foreground",
									children: m.role
								})]
							})]
						}, m.name))] }, s);
					})
				})]
			})
		]
	});
}
function StatusDot({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${status === "online" ? "bg-emerald-500" : status === "idle" ? "bg-amber-500" : status === "dnd" ? "bg-rose-500" : "bg-slate-500"}` });
}
function HeaderIcon({ icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "grid h-8 w-8 place-items-center rounded-lg transition hover:bg-surface hover:text-foreground",
		children: icon
	});
}
function ChannelGroup({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex items-center justify-between px-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "text-muted-foreground hover:text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-0.5",
		children
	})] });
}
function ChannelBtn({ icon, label, badge, subtle, active, pill, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${active ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: active ? "text-primary" : "",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1 truncate text-left",
				children: label
			}),
			pill && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-accent/20 px-1.5 py-0.5 font-mono text-[9px] uppercase text-accent",
				children: pill
			}),
			subtle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] text-muted-foreground",
				children: subtle
			}),
			!!badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground",
				children: badge
			})
		]
	});
}
function Message({ m, grouped }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group flex gap-3 rounded-lg px-2 py-1 transition hover:bg-surface/50 ${grouped ? "" : "mt-3"}`,
		children: [grouped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-10 shrink-0 pt-1 text-right font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100",
			children: m.time
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-primary-foreground`,
			children: m.avatar
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				!grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `font-semibold ${m.color}`,
						children: m.user
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground",
						children: m.time
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-foreground/95",
					children: m.text
				}),
				m.reactions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 flex flex-wrap gap-1",
					children: m.reactions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-xs transition hover:border-primary hover:bg-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.emoji }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px] text-muted-foreground",
							children: r.count
						})]
					}, r.emoji))
				})
			]
		})]
	});
}
//#endregion
export { ChatApp as component };
