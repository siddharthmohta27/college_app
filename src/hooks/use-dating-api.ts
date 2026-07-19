import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { firebaseAuth } from "@/lib/firebase";
import {
  profileApi,
  photosApi,
  promptsApi,
  promptLikesApi,
  photoLikesApi,
  friendsApi,
  blocksApi,
  notificationsApi,
  compatibilityApi,
  eventsApi,
  savedProfilesApi,
  dailyPicksApi,
  conversationStartersApi,
  badgesApi,
  searchApi,
  discoveryApi,
  studyBuddyApi,
  startupMatchApi,
  chatRedirectApi,
  adminApi,
} from "@/lib/dating-api";
import type {
  DatingProfile,
  ProfilePhoto,
  ProfilePrompt,
  FriendRequest,
  Friend,
  Notification,
  CompatibilityScore,
  Event,
  EventRsvp,
  SavedProfile,
  DailyPick,
  ConversationStarter,
  ProfileBadge,
  ChatRedirectInfo,
  Match,
  AdminStats,
  AdminUser,
  Report,
} from "@/lib/dating-types";

// ──────────────────────────────────────────────────────────────
// Auth Helper
// ──────────────────────────────────────────────────────────────
function getCurrentUserId(): string | null {
  return firebaseAuth.currentUser?.uid ?? null;
}

// ──────────────────────────────────────────────────────────────
// Profile Hooks
// ──────────────────────────────────────────────────────────────
export function useMyProfile() {
  return useQuery({
    queryKey: ["dating-profile", "me"],
    queryFn: () => profileApi.getMe().then((r) => r.profile),
    enabled: !!getCurrentUserId(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfile(profileId: string | number) {
  return useQuery({
    queryKey: ["dating-profile", profileId],
    queryFn: () => profileApi.getById(String(profileId)).then((r) => r.profile),
    enabled: !!profileId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<DatingProfile>) => profileApi.updateMe(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["dating-profile", "me"], data.profile);
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Photos Hooks
// ──────────────────────────────────────────────────────────────
export function useMyPhotos() {
  return useQuery({
    queryKey: ["dating-photos", "me"],
    queryFn: () => photosApi.getMine().then((r) => r.photos),
    enabled: !!getCurrentUserId(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof photosApi.upload>[0]) => photosApi.upload(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

export function useUpdatePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof photosApi.update>[1] }) =>
      photosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => photosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

export function useReorderPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photoOrders: Array<{ id: number; display_order: number }>) => photosApi.reorder(photoOrders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-photos", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Prompts Hooks
// ──────────────────────────────────────────────────────────────
export function usePrompts() {
  return useQuery({
    queryKey: ["dating-prompts"],
    queryFn: () => promptsApi.getAll().then((r) => r.prompts),
    staleTime: 30 * 60 * 1000,
  });
}

export function useMyPrompts() {
  return useQuery({
    queryKey: ["dating-prompts", "me"],
    queryFn: () => promptsApi.getMine().then((r) => r.prompts),
    enabled: !!getCurrentUserId(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpsertPrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof promptsApi.upsert>[0]) => promptsApi.upsert(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-prompts", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

export function useDeletePrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (promptId: string) => promptsApi.delete(promptId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dating-prompts", "me"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Prompt Likes Hooks
// ──────────────────────────────────────────────────────────────
export function useLikePrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ promptId, targetProfileId }: { promptId: string; targetProfileId: number }) =>
      promptLikesApi.like(promptId, targetProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt-likes"] });
    },
  });
}

export function useUnlikePrompt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ promptId, targetProfileId }: { promptId: string; targetProfileId: number }) =>
      promptLikesApi.unlike(promptId, targetProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompt-likes"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Photo Likes Hooks
// ──────────────────────────────────────────────────────────────
export function useLikePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ photoId, targetProfileId }: { photoId: string; targetProfileId: number }) =>
      photoLikesApi.like(photoId, targetProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-likes"] });
    },
  });
}

export function useUnlikePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ photoId, targetProfileId }: { photoId: string; targetProfileId: number }) =>
      photoLikesApi.unlike(photoId, targetProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photo-likes"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Friends Hooks
// ──────────────────────────────────────────────────────────────
export function useFriendRequests() {
  return useQuery({
    queryKey: ["friend-requests", "incoming"],
    queryFn: () => friendsApi.getRequests().then((r) => r.requests),
    enabled: !!getCurrentUserId(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useSentFriendRequests() {
  return useQuery({
    queryKey: ["friend-requests", "sent"],
    queryFn: () => friendsApi.getSentRequests().then((r) => r.requests),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

export function useFriends() {
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => friendsApi.getFriends().then((r) => r.friends),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

export function useSendFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (receiverProfileId: number) => friendsApi.sendRequest(receiverProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests", "sent"] });
    },
  });
}

export function useRespondToFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, action }: { requestId: string; action: "accept" | "reject" }) =>
      friendsApi.respond(requestId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friend-requests", "incoming"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

export function useRemoveFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendId: string) => friendsApi.remove(friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["dating-profile", "me"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Blocks Hooks
// ──────────────────────────────────────────────────────────────
export function useBlockUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blockedProfileId, reason }: { blockedProfileId: number; reason?: string }) =>
      blocksApi.block(blockedProfileId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["discovery"] });
    },
  });
}

