import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

export interface MemoryItem {
  id: string;
  title: string;
  image: string;
  category: string; // "Life & Travel" | "Hackathons & Events" | "Campus & College" | "Achievements" | "Personal"
  location?: string;
  date?: string;
  description?: string;
  order?: number;
  objectPosition?: string; // e.g. "top", "center", "bottom"
  objectFit?: "cover" | "contain"; // "cover" | "contain"
  createdAt?: string;
  updatedAt?: string;
}

export const MEMORY_CATEGORIES = [
  "All",
  "Life & Travel",
  "Hackathons & Events",
  "Campus & College",
  "Achievements",
  "Personal",
] as const;

export const DUMMY_MEMORY_IDS = new Set([
  "hackathon-sih-2024",
  "mountain-trek-himalayas",
  "campus-tech-symposium",
  "best-innovator-award",
  "weekend-photography-escape",
]);

export const INITIAL_MEMORIES: MemoryItem[] = [];

const LOCAL_STORAGE_KEY = "portfolio_beyond_the_code_memories";

/**
 * Gets cached memories from localStorage.
 */
export const getLocalMemories = (): MemoryItem[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && !DUMMY_MEMORY_IDS.has(item.id));
  } catch {
    return [];
  }
};

/**
 * Saves memories to localStorage and dispatches a change event.
 */
export const saveLocalMemories = (items: MemoryItem[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio_memories_updated"));
    }
  } catch (err) {
    console.warn("Failed to write memories to localStorage:", err);
  }
};

/**
 * Fetches all memories from Firebase Firestore, falling back to localStorage.
 */
export const getMemories = async (): Promise<MemoryItem[]> => {
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, "beyond_the_code"));
      if (!snapshot.empty) {
        const firestoreList: MemoryItem[] = [];
        snapshot.forEach((docSnap) => {
          if (DUMMY_MEMORY_IDS.has(docSnap.id)) return;
          const data = docSnap.data();
          firestoreList.push({
            id: docSnap.id,
            title: data.title || "Untitled Moment",
            image: data.image || "",
            category: data.category || "Life & Travel",
            location: data.location || undefined,
            date: data.date || undefined,
            description: data.description || undefined,
            order: typeof data.order === "number" ? data.order : 99,
            objectPosition: data.objectPosition || "top",
            objectFit: data.objectFit || "cover",
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        // Sort ascending by order
        firestoreList.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

        saveLocalMemories(firestoreList);
        return firestoreList;
      }
    } catch (err) {
      console.warn("Firestore fetch error for beyond_the_code, falling back to local:", err);
    }
  }
  return getLocalMemories();
};

/**
 * Creates or updates a memory in Firestore and local storage.
 */
export const saveMemory = async (memory: MemoryItem): Promise<boolean> => {
  const id = memory.id || `memory-${Date.now()}`;
  const now = new Date().toISOString();

  // Create clean object with NO undefined keys (Firestore setDoc rejects undefined)
  const cleanMemory: Record<string, any> = {
    id,
    title: memory.title ? memory.title.trim() : "Untitled Moment",
    image: memory.image ? memory.image.trim() : "",
    category: memory.category || "Life & Travel",
    order: typeof memory.order === "number" ? memory.order : 99,
    objectPosition: memory.objectPosition || "top",
    objectFit: memory.objectFit || "cover",
    createdAt: memory.createdAt || now,
    updatedAt: now,
  };

  if (memory.location && memory.location.trim()) {
    cleanMemory.location = memory.location.trim();
  }
  if (memory.date && memory.date.trim()) {
    cleanMemory.date = memory.date.trim();
  }
  if (memory.description && memory.description.trim()) {
    cleanMemory.description = memory.description.trim();
  }

  const memoryItemToStore = cleanMemory as MemoryItem;

  // 1. Save to Firebase Firestore
  if (db) {
    try {
      const docRef = doc(db, "beyond_the_code", id);
      await setDoc(docRef, cleanMemory, { merge: true });
    } catch (err) {
      console.error("Failed to write memory to Firestore:", err);
    }
  }

  // 2. Update local storage cache
  const localList = getLocalMemories();
  const index = localList.findIndex((m) => m.id === id);
  let updatedList: MemoryItem[];
  if (index >= 0) {
    updatedList = [...localList];
    updatedList[index] = memoryItemToStore;
  } else {
    updatedList = [memoryItemToStore, ...localList];
  }
  saveLocalMemories(updatedList);
  return true;
};

/**
 * Deletes a memory by ID from Firestore and local cache.
 */
export const deleteMemory = async (id: string): Promise<boolean> => {
  if (db) {
    try {
      await deleteDoc(doc(db, "beyond_the_code", id));
    } catch (err) {
      console.warn("Failed to delete memory from Firestore:", err);
    }
  }

  const localList = getLocalMemories();
  const filtered = localList.filter((m) => m.id !== id);
  saveLocalMemories(filtered);
  return true;
};

/**
 * Seeds initial sample memories into Firestore.
 */
export const seedInitialMemoriesToFirestore = async (): Promise<number> => {
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  let count = 0;
  for (const memory of INITIAL_MEMORIES) {
    const docRef = doc(db, "beyond_the_code", memory.id);
    await setDoc(docRef, memory, { merge: true });
    count++;
  }

  saveLocalMemories(INITIAL_MEMORIES);
  return count;
};
