const express = require("express");
const router = express.Router();
const { requireAuth, optionalAuth } = require("../middleware/auth");
const { pool } = require("../config/db");
const {
  // Profile
  getDatingProfileByAuthId,
  getDatingProfileById,
  updateDatingProfile,
  // Photos
  addProfilePhoto,
  getProfilePhotos,
  updateProfilePhoto,
  deleteProfilePhoto,
  reorderProfilePhotos,
  // Prompts
  getActivePrompts,
  getProfilePrompts,
  upsertProfilePrompt,
  deleteProfilePrompt,
  // Prompt Likes
  likePrompt,
  unlikePrompt,
  getPromptLikesForProfile,
  // Photo Likes
  likePhoto,
  unlikePhoto,
  getPhotoLikesForProfile,
  // Friends
  sendFriendRequest,
  respondToFriendRequest,
  getFriendRequests,
  getSentFriendRequests,
  getFriends,
  removeFriend,
  // Blocks
  blockUser,
  unblockUser,
  getBlockedUsers,
  // Reports
  createReport,
  getReports,
  updateReportStatus,
  // Notifications
  createNotification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadNotificationCount,
  // Compatibility
  upsertCompatibilityScore,
  getCompatibilityScore,
  getTopCompatibilityScores,
  // Events
  getEvents,
  rsvpToEvent,
  getEventRsvps,
  getUserEventRsvps,
  // Saved Profiles
  saveProfile,
  unsaveProfile,
  getSavedProfiles,
  isProfileSaved,
  // Daily Picks
  getDailyPicks,
  setDailyPicks,
  // Conversation Starters
  createConversationStarters,
  getConversationStarters,
  // Badges
  awardBadge,
  getProfileBadges,
  getAllBadgeTypes,
  // Campus Graph
  getCampusGraphEdges,
  getMutualConnections,
  // Search
  searchProfiles,
  // Discovery
  getDiscoveryProfiles,
  getRecommendedProfiles,
  // Study Buddy
  getStudyBuddyMatches,
  // Startup
  getStartupMatches,
  // Chat Redirect
  getChatRedirectInfo,
  createOrGetDMChannel,
  // Admin
  getAdminStats,
  getAllUsersForAdmin,
  suspendUser,
  unsuspendUser,
  verifyUser,
} = require("../config/db");

// ──────────────────────────────────────────────────────────────
// PROFILE
// ──────────────────────────────────────────────────────────────

