import { r as __toESM } from "../_runtime.mjs";
import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as CircleAlert, C as Shield, Et as Clock, Gt as Ban, Mt as ChevronLeft, O as Search, Ot as CircleCheck, _t as Eye, b as Sparkles, ht as Flag, j as RotateCcw, l as Users, m as TrendingUp, st as Heart } from "../_libs/lucide-react.mjs";
import { a as useAdminUpdateReport, i as useAdminUnsuspendUser, n as useAdminStats, o as useAdminUsers, r as useAdminSuspendUser, s as useAdminVerifyUser, t as useAdminReports } from "./use-dating-api-CYSx6-cH.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dating-BzLnSAht.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_EMAILS = [
	"admin@college.edu",
	"admin@campus.edu",
	"siddharth@college.edu"
];
function AdminDashboard() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [activeTab, setActiveTab] = (0, import_react.useState)("stats");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [userPage, setUserPage] = (0, import_react.useState)(1);
	const [reportStatus, setReportStatus] = (0, import_react.useState)("pending");
	const { data: stats, isLoading: statsLoading } = useAdminStats();
	const { data: users = [], isLoading: usersLoading } = useAdminUsers(userPage, 50, searchQuery);
	const { data: reports = [], isLoading: reportsLoading } = useAdminReports(reportStatus);
	const suspendUser = useAdminSuspendUser();
	const unsuspendUser = useAdminUnsuspendUser();
	const verifyUser = useAdminVerifyUser();
	const updateReport = useAdminUpdateReport();
	(0, import_react.useEffect)(() => {
		return firebaseAuth.onAuthStateChanged((user) => {
			if (user) setCurrentUser({
				uid: user.uid,
				email: user.email
			});
			else {
				setCurrentUser(null);
				navigate({ to: "/login" });
			}
		});
	}, [navigate]);
	if (!(currentUser?.email && ADMIN_EMAILS.includes(currentUser.email))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-8 w-8 text-rose-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Access Denied"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "You don't have permission to access the admin dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/app/dating" }),
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), "Back to Campus Match"]
				})
			]
		})
	});
	const handleSuspend = async (profileId) => {
		const reason = prompt("Reason for suspension:");
		if (!reason) return;
		try {
			await suspendUser.mutateAsync({
				id: profileId,
				reason
			});
			toast.success("User suspended");
		} catch {
			toast.error("Failed to suspend user");
		}
	};
	const handleUnsuspend = async (profileId) => {
		if (!confirm("Unsuspend this user?")) return;
		try {
			await unsuspendUser.mutateAsync(profileId);
			toast.success("User unsuspended");
		} catch {
			toast.error("Failed to unsuspend user");
		}
	};
	const handleVerify = async (profileId) => {
		try {
			await verifyUser.mutateAsync(profileId);
			toast.success("User verified");
		} catch {
			toast.error("Failed to verify user");
		}
	};
	const handleReportUpdate = async (reportId, status) => {
		const notes = prompt("Admin notes (optional):");
		try {
			await updateReport.mutateAsync({
				id: reportId,
				status,
				adminNotes: notes || void 0
			});
			toast.success("Report updated");
		} catch {
			toast.error("Failed to update report");
		}
	};
	const getUserStatusColor = (isIncognito, isVerified) => {
		if (isIncognito) return "bg-rose-500/10 text-rose-400 border-rose-500/20";
		if (isVerified) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
		return "bg-amber-500/10 text-amber-400 border-amber-500/20";
	};
	const getUserStatusLabel = (isIncognito, isVerified) => {
		if (isIncognito) return "Suspended";
		if (isVerified) return "Verified";
		return "Pending";
	};
	if (statsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Admin Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-muted-foreground",
				children: "Campus Match moderation and analytics"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-4",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border glass p-6 animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/2 skeleton rounded mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-1/3 skeleton rounded" })]
			}, i))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up flex items-start justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Admin Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Campus Match moderation and analytics"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), "Admin"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-xl border border-border bg-surface p-1",
				children: [
					{
						id: "stats",
						label: "Overview",
						icon: TrendingUp
					},
					{
						id: "users",
						label: "Users",
						icon: Users
					},
					{
						id: "reports",
						label: "Reports",
						icon: Flag
					}
				].map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${isActive ? "text-primary-foreground" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label })]
					}, tab.id);
				})
			}),
			activeTab === "stats" && stats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Profiles",
							value: stats.totalProfiles,
							icon: Users,
							color: "text-blue-400",
							bg: "bg-blue-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Matches",
							value: stats.totalMatches,
							icon: Heart,
							color: "text-rose-400",
							bg: "bg-rose-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Pending Requests",
							value: stats.pendingFriendRequests,
							icon: Clock,
							color: "text-amber-400",
							bg: "bg-amber-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Pending Reports",
							value: stats.pendingReports,
							icon: Flag,
							color: "text-red-400",
							bg: "bg-red-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Online Users",
							value: stats.onlineUsers,
							icon: TrendingUp,
							color: "text-emerald-400",
							bg: "bg-emerald-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "New Users (24h)",
							value: stats.newUsers24h,
							icon: Users,
							color: "text-purple-400",
							bg: "bg-purple-500/10"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Verified Users",
							value: stats.verifiedUsers,
							icon: CircleCheck,
							color: "text-green-400",
							bg: "bg-green-500/10"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold mb-4",
						children: "Quick Actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("users"),
								className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), "Manage Users"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("reports"),
								className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-4 w-4" }), "Review Reports"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {},
								className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), "Recalculate Compatibility"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {},
								className: "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Generate Daily Picks"]
							})
						]
					})]
				})]
			}),
			activeTab === "users" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-lg font-semibold",
						children: [
							"All Users (",
							users.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search by name or email...",
							className: "rounded-xl border border-border bg-surface px-10 py-2 text-sm outline-none focus:border-primary"
						})]
					})]
				}), usersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border glass p-4 animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 skeleton rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/4 skeleton rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 skeleton rounded" })]
							})]
						})
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border glass overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 hidden md:table-cell",
										children: "Branch / Year"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Chat"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Joined"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Actions"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-surface/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-lg",
														children: user.name?.charAt(0) || "U"
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium truncate",
														children: user.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground truncate",
														children: user.college_email
													})]
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 hidden md:table-cell",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground",
												children: [
													user.branch || "N/A",
													" / ",
													user.year || "N/A"
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getUserStatusColor(user.is_incognito, user.is_verified)}`,
												children: getUserStatusLabel(user.is_incognito, user.is_verified)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.chat_status === "online" ? "bg-emerald-500/10 text-emerald-400" : "bg-surface text-muted-foreground border border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${user.chat_status === "online" ? "bg-emerald-400" : "bg-muted-foreground/50"}` }), user.chat_status || "offline"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: user.created_at ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true }) : "Unknown"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-end gap-2",
												children: [!user.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleVerify(user.id.toString()),
													className: "p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition",
													title: "Verify user",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
												}), user.is_incognito ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleUnsuspend(user.id.toString()),
													className: "p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition",
													title: "Unsuspend user",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleSuspend(user.id.toString()),
													className: "p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition",
													title: "Suspend user",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4" })
												})]
											})
										})
									]
								}, user.id))
							})]
						})
					}), users.length === 50 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-t border-border flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setUserPage((p) => p - 1),
								disabled: userPage === 1,
								className: "p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-surface-elevated disabled:opacity-50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: ["Page ", userPage]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setUserPage((p) => p + 1),
								className: "p-2 rounded-lg border border-border bg-surface text-muted-foreground hover:bg-surface-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4 rotate-180" })
							})
						]
					})]
				})]
			}),
			activeTab === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-lg font-semibold",
						children: [
							"Reports (",
							reports.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 rounded-xl border border-border bg-surface p-1",
						children: [
							"pending",
							"reviewed",
							"dismissed",
							"action_taken"
						].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setReportStatus(status),
							className: `rounded-lg py-1.5 px-3 text-xs font-medium transition ${reportStatus === status ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")
						}, status))
					})]
				}), reportsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border glass p-4 animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 skeleton rounded-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/4 skeleton rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 skeleton rounded" })]
							})]
						})
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border glass p-12 text-center animate-fade-up",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-8 w-8 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: "No reports"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "All clear!"
							})
						]
					}) : reports.map((report) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportCard, {
						report,
						onUpdateStatus: (status) => handleReportUpdate(report.id.toString(), status),
						currentStatus: report.status
					}, report.id))
				})]
			})
		]
	});
}
function StatCard({ label, value, icon: Icon, color, bg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border glass p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-3xl font-bold",
				children: value.toLocaleString()
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex h-14 w-14 items-center justify-center rounded-xl ${bg}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-7 w-7 ${color}` })
			})]
		})
	});
}
function ReportCard({ report, onUpdateStatus, currentStatus }) {
	const getReasonLabel = (reason) => {
		return {
			fake_profile: "Fake Profile",
			inappropriate_photos: "Inappropriate Photos",
			harassment: "Harassment",
			spam: "Spam",
			underage: "Underage",
			other: "Other"
		}[reason] || reason;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border border-border glass p-4 animate-fade-up",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${getStatusColor(currentStatus)}`,
							children: currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).replace("_", " ")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: ["#", report.id]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-medium",
						children: report.reported_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Reported by ",
							report.reporter_name,
							" •",
							" ",
							formatDistanceToNow(new Date(report.created_at), { addSuffix: true })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted-foreground",
							children: getReasonLabel(report.reason)
						})
					}),
					report.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-foreground/80",
						children: report.description
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: [
					currentStatus !== "dismissed" && currentStatus !== "action_taken" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onUpdateStatus("reviewed"),
						className: "p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition",
						title: "Mark as reviewed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
					}),
					currentStatus !== "dismissed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onUpdateStatus("dismissed"),
						className: "p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition",
						title: "Dismiss",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
					}),
					currentStatus !== "action_taken" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onUpdateStatus("action_taken"),
						className: "p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition",
						title: "Action taken",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" })
					})
				]
			})]
		})
	});
}
function getStatusColor(status) {
	switch (status) {
		case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
		case "reviewed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
		case "dismissed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
		case "action_taken": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
		default: return "bg-surface text-muted-foreground border-border";
	}
}
//#endregion
export { AdminDashboard as component };
