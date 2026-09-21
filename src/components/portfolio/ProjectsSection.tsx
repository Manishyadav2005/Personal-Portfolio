import { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Shield,
  X,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Project,
  INITIAL_PROJECTS,
  getFeaturedProjects,
} from "@/services/projectService";

// Tailwind safelist-friendly color maps
export const badgeColorMap: Record<string, string> = {
  green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  orange: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  cyan: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  rose: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
};

export const tagColorMap: Record<string, string> = {
  green: "text-emerald-400 border-emerald-500/30",
  purple: "text-purple-400 border-purple-500/30",
  orange: "text-orange-400 border-orange-500/30",
  blue: "text-blue-400 border-blue-500/30",
  cyan: "text-cyan-400 border-cyan-500/30",
  rose: "text-rose-400 border-rose-500/30",
};

export const dotColorMap: Record<string, string> = {
  green: "from-emerald-400 to-teal-400",
  purple: "from-purple-400 to-pink-400",
  orange: "from-orange-400 to-amber-400",
  blue: "from-blue-400 to-cyan-400",
  cyan: "from-cyan-400 to-blue-400",
  rose: "from-rose-400 to-pink-400",
};

const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(() =>
    INITIAL_PROJECTS.slice(0, 3)
  );

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await getFeaturedProjects(3);
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      } catch (err) {
        console.warn("Error loading featured projects:", err);
      }
    };

    loadFeatured();

    const handleUpdate = () => loadFeatured();
    window.addEventListener("portfolio_projects_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_projects_updated", handleUpdate);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-24 overflow-x-hidden"
    >
      {/* Background Grid */}
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
            A selection of projects, client work, and digital solutions I've built.
          </p>
        </motion.div>

        {/* ===================== 3 FEATURED PROJECT CARDS GRID ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsList.map((project, index) => {
            const badgeColorKey = project.badgeColor || "purple";
            return (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => setSelected(project)}
                className="relative rounded-2xl overflow-hidden text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl flex flex-col h-full"
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

                <div className="relative h-44 overflow-hidden w-full bg-slate-900/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {project.badge && (
                    <span
                      className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md z-20 ${
                        badgeColorMap[badgeColorKey] || badgeColorMap.purple
                      }`}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 relative z-20 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/80 mt-1 line-clamp-2 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 group-hover:text-primary transition-colors">
                    <span className="font-medium tracking-wide">View Project Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-primary" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ===================== MORE PROJECTS BUTTON ===================== */}
        <motion.div
          className="mt-12 md:mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/projects"
            className="relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white group overflow-hidden bg-black/50 hover:bg-black/70 transition-all duration-300 hover:scale-105 shadow-glow"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
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
            <span className="relative z-10 flex items-center gap-2">
              <span>More Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </motion.div>
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
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/15 bg-black/90 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-30 rounded-full bg-black/70 p-2 text-white hover:bg-black/90 border border-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT SIDE (IMAGE + TEXT) */}
                <div className="relative overflow-hidden bg-slate-950 flex flex-col justify-between">
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  </div>

                  <div className="p-6 text-white flex-1">
                    <h3 className="text-2xl font-bold">{selected.title}</h3>
                    <p className="text-white/80 mt-1 text-sm">{selected.subtitle}</p>

                    {selected.badge && (
                      <span
                        className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          badgeColorMap[selected.badgeColor] || badgeColorMap.purple
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full bg-gradient-to-r ${
                            dotColorMap[selected.badgeColor] || dotColorMap.purple
                          }`}
                        />
                        {selected.badge}
                      </span>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground/90 text-left">
                      {selected.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-6 lg:p-8 flex flex-col justify-between gap-6">
                  <div>
                    {selected.tags && selected.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {selected.tags.map((tag, i) => (
                          <span
                            key={tag}
                            className={`py-0.5 px-2.5 rounded-full text-xs border ${
                              i === 0
                                ? tagColorMap[selected.badgeColor] || tagColorMap.purple
                                : "text-primary border-primary/30"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    {selected.techStack && selected.techStack.length > 0 && (
                      <div className="mb-6">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selected.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="bg-white/5 border border-white/15 rounded-lg py-1 px-2.5 text-xs text-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Features */}
                    {selected.features && selected.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Key Features
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {selected.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <span
                                className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-r ${
                                  dotColorMap[selected.badgeColor] || dotColorMap.purple
                                }`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Links & CTA */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    {selected.codeUrl && (
                      <Button size="sm" asChild variant="outline" className="border-white/20">
                        <a href={selected.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}

                    {selected.liveUrl && (
                      <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {selected.liveLabel || "Live Demo"}
                        </a>
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