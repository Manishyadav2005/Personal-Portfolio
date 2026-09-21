import {
  Building2,
  HeartPulse,
  Hotel,
  UtensilsCrossed,
  Bot,
  Globe,
  ArrowRight,
  Sparkles,
  Boxes,
} from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Building2,
    title: 'BUSINESS MANAGEMENT',
    description:
      'Custom management systems that connect customers, operations, teams and workflows into one unified platform.',
    iconColor: 'text-blue-400',
  },
  {
    icon: HeartPulse,
    title: 'HEALTHCARE SYSTEMS',
    description:
      'Smart hospital and clinical management systems designed to simplify patient records, staff and daily operations.',
    iconColor: 'text-purple-400',
  },
  {
    icon: Hotel,
    title: 'HOTEL MANAGEMENT',
    description:
      'Digital systems designed for hospitality businesses to manage bookings, guest requests, rooms and staff.',
    iconColor: 'text-emerald-400',
  },
  {
    icon: UtensilsCrossed,
    title: 'RESTAURANT & BILLING',
    description:
      'Restaurant management and billing solutions built to simplify orders, payments, recipe inventory and reports.',
    iconColor: 'text-sky-400',
  },
  {
    icon: Bot,
    title: 'AI & INTELLIGENT SYSTEMS',
    description:
      'AI assistants, intelligent chatbots and automation systems designed to interact with customers and streamline work.',
    iconColor: 'text-rose-400',
  },
  {
    icon: Globe,
    title: 'WEB & DIGITAL SOLUTIONS',
    description:
      'Modern, high-performance web applications and digital platforms that help brands stand out and convert visitors.',
    iconColor: 'text-amber-400',
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
    <section id="services" className="py-20 relative overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-glow-purple/10 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-accent/40 text-accent mb-4 shadow-glow text-xs sm:text-sm">
            <Sparkles className="w-4 h-4" />
            Services
          </span>
          <h2 className="section-title">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Comprehensive development services to bring your ideas to life
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="relative group p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Rotating rainbow border overlay */}
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

              <div>
                {/* Icon */}
                <motion.div 
                  className="p-2.5 rounded-xl w-fit mb-3 bg-black/40 border border-white/20 group-hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <service.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${service.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`} />
                </motion.div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/85 text-xs sm:text-[13px] mb-4 leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {service.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-white font-semibold text-xs group-hover:gap-2.5 transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                >
                  LEARN MORE 
                  <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Custom Software & Ecosystems Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group mt-6 p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-white/[0.04] transition-all duration-300 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
        >
          {/* Rotating rainbow border overlay */}
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

          <div className="flex-1 max-w-4xl">
            {/* Icon */}
            <motion.div
              className="p-2.5 rounded-xl w-fit mb-3 bg-emerald-500/10 border border-emerald-500/25 group-hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Boxes className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
            </motion.div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              CUSTOM SOFTWARE & ECOSYSTEMS
            </h3>

            {/* Description */}
            <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              When off-the-shelf software does not fit your business model, we design, architect, and engineer high-performance bespoke digital systems tailored exactly to your operational workflows.
            </p>
          </div>

          {/* Action Link */}
          <div className="shrink-0 pt-1 lg:pt-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold text-xs sm:text-sm tracking-wider uppercase group-hover:gap-3 transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              EXPLORE CUSTOM ARCHITECTURE
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
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

export default ServicesSection;