export function useUnblockUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blockedProfileId: string) => blocksApi.unblock(blockedProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
    },
  });
}

export function useBlockedUsers() {
  return useQuery({
    queryKey: ["blocks"],
    queryFn: () => blocksApi.getBlocked().then((r) => r.blocked),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Notifications Hooks
// ──────────────────────────────────────────────────────────────
export function useNotifications(limit = 50, unreadOnly = false) {
  return useQuery({
    queryKey: ["notifications", limit, unreadOnly],
    queryFn: () => notificationsApi.get(limit, unreadOnly),
    enabled: !!getCurrentUserId(),
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationsApi.getUnreadCount().then((r) => r.count),
    enabled: !!getCurrentUserId(),
    staleTime: 15 * 1000,
    refetchInterval: 30 * 1000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Compatibility Hooks
// ──────────────────────────────────────────────────────────────
export function useCompatibility(profileId: string | number) {
  return useQuery({
    queryKey: ["compatibility", profileId],
    queryFn: () => compatibilityApi.getWithProfile(String(profileId)).then((r) => r.score),
    enabled: !!profileId,
    staleTime: 60 * 60 * 1000,
  });
}

export function useTopCompatibility(limit = 20) {
  return useQuery({
    queryKey: ["compatibility", "top", limit],
    queryFn: () => compatibilityApi.getTop(limit).then((r) => r.scores),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Events Hooks
// ──────────────────────────────────────────────────────────────
export function useEvents(type?: string, upcomingOnly = true) {
  return useQuery({
    queryKey: ["events", type, upcomingOnly],
    queryFn: () => eventsApi.get(type, upcomingOnly).then((r) => r.events),
    enabled: !!getCurrentUserId(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRsvpToEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, status }: { eventId: string; status?: string }) =>
      eventsApi.rsvp(eventId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-rsvps"] });
    },
  });
}

export function useEventRsvps(eventId: string) {
  return useQuery({
    queryKey: ["event-rsvps", eventId],
    queryFn: () => eventsApi.getRsvps(eventId).then((r) => r.rsvps),
    enabled: !!eventId,
    staleTime: 60 * 1000,
  });
}

export function useMyRsvps() {
  return useQuery({
    queryKey: ["my-rsvps"],
    queryFn: () => eventsApi.getMyRsvps().then((r) => r.rsvps),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Saved Profiles Hooks
// ──────────────────────────────────────────────────────────────
export function useSavedProfiles() {
  return useQuery({
    queryKey: ["saved-profiles"],
    queryFn: () => savedProfilesApi.getSaved().then((r) => r.saved),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

export function useSaveProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedProfileId: number) => savedProfilesApi.save(savedProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-profiles"] });
    },
  });
}

export function useUnsaveProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedProfileId: string) => savedProfilesApi.unsave(savedProfileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-profiles"] });
    },
  });
}

export function useIsProfileSaved(savedProfileId: string | number) {
  return useQuery({
    queryKey: ["saved-profiles", "check", savedProfileId],
    queryFn: () => savedProfilesApi.check(String(savedProfileId)).then((r) => r.isSaved),
    enabled: !!getCurrentUserId() && !!savedProfileId,
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Daily Picks Hooks
// ──────────────────────────────────────────────────────────────
export function useDailyPicks(date?: string) {
  return useQuery({
    queryKey: ["daily-picks", date ?? "today"],
    queryFn: () => dailyPicksApi.get(date).then((r) => r.picks),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Conversation Starters Hooks
// ──────────────────────────────────────────────────────────────
export function useConversationStarters(matchId: string) {
  return useQuery({
    queryKey: ["conversation-starters", matchId],
    queryFn: () => conversationStartersApi.getForMatch(matchId).then((r) => r.starters),
    enabled: !!matchId,
    staleTime: 60 * 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Badges Hooks
// ──────────────────────────────────────────────────────────────
export function useBadgeTypes() {
  return useQuery({
    queryKey: ["badge-types"],
    queryFn: () => badgesApi.getAll().then((r) => r.badges),
    staleTime: 30 * 60 * 1000,
  });
}

export function useMyBadges() {
  return useQuery({
    queryKey: ["badges", "me"],
    queryFn: () => badgesApi.getMine().then((r) => r.badges),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Search Hooks
// ──────────────────────────────────────────────────────────────
export function useSearchProfiles(params: Parameters<typeof searchApi.search>[0]) {
  return useQuery({
    queryKey: ["search", params],
    queryFn: () => searchApi.search(params).then((r) => r.profiles),
    enabled: !!getCurrentUserId() && (params.q?.length ?? 0) > 0,
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Discovery Hooks
// ──────────────────────────────────────────────────────────────
export function useDiscoveryTab(
  tab: string,
  filters?: { branch?: string; year?: string; interests?: string[] },
  limit = 20,
  offset = 0
) {
  return useQuery({
    queryKey: ["discovery", tab, filters, limit, offset],
    queryFn: () => discoveryApi.getTab(tab, filters, limit, offset).then((r) => r.profiles),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
    placeholderData: (previous) => previous,
  });
}

export function useRecommendedProfiles(limit = 10) {
  return useQuery({
    queryKey: ["discovery", "recommended", limit],
    queryFn: () => discoveryApi.getRecommended(limit).then((r) => r.profiles),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Study Buddy Hooks
// ──────────────────────────────────────────────────────────────
export function useStudyBuddyMatches(subjects?: string[], limit = 20) {
  return useQuery({
    queryKey: ["study-buddies", subjects, limit],
    queryFn: () => studyBuddyApi.getMatches(subjects, limit).then((r) => r.profiles),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Startup Match Hooks
// ──────────────────────────────────────────────────────────────
export function useStartupMatches(limit = 20) {
  return useQuery({
    queryKey: ["startup-matches", limit],
    queryFn: () => startupMatchApi.getMatches(limit).then((r) => r.profiles),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Chat Redirect Hooks
// ──────────────────────────────────────────────────────────────
export function useChatRedirectInfo(profileId: string) {
  return useQuery({
    queryKey: ["chat-redirect", profileId],
    queryFn: () => chatRedirectApi.getInfo(profileId),
    enabled: !!profileId,
    staleTime: 5 * 60 * 1000,
  });
}

// ──────────────────────────────────────────────────────────────
// Admin Hooks
// ──────────────────────────────────────────────────────────────
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats().then((r) => r.stats),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

export function useAdminUsers(page = 1, limit = 50, search = "") {
  return useQuery({
    queryKey: ["admin", "users", page, limit, search],
    queryFn: () => adminApi.getUsers(page, limit, search).then((r) => r.users),
    enabled: !!getCurrentUserId(),
    staleTime: 60 * 1000,
  });
}

export function useAdminReports(status = "pending") {
  return useQuery({
    queryKey: ["admin", "reports", status],
    queryFn: () => adminApi.getReports(status).then((r) => r.reports),
    enabled: !!getCurrentUserId(),
    staleTime: 30 * 1000,
  });
}

export function useAdminUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) =>
      adminApi.updateReport(id, status, adminNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
    },
  });
}

export function useAdminSuspendUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminApi.suspendUser(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useAdminUnsuspendUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.unsuspendUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useAdminVerifyUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.verifyUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}