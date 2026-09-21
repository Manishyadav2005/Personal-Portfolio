import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect password or email. Please check your credentials.";
    case "auth/user-not-found":
      return "No admin account found with this email address.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return "Failed to sign in. Please verify your credentials.";
  }
};

/**
 * Sign in admin user using Firebase Authentication (Email/Password)
 */
export const loginAdminWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized.");
  }
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user;
};

/**
 * Sign out current admin user
 */
export const logoutAdmin = async (): Promise<void> => {
  if (!auth) return;
  await signOut(auth);
};

/**
 * Subscribe to Firebase Auth state changes
 */
export const subscribeToAuthState = (
  callback: (user: User | null) => void
): (() => void) => {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Returns currently logged in Firebase User
 */
export const getCurrentAdminUser = (): User | null => {
  return auth?.currentUser || null;
};
