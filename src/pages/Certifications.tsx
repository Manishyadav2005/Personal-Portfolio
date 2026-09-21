import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Award,
  ArrowLeft,
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CertificationItem,
  INITIAL_CERTIFICATIONS,
  CERTIFICATION_CATEGORIES,
  categoryStyles,
  getCertifications,
} from "@/services/certificationService";
import Footer from "@/components/portfolio/Footer";
import FloatingAIButton from "@/components/portfolio/FloatingAIButton";

const Certifications = () => {
  const [certificationsList, setCertificationsList] =
    useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadAll = async () => {
      try {
        const data = await getCertifications();
        if (data && data.length > 0) {
          setCertificationsList(data);
        }
      } catch (err) {
        console.warn("Error loading certifications:", err);
      }
    };

    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener("portfolio_certifications_updated", handleUpdate);
    return () =>
      window.removeEventListener("portfolio_certifications_updated", handleUpdate);
  }, []);

  const filteredCerts = useMemo(() => {
    return certificationsList.filter((cert) => {
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        cert.name.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.category.toLowerCase().includes(query) ||
        (cert.date && cert.date.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [certificationsList, activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen text-foreground bg-[#0a0b0e] selection:bg-primary/30 selection:text-white flex flex-col justify-between">
      <Helmet>
        <title>Certifications & Credentials | Manish Yadav</title>
        <meta
          name="description"
          content="Explore all professional certifications, licenses, and badges earned by Manish Yadav across Cloud, AI, Web Development, and Cybersecurity."
        />
      </Helmet>

      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 -z-0 grid-pattern opacity-15 pointer-events-none" />
      <div className="pointer-events-none absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 -z-10 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[160px]" />

      {/* Fixed Top Header (Does not scroll with page) */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 px-4 sm:px-8 py-3.5 shadow-2xl">
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

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-20 sm:pt-24 flex-1">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4 sm:pt-6 pb-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-primary/40 text-primary shadow-glow text-xs sm:text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Verified Credentials & Achievements
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              All <span className="text-gradient">Certifications</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A comprehensive archive of certifications, technical job simulations,
              hackathons, and industry credentials demonstrating continuous learning.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications, issuers, or categories..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-primary/60 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-12">
            {CERTIFICATION_CATEGORIES.map((category) => {
              const count =
                category === "All"
                  ? certificationsList.length
                  : certificationsList.filter((c) => c.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${activeCategory === category
                      ? "bg-white/20 text-white border border-white/60 shadow-glow scale-105"
                      : "bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                >
                  <span>{category}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/40 text-slate-300">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Certifications Grid */}
          {filteredCerts.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10 max-w-lg mx-auto">
              <Award className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">
                No Certifications Found
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Try searching with another keyword or select a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredCerts.map((cert, index) => {
                  const style =
                    categoryStyles[cert.category] || categoryStyles["Development"];

                  return (
                    <motion.a
                      key={cert.id || `${cert.name}-${index}`}
                      href={cert.link || "#"}
                      target={cert.link && cert.link !== "#" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                      className="relative group block p-6 rounded-2xl bg-black/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      {/* Rotating Rainbow Border Overlay */}
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

                      <div className="flex items-start gap-4 relative z-20">
                        {/* Icon */}
                        <div className="p-3 rounded-xl bg-black/60 border border-white/15 group-hover:shadow-glow transition-all shrink-0">
                          <Award
                            className={`w-6 h-6 ${style.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
                          />
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-white text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              {cert.name}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0 mt-1 transition-colors" />
                          </div>

                          <p className="text-white font-medium text-xs mb-3 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                            {cert.issuer}
                          </p>

                          <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                            <span className="text-[11px] font-medium bg-transparent border border-white/20 rounded-full py-0.5 px-2.5 text-white">
                              {cert.date}
                            </span>
                            <span className="text-[11px] font-medium bg-transparent border border-white/20 rounded-full py-0.5 px-2.5 text-slate-300">
                              {cert.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer & Floating AI */}
      <div>
        <Footer />
        <FloatingAIButton />
      </div>

      {/* Rotating Conic Gradient Keyframes */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </div>
  );
};

export default Certifications;
