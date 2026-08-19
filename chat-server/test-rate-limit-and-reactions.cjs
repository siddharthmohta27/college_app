// Unit test for rate limiter and single-reaction logic
const assert = require("assert");

console.log("🧪 Testing Chat Rate Limiting & Reaction Logic...");

// 1. Test In-Memory Rate Limiter Logic
const socketRateLimits = new Map();

const RATE_LIMIT_CONFIG = {
  MESSAGE_BURST_MAX: 5,
  MESSAGE_WINDOW_MS: 5000,
  MIN_MESSAGE_INTERVAL_MS: 250,
  DUPLICATE_INTERVAL_MS: 2000,
  COOLDOWN_MS: 4000,
  REACTION_BURST_MAX: 10,
  REACTION_WINDOW_MS: 5000,
};

function checkMessageRateLimit(key, text) {
  const now = Date.now();
  let userLimit = socketRateLimits.get(key);
  if (!userLimit) {
    userLimit = {
      messageTimestamps: [],
      lastMessageText: "",
      lastMessageTime: 0,
      reactionTimestamps: [],
      cooldownUntil: 0,
    };
    socketRateLimits.set(key, userLimit);
  }

  if (now < userLimit.cooldownUntil) {
    const remainingSec = Math.ceil((userLimit.cooldownUntil - now) / 1000);
    return {
      allowed: false,
      reason: `Slow down! You're sending messages too fast. Please wait ${remainingSec}s.`,
      retryAfter: remainingSec,
    };
  }

  if (now - userLimit.lastMessageTime < RATE_LIMIT_CONFIG.MIN_MESSAGE_INTERVAL_MS) {
    return {
      allowed: false,
      reason: "Please wait a moment before sending another message.",
      retryAfter: 1,
    };
  }

  if (
    userLimit.lastMessageText &&
    userLimit.lastMessageText === (text || "").trim() &&
    now - userLimit.lastMessageTime < RATE_LIMIT_CONFIG.DUPLICATE_INTERVAL_MS
  ) {
    return {
      allowed: false,
      reason: "Please avoid sending identical duplicate messages repeatedly.",
      retryAfter: 2,
    };
  }

  userLimit.messageTimestamps = userLimit.messageTimestamps.filter(
    (ts) => now - ts < RATE_LIMIT_CONFIG.MESSAGE_WINDOW_MS
  );

  if (userLimit.messageTimestamps.length >= RATE_LIMIT_CONFIG.MESSAGE_BURST_MAX) {
    userLimit.cooldownUntil = now + RATE_LIMIT_CONFIG.COOLDOWN_MS;
    const remainingSec = Math.ceil(RATE_LIMIT_CONFIG.COOLDOWN_MS / 1000);
    return {
      allowed: false,
      reason: `You're sending messages too fast! Cooldown active for ${remainingSec}s.`,
      retryAfter: remainingSec,
    };
  }

  userLimit.messageTimestamps.push(now);
  userLimit.lastMessageTime = now;
  userLimit.lastMessageText = (text || "").trim();
  return { allowed: true };
}

// Test 1: Sending first message is allowed
const res1 = checkMessageRateLimit("user1", "Hello 1");
assert.strictEqual(res1.allowed, true, "First message should be allowed");

// Test 2: Rapid send (<250ms) is throttled
const res2 = checkMessageRateLimit("user1", "Hello 2");
assert.strictEqual(res2.allowed, false, "Sub-250ms message should be throttled");

// Test 3: Burst limit triggers cooldown after 5 messages
socketRateLimits.clear();
const userKey = "user2";
for (let i = 0; i < 5; i++) {
  const ul = socketRateLimits.get(userKey) || {
    messageTimestamps: [],
    lastMessageText: "",
    lastMessageTime: 0,
    reactionTimestamps: [],
    cooldownUntil: 0,
  };
  ul.lastMessageTime = Date.now() - 300;
  socketRateLimits.set(userKey, ul);
  const r = checkMessageRateLimit(userKey, `Unique message ${i}`);
  assert.strictEqual(r.allowed, true, `Message ${i + 1} within burst should be allowed`);
}

const ul2 = socketRateLimits.get(userKey);
ul2.lastMessageTime = Date.now() - 300;
const res6 = checkMessageRateLimit(userKey, "Message 6");
assert.strictEqual(res6.allowed, false, "6th message in 5s window should be rate limited");
console.log("✅ Message rate limiting logic verified!");

