import { Briefcase, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Summer Intern – DevOps',
    company: 'Celebal Technologies',
    period: 'May 2025 – July 2025',
    type: 'Remote',
    description: 'Hands-on experience with CI/CD pipelines, cloud deployment, and monitoring tools.',
  },
  {
    title: 'Intern – Cyber Security',
    company: 'Edunet Foundation (AICTE + IBM SkillsBuild)',
    period: 'May – June 2025',
    type: 'Virtual',
    description: 'Learned cybersecurity fundamentals, threat analysis, and security best practices.',
  },
  {
    title: 'Intern – Foundations of AI',
    company: 'Edunet Foundation (AICTE + Microsoft)',
    period: 'April 2025',
    type: 'Virtual',
    description: 'Explored AI/ML concepts, neural networks, and practical AI applications.',
  },
  {
    title: 'Java Web Development with AI Trainee',
    company: 'HCLTech',
    period: 'March 2025',
    type: 'Training',
    description: 'Advanced Java development with AI integration techniques.',
  },
  {
    title: 'Robotics Program Trainee',
    company: 'ERA Foundation (AKTU)',
    period: 'March – June 2025',
    type: 'Training',
    description: 'Hands-on robotics programming and automation concepts.',
  },
  {
    title: 'Campus Ambassador',
    company: 'Entrepreneurship Development Cell (eDC), IIT Delhi',
    period: 'Dec 2025 – Jan 2026',
    type: 'Ambassador',
    description: 'Promoted entrepreneurship initiatives and organized campus events.',
  },
  {
    title: 'Frontend Development Intern',
    company: 'CodeAlpha',
    period: 'June 2024',
    type: 'Remote',
    description: 'Built responsive UI components and improved frontend performance.',
  },
  {
    title: 'Web Development Intern',
    company: 'TechOctaNet Services Pvt. Ltd.',
    period: 'May 2024',
    type: 'Remote',
    description: 'Developed full-stack web applications and learned industry practices.',
  },
  {
    title: 'Web Development Intern (Virtual)',
    company: 'CodSoft',
    period: 'May 2024',
    type: 'Virtual',
    description: 'Created interactive web projects and enhanced coding skills.',
  },
];

const typeColors: Record<string, string> = {
  'Remote': 'text-glow-cyan border-glow-cyan/30 bg-glow-cyan/10',
  'Virtual': 'text-glow-purple border-glow-purple/30 bg-glow-purple/10',
  'Training': 'text-glow-green border-glow-green/30 bg-glow-green/10',
  'Ambassador': 'text-accent border-accent/30 bg-accent/10',
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--glow-purple)/_0.02)] to-background" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      
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
          <span className="inline-flex items-center gap-2 glass-pill border-accent/30 text-accent mb-6">
            <Briefcase className="w-4 h-4" />
            Experience
          </span>
          <h2 className="section-title">
            My <span className="text-gradient">Professional</span> Journey
          </h2>
          <p className="section-subtitle">
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
            <motion.div
              key={index}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
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
                <div className="glass-card-hover p-6 bg-gradient-to-br from-[hsl(var(--glass-bg))] to-[hsl(var(--primary)/_0.05)] group">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className="p-2 glass-card border-primary/30 group-hover:shadow-glow transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Briefcase className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{exp.title}</h3>
                      <p className="text-primary font-medium text-sm">{exp.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground glass-pill py-1 px-3">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className={`px-3 py-1 rounded-full font-medium border ${typeColors[exp.type] || 'text-primary border-primary/30 bg-primary/10'}`}>
                      {exp.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