// GET /api/dating/profile/me - Get current user's full profile
router.get("/profile/me", requireAuth, async (req, res) => {
  try {
    const firebaseUid = req.user.id;
    const profile = await getDatingProfileByAuthId(firebaseUid);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const [photos, prompts] = await Promise.all([
      getProfilePhotos(profile.id),
      getProfilePrompts(profile.id),
    ]);
    res.json({ profile: { ...profile, photos, prompts } });
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PUT /api/dating/profile/me - Update current user's profile
router.put("/profile/me", requireAuth, async (req, res) => {
  try {
    const firebaseUid = req.user.id;
    const profile = await getDatingProfileByAuthId(firebaseUid);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const updated = await updateDatingProfile(profile.id, req.body);
    res.json({ profile: updated });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// GET /api/dating/profile/:id - Get public profile by ID
router.get("/profile/:id", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    const targetProfile = await getDatingProfileById(req.params.id);
    if (!targetProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    // Check privacy settings
    if (targetProfile.is_incognito && targetProfile.id !== currentProfile?.id) {
      return res.status(403).json({ error: "Profile is private" });
    }
    // Check blocks
    const isBlocked = await require("../config/db").isBlocked(currentProfile?.id, targetProfile.id);
    if (isBlocked) {
      return res.status(403).json({ error: "Profile not accessible" });
    }
    const [photos, prompts, badges] = await Promise.all([
      getProfilePhotos(targetProfile.id),
      getProfilePrompts(targetProfile.id),
      getProfileBadges(targetProfile.id),
    ]);
    res.json({ profile: { ...targetProfile, photos, prompts, badges } });
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ──────────────────────────────────────────────────────────────
// PHOTOS
// ──────────────────────────────────────────────────────────────

// POST /api/dating/photos - Upload photo (max 3)
router.post("/photos", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const existingPhotos = await getProfilePhotos(profile.id);
    if (existingPhotos.length >= 3) {
      return res.status(400).json({ error: "Maximum 3 photos allowed" });
    }

    const { url, storage_path, is_main = false, width, height, file_size, mime_type } = req.body;
    if (!url || !storage_path) {
      return res.status(400).json({ error: "url and storage_path required" });
    }

    const display_order = existingPhotos.length;
    const photo = await addProfilePhoto(profile.id, {
      url,
      storage_path,
      is_main,
      display_order,
      width,
      height,
      file_size,
      mime_type,
    });
    res.status(201).json({ photo });
  } catch (err) {
    console.error("Error adding photo:", err.message);
    res.status(500).json({ error: "Failed to add photo" });
  }
});

// GET /api/dating/photos - Get current user's photos
router.get("/photos", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    const photos = await getProfilePhotos(profile.id);
    res.json({ photos });
  } catch (err) {
    console.error("Error fetching photos:", err.message);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

// PUT /api/dating/photos/:id - Update photo (main, order)
router.put("/photos/:id", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const photos = await getProfilePhotos(profile.id);
    const photo = photos.find((p) => p.id === parseInt(req.params.id));
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const updated = await updateProfilePhoto(req.params.id, req.body);
    res.json({ photo: updated });
  } catch (err) {
    console.error("Error updating photo:", err.message);
    res.status(500).json({ error: "Failed to update photo" });
  }
});

// DELETE /api/dating/photos/:id - Delete photo
router.delete("/photos/:id", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const photos = await getProfilePhotos(profile.id);
    const photo = photos.find((p) => p.id === parseInt(req.params.id));
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    await deleteProfilePhoto(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting photo:", err.message);
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

// PUT /api/dating/photos/reorder - Reorder photos
router.put("/photos/reorder", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const { photoOrders } = req.body;
    if (!Array.isArray(photoOrders)) {
      return res.status(400).json({ error: "photoOrders array required" });
    }

    const photos = await reorderProfilePhotos(profile.id, photoOrders);
    res.json({ photos });
  } catch (err) {
    console.error("Error reordering photos:", err.message);
    res.status(500).json({ error: "Failed to reorder photos" });
  }
});

// ──────────────────────────────────────────────────────────────
// PROMPTS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/prompts - Get all active prompts
router.get("/prompts", requireAuth, async (req, res) => {
  try {
    const prompts = await getActivePrompts();
    res.json({ prompts });
  } catch (err) {
    console.error("Error fetching prompts:", err.message);
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// GET /api/dating/prompts/me - Get current user's prompt answers
router.get("/prompts/me", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    const prompts = await getProfilePrompts(profile.id);
    res.json({ prompts });
  } catch (err) {
    console.error("Error fetching user prompts:", err.message);
    res.status(500).json({ error: "Failed to fetch prompts" });
  }
});

// POST /api/dating/prompts/me - Create/update prompt answer (max 3)
router.post("/prompts/me", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const { prompt_id, answer, display_order = 0 } = req.body;
    if (!prompt_id || !answer) {
      return res.status(400).json({ error: "prompt_id and answer required" });
    }

    const existing = await getProfilePrompts(profile.id);
    if (existing.length >= 3 && !existing.some((p) => p.prompt_id === prompt_id)) {
      return res.status(400).json({ error: "Maximum 3 prompts allowed" });
    }

    const prompt = await upsertProfilePrompt(profile.id, prompt_id, answer, display_order);
    res.json({ prompt });
  } catch (err) {
    console.error("Error upserting prompt:", err.message);
    res.status(500).json({ error: "Failed to save prompt" });
  }
});

// DELETE /api/dating/prompts/me/:promptId - Delete prompt answer
router.delete("/prompts/me/:promptId", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await deleteProfilePrompt(profile.id, req.params.promptId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting prompt:", err.message);
    res.status(500).json({ error: "Failed to delete prompt" });
  }
});

// ──────────────────────────────────────────────────────────────
// PROMPT LIKES
// ──────────────────────────────────────────────────────────────

// POST /api/dating/prompts/:promptId/like - Like a specific prompt
router.post("/prompts/:promptId/like", requireAuth, async (req, res) => {
  try {
    const likerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!likerProfile) return res.status(404).json({ error: "Profile not found" });

    const { targetProfileId } = req.body;
    if (!targetProfileId) {
      return res.status(400).json({ error: "targetProfileId required" });
    }

    const isBlocked = await require("../config/db").isBlocked(likerProfile.id, targetProfileId);
    if (isBlocked) return res.status(403).json({ error: "Cannot like this profile" });

    const like = await likePrompt(likerProfile.id, targetProfileId, req.params.promptId);
    if (like) {
      await createNotification(
        targetProfileId,
        "prompt_like",
        "New Prompt Like",
        `${likerProfile.name} liked your prompt answer`,
        { likerProfileId: likerProfile.id, promptId: req.params.promptId },
      );
    }
    res.json({ like });
  } catch (err) {
    console.error("Error liking prompt:", err.message);
    res.status(500).json({ error: "Failed to like prompt" });
  }
});

// DELETE /api/dating/prompts/:promptId/like - Unlike a prompt
router.delete("/prompts/:promptId/like", requireAuth, async (req, res) => {
  try {
    const likerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!likerProfile) return res.status(404).json({ error: "Profile not found" });

    const { targetProfileId } = req.body;
    if (!targetProfileId) {
      return res.status(400).json({ error: "targetProfileId required" });
    }

    await unlikePrompt(likerProfile.id, targetProfileId, req.params.promptId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error unliking prompt:", err.message);
    res.status(500).json({ error: "Failed to unlike prompt" });
  }
});

// ──────────────────────────────────────────────────────────────
// PHOTO LIKES
// ──────────────────────────────────────────────────────────────

// POST /api/dating/photos/:photoId/like - Like a specific photo
router.post("/photos/:photoId/like", requireAuth, async (req, res) => {
  try {
    const likerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!likerProfile) return res.status(404).json({ error: "Profile not found" });

    const { targetProfileId } = req.body;
    if (!targetProfileId) {
      return res.status(400).json({ error: "targetProfileId required" });
    }

    const isBlocked = await require("../config/db").isBlocked(likerProfile.id, targetProfileId);
    if (isBlocked) return res.status(403).json({ error: "Cannot like this profile" });

    const like = await likePhoto(likerProfile.id, targetProfileId, req.params.photoId);
    if (like) {
      await createNotification(
        targetProfileId,
        "photo_like",
        "New Photo Like",
        `${likerProfile.name} liked your photo`,
        { likerProfileId: likerProfile.id, photoId: req.params.photoId },
      );
    }
    res.json({ like });
  } catch (err) {
    console.error("Error liking photo:", err.message);
    res.status(500).json({ error: "Failed to like photo" });
  }
});

// DELETE /api/dating/photos/:photoId/like - Unlike a photo
router.delete("/photos/:photoId/like", requireAuth, async (req, res) => {
  try {
    const likerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!likerProfile) return res.status(404).json({ error: "Profile not found" });

    const { targetProfileId } = req.body;
    if (!targetProfileId) {
      return res.status(400).json({ error: "targetProfileId required" });
    }

    await unlikePhoto(likerProfile.id, targetProfileId, req.params.photoId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error unliking photo:", err.message);
    res.status(500).json({ error: "Failed to unlike photo" });
  }
});

// ──────────────────────────────────────────────────────────────
// FRIENDS
// ──────────────────────────────────────────────────────────────

// POST /api/dating/friends/request - Send friend request
router.post("/friends/request", requireAuth, async (req, res) => {
  try {
    const senderProfile = await getDatingProfileByAuthId(req.user.id);
    if (!senderProfile) return res.status(404).json({ error: "Profile not found" });

    const { receiverProfileId } = req.body;
    if (!receiverProfileId) {
      return res.status(400).json({ error: "receiverProfileId required" });
    }
    if (senderProfile.id === receiverProfileId) {
      return res.status(400).json({ error: "Cannot send request to yourself" });
    }

    const isBlocked = await require("../config/db").isBlocked(senderProfile.id, receiverProfileId);
    if (isBlocked) return res.status(403).json({ error: "Cannot send request" });

    const request = await sendFriendRequest(senderProfile.id, receiverProfileId);

    await createNotification(
      receiverProfileId,
      "friend_request",
      "New Friend Request",
      `${senderProfile.name} sent you a friend request`,
      { senderProfileId: senderProfile.id },
    );

    res.status(201).json({ request });
  } catch (err) {
    console.error("Error sending friend request:", err.message);
    res.status(500).json({ error: "Failed to send friend request" });
  }
});

// PUT /api/dating/friends/request/:id - Accept/reject friend request
router.put("/friends/request/:id", requireAuth, async (req, res) => {
  try {
    const receiverProfile = await getDatingProfileByAuthId(req.user.id);
    if (!receiverProfile) return res.status(404).json({ error: "Profile not found" });

    const { action } = req.body;
    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ error: "action must be 'accept' or 'reject'" });
    }

    const result = await respondToFriendRequest(req.params.id, receiverProfile.id, action);
    res.json(result);
  } catch (err) {
    console.error("Error responding to friend request:", err.message);
    res.status(500).json({ error: "Failed to respond to request" });
  }
});

