import React from 'react';
import { ArrowRight, Download } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent"
    >
      {/* 100% Transparent Hero Container - zero darkening overlays */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="w-full max-w-2xl text-left">
          
          {/* Status Badge - 100% Transparent */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-transparent border border-primary/50 text-primary text-xs sm:text-sm font-medium mb-5 shadow-glow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            Available for Opportunities
          </div>

          {/* Main Headline with Animated Conic Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Hello, I'm
            </span>
            <span
              className="inline-block drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
              style={{
                WebkitTextStroke: "1px transparent",
                backgroundImage:
                  "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                paintOrder: "stroke fill",
                animation: "spin-border 3s linear infinite",
              }}
            >
              Manish Yadav
            </span>
          </h1>

          {/* Sub-Badges - 100% Transparent */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <span className="px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-transparent border border-primary/50 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Software Developer
            </span>
            <span className="px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-transparent border border-accent/50 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AI Enthusiast
            </span>
            <span className="px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-transparent border border-glow-cyan/50 text-glow-cyan drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Java & Cloud
            </span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-200 mb-8 max-w-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            A passionate developer building practical, high-performance web solutions.
            Specializing in <span className="text-primary font-semibold">Web Development</span>,{" "}
            <span className="text-primary font-semibold">Java</span>,{" "}
            <span className="text-accent font-semibold">DevOps</span> &{" "}
            <span className="text-accent font-semibold">AI-driven solutions</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {/* Resume Button - Completely transparent with rotating rainbow border */}
            <a
              href="/Manish_Yadav_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-7 py-3 rounded-xl text-sm sm:text-base font-medium text-white group overflow-hidden bg-transparent hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff0080, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-border 3s linear infinite",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Save Contact Button - Completely transparent with rotating rainbow border */}
            <a
              href="/contact.vcf"
              download="Manish_Yadav_Contact.vcf"
              className="relative inline-flex items-center justify-center px-7 py-3 rounded-xl text-sm sm:text-base font-medium text-white group overflow-hidden bg-transparent hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff0080, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-border 3s linear infinite",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                Save Contact
              </span>
            </a>
          </div>

          {/* Quick Stats - 100% Transparent */}
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { value: "10+", label: "Internships", link: "#experience" },
              { value: "25+", label: "Certifications", link: "#certifications" },
              { value: "5+", label: "Projects", link: "#projects" },
            ].map((stat) => (
              <a
                key={stat.label}
                href={stat.link}
                className="p-3 rounded-xl text-center block cursor-pointer bg-transparent border border-white/15 hover:border-primary/50 hover:bg-white/[0.05] transition-all"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                  {stat.label}
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>



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

export default HeroSection;
