import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useParams, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ot as CircleCheck, W as MessageSquare, Yt as ArrowLeft, i as X } from "../_libs/lucide-react.mjs";
import { c as useChatRedirectInfo } from "./use-dating-api-CYSx6-cH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CRcM2Hw0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChatRedirect() {
	const navigate = useNavigate();
	const profileId = useParams({ strict: false }).profileId;
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [message, setMessage] = (0, import_react.useState)("Preparing chat...");
	const { data: redirectInfo, isLoading, error } = useChatRedirectInfo(profileId || "");
	(0, import_react.useEffect)(() => {
		if (!isLoading && redirectInfo) handleRedirect(redirectInfo);
	}, [redirectInfo, isLoading]);
	const handleRedirect = (info) => {
		if (!info.targetChatUserId) {
			setStatus("error");
			setMessage("This user hasn't joined Campus Chat yet. They'll receive a notification when they do.");
			return;
		}
		const dmChannelId = `dm_${Math.min(info.currentChatUserId, info.targetChatUserId)}_${Math.max(info.currentChatUserId, info.targetChatUserId)}`;
		navigate({
			to: "/app/chat",
			search: {
				dm: info.targetChatUserId.toString(),
				channel: dmChannelId
			}
		});
		setStatus("success");
		setMessage("Opening chat...");
	};
	if (status === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-emerald-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Opening Chat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: message
				})
			]
		})
	});
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center bg-background p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md text-center animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-8 w-8 text-rose-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Unable to Open Chat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/app/dating" }),
						className: "w-full rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition hover:bg-surface-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 inline mr-2" }), "Back to Campus Match"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/app/chat" }),
						className: "w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 inline mr-2" }), "Open Campus Chat"]
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center animate-fade-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-yellow-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-6 w-6 text-primary-foreground" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/10 border-t-transparent animate-spin" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Opening Chat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Connecting you with your match..."
				})
			]
		})
	});
}
//#endregion
export { ChatRedirect as component };
