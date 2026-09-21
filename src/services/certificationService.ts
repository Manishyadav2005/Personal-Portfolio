import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: string;
  link: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const CERTIFICATION_CATEGORIES = [
  "All",
  "Cloud & AI",
  "Development",
  "AI/ML",
  "Security",
  "Data Science",
  "Design",
  "Professional",
  "Community",
  "Competition",
] as const;

export const categoryStyles: Record<
  string,
  { gradient: string; iconColor: string; borderColor: string }
> = {
  "Cloud & AI": {
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
  },
  Development: {
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
  },
  "AI/ML": {
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
  },
  Security: {
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
    borderColor: "border-red-500/30",
  },
  "Data Science": {
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-400",
    borderColor: "border-indigo-500/30",
  },
  Design: {
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
    borderColor: "border-pink-500/30",
  },
  Professional: {
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30",
  },
  Community: {
    gradient: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400",
    borderColor: "border-teal-500/30",
  },
  Competition: {
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
  },
};

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-oci-genai-2025",
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    date: "September 2025",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/1eBHyq3EbueYIhSmatxhOtXtOakr1DHnz/preview",
    order: 1,
  },
  {
    id: "cert-java-web-ai-hcl",
    name: "Java Web Development with AI",
    issuer: "HCLTech (NCVET Approved)",
    date: "March 2025",
    category: "Development",
    link: "https://drive.google.com/file/d/1Jzvj51DcOtRpahyqXUApbjPI7mWEXXRu/preview",
    order: 2,
  },
  {
    id: "cert-foundations-ai-microsoft",
    name: "Foundations of Artificial Intelligence",
    issuer: "Edunet Foundation | AICTE | Microsoft",
    date: "April 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/13Z_X3CI_Hdbug7vhpKsyyL5M_yjT3QX3/preview",
    order: 3,
  },
  {
    id: "cert-cybersecurity-edunet-ibm",
    name: "Cyber Security Internship Program",
    issuer: "Edunet Foundation | AICTE | IBM SkillsBuild",
    date: "May–June 2025",
    category: "Security",
    link: "https://drive.google.com/file/d/1TDM57qan1d9W2DpC5YawAND1THSIu2Yt/preview",
    order: 4,
  },
  {
    id: "cert-solutions-arch-aws-forage",
    name: "Solutions Architecture Job Simulation (AWS)",
    issuer: "Forage (AWS Program)",
    date: "December 2025",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/1-CsQhkf5pwZAY_zsuuAMVYRKyDpUHRYF/preview",
    order: 5,
  },
  {
    id: "cert-data-science-r-simplilearn",
    name: "Introduction to Data Science with R Programming",
    issuer: "Simplilearn SkillUp",
    date: "March 2025",
    category: "Data Science",
    link: "https://drive.google.com/file/d/1Q6amgg__vimTrIruOnp0zDLQ7AWeSRhk/preview",
    order: 6,
  },
  {
    id: "cert-genai-studio-google-cloud",
    name: "Introduction to Generative AI Studio",
    issuer: "Google Cloud | Simplilearn SkillUp",
    date: "June 2025",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/114QxvQQmX8AQg6w6LzGMB36AoAXaG6Pk/preview",
    order: 7,
  },
  {
    id: "cert-explore-ai-basics-microsoft",
    name: "Explore AI Basics",
    issuer: "Microsoft",
    date: "April 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/10fj1vCs0Nb6Sqjf6X20FhGbYHNW0vEZz/preview",
    order: 8,
  },
  {
    id: "cert-yuva-ai-indiaai",
    name: "Yuva AI for All",
    issuer: "INDIAai | Nasscom FutureSkills Prime | MeitY",
    date: "December 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/1Y9RhWkWoMgyJ6SfpC_4IdcpgFa97Sius/preview",
    order: 9,
  },
  {
    id: "cert-logo-production-ai-udemy",
    name: "Professional Logo Production with Artificial Intelligence",
    issuer: "Udemy",
    date: "April 2025",
    category: "Design",
    link: "https://drive.google.com/file/d/1K7MSkPPARM44hvfbmQLsV6_bJb8NTeSB/preview",
    order: 10,
  },
  {
    id: "cert-java-masterclass-udemy",
    name: "Java Programming Masterclass – Beginner to Master",
    issuer: "Udemy",
    date: "April 2025",
    category: "Development",
    link: "https://drive.google.com/file/d/1a0x1HrAth6hIKi_fZ7tVNwDOVHPHUHTr/preview",
    order: 11,
  },
  {
    id: "cert-chatgpt-midjourney-udemy",
    name: "Learn ChatGPT, Midjourney, AI and Use it for Passive Income",
    issuer: "Udemy",
    date: "July 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/17P0WPqrAZHRHZCAeX4Avc5-CWYQ4TeZH/preview",
    order: 12,
  },
  {
    id: "cert-ai-tools-be10x",
    name: "AI Tools & ChatGPT Workshop",
    issuer: "be10x",
    date: "November 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/1yjCcZcQdCTUMOtZsz1tw4PqIAEbZB1Sb/preview",
    order: 13,
  },
  {
    id: "cert-web-technologies-softpro",
    name: "Employability Skills Enhancement Training – Web Technologies",
    issuer: "Softpro India | AKTU",
    date: "November 2024",
    category: "Professional",
    link: "https://drive.google.com/file/d/1sOGWIwh-GrsHYq79nIBb_4SMrKaV2SgP/preview",
    order: 14,
  },
  {
    id: "cert-frontend-dev-digitalnavik",
    name: "Frontend Development Training",
    issuer: "Digital Navik | Bansal Institute of Engineering & Technology",
    date: "Sep–Dec 2023",
    category: "Development",
    link: "https://drive.google.com/file/d/1KidnAMmeVlO_ERftIibz_diFLxjRXTcs/preview",
    order: 15,
  },
  {
    id: "cert-python-iot-mechatrendz",
    name: "Python with IoT Workshop",
    issuer: "Mechatrendz Softwares & Innovations Pvt. Ltd.",
    date: "December 2023",
    category: "Development",
    link: "https://drive.google.com/file/d/10dgD8LT1Mo5U4vPHQGUl0XjQfgBHGSap/preview",
    order: 16,
  },
  {
    id: "cert-aws-summit-india",
    name: "AWS Summit India – Online (Certificate of Attendance)",
    issuer: "Amazon Web Services (AWS)",
    date: "June 2025",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/1lvWerqUse2WKkZQmmp4SWs5mtSk5DPHZ/preview",
    order: 17,
  },
  {
    id: "cert-interview-tips-campuscode",
    name: "Interview Tips & Resume Hacks",
    issuer: "Campus Code (Session by Arushi Garg, Adobe)",
    date: "April 2025",
    category: "Professional",
    link: "https://drive.google.com/file/d/1kR6b4mpQ4TKnOMrAjDMuxDH_m_Y8RcA2/preview",
    order: 18,
  },
  {
    id: "cert-aincat-2025-naukri",
    name: "AINCAT 2025 – India's Biggest Career Aptitude Test",
    issuer: "Naukri Campus",
    date: "May 2025",
    category: "Professional",
    link: "https://drive.google.com/file/d/1yPeu6u8kmJJJhy-RxEZDVHGJDvxinJWx/preview",
    order: 19,
  },
  {
    id: "cert-nestle-resilience-2025",
    name: "Nestlé E-learning 2025 – Resilience",
    issuer: "Nestlé (Nesternship)",
    date: "2025",
    category: "Professional",
    link: "https://drive.google.com/file/d/14HWwpA4T0h5tfVnP4IG3NiFYw3TO-Zwh/preview",
    order: 20,
  },
  {
    id: "cert-connect-git-gdsc",
    name: "Connect with Git Workshop",
    issuer: "Google Developer Student Club (GDSC)",
    date: "November 2023",
    category: "Community",
    link: "https://drive.google.com/file/d/1NAQ7wtc9odt2UJ6tGNtFJSQ__5GmPj32/preview",
    order: 21,
  },
  {
    id: "cert-agent-discord-kaggle",
    name: "Agent of Discord (Kaggle Badge)",
    issuer: "Kaggle",
    date: "2025",
    category: "Community",
    link: "https://drive.google.com/file/d/1EC6djXw7NtzoOEvzC8FVqjxFiuQBG9yG/preview",
    order: 22,
  },
  {
    id: "cert-gssoc-contributor-2024",
    name: "GirlScript Summer of Code – Contributor",
    issuer: "GirlScript Foundation",
    date: "October 2024",
    category: "Community",
    link: "https://drive.google.com/file/d/1e0gv6P7Lv6ARvoXG8eiOK-M3w5o0cF9h/preview",
    order: 23,
  },
  {
    id: "cert-bazaar-shashtra-fintopedia",
    name: "Bazaar Shashtra 2024 – Intra College Competition",
    issuer: "Fintopedia",
    date: "January 2024",
    category: "Competition",
    link: "https://drive.google.com/file/d/1yh5uBJOg3NZdzmSNwXqlVMUOJlQ3sB0w/preview",
    order: 24,
  },
  {
    id: "cert-ignite-india-wadhwani",
    name: "Ignite India 5.0 Program",
    issuer: "Wadhwani Foundation",
    date: "December 2025",
    category: "Professional",
    link: "https://drive.google.com/file/d/1-ra7nMQQVijHTmcqY-H2kh_iw5oNRzTb/preview",
    order: 25,
  },
  {
    id: "cert-genai-analytics-tata-forage",
    name: "GenAI Powered Data Analytics Job Simulation",
    issuer: "TATA (via Forage)",
    date: "June 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/1iqq0dzj7kZRXSCfuhTQlpag3ywqS1eY3/preview",
    order: 26,
  },
  {
    id: "cert-soar-ai-educators-microsoft",
    name: "SOAR – AI for Educators",
    issuer: "Microsoft (NCVET Recognised)",
    date: "November 2025",
    category: "AI/ML",
    link: "https://drive.google.com/file/d/1V3Uevz8KYd9XVvWXqc0MGxUOgsyBeMXv/preview",
    order: 27,
  },
  {
    id: "cert-iot-digital-transform-cisco",
    name: "Introduction to IoT and Digital Transformation",
    issuer: "Cisco Networking Academy",
    date: "January 2026",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/13OGQ8t3rEVSEWyyINRfgQ5c90rwkRQmE/preview",
    order: 28,
  },
  {
    id: "cert-intro-iot-cisco",
    name: "Introduction to Internet of Things",
    issuer: "Cisco Networking Academy",
    date: "January 2026",
    category: "Cloud & AI",
    link: "https://drive.google.com/file/d/14msloV5idwbfr7Jc8_CvCTx5KevXb-cW/preview",
    order: 29,
  },
  {
    id: "cert-claude-code-anthropic",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "April 2026",
    category: "AI/ML",
    link: "http://verify.skilljar.com/c/vnqtvo2w2eiz",
    order: 30,
  },
];

