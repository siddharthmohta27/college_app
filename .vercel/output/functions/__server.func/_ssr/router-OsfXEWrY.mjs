import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { N as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$27 } from "./app-DPCzitxh.mjs";
import { n as getInitialTheme, t as applyTheme } from "./theme-DXUzF6g4.mjs";
import { Et as Clock, It as Calendar, J as MapPin, Rt as Building, at as Info, b as Sparkles, bt as Download, c as UtensilsCrossed, i as X, w as ShieldCheck, wt as Coffee } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./supabase-Bz5bubvX.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as Route$28 } from "./orientation-B_HT0ZR3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-OsfXEWrY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PwaInstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = (0, import_react.useState)(null);
	const [isVisible, setIsVisible] = (0, import_react.useState)(false);
	const [isDismissed, setIsDismissed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("pwa-prompt-dismissed")) return;
		if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) return;
		const handler = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setTimeout(() => setIsVisible(true), 3e3);
		};
		window.addEventListener("beforeinstallprompt", handler);
		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, []);
	const handleInstall = async () => {
		if (!deferredPrompt) return;
		await deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === "accepted") {
			setIsVisible(false);
			setDeferredPrompt(null);
		}
	};
	const handleDismiss = () => {
		setIsVisible(false);
		setIsDismissed(true);
		sessionStorage.setItem("pwa-prompt-dismissed", "true");
	};
	if (!isVisible || isDismissed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pwa-install-prompt",
		role: "dialog",
		"aria-label": "Install Campus Connect app",
		id: "pwa-install-prompt",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pwa-install-glow" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pwa-install-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pwa-install-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/pwa-192x192.png",
						alt: "Campus Connect",
						width: 44,
						height: 44,
						className: "pwa-install-icon-img"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pwa-install-text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pwa-install-title",
						children: "Install Campus Connect"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pwa-install-subtitle",
						children: "Add to home screen for the best experience"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pwa-install-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					id: "pwa-install-btn",
					onClick: handleInstall,
					className: "pwa-install-btn",
					"aria-label": "Install app",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Install" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: "pwa-dismiss-btn",
					onClick: handleDismiss,
					className: "pwa-dismiss-btn",
					"aria-label": "Dismiss install prompt",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-Ctv6lpWF.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Signal lost"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This channel doesn't exist in our network."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 glow-primary",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-elevated",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$26 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Campus Connect — Your College, All in One Place" },
			{
				name: "description",
				content: "Campus Connect unifies your college marketplace, canteen menu, campus chat, clubs, events and study rooms in one premium app."
			},
			{
				name: "author",
				content: "Campus Connect"
			},
			{
				property: "og:title",
				content: "Campus Connect — Your College, All in One Place"
			},
			{
				property: "og:description",
				content: "Marketplace, canteen, chat, clubs and study rooms — everything college, beautifully unified."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#F59E0B"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Campus Connect"
			},
			{
				name: "application-name",
				content: "Campus Connect"
			},
			{
				name: "msapplication-TileColor",
				content: "#0F172A"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "alternate icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$26.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		applyTheme(getInitialTheme());
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_OUT" || !session) {
				if (router.state.location.pathname !== "/") router.navigate({ to: "/" });
			}
		});
		return () => subscription.unsubscribe();
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaInstallPrompt, {})]
	});
}
var $$splitComponentImporter$24 = () => import("./login-Cjv7OUJc.mjs");
var Route$25 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In — Campus Connect" }, {
		name: "description",
		content: "Sign in to Campus Connect with your college or fresher email."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./chat-CeSVmoUP.mjs");
