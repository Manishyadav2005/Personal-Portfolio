import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Globe,
  Send,
  MessageCircle,
  Code2,
  Heart,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  SocialLinkItem,
  INITIAL_SOCIAL_LINKS,
  getSocialLinks,
} from "@/services/socialMediaService";

const getSocialIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case "github":
      return { Icon: Github, color: "hover:text-white" };
    case "linkedin":
      return { Icon: Linkedin, color: "hover:text-[#0A66C2]" };
    case "mail":
    case "email":
    case "gmail":
      return { Icon: Mail, color: "hover:text-emerald-400" };
    case "instagram":
      return { Icon: Instagram, color: "hover:text-[#E4405F]" };
    case "youtube":
      return { Icon: Youtube, color: "hover:text-[#FF0000]" };
    case "facebook":
      return { Icon: Facebook, color: "hover:text-[#1877F2]" };
    case "twitter":
    case "x":
      return { Icon: Twitter, color: "hover:text-[#1DA1F2]" };
    case "leetcode":
      return { Icon: Code2, color: "hover:text-[#FFA116]" };
    case "whatsapp":
      return { Icon: MessageCircle, color: "hover:text-[#25D366]" };
    case "telegram":
      return { Icon: Send, color: "hover:text-[#229ED9]" };
    default:
      return { Icon: Globe, color: "hover:text-primary" };
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] =
    useState<SocialLinkItem[]>(INITIAL_SOCIAL_LINKS);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const data = await getSocialLinks();
        if (data && data.length > 0) {
          setSocialLinks(data);
        }
      } catch (err) {
        console.warn("Failed to load footer social links:", err);
      }
    };

    loadLinks();

    const handleUpdate = () => loadLinks();
    window.addEventListener("portfolio_social_links_updated", handleUpdate);
    return () =>
      window.removeEventListener("portfolio_social_links_updated", handleUpdate);
  }, []);

  const activeLinks = socialLinks.filter((item) => item.enabled !== false);

  return (
    <footer className="relative py-12 border-t border-[hsl(var(--glass-border)/_0.3)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/_0.05)] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Info & Admin Link */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold text-gradient">
              Manish
            </a>
            <p className="text-muted-foreground text-sm mt-1">
              Software Developer
            </p>
            <div className="mt-2 flex items-center justify-center md:justify-start">
              <Link
                to="/admin"
                aria-label="Admin Access"
                className="inline-flex items-center justify-center opacity-20 hover:opacity-80 transition-opacity duration-300 p-1 text-muted-foreground hover:text-primary"
              >
                <Lock className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Dynamic Social Icons from Admin */}
          <div className="flex items-center gap-3.5 sm:gap-4 flex-wrap justify-center">
            {activeLinks.map((social) => {
              const { Icon, color } = getSocialIcon(social.platform);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="relative p-3 rounded-2xl glass-card hover:shadow-glow hover:border-primary/50 transition-all duration-300 overflow-hidden hover:scale-110 group"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
                    style={{
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
                  <Icon
                    className={`relative z-20 w-5 h-5 text-foreground transition-colors duration-300 ${color}`}
                  />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right pr-0 md:pr-20">
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by{" "}
              Manish Yadav
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1.5">
              © {currentYear} All Rights Reserved
            </p>
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
