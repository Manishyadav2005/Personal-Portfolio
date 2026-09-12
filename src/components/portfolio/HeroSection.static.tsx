import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-x-hidden"
    >
      {/* Dark gradient background with grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(var(--primary)/_0.03)] to-background" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] animate-blob" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-glow-purple/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-blob"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 right-1/3 w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] bg-accent/10 rounded-full blur-[40px] sm:blur-[60px] md:blur-[80px] animate-blob" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-primary/40 rounded-full top-1/4 left-1/4 animate-float" />
        <div
          className="absolute w-3 h-3 bg-accent/40 rounded-full top-1/3 right-1/3 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute w-2 h-2 bg-glow-purple/40 rounded-full bottom-1/4 left-1/3 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute w-4 h-4 bg-glow-cyan/30 rounded-full top-1/2 right-1/4 animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass-pill border-primary/30 text-primary mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              Welcome to My Portfolio
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span
                className="inline-block"
                style={{
                  WebkitTextStroke: "2px transparent",
                  backgroundImage:
                    "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "white",
                  paintOrder: "stroke fill",
                  animation: "spin-border 3s linear infinite",
                }}
              >
                Hello, I'm
              </span>
              <br />
              <span
                className="inline-block"
                style={{
                  WebkitTextStroke: "2px transparent",
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

            <div
              className="flex items-center justify-center lg:justify-start gap-3 mb-6 animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="glass-pill border-primary/30 text-foreground font-semibold">
                Software Developer
              </span>
              <span className="glass-pill border-accent/30 text-accent font-semibold">
                AI Enthusiast
              </span>
            </div>

            <p
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              A passionate developer focused on building practical, real-world
              web solutions. Specializing in{" "}
              <span className="text-primary font-semibold">
                Web Development
              </span>
              , <span className="text-primary font-semibold">Java</span>,{" "}
              <span className="text-accent font-semibold">DevOps</span> &{" "}
              <span className="text-accent font-semibold">
                AI-driven solutions
              </span>
              .
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-md mx-auto lg:mx-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {[
                { value: "10+", label: "Internships", link: "#experience" },
                {
                  value: "25+",
                  label: "Certifications",
                  link: "#certifications",
                },
                { value: "5+", label: "Projects", link: "#projects" },
              ].map((stat) => (
                <a
                  key={stat.label}
                  href={stat.link}
                  className="relative px-6 py-4 text-center block cursor-pointer hover:scale-105 transition-all rounded-lg overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-lg"
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

                  <div className="text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              {/* Resume Button */}
              <a
                href="/Manish_Yadav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-8 py-[14px] rounded-lg text-base font-medium text-white group overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg"
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

              {/* Save Contact Button — animated rotating gradient border */}
              <a
                href="/contact.vcf"
                download="Manish_Yadav_Contact.vcf"
                className="relative inline-flex items-center justify-center px-8 py-[14px] rounded-lg text-base font-medium text-white group overflow-hidden bg-transparent hover:bg-white/10 transition-all duration-300"
                style={{ minHeight: "46px" }}
              >
                {/* Rotating conic-gradient border layer */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    padding: "1.5px",
                    background:
                      "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "spin-border 3s linear infinite",
                  }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  Save Contact
                </span>

                {/* Inline keyframes */}
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
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-up">
            <div className="relative">
              <div className="absolute -inset-8 md:-inset-8 -inset-4 blur-2xl md:blur-3xl animate-pulse" />
              <div
                className="absolute -inset-4 md:-inset-4 -inset-2 blur-xl md:blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />

              {/* Rotating border */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff0080, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080)",
                  animation: "spin-border 3s linear infinite",
                }}
              />

              {/* Main image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[hsl(var(--glass-border))] shadow-glow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-glow-purple/20" />
                <img
                  src={profilePhoto}
                  alt="Manish Yadav - Software Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-6 py-3 flex items-center gap-2 shadow-glow">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="font text-sm text-foreground">
                  Available for Work
                </span>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 glass-card flex items-center justify-center animate-float shadow-glow">
                <span className="text-xl">💻</span>
              </div>
              <div
                className="absolute top-1/4 -left-6 w-10 h-10 glass-card flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-lg">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