// GET /api/dating/friends/requests - Get incoming friend requests
router.get("/friends/requests", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const requests = await getFriendRequests(profile.id);
    res.json({ requests });
  } catch (err) {
    console.error("Error fetching friend requests:", err.message);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

// GET /api/dating/friends/requests/sent - Get sent friend requests
router.get("/friends/requests/sent", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const requests = await getSentFriendRequests(profile.id);
    res.json({ requests });
  } catch (err) {
    console.error("Error fetching sent requests:", err.message);
    res.status(500).json({ error: "Failed to fetch sent requests" });
  }
});

// GET /api/dating/friends - Get friends list
router.get("/friends", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const friends = await getFriends(profile.id);
    res.json({ friends });
  } catch (err) {
    console.error("Error fetching friends:", err.message);
    res.status(500).json({ error: "Failed to fetch friends" });
  }
});

// DELETE /api/dating/friends/:friendId - Remove friend
router.delete("/friends/:friendId", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await removeFriend(profile.id, req.params.friendId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error removing friend:", err.message);
    res.status(500).json({ error: "Failed to remove friend" });
  }
});

// ──────────────────────────────────────────────────────────────
// BLOCKS
// ──────────────────────────────────────────────────────────────

// POST /api/dating/blocks - Block user
router.post("/blocks", requireAuth, async (req, res) => {
  try {
    const blockerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!blockerProfile) return res.status(404).json({ error: "Profile not found" });

    const { blockedProfileId, reason } = req.body;
    if (!blockedProfileId) {
      return res.status(400).json({ error: "blockedProfileId required" });
    }
    if (blockerProfile.id === blockedProfileId) {
      return res.status(400).json({ error: "Cannot block yourself" });
    }

    const block = await blockUser(blockerProfile.id, blockedProfileId, reason);
    res.json({ block });
  } catch (err) {
    console.error("Error blocking user:", err.message);
    res.status(500).json({ error: "Failed to block user" });
  }
});