// 2. Test WhatsApp Reaction Single User Logic Simulation
function simulateAddReaction(reactions, currentUserId, emoji) {
  const currentReactions = reactions ? [...reactions.map(r => ({ ...r, users: [...(r.users || [])] }))] : [];
  const userReactionIndex = currentReactions.findIndex(
    (r) => r.users && r.users.includes(currentUserId)
  );

  if (userReactionIndex >= 0) {
    const currentReaction = currentReactions[userReactionIndex];
    if (currentReaction.emoji === emoji) {
      // Toggle off
      const newUsers = currentReaction.users.filter((u) => u !== currentUserId);
      if (newUsers.length === 0 || currentReaction.count <= 1) {
        currentReactions.splice(userReactionIndex, 1);
      } else {
        currentReactions[userReactionIndex] = {
          ...currentReaction,
          count: currentReaction.count - 1,
          users: newUsers,
        };
      }
    } else {
      // Switch reaction
      const oldUsers = currentReaction.users.filter((u) => u !== currentUserId);
      if (oldUsers.length === 0 || currentReaction.count <= 1) {
        currentReactions.splice(userReactionIndex, 1);
      } else {
        currentReactions[userReactionIndex] = {
          ...currentReaction,
          count: currentReaction.count - 1,
          users: oldUsers,
        };
      }

      const targetIdx = currentReactions.findIndex((r) => r.emoji === emoji);
      if (targetIdx >= 0) {
        currentReactions[targetIdx] = {
          ...currentReactions[targetIdx],
          count: currentReactions[targetIdx].count + 1,
          users: [...currentReactions[targetIdx].users, currentUserId],
        };
      } else {
        currentReactions.push({ emoji, count: 1, users: [currentUserId] });
      }
    }
  } else {
    // Add reaction
    const targetIdx = currentReactions.findIndex((r) => r.emoji === emoji);
    if (targetIdx >= 0) {
      currentReactions[targetIdx] = {
        ...currentReactions[targetIdx],
        count: currentReactions[targetIdx].count + 1,
        users: [...currentReactions[targetIdx].users, currentUserId],
      };
    } else {
      currentReactions.push({ emoji, count: 1, users: [currentUserId] });
    }
  }

  return currentReactions;
}

let reactions = [];

// Step A: User 1 reacts with 🔥
reactions = simulateAddReaction(reactions, "user_1", "🔥");
assert.strictEqual(reactions.length, 1);
assert.strictEqual(reactions[0].emoji, "🔥");
assert.strictEqual(reactions[0].count, 1);
assert.deepStrictEqual(reactions[0].users, ["user_1"]);

// Step B: User 2 reacts with 🔥
reactions = simulateAddReaction(reactions, "user_2", "🔥");
assert.strictEqual(reactions.length, 1);
assert.strictEqual(reactions[0].count, 2);
assert.deepStrictEqual(reactions[0].users, ["user_1", "user_2"]);

// Step C: User 1 switches reaction to ❤️ (should reduce 🔥 to 1 and add ❤️ 1)
reactions = simulateAddReaction(reactions, "user_1", "❤️");
assert.strictEqual(reactions.length, 2);
const fire = reactions.find(r => r.emoji === "🔥");
const heart = reactions.find(r => r.emoji === "❤️");
assert.strictEqual(fire.count, 1);
assert.deepStrictEqual(fire.users, ["user_2"]);
assert.strictEqual(heart.count, 1);
assert.deepStrictEqual(heart.users, ["user_1"]);

// Step D: User 1 clicks ❤️ again (should toggle off and remove ❤️)
reactions = simulateAddReaction(reactions, "user_1", "❤️");
assert.strictEqual(reactions.length, 1);
assert.strictEqual(reactions[0].emoji, "🔥");
assert.strictEqual(reactions[0].count, 1);
assert.deepStrictEqual(reactions[0].users, ["user_2"]);

// Step E: User 2 clicks 🔥 again (should toggle off, leaving 0 reactions)
reactions = simulateAddReaction(reactions, "user_2", "🔥");
assert.strictEqual(reactions.length, 0);

console.log("✅ Single reaction per user (toggle off & switch) verified successfully!");
console.log("🎉 All unit tests passed!");
