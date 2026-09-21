import { useState, useEffect, useMemo } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import {
  MemoryItem,
  getMemories,
} from "@/services/beyondCodeService";

const BeyondTheCodeSection = () => {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxMemory, setLightboxMemory] = useState<MemoryItem | null>(null);

  // Embla carousel setup for multi-card horizontal scrolling
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  });

  // Load memories from service / cache
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getMemories();
        setMemories(data || []);
      } catch (err) {
        console.warn("Error loading memories for home section:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("portfolio_memories_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_memories_updated", handleUpdate);
  }, []);

  // ONLY show real memories added by admin - NO dummy photos!
  const displayMemories = memories;

  // Smooth auto-scroll: only scrolls if there are more than 4 cards
  useEffect(() => {
    if (!emblaApi || isHovered || displayMemories.length <= 4) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 3200);

    return () => clearInterval(timer);
  }, [emblaApi, isHovered, displayMemories.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxMemory) return;
      if (e.key === "Escape") setLightboxMemory(null);
      if (e.key === "ArrowRight") {
        const currentIdx = displayMemories.findIndex((m) => m.id === lightboxMemory.id);
        const nextIdx = (currentIdx + 1) % displayMemories.length;
        setLightboxMemory(displayMemories[nextIdx]);
      }
      if (e.key === "ArrowLeft") {
        const currentIdx = displayMemories.findIndex((m) => m.id === lightboxMemory.id);
        const prevIdx = (currentIdx - 1 + displayMemories.length) % displayMemories.length;
        setLightboxMemory(displayMemories[prevIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxMemory, displayMemories]);

  const [mobileIndex, setMobileIndex] = useState(0);

  // Auto-crossfade on mobile: "ek photo dikhe aur fir wo dhire dhire dikhna band aur dusra dikhna chalu"
  useEffect(() => {
    if (displayMemories.length <= 1) return;

    const timer = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % displayMemories.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [displayMemories.length]);

  if (!isLoading && displayMemories.length === 0) {
    return null;
  }

  return (
    <section
      id="beyond-the-code"
      className="relative py-16 md:py-24 overflow-hidden bg-transparent"
    >
      {/* Subtle Background Glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header: Badge */}
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-primary/40 text-primary shadow-glow text-xs sm:text-sm font-medium">
              <Camera className="h-4 w-4" />
              Beyond the Code
            </span>
          </motion.div>
        </div>

        {/* ==================================================================== */}
        {/* 1. DESKTOP & TABLET VIEW: MULTI-CARD HORIZONTAL SCROLLING CAROUSEL */}
        {/* ==================================================================== */}
        <div
          className="hidden sm:block relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Embla Viewport */}
          <div ref={emblaRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-2">
            <div className={`flex -ml-4 sm:-ml-5 ${displayMemories.length < 4 ? "justify-center" : ""}`}>
              {displayMemories.map((item) => (
                <div
                  key={item.id}
                  className={`min-w-0 shrink-0 grow-0 pl-4 sm:pl-5 basis-1/2 md:basis-1/3 lg:basis-1/4 ${displayMemories.length < 4 ? "max-w-[320px] w-full" : ""
                    }`}
                >
                  {/* Individual Photo Card */}
                  <div
                    onClick={() => setLightboxMemory(item)}
                    className="group relative h-[360px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl bg-black/60 backdrop-blur-xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-primary/20"
                  >
                    {/* Rotating Conic Rainbow Border */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-3xl z-20"
                      style={{
                        padding: "2px",
                        background:
                          "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        animation: "spin-border 4s linear infinite",
                      }}
                    />

                    {/* Photo Only - No text */}
                    <img
                      src={item.image}
                      alt={item.title || "Memory"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

                    {/* Subtle Gradient Shadow at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 2. MOBILE VIEW: SINGLE CENTERED CARD WITH SMOOTH CROSSFADE ANIMATION */}
        {/* ("ek photo dikhe aur fir wo dhire dhire dikhna band aur dusra dikhna chalu") */}
        {/* ==================================================================== */}
        <div className="block sm:hidden w-full">
          {/* Centered Single Photo Card */}
          <div
            className="relative w-full max-w-[260px] aspect-[4/5] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black/60 backdrop-blur-xl border border-white/10"
            style={{ maxWidth: "260px" }}
          >
            {/* Rotating Conic Rainbow Border */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl z-20"
              style={{
                padding: "2px",
                background:
                  "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: "spin-border 4s linear infinite",
              }}
            />

            {/* Smooth Crossfading Image Container */}
            <div
              className="w-full h-full relative cursor-pointer"
              onClick={() => setLightboxMemory(displayMemories[mobileIndex])}
            >
              <AnimatePresence mode="wait">
                {displayMemories[mobileIndex] && (
                  <motion.div
                    key={displayMemories[mobileIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                    className="w-full h-full absolute inset-0"
                  >
                    <img
                      src={displayMemories[mobileIndex].image}
                      alt={displayMemories[mobileIndex].title || "Moment photo"}
                      className="w-full h-full object-cover rounded-2xl"
                      style={{
                        objectFit: displayMemories[mobileIndex].objectFit || "cover",
                        objectPosition:
                          displayMemories[mobileIndex].objectPosition === "center"
                            ? "center"
                            : displayMemories[mobileIndex].objectPosition === "bottom"
                            ? "bottom"
                            : "center top",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. BOTTOM ACTION: LINK TO FULL GALLERY */}
        {/* ==================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <Link
            to="/beyond-the-code"
            className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white group overflow-hidden bg-black/60 hover:bg-black/80 transition-all duration-300 hover:scale-105 shadow-glow"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full z-10"
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
            <span className="relative z-20 flex items-center gap-2">
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-primary" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ======================= FULLSCREEN LIGHTBOX MODAL ======================= */}
      <AnimatePresence>
        {lightboxMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxMemory(null)}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between max-w-5xl z-10">
              <span className="text-xs sm:text-sm font-medium text-slate-300">
                Photo {displayMemories.findIndex((m) => m.id === lightboxMemory.id) + 1} of {displayMemories.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxMemory(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Image + Left/Right Navigation */}
            <div
              className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxMemory.image}
                alt={lightboxMemory.title || "Fullscreen moment"}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const cIdx = displayMemories.findIndex((m) => m.id === lightboxMemory.id);
                  const pIdx = (cIdx - 1 + displayMemories.length) % displayMemories.length;
                  setLightboxMemory(displayMemories[pIdx]);
                }}
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const cIdx = displayMemories.findIndex((m) => m.id === lightboxMemory.id);
                  const nIdx = (cIdx + 1) % displayMemories.length;
                  setLightboxMemory(displayMemories[nIdx]);
                }}
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            {lightboxMemory.title && (
              <div
                className="max-w-3xl w-full text-center pb-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {lightboxMemory.title}
                </h3>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conic Gradient Border Animation Keyframes */}
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
    </section>
  );
};

export default BeyondTheCodeSection;
