import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  MapPin,
  Calendar,
  X,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MemoryItem,
  getMemories,
} from "@/services/beyondCodeService";
import Footer from "@/components/portfolio/Footer";

export const categoryBadgeColorMap: Record<string, string> = {
  "Life & Travel": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  "Hackathons & Events": "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "Campus & College": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "Achievements": "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  "Personal": "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  "Other": "bg-slate-500/20 text-slate-300 border border-slate-500/30",
};

const BeyondTheCode = () => {
  const [memoriesList, setMemoriesList] = useState<MemoryItem[]>([]);
  const [selected, setSelected] = useState<MemoryItem | null>(null);

  const currentIndex = selected
    ? memoriesList.findIndex((m) => m.id === selected.id)
    : -1;

  const handlePrev = () => {
    if (!memoriesList.length || currentIndex === -1) return;
    const prevIndex =
      (currentIndex - 1 + memoriesList.length) % memoriesList.length;
    setSelected(memoriesList[prevIndex]);
  };

  const handleNext = () => {
    if (!memoriesList.length || currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % memoriesList.length;
    setSelected(memoriesList[nextIndex]);
  };

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, memoriesList, currentIndex]);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      const data = await getMemories();
      setMemoriesList(data);
    };

    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("portfolio_memories_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_memories_updated", handleUpdate);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground bg-[#0a0b0e] selection:bg-primary/30 selection:text-white flex flex-col justify-between">
      <Helmet>
        <title>Beyond the Code | Manish Yadav Software Engineer</title>
        <meta
          name="description"
          content="A glimpse into the moments, experiences, and memories beyond my work in technology."
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
      <main className="container mx-auto px-4 pt-24 pb-16 flex-1">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary text-xs font-semibold shadow-glow">
            <Camera className="h-3.5 w-3.5" />
            Moments & Experiences
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Beyond the <span className="text-gradient">Code</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A glimpse into the moments, experiences, and memories beyond my work in technology.
          </p>
        </div>

        {/* Memories Gallery Grid */}
        {memoriesList.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 max-w-xl mx-auto p-8">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-white mb-2">No moments uploaded yet</h3>
            <p className="text-sm text-slate-400">
              Photos and memories will appear here once uploaded from the admin panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {memoriesList.map((item, index) => {
              const badgeClass =
                categoryBadgeColorMap[item.category] ||
                categoryBadgeColorMap["Other"];

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item)}
                  className="relative rounded-2xl overflow-hidden text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-black/40 hover:bg-white/[0.04] transition-all duration-300 shadow-xl flex flex-col h-full border border-white/10 w-full max-w-md sm:max-w-none mx-auto"
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

                  {/* Photo Container - Clean and unobstructed (no badges over faces) */}
                  <div className="relative h-56 sm:h-60 overflow-hidden w-full bg-slate-950">
                    {/* Ambient backdrop for smooth borders */}
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-35 scale-110 pointer-events-none"
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectFit: item.objectFit || "cover",
                        objectPosition:
                          item.objectPosition === "center"
                            ? "center"
                            : item.objectPosition === "bottom"
                            ? "bottom"
                            : "center top",
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 relative z-20 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Badges Row: Category & Date */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}
                        >
                          {item.category}
                        </span>

                        {item.date && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-primary" /> {item.date}
                          </span>
                        )}
                      </div>

                      {/* Location: Left-aligned and consistently placed above title */}
                      {item.location && (
                        <div className="flex items-center gap-1 text-[11px] text-primary font-medium mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}

                      <h3 className="text-base sm:text-lg font-bold leading-snug text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] line-clamp-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-primary transition-colors">
                      <span className="font-medium tracking-wide">View Full Moment</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-primary" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="relative z-10 w-full max-w-2xl lg:max-w-3xl h-[86vh] max-h-[640px] min-h-[460px] flex flex-col rounded-3xl border border-white/15 bg-black/95 shadow-2xl p-4 sm:p-5 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Header inside modal: Photo counter + Close Button */}
              <div className="flex items-center justify-between mb-2.5 shrink-0">
                {memoriesList.length > 1 ? (
                  <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                    Photo {currentIndex + 1} of {memoriesList.length}
                  </span>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 text-white border border-white/20 transition-all hover:scale-105 active:scale-95"
                  aria-label="Close"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Photo Viewer: Fixed Constant Height across all photos */}
              <div className="relative w-full h-[270px] sm:h-[340px] rounded-2xl overflow-hidden mb-3 bg-black/60 border border-white/10 flex items-center justify-center p-2 group select-none shrink-0">
                <img
                  src={selected.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-25 scale-110 pointer-events-none"
                />

                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.id}
                    src={selected.image}
                    alt={selected.title}
                    initial={{ opacity: 0.4, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 max-h-[250px] sm:max-h-[320px] w-auto max-w-full rounded-xl object-contain shadow-2xl mx-auto"
                  />
                </AnimatePresence>

                {/* Left Side: Previous Photo Icon Button */}
                {memoriesList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-primary text-white border border-white/25 hover:border-primary flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl active:scale-95 backdrop-blur-md cursor-pointer"
                    aria-label="Previous photo"
                    title="Previous Photo (Left Arrow key)"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}

                {/* Right Side: Next Photo Icon Button */}
                {memoriesList.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-primary text-white border border-white/25 hover:border-primary flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl active:scale-95 backdrop-blur-md cursor-pointer"
                    aria-label="Next photo"
                    title="Next Photo (Right Arrow key)"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>

              {/* Details Section: Fixed header & ONLY Description scrolls */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Badges & Meta (Fixed height) */}
                <div className="flex flex-wrap items-center gap-2 mb-2 shrink-0">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      categoryBadgeColorMap[selected.category] ||
                      categoryBadgeColorMap["Other"]
                    }`}
                  >
                    {selected.category}
                  </span>

                  {selected.date && (
                    <span className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                      {selected.date}
                    </span>
                  )}

                  {selected.location && (
                    <span className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                      {selected.location}
                    </span>
                  )}
                </div>

                {/* Title (Fixed height) */}
                <h2 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug shrink-0">
                  {selected.title}
                </h2>

                {/* Description: ONLY this area scrolls if content is long */}
                {selected.description && (
                  <div className="flex-1 min-h-0 overflow-y-auto pr-2 text-slate-300 text-xs sm:text-sm leading-relaxed custom-modal-scroll">
                    <p>{selected.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleek Custom Scrollbar for Modal Description */}
      <style>{`
        .custom-modal-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-modal-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.04);
          border-radius: 9999px;
        }
        .custom-modal-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
          border-radius: 9999px;
        }
        .custom-modal-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.45);
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default BeyondTheCode;