const LOCAL_STORAGE_KEY = "portfolio_certifications_data";

export const getLocalCertifications = (): CertificationItem[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_CERTIFICATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CERTIFICATIONS;
  } catch {
    return INITIAL_CERTIFICATIONS;
  }
};

export const saveLocalCertifications = (items: CertificationItem[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("portfolio_certifications_updated"));
    }
  } catch (err) {
    console.warn("Failed to write certifications to localStorage:", err);
  }
};

/**
 * Fetches all certifications from Firebase Firestore, falling back to localStorage.
 */
export const getCertifications = async (): Promise<CertificationItem[]> => {
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, "certifications"));
      if (!snapshot.empty) {
        const firestoreList: CertificationItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          firestoreList.push({
            id: docSnap.id,
            name: data.name || "Untitled Certificate",
            issuer: data.issuer || "",
            date: data.date || "",
            category: data.category || "Development",
            link: data.link || "#",
            order: typeof data.order === "number" ? data.order : 99,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          });
        });

        // Sort ascending by order
        firestoreList.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

        saveLocalCertifications(firestoreList);
        return firestoreList;
      }
    } catch (err) {
      console.warn("Firestore fetch error for certifications, falling back to local:", err);
    }
  }
  return getLocalCertifications();
};

/**
 * Creates or updates a certification in Firestore and local storage.
 */
export const saveCertification = async (
  cert: CertificationItem
): Promise<boolean> => {
  const id = cert.id || `cert-${Date.now()}`;
  const now = new Date().toISOString();

  const cleanCert: Record<string, any> = {
    id,
    name: cert.name ? cert.name.trim() : "Untitled Certificate",
    issuer: cert.issuer ? cert.issuer.trim() : "",
    date: cert.date ? cert.date.trim() : "",
    category: cert.category || "Development",
    link: cert.link ? cert.link.trim() : "#",
    order: typeof cert.order === "number" ? cert.order : 99,
    createdAt: cert.createdAt || now,
    updatedAt: now,
  };

  const itemToStore = cleanCert as CertificationItem;

  // 1. Save to Firebase Firestore
  if (db) {
    try {
      const docRef = doc(db, "certifications", id);
      await setDoc(docRef, cleanCert, { merge: true });
    } catch (err) {
      console.error("Failed to write certification to Firestore:", err);
    }
  }

  // 2. Update local storage cache
  const localList = getLocalCertifications();
  const index = localList.findIndex((c) => c.id === id);
  let updatedList: CertificationItem[];
  if (index >= 0) {
    updatedList = [...localList];
    updatedList[index] = itemToStore;
  } else {
    updatedList = [itemToStore, ...localList];
  }
  saveLocalCertifications(updatedList);
  return true;
};

/**
 * Deletes a certification by ID from Firestore and local cache.
 */
export const deleteCertification = async (id: string): Promise<boolean> => {
  if (db) {
    try {
      await deleteDoc(doc(db, "certifications", id));
    } catch (err) {
      console.warn("Failed to delete certification from Firestore:", err);
    }
  }

  const localList = getLocalCertifications();
  const filtered = localList.filter((c) => c.id !== id);
  saveLocalCertifications(filtered);
  return true;
};

/**
 * Seeds initial 30 sample certifications into Firestore.
 */
export const seedInitialCertificationsToFirestore = async (): Promise<number> => {
  if (!db) {
    throw new Error("Firebase Firestore is not initialized.");
  }

  let count = 0;
  for (const cert of INITIAL_CERTIFICATIONS) {
    const docRef = doc(db, "certifications", cert.id);
    await setDoc(docRef, cert, { merge: true });
    count++;
  }

  saveLocalCertifications(INITIAL_CERTIFICATIONS);
  return count;
};
