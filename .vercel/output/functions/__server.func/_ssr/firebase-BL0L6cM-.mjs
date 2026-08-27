import { o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as signInWithEmailAndPassword, c as updateProfile, i as onAuthStateChanged, n as createUserWithEmailAndPassword, o as signInWithPopup, r as getAuth, s as signOut, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-BL0L6cM-.js
var firebaseConfig = {
	apiKey: "AIzaSyAMrqZEn9SeSh6m2963G5EzZqoboIOFvYI",
	authDomain: "campus-connect-ba6aa.firebaseapp.com",
	projectId: "campus-connect-ba6aa",
	storageBucket: "campus-connect-ba6aa.firebasestorage.app",
	messagingSenderId: "649406335017",
	appId: "1:649406335017:web:b3c2196d3d465fdc0fb438"
};
var firebaseConfigured = !!firebaseConfig.apiKey && !!firebaseConfig.projectId;
if (!firebaseConfigured) console.warn("⚠️ Firebase not configured. Add VITE_FIREBASE_* keys to college_app/.env");
var app = firebaseConfigured ? getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] : null;
var auth = app ? getAuth(app) : null;
var googleProvider = new GoogleAuthProvider();
var isValidPecEmail = (email) => {
	if (!email) return false;
	return email.trim().toLowerCase().endsWith("@pec.edu.in");
};
var isValidAnyEmail = (email) => {
	if (!email) return false;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};
var firebaseAuth = {
	async signUp(email, password, displayName, allowAnyEmail = false) {
		const trimmed = (email || "").trim();
		if (!isValidAnyEmail(trimmed)) throw new Error("Please enter a valid email address.");
		if (!allowAnyEmail && !isValidPecEmail(trimmed)) throw new Error("Only @pec.edu.in email addresses are allowed in standard mode.");
		const { user } = await createUserWithEmailAndPassword(auth, trimmed, password);
		if (displayName) await updateProfile(user, { displayName });
		return user;
	},
	async signIn(email, password, allowAnyEmail = false) {
		const trimmed = (email || "").trim();
		if (!isValidAnyEmail(trimmed)) throw new Error("Please enter a valid email address.");
		if (!allowAnyEmail && !isValidPecEmail(trimmed)) {}
		const { user } = await signInWithEmailAndPassword(auth, trimmed, password);
		return user;
	},
	async signInWithGoogle(allowAnyEmail = true) {
		const { user } = await signInWithPopup(auth, googleProvider);
		if (!allowAnyEmail && !isValidPecEmail(user.email)) {
			await signOut(auth);
			throw new Error("Only @pec.edu.in email addresses are allowed.");
		}
		return user;
	},
	async signOut() {
		await signOut(auth);
	},
	async getIdToken() {
		const user = auth.currentUser;
		if (!user) return null;
		return user.getIdToken();
	},
	async refreshToken() {
		const user = auth.currentUser;
		if (!user) return null;
		return user.getIdToken(true);
	},
	onAuthStateChanged(callback) {
		return onAuthStateChanged(auth, callback);
	},
	get currentUser() {
		return auth.currentUser;
	}
};
//#endregion
export { isValidPecEmail as i, firebaseAuth as n, isValidAnyEmail as r, auth as t };
