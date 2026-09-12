import { useState } from "react";
import {
  ExternalLink,
  Github,
  Shield,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import essenzaWebsiteHero from "@/assets/projects/essenza/essenza-website-hero.png";
import essenzaBillImage from "@/assets/projects/essenzabill/essenzabill-website.png";
import portfolioWebsite from "@/assets/projects/portfolio/portfolio-website.png";
import truesightImage from "@/assets/projects/Truesight/truesight-website.png";
import pharmaImage from "@/assets/projects/pharma/pharma.png";

// ===================== PROJECT DATA =====================
interface Project {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string; // tailwind color name e.g. "green", "purple", "orange"
  tags: string[];
  description: string;
  techStack: string[];
  features: string[];
  codeUrl: string;
  liveUrl: string;
  liveLabel: string;
}

const projects: Project[] = [
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
  },
];

// Tailwind safelist-friendly color map (since dynamic class strings get purged)
const badgeColorMap: Record<string, string> = {
  green: "bg-green-100 text-green-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
};

const tagColorMap: Record<string, string> = {
  green: "text-green-500 border-green-500/30",
  purple: "text-purple-500 border-purple-500/30",
  orange: "text-orange-500 border-orange-500/30",
};

const dotColorMap: Record<string, string> = {
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-pink-500",
  orange: "from-orange-500 to-red-500",
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-24 overflow-x-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-20" />

      {/* Glow Orbs */}
      <div className="pointer-events-none absolute top-0 right-0 -z-10 h-[260px] w-[260px] sm:h-[420px] sm:w-[420px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[220px] w-[220px] sm:h-[360px] sm:w-[360px] rounded-full bg-glow-purple/10 blur-[110px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary shadow-glow">
            <Shield className="h-4 w-4" />
            Projects
          </span>

          <h2 className="section-title">
            Featured <span className="text-gradient">Work</span>
          </h2>

          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal mt-4">
            Showcasing live projects, real client work, and impactful solutions
          </p>
        </motion.div>

        {/* ===================== PROJECT CARDS GRID ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              className="relative rounded-2xl overflow-hidden text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl z-10"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-border 3s linear infinite",
                }}
              />
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              <div className="p-5 relative z-20">
                <h3 className="text-lg font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{project.title}</h3>
                <p className="text-sm text-white/90 mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{project.subtitle}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="bg-transparent border border-white/30 rounded-md py-1 px-2.5 text-xs text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ===================== DETAIL MODAL ===================== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT SIDE (IMAGE + TEXT) */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-[250px] object-cover"
                  />

                  <div className="p-6 text-center text-white">
                    <h3 className="text-2xl font-bold">{selected.title}</h3>
                    <p className="text-white/80 mt-1">{selected.subtitle}</p>

                    <span
                      className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${badgeColorMap[selected.badgeColor]}`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-gradient-to-r ${dotColorMap[selected.badgeColor]}`}
                      />
                      {selected.badge}
                    </span>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90 text-left max-w-md tracking-wide mx-auto">
                      {selected.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-8 lg:p-10">
                  <div className="mb-4 flex flex-wrap gap-3">
                    {selected.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className={`glass-pill py-1 px-3 text-xs ${
                          i === 0 ? tagColorMap[selected.badgeColor] : "text-primary border-primary/30"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="mb-3 font-semibold">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="glass-pill py-1 px-3 text-sm text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="mb-3 font-semibold">Key Features</h4>
                    <ul className="space-y-0.5 text-sm text-muted-foreground">
                      {selected.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-1.5">
                          <span
                            className={`h-2 w-2 rounded-full bg-gradient-to-r ${dotColorMap[selected.badgeColor]}`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <a href={selected.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>

                    {selected.liveUrl ? (
                      <Button size="lg" variant="outline" asChild>
                        <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {selected.liveLabel}
                        </a>
                      </Button>
                    ) : (
                      <Button size="lg" variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {selected.liveLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline keyframes for rotating border */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;