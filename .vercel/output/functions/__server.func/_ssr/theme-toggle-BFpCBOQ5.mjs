import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useTheme } from "./theme-DXUzF6g4.mjs";
import { U as Moon, _ as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-BFpCBOQ5.js
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle({ className = "" }) {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: toggleTheme,
		type: "button",
		className: `relative grid h-8 w-8 place-items-center rounded-lg border border-border/80 bg-surface/60 text-muted-foreground transition-all duration-200 hover:bg-surface-elevated hover:text-foreground active:scale-95 ${className}`,
		title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
		"aria-label": "Toggle light and dark theme",
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4 text-cyan-600 transition-transform duration-200 hover:-rotate-12" })
	});
}
//#endregion
export { ThemeToggle as t };