var Route$24 = createFileRoute("/chat")({
	head: () => ({ meta: [{ title: "Nexus — Chat" }, {
		name: "description",
		content: "Real-time campus chat: servers, channels, DMs and study rooms."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./routes-C4If32lZ.mjs");
var Route$23 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Campus Connect — Your College, All in One Place" }, {
		name: "description",
		content: "Campus Connect brings together your college marketplace, canteen menu, chat, clubs, and study rooms in one premium app."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./app-yQJxC3K0.mjs");
var Route$22 = createFileRoute("/app/")({
	head: () => ({ meta: [{ title: "Dashboard — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./orientation-kHTYocVs.mjs");
var Route$21 = createFileRoute("/dashboard/orientation")({
	beforeLoad: () => {
		throw redirect({ to: "/app/orientation" });
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./timetable-BwBVgZtu.mjs");
var Route$20 = createFileRoute("/app/timetable")({
	head: () => ({ meta: [{ title: "My Timetable — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./study-CSScsOZO.mjs");
var Route$19 = createFileRoute("/app/study")({
	head: () => ({ meta: [{ title: "Study Rooms — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./resources-yT6TdAuW.mjs");
var Route$18 = createFileRoute("/app/resources")({
	head: () => ({ meta: [{ title: "Academic Resources — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./marketplace-ChufjFAU.mjs");
var Route$17 = createFileRoute("/app/marketplace")({
	head: () => ({ meta: [{ title: "Marketplace — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./dating-Cq-_9wU-.mjs");
var Route$16 = createFileRoute("/app/dating")({
	head: () => ({ meta: [{ title: "Campus Match — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./clubs-BdRuk7uI.mjs");
var Route$15 = createFileRoute("/app/clubs")({
	head: () => ({ meta: [{ title: "Clubs & Events — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./chat-DRARaXgk.mjs");
var Route$14 = createFileRoute("/app/chat")({
	head: () => ({ meta: [{ title: "Campus Chat — Campus Connect" }, {
		name: "description",
		content: "Real-time campus chat: servers, channels, DMs and study rooms."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var Route$13 = createFileRoute("/app/canteen")({
	head: () => ({ meta: [{ title: "Mess Menu — Campus Connect" }] }),
	component: MessAndCanteenPage
});
var HOSTELS_LIST = [
	{
		id: "kurukshetra",
		name: "Kurukshetra Hostel",
		type: "boys",
		location: "South Campus",
		hasMenu: true,
		specialNotice: "Wednesday: South Indian Special | Sunday: Amritsari Chole Bhature & Shahi Feast"
	},
	{
		id: "shivalik",
		name: "Shivalik Hostel",
		type: "boys",
		location: "Near Sports Complex",
		hasMenu: false
	},
	{
		id: "himalaya",
		name: "Himalaya Hostel",
		type: "boys",
		location: "North Block",
		hasMenu: false
	},
	{
		id: "kalpana_chawla",
		name: "Kalpana Chawla Hostel",
		type: "girls",
		location: "East Campus",
		hasMenu: false
	},
	{
		id: "vindhya",
		name: "Vindhya Hostel",
		type: "girls",
		location: "West Campus",
		hasMenu: false
	}
];
var KURUKSHETRA_WEEKLY_MENU = {
	Monday: {
		dayName: "Monday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Aloo Onion Stuffed Paratha",
				"Fresh Curd (Dahi)",
				"Mixed Pickle & Butter",
				"Boiled Eggs (2 pcs) / Banana",
				"Hot Adrak Chai / Filter Coffee / Warm Milk"
			],
			specialItem: "Stuffed Aloo Paratha with Butter",
			diet: "veg",
			tags: ["Chef Special", "Breakfast"]
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Special Punjabi Rajma Masala",
				"Steamed Basmati Rice",
				"Mix Veg Sabzi (Carrot, Beans, Peas)",
				"Fresh Tawa Butter Roti",
				"Boondi Raita",
				"Green Salad & Lemon"
			],
			specialItem: "Punjabi Rajma Chawal",
			diet: "veg",
			tags: ["Popular"]
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Crispy Samosa with Mint & Saunth Chutney",
				"Special Masala Chai",
				"Hot Filter Coffee",
				"Glucose Biscuits"
			],
			specialItem: "Halwai Style Samosa",
			diet: "veg",
			tags: ["Evening Snacks"]
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Kadhai Paneer Gravy",
				"Yellow Moong Dal Tadka",
				"Jeera Basmati Rice",
				"Tawa Phulka Roti",
				"Sirka Onion & Tomato Salad",
				"Hot Gulab Jamun (2 pcs)"
			],
			specialItem: "Kadhai Paneer & Gulab Jamun",
			diet: "veg",
			tags: ["Sweet Included"]
		}
	},
	Tuesday: {
		dayName: "Tuesday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Indori Poha with Roasted Peanuts & Sev",
				"Crispy Veg Cutlet",
				"Brown / White Bread Toast with Butter & Jam",
				"Boiled Egg / Fresh Apple",
				"Hot Tea & Milk"
			],
			specialItem: "Indori Poha with Sev",
			diet: "veg",
			tags: ["Light Breakfast"]
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Authentic Punjabi Kadi Pakora",
				"Steamed Rice",
				"Aloo Gobhi Dry Sabzi",
				"Tawa Butter Roti",
				"Crisp Roasted Papad",
				"Kachumber Salad"
			],
			specialItem: "Punjabi Kadi Chawal with Papad",
			diet: "veg",
			tags: ["Comfort Food"]
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Stuffed Veg Bread Roll with Tomato Ketchup",
				"Cardamom Masala Tea",
				"Black Coffee"
			],
			specialItem: "Golden Bread Roll",
			diet: "veg"
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Shahi Paneer Creamy Gravy",
				"Dal Makhani (Slow cooked)",
				"Veg Pulao Rice",
				"Butter Roti",
				"Cucumber & Beetroot Salad",
				"Chilled Fruit Custard"
			],
			specialItem: "Dal Makhani & Fruit Custard",
			diet: "veg",
			tags: ["Deluxe Dinner"]
		}
	},
	Wednesday: {
		dayName: "Wednesday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Steamed Idli (4 pcs) & Medu Vada",
				"Hot Vegetable Sambhar",
				"Fresh Coconut & Tomato Chutney",
				"Omelette (2 eggs) / Fruit",
				"South Indian Filter Coffee & Tea"
			],
			specialItem: "South Indian Idli Sambhar & Vada Feast",
			diet: "veg",
			tags: ["South Indian Special"]
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Amritsari Chana Masala (Chole)",
				"Hot Poori & Jeera Rice",
				"Bhindi Do Pyaza",
				"Mix Veg Raita",
				"Sirka Onion Salad"
			],
			specialItem: "Chole Poori & Jeera Rice",
			diet: "veg"
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Assorted Veg Pakoras (Paneer, Pyaz, Gobhi)",
				"Pudina & Imli Chutneys",
				"Ginger Chai"
			],
			specialItem: "Mix Pakora Platter",
			diet: "veg",
			tags: ["Hot Pakoras"]
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Matar Paneer / Egg Curry (Optional)",
				"Chana Dal Fry",
				"Steamed Basmati Rice",
				"Tawa Butter Roti",
				"Green Salad",
				"Warm Sewaiyan Kheer"
			],
			specialItem: "Matar Paneer & Kheer",
			diet: "veg"
		}
	},
	Thursday: {
		dayName: "Thursday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Paneer & Gobhi Stuffed Paratha",
				"Pudina Dahi",
				"Butter & Mixed Pickle",
				"Sprouted Moong Salad",
				"Hot Tea & Milk"
			],
			specialItem: "Paneer Paratha with Mint Curd",
			diet: "veg",
			tags: ["Paratha Special"]
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Dal Tadka with Ghee",
				"Louki Kofta Curry",
				"Steamed Basmati Rice",
				"Fresh Phulka Roti",
				"Cucumber Tomato Raita",
				"Green Salad"
			],
			specialItem: "Louki Kofta & Dal Tadka",
			diet: "veg"
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Veg Coleslaw Sandwich / Grilled Sandwich",
				"Green Chutney",
				"Lemon Tea / Masala Chai"
			],
			specialItem: "Grilled Veg Sandwich",
			diet: "veg"
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Palak Paneer",
				"Masoor Dal Tadka",
				"Veg Peas Pulao",
				"Butter Roti",
				"Radish & Onion Salad",
				"Spongy Bengali Rasgulla (2 pcs)"
			],
			specialItem: "Palak Paneer & Rasgulla",
			diet: "veg"
		}
	},
	Friday: {
		dayName: "Friday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Vegetable Rava Upma with Coconut Chutney",
				"Pav Bhaji (Fresh Butter Pav)",
				"Boiled Eggs / Banana",
				"Toast Butter Jam",
				"Adrak Chai & Milk"
			],
			specialItem: "Bombay Pav Bhaji & Upma",
			diet: "veg"
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Dal Panchmel (5 Dals mix)",
				"Dum Aloo Kashmiri",
				"Jeera Rice",
				"Tawa Butter Roti",
				"Roasted Papad",
				"Plain Dahi & Salad"
			],
			specialItem: "Kashmiri Dum Aloo & Panchmel Dal",
			diet: "veg"
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Masala Maggi Noodles / Red Sauce Pasta",
				"Hot Coffee",
				"Ginger Tea"
			],
			specialItem: "Campus Masala Maggi",
			diet: "veg",
			tags: ["Student Craving"]
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Paneer Butter Masala",
				"Palak Chana Dal",
				"Steamed Rice",
				"Butter Roti",
				"Lachha Onion Salad",
				"Desi Ghee Suji Halwa"
			],
			specialItem: "Paneer Butter Masala & Suji Halwa",
			diet: "veg",
			tags: ["Friday Treat"]
		}
	},
	Saturday: {
		dayName: "Saturday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 9:30 AM",
			items: [
				"Methi Thepla / Onion Uttapam with Sambar",
				"White Butter & Pickle",
				"Boiled Egg / Fresh Fruit",
				"Tea & Coffee"
			],
			specialItem: "Methi Thepla with White Butter",
			diet: "veg"
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Mix Veg Dum Biryani Pulao",
				"Moong Dal Dhuli Tadka",
				"Aloo Jeera Dry",
				"Tawa Phulka",
				"Boondi Raita",
				"Pickle & Papad"
			],
			specialItem: "Veg Dum Biryani with Raita",
			diet: "veg"
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Mumbai Bhel Puri & Sev Puri / Pao Bhaji",
				"Cutting Chai",
				"Cold Coffee"
			],
			specialItem: "Mumbai Bhel Puri",
			diet: "veg"
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 9:45 PM",
			items: [
				"Malai Kofta Gravy",
				"Dal Makhani",
				"Veg Fried Rice",
				"Butter Naan / Roti",
				"Green Salad",
				"Ice Cream Scoop"
			],
			specialItem: "Malai Kofta & Ice Cream",
			diet: "veg",
			tags: ["Weekend Special"]
		}
	},
	Sunday: {
		dayName: "Sunday",
		breakfast: {
			name: "Breakfast",
			time: "7:30 AM – 10:00 AM",
			items: [
				"Amritsari Chole Bhature (Unlimited)",
				"Crispy Hot Jalebi",
				"Sweet Patiala Lassi / Cold Milk",
				"Pickle & Fried Green Chillies"
			],
			specialItem: "Amritsari Chole Bhature & Jalebi Feast",
			diet: "veg",
			tags: ["Sunday Super Feast", "Special"]
		},
		lunch: {
			name: "Lunch",
			time: "12:30 PM – 2:30 PM",
			items: [
				"Paneer Do Pyaza",
				"Dal Maharani",
				"Hyderabadi Veg Biryani with Mirchi Ka Salan",
				"Butter Naan & Roti",
				"Boondi Raita & Salad"
			],
			specialItem: "Hyderabadi Biryani with Salan",
			diet: "veg"
		},
		snacks: {
			name: "Evening Snacks",
			time: "5:00 PM – 6:30 PM",
			items: [
				"Kachori with Aloo Sabzi / Sweet Treats",
				"Masala Chai",
				"Filter Coffee"
			],
			specialItem: "Crispy Khasta Kachori",
			diet: "veg"
		},
		dinner: {
			name: "Dinner",
			time: "7:30 PM – 10:00 PM",
			items: [
				"Shahi Paneer / Special Chicken (Optional)",
				"Dal Tadka",
				"Kashmiri Pulao",
				"Butter Paratha / Naan",
				"Sirka Pyaz Salad",
				"Royal Shahi Tukda"
			],
			specialItem: "Grand Sunday Shahi Feast & Shahi Tukda",
			diet: "veg",
			tags: ["Grand Feast"]
		}
	}
};
var DAYS_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
function MessAndCanteenPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("mess");
	const [selectedHostelId, setSelectedHostelId] = (0, import_react.useState)("kurukshetra");
	const defaultDayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	][(/* @__PURE__ */ new Date()).getDay()];
	const [selectedDay, setSelectedDay] = (0, import_react.useState)(defaultDayName || "Monday");
	const selectedHostel = (0, import_react.useMemo)(() => {
		return HOSTELS_LIST.find((h) => h.id === selectedHostelId) || HOSTELS_LIST[0];
	}, [selectedHostelId]);
	const currentDayMenu = (0, import_react.useMemo)(() => {
		return KURUKSHETRA_WEEKLY_MENU[selectedDay] || KURUKSHETRA_WEEKLY_MENU["Monday"];
	}, [selectedDay]);
	const getMealStatus = (timeRange) => {
		const now = /* @__PURE__ */ new Date();
		const currentHour = now.getHours();
		const currentMin = now.getMinutes();
		const totalMinutes = currentHour * 60 + currentMin;
		if (timeRange.includes("7:30 AM") && totalMinutes >= 450 && totalMinutes <= 585) return {
			status: "Serving Now",
			color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
		};
		if (timeRange.includes("12:30 PM") && totalMinutes >= 750 && totalMinutes <= 885) return {
			status: "Serving Now",
			color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
		};
		if (timeRange.includes("5:00 PM") && totalMinutes >= 1020 && totalMinutes <= 1125) return {
			status: "Serving Now",
			color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
		};
		if (timeRange.includes("7:30 PM") && totalMinutes >= 1170 && totalMinutes <= 1320) return {
			status: "Serving Now",
			color: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
		};
		return null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-8 p-4 sm:p-6 pb-28 md:pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
					children: "Mess Menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Hostel Dining Halls & Campus Food Outlets"
				})] })]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex rounded-xl border border-border bg-surface p-1 self-start sm:self-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("mess"),
					className: `flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${activeTab === "mess" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hostel Mess Menus" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("outlets"),
					className: `flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${activeTab === "outlets" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Campus Cafes & Night Canteen" })]
				})]
			})]
		}), activeTab === "mess" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8 animate-fade-up",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: "Select Hostel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [HOSTELS_LIST.length, " Hostels"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5",
					children: HOSTELS_LIST.map((h) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedHostelId(h.id),
							className: `flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${selectedHostelId === h.id ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30" : "border-border/80 bg-surface/70 hover:border-primary/40 hover:bg-surface"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex w-full items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: h.id === "kurukshetra" ? "🏛️" : h.id === "kalpana_chawla" ? "🌸" : h.id === "vindhya" ? "🌺" : h.id === "shivalik" ? "⛰️" : "🏔️"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md ${h.type === "girls" ? "bg-pink-500/15 text-pink-500 border border-pink-500/20" : "bg-blue-500/15 text-blue-500 border border-blue-500/20"}`,
										children: h.type === "girls" ? "Girls Hostel" : "Boys Hostel"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "mt-2 text-xs font-bold text-foreground line-clamp-1",
									children: h.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground mt-0.5",
									children: h.location
								})
							]
						}, h.id);
					})
				})]
			}), selectedHostel.hasMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-background p-5 sm:p-6 shadow-md space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-2xl shadow-inner shrink-0",
									children: "🏛️"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg sm:text-xl font-bold tracking-tight text-foreground",
										children: "Kurukshetra Hostel Mess"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-500",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Official Menu Verified"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Weekly 4-Meal Schedule · Breakfast, Lunch, Evening Snacks & Dinner"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "South Campus, Kurukshetra Bhawan" })]
							})]
						}), selectedHostel.specialNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2.5 rounded-2xl border border-primary/20 bg-primary/10 p-3 text-xs text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-[11px] sm:text-xs",
									children: selectedHostel.specialNotice
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold tracking-tight text-foreground",
									children: "Weekly Schedule Day"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["Today is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-primary",
									children: defaultDayName
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex overflow-x-auto gap-2 py-1 scrollbar-none",
							children: DAYS_OF_WEEK.map((day) => {
								const isSelected = selectedDay === day;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedDay(day),
									className: `shrink-0 rounded-2xl px-4 py-2.5 text-left border transition ${isSelected ? "border-primary bg-primary text-primary-foreground shadow-md glow-primary" : "border-border/80 bg-surface/70 text-muted-foreground hover:bg-surface hover:text-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold block",
											children: day
										}), defaultDayName === day && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[9px] font-bold px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-primary/15 text-primary border border-primary/20"}`,
											children: "Today"
										})]
									})
								}, day);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-4",
						children: [
							{
								slot: currentDayMenu.breakfast,
								icon: "🍳",
								badge: "Breakfast"
							},
							{
								slot: currentDayMenu.lunch,
								icon: "🍛",
								badge: "Lunch"
							},
							{
								slot: currentDayMenu.snacks,
								icon: "☕",
								badge: "Evening Snacks"
							},
							{
								slot: currentDayMenu.dinner,
								icon: "🍲",
								badge: "Dinner"
							}
						].map(({ slot, icon, badge }, idx) => {
							const liveStatus = getMealStatus(slot.time);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border glass p-5 space-y-4 hover:border-primary/40 transition shadow-sm relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2 border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl",
												children: icon
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-base font-bold text-foreground",
													children: slot.name
												}), liveStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${liveStatus.color}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" }), liveStatus.status]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 text-xs text-muted-foreground mt-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: slot.time })]
											})] })]
										}), slot.specialItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-500 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), "Special"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
											children: "Menu Items"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-1.5",
											children: slot.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2 text-xs text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
											}, i))
										})]
									}),
									slot.tags && slot.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/60 text-[11px]",
										children: slot.tags.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
											children: t
										}, i))
									})
								]
							}, idx);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border glass p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "Kurukshetra Hostel Mess Information"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "The Kurukshetra Hostel Mess serves 4 scheduled meals daily. Food is prepared with fresh ingredients, clean RO drinking water, and weekly rotating menus."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl",
												children: "🥗"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-foreground",
												children: "Fresh Quality Meals"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Daily cooked fresh vegetables & quality dairy"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl",
												children: "⏰"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-foreground",
												children: "Punctual Meal Timings"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Breakfast, Lunch, Snacks & Dinner served on time"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-surface p-3.5 text-center space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl",
												children: "✨"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold text-foreground",
												children: "Sunday Special Feast"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground",
												children: "Special Chole Bhature breakfast and evening feast"
											})
										]
									})
								]
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-surface to-background p-8 sm:p-12 text-center space-y-4 shadow-md animate-in fade-in duration-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-amber-500/20 text-amber-500 shadow-inner mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 max-w-lg mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { className: "h-5 w-5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xl font-bold tracking-tight text-foreground",
								children: [selectedHostel.name, " Menu Coming Soon"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: "Mess menu will be added after official confirmation by college administration."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Waiting for officials"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedHostelId("kurukshetra"),
							className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated transition shadow-sm",
							children: "View Kurukshetra Hostel Menu →"
						})]
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border glass p-8 sm:p-14 text-center space-y-5 shadow-lg animate-in fade-in duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-primary/10 text-primary shadow-inner mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "h-8 w-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 max-w-lg mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl sm:text-2xl font-bold tracking-tight text-foreground",
						children: "Campus Cafes & Night Canteen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: "Online menus and digital pre-ordering for Nescafé, Amul Parlour, and Night Canteens will be available soon."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Coming Soon"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setActiveTab("mess"),
						className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated transition shadow-sm",
						children: "View Hostel Mess Menus →"
					})]
				})
			]
		})]
	});
}
var $$splitComponentImporter$12 = () => import("./attendance-CtPROof1.mjs");
var Route$12 = createFileRoute("/app/attendance")({
	head: () => ({ meta: [{ title: "Attendance Tracker — Campus Connect" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./study-buddies-D8EfHepM.mjs");
var Route$11 = createFileRoute("/app/dating/study-buddies")({
	head: () => ({ meta: [{ title: "Study Buddies — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./startup-D-AuJMSY.mjs");
var Route$10 = createFileRoute("/app/dating/startup")({
	head: () => ({ meta: [{ title: "Startup Match — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./search-lFFK36I-.mjs");
var Route$9 = createFileRoute("/app/dating/search")({
	head: () => ({ meta: [{ title: "Search — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./profile-view-DUZh-bVz.mjs");
var Route$8 = createFileRoute("/app/dating/profile-view")({
	head: () => ({ meta: [{ title: "Profile — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./profile-PFsmItU-.mjs");
var Route$7 = createFileRoute("/app/dating/profile")({
	head: () => ({ meta: [{ title: "Edit Profile — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./notifications-2f2oUiHf.mjs");
var Route$6 = createFileRoute("/app/dating/notifications")({
	head: () => ({ meta: [{ title: "Notifications — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./matches-TJ9cwY1s.mjs");
var Route$5 = createFileRoute("/app/dating/matches")({
	head: () => ({ meta: [{ title: "Matches — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./friends-BSXFPuyc.mjs");
var Route$4 = createFileRoute("/app/dating/friends")({
	head: () => ({ meta: [{ title: "Friends — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./events-B-ReoyBy.mjs");
var Route$3 = createFileRoute("/app/dating/events")({
	head: () => ({ meta: [{ title: "Events — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./daily-picks-CFovd9TX.mjs");
var Route$2 = createFileRoute("/app/dating/daily-picks")({
	head: () => ({ meta: [{ title: "Daily Picks — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./chat-CRcM2Hw0.mjs");
var Route$1 = createFileRoute("/app/dating/chat")({
	head: () => ({ meta: [{ title: "Opening Chat — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dating-BzLnSAht.mjs");
var Route = createFileRoute("/app/admin/dating")({
	head: () => ({ meta: [{ title: "Admin — Campus Match" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var LoginRoute = Route$25.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$26
});
var ChatRoute = Route$24.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$26
});
var AppRoute = Route$27.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$26
});
var IndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$26
});
var AppIndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var DashboardOrientationRoute = Route$21.update({
	id: "/dashboard/orientation",
	path: "/dashboard/orientation",
	getParentRoute: () => Route$26
});
var AppTimetableRoute = Route$20.update({
	id: "/timetable",
	path: "/timetable",
	getParentRoute: () => AppRoute
});
var AppStudyRoute = Route$19.update({
	id: "/study",
	path: "/study",
	getParentRoute: () => AppRoute
});
var AppResourcesRoute = Route$18.update({
	id: "/resources",
	path: "/resources",
	getParentRoute: () => AppRoute
});
var AppOrientationRoute = Route$28.update({
	id: "/orientation",
	path: "/orientation",
	getParentRoute: () => AppRoute
});
var AppMarketplaceRoute = Route$17.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => AppRoute
});
var AppDatingRoute = Route$16.update({
	id: "/dating",
	path: "/dating",
	getParentRoute: () => AppRoute
});
var AppClubsRoute = Route$15.update({
	id: "/clubs",
	path: "/clubs",
	getParentRoute: () => AppRoute
});
var AppChatRoute = Route$14.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AppRoute
});
var AppCanteenRoute = Route$13.update({
	id: "/canteen",
	path: "/canteen",
	getParentRoute: () => AppRoute
});
var AppAttendanceRoute = Route$12.update({
	id: "/attendance",
	path: "/attendance",
	getParentRoute: () => AppRoute
});
var AppDatingStudyBuddiesRoute = Route$11.update({
	id: "/study-buddies",
	path: "/study-buddies",
	getParentRoute: () => AppDatingRoute
});
var AppDatingStartupRoute = Route$10.update({
	id: "/startup",
	path: "/startup",
	getParentRoute: () => AppDatingRoute
});
var AppDatingSearchRoute = Route$9.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => AppDatingRoute
});
var AppDatingProfileViewRoute = Route$8.update({
	id: "/profile-view",
	path: "/profile-view",
	getParentRoute: () => AppDatingRoute
});
var AppDatingProfileRoute = Route$7.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppDatingRoute
});
var AppDatingNotificationsRoute = Route$6.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AppDatingRoute
});
var AppDatingMatchesRoute = Route$5.update({
	id: "/matches",
	path: "/matches",
	getParentRoute: () => AppDatingRoute
});
var AppDatingFriendsRoute = Route$4.update({
	id: "/friends",
	path: "/friends",
	getParentRoute: () => AppDatingRoute
});
var AppDatingEventsRoute = Route$3.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => AppDatingRoute
});
var AppDatingDailyPicksRoute = Route$2.update({
	id: "/daily-picks",
	path: "/daily-picks",
	getParentRoute: () => AppDatingRoute
});
var AppDatingChatRoute = Route$1.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AppDatingRoute
});
var AppAdminDatingRoute = Route.update({
	id: "/admin/dating",
	path: "/admin/dating",
	getParentRoute: () => AppRoute
});
var AppDatingRouteChildren = {
	AppDatingChatRoute,
	AppDatingDailyPicksRoute,
	AppDatingEventsRoute,
	AppDatingFriendsRoute,
	AppDatingMatchesRoute,
	AppDatingNotificationsRoute,
	AppDatingProfileRoute,
	AppDatingProfileViewRoute,
	AppDatingSearchRoute,
	AppDatingStartupRoute,
	AppDatingStudyBuddiesRoute
};
var AppRouteChildren = {
	AppAttendanceRoute,
	AppCanteenRoute,
	AppChatRoute,
	AppClubsRoute,
	AppDatingRoute: AppDatingRoute._addFileChildren(AppDatingRouteChildren),
	AppMarketplaceRoute,
	AppOrientationRoute,
	AppResourcesRoute,
	AppStudyRoute,
	AppTimetableRoute,
	AppIndexRoute,
	AppAdminDatingRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	ChatRoute,
	LoginRoute,
	DashboardOrientationRoute
};
var routeTree = Route$26._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