// DELETE /api/dating/blocks/:blockedProfileId - Unblock user
router.delete("/blocks/:blockedProfileId", requireAuth, async (req, res) => {
  try {
    const blockerProfile = await getDatingProfileByAuthId(req.user.id);
    if (!blockerProfile) return res.status(404).json({ error: "Profile not found" });

    await unblockUser(blockerProfile.id, req.params.blockedProfileId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error unblocking user:", err.message);
    res.status(500).json({ error: "Failed to unblock user" });
  }
});

// GET /api/dating/blocks - Get blocked users
router.get("/blocks", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const blocked = await getBlockedUsers(profile.id);
    res.json({ blocked });
  } catch (err) {
    console.error("Error fetching blocked users:", err.message);
    res.status(500).json({ error: "Failed to fetch blocked users" });
  }
});

// ──────────────────────────────────────────────────────────────
// REPORTS
// ──────────────────────────────────────────────────────────────

// POST /api/dating/reports - Report user
router.post("/reports", requireAuth, async (req, res) => {
  try {
    const reporterProfile = await getDatingProfileByAuthId(req.user.id);
    if (!reporterProfile) return res.status(404).json({ error: "Profile not found" });

    const { reportedProfileId, reason, description } = req.body;
    if (!reportedProfileId || !reason) {
      return res.status(400).json({ error: "reportedProfileId and reason required" });
    }
    if (reporterProfile.id === reportedProfileId) {
      return res.status(400).json({ error: "Cannot report yourself" });
    }

    const report = await createReport(reporterProfile.id, reportedProfileId, reason, description);
    res.status(201).json({ report });
  } catch (err) {
    console.error("Error creating report:", err.message);
    res.status(500).json({ error: "Failed to create report" });
  }
});

// ──────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/notifications - Get notifications
router.get("/notifications", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const limit = parseInt(req.query.limit) || 50;
    const unreadOnly = req.query.unread === "true";
    const notifications = await getNotifications(profile.id, limit, unreadOnly);
    const unreadCount = await getUnreadNotificationCount(profile.id);

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error("Error fetching notifications:", err.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// PUT /api/dating/notifications/:id/read - Mark notification as read
router.put("/notifications/:id/read", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const notification = await markNotificationRead(req.params.id, profile.id);
    res.json({ notification });
  } catch (err) {
    console.error("Error marking notification read:", err.message);
    res.status(500).json({ error: "Failed to mark notification read" });
  }
});

// PUT /api/dating/notifications/read-all - Mark all as read
router.put("/notifications/read-all", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await markAllNotificationsRead(profile.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error marking all notifications read:", err.message);
    res.status(500).json({ error: "Failed to mark all read" });
  }
});

