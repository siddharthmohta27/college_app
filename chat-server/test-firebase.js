require("dotenv").config();
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const path = require("path");
    const resolvedPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    const serviceAccount = require(resolvedPath);
    initializeApp({ credential: cert(serviceAccount) });
  } else {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  }
  console.log("✅ Firebase Admin initialized for project:", process.env.FIREBASE_PROJECT_ID);
  process.exit(0);
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exit(1);
}
