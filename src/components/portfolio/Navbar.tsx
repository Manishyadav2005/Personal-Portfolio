import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Download } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkItem {
  name: string;
  href: string;
  id: string;
  isRoute?: boolean;
}

const navLinks: NavLinkItem[] = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'My Work', href: '#projects', id: 'projects' },
  { name: 'Beyond the Code', href: '#beyond-the-code', id: 'beyond-the-code' },
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
      setIsScrolled(window.scrollY > 50);

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

  // Automatically close mobile hamburger menu smoothly on page scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const initialScrollY = window.scrollY;
    let isClosing = false;

    const handleScrollClose = () => {
      if (isClosing) return;
      if (Math.abs(window.scrollY - initialScrollY) > 8) {
        isClosing = true;
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScrollClose, { passive: true });
    window.addEventListener('touchmove', handleScrollClose, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollClose);
      window.removeEventListener('touchmove', handleScrollClose);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 ease-out transform ${
        isScrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto bg-black/85 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)]'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >

      {/* Full-Width Navigation Content Bar */}
      <nav className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <a
          href="#home"
          className="group flex items-center transition-transform duration-200 hover:scale-105 relative z-10"
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
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 relative z-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            if (link.isRoute) {
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="nav-colorful-link text-xs xl:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] whitespace-nowrap"
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={`nav-colorful-link text-xs xl:text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] whitespace-nowrap ${isActive ? 'active' : ''
                  }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden lg:flex items-center gap-2 relative z-10">
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
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-white/10 border border-white/20 hover:bg-white/20 transition-all active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={20} className="transition-transform duration-200 rotate-90" />
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

      {/* Mobile Dropdown Panel with Smooth Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-dropdown-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full px-4 sm:px-8 pb-4 bg-black/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                if (link.isRoute) {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-sm py-2 px-3.5 rounded-xl transition-all text-slate-300 hover:text-white hover:bg-white/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm py-2 px-3.5 rounded-xl transition-all ${isActive
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

              <div className="pt-2 mt-1 border-t border-white/10 flex flex-col gap-2">
                <div className="flex gap-2">
                  <a
                    href="/Manish_Yadav_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resume
                  </a>
                  <a
                    href="/contact.vcf"
                    download="Manish_Yadav_Contact.vcf"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Download size={13} className="shrink-0" />
                    Save Contact
                  </a>
                </div>
                <a
                  href="#contact"
                  className="w-full text-center py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary to-accent rounded-full transition-all shadow-glow active:scale-95"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
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