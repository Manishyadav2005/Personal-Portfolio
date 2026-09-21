import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { initializeFirestore, getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Helper to get configuration from localStorage or Vite environment variables
export const getFirebaseConfig = () => {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB9zY5e-0WSkZcqeeZFuus6nz50nLZVR6c",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ms-manish-portfolio.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ms-manish-portfolio",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ms-manish-portfolio.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "435291530702",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:435291530702:web:527e9997403e02768d379f",
  };
};

export const saveFirebaseConfig = (config: Record<string, string>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_firebase_config", JSON.stringify(config));
  }
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

export const initFirebase = () => {
  const config = getFirebaseConfig();

  // If no apiKey is present, don't crash; fallback mode will handle it
  if (!config.apiKey && !config.projectId) {
    return { app: null, db: null, auth: null };
  }

  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    try {
      db = initializeFirestore(app, {
        ignoreUndefinedProperties: true,
      });
    } catch {
      db = getFirestore(app);
    }
    try {
      auth = getAuth(app);
    } catch (e) {
      console.warn("Failed to init auth:", e);
    }
    return { app, db, auth };
  } catch (err) {
    console.warn("Firebase initialization warning (running in fallback mode):", err);
    return { app: null, db: null, auth: null };
  }
};

const initialized = initFirebase();
app = initialized.app;
db = initialized.db;
auth = initialized.auth;

export { app, db, auth };
