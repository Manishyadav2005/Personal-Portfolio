import emailjs from "emailjs-com";
import { Mail, Send, Github, Linkedin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'msmanish0502@gmail.com', href: 'mailto:msmanish0502@gmail.com', color: 'text-primary', bg: 'from-primary/20 to-glow-cyan/20' },
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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--accent)/_0.02)] to-background" />
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 glass-pill border-accent/30 text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            Contact
          </span>
          <h2 className="section-title">Got a Project? <span className="text-gradient">Let's Talk</span></h2>
          <p className="section-subtitle">Feel free to reach out for collaborations, opportunities, or just a friendly chat!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 glass-card-hover p-4 bg-gradient-to-r ${link.bg}`}>
                  <div className="p-3 glass-card"><link.icon className={`w-6 h-6 ${link.color}`} /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="font-semibold text-foreground">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8 bg-gradient-to-br from-[hsl(var(--glass-bg))] to-[hsl(var(--primary)/_0.05)]">
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 input-glow text-foreground" placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Your Email</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 input-glow text-foreground" placeholder="john@example.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 input-glow resize-none text-foreground" placeholder="Tell me about your project..." required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-glow-purple hover:from-primary/90 hover:to-glow-purple/90 shadow-glow py-6">
                <Send className="w-5 h-5 mr-2" /> Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
