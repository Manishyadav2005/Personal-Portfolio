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
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--accent)/_0.02)] to-background" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      
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
          <span className="inline-flex items-center gap-2 glass-pill border-accent/30 text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            Services
          </span>
          <h2 className="section-title">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="section-subtitle">
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
              className={`group glass-card p-8 bg-gradient-to-br ${service.gradient} transition-all duration-500 hover:scale-[1.02] ${service.borderGlow}`}
            >
              {/* Icon */}
              <motion.div 
                className="glass-card p-4 w-fit mb-6 border-[hsl(var(--glass-border)/_0.5)] group-hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <service.icon className={`w-8 h-8 ${service.iconColor}`} />
              </motion.div>

              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 ${service.iconColor} font-semibold text-sm group-hover:gap-3 transition-all duration-300`}
              >
                Learn More 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
