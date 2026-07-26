import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;

if (!firebaseConfigured) {
  console.warn("⚠️ Firebase not configured. Add VITE_FIREBASE_* keys to college_app/.env");
}

// Only initialize if config is present
const app = firebaseConfigured
  ? getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
  : null;

export const auth = app ? getAuth(app) : (null as unknown as ReturnType<typeof getAuth>);
export const googleProvider = new GoogleAuthProvider();

export const isValidPecEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return email.trim().toLowerCase().endsWith("@pec.edu.in");
};

// ─── Auth Helpers ──────────────────────────────────────────────
export const firebaseAuth = {
  // Sign up with email + password
  async signUp(email: string, password: string, displayName?: string) {
    if (!isValidPecEmail(email)) {
      throw new Error("Only @pec.edu.in email addresses are allowed.");
    }
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    return user;
  },

  // Sign in with email + password
  async signIn(email: string, password: string) {
    if (!isValidPecEmail(email)) {
      throw new Error("Only @pec.edu.in email addresses are allowed.");
    }
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  // Sign in with Google popup
  async signInWithGoogle() {
    const { user } = await signInWithPopup(auth, googleProvider);
    if (!isValidPecEmail(user.email)) {
      await signOut(auth);
      throw new Error("Only @pec.edu.in email addresses are allowed.");
    }
    return user;
  },

  // Sign out
  async signOut() {
    await signOut(auth);
  },

  // Get current user's JWT token (for sending to backend)
  async getIdToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken();
  },

  // Force refresh token (use after long sessions)
  async refreshToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken(true);
  },

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user (synchronous)
  get currentUser() {
    return auth.currentUser;
  },
};

export type { User };
