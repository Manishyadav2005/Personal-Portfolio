import { useState } from "react";
import { FileText, Eye, Globe } from "lucide-react";
import truesightImage from "../../assets/research/truesight-ai-certificate.jpg";

const ResearchSection = () => {
  const [open, setOpen] = useState(false);

  // 🔥 Google Drive preview (view → preview)
  const previewUrl =
    "https://drive.google.com/file/d/1AzraV6Pa1TKtYA4jrXNJR5hZEMWjHgtX/preview";

  return (
    <section id="research" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/40 bg-transparent text-orange-400 text-sm shadow-glow">
              🔬 Research
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Research <span className="text-gradient">Publications</span>
          </h2>

          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] mt-2 text-lg font-normal">
            My academic and research contributions
          </p>
        </div>

        {/* 100% Transparent Research Card */}
        <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center bg-transparent hover:bg-white/[0.03] rounded-3xl overflow-hidden transition-all duration-300 shadow-2xl">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative z-20">
            <img
              src={truesightImage}
              alt="TrueSight AI Research Certificate"
              className="rounded-2xl w-full object-contain bg-white/95 p-2 shadow-2xl border border-white/20"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-20">
            
            <span className="inline-flex items-center gap-2 bg-transparent text-emerald-400 border border-emerald-500/50 px-3.5 py-1 rounded-full text-sm font-semibold mb-3 w-fit drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Research Publication
            </span>

            <h3 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              TrueSight AI
            </h3>

            <p className="mt-3 text-white text-base leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              Published a research paper on AI-based deepfake detection in the Journal of Computer Science (2026).
            </p>

            <ul className="mt-4 space-y-2.5 text-sm text-white font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow shrink-0" />
                <span>Deepfake detection using AI models</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow shrink-0" />
                <span>Image & video manipulation analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow shrink-0" />
                <span>Published research paper (2026)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-glow shrink-0" />
                <span>Real-world AI application</span>
              </li>
            </ul>

            {/* Buttons - 100% Transparent */}
            <div className="mt-6 flex gap-3 sm:gap-4 flex-wrap">
              
              {/* Certificate */}
              <a
                href={truesightImage}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold transition-all duration-300 shadow-glow hover:scale-105"
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
                  }}
                />
                <span className="relative z-20 flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <FileText className="w-4 h-4 text-purple-400" />
                  View Certificate
                </span>
              </a>

              {/* Preview Popup Trigger */}
              <button
                onClick={() => setOpen(true)}
                className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold transition-all duration-300 shadow-glow hover:scale-105"
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
                  }}
                />
                <span className="relative z-20 flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Preview Paper
                </span>
              </button>

              {/* Open in new tab */}
              <a
                href="https://drive.google.com/file/d/1AzraV6Pa1TKtYA4jrXNJR5hZEMWjHgtX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold transition-all duration-300 shadow-glow hover:scale-105"
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
                  }}
                />
                <span className="relative z-20 flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <Globe className="w-4 h-4 text-green-400" />
                  View Paper
                </span>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl h-[80vh] bg-black rounded-xl overflow-hidden border border-white/10">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
            >
              ✖
            </button>

            {/* PDF Viewer */}
            <iframe
              src={previewUrl}
              className="w-full h-full"
              allow="autoplay"
            ></iframe>
          </div>
       </div>
      )}

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

export default ResearchSection;