// ──────────────────────────────────────────────────────────────
// COMPATIBILITY
// ──────────────────────────────────────────────────────────────

// GET /api/dating/compatibility/:profileId - Get compatibility with specific profile
router.get("/compatibility/:profileId", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const score = await getCompatibilityScore(currentProfile.id, req.params.profileId);
    res.json({ score });
  } catch (err) {
    console.error("Error fetching compatibility:", err.message);
    res.status(500).json({ error: "Failed to fetch compatibility" });
  }
});

// GET /api/dating/compatibility/top - Get top compatibility scores
router.get("/compatibility/top", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const limit = parseInt(req.query.limit) || 20;
    const scores = await getTopCompatibilityScores(currentProfile.id, limit);
    res.json({ scores });
  } catch (err) {
    console.error("Error fetching top compatibility:", err.message);
    res.status(500).json({ error: "Failed to fetch compatibility scores" });
  }
});

// ──────────────────────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/events - Get events
router.get("/events", requireAuth, async (req, res) => {
  try {
    const type = req.query.type;
    const upcomingOnly = req.query.upcoming !== "false";
    const events = await getEvents(type, upcomingOnly);
    res.json({ events });
  } catch (err) {
    console.error("Error fetching events:", err.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST /api/dating/events/:eventId/rsvp - RSVP to event
router.post("/events/:eventId/rsvp", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const { status = "going" } = req.body;
    const rsvp = await rsvpToEvent(profile.id, req.params.eventId, status);
    res.json({ rsvp });
  } catch (err) {
    console.error("Error RSVPing to event:", err.message);
    res.status(500).json({ error: "Failed to RSVP" });
  }
});

// GET /api/dating/events/rsvps/me - Get my RSVPs  (MUST be before /:eventId/rsvps)
router.get("/events/rsvps/me", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const rsvps = await getUserEventRsvps(profile.id);
    res.json({ rsvps });
  } catch (err) {
    console.error("Error fetching user RSVPs:", err.message);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// GET /api/dating/events/:eventId/rsvps - Get event RSVPs
router.get("/events/:eventId/rsvps", requireAuth, async (req, res) => {
  try {
    const rsvps = await getEventRsvps(req.params.eventId);
    res.json({ rsvps });
  } catch (err) {
    console.error("Error fetching RSVPs:", err.message);
    res.status(500).json({ error: "Failed to fetch RSVPs" });
  }
});

// ──────────────────────────────────────────────────────────────
// SAVED PROFILES
// ──────────────────────────────────────────────────────────────

// POST /api/dating/saved - Save profile
router.post("/saved", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const { savedProfileId } = req.body;
    if (!savedProfileId) {
      return res.status(400).json({ error: "savedProfileId required" });
    }

    const saved = await saveProfile(profile.id, savedProfileId);
    res.json({ saved });
  } catch (err) {
    console.error("Error saving profile:", err.message);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

// DELETE /api/dating/saved/:savedProfileId - Unsave profile
router.delete("/saved/:savedProfileId", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await unsaveProfile(profile.id, req.params.savedProfileId);
    res.json({ success: true });
  } catch (err) {
    console.error("Error unsaving profile:", err.message);
    res.status(500).json({ error: "Failed to unsave profile" });
  }
});

// GET /api/dating/saved - Get saved profiles
router.get("/saved", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const saved = await getSavedProfiles(profile.id);
    res.json({ saved });
  } catch (err) {
    console.error("Error fetching saved profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch saved profiles" });
  }
});

// GET /api/dating/saved/check/:savedProfileId - Check if profile is saved
router.get("/saved/check/:savedProfileId", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const isSaved = await isProfileSaved(profile.id, req.params.savedProfileId);
    res.json({ isSaved });
  } catch (err) {
    console.error("Error checking saved status:", err.message);
    res.status(500).json({ error: "Failed to check saved status" });
  }
});

// ──────────────────────────────────────────────────────────────
// DAILY PICKS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/daily-picks - Get daily picks
router.get("/daily-picks", requireAuth, async (req, res) => {
  try {
    const date = req.query.date;
    const picks = await getDailyPicks(date);
    res.json({ picks });
  } catch (err) {
    console.error("Error fetching daily picks:", err.message);
    res.status(500).json({ error: "Failed to fetch daily picks" });
  }
});

// ──────────────────────────────────────────────────────────────
// CONVERSATION STARTERS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/matches/:matchId/starters - Get conversation starters for match
router.get("/matches/:matchId/starters", requireAuth, async (req, res) => {
  try {
    const starters = await getConversationStarters(req.params.matchId);
    res.json({ starters });
  } catch (err) {
    console.error("Error fetching conversation starters:", err.message);
    res.status(500).json({ error: "Failed to fetch conversation starters" });
  }
});

