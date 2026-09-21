import emailjs from "emailjs-com";
import { Mail, Github, Linkedin, Sparkles } from 'lucide-react';
import { FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'ymanish6390@gmail.com', href: 'mailto:ymanish6390@gmail.com', color: 'text-primary', bg: 'from-primary/20 to-glow-cyan/20' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Manish Yadav', href: 'https://linkedin.com/in/manish-yadav-644062267', color: 'text-glow-blue', bg: 'from-glow-blue/20 to-glow-cyan/20' },
    { icon: Github, label: 'GitHub', value: 'Manishyadav2005', href: 'https://github.com/Manishyadav2005', color: 'text-glow-purple', bg: 'from-glow-purple/20 to-glow-pink/20' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_xx2xahh",        // Service ID
        "template_w5ni7y3",       // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "e8d_OsUmuoidRoj9A"        // Public Key
      )
      .then(() => {
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast({
          title: "Failed to send message",
          description: "Please try again later.",
          variant: "destructive",
        });
      });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-accent/40 text-accent mb-6 shadow-glow">
            <Sparkles className="w-4 h-4" />
            Contact
          </span>
          <h2 className="section-title">Got a Project? <span className="text-gradient">Let's Talk</span></h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-lg max-w-2xl mx-auto font-normal">Feel free to reach out for collaborations, opportunities, or just a friendly chat!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">Get in Touch</h3>
            <p className="text-white text-base mb-8 leading-relaxed font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative flex items-center gap-4 p-4 rounded-2xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl group"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl z-10"
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
                  <div className="p-3 rounded-xl bg-transparent border border-white/30 relative z-20">
                    <link.icon className={`w-6 h-6 ${link.color} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`} />
                  </div>
                  <div className="relative z-20">
                    <p className="text-xs text-white/80 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{link.label}</p>
                    <p className="font-bold text-white text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{link.value}</p>
                  </div>
                </a> 
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            className="relative rounded-3xl p-8 bg-transparent hover:bg-white/[0.03] transition-all duration-300 shadow-2xl"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Your Name</label>
                <div className="relative rounded-xl overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl z-10"
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
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className="relative z-20 w-full px-4 py-3 text-white placeholder:text-white/50 bg-transparent rounded-xl focus:outline-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Your Email</label>
                <div className="relative rounded-xl overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl z-10"
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
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    className="relative z-20 w-full px-4 py-3 text-white placeholder:text-white/50 bg-transparent rounded-xl focus:outline-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Message</label>
                <div className="relative rounded-xl overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl z-10"
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
                  <textarea 
                    id="message" 
                    value={formData.message} 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    rows={4} 
                    className="relative z-20 w-full px-4 py-3 resize-none text-white placeholder:text-white/50 bg-transparent rounded-xl focus:outline-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                    placeholder="Tell me about your project..." 
                    required 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="relative w-full overflow-hidden bg-transparent hover:bg-white/10 text-white font-semibold py-4 rounded-xl shadow-glow hover:scale-[1.02] transition-all duration-300"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl z-10"
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
                <span className="relative z-20 flex items-center justify-center gap-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-base font-semibold">
                  <FaPaperPlane className="w-4 h-4 text-glow-cyan" />
                  Send Message
                </span>
              </button>
            </form>
          </motion.div>
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
    </section>
  );
};

export default ContactSection;
