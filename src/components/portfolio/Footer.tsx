import { Github, Linkedin, Mail, Facebook, Instagram, Youtube, Heart } from 'lucide-react';

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
  { icon: Github, href: 'https://github.com/Manishyadav2005', color: 'hover:text-white' },
  { icon: Linkedin, href: 'https://linkedin.com/in/manish-yadav-644062267', color: 'hover:text-[#0A66C2]' },
  { icon: Mail, href: 'mailto:msmanish0502@gmail.com', color: 'hover:text-green-400' },

 /* { icon: Instagram, href: 'https://www.instagram.com/msfincode/?hl=en', color: 'hover:text-[#E4405F]' },
  { icon: Facebook, href: 'https://www.facebook.com/msfincode', color: 'hover:text-[#1877F2]' },
  { icon: Youtube, href: 'https://www.youtube.com/@msfincode', color: 'hover:text-[#FF0000]' },*/
].map((social, i) => (
             <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="relative p-3 glass-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  borderRadius: "inherit",
                  padding: "1.5px",
                  background:
                    "conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "spin-border 3s linear infinite",
                  border: "none",
                }}
              />
              <social.icon className={`relative z-20 w-5 h-5 text-foreground transition-colors duration-300 ${social.color}`} />
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
    </footer>
  );
};

export default Footer;
