import { GraduationCap, Target, Code, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--primary)/_0.02)] to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
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
                  className={`glass-card-hover p-6 bg-gradient-to-br ${card.gradient} ${card.borderColor} ${index % 2 === 1 ? 'mt-8' : ''}`}
                >
                  <div className={`p-3 glass-card w-fit mb-4 ${card.borderColor}`}>
                    <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{card.title}</h4>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
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
            <span className="inline-flex items-center gap-2 glass-pill border-primary/30 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              About Me
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Designing <span className="text-gradient">Solutions</span>, Not Just Visuals
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              I'm <span className="text-foreground font-semibold">Manish Yadav</span>, a motivated software developer passionate about 
              web technologies, Java, DevOps, and AI-driven solutions. I thrive on learning new technologies 
              and solving real-world problems through clean, efficient code.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              My goal is to grow into a skilled developer while building impactful digital products that 
              make a difference. I believe in continuous learning and staying updated with the latest 
              industry trends and best practices.
            </p>

            {/* Education */}
            <motion.div 
              className="glass-card p-6 mb-8 bg-gradient-to-r from-primary/10 to-glow-purple/10 border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 glass-card border-primary/30">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">B.Tech in Information Technology</h4>
                  <p className="text-muted-foreground">Dr. A.P.J. Abdul Kalam Technical University</p>
                  <p className="text-sm text-primary font-medium mt-1">2022 – 2026</p>
                </div>
              </div>
            </motion.div>

            <Button 
              size="lg" 
              asChild 
              className="group bg-gradient-to-r from-primary to-glow-purple hover:from-primary/90 hover:to-glow-purple/90 shadow-glow"
            >
              <a href="#contact">
                Let's Connect
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
