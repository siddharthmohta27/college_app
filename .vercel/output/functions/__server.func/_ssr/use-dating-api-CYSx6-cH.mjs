import { n as firebaseAuth } from "./firebase-BL0L6cM-.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-dating-api-CYSx6-cH.js
var API_BASE = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://localhost:3001/api/dating" : "/api/dating";
async function getAuthHeaders() {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${await firebaseAuth.getIdToken()}`
	};
}
async function fetchApi(endpoint, options = {}) {
	const headers = await getAuthHeaders();
	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		headers: {
			...headers,
			...options.headers
		}
	});
	if (!res.ok) {
		const error = await res.json().catch(() => ({ error: "Request failed" }));
		throw new Error(error.error || `HTTP ${res.status}`);
	}
	return res.json();
}
var profileApi = {
	getMe: () => fetchApi("/profile/me"),
	updateMe: (data) => fetchApi("/profile/me", {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	getById: (id) => fetchApi(`/profile/${id}`)
};
var photosApi = {
	getMine: () => fetchApi("/photos"),
	upload: (data) => fetchApi("/photos", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	update: (id, data) => fetchApi(`/photos/${id}`, {
		method: "PUT",
		body: JSON.stringify(data)
	}),
	delete: (id) => fetchApi(`/photos/${id}`, { method: "DELETE" }),
	reorder: (photoOrders) => fetchApi("/photos/reorder", {
		method: "PUT",
		body: JSON.stringify({ photoOrders })
	})
};
var promptsApi = {
	getAll: () => fetchApi("/prompts"),
	getMine: () => fetchApi("/prompts/me"),
	upsert: (data) => fetchApi("/prompts/me", {
		method: "POST",
		body: JSON.stringify(data)
	}),
	delete: (promptId) => fetchApi(`/prompts/me/${promptId}`, { method: "DELETE" })
};
var friendsApi = {
	sendRequest: (receiverProfileId) => fetchApi("/friends/request", {
		method: "POST",
		body: JSON.stringify({ receiverProfileId })
	}),
	respond: (requestId, action) => fetchApi(`/friends/request/${requestId}`, {
		method: "PUT",
		body: JSON.stringify({ action })
	}),
	getRequests: () => fetchApi("/friends/requests"),
	getSentRequests: () => fetchApi("/friends/requests/sent"),
	getFriends: () => fetchApi("/friends"),
	remove: (friendId) => fetchApi(`/friends/${friendId}`, { method: "DELETE" })
};
var notificationsApi = {
	get: (limit = 50, unreadOnly = false) => fetchApi(`/notifications?limit=${limit}&unread=${unreadOnly}`),
	markRead: (id) => fetchApi(`/notifications/${id}/read`, { method: "PUT" }),
	markAllRead: () => fetchApi("/notifications/read-all", { method: "PUT" }),
	getUnreadCount: () => fetchApi("/notifications/unread-count")
};
var eventsApi = {
	get: (type, upcomingOnly = true) => {
		const params = new URLSearchParams();
		if (type) params.set("type", type);
		if (!upcomingOnly) params.set("upcoming", "false");
		return fetchApi(`/events?${params.toString()}`);
	},
	rsvp: (eventId, status = "going") => fetchApi(`/events/${eventId}/rsvp`, {
		method: "POST",
		body: JSON.stringify({ status })
	}),
	getRsvps: (eventId) => fetchApi(`/events/${eventId}/rsvps`),
	getMyRsvps: () => fetchApi("/events/rsvps/me")
};
var dailyPicksApi = { get: (date) => {
	return fetchApi(`/daily-picks${date ? `?date=${date}` : ""}`);
} };
var searchApi = { search: (params) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== void 0 && value !== null && value !== "") if (Array.isArray(value)) value.forEach((v) => searchParams.append(key, v));
		else searchParams.set(key, String(value));
	});
	return fetchApi(`/search?${searchParams.toString()}`);
} };
var matchesApi = { getMatches: () => fetchApi("/matches") };
var studyBuddyApi = { getMatches: (subjects, limit = 20) => {
	const params = new URLSearchParams();
	if (subjects?.length) subjects.forEach((s) => params.append("subjects", s));
	params.set("limit", String(limit));
	return fetchApi(`/study-buddies?${params.toString()}`);
} };
var startupMatchApi = { getMatches: (limit = 20) => fetchApi(`/startup-matches?limit=${limit}`) };
var chatRedirectApi = { getInfo: (profileId) => fetchApi(`/chat/${profileId}`) };
var adminApi = {
	getStats: () => fetchApi("/admin/stats"),
	getUsers: (page = 1, limit = 50, search = "") => {
		const params = new URLSearchParams({
			page: String(page),
			limit: String(limit)
		});
		if (search) params.set("search", search);
		return fetchApi(`/admin/users?${params.toString()}`);
	},
	getReports: (status = "pending") => fetchApi(`/admin/reports?status=${status}`),
	updateReport: (id, status, adminNotes) => fetchApi(`/admin/reports/${id}`, {
		method: "PUT",
		body: JSON.stringify({
			status,
			adminNotes
		})
	}),
	suspendUser: (id, reason) => fetchApi(`/admin/users/${id}/suspend`, {
		method: "PUT",
		body: JSON.stringify({ reason })
	}),
	unsuspendUser: (id) => fetchApi(`/admin/users/${id}/unsuspend`, { method: "PUT" }),
	verifyUser: (id) => fetchApi(`/admin/users/${id}/verify`, { method: "PUT" })
};
function getCurrentUserId() {
	return firebaseAuth.currentUser?.uid ?? null;
}
function useMyProfile() {
	return useQuery({
		queryKey: ["dating-profile", "me"],
		queryFn: () => profileApi.getMe().then((r) => r.profile),
		enabled: !!getCurrentUserId(),
		staleTime: 300 * 1e3
	});
}
function useProfile(profileId) {
	return useQuery({
		queryKey: ["dating-profile", profileId],
		queryFn: () => profileApi.getById(String(profileId)).then((r) => r.profile),
		enabled: !!profileId,
		staleTime: 300 * 1e3
	});
}
function useUpdateProfile() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => profileApi.updateMe(data),
		onSuccess: (data) => {
			queryClient.setQueryData(["dating-profile", "me"], data.profile);
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useUploadPhoto() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => photosApi.upload(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useDeletePhoto() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => photosApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useReorderPhotos() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (photoOrders) => photosApi.reorder(photoOrders),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function usePrompts() {
	return useQuery({
		queryKey: ["dating-prompts"],
		queryFn: () => promptsApi.getAll().then((r) => r.prompts),
		staleTime: 1800 * 1e3
	});
}
function useMyPrompts() {
	return useQuery({
		queryKey: ["dating-prompts", "me"],
		queryFn: () => promptsApi.getMine().then((r) => r.prompts),
		enabled: !!getCurrentUserId(),
		staleTime: 300 * 1e3
	});
}
function useUpsertPrompt() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => promptsApi.upsert(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dating-prompts", "me"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useDeletePrompt() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (promptId) => promptsApi.delete(promptId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dating-prompts", "me"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useFriendRequests() {
	return useQuery({
		queryKey: ["friend-requests", "incoming"],
		queryFn: () => friendsApi.getRequests().then((r) => r.requests),
		enabled: !!getCurrentUserId(),
		staleTime: 30 * 1e3,
		refetchInterval: 30 * 1e3
	});
}
function useSentFriendRequests() {
	return useQuery({
		queryKey: ["friend-requests", "sent"],
		queryFn: () => friendsApi.getSentRequests().then((r) => r.requests),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useFriends() {
	return useQuery({
		queryKey: ["friends"],
		queryFn: () => friendsApi.getFriends().then((r) => r.friends),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useSendFriendRequest() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (receiverProfileId) => friendsApi.sendRequest(receiverProfileId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-requests", "sent"] });
		}
	});
}
function useRespondToFriendRequest() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ requestId, action }) => friendsApi.respond(requestId, action),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-requests", "incoming"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useRemoveFriend() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (friendId) => friendsApi.remove(friendId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
		}
	});
}
function useNotifications(limit = 50, unreadOnly = false) {
	return useQuery({
		queryKey: [
			"notifications",
			limit,
			unreadOnly
		],
		queryFn: () => notificationsApi.get(limit, unreadOnly),
		enabled: !!getCurrentUserId(),
		staleTime: 15 * 1e3,
		refetchInterval: 30 * 1e3
	});
}
function useMarkNotificationRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => notificationsApi.markRead(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
		}
	});
}
function useMarkAllNotificationsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => notificationsApi.markAllRead(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
			queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
		}
	});
}
function useEvents(type, upcomingOnly = true) {
	return useQuery({
		queryKey: [
			"events",
			type,
			upcomingOnly
		],
		queryFn: () => eventsApi.get(type, upcomingOnly).then((r) => r.events),
		enabled: !!getCurrentUserId(),
		staleTime: 300 * 1e3
	});
}
function useRsvpToEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ eventId, status }) => eventsApi.rsvp(eventId, status),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
			queryClient.invalidateQueries({ queryKey: ["my-rsvps"] });
		}
	});
}
function useMyRsvps() {
	return useQuery({
		queryKey: ["my-rsvps"],
		queryFn: () => eventsApi.getMyRsvps().then((r) => r.rsvps),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useDailyPicks(date) {
	return useQuery({
		queryKey: ["daily-picks", date ?? "today"],
		queryFn: () => dailyPicksApi.get(date).then((r) => r.picks),
		enabled: !!getCurrentUserId(),
		staleTime: 3600 * 1e3
	});
}
function useSearchProfiles(params) {
	return useQuery({
		queryKey: ["search", params],
		queryFn: () => searchApi.search(params).then((r) => r.profiles),
		enabled: !!getCurrentUserId() && (params.q?.length ?? 0) > 0,
		staleTime: 60 * 1e3
	});
}
function useMatches() {
	return useQuery({
		queryKey: ["matches"],
		queryFn: () => matchesApi.getMatches().then((r) => r.matches),
		enabled: !!getCurrentUserId(),
		staleTime: 30 * 1e3,
		refetchInterval: 30 * 1e3
	});
}
function useStudyBuddyMatches(subjects, limit = 20) {
	return useQuery({
		queryKey: [
			"study-buddies",
			subjects,
			limit
		],
		queryFn: () => studyBuddyApi.getMatches(subjects, limit).then((r) => r.profiles),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useStartupMatches(limit = 20) {
	return useQuery({
		queryKey: ["startup-matches", limit],
		queryFn: () => startupMatchApi.getMatches(limit).then((r) => r.profiles),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useChatRedirectInfo(profileId) {
	return useQuery({
		queryKey: ["chat-redirect", profileId],
		queryFn: () => chatRedirectApi.getInfo(profileId),
		enabled: !!profileId,
		staleTime: 300 * 1e3
	});
}
function useAdminStats() {
	return useQuery({
		queryKey: ["admin", "stats"],
		queryFn: () => adminApi.getStats().then((r) => r.stats),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useAdminUsers(page = 1, limit = 50, search = "") {
	return useQuery({
		queryKey: [
			"admin",
			"users",
			page,
			limit,
			search
		],
		queryFn: () => adminApi.getUsers(page, limit, search).then((r) => r.users),
		enabled: !!getCurrentUserId(),
		staleTime: 60 * 1e3
	});
}
function useAdminReports(status = "pending") {
	return useQuery({
		queryKey: [
			"admin",
			"reports",
			status
		],
		queryFn: () => adminApi.getReports(status).then((r) => r.reports),
		enabled: !!getCurrentUserId(),
		staleTime: 30 * 1e3
	});
}
function useAdminUpdateReport() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, status, adminNotes }) => adminApi.updateReport(id, status, adminNotes),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
		}
	});
}
function useAdminSuspendUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, reason }) => adminApi.suspendUser(id, reason),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		}
	});
}
function useAdminUnsuspendUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminApi.unsuspendUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		}
	});
}
function useAdminVerifyUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => adminApi.verifyUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
		}
	});
}
//#endregion
export { useSentFriendRequests as A, usePrompts as C, useRsvpToEvent as D, useRespondToFriendRequest as E, useUpsertPrompt as F, useStudyBuddyMatches as M, useUpdateProfile as N, useSearchProfiles as O, useUploadPhoto as P, useProfile as S, useReorderPhotos as T, useMatches as _, useAdminUpdateReport as a, useMyRsvps as b, useChatRedirectInfo as c, useDeletePrompt as d, useEvents as f, useMarkNotificationRead as g, useMarkAllNotificationsRead as h, useAdminUnsuspendUser as i, useStartupMatches as j, useSendFriendRequest as k, useDailyPicks as l, useFriends as m, useAdminStats as n, useAdminUsers as o, useFriendRequests as p, useAdminSuspendUser as r, useAdminVerifyUser as s, useAdminReports as t, useDeletePhoto as u, useMyProfile as v, useRemoveFriend as w, useNotifications as x, useMyPrompts as y };
