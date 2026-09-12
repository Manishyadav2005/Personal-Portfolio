import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Summer Intern – DevOps',
    company: 'Celebal Technologies',
    period: 'May 2025 – July 2025',
    type: 'Remote',
    description: 'Hands-on experience with CI/CD pipelines, cloud deployment, and monitoring tools.',
    link: 'https://drive.google.com/file/d/1aEjDicmHxMcap98MfsluKr_kP4guJNrV/preview'
  },
  {
    title: 'Intern – Cyber Security',
    company: 'Edunet Foundation (AICTE + IBM SkillsBuild)',
    period: 'May – June 2025',
    type: 'Virtual',
    description: 'Learned cybersecurity fundamentals, threat analysis, and security best practices.',
    link: 'https://drive.google.com/file/d/1TDM57qan1d9W2DpC5YawAND1THSIu2Yt/preview'
  },
  {
    title: 'Intern – Foundations of AI',
    company: 'Edunet Foundation (AICTE + Microsoft)',
    period: 'April 2025',
    type: 'Virtual',
    description: 'Explored AI/ML concepts, neural networks, and practical AI applications.',
    link: 'https://drive.google.com/file/d/13Z_X3CI_Hdbug7vhpKsyyL5M_yjT3QX3/preview'
  },
  {
    title: 'Java Web Development with AI Trainee',
    company: 'HCLTech',
    period: 'March 2025',
    type: 'Training',
    description: 'Advanced Java development with AI integration techniques.',
    link: 'https://drive.google.com/file/d/1Jzvj51DcOtRpahyqXUApbjPI7mWEXXRu/preview'
  },
  {
    title: 'Robotics Program Trainee',
    company: 'ERA Foundation (AKTU)',
    period: 'March – June 2025',
    type: 'Training',
    description: 'Hands-on robotics programming and automation concepts.',
    link: 'https://drive.google.com/file/d/1vFmw-Ip6WUp-Ck8Zr_lK8Avwd7e9R1eV/preview'
  },
  {
    title: 'Campus Ambassador',
    company: 'Entrepreneurship Development Cell (eDC), IIT Delhi',
    period: 'Dec 2025 – Jan 2026',
    type: 'Ambassador',
    description: 'Promoted entrepreneurship initiatives and organized campus events.',
    link: 'https://drive.google.com/file/d/1xYMm2LgN6cocMCQwvpg0llqN693OYxMf/preview'
  },
  {
    title: 'Frontend Development Intern',
    company: 'CodeAlpha',
    period: 'June 2024',
    type: 'Remote',
    description: 'Built responsive UI components and improved frontend performance.',
    link: 'https://drive.google.com/file/d/17tDnh9MozUMwur1-Tm_ghoyy2gQLmq5n/preview'
  },
  {
    title: 'Web Development Intern',
    company: 'TechOctaNet Services Pvt. Ltd.',
    period: 'May 2024',
    type: 'Remote',
    description: 'Developed full-stack web applications and learned industry practices.',
    link: 'https://drive.google.com/file/d/1tkYIOzWLL5q8IMgni5d1hGMhNEjIaytk/preview'
  },
  {
    title: 'Web Development Intern (Virtual)',
    company: 'CodSoft',
    period: 'May 2024',
    type: 'Virtual',
    description: 'Created interactive web projects and enhanced coding skills.',
    link: 'https://drive.google.com/file/d/1jW3tmgaD160RCDfbnaiGWQoH8zfdXQOq/preview'
  },
];

const typeColors: Record<string, string> = {
  'Remote': 'text-white border-glow-cyan/60 bg-transparent',
  'Virtual': 'text-white border-glow-purple/60 bg-transparent',
  'Training': 'text-white border-glow-green/60 bg-transparent',
  'Ambassador': 'text-white border-accent/60 bg-transparent',
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-accent/40 text-accent mb-6 shadow-glow">
            <Briefcase className="w-4 h-4" />
            Experience
          </span>
          <h2 className="section-title">
            My <span className="text-gradient">Professional</span> Journey
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">
            A timeline of internships, training programs, and hands-on experience
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with glow */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-glow-purple to-accent md:-translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {experiences.map((exp, index) => (
            <motion.a
              key={index}
              href={exp.link || "#"}
              target={exp.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`relative flex items-start gap-8 mb-12 ${exp.link ? 'cursor-pointer' : ''
                } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline dot with glow */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-primary to-glow-purple rounded-full border-4 border-background -translate-x-1/2 z-10 shadow-glow"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />

              {/* Content */}
              <motion.div
                className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
              >
                <div className="relative rounded-2xl p-6 bg-transparent hover:bg-white/[0.04] transition-all duration-300 group shadow-lg">
                  {/* Rotating rainbow border overlay */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl"
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
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      className="p-2.5 rounded-xl bg-black/40 border border-primary/40 group-hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Briefcase className="w-5 h-5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg group-hover:text-primary transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{exp.title}</h3>
                      <p className="text-white font-semibold text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-white text-sm mb-4 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{exp.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-white bg-transparent border border-white/40 rounded-full py-1 px-3 text-xs font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      {exp.period}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-medium border text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${typeColors[exp.type] || 'text-white border-primary/50 bg-transparent'}`}>
                      {exp.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.a>
          ))}
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

export default ExperienceSection;