// ──────────────────────────────────────────────────────────────
// BADGES
// ──────────────────────────────────────────────────────────────

// GET /api/dating/badges - Get all badge types
router.get("/badges", requireAuth, async (req, res) => {
  try {
    const badges = await getAllBadgeTypes();
    res.json({ badges });
  } catch (err) {
    console.error("Error fetching badge types:", err.message);
    res.status(500).json({ error: "Failed to fetch badge types" });
  }
});

// GET /api/dating/badges/me - Get my badges
router.get("/badges/me", requireAuth, async (req, res) => {
  try {
    const profile = await getDatingProfileByAuthId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const badges = await getProfileBadges(profile.id);
    res.json({ badges });
  } catch (err) {
    console.error("Error fetching user badges:", err.message);
    res.status(500).json({ error: "Failed to fetch badges" });
  }
});

// ──────────────────────────────────────────────────────────────
// SEARCH
// ──────────────────────────────────────────────────────────────

// GET /api/dating/search - Search profiles
router.get("/search", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const query = req.query.q || "";
    const filters = {
      branch: req.query.branch,
      year: req.query.year,
      interests: req.query.interests ? req.query.interests.split(",") : undefined,
      clubs: req.query.clubs ? req.query.clubs.split(",") : undefined,
      skills: req.query.skills ? req.query.skills.split(",") : undefined,
      relationship_preference: req.query.relationship_preference
        ? req.query.relationship_preference.split(",")
        : undefined,
      gender: req.query.gender,
      startup_looking_for: req.query.startup_looking_for === "true",
    };
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const profiles = await searchProfiles(query, filters, limit, offset, currentProfile.id);
    res.json({ profiles });
  } catch (err) {
    console.error("Error searching profiles:", err.message);
    res.status(500).json({ error: "Failed to search profiles" });
  }
});

// ──────────────────────────────────────────────────────────────
// DISCOVERY / RECOMMENDATIONS
// ──────────────────────────────────────────────────────────────

// GET /api/dating/discover/:tab - Get discovery profiles by tab
router.get("/discover/:tab", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const tab = req.params.tab;
    const validTabs = [
      "recommended",
      "friends",
      "dating",
      "study_buddy",
      "networking",
      "startup_partner",
      "new_students",
      "nearby",
      "trending",
    ];
    if (!validTabs.includes(tab)) {
      return res.status(400).json({ error: "Invalid tab" });
    }

    const filters = {
      branch: req.query.branch,
      year: req.query.year,
      interests: req.query.interests ? req.query.interests.split(",") : undefined,
    };
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    let profiles;
    if (tab === "recommended") {
      profiles = await getRecommendedProfiles(currentProfile.id, limit);
    } else {
      profiles = await getDiscoveryProfiles(currentProfile.id, tab, filters, limit, offset);
    }
    res.json({ profiles, tab });
  } catch (err) {
    console.error("Error fetching discovery profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch discovery profiles" });
  }
});

// GET /api/dating/recommended - Get smart recommendations
router.get("/recommended", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const limit = parseInt(req.query.limit) || 10;
    const profiles = await getRecommendedProfiles(currentProfile.id, limit);
    res.json({ profiles });
  } catch (err) {
    console.error("Error fetching recommended profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch recommended profiles" });
  }
});

// ──────────────────────────────────────────────────────────────
// STUDY BUDDY MATCHING
// ──────────────────────────────────────────────────────────────

// GET /api/dating/study-buddies - Get study buddy matches
router.get("/study-buddies", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const subjects = req.query.subjects ? req.query.subjects.split(",") : [];
    const limit = parseInt(req.query.limit) || 20;

    const profiles = await getStudyBuddyMatches(currentProfile.id, { subjects }, limit);
    res.json({ profiles });
  } catch (err) {
    console.error("Error fetching study buddy matches:", err.message);
    res.status(500).json({ error: "Failed to fetch study buddy matches" });
  }
});

// ──────────────────────────────────────────────────────────────
// STARTUP MATCHING
// ──────────────────────────────────────────────────────────────

// GET /api/dating/startup - Get startup co-founder matches
router.get("/startup", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const limit = parseInt(req.query.limit) || 20;
    const profiles = await getStartupMatches(currentProfile.id, {}, limit);
    res.json({ profiles });
  } catch (err) {
    console.error("Error fetching startup matches:", err.message);
    res.status(500).json({ error: "Failed to fetch startup matches" });
  }
});

