import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as LoaderCircle, Et as Clock, O as Search, Ot as CircleCheck, W as MessageSquare, d as UserPlus, i as X, l as Users, st as Heart } from "../_libs/lucide-react.mjs";
import { A as useSentFriendRequests, E as useRespondToFriendRequest, k as useSendFriendRequest, m as useFriends, p as useFriendRequests, w as useRemoveFriend } from "./use-dating-api-CYSx6-cH.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/friends-BSXFPuyc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "requests",
		label: "Requests",
		icon: UserPlus,
		count: 0
	},
	{
		id: "sent",
		label: "Sent",
		icon: UserPlus,
		count: 0
	},
	{
		id: "friends",
		label: "Friends",
		icon: Users,
		count: 0
	}
];
function FriendsPage() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("requests");
	const { data: requestsData, isLoading: requestsLoading, refetch: refetchRequests } = useFriendRequests();
	const { data: sentData, isLoading: sentLoading, refetch: refetchSent } = useSentFriendRequests();
	const { data: friendsData, isLoading: friendsLoading, refetch: refetchFriends } = useFriends();
	useSendFriendRequest();
	const respondRequest = useRespondToFriendRequest();
	const removeFriend = useRemoveFriend();
	const tabs = TABS.map((tab) => ({
		...tab,
		count: tab.id === "requests" ? requestsData?.length || 0 : tab.id === "sent" ? sentData?.length || 0 : friendsData?.length || 0
	}));
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({ uid: user.uid });
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	const handleAccept = async (requestId) => {
		try {
			await respondRequest.mutateAsync({
				requestId,
				action: "accept"
			});
			toast.success("Friend request accepted!");
			refetchRequests();
			refetchFriends();
		} catch {
			toast.error("Failed to accept request");
		}
	};
	const handleReject = async (requestId) => {
		try {
			await respondRequest.mutateAsync({
				requestId,
				action: "reject"
			});
			toast.success("Friend request declined");
			refetchRequests();
		} catch {
			toast.error("Failed to reject request");
		}
	};
	const handleRemoveFriend = async (friendId) => {
		try {
			await removeFriend.mutateAsync(friendId);
			toast.success("Friend removed");
			refetchFriends();
		} catch {
			toast.error("Failed to remove friend");
		}
	};
	if (requestsLoading || sentLoading || friendsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Friends"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Manage your connections"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-border glass min-h-[400px] flex flex-col items-center justify-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading friends..."
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
					children: "Friends"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Manage your connections"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/app/dating" }),
					className: "flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), "Find Friends"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-xl border border-border bg-surface p-1",
				children: tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: cn("flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition", isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4", isActive && "text-primary-foreground") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }),
							tab.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold", isActive ? "bg-primary/20 text-primary-foreground" : "bg-surface text-muted-foreground"),
								children: tab.count
							})
						]
					}, tab.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					activeTab === "requests" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !requestsData || requestsData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-8 w-8 text-blue-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "No friend requests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "When someone sends you a request, it'll appear here"
							})
						]
					}) : requestsData?.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FriendRequestCard, {
						request,
						onAccept: () => handleAccept(request.id),
						onReject: () => handleReject(request.id)
					}, request.id)) }),
					activeTab === "sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !sentData || sentData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-8 w-8 text-amber-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "No sent requests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Your sent friend requests will appear here"
							})
						]
					}) : sentData?.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SentRequestCard, { request }, request.id)) }),
					activeTab === "friends" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: !friendsData || friendsData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8 text-emerald-400" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "No friends yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Accept friend requests or send new ones to build your network"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => navigate({ to: "/app/dating" }),
								className: "mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Find Friends"]
							})
						]
					}) : friendsData?.map((friend) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FriendCard, {
						friend,
						onChat: () => navigate({ to: `/app/dating/chat/${friend.friend_id}` }),
						onRemove: () => handleRemoveFriend(String(friend.friend_id))
					}, friend.id)) })
				]
			})
		]
	});
}
function FriendRequestCard({ request, onAccept, onReject }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border glass p-4 animate-fade-up",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-xl bg-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: request.sender_emoji || "👤"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold truncate",
							children: request.sender_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: [
								request.sender_branch,
								" • ",
								request.sender_year
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: ["Sent ", formatDistanceToNow(new Date(request.created_at), { addSuffix: true })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onReject,
						className: "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400",
						"aria-label": "Decline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onAccept,
						className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90",
						"aria-label": "Accept",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
					})]
				})
			]
		})
	});
}
function SentRequestCard({ request }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border glass p-4 animate-fade-up",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-xl bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: request.receiver_emoji || "👤"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 text-amber-500-foreground" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold truncate",
							children: request.receiver_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground truncate",
							children: [
								request.receiver_branch,
								" • ",
								request.receiver_year
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-amber-400",
							children: ["Pending • Sent ", formatDistanceToNow(new Date(request.created_at), { addSuffix: true })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-400",
					children: "Pending"
				})
			]
		})
	});
}
function FriendCard({ friend, onChat, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border glass p-4 animate-fade-up transition hover:border-primary/30",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-xl bg-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl",
							children: friend.friend_emoji || "👤"
						})
					}), friend.friend_is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-2.5 w-2.5 fill-current text-primary-foreground" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold truncate",
						children: friend.friend_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground truncate",
						children: [
							friend.branch,
							" • ",
							friend.year
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onChat,
						className: "p-2 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition",
						"aria-label": "Chat",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onRemove,
						className: "p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition",
						"aria-label": "Remove friend",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			]
		})
	});
}
//#endregion
export { FriendsPage as component };
