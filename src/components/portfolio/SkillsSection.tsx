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
      { name: 'PyCharm', icon: Terminal },
      { name: 'Windows OS', icon: Monitor },
      { name: 'Kali Linux', icon: Terminal },
      { name: 'MS Word', icon: FileText },
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
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Futuristic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1035] to-[#0d1525]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent" />
      
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
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full text-primary font-medium text-sm mb-6">
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
              {/* Glow effect */}
              <div 
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: category.glowColor }}
              />
              
              {/* Glassmorphism Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <motion.div 
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} p-0.5 shadow-lg`}
                    style={{ boxShadow: `0 0 25px ${category.glowColor}` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-[#0d1525]/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      custom={skillIndex}
                      variants={chipVariants}
                      className="group/chip flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:scale-105"
                      whileHover={{ y: -2 }}
                    >
                      <skill.icon className="w-4 h-4 text-primary/80 group-hover/chip:text-primary transition-colors" />
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