// ──────────────────────────────────────────────────────────────
// CHAT REDIRECT
// ──────────────────────────────────────────────────────────────

// GET /api/dating/chat/:profileId - Get chat redirect info
router.get("/chat/:profileId", requireAuth, async (req, res) => {
  try {
    const redirectInfo = await getChatRedirectInfo(req.user.id, req.params.profileId);
    if (!redirectInfo) {
      return res.status(404).json({ error: "Could not find chat information" });
    }
    res.json(redirectInfo);
  } catch (err) {
    console.error("Error getting chat redirect info:", err.message);
    res.status(500).json({ error: "Failed to get chat redirect info" });
  }
});

// ──────────────────────────────────────────────────────────────
// SWIPE / LIKE / MATCH
// ──────────────────────────────────────────────────────────────

// GET /api/dating/discover - Get profiles for swiping (exclude already swiped)
router.get("/discover", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const profiles = await pool.query(
      `
      SELECT dp.*, pp.url as main_photo_url
      FROM dating_profiles dp
      LEFT JOIN profile_photos pp ON pp.profile_id = dp.id AND pp.is_main = true
      WHERE dp.is_incognito = false
        AND dp.id != $1
        AND dp.id NOT IN (SELECT swiped_id FROM swipes WHERE swiper_id = $1)
        AND dp.id NOT IN (
          SELECT blocked_profile_id FROM blocks WHERE blocker_profile_id = $1
          UNION
          SELECT blocker_profile_id FROM blocks WHERE blocked_profile_id = $1
        )
      ORDER BY dp.created_at DESC
      LIMIT $2 OFFSET $3
    `,
      [currentProfile.id, limit, offset],
    );

    res.json({ profiles: profiles.rows });
  } catch (err) {
    console.error("Error fetching discover profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

// POST /api/dating/like - Like a profile (check for mutual match)
router.post("/like", requireAuth, async (req, res) => {
  try {
    const { targetProfileId } = req.body;
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });
    if (currentProfile.id === targetProfileId)
      return res.status(400).json({ error: "Cannot like yourself" });

    const blocked = await isBlocked(currentProfile.id, targetProfileId);
    if (blocked) return res.status(403).json({ error: "Cannot like this profile" });

    // Record the like (swipe)
    await pool.query(
      `
      INSERT INTO swipes (swiper_id, swiped_id, action)
      VALUES ($1, $2, 'like')
      ON CONFLICT (swiper_id, swiped_id) DO UPDATE SET action = 'like'
    `,
      [currentProfile.id, targetProfileId],
    );

    // Check for mutual like (match)
    const mutual = await pool.query(
      `
      SELECT 1 FROM swipes WHERE swiper_id = $1 AND swiped_id = $2 AND action = 'like'
    `,
      [targetProfileId, currentProfile.id],
    );

    let isMatch = false;
    let matchId = null;

    if (mutual.rows.length > 0) {
      // Create match
      const [u1, u2] = [
        Math.min(currentProfile.id, targetProfileId),
        Math.max(currentProfile.id, targetProfileId),
      ];
      const matchRes = await pool.query(
        `
        INSERT INTO matches (user1_id, user2_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        RETURNING id
      `,
        [u1, u2],
      );

      if (matchRes.rows.length > 0) {
        isMatch = true;
        matchId = matchRes.rows[0].id;

        // Create campus graph edges
        await pool.query(`SELECT create_match_edge($1, $2)`, [currentProfile.id, targetProfileId]);

        // Create notifications for both users
        await createNotification(
          targetProfileId,
          "match",
          "It's a Match!",
          `${currentProfile.name} liked you back`,
          { matchId, otherProfileId: currentProfile.id },
        );
        await createNotification(
          currentProfile.id,
          "match",
          "It's a Match!",
          `You and ${(await getDatingProfileById(targetProfileId))?.name || "someone"} liked each other`,
          { matchId, otherProfileId: targetProfileId },
        );
      }
    } else {
      // Notify target of like
      const targetProfile = await getDatingProfileById(targetProfileId);
      if (targetProfile) {
        await createNotification(
          targetProfileId,
          "like",
          "New Like",
          `${currentProfile.name} liked your profile`,
          { likerProfileId: currentProfile.id },
        );
      }
    }

    res.json({ isMatch, matchId });
  } catch (err) {
    console.error("Error liking profile:", err.message);
    res.status(500).json({ error: "Failed to like profile" });
  }
});

// POST /api/dating/pass - Pass on a profile
router.post("/pass", requireAuth, async (req, res) => {
  try {
    const { targetProfileId } = req.body;
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    await pool.query(
      `
      INSERT INTO swipes (swiper_id, swiped_id, action)
      VALUES ($1, $2, 'pass')
      ON CONFLICT (swiper_id, swiped_id) DO UPDATE SET action = 'pass'
    `,
      [currentProfile.id, targetProfileId],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error passing profile:", err.message);
    res.status(500).json({ error: "Failed to pass profile" });
  }
});

// GET /api/dating/matches - Get mutual matches
router.get("/matches", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    const matches = await pool.query(
      `
      SELECT m.id, m.matched_at, m.user1_id, m.user2_id,
             dp.id as other_id, dp.name, dp.profile_photo_url, dp.emoji, dp.branch, dp.year, dp.major,
             cs.score as compatibility_score
      FROM matches m
      JOIN dating_profiles dp ON (m.user1_id = dp.id OR m.user2_id = dp.id) AND dp.id != $1
      LEFT JOIN compatibility_scores cs ON 
        (cs.profile1_id = $1 AND cs.profile2_id = dp.id) OR
        (cs.profile2_id = $1 AND cs.profile1_id = dp.id)
      WHERE m.user1_id = $1 OR m.user2_id = $1
      ORDER BY m.matched_at DESC
    `,
      [currentProfile.id],
    );

    res.json({ matches: matches.rows });
  } catch (err) {
    console.error("Error fetching matches:", err.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

// POST /api/dating/undo - Undo last swipe
router.post("/undo", requireAuth, async (req, res) => {
  try {
    const currentProfile = await getDatingProfileByAuthId(req.user.id);
    if (!currentProfile) return res.status(404).json({ error: "Profile not found" });

    // Delete last swipe
    await pool.query(
      `
      DELETE FROM swipes WHERE id = (
        SELECT id FROM swipes WHERE swiper_id = $1 ORDER BY created_at DESC LIMIT 1
      )
    `,
      [currentProfile.id],
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error undoing swipe:", err.message);
    res.status(500).json({ error: "Failed to undo" });
  }
});

// ──────────────────────────────────────────────────────────────
// ADMIN (require admin role - simplified for now)
// ──────────────────────────────────────────────────────────────

// GET /api/dating/admin/stats - Get admin dashboard stats
router.get("/admin/stats", requireAuth, async (req, res) => {
  try {
    // TODO: Add admin role check
    const stats = await getAdminStats();
    res.json({ stats });
  } catch (err) {
    console.error("Error fetching admin stats:", err.message);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});

// GET /api/dating/admin/users - Get all users for admin
router.get("/admin/users", requireAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || "";
    const users = await getAllUsersForAdmin(page, limit, search);
    res.json({ users });
  } catch (err) {
    console.error("Error fetching admin users:", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET /api/dating/admin/reports - Get reports for admin
router.get("/admin/reports", requireAuth, async (req, res) => {
  try {
    const status = req.query.status || "pending";
    const reports = await getReports(status);
    res.json({ reports });
  } catch (err) {
    console.error("Error fetching admin reports:", err.message);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// PUT /api/dating/admin/reports/:reportId - Update report status
router.put("/admin/reports/:reportId", requireAuth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const report = await updateReportStatus(req.params.reportId, status, adminNotes);
    res.json({ report });
  } catch (err) {
    console.error("Error updating report:", err.message);
    res.status(500).json({ error: "Failed to update report" });
  }
});

// PUT /api/dating/admin/users/:profileId/suspend - Suspend user
router.put("/admin/users/:profileId/suspend", requireAuth, async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await suspendUser(req.params.profileId, reason);
    res.json({ user });
  } catch (err) {
    console.error("Error suspending user:", err.message);
    res.status(500).json({ error: "Failed to suspend user" });
  }
});

// PUT /api/dating/admin/users/:profileId/unsuspend - Unsuspend user
router.put("/admin/users/:profileId/unsuspend", requireAuth, async (req, res) => {
  try {
    const user = await unsuspendUser(req.params.profileId);
    res.json({ user });
  } catch (err) {
    console.error("Error unsuspending user:", err.message);
    res.status(500).json({ error: "Failed to unsuspend user" });
  }
});

// PUT /api/dating/admin/users/:profileId/verify - Verify user
router.put("/admin/users/:profileId/verify", requireAuth, async (req, res) => {
  try {
    const user = await verifyUser(req.params.profileId);
    res.json({ user });
  } catch (err) {
    console.error("Error verifying user:", err.message);
    res.status(500).json({ error: "Failed to verify user" });
  }
});

module.exports = router;
