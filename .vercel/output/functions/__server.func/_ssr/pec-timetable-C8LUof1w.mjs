//#region node_modules/.nitro/vite/services/ssr/assets/pec-timetable-C8LUof1w.js
var SECTION_RANGES = [
	{
		section: "DS1",
		min: 25106001,
		max: 25106022
	},
	{
		section: "DS2",
		min: 25106023,
		max: 25106042
	},
	{
		section: "DS3",
		min: 25106043,
		max: 25106064
	},
	{
		section: "DS3",
		min: 25106065,
		max: 25106999
	},
	{
		section: "CSE-1",
		min: 25103001,
		max: 25103021
	},
	{
		section: "CSE-2",
		min: 25103022,
		max: 25103041
	},
	{
		section: "CSE-3",
		min: 25103042,
		max: 25103061
	},
	{
		section: "CSE-4",
		min: 25103062,
		max: 25103083
	},
	{
		section: "CSE-5",
		min: 25103084,
		max: 25103105
	},
	{
		section: "CSE-6",
		min: 25103106,
		max: 25103128
	},
	{
		section: "CSE-6",
		min: 25103129,
		max: 25103999
	},
	{
		section: "CSE-1",
		min: 25101001,
		max: 25101021
	},
	{
		section: "CSE-2",
		min: 25101022,
		max: 25101041
	},
	{
		section: "CSE-3",
		min: 25101042,
		max: 25101061
	},
	{
		section: "CSE-4",
		min: 25101062,
		max: 25101083
	},
	{
		section: "CSE-5",
		min: 25101084,
		max: 25101105
	},
	{
		section: "CSE-6",
		min: 25101106,
		max: 25101128
	},
	{
		section: "AI-1",
		min: 25110001,
		max: 25110015
	},
	{
		section: "AI-2",
		min: 25110016,
		max: 25110031
	},
	{
		section: "AI-2",
		min: 25110032,
		max: 25110999
	},
	{
		section: "AI-1",
		min: 25106501,
		max: 25106515
	},
	{
		section: "AI-2",
		min: 25106516,
		max: 25106531
	},
	{
		section: "AI-2",
		min: 25106532,
		max: 25106599
	},
	{
		section: "AI-1",
		min: 25106101,
		max: 25106115
	},
	{
		section: "AI-2",
		min: 25106116,
		max: 25106199
	},
	{
		section: "ECE-G1",
		min: 25105001,
		max: 25105020
	},
	{
		section: "ECE-G2",
		min: 25105021,
		max: 25105040
	},
	{
		section: "ECE-G3",
		min: 25105041,
		max: 25105060
	},
	{
		section: "ECE-G4",
		min: 25105061,
		max: 25105080
	},
	{
		section: "ECE-G5",
		min: 25105081,
		max: 25105100
	},
	{
		section: "ECE-G6",
		min: 25105101,
		max: 25105120
	},
	{
		section: "ECE-G6",
		min: 25105121,
		max: 25105999
	},
	{
		section: "CIVIL-C1",
		min: 25102001,
		max: 25102020
	},
	{
		section: "CIVIL-C2",
		min: 25102021,
		max: 25102040
	},
	{
		section: "CIVIL-C3",
		min: 25102041,
		max: 25102060
	},
	{
		section: "CIVIL-C4",
		min: 25102061,
		max: 25102080
	},
	{
		section: "CIVIL-C5",
		min: 25102081,
		max: 25102100
	},
	{
		section: "CIVIL-C6",
		min: 25102101,
		max: 25102999
	},
	{
		section: "CIVIL-C1",
		min: 25104001,
		max: 25104020
	},
	{
		section: "CIVIL-C2",
		min: 25104021,
		max: 25104040
	},
	{
		section: "CIVIL-C3",
		min: 25104041,
		max: 25104060
	},
	{
		section: "CIVIL-C4",
		min: 25104061,
		max: 25104080
	},
	{
		section: "CIVIL-C5",
		min: 25104081,
		max: 25104100
	},
	{
		section: "CIVIL-C6",
		min: 25104101,
		max: 25104999
	}
];
function getSectionFromRollNo(rollNo) {
	const num = parseInt(rollNo.replace(/\D/g, ""), 10);
	if (isNaN(num)) return null;
	for (const range of SECTION_RANGES) if (num >= range.min && num <= range.max) return range.section;
	return null;
}
function free() {
	return {
		subject: "Free",
		type: "free"
	};
}
function lunch() {
	return {
		subject: "Lunch Break",
		type: "lunch"
	};
}
var DS1_TIMETABLE = {
	section: "DS1",
	semester: "3rd Sem",
	branch: "B.Tech CSE (Data Science)",
	period: "Jul–Dec 2026",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "PDS Lab",
						code: "DSN3002L",
						room: "CL13",
						faculty: "Kanu Goel",
						type: "lab",
						groups: "DS1"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L407",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L405",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L21",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "DS Lab",
						code: "DSN3001L",
						room: "301+303",
						faculty: "Sudesh Rani",
						type: "lab",
						groups: "DS1, DS2"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: free()
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "CN Lab",
						code: "DSN3004L",
						room: "CL13+CL14",
						faculty: "Trilok Chand",
						type: "lab",
						groups: "DS1, DS2"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L22",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L405",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "OS Lab",
						code: "DSN3003L",
						room: "306",
						faculty: "Ramteke Mamta",
						type: "lab",
						groups: "DS1, DS2"
					}
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "PDS Lab",
						code: "DSN3002L",
						room: "306",
						faculty: "Kanu Goel",
						type: "lab",
						groups: "DS1"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L19",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Spec. Tut/Practical",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var DS2_TIMETABLE = {
	section: "DS2",
	semester: "3rd Sem",
	branch: "B.Tech CSE (Data Science)",
	period: "Jul–Dec 2026",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L407",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L405",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L21",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "DS Lab",
						code: "DSN3001L",
						room: "301+303",
						faculty: "Sudesh Rani",
						type: "lab",
						groups: "DS1, DS2"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: free()
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "CN Lab",
						code: "DSN3004L",
						room: "CL13+CL14",
						faculty: "Trilok Chand",
						type: "lab",
						groups: "DS1, DS2"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L22",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L405",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "OS Lab",
						code: "DSN3003L",
						room: "306",
						faculty: "Ramteke Mamta",
						type: "lab",
						groups: "DS1, DS2"
					}
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L19",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Spec. Tut/Practical",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var DS3_TIMETABLE = {
	section: "DS3",
	semester: "3rd Sem",
	branch: "B.Tech CSE (Data Science)",
	period: "Jul–Dec 2026",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "OS Lab",
						code: "DSN3003L",
						room: "306",
						faculty: "Ramteke Mamta",
						type: "lab",
						groups: "DS3"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L407",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L405",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L21",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405",
						faculty: "G1–G4",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "DS Lab",
						code: "DSN3001L",
						room: "306",
						faculty: "Sudesh Rani",
						type: "lab",
						groups: "DS3"
					}
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "PDS Lab",
						code: "DSN3002L",
						room: "304",
						faculty: "Kanu Goel",
						type: "lab",
						groups: "DS3"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Structures",
						code: "DSN3001",
						room: "L405",
						faculty: "Sudesh Rani",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: free()
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: free()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Probability & Data Science",
						code: "DSN3002",
						room: "L22",
						faculty: "Kanu Goel",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L405",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: {
						subject: "CN Lab",
						code: "DSN3004L",
						room: "CL14",
						faculty: "Trilok Chand",
						type: "lab",
						groups: "DS3"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Computer Networks",
						code: "DSN3004",
						room: "L405",
						faculty: "Trilok Chand",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Operating Systems",
						code: "DSN3003",
						room: "L19",
						faculty: "Ramteke Mamta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405, L406, L407, T-9, T-11, T-12",
						type: "tutorial"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Spec. Tut/Practical",
						code: "DS MSC",
						room: "L405",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var CSE_G1_TIMETABLE = {
	section: "CSE-G1",
	semester: "3rd Sem",
	branch: "B.Tech CSE",
	period: "Jul–Dec 2026",
	labSubgroup: "CSE1, CSE2, CSE3",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L21",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						room: "301+303+306",
						faculty: "Poonam Saini",
						type: "lab",
						groups: "CSE1, CSE2, CSE3"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "OOP Lab",
						code: "CSN3004L",
						room: "304+301+306",
						faculty: "TF4",
						type: "lab",
						groups: "CSE1, CSE2, CSE3"
					}
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "12:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L21",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						room: "L21",
						faculty: "Mayank Gupta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "DSCS Tutorial",
						code: "CSN3003 T",
						room: "301+303",
						faculty: "Amandeep Kaur",
						type: "tutorial",
						groups: "CSE1, CSE2"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L21",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L21",
						faculty: "TF4",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						room: "L405–L407, T9–T12",
						type: "tutorial"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						room: "L21",
						faculty: "Mayank Gupta",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "Data Structures Lab",
						code: "CSN3001L",
						room: "301+303+306",
						faculty: "Mayank Gupta",
						type: "lab",
						groups: "CSE1, CSE2, CSE3"
					}
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L21",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L21",
						faculty: "TF4",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L21",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						room: "303",
						faculty: "Poonam Saini",
						type: "lab",
						groups: "CSE3"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						type: "tutorial"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "DSCS Tutorial",
						code: "CSN3003 T",
						faculty: "Amandeep Kaur",
						type: "tutorial",
						groups: "CSE3"
					}
				},
				{
					start: "10:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L21",
						faculty: "TF4",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L21",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						type: "tutorial"
					}
				},
				{
					start: "15:00",
					end: "17:00",
					slot: {
						subject: "Minor Spec. Tut/Practical",
						code: "CSE MSC",
						room: "DS Lab",
						type: "lab"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var CSE_G2_TIMETABLE = {
	section: "CSE-G2",
	semester: "3rd Sem",
	branch: "B.Tech CSE",
	period: "Jul–Dec 2026",
	labSubgroup: "CSE4, CSE5, CSE6",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						room: "L22",
						faculty: "Mayank Gupta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L22",
						faculty: "TF5",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "DSCS Tutorial",
						code: "CSN3003 T",
						room: "304+305",
						faculty: "Amandeep Kaur",
						type: "tutorial",
						groups: "CSE4, CSE5"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "Data Structures Lab",
						code: "CSN3001L",
						room: "303+DS Lab",
						faculty: "Mayank Gupta",
						type: "lab",
						groups: "CSE4, CSE5, CSE6"
					}
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L22",
						faculty: "TF5",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						room: "303+504",
						faculty: "Poonam Saini",
						type: "lab",
						groups: "CSE5, CSE6"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L22",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: free()
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						room: "L405, L406, L407",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: free()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L22",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						room: "L22",
						faculty: "Mayank Gupta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						type: "tutorial"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L22",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "Minor Specialization",
						code: "CSE MSC",
						room: "L21",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "OOP Lab",
						code: "CSN3004L",
						room: "DS Lab & 304",
						faculty: "TF4, TF5",
						type: "lab",
						groups: "CSE4, CSE5, CSE6"
					}
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						room: "L22",
						faculty: "TF5",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L22",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L22",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						room: "L22",
						faculty: "Mayank Gupta",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						room: "303",
						faculty: "Poonam Saini",
						type: "lab",
						groups: "CSE4"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						type: "tutorial"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Discrete Structures & CS",
						code: "CSN3003",
						room: "L22",
						faculty: "Amandeep Kaur",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						room: "L22",
						faculty: "Poonam Saini",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "HSM-II Tutorial",
						code: "HSM-II T",
						type: "tutorial"
					}
				},
				{
					start: "15:00",
					end: "17:00",
					slot: {
						subject: "Minor Spec. Tut/Practical",
						code: "CSE MSC",
						room: "DS Lab",
						type: "lab"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var AI1_TIMETABLE = {
	section: "AI-1",
	semester: "3rd Sem",
	branch: "B.Tech CSE (Artificial Intelligence)",
	period: "Jul–Dec 2026",
	labSubgroup: "AI1",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "DS Lab",
						code: "CSN3001L",
						type: "lab",
						groups: "AI1"
					}
				},
				{
					start: "16:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						type: "lab",
						groups: "AI1"
					}
				},
				{
					start: "16:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: free()
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "OOP Lab",
						code: "CSN3004L",
						type: "lab",
						groups: "AI1"
					}
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "12:00",
					slot: {
						subject: "MFAI Lab",
						code: "AIN3001L",
						type: "lab",
						groups: "AI1"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: free()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "13:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
var AI2_TIMETABLE = {
	section: "AI-2",
	semester: "3rd Sem",
	branch: "B.Tech CSE (Artificial Intelligence)",
	period: "Jul–Dec 2026",
	labSubgroup: "AI2",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: {
						subject: "OOP Lab",
						code: "CSN3004L",
						type: "lab",
						groups: "AI2"
					}
				},
				{
					start: "16:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "17:00",
					slot: free()
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "MFAI Lab",
						code: "AIN3001L",
						type: "lab",
						groups: "AI2"
					}
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "16:00",
					end: "17:00",
					slot: free()
				},
				{
					start: "17:00",
					end: "19:00",
					slot: {
						subject: "DS Lab",
						code: "CSN3001L",
						type: "lab",
						groups: "AI2"
					}
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: {
						subject: "OOP",
						code: "CSN3004",
						type: "lecture"
					}
				},
				{
					start: "10:00",
					end: "12:00",
					slot: {
						subject: "DSML Lab",
						code: "CSN3002L",
						type: "lab",
						groups: "AI2"
					}
				},
				{
					start: "12:00",
					end: "13:00",
					slot: {
						subject: "Maths Foundations of AI",
						code: "AIN3001",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: {
						subject: "Data Structures",
						code: "CSN3001",
						type: "lecture"
					}
				},
				{
					start: "15:00",
					end: "16:00",
					slot: free()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "17:00",
					end: "19:00",
					slot: free()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: {
						subject: "Data Science & ML",
						code: "CSN3002",
						type: "lecture"
					}
				},
				{
					start: "11:00",
					end: "13:00",
					slot: {
						subject: "HSM-II",
						code: "HSM-II",
						type: "lecture"
					}
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "19:00",
					slot: free()
				}
			]
		}
	]
};
function ece(subject, code, room, faculty, type = "lecture", groups) {
	return {
		subject,
		code,
		room,
		faculty,
		type,
		groups
	};
}
var ECE_LSG1_TIMETABLE = {
	section: "ECE-LSG1",
	semester: "3rd Sem",
	branch: "B.Tech ECE",
	period: "Jul–Dec 2026",
	approximate: true,
	labSubgroup: "G1, G2, G3",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: free()
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("Circuit Theory Tutorial", "EXN304 T", "L-25", "NF-1", "tutorial")
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: ece("Minor Specialization", "Minor Spec", "", "")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: ece("EDC Lab / DLD Lab (rotating G1-G3)", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Kedia / Dr. Dhawan", "lab", "G1, G2, G3")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: ece("PRP Tutorial", "EXN303 T", "L-24", "Dr. Satinder Mohar", "tutorial")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: ece("EDC Lab G2", "EXN302 Lab", "Lab-1", "Dr. Radhika", "lab", "G2")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: free()
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: free()
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("CT Tutorial G3", "EXN304 T", "L-25", "NF-1", "tutorial", "G3")
				},
				{
					start: "15:00",
					end: "17:00",
					slot: ece("DLD Lab G1 / EDC Lab G2", "EXN301/EXN302 Lab", "Lab-2 / Lab-1", "Dr. Dhawan / Dr. Kedia", "lab", "G1, G2")
				},
				{
					start: "17:00",
					end: "18:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: free()
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("PRP Tutorial G3", "EXN303 T", "Lab-6", "Dr. Satinder Mohar", "tutorial", "G3")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("Minor Specialization", "Minor Spec", "", "")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: free()
				}
			]
		}
	]
};
var ECE_LSG2_TIMETABLE = {
	section: "ECE-LSG2",
	semester: "3rd Sem",
	branch: "B.Tech ECE",
	period: "Jul–Dec 2026",
	approximate: true,
	labSubgroup: "G4, G5, G6",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: ece("Circuit Theory", "EXN304", "L-25", "NF-1")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Prob. & Random Processes", "EXN303", "L-23", "Dr. Satinder Mohar")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("CT Tutorial", "EXN304 T", "T-9", "NF-1", "tutorial")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Digital Logic Design", "EXN301", "L-20", "Dr. D. Dhawan")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("PRP Tutorial", "EXN303 T", "T-9", "Dr. Satinder Mohar", "tutorial")
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: ece("Minor Specialization", "Minor Spec", "", "")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: free()
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("HSM", "HSM", "L-20 & L-23", "Dr. Jaskirat")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: ece("EDC Lab G3", "EXN302 Lab", "Lab-1", "Dr. J. Kedia", "lab", "G3 (LSG2)")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: ece("PRP Tutorial G5", "EXN303 T", "T-9", "Dr. Satinder Mohar", "tutorial", "G5")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: ece("PRP Tutorial", "EXN303 T", "L-23", "Dr. Satinder Mohar", "tutorial")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("DLD Lab G3", "EXN301 Lab", "Lab-2", "Dr. D. Dhawan", "lab", "G3")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Circuit Theory", "EXN304", "L-24", "NF-1")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: free()
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				},
				{
					start: "16:00",
					end: "18:00",
					slot: ece("EDC Lab G4 / DLD Lab G5", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Kedia / Dr. Neelam R. Prakash", "lab", "G4, G5")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: ece("EDC Lab G5 / DLD Lab G6", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. Sukhwinder Singh / Dr. Jasbir Kaur", "lab", "G5, G6")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: free()
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("CT Tutorial G5", "EXN304 T", "L-25", "NF-1", "tutorial", "G5")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: ece("CT Tutorial G5 cont.", "EXN304 T", "L-25", "NF-1", "tutorial", "G5")
				},
				{
					start: "17:00",
					end: "18:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "11:00",
					slot: ece("EDC Lab G6 / DLD Lab G4", "EXN302/EXN301 Lab", "Lab-1 / Lab-2", "Dr. J. Kedia / Dr. D. Dhawan", "lab", "G4, G6")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: ece("Digital Logic Design", "EXN301", "L-24", "Dr. D. Dhawan")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: ece("Electronic Devices & Circuits", "EXN302", "L-25", "Dr. J. Kedia")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: ece("HSM Tutorial", "HSM T", "", "Dr. Jaskirat", "tutorial")
				},
				{
					start: "15:00",
					end: "16:00",
					slot: ece("Minor Specialization", "Minor Spec", "", "")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: free()
				}
			]
		}
	]
};
function civil(subject, code, room, faculty, type = "lecture", groups) {
	return {
		subject,
		code,
		room,
		faculty,
		type,
		groups
	};
}
var CIVIL_C1_TIMETABLE = {
	section: "CIVIL-C1",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C1",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: free()
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("Fluid Mechanics Lab", "CVN 303 Lab", "FM Lab", "Prof. Yatindra Kumar", "lab", "C1")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("Structural Analysis Lab", "CVN 302 Lab", "SM Lab", "Prof. Kuldeep Soni", "lab", "C1")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-16", "Dr. Mohit Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Dr. Mohit Kumar")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("Survey / TPT Lab", "CVN 301/305 Lab", "Survey/TPT Lab", "Dr. HASS / Dr. PKG", "lab", "C1")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Dr. Karan Moolchandani", "lab", "C1")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "11:00",
					end: "13:00",
					slot: civil("SM Lab", "CVN 302 Lab", "SM Lab", "Dr. Virajan Verma", "lab", "C1")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-2", "Dr. Mohit Kumar")
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var CIVIL_C2_TIMETABLE = {
	section: "CIVIL-C2",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C2",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Dr. Karan Moolchandani", "lab", "C2")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("Survey Lab", "CVN 301 Lab", "Survey Lab", "Dr. Badveeti Adinarayana", "lab", "C2")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-16", "Dr. Mohit Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("SM Lab", "CVN 302 Lab", "SM Lab", "Dr. Arshdeep Singh", "lab", "C2")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Dr. Mohit Kumar")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("TPT Lab", "CVN 305 Lab", "TPT Lab", "Dr. Nirpinder Jain", "lab", "C2")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "11:00",
					end: "13:00",
					slot: civil("FM Lab", "CVN 303 Lab", "FM Lab", "Prof. Yatindra Kumar", "lab", "C2")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-2", "Dr. Mohit Kumar")
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var CIVIL_C3_TIMETABLE = {
	section: "CIVIL-C3",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C3",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("TPT Lab", "CVN 305 Lab", "TPT Lab", "Dr. Deepak Awasthi", "lab", "C3")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-16", "Dr. Mohit Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("Survey / FM Lab", "CVN 301/303 Lab", "Survey/FM Lab", "Dr. DA / Dr. MK", "lab", "C3")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-2", "Dr. Karan Moolchandani")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Dr. Mohit Kumar")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-2", "Dr. Damodar Sharma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-2", "Dr. Badveeti Adinarayana")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "11:00",
					end: "13:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Prof. Sovina Sood", "lab", "C3")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "15:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-2", "Dr. Mohit Kumar")
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var CIVIL_C4_TIMETABLE = {
	section: "CIVIL-C4",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C4",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("FM Lab", "CVN 303 Lab", "FM Lab", "Dr. Kamal Kumar", "lab", "C4")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-3", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Dr. Veena U", "lab", "C4")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("SM Lab", "CVN 302 Lab", "SM Lab", "Dr. Virajan Verma", "lab", "C4")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Geo Informatics", "CVN 301", "L-1", "Dr. H A S Sandhu")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("Survey Lab", "CVN 301 Lab", "Survey Lab", "Dr. Geeta Arora", "lab", "C4")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("TPT Lab", "CVN 305 Lab", "TPT Lab", "Dr. Deepak Awasthi", "lab", "C4")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var CIVIL_C5_TIMETABLE = {
	section: "CIVIL-C5",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C5",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("Survey Lab", "CVN 301 Lab", "Survey Lab", "Dr. Geeta Arora", "lab", "C5")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Dr. Karan Moolchandani", "lab", "C5")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-3", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("TPT Lab", "CVN 305 Lab", "TPT Lab", "Dr. Badveeti Adinarayana", "lab", "C5")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("FM Lab", "CVN 303 Lab", "FM Lab", "Dr. Mohit Kumar", "lab", "C5")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Geo Informatics", "CVN 301", "L-1", "Dr. H A S Sandhu")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("SM Lab", "CVN 302 Lab", "SM Lab", "Dr. Virajan Verma", "lab", "C5")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var CIVIL_C6_TIMETABLE = {
	section: "CIVIL-C6",
	semester: "3rd Sem",
	branch: "B.Tech Civil Engineering",
	period: "Jul–Dec 2026",
	labSubgroup: "C6",
	schedule: [
		{
			day: "MON",
			slots: [
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("SM Lab", "CVN 302 Lab", "SM Lab", "Dr. Damodar Sharma", "lab", "C6")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("TPT Lab", "CVN 305 Lab", "TPT Lab", "Dr. Pardeep K. Gupta", "lab", "C6")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "TUE",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-3", "Dr. H A S Sandhu")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "WED",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Structural Analysis-I", "CVN 302", "L-1", "Dr. Virajan Verma")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("RCC Lab", "CVN 304 Lab", "RCC Lab", "Dr. Arshdeep Singh", "lab", "C6")
				},
				{
					start: "16:00",
					end: "17:00",
					slot: civil("Minor Specialization", "Minor Spec", "", "", "lecture")
				}
			]
		},
		{
			day: "THU",
			slots: [
				{
					start: "08:00",
					end: "09:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "09:00",
					end: "10:00",
					slot: civil("Fluid Mechanics", "CVN 303", "L-1", "Prof. Yatindra Kumar")
				},
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Building Materials & Const.", "CVN 304", "L-1", "Dr. Deepak Awasthi")
				},
				{
					start: "11:00",
					end: "12:00",
					slot: civil("Transportation Engg", "CVN 305", "L-1", "Dr. Nirpinder Jain")
				},
				{
					start: "12:00",
					end: "13:00",
					slot: civil("Geo Informatics", "CVN 301", "L-1", "Dr. H A S Sandhu")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "14:00",
					end: "16:00",
					slot: civil("FM Lab", "CVN 303 Lab", "FM Lab", "Dr. Kamal Kumar", "lab", "C6")
				}
			]
		},
		{
			day: "FRI",
			slots: [
				{
					start: "10:00",
					end: "11:00",
					slot: civil("Geo Informatics", "CVN 301", "L-2", "Dr. H A S Sandhu")
				},
				{
					start: "11:00",
					end: "13:00",
					slot: civil("Survey Lab", "CVN 301 Lab", "Survey Lab", "Dr. Nirpinder Jain", "lab", "C6")
				},
				{
					start: "13:00",
					end: "14:00",
					slot: lunch()
				},
				{
					start: "15:00",
					end: "17:00",
					slot: civil("Minor Spec. Tut/Practical", "Minor Spec", "", "", "lab")
				}
			]
		}
	]
};
var TIMETABLE_REGISTRY = {
	DS1: DS1_TIMETABLE,
	DS2: DS2_TIMETABLE,
	DS3: DS3_TIMETABLE,
	"CSE-1": CSE_G1_TIMETABLE,
	"CSE-2": CSE_G1_TIMETABLE,
	"CSE-3": CSE_G1_TIMETABLE,
	"CSE-4": CSE_G2_TIMETABLE,
	"CSE-5": CSE_G2_TIMETABLE,
	"CSE-6": CSE_G2_TIMETABLE,
	"AI-1": AI1_TIMETABLE,
	"AI-2": AI2_TIMETABLE,
	"ECE-G1": ECE_LSG1_TIMETABLE,
	"ECE-G2": ECE_LSG1_TIMETABLE,
	"ECE-G3": ECE_LSG1_TIMETABLE,
	"ECE-G4": ECE_LSG2_TIMETABLE,
	"ECE-G5": ECE_LSG2_TIMETABLE,
	"ECE-G6": ECE_LSG2_TIMETABLE,
	"CIVIL-C1": CIVIL_C1_TIMETABLE,
	"CIVIL-C2": CIVIL_C2_TIMETABLE,
	"CIVIL-C3": CIVIL_C3_TIMETABLE,
	"CIVIL-C4": CIVIL_C4_TIMETABLE,
	"CIVIL-C5": CIVIL_C5_TIMETABLE,
	"CIVIL-C6": CIVIL_C6_TIMETABLE,
	"C1": CIVIL_C1_TIMETABLE,
	"C2": CIVIL_C2_TIMETABLE,
	"C3": CIVIL_C3_TIMETABLE,
	"C4": CIVIL_C4_TIMETABLE,
	"C5": CIVIL_C5_TIMETABLE,
	"C6": CIVIL_C6_TIMETABLE
};
function getTimetableForSection(section) {
	return TIMETABLE_REGISTRY[section] ?? null;
}
/**
* Returns today's schedule (or null if weekend / no data).
*/
function getTodaySchedule(timetable) {
	const todayName = [
		"SUN",
		"MON",
		"TUE",
		"WED",
		"THU",
		"FRI",
		"SAT"
	][(/* @__PURE__ */ new Date()).getDay()];
	return timetable.schedule.find((d) => d.day === todayName) ?? null;
}
/**
* Returns upcoming or current class for a DaySchedule.
*/
function getNextClass(schedule) {
	const now = /* @__PURE__ */ new Date();
	const nowMins = now.getHours() * 60 + now.getMinutes();
	for (const ts of schedule.slots) {
		if (!ts.slot || ts.slot.type === "free" || ts.slot.type === "lunch") continue;
		const [sh, sm] = ts.start.split(":").map(Number);
		const [eh, em] = ts.end.split(":").map(Number);
		const startMins = sh * 60 + sm;
		const endMins = eh * 60 + em;
		if (nowMins >= startMins && nowMins < endMins) return {
			slot: ts,
			status: "ongoing"
		};
		if (nowMins < startMins) return {
			slot: ts,
			status: "upcoming"
		};
	}
	return null;
}
//#endregion
export { getTodaySchedule as i, getSectionFromRollNo as n, getTimetableForSection as r, getNextClass as t };
