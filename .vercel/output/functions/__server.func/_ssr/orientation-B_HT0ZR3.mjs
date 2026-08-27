import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orientation-B_HT0ZR3.js
var $$splitComponentImporter = () => import("./orientation-Ddogoux0.mjs");
var Route = createFileRoute("/app/orientation")({
	head: () => ({ meta: [{ title: "Orientation 2026 — Campus Connect" }, {
		name: "description",
		content: "PEC Freshers Orientation 2026 guide, campus maps, reporting venues, and Day 1 schedule."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ORIENTATION_DAYS = [
	{
		day: 1,
		label: "Day 1",
		date: "19 Aug (Wed)",
		title: "Inaugural, Director Keynote & Dept Visits"
	},
	{
		day: 2,
		label: "Day 2",
		date: "20 Aug (Thu)",
		title: "Science HODs, Clubs (1–4), Tech/Sports/Music"
	},
	{
		day: 3,
		label: "Day 3",
		date: "21 Aug (Fri)",
		title: "SCC, Library, CDGC, Speaker Sessions, Clubs (5–6)"
	},
	{
		day: 4,
		label: "Day 4",
		date: "22 Aug (Sat)",
		title: "Speaker Session, Clubs (7–13), PEB/Music Displays"
	},
	{
		day: 5,
		label: "Day 5",
		date: "23 Aug (Sun)",
		title: "Speaker Session, Drams A1, Clubs (14–18), PEB A2"
	},
	{
		day: 6,
		label: "Day 6",
		date: "24 Aug (Mon)",
		title: "Speaker Session, Clubs (19–25), Tech/Sports/Music"
	},
	{
		day: 7,
		label: "Day 7",
		date: "25 Aug (Tue)",
		title: "Clubs (26–35), PDC/ELC/SESI & Grand FUN Event 🎉"
	}
];
var ATTENDANCE_VENUES_BY_DAY = {
	CSE: {
		1: "Auditorium",
		2: "L-26",
		3: "L-26",
		4: "L-31",
		5: "Auditorium",
		6: "L-29",
		7: "Auditorium"
	},
	ECE: {
		1: "Auditorium",
		2: "L-27",
		3: "Aero Audi",
		4: "L-26",
		5: "Auditorium",
		6: "L-30",
		7: "L-28"
	},
	VLSI: {
		1: "Auditorium",
		2: "L-28",
		3: "L-27",
		4: "Aero Audi",
		5: "L-30",
		6: "L-31",
		7: "L-29"
	},
	"B.Design": {
		1: "L-26",
		2: "L-28",
		3: "L-27",
		4: "Aero Audi",
		5: "L-30",
		6: "L-31",
		7: "L-29"
	},
	AERO: {
		1: "L-26",
		2: "L-28",
		3: "L-27",
		4: "Aero Audi",
		5: "L-30",
		6: "L-31",
		7: "L-29"
	},
	Electrical: {
		1: "L-27",
		2: "L-29",
		3: "L-28",
		4: "L-27",
		5: "L-31",
		6: "Auditorium",
		7: "L-30"
	},
	Civil: {
		1: "L-28",
		2: "Auditorium",
		3: "L-29",
		4: "Auditorium",
		5: "L-26",
		6: "Aero Audi",
		7: "L-31"
	},
	AI: {
		1: "L-29",
		2: "Aero Audi",
		3: "L-30",
		4: "L-28",
		5: "L-27",
		6: "L-26",
		7: "L-26"
	},
	DS: {
		1: "L-29",
		2: "Aero Audi",
		3: "L-30",
		4: "L-28",
		5: "L-27",
		6: "L-26",
		7: "L-26"
	},
	"M&C": {
		1: "L-29",
		2: "Aero Audi",
		3: "L-30",
		4: "Audi / L-30",
		5: "L-27",
		6: "L-26",
		7: "L-26"
	},
	Mechanical: {
		1: "L-30",
		2: "L-30",
		3: "Auditorium",
		4: "Auditorium",
		5: "L-28",
		6: "L-27",
		7: "Aero Audi"
	},
	Metallurgy: {
		1: "L-31",
		2: "L-31",
		3: "L-31",
		4: "L-29",
		5: "Aero Audi",
		6: "L-28",
		7: "L-27"
	},
	Production: {
		1: "L-31",
		2: "L-31",
		3: "L-31",
		4: "Audi / L-30",
		5: "Aero Audi",
		6: "L-28",
		7: "L-27"
	}
};
var SPECIAL_GROUPINGS = {
	tech: [
		{
			code: "T1",
			branches: [
				"CSE",
				"VLSI",
				"B.Design",
				"Production"
			],
			venue: "Centenary Hall"
		},
		{
			code: "T2",
			branches: [
				"AERO",
				"AI",
				"DS",
				"M&C",
				"Mechanical"
			],
			venue: "Centenary Hall"
		},
		{
			code: "T3",
			branches: ["ECE", "Civil"],
			venue: "Centenary Hall"
		},
		{
			code: "T4",
			branches: ["Electrical", "Metallurgy"],
			venue: "Centenary Hall"
		}
	],
	sports: [
		{
			code: "S1",
			branches: ["ECE", "Civil"],
			venue: "Athletic Ground"
		},
		{
			code: "S2",
			branches: [
				"Electrical",
				"Metallurgy",
				"Production"
			],
			venue: "Athletic Ground"
		},
		{
			code: "S3",
			branches: [
				"CSE",
				"M&C",
				"Mechanical"
			],
			venue: "Athletic Ground"
		},
		{
			code: "S4",
			branches: [
				"VLSI",
				"B.Design",
				"AERO",
				"AI",
				"DS"
			],
			venue: "Athletic Ground"
		}
	],
	cultural: [
		{
			code: "A1",
			branches: [
				"CSE",
				"ECE",
				"VLSI",
				"B.Design"
			],
			venue: "Auditorium"
		},
		{
			code: "A2",
			branches: [
				"Civil",
				"M&C",
				"Mechanical",
				"Production"
			],
			venue: "Auditorium"
		},
		{
			code: "A3",
			branches: [
				"AERO",
				"Electrical",
				"AI",
				"DS",
				"Metallurgy"
			],
			venue: "Auditorium"
		}
	]
};
//#endregion
export { SPECIAL_GROUPINGS as i, ORIENTATION_DAYS as n, Route as r, ATTENDANCE_VENUES_BY_DAY as t };
