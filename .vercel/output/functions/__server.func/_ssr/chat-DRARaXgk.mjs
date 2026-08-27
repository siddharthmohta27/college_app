import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { $ as LoaderCircle, B as Paperclip, D as Send, E as Settings, Ht as BookOpen, I as Pin, L as Phone, O as Search, P as Plus, S as ShoppingBag, Wt as Bell, a as Volume2, b as Sparkles, ct as Hash, l as Users, lt as GraduationCap, o as Video, x as Smile } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-Bz5bubvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-DRARaXgk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SERVERS = [
	{
		id: "cs",
		name: "CS",
		color: "from-primary to-yellow-500 text-primary-foreground font-black"
	},
	{
		id: "math",
		name: "MA",
		color: "bg-surface border border-border text-muted-foreground hover:text-foreground"
	},
	{
		id: "hall",
		name: "H4",
		color: "bg-surface border border-border text-muted-foreground hover:text-foreground"
	},
	{
		id: "club",
		name: "AI",
		color: "bg-surface border border-border text-muted-foreground hover:text-foreground"
	},
	{
		id: "mkt",
		name: "MK",
		color: "bg-surface border border-border text-muted-foreground hover:text-foreground"
	}
];
var CHANNELS = {
	text: [
		{
			id: "general",
			name: "general",
			unread: 0
		},
		{
			id: "announcements",
			name: "announcements",
			unread: 0
		},
		{
			id: "assignments",
			name: "assignments-help",
			unread: 0
		},
		{
			id: "random",
			name: "random",
			unread: 0
		},
		{
			id: "internships",
			name: "internships",
			unread: 0
		}
	],
	voice: [
		{
			id: "study-1",
			name: "Study Room 1",
			users: 0
		},
		{
			id: "study-2",
			name: "Late Night Grind",
			users: 0
		},
		{
			id: "chill",
			name: "Chill Lounge",
			users: 0
		}
	]
};
function ChatApp() {
	const [activeServer, setActiveServer] = (0, import_react.useState)("cs");
	const [activeChannel, setActiveChannel] = (0, import_react.useState)("general");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [members, setMembers] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [showChannelDrawer, setShowChannelDrawer] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({
				id: user.uid,
				email: user.email || "",
				displayName: user.displayName
			});
			else setCurrentUser(null);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		setLoading(true);
		setMessages([]);
		supabase.from("chat_messages").select("*").eq("channel_id", activeChannel).order("created_at", { ascending: true }).limit(50).then(({ data, error }) => {
			if (!error && data) setMessages(data.map((row) => ({
				id: row.id,
				user: row.user_name || "Student",
				avatar: row.user_avatar || "??",
				color: "text-primary",
				time: new Date(row.created_at).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				text: row.text,
				reactions: row.reactions || []
			})));
			setLoading(false);
		});
		const channel = supabase.channel(`chat_messages:${activeChannel}`).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "chat_messages",
			filter: `channel_id=eq.${activeChannel}`
		}, (payload) => {
			const row = payload.new;
			const newMsg = {
				id: row.id,
				user: row.user_name || "Student",
				avatar: row.user_avatar || "??",
				color: "text-primary",
				time: new Date(row.created_at).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}),
				text: row.text,
				reactions: row.reactions || []
			};
			setMessages((prev) => {
				const withoutTmp = prev.filter((m) => !(m.id.startsWith("tmp_") && m.text === newMsg.text && m.user === newMsg.user));
				if (withoutTmp.some((m) => m.id === newMsg.id)) return withoutTmp;
				return [...withoutTmp, newMsg];
			});
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [activeChannel]);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	const handleChannelChange = (newChannelId) => {
		if (newChannelId === activeChannel) return;
		setActiveChannel(newChannelId);
		setShowChannelDrawer(false);
	};
	const send = async () => {
		if (!draft.trim() || !currentUser || sending) return;
		const text = draft.trim();
		setDraft("");
		setSending(true);
		const displayName = currentUser.displayName || currentUser.email?.split("@")[0] || "Student";
		const avatar = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2) || "?";
		const tempId = `tmp_${Date.now()}`;
		const optimistic = {
			id: tempId,
			user: displayName,
			avatar,
			color: "text-primary",
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			text
		};
		setMessages((prev) => [...prev, optimistic]);
		const { error } = await supabase.from("chat_messages").insert({
			channel_id: activeChannel,
			user_id: currentUser.id,
			user_name: displayName,
			user_avatar: avatar,
			text
		});
		if (error) {
			console.error("Send failed:", error.message);
			setMessages((prev) => prev.filter((m) => m.id !== tempId));
		}
		setSending(false);
	};
	const handleAddReaction = async (msgId, emoji) => {
		setMessages((prev) => prev.map((m) => {
			if (m.id !== msgId) return m;
			const existing = m.reactions || [];
			const idx = existing.findIndex((r) => r.emoji === emoji);
			const updated = [...existing];
			if (idx >= 0) updated[idx] = {
				...updated[idx],
				count: updated[idx].count + 1
			};
			else updated.push({
				emoji,
				count: 1
			});
			return {
				...m,
				reactions: updated
			};
		}));
		const msg = messages.find((m) => m.id === msgId);
		if (msg && !msgId.startsWith("tmp_")) {
			const newReactions = (msg.reactions || []).map((r) => r.emoji === emoji ? {
				...r,
				count: r.count + 1
			} : r);
			if (!newReactions.some((r) => r.emoji === emoji)) newReactions.push({
				emoji,
				count: 1
			});
			await supabase.from("chat_messages").update({ reactions: newReactions }).eq("id", msgId);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100vh-57px-60px)] w-full overflow-hidden md:h-[calc(100vh-57px)]",
		children: [
			showChannelDrawer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden",
				onClick: () => setShowChannelDrawer(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden md:flex w-[52px] flex-col items-center gap-3 border-r border-border bg-background/60 py-4 md:w-[68px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-1 h-px w-8 bg-border" }),
					SERVERS.map((s) => {
						const active = s.id === activeServer;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							id: `server-${s.id}`,
							onClick: () => setActiveServer(s.id),
							className: `group relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-xs font-bold text-white transition-all hover:rounded-xl ${active ? "rounded-xl shadow-lg shadow-primary/30" : "opacity-75 hover:opacity-100"}`,
							children: [s.name, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" })]
						}, s.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "grid h-11 w-11 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition hover:border-primary hover:text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 md:left-[52px] z-50 flex w-56 flex-col border-r border-border bg-surface/95 backdrop-blur-xl transition-transform duration-300 md:static md:left-auto md:z-auto md:flex md:translate-x-0 md:bg-surface/40 ${showChannelDrawer ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border px-4 py-3",
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
									onClick: () => handleChannelChange(c.id)
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
									className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-bold text-primary-foreground",
									children: currentUser?.displayName?.split(" ").map((n) => n[0]).join("").toUpperCase() || currentUser?.email?.split("@")[0]?.substring(0, 2).toUpperCase() || "SM"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: currentUser?.displayName || currentUser?.email?.split("@")[0] || "Student"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-mono text-[10px] text-muted-foreground",
									children: "online · Campus Connect#0127"
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
						className: "flex items-center justify-between border-b border-border bg-background/40 px-3 py-3 backdrop-blur md:px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2 md:gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground md:hidden",
									onClick: () => setShowChannelDrawer(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "hidden h-5 w-5 text-muted-foreground md:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "truncate font-semibold",
									children: ["#", activeChannel]
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
										id: "chat-search",
										placeholder: "Search",
										className: "w-40 rounded-lg border border-border bg-surface/60 py-1.5 pl-8 pr-2 text-xs outline-none focus:border-primary"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: scrollRef,
						className: "flex-1 space-y-1 overflow-y-auto px-4 py-4 md:px-6",
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
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 py-8 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Loading messages..."
							})]
						}) : messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl",
								children: "💬"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: "No messages yet. Be the first to say hi!"
							})]
						}) : messages.map((m, i) => {
							const prev = messages[i - 1];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
								m,
								grouped: prev && prev.user === m.user,
								onAddReaction: handleAddReaction
							}, m.id);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-4 md:px-6",
						style: { paddingBottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-2 rounded-2xl border border-border bg-surface/70 p-2 backdrop-blur transition focus-within:border-primary focus-within:shadow-[0_0_30px_-8px_var(--primary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "chat-composer",
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
									id: "chat-send-btn",
									onClick: send,
									disabled: !draft.trim(),
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-52 flex-col border-l border-border bg-surface/40 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-semibold",
						children: ["Members — ", members.length]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 space-y-4 overflow-y-auto px-2 py-3",
					children: [
						"online",
						"idle",
						"dnd",
						"offline"
					].map((s) => {
						const list = members.filter((m) => m.status === s);
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
		className: `group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${active ? "bg-primary/15 text-foreground font-semibold" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`,
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
function Message({ m, grouped, onAddReaction }) {
	const [showReactionPicker, setShowReactionPicker] = (0, import_react.useState)(false);
	const emojis = [
		"🔥",
		"😭",
		"👍",
		"👀",
		"🙏",
		"❤️"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group flex gap-3 rounded-lg px-2 py-1 transition hover:bg-surface/50 relative ${grouped ? "" : "mt-3"}`,
		children: [
			grouped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-10 shrink-0 pt-1 text-right font-mono text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100",
				children: m.time
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
				children: m.avatar
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					!grouped && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-semibold ${m.color?.replace("bg-", "text-") || "text-foreground"}`,
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
					m.reactions && m.reactions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-1",
						children: m.reactions.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onAddReaction(m.id, r.emoji),
							className: "flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-xs transition hover:border-primary hover:bg-primary/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.emoji }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-muted-foreground",
								children: r.count
							})]
						}, r.emoji))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-2 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-0.5 rounded-lg border border-border bg-surface-elevated p-1 shadow-md z-10",
				children: [
					emojis.slice(0, 4).map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onAddReaction(m.id, emoji),
						className: "hover:bg-surface rounded p-1 transition text-xs",
						children: emoji
					}, emoji)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowReactionPicker(!showReactionPicker),
						className: "hover:bg-surface rounded p-1 transition text-[10px] font-bold text-muted-foreground px-1.5",
						children: "＋"
					}),
					showReactionPicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-0 top-8 flex gap-1 border border-border bg-surface-elevated p-1.5 rounded-lg shadow-lg z-20",
						children: emojis.map((emoji) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								onAddReaction(m.id, emoji);
								setShowReactionPicker(false);
							},
							className: "hover:bg-surface rounded p-1.5 transition text-sm",
							children: emoji
						}, emoji))
					})
				]
			})
		]
	});
}
//#endregion
export { ChatApp as component };
