// 🧹 Clean markdown, emojis, URLs, and formatting so speech sounds 100% natural
export const cleanTextForSpeech = (rawText: string): string => {
  if (!rawText) return "";

  return rawText
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    // Remove links/URLs: [Link](url) -> Link, or raw https://... -> ""
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/gi, "")
    // Remove bold/italic markdown symbols (**text** -> text)
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    // Remove markdown headers (# Title -> Title)
    .replace(/^#{1,6}\s+/gm, "")
    // Convert numbered lists (1. Item -> Item)
    .replace(/^\s*\d+\.\s+/gm, ", ")
    // Convert bullets (- Item -> Item)
    .replace(/^\s*[-•*]\s+/gm, ", ")
    // Remove emojis that TTS engines awkwardly pronounce
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    // Clean dashes, brackets, and extra symbols
    .replace(/[—–]/g, ", ")
    .replace(/[()[\]{}]/g, " ")
    // Collapse multiple punctuation/spaces
    .replace(/\s*,\s*,+/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
};

// Check if text is Hindi or Hinglish
const isHindiContent = (text: string): boolean => {
  // Check for Devanagari script
  if (/[\u0900-\u097F]/.test(text)) return true;

  // Common Hindi / Hinglish keywords
  const hindiKeywords = [
    "namaste", "namaskar", "kaise", "kya", "hai", "hain", "nahi", "batao",
    "karna", "mera", "meri", "mere", "aap", "aapko", "haan", "theek",
    "shukriya", "dhanyawad", "bhai", "aur"
  ];
  const words = text.toLowerCase().split(/\s+/);
  return words.some((w) => hindiKeywords.includes(w));
};

export const speak = (text: string, onEnd?: () => void) => {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const cleanedText = cleanTextForSpeech(text);
  if (!cleanedText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  const isHindi = isHindiContent(cleanedText);

  // 🇮🇳 Natural Indian Female Voice Pace & Pitch
  utterance.rate = 0.98; // Natural, human-like cadence
  utterance.pitch = 1.0; // Warm, natural female pitch
  utterance.volume = 1.0;
  utterance.lang = isHindi ? "hi-IN" : "en-IN";

  // 🔔 Callback when speaking finishes
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  const selectIndianFemaleVoice = () => {
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return null;

    if (isHindi) {
      // 1. Prioritize Hindi Indian Female voices
      return (
        voices.find((v) => v.name.includes("Swara") || v.name.includes("Kalpana")) ||
        voices.find((v) => v.name.includes("Google") && (v.name.includes("हिन्दी") || v.lang === "hi-IN")) ||
        voices.find((v) => v.lang.toLowerCase().startsWith("hi") && !v.name.toLowerCase().includes("male")) ||
        voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
        // Fallback to Indian English female if no Hindi voice installed
        voices.find((v) => v.name.includes("Neerja") || v.name.includes("Heera")) ||
        voices.find((v) => v.lang === "en-IN" && (v.name.includes("Female") || v.name.includes("Google"))) ||
        voices.find((v) => v.lang === "en-IN")
      );
    } else {
      // 2. Prioritize Indian English Female voices
      return (
        voices.find((v) => v.name.includes("Neerja")) ||
        voices.find((v) => v.name.includes("Heera")) ||
        voices.find((v) => v.name.includes("Swara")) ||
        voices.find((v) => v.lang === "en-IN" && (v.name.includes("Female") || v.name.includes("Google"))) ||
        voices.find((v) => v.lang === "en-IN" && !v.name.toLowerCase().includes("male")) ||
        voices.find((v) => v.lang === "en-IN") ||
        voices.find((v) => v.lang.toLowerCase().includes("in")) ||
        // General female fallback
        voices.find((v) => v.name.includes("Female")) ||
        voices.find((v) => v.name.includes("Zira")) ||
        voices.find((v) => v.lang === "en-US" && !v.name.toLowerCase().includes("male"))
      );
    }
  };

  const executeSpeak = () => {
    const chosenVoice = selectIndianFemaleVoice();
    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    }

    synth.cancel();
    synth.speak(utterance);
  };

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      executeSpeak();
    };
  } else {
    executeSpeak();
  }
};

// 🛑 Stop speaking
export const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

// ✅ Check if currently speaking
export const isSpeaking = (): boolean => {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
};