import { Award, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CertificationItem,
  INITIAL_CERTIFICATIONS,
  CERTIFICATION_CATEGORIES,
  categoryStyles,
  getCertifications,
} from "@/services/certificationService";

const CertificationsSection = () => {
  const [certificationsList, setCertificationsList] =
    useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadAll = async () => {
      try {
        const data = await getCertifications();
        if (data && data.length > 0) {
          setCertificationsList(data);
        }
      } catch (err) {
        console.warn("Error loading certs:", err);
      }
    };

    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener("portfolio_certifications_updated", handleUpdate);
    return () =>
      window.removeEventListener("portfolio_certifications_updated", handleUpdate);
  }, []);

  const filteredCerts =
    activeCategory === "All"
      ? certificationsList
      : certificationsList.filter((c) => c.category === activeCategory);

  const displayedCerts = filteredCerts.slice(0, 9);

  return (
    <section
      id="certifications"
      className="py-24 relative overflow-hidden bg-transparent"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary mb-6 shadow-glow">
            <Sparkles className="w-4 h-4" />
            Certifications
          </span>
          <h2 className="section-title">
            Professional <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">
            <span className="text-3xl font-bold text-gradient">
              {certificationsList.length}+
            </span>{" "}
            certifications demonstrating continuous learning across various domains
          </p>
        </motion.div>

        {/* Category Filter - Transparent */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {CERTIFICATION_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? "bg-white/20 text-white border border-white/60 shadow-glow scale-105"
                  : "bg-transparent text-slate-300 border border-white/20 hover:border-white/50 hover:text-white"
                }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  (
                  {
                    certificationsList.filter((c) => c.category === category)
                      .length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Certifications Grid - 100% Transparent */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedCerts.map((cert, index) => {
            const style =
              categoryStyles[cert.category] || categoryStyles["Development"];
            return (
              <motion.a
                key={cert.id || `${cert.name}-${index}`}
                href={cert.link || "#"}
                target={cert.link && cert.link !== "#" ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative group block p-6 rounded-2xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl ${cert.link && cert.link !== "#" ? "cursor-pointer" : ""
                  }`}
              >
                {/* Rotating rainbow border overlay */}
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
                  <div className="p-3 rounded-xl bg-black/40 border border-white/20 group-hover:shadow-glow transition-all shrink-0">
                    <Award
                      className={`w-6 h-6 ${style.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {cert.name}
                    </h4>
                    <p className="text-white font-medium text-xs mb-3 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-medium bg-transparent border border-white/30 rounded-full py-1 px-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {cert.date}
                      </span>
                      <span className="text-xs font-medium bg-transparent border border-white/30 rounded-full py-1 px-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Show All Button - Navigates to dedicated /certifications page */}
        <div className="text-center mt-12">
          <Link
            to="/certifications"
            className="relative inline-flex items-center justify-center group overflow-hidden bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl shadow-glow hover:scale-105 transition-all"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                borderRadius: "inherit",
                padding: "1.5px",
                background:
                  "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: "spin-border 3s linear infinite",
                border: "none",
              }}
            />
            <span className="relative z-20 flex items-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>Show All ({filteredCerts.length})</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform text-primary" />
            </span>
          </Link>
        </div>
      </div>

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

export default CertificationsSection;
