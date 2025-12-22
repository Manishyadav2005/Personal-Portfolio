import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-[hsl(var(--glass-border)/_0.3)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/_0.05)] to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <a href="#home" className="text-2xl font-bold text-gradient">Manish</a>
            <p className="text-muted-foreground text-sm mt-2">Software Developer</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/Manishyadav2005' },
              { icon: Linkedin, href: 'https://linkedin.com/in/manish-yadav-644062267' },
              { icon: Mail, href: 'mailto:msmanish0502@gmail.com' },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 glass-card hover:shadow-glow hover:border-primary/50 transition-all duration-300">
                <social.icon className="w-5 h-5 text-foreground" />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Manish Yadav
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">© {currentYear} All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
