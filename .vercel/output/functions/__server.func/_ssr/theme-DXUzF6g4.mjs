import { r as __toESM } from "../_runtime.mjs";
import { o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-DXUzF6g4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function getInitialTheme() {
	if (typeof window === "undefined") return "dark";
	try {
		const saved = localStorage.getItem("campus_connect_theme");
		if (saved === "light" || saved === "dark") return saved;
	} catch (_) {}
	return "dark";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (theme === "light") {
		root.classList.add("light");
		root.classList.remove("dark");
	} else {
		root.classList.add("dark");
		root.classList.remove("light");
	}
	try {
		localStorage.setItem("campus_connect_theme", theme);
	} catch (_) {}
}
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)(getInitialTheme);
	(0, import_react.useEffect)(() => {
		applyTheme(theme);
	}, [theme]);
	const toggleTheme = () => {
		setThemeState((prev) => prev === "dark" ? "light" : "dark");
	};
	return {
		theme,
		toggleTheme,
		setTheme: setThemeState
	};
}
//#endregion
export { getInitialTheme as n, useTheme as r, applyTheme as t };
