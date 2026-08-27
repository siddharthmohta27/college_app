import { r as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { Ht as BookOpen, Kt as Award, O as Search, bt as Download, gt as FileText, pt as Folder, qt as ArrowUpRight, v as Star } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-yT6TdAuW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"All",
	"CS Notes",
	"PYQs",
	"Syllabus",
	"E-Books",
	"Lab Manuals"
];
var RESOURCES = [
	{
		id: 1,
		title: "Algorithms Lecture Notes (Full Semester)",
		category: "CS Notes",
		courseCode: "CS301",
		fileType: "PDF",
		size: "14.2 MB",
		downloads: 412,
		contributor: "Priya Sharma (TA)",
		rating: 4.9,
		isOfficial: true
	},
	{
		id: 2,
		title: "Database Systems End-Sem paper 2025",
		category: "PYQs",
		courseCode: "CS302",
		fileType: "PDF",
		size: "1.8 MB",
		downloads: 289,
		contributor: "Exam Cell",
		rating: 4.8,
		isOfficial: true
	},
	{
		id: 3,
		title: "OS Process Management Cheat Sheet",
		category: "CS Notes",
		courseCode: "CS303",
		fileType: "PDF",
		size: "850 KB",
		downloads: 189,
		contributor: "Marcus K.",
		rating: 4.6
	},
	{
		id: 4,
		title: "Computer Science 3rd Year Syllabus (2026)",
		category: "Syllabus",
		courseCode: "CS-ALL",
		fileType: "PDF",
		size: "2.4 MB",
		downloads: 540,
		contributor: "HOD Office",
		rating: 5,
		isOfficial: true
	},
	{
		id: 5,
		title: "Introduction to Algorithms (Cormen)",
		category: "E-Books",
		courseCode: "CS301",
		fileType: "EPUB",
		size: "48 MB",
		downloads: 245,
		contributor: "Central Library",
		rating: 4.7
	},
	{
		id: 6,
		title: "Compiler Design Lab Manual — Lab 1 to 8",
		category: "Lab Manuals",
		courseCode: "CS304",
		fileType: "PDF",
		size: "3.1 MB",
		downloads: 120,
		contributor: "Prof. Gupta",
		rating: 4.5,
		isOfficial: true
	},
	{
		id: 7,
		title: "Discrete Mathematics Previous Papers (5 Years)",
		category: "PYQs",
		courseCode: "MA201",
		fileType: "ZIP",
		size: "8.5 MB",
		downloads: 350,
		contributor: "Senior Batch",
		rating: 4.4
	},
	{
		id: 8,
		title: "Computer Networks Lab Setup Instructions",
		category: "Lab Manuals",
		courseCode: "CS306",
		fileType: "DOCX",
		size: "1.2 MB",
		downloads: 98,
		contributor: "Lab Assistant",
		rating: 4.2
	}
];
function ResourcesDirectory() {
	const [selectedCat, setSelectedCat] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [downloadsMap, setDownloadsMap] = (0, import_react.useState)({});
	const handleDownload = (id) => {
		setDownloadsMap((prev) => ({
			...prev,
			[id]: true
		}));
	};
	const filtered = RESOURCES.filter((res) => {
		const matchCat = selectedCat === "All" || res.category === selectedCat;
		const matchSearch = res.title.toLowerCase().includes(search.toLowerCase()) || res.courseCode.toLowerCase().includes(search.toLowerCase());
		return matchCat && matchSearch;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Academic Resources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted-foreground",
					children: "Download lecture notes, lab manuals, and previous year question papers"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3 animate-fade-up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 min-w-52",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "resources-search",
						placeholder: "Search by code or topic (e.g. CS301)...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 animate-fade-up",
				children: CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					id: `resourcecat-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`,
					onClick: () => setSelectedCat(cat),
					className: `rounded-full px-4 py-1.5 text-xs font-medium transition ${selectedCat === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"}`,
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filtered.map((res, i) => {
					const isDownloaded = downloadsMap[res.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: `resource-${res.id}`,
						className: "group flex items-center justify-between gap-4 rounded-2xl border border-border glass p-4 animate-fade-up card-hover",
						style: { animationDelay: `${i * 45}ms` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3.5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-elevated text-primary",
								children: res.category === "PYQs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" }) : res.category === "Syllabus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[9px] uppercase tracking-wider text-primary",
											children: res.courseCode
										}), res.isOfficial && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-yellow-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase text-primary border border-yellow-500/20",
											children: "Official"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-sm text-foreground truncate mt-0.5",
										children: res.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center gap-3 flex-wrap text-[10px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Type: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: res.fileType
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Size: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: res.size
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["By: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: res.contributor
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-2.5 w-2.5 fill-amber-400 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: res.rating })]
											})
										]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden sm:inline font-mono text-[10px] text-muted-foreground",
								children: [res.downloads, " downloads"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: `btn-dl-${res.id}`,
								onClick: () => handleDownload(res.id),
								className: `flex h-9 w-9 items-center justify-center rounded-xl transition btn-press ${isDownloaded ? "bg-emerald-500/20 text-emerald-400" : "bg-primary text-primary-foreground"}`,
								children: isDownloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle$1, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
							})]
						})]
					}, res.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border glass p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-8 w-8 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-sm",
						children: "Contribute Study Material"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Share your lecture notes, cheat sheets or exam questions to earn reputation points."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition shrink-0",
					children: ["Upload File ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "inline h-3.5 w-3.5 ml-1" })]
				})]
			})
		]
	});
}
function CheckCircle$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.5",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22 4 12 14.01 9 11.01" })]
	});
}
//#endregion
export { ResourcesDirectory as component };
