import { Globe, Layout, Server, Cloud, Wrench, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Building responsive, performance-focused web applications with modern technologies.',
    gradient: 'from-primary/20 to-glow-cyan/20',
    iconColor: 'text-primary',
    borderGlow: 'hover:shadow-[0_0_30px_hsl(var(--primary)/_0.3)]',
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    description: 'Creating modern, accessible UI/UX with React and cutting-edge frontend tools.',
    gradient: 'from-accent/20 to-glow-orange/20',
    iconColor: 'text-accent',
    borderGlow: 'hover:shadow-[0_0_30px_hsl(var(--accent)/_0.3)]',
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Developing secure APIs and robust database integrations for scalable applications.',
    gradient: 'from-glow-blue/20 to-glow-cyan/20',
    iconColor: 'text-glow-blue',
    borderGlow: 'hover:shadow-[0_0_30px_hsl(var(--glow-blue)/_0.3)]',
  },
  {
    icon: Cloud,
    title: 'DevOps & Deployment',
    description: 'Setting up CI/CD pipelines, cloud deployment, and monitoring solutions.',
    gradient: 'from-glow-purple/20 to-glow-pink/20',
    iconColor: 'text-glow-purple',
    borderGlow: 'hover:shadow-[0_0_30px_hsl(var(--glow-purple)/_0.3)]',
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Providing assistance for academic and personal project development.',
    gradient: 'from-glow-green/20 to-glow-cyan/20',
    iconColor: 'text-glow-green',
    borderGlow: 'hover:shadow-[0_0_30px_hsl(var(--glow-green)/_0.3)]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-glow-purple/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-accent/40 text-accent mb-6 shadow-glow">
            <Sparkles className="w-4 h-4" />
            Services
          </span>
          <h2 className="section-title">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">
            Comprehensive development services to bring your ideas to life
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="relative group p-8 rounded-3xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl"
            >
              {/* Rotating rainbow border overlay */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl z-10"
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

              {/* Icon */}
              <motion.div 
                className="p-3.5 rounded-2xl w-fit mb-6 bg-black/40 border border-white/20 group-hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <service.icon className={`w-8 h-8 ${service.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`} />
              </motion.div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {service.title}
              </h3>
              
              <p className="text-white text-sm mb-6 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {service.description}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              >
                Learn More 
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
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

export default ServicesSection;
