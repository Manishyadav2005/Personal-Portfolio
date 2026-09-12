import { GraduationCap, Target, Code, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const aboutCards = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable solutions',
    gradient: 'from-primary/20 to-glow-cyan/20',
    iconColor: 'text-primary',
    borderColor: 'border-primary/30',
  },
  {
    icon: Target,
    title: 'Goal Oriented',
    description: 'Focused on delivering results',
    gradient: 'from-accent/20 to-glow-orange/20',
    iconColor: 'text-accent',
    borderColor: 'border-accent/30',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Exploring cutting-edge technologies',
    gradient: 'from-glow-purple/20 to-glow-pink/20',
    iconColor: 'text-glow-purple',
    borderColor: 'border-glow-purple/30',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    description: 'Always growing & improving',
    gradient: 'from-glow-green/20 to-glow-cyan/20',
    iconColor: 'text-glow-green',
    borderColor: 'border-glow-green/30',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Rotating border animation styles */}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .rotating-border-card {
          position: relative;
          border-radius: 1rem;
          isolation: isolate;
        }

        .rotating-border-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(
            from var(--border-angle),
            transparent 15%,
            hsl(var(--primary)),
            hsl(var(--glow-purple)),
            hsl(var(--glow-cyan)),
            hsl(var(--glow-orange)),
            transparent 85%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: border-rotate 4s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes border-rotate {
          to {
            --border-angle: 360deg;
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Cards Grid */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rotating-border-card p-6 bg-transparent hover:bg-white/[0.05] transition-all duration-300 ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <div className={`p-3 rounded-xl w-fit mb-4 bg-transparent border ${card.borderColor}`}>
                    <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-white mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{card.title}</h4>
                  <p className="text-sm text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-primary/40 text-primary mb-6 shadow-glow">
              <Sparkles className="w-4 h-4" />
              About Me
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Designing <span className="text-gradient">Solutions</span>, Not Just Visuals
            </h2>
            
            <p className="text-white mb-6 leading-relaxed text-lg font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              I'm <span className="text-white font-bold no-underline decoration-transparent">Manish Yadav</span>, a motivated software developer passionate about 
              web technologies, Java, DevOps, and AI-driven solutions. I thrive on learning new technologies 
              and solving real-world problems through clean, efficient code.
            </p>
            
            <p className="text-white mb-8 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              My goal is to grow into a skilled developer while building impactful digital products that 
              make a difference. I believe in continuous learning and staying updated with the latest 
              industry trends and best practices.
            </p>

            {/* Education - 100% Transparent Card */}
            <motion.div 
              className="rotating-border-card p-6 mb-8 bg-transparent hover:bg-white/[0.05] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-transparent border border-primary/40">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">B.Tech in Information Technology</h4>
                  <p className="text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Dr. A.P.J. Abdul Kalam Technical University,Lucknow</p>
                  <p className="text-sm text-primary font-medium mt-1">2022 – 2026</p>
                </div>
              </div>
            </motion.div>

            {/* Let's Connect CTA Button - 100% Transparent with Rotating Rainbow Border */}
            <a 
              href="#contact" 
              className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white group overflow-hidden bg-transparent hover:bg-white/10 transition-all duration-300 rounded-xl hover:scale-105 shadow-glow"
            >
              {/* Rotating conic-gradient border layer */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl"
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

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Let's Connect
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;