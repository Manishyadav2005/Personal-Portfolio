import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Search,
  Layers,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Project,
  INITIAL_PROJECTS,
  getProjects,
} from "@/services/projectService";
import {
  badgeColorMap,
  tagColorMap,
  dotColorMap,
} from "@/components/portfolio/ProjectsSection";
import Footer from "@/components/portfolio/Footer";
import FloatingAIButton from "@/components/portfolio/FloatingAIButton";

const categories = [
  "All",
  "Full Stack",
  "AI & ML",
  "Client Project",
  "SaaS",
];

const Projects = () => {
  const [projectsList, setProjectsList] = useState<Project[]>(INITIAL_PROJECTS);
  const [selected, setSelected] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadAll = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      } catch (err) {
        console.warn("Error loading projects list:", err);
      }
    };

    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener("portfolio_projects_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_projects_updated", handleUpdate);
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.badge?.toLowerCase().includes(activeCategory.toLowerCase()) ||
      project.tags?.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()));

    const matchesSearch =
      searchQuery.trim() === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen text-foreground bg-[#0a0b0e] selection:bg-primary/30 selection:text-white flex flex-col justify-between">
      <Helmet>
        <title>All Projects | Manish Yadav Software Engineer</title>
        <meta
          name="description"
          content="Explore the complete showcase of client projects, AI/ML models, SaaS tools, and web applications built by Manish Yadav."
        />
      </Helmet>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-0 grid-pattern opacity-15 pointer-events-none" />
        {/* Top Header Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-black/80 border-b border-white/10 px-4 sm:px-8 py-3 sm:py-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Left: Brand Name */}
            <Link
              to="/"
              className="group flex items-center transition-transform duration-200 hover:scale-105"
            >
              <span
                className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                style={{
                  WebkitTextStroke: '0.5px transparent',
                  backgroundImage:
                    'conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  paintOrder: 'stroke fill',
                  animation: 'spin-border 3s linear infinite',
                }}
              >
                Manish
              </span>
            </Link>

            {/* Right: Close (X) Icon */}
            <Link
              to="/"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 group shadow-lg"
              aria-label="Close and return to portfolio"
              title="Close"
            >
              <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90 text-slate-300 group-hover:text-white" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-24 pb-12 flex-1">
          {/* Hero Banner */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary text-xs font-semibold shadow-glow">
              <Layers className="h-3.5 w-3.5" />
              Project Archive
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Explore All <span className="text-gradient">Projects</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A comprehensive archive of production applications, AI/ML models, full-stack systems, and client work built with modern engineering practices.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 flex-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 border ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary font-semibold shadow-glow"
                        : "bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <p className="text-slate-400 text-base">
                No projects matched your search criteria.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 border-white/20"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredProjects.map((project, index) => {
                const badgeColorKey = project.badgeColor || "purple";
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => setSelected(project)}
                    className="relative rounded-2xl overflow-hidden text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-black/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xl flex flex-col h-full border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                  >
                    {/* Animated rotating border */}
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

                    <div className="relative h-48 overflow-hidden w-full bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {project.badge && (
                        <span
                          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md z-20 ${
                            badgeColorMap[badgeColorKey] || badgeColorMap.purple
                          }`}
                        >
                          {project.badge}
                        </span>
                      )}

                      {project.featured && (
                        <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md z-20 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>

                    <div className="p-5 relative z-20 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-lg font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-primary transition-colors">
                        <span className="font-medium tracking-wide">View Project Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-primary" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </main>

        {/* Modal Inspector */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelected(null)}
              />

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
                  <div className="relative overflow-hidden bg-slate-950 flex flex-col justify-between">
                    <div className="relative h-64 w-full overflow-hidden bg-slate-900">
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

                      <p className="mt-4 text-sm leading-relaxed text-slate-300 text-left">
                        {selected.description}
                      </p>
                    </div>
                  </div>

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

        <Footer />
        <FloatingAIButton />

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
      </div>
    );
  };

export default Projects;
