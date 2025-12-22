import { ExternalLink, Github, Shield, Brain, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--primary)/_0.02)] to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 glass-pill border-primary/30 text-primary mb-6">
            <Shield className="w-4 h-4" />
            Projects
          </span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="section-subtitle">
            Showcasing my best projects and technical implementations
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass-card overflow-hidden shadow-glow-lg">
            <div className="grid lg:grid-cols-2">
              {/* Project Visual */}
              <motion.div 
                className="relative bg-gradient-to-br from-primary via-glow-purple to-accent p-8 flex items-center justify-center min-h-[300px]"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 grid-pattern opacity-20" />
                
                <div className="text-center text-white relative z-10">
                  <motion.div 
                    className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                  >
                    <Shield className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">TRUESIGHT AI</h3>
                  <p className="text-white/80">Deepfake Detection System</p>
                </div>
                
                {/* Floating icons */}
                <motion.div 
                  className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-8 right-8 p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Eye className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                className="p-8 lg:p-10 bg-gradient-to-br from-[hsl(var(--glass-bg))] to-[hsl(var(--primary)/_0.02)]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="glass-pill py-1 px-3 text-xs border-accent/30 text-accent">
                    AI/ML
                  </span>
                  <span className="glass-pill py-1 px-3 text-xs border-primary/30 text-primary">
                    Computer Vision
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Deepfake Detection & Analysis System
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  An AI-powered platform to detect deepfake images, videos, and audio. 
                  Uses machine learning and computer vision for face detection, feature extraction, 
                  and classification. Provides explainable AI outputs with confidence scores 
                  and tampered region detection.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'PyTorch', 'FastAPI', 'OpenCV', 'NumPy', 'Pandas', 'FaceForensics++'].map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="glass-pill py-1 px-3 text-sm border-border/50 text-muted-foreground"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {[
                      'Multi-modal deepfake detection (image, video, audio)',
                      'Explainable AI with confidence scores',
                      'Combat misinformation & cyber fraud'
                    ].map((feature, i) => (
                      <motion.li 
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-gradient-to-r from-primary to-glow-purple hover:from-primary/90 hover:to-glow-purple/90 shadow-glow"
                  >
                    <a href="https://github.com/Manishyadav2005" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> View Code
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="glass-card border-primary/30 hover:border-primary/50 hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
