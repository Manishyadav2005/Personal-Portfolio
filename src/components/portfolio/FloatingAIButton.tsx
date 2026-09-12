import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import airaImage from "../../assets/aira.png";

const FloatingAIButton = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate("/chatbot")}
      
      /* Floating Animation */
      animate={{
        y: [0, -12, 0],
      }}

      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}

      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group cursor-pointer"
    >
      {/* Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-purple-500 blur-2xl opacity-40 animate-pulse"></div>

      {/* Outer Pulse Ring */}
      <div className="absolute inset-0 rounded-full border border-purple-400/40 animate-ping"></div>

      {/* Main Assistant */}
      <motion.div
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="relative"
      >
        <img
          src={airaImage}
          alt="MS AIRA"
          className="
  w-14 h-14 sm:w-20 sm:h-20
  rounded-full
  border-4 border-purple-500
  shadow-[0_0_40px_rgba(168,85,247,0.8)]
  object-cover
"
        />

        {/* Online Indicator */}
        <span
          className="
            absolute bottom-1 right-1
            w-4 h-4
            bg-green-400
            rounded-full
            border-2 border-black
            animate-pulse
          "
        >
        </span>
      </motion.div>

      {/* Greeting Bubble */}
      <div
        className="
          absolute right-full top-1/2 -translate-y-1/2 mr-4
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          bg-black/80 text-white text-xs
          px-4 py-2 rounded-full
          whitespace-nowrap
          shadow-lg
        "
      >
        👋 Hi, I’m{" "}
        <span className="text-primary font-semibold">
          MS AIRA
        </span>
      </div>

    </motion.div>
  );
};

export default FloatingAIButton;