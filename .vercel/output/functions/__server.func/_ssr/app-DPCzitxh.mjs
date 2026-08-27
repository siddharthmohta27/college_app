import { t as auth } from "./firebase-BL0L6cM-.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DPCzitxh.js
var $$splitComponentImporter = () => import("./app-6OxBg4Fd.mjs");
var Route = createFileRoute("/app")({
	beforeLoad: async () => {
		if (!auth) {
			console.warn("Firebase not configured — skipping auth check");
			return {
				userId: null,
				email: null,
				displayName: null
			};
		}
		const user = auth.currentUser;
		if (!user) throw new Error("UNAUTHORIZED");
		return {
			userId: user.uid,
			email: user.email,
			displayName: user.displayName
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
