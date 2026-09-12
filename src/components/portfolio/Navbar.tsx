import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Research', href: '#research', id: 'research' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section for highlight pill
      const scrollPosition = window.scrollY + 200;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      {/* Floating Pill Capsule Bar with Glassmorphism & Rotating Animated Border */}
      <nav
        className={`relative pointer-events-auto w-full max-w-6xl rounded-full transition-all duration-300 py-2.5 sm:py-3 px-4 sm:px-7 flex items-center justify-between gap-3 ${
          isScrolled
            ? 'bg-black/50 backdrop-blur-2xl border border-white/15'
            : 'bg-black/35 backdrop-blur-xl border border-white/10'
        }`}
        style={{
          boxShadow: isScrolled
            ? '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Rotating Animated Rainbow Border */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            padding: '1.5px',
            background:
              'conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'spin-border 4s linear infinite',
          }}
        />

        {/* Left: Brand Logo */}
        <a
          href="#home"
          className="group flex items-center pl-2 transition-transform duration-200 hover:scale-105 relative z-10"
        >
          <span
            className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            style={{
              WebkitTextStroke: '0.5px transparent',
              backgroundImage:
                'conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              paintOrder: 'stroke fill',
              animation: 'spin-border 3s linear infinite',
            }}
          >
            Manish
          </span>
        </a>

        {/* Center: Desktop Navigation Links (Vibrant Colorful Hover & Active State) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-7 relative z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`nav-colorful-link text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                  isActive ? 'active' : ''
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden lg:flex items-center gap-2 pr-1 relative z-10">
          <a
            href="#contact"
            className="relative inline-flex items-center justify-center px-5 py-2 rounded-full text-xs xl:text-sm font-semibold text-white group overflow-hidden bg-transparent hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-glow"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                padding: '1.5px',
                background:
                  'conic-gradient(from var(--angle, 0deg), #ff4d00, #ff4500, #ffcc00, #00ff88, #00cfff, #a855f7, #ff0080, #ff4d00)',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                animation: 'spin-border 3s linear infinite',
              }}
            />
            <span className="relative z-10">
              Let's Talk
            </span>
          </a>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2 relative z-10">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={20} />
            ) : (
              <div className="flex flex-col gap-[4px] w-4 items-center">
                <span className="h-[2px] w-full rounded-full hamburger-line" style={{ animationDelay: '0s' }} />
                <span className="h-[2px] w-3/4 rounded-full hamburger-line" style={{ animationDelay: '0.3s' }} />
                <span className="h-[2px] w-full rounded-full hamburger-line" style={{ animationDelay: '0.6s' }} />
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Floating Dropdown Card */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden w-full max-w-md mt-2 p-3 bg-black/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm py-2 px-3.5 rounded-xl transition-all ${
                    isActive
                      ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d00] via-[#00cfff] to-[#a855f7] bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2 mt-1 border-t border-white/10 flex gap-2">
              <a
                href="/Manish_Yadav_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
              <a
                href="#contact"
                className="flex-1 text-center py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full transition-all shadow-glow"
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for conic animations & colorful nav links */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
        @keyframes line-color-cycle {
          0%   { background-color: #ff4500; }
          33%  { background-color: #00cfff; }
          66%  { background-color: #a855f7; }
          100% { background-color: #ff4500; }
        }
        .hamburger-line {
          animation: line-color-cycle 2.4s linear infinite;
        }

        /* Vibrant Colorful Nav Links with Smooth Hover & Active State (Text Only, No Lines) */
        .nav-colorful-link {
          color: #e2e8f0;
          font-weight: 500;
          transition: all 0.25s ease;
          position: relative;
        }
        .nav-colorful-link:hover {
          background-image: linear-gradient(135deg, #ff4d00, #ffcc00, #00cfff, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          filter: drop-shadow(0 0 8px rgba(0, 207, 255, 0.7));
          transform: translateY(-1px);
        }
        .nav-colorful-link.active {
          background-image: linear-gradient(135deg, #ff4d00, #ffcc00, #00cfff, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          font-weight: 700;
          filter: drop-shadow(0 0 10px rgba(255, 77, 0, 0.8));
        }
      `}</style>
    </header>
  );
};

export default Navbar;