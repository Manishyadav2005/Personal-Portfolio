import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  platform: string; // 'github' | 'linkedin' | 'mail' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'leetcode' | 'whatsapp' | 'telegram' | 'discord' | 'globe'
  enabled: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const SUPPORTED_PLATFORMS = [
  { id: "github", label: "GitHub", color: "hover:text-white" },
  { id: "linkedin", label: "LinkedIn", color: "hover:text-[#0A66C2]" },
  { id: "mail", label: "Email / Gmail", color: "hover:text-emerald-400" },
  { id: "instagram", label: "Instagram", color: "hover:text-[#E4405F]" },
  { id: "youtube", label: "YouTube", color: "hover:text-[#FF0000]" },
  { id: "facebook", label: "Facebook", color: "hover:text-[#1877F2]" },
  { id: "twitter", label: "Twitter / X", color: "hover:text-[#1DA1F2]" },
  { id: "leetcode", label: "LeetCode", color: "hover:text-[#FFA116]" },
  { id: "whatsapp", label: "WhatsApp", color: "hover:text-[#25D366]" },
  { id: "telegram", label: "Telegram", color: "hover:text-[#229ED9]" },
  { id: "discord", label: "Discord", color: "hover:text-[#5865F2]" },
  { id: "globe", label: "Website / Other", color: "hover:text-primary" },
] as const;

export const detectPlatform = (name: string, url: string): string => {
  const text = `${name} ${url}`.toLowerCase();
  if (text.includes("github")) return "github";
  if (text.includes("linkedin")) return "linkedin";
  if (text.includes("mailto:") || text.includes("mail") || text.includes("gmail")) return "mail";
  if (text.includes("instagram") || text.includes("instagr.am")) return "instagram";
  if (text.includes("youtube") || text.includes("youtu.be")) return "youtube";
  if (text.includes("facebook") || text.includes("fb.com")) return "facebook";
  if (text.includes("twitter") || text.includes("x.com")) return "twitter";
  if (text.includes("leetcode")) return "leetcode";
  if (text.includes("whatsapp") || text.includes("wa.me")) return "whatsapp";
  if (text.includes("telegram") || text.includes("t.me")) return "telegram";
  if (text.includes("discord")) return "discord";
  return "globe";
};

export const INITIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "social-github",
    name: "GitHub",
    url: "https://github.com/Manishyadav2005",
    platform: "github",
    enabled: true,
    order: 1,
  },
  {
    id: "social-linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/manish-yadav-644062267",
    platform: "linkedin",
    enabled: true,
    order: 2,
  },
  {
    id: "social-mail",
    name: "Email",
    url: "mailto:msmanish0502@gmail.com",
    platform: "mail",
    enabled: true,
    order: 3,
  },
  {
    id: "social-instagram",
    name: "Instagram",
    url: "https://www.instagram.com/msfincode/?hl=en",
    platform: "instagram",
    enabled: false,
    order: 4,
  },
  {
    id: "social-youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@msfincode",
    platform: "youtube",
    enabled: false,
    order: 5,
  },
  {
    id: "social-facebook",
    name: "Facebook",
    url: "https://www.facebook.com/msfincode",
    platform: "facebook",
    enabled: false,
    order: 6,
  },
];

const LOCAL_STORAGE_KEY = "portfolio_social_links_data";

export const getLocalSocialLinks = (): SocialLinkItem[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_SOCIAL_LINKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SOCIAL_LINKS;
  } catch {
    return INITIAL_SOCIAL_LINKS;
  }
};

export const saveLocalSocialLinks = (items: SocialLinkItem[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio_social_links_updated"));
    }
  } catch (err) {
    console.warn("Failed to write social links to localStorage:", err);
  }
};

/**
 * Fetches all social links from Firebase Firestore, falling back to localStorage.
 */
export const getSocialLinks = async (): Promise<SocialLinkItem[]> => {
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, "social_links"));
      if (!snapshot.empty) {
        const firestoreList: SocialLinkItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          firestoreList.push({
            id: docSnap.id,
            name: data.name || "Social Link",
            url: data.url || "#",
            platform: data.platform || detectPlatform(data.name || "", data.url || ""),
            enabled: data.enabled !== false,
            order: typeof data.order === "number" ? data.order : 99,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        // Sort ascending by order
        firestoreList.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

        saveLocalSocialLinks(firestoreList);
        return firestoreList;
      }
    } catch (err) {
      console.warn("Firestore fetch error for social_links, falling back to local:", err);
    }
  }
  return getLocalSocialLinks();
};

/**
 * Creates or updates a social link in Firestore and local storage.
 */
export const saveSocialLink = async (item: SocialLinkItem): Promise<boolean> => {
  const id = item.id || `social-${Date.now()}`;
  const now = new Date().toISOString();

  const cleanItem: Record<string, any> = {
    id,
    name: item.name ? item.name.trim() : "Social Link",
    url: item.url ? item.url.trim() : "#",
    platform: item.platform || detectPlatform(item.name || "", item.url || ""),
    enabled: item.enabled !== false,
    order: typeof item.order === "number" ? item.order : 99,
    createdAt: item.createdAt || now,
    updatedAt: now,
  };

  const itemToStore = cleanItem as SocialLinkItem;

  // 1. Save to Firebase Firestore
  if (db) {
    try {
      const docRef = doc(db, "social_links", id);
      await setDoc(docRef, cleanItem, { merge: true });
    } catch (err) {
      console.error("Failed to write social link to Firestore:", err);
    }
  }

  // 2. Update local storage cache
  const localList = getLocalSocialLinks();
  const index = localList.findIndex((s) => s.id === id);
  let updatedList: SocialLinkItem[];
  if (index >= 0) {
    updatedList = [...localList];
    updatedList[index] = itemToStore;
  } else {
    updatedList = [...localList, itemToStore];
  }
  saveLocalSocialLinks(updatedList);
  return true;
};

/**
 * Deletes a social link by ID from Firestore and local cache.
 */
export const deleteSocialLink = async (id: string): Promise<boolean> => {
  if (db) {
    try {
      await deleteDoc(doc(db, "social_links", id));
    } catch (err) {
      console.warn("Failed to delete social link from Firestore:", err);
    }
  }

  const localList = getLocalSocialLinks();
  const filtered = localList.filter((s) => s.id !== id);
  saveLocalSocialLinks(filtered);
  return true;
};

/**
 * Toggles whether a social link is displayed in the footer.
 */
export const toggleSocialLink = async (
  id: string,
  enabled: boolean
): Promise<boolean> => {
  const localList = getLocalSocialLinks();
  const target = localList.find((s) => s.id === id);
  if (!target) return false;

  return saveSocialLink({
    ...target,
    enabled,
  });
};

/**
 * Seeds initial sample social links into Firestore.
 */
export const seedInitialSocialLinksToFirestore = async (): Promise<number> => {
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  let count = 0;
  for (const item of INITIAL_SOCIAL_LINKS) {
    const docRef = doc(db, "social_links", item.id);
    await setDoc(docRef, item, { merge: true });
    count++;
  }

  saveLocalSocialLinks(INITIAL_SOCIAL_LINKS);
  return count;
};
