import { t as supabase } from "./supabase-Bz5bubvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-_nwc91w_.js
var STORAGE_KEY = "campus_connect_attendance_v3";
/**
* Extracts unique non-free, non-lunch subjects from a weekly timetable.
*/
function extractSubjectsFromTimetable(timetable) {
	const map = /* @__PURE__ */ new Map();
	for (const day of timetable.schedule) for (const ts of day.slots) {
		if (!ts.slot || ts.slot.type === "free" || ts.slot.type === "lunch") continue;
		const code = ts.slot.code || ts.slot.subject;
		const name = ts.slot.subject;
		if (!map.has(code)) map.set(code, {
			name,
			code
		});
	}
	return Array.from(map.values());
}
/**
* Merges timetable subjects with saved attendance records.
*/
function mergeTimetableWithSaved(timetableSubjects, saved) {
	const savedMap = /* @__PURE__ */ new Map();
	for (const s of saved) savedMap.set(s.code, s);
	const result = [];
	if (timetableSubjects.length > 0) {
		for (const ts of timetableSubjects) {
			const existing = savedMap.get(ts.code);
			if (existing) {
				result.push({
					...existing,
					name: ts.name
				});
				savedMap.delete(ts.code);
			} else result.push({
				id: ts.code,
				name: ts.name,
				code: ts.code,
				lecturesAttended: 0,
				lecturesAbsent: 0,
				lecturesCancelled: 0,
				lastUpdated: "Scheduled in Timetable",
				isCustom: false
			});
		}
		for (const remaining of savedMap.values()) if (remaining.isCustom) result.push(remaining);
	} else for (const remaining of savedMap.values()) if (remaining.isCustom) result.push(remaining);
	return result;
}
/**
* Load attendance subjects from localStorage
*/
function loadLocalAttendance() {
	if (typeof window === "undefined") return [];
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		if (data) return JSON.parse(data);
	} catch (err) {
		console.warn("Failed to load local attendance:", err);
	}
	return [];
}
/**
* Save attendance subjects to localStorage
*/
function saveLocalAttendance(subjects) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
	} catch (err) {
		console.warn("Failed to save local attendance:", err);
	}
}
/**
* Sync attendance records with Supabase & PostgreSQL
*/
async function syncSupabaseAttendance(userId, subjects) {
	if (!userId) return;
	const recordsToUpsert = subjects.map((s) => ({
		user_id: userId,
		subject_code: s.code,
		subject_name: s.name,
		attended: s.lecturesAttended,
		absent: s.lecturesAbsent,
		cancelled: s.lecturesCancelled,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}));
	if (supabase) try {
		const { error } = await supabase.from("user_attendance").upsert(recordsToUpsert, { onConflict: "user_id,subject_code" });
		if (error) console.warn("Supabase attendance sync notice:", error.message);
	} catch (err) {
		console.warn("Supabase attendance sync fallback:", err);
	}
	try {
		await fetch("http://localhost:3001/api/attendance", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId,
				records: recordsToUpsert
			})
		});
	} catch (_) {}
}
/**
* Load attendance from Supabase & PostgreSQL if logged in
*/
async function fetchSupabaseAttendance(userId) {
	if (!userId) return null;
	if (supabase) try {
		const { data, error } = await supabase.from("user_attendance").select("*").eq("user_id", userId);
		if (!error && data && data.length > 0) return data.map((row) => ({
			id: row.subject_code,
			name: row.subject_name,
			code: row.subject_code,
			lecturesAttended: row.attended || 0,
			lecturesAbsent: row.absent || 0,
			lecturesCancelled: row.cancelled || 0,
			lastUpdated: new Date(row.updated_at || Date.now()).toLocaleDateString()
		}));
	} catch (_) {}
	try {
		const res = await fetch(`http://localhost:3001/api/attendance?userId=${encodeURIComponent(userId)}`);
		if (res.ok) {
			const json = await res.json();
			if (json.data && json.data.length > 0) return json.data.map((row) => ({
				id: row.subject_code,
				name: row.subject_name,
				code: row.subject_code,
				lecturesAttended: row.attended || 0,
				lecturesAbsent: row.absent || 0,
				lecturesCancelled: row.cancelled || 0,
				lastUpdated: new Date(row.updated_at || Date.now()).toLocaleDateString()
			}));
		}
	} catch (_) {}
	return null;
}
/**
* Calculate stats for a single subject
*/
function calculateSubjectStats(subject) {
	const conducted = subject.lecturesAttended + subject.lecturesAbsent;
	const percentage = conducted > 0 ? subject.lecturesAttended / conducted * 100 : 100;
	const isDanger = percentage < 75 && conducted > 0;
	let adviceMsg = "";
	if (conducted === 0) adviceMsg = "No classes recorded yet";
	else if (percentage >= 75) {
		const maxSkips = Math.floor((subject.lecturesAttended - .75 * conducted) / .75);
		if (maxSkips === 0) adviceMsg = "On the edge! Don't miss the next class.";
		else adviceMsg = `Can safely skip ${maxSkips} next ${maxSkips === 1 ? "class" : "classes"}`;
	} else {
		const needed = Math.ceil((.75 * conducted - subject.lecturesAttended) / .25);
		adviceMsg = `Must attend next ${needed} ${needed === 1 ? "class" : "classes"} to hit 75%`;
	}
	return {
		conducted,
		percentage,
		isDanger,
		adviceMsg
	};
}
//#endregion
export { mergeTimetableWithSaved as a, loadLocalAttendance as i, extractSubjectsFromTimetable as n, saveLocalAttendance as o, fetchSupabaseAttendance as r, syncSupabaseAttendance as s, calculateSubjectStats as t };
