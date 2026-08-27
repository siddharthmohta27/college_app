import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Et as Clock, b as Sparkles, st as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dating-Cq-_9wU-.js
var import_jsx_runtime = require_jsx_runtime();
function CampusMatch() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[calc(100vh-57px-60px)] flex-col items-center justify-center p-6 md:min-h-[calc(100vh-57px)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-up w-full max-w-sm text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto mb-6 flex h-24 w-24 items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-primary/20 animate-pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
								className: "h-9 w-9 text-primary",
								fill: "currentColor"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "absolute -right-1 -top-1 h-5 w-5 text-amber-400 animate-bounce" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Campus Match"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: "Connect with study partners, coffee buddies & more — right on campus."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-primary",
						children: "Coming Soon"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "We're putting the finishing touches on this feature. Stay tuned! 🚀"
				})
			]
		})
	});
}
//#endregion
export { CampusMatch as component };
