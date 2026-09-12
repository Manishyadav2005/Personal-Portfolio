import { Code, Layers, Database, Settings, Coffee, Braces, FileCode, Hash, Atom, Brain, Eye, Table2, Server, GitBranch, Github, Monitor, Terminal, FileText, Sheet } from 'lucide-react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    gradient: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(34, 211, 238, 0.2)',
    skills: [
      { name: 'Java', icon: Coffee },
      { name: 'Python', icon: Braces },
      { name: 'C', icon: FileCode },
      { name: 'C++', icon: Hash },
      { name: 'JavaScript', icon: Braces },
      { name: 'HTML', icon: Code },
      { name: 'CSS', icon: Layers },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Layers,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.2)',
    skills: [
      { name: 'React', icon: Atom },
      { name: 'NumPy', icon: Table2 },
      { name: 'Pandas', icon: Table2 },
      { name: 'OpenCV', icon: Eye },
      { name: 'TensorFlow', icon: Brain },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    gradient: 'from-green-500 to-emerald-600',
    glowColor: 'rgba(34, 197, 94, 0.2)',
    skills: [
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Server },
      { name: 'Firestore', icon: Database },
    ],
  },
  {
    title: 'Developer Tools & Platforms',
    icon: Settings,
    gradient: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.2)',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: Github },
      { name: 'VS Code', icon: Monitor },
     { name: 'Firebase', icon: Server },
      { name: 'Kali Linux', icon: Terminal },
     { name: 'Cloudinary', icon: Server },
      { name: 'MS Excel', icon: Sheet },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-transparent">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-transparent border border-primary/40 rounded-full text-primary font-medium text-sm mb-6 shadow-glow">
            <Code className="w-4 h-4" />
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">My Skills</span>
          </h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-6 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">
            A categorized overview of the technologies and tools I work with.
          </p>
        </motion.div>

        {/* Skills Grid - 2x2 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative"
              variants={cardVariants}
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ background: category.glowColor }}
              />
              
              {/* 100% Transparent Card */}
              <div className="relative h-full bg-transparent hover:bg-white/[0.04] rounded-3xl p-6 transition-all duration-300 group-hover:shadow-2xl">
                {/* Rotating rainbow border overlay */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl"
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
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} p-0.5 shadow-lg`}
                    style={{ boxShadow: `0 0 25px ${category.glowColor}` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-black/40 rounded-[14px] flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skill Chips - 100% Transparent with visible borders */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      custom={skillIndex}
                      variants={chipVariants}
                      className="group/chip flex items-center gap-2 px-3 py-2 bg-transparent hover:bg-white/10 border-[1.5px] border-white/60 hover:border-white rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105 shadow-sm"
                      whileHover={{ y: -2 }}
                    >
                      <skill.icon className="w-4 h-4 text-glow-cyan group-hover/chip:text-primary transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                      <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

export default SkillsSection;