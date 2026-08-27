import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Ft as Camera, Nt as Check, W as MessageSquare, Wt as Bell, b as Sparkles, l as Users, st as Heart } from "../_libs/lucide-react.mjs";
import { g as useMarkNotificationRead, h as useMarkAllNotificationsRead, x as useNotifications } from "./use-dating-api-CYSx6-cH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-2f2oUiHf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data: notificationsData, isLoading, refetch } = useNotifications(50, filter === "unread");
	const notifications = notificationsData?.notifications || [];
	const unreadCount = notificationsData?.unreadCount || 0;
	const markRead = useMarkNotificationRead();
	const markAllRead = useMarkAllNotificationsRead();
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const getNotificationIcon = (type) => {
		switch (type) {
			case "friend_request": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-blue-400" });
			case "friend_accepted": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-emerald-400" });
			case "match": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 fill-current text-rose-400" });
			case "prompt_like": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-purple-400" });
			case "photo_like": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "h-5 w-5 text-amber-400" });
			case "message": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5 text-primary" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-muted-foreground" });
		}
	};
	const getNotificationColor = (type) => {
		switch (type) {
			case "friend_request": return "bg-blue-500/10 border-blue-500/20";
			case "friend_accepted": return "bg-emerald-500/10 border-emerald-500/20";
			case "match": return "bg-rose-500/10 border-rose-500/20";
			case "prompt_like": return "bg-purple-500/10 border-purple-500/20";
			case "photo_like": return "bg-amber-500/10 border-amber-500/20";
			case "message": return "bg-primary/10 border-primary/20";
			default: return "bg-surface border-border";
		}
	};
	const handleNotificationClick = (notification) => {
		if (!notification.is_read) markRead.mutate(String(notification.id));
		switch (notification.type) {
			case "friend_request":
			case "friend_accepted":
				navigate({ to: "/app/dating/friends" });
				break;
			case "match":
				navigate({ to: "/app/dating/matches" });
				break;
			case "prompt_like":
			case "photo_like":
				if (notification.data?.likerProfileId) navigate({ to: `/app/dating/profile/${notification.data.likerProfileId}` });
				break;
			case "message":
				navigate({ to: "/app/chat" });
				break;
		}
	};
	const handleMarkAllRead = async () => {
		await markAllRead.mutateAsync();
		toast.success("All notifications marked as read");
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Stay updated with your Campus Match activity"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border glass min-h-[400px] flex flex-col items-center justify-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading notifications..."
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Stay updated with your Campus Match activity"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleMarkAllRead,
						disabled: markAllRead.isPending,
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), "Mark all read"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1 rounded-xl border border-border bg-surface p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter("all"),
					className: cn("flex-1 rounded-lg py-2 text-sm font-medium transition", filter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
					children: "All"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setFilter("unread"),
					className: cn("flex-1 rounded-lg py-2 text-sm font-medium transition", filter === "unread" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
					children: [
						"Unread",
						" ",
						unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-primary/20 text-primary-foreground text-[10px] font-bold",
							children: unreadCount
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-8 w-8 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "No notifications"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: filter === "unread" ? "You're all caught up!" : "No notifications yet. You'll see them here when you get matches, friend requests, or likes."
						})
					]
				}) : notifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationItem, {
					notification,
					icon: getNotificationIcon(notification.type),
					color: getNotificationColor(notification.type),
					onClick: () => handleNotificationClick(notification),
					onMarkRead: () => markRead.mutate(String(notification.id))
				}, notification.id))
			}),
			notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs text-muted-foreground py-4",
				children: "Pull to refresh"
			})
		]
	});
}
function NotificationItem({ notification, icon, color, onClick, onMarkRead }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onClick,
		className: cn("relative group flex items-start gap-3 rounded-xl border p-4 transition hover:shadow-lg", notification.is_read ? "opacity-70" : "ring-1 ring-primary/30", color),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium truncate",
						children: notification.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm text-muted-foreground truncate",
						children: notification.body
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-[10px] text-muted-foreground",
						children: formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })
					}), !notification.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							onMarkRead();
						},
						className: "p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition opacity-0 group-hover:opacity-100",
						"aria-label": "Mark as read",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
					})]
				})]
			}), notification.data && Object.keys(notification.data).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: JSON.stringify(notification.data)
			})]
		})]
	});
}
//#endregion
export { NotificationsPage as component };
