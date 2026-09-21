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

import essenzaWebsiteHero from "@/assets/projects/essenza/essenza-website-hero.png";
import essenzaBillImage from "@/assets/projects/essenzabill/essenzabill-website.png";
import portfolioWebsite from "@/assets/projects/portfolio/portfolio-website.png";
import truesightImage from "@/assets/projects/Truesight/truesight-website.png";
import pharmaImage from "@/assets/projects/pharma/pharma.png";

export interface Project {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string; // "green" | "purple" | "orange" | "blue" | "emerald" | "rose"
  tags: string[];
  description: string;
  techStack: string[];
  features: string[];
  codeUrl: string;
  liveUrl: string;
  liveLabel: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "pharmacare",
    image: pharmaImage,
    title: "PHARMACARE (MEDISTOCK)",
    subtitle: "Inventory & Billing System",
    badge: "Full Stack Project",
    badgeColor: "green",
    tags: ["Full Stack", "SaaS Dashboard"],
    description:
      "Developed a full-stack pharmacy management system to streamline inventory, billing, supplier tracking, and analytics. The platform provides real-time stock monitoring, automated alerts, and efficient POS billing, helping businesses eliminate manual processes and improve operational efficiency.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
    features: [
      "Real-time inventory tracking with stock & expiry management",
      "Integrated billing / POS system with invoice generation",
      "Role-based authentication (Admin & Staff)",
      "Supplier and purchase management system",
      "Automated low stock and expiry alerts",
      "Smart reorder recommendations for inventory optimization",
      "Analytics dashboard with sales and revenue insights",
      "Secure backend using Supabase (Auth + Database)",
    ],
    codeUrl: "https://github.com/Manishyadav2005/medistock",
    liveUrl: "https://medistock-alpha.vercel.app",
    liveLabel: "Live Demo",
    featured: true,
    order: 1,
    createdAt: "2026-01-10T12:00:00.000Z",
  },
  {
    id: "truesight",
    image: truesightImage,
    title: "TRUESIGHT AI",
    subtitle: "Deepfake Detection System",
    badge: "AI / ML Project",
    badgeColor: "purple",
    tags: ["AI / ML", "Computer Vision"],
    description:
      "Developed TRUESIGHT AI, an advanced deepfake detection platform that identifies manipulated videos using AI and computer vision. The system provides explainable results with confidence scores and tampered region analysis, helping combat misinformation, cyber fraud, and enhancing trust in digital content.",
    techStack: ["Python", "PyTorch", "FastAPI", "OpenCV", "NumPy", "Pandas", "FaceForensics++"],
    features: [
      "Accurate deepfake detection focused on video content",
      "Providing confidence scores with meaningful insights",
      "Real-time video analysis for quick and efficient detection",
      "Advanced computer vision techniques for feature extraction",
      "Detection of facial manipulation and tampered video regions",
      "Helps prevent misinformation, cyber fraud, and identity misuse",
      "High-performance backend powered by FastAPI framework",
      "Model trained on real-world datasets like FaceForensics++",
      "Designed as a scalable system for digital trust and verification",
    ],
    codeUrl: "https://github.com/Manishyadav2005",
    liveUrl: "",
    liveLabel: "Live Demo",
    featured: true,
    order: 2,
    createdAt: "2026-02-05T12:00:00.000Z",
  },
  {
    id: "essenza-website",
    image: essenzaWebsiteHero,
    title: "Essenza Pro Unisex Salon",
    subtitle: "Unisex Salon Business Website",
    badge: "LIVE – Client Project",
    badgeColor: "green",
    tags: ["Client Project", "Web Development"],
    description:
      "Built a premium salon website focused on customer conversion, seamless booking, and strong local SEO presence. Features a luxury UI/UX design, mobile-first experience, dynamic service categorization, and integrated contact system to drive real business growth.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase Hosting", "Git", "GitHub"],
    features: [
      "One-click Call & WhatsApp booking for customer conversion",
      "Luxury UI/UX design tailored for premium salon branding",
      "Fully responsive mobile-first experience",
      "Dynamic service categorization (Male/Female segmentation)",
      "Interactive gallery for showcasing real client transformations",
      "Local SEO optimization for increased discoverability",
      "Integrated Google Maps and contact system",
      "Professional product showcase with modern card UI",
    ],
    codeUrl: "https://github.com/Manishyadav2005/essenza-pro-website",
    liveUrl: "https://essenzaprosalon.in/",
    liveLabel: "Live Website",
    featured: true,
    order: 3,
    createdAt: "2026-02-20T12:00:00.000Z",
  },
  {
    id: "essenza-billing",
    image: essenzaBillImage,
    title: "Essenza Pro Billing System",
    subtitle: "Salon Billing & Expense Management",
    badge: "LIVE – Client Project",
    badgeColor: "orange",
    tags: ["Client Project", "Full Stack"],
    description:
      "Built a full-stack salon billing and expense management system to automate daily operations, featuring seamless invoice generation, real-time revenue analytics, service management, and expense tracking. Integrated capabilities like PDF invoice export and WhatsApp sharing enhance efficiency and support smarter business decision-making.",
    techStack: ["React", "TypeScript", "Firebase Firestore", "Tailwind CSS", "Shadcn UI", "Vite", "jsPDF"],
    features: [
      "Multi-service invoice generation with dynamic pricing",
      "Automated invoice numbering and tracking system",
      "PDF invoice generation and instant download",
      "WhatsApp invoice sharing for quick customer delivery",
      "Real-time dashboard for revenue, profit, and analytics",
      "Service management with category and gender segmentation",
      "Smart expense tracking with history and filtering",
      "Payment split handling (Cash & QR) with accurate records",
      "Date-wise invoice history with search and filters",
      "Modern responsive UI for smooth staff operations",
    ],
    codeUrl: "https://github.com/Manishyadav2005",
    liveUrl: "",
    liveLabel: "Live Demo",
    featured: false,
    order: 4,
    createdAt: "2026-03-01T12:00:00.000Z",
  },
  {
    id: "personal-portfolio",
    image: portfolioWebsite,
    title: "Personal Portfolio",
    subtitle: "AI Powered Portfolio Website",
    badge: "LIVE – Personal Project",
    badgeColor: "purple",
    tags: ["Personal Project", "Full Stack"],
    description:
      "Developed a modern full-stack AI-powered portfolio platform showcasing skills, projects, experience, and certifications through an interactive UI. Features include a smart AI assistant, dynamic project display, professional timeline, and integrated contact system, all built with a responsive design, smooth animations, and high-performance user experience.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "Vercel"],
    features: [
      "AI-powered assistant for interactive user guidance",
      "Dynamic project showcase with real-world and client work",
      "Professional experience timeline with internships",
      "Structured skills section with categorized technologies",
      "Certifications display with organized filtering system",
      "Modern services section highlighting development offerings",
      "Integrated contact system for seamless communication",
      "Fully responsive design across all devices",
      "Smooth animations with optimized performance",
    ],
    codeUrl: "https://github.com/Manishyadav2005/Personal-Portfolio",
    liveUrl: "",
    liveLabel: "Live Portfolio",
    featured: false,
    order: 5,
    createdAt: "2026-03-10T12:00:00.000Z",
  },
];

const LOCAL_STORAGE_KEY = "portfolio_projects_data";

// Helper: load local cached projects
export const getLocalProjects = (): Project[] => {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // ignore
    }
  }
  // Initialize with INITIAL_PROJECTS if nothing exists
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
};

// Helper: save to local cache
export const saveLocalProjects = (projects: Project[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("portfolio_projects_updated"));
  }
};

/**
 * Fetches all projects from Firebase Firestore.
 * Falls back to localStorage and initial seed if Firestore is not connected or empty.
 */
export const getProjects = async (): Promise<Project[]> => {
  if (db) {
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const firestoreProjects: Project[] = [];
        snapshot.forEach((docSnap) => {
          firestoreProjects.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Project, "id">),
          });
        });
        saveLocalProjects(firestoreProjects);
        return firestoreProjects;
      }
    } catch (err) {
      console.warn("Firestore query failed, using local storage fallback:", err);
    }
  }

  return getLocalProjects();
};

/**
 * Returns top featured projects (default 3) for the homepage.
 */
export const getFeaturedProjects = async (limitCount = 3): Promise<Project[]> => {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured !== false);

  if (featured.length >= limitCount) {
    return featured.slice(0, limitCount);
  }

  // If fewer than limitCount are marked featured, take remaining from all projects
  const remaining = all.filter((p) => !featured.some((f) => f.id === p.id));
  return [...featured, ...remaining].slice(0, limitCount);
};

/**
 * Saves (create or update) a project in Firebase Firestore and local cache.
 */
export const saveProject = async (project: Project): Promise<Project> => {
  const isNew = !project.id;
  const id = isNew
    ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-4)
    : project.id;

  const now = new Date().toISOString();
  const fullProject: Project = {
    ...project,
    id,
    order: project.order ?? 99,
    createdAt: project.createdAt || now,
    updatedAt: now,
  };

  // 1. Write to Firestore if available
  if (db) {
    try {
      const docRef = doc(db, "projects", id);
      await setDoc(docRef, fullProject, { merge: true });
    } catch (err) {
      console.warn("Failed to write to Firestore, saved to local cache:", err);
    }
  }

  // 2. Write to LocalStorage
  const localList = getLocalProjects();
  const existingIdx = localList.findIndex((p) => p.id === id);
  let updatedList: Project[];
  if (existingIdx >= 0) {
    updatedList = [...localList];
    updatedList[existingIdx] = fullProject;
  } else {
    updatedList = [fullProject, ...localList];
  }
  saveLocalProjects(updatedList);

  return fullProject;
};

/**
 * Deletes a project by ID from Firebase Firestore and local cache.
 */
export const deleteProject = async (id: string): Promise<boolean> => {
  if (db) {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.warn("Failed to delete from Firestore, deleting from local cache:", err);
    }
  }

  const localList = getLocalProjects();
  const filtered = localList.filter((p) => p.id !== id);
  saveLocalProjects(filtered);
  return true;
};

/**
 * Toggles the `featured` state of a project.
 */
export const toggleFeaturedProject = async (id: string): Promise<boolean> => {
  const localList = getLocalProjects();
  const proj = localList.find((p) => p.id === id);
  if (!proj) return false;

  const updatedFeatured = !proj.featured;
  proj.featured = updatedFeatured;
  await saveProject(proj);
  return updatedFeatured;
};

/**
 * Seeds initial 5 projects into Firestore database.
 */
export const seedInitialProjectsToFirestore = async (): Promise<number> => {
  if (!db) {
    throw new Error("Firebase Firestore is not initialized. Please verify your Firebase configuration in settings.");
  }

  let count = 0;
  for (const project of INITIAL_PROJECTS) {
    const docRef = doc(db, "projects", project.id);
    await setDoc(docRef, project, { merge: true });
    count++;
  }

  // Update local
  saveLocalProjects(INITIAL_PROJECTS);
  return count;
};
