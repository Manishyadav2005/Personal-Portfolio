// 🧹 Clean markdown, emojis, technical acronyms, and formatting so speech sounds 100% natural and human
export const cleanTextForSpeech = (rawText: string): string => {
  if (!rawText) return "";

  return (
    rawText
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
      // Natural pronunciation for acronyms and names
      .replace(/\bMS\s*AIRA\b/gi, "Miss Aira")
      .replace(/\bAIRA\b/gi, "Aira")
      .replace(/\bB\.?\s*Tech\b/gi, "B Tech")
      .replace(/\bCGPA\b/gi, "C G P A")
      .replace(/\bDevOps\b/gi, "Dev Ops")
      .replace(/\bUI\/UX\b/gi, "U I and U X")
      .replace(/\bAPI\b/gi, "A P I")
      .replace(/\bAI\b/gi, "A I")
      // Remove emojis that TTS engines awkwardly pronounce
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        ""
      )
      // Clean dashes, brackets, and extra symbols
      .replace(/[—–]/g, ", ")
      .replace(/[()[\]{}]/g, " ")
      // Collapse multiple punctuation/spaces
      .replace(/\s*,\s*,+/g, ", ")
      .replace(/\s+/g, " ")
      .trim()
  );
};

// Check if text is Hindi or Hinglish
export const isHindiContent = (text: string): boolean => {
  if (!text) return false;
  if (/[\u0900-\u097F]/.test(text)) return true;

  const hindiKeywords = [
    "namaste", "namaskar", "kaise", "kya", "hai", "hain", "nahi", "batao",
    "karna", "mera", "meri", "mere", "aap", "aapko", "haan", "theek",
    "shukriya", "dhanyawad", "bhai", "aur", "bolo", "boliye", "swagat"
  ];
  const words = text.toLowerCase().split(/\s+/);
  return words.some((w) => hindiKeywords.includes(w));
};

// Active audio element reference for Google Studio TTS
let currentAudio: HTMLAudioElement | null = null;
let currentAudioUrl: string | null = null;

// 👩‍🦰 Fallback: Pick the most natural, human-like female voice in browser
export const selectBestFemaleVoice = (
  isHindi: boolean,
  synth: SpeechSynthesis
): SpeechSynthesisVoice | null => {
  const voices = synth.getVoices();
  if (!voices || voices.length === 0) return null;

  const lower = (s: string) => (s || "").toLowerCase();

  if (isHindi) {
    const naturalHindi = voices.find(
      (v) =>
        lower(v.name).includes("natural") &&
        (lower(v.lang).startsWith("hi") || lower(v.name).includes("swara"))
    );
    if (naturalHindi) return naturalHindi;

    const googleHindi = voices.find(
      (v) =>
        lower(v.name).includes("google") &&
        (lower(v.name).includes("हिन्दी") || lower(v.lang).startsWith("hi"))
    );
    if (googleHindi) return googleHindi;

    const namedHindi = voices.find(
      (v) => lower(v.name).includes("swara") || lower(v.name).includes("kalpana")
    );
    if (namedHindi) return namedHindi;

    const genericHindi = voices.find(
      (v) => lower(v.lang).startsWith("hi") && !lower(v.name).includes("male")
    );
    if (genericHindi) return genericHindi;
  }

  // English Female Voices
  const naturalFemale = voices.find(
    (v) =>
      lower(v.name).includes("natural") &&
      (lower(v.name).includes("neerja") ||
        lower(v.name).includes("jenny") ||
        lower(v.name).includes("aria") ||
        lower(v.name).includes("sonia"))
  );
  if (naturalFemale) return naturalFemale;

  const googleUkFemale = voices.find((v) =>
    lower(v.name).includes("google uk english female")
  );
  if (googleUkFemale) return googleUkFemale;

  const indianEnglishFemale = voices.find(
    (v) =>
      (lower(v.name).includes("neerja") || lower(v.name).includes("heera")) &&
      !lower(v.name).includes("male")
  );
  if (indianEnglishFemale) return indianEnglishFemale;

  const googleUs = voices.find((v) => lower(v.name).includes("google us english"));
  if (googleUs) return googleUs;

  const appleFemale = voices.find(
    (v) =>
      lower(v.name).includes("samantha") ||
      lower(v.name).includes("siri") ||
      lower(v.name).includes("karen") ||
      lower(v.name).includes("moira") ||
      lower(v.name).includes("victoria")
  );
  if (appleFemale) return appleFemale;

  const onlineFemale = voices.find(
    (v) =>
      lower(v.lang).startsWith("en") &&
      (lower(v.name).includes("female") || lower(v.name).includes("online")) &&
      !lower(v.name).includes("male")
  );
  if (onlineFemale) return onlineFemale;

  const nonMaleEnglish = voices.find(
    (v) =>
      lower(v.lang).startsWith("en") &&
      !lower(v.name).includes("male") &&
      !lower(v.name).includes("david") &&
      !lower(v.name).includes("mark") &&
      !lower(v.name).includes("george") &&
      !lower(v.name).includes("ravi")
  );
  if (nonMaleEnglish) return nonMaleEnglish;

  return voices[0] || null;
};

// Fallback to browser SpeechSynthesis if audio fetch fails
const fallbackSpeechSynthesis = (
  cleanedText: string,
  isHindi: boolean,
  onEnd?: () => void
) => {
  if (!("speechSynthesis" in window)) {
    if (onEnd) onEnd();
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.rate = 1.0;
  utterance.pitch = 1.08;
  utterance.volume = 1.0;
  utterance.lang = isHindi ? "hi-IN" : "en-US";

  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  const execute = () => {
    const chosen = selectBestFemaleVoice(isHindi, synth);
    if (chosen) {
      utterance.voice = chosen;
      utterance.lang = chosen.lang;
    }
    synth.cancel();
    synth.speak(utterance);
  };

  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => execute();
  } else {
    execute();
  }
};

/**
 * 🎙️ Speaks using Google's Ultra-Sweet & Natural Indian Female Voice Audio
 * Primary: Google High-Definition Neural TTS (MP3 stream)
 * Fallback: Browser Web Speech API with tuned female acoustics
 */
export const speak = (text: string, onEnd?: () => void) => {
  stopSpeaking();

  const cleanedText = cleanTextForSpeech(text);
  if (!cleanedText) {
    if (onEnd) onEnd();
    return;
  }

  const isHindi = isHindiContent(cleanedText);
  const lang = isHindi ? "hi" : "en-IN";

  // Google TTS endpoint available on Vite dev server & local backend
  const ttsUrl = `/api/tts?text=${encodeURIComponent(cleanedText)}&lang=${lang}`;

  try {
    const audio = new Audio(ttsUrl);
    currentAudio = audio;
    currentAudioUrl = ttsUrl;

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
        currentAudioUrl = null;
      }
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn("Google TTS audio load failed, using high-quality browser fallback:", e);
      if (currentAudio === audio) {
        currentAudio = null;
        currentAudioUrl = null;
      }
      fallbackSpeechSynthesis(cleanedText, isHindi, onEnd);
    };

    audio.play().catch((err) => {
      console.warn("Audio play rejected (possible autoplay restriction):", err);
      if (currentAudio === audio) {
        currentAudio = null;
        currentAudioUrl = null;
      }
      fallbackSpeechSynthesis(cleanedText, isHindi, onEnd);
    });
  } catch (err) {
    console.warn("Error initializing audio, falling back to Web Speech:", err);
    fallbackSpeechSynthesis(cleanedText, isHindi, onEnd);
  }
};

// 🛑 Stop all speaking (Google Audio + Browser SpeechSynthesis)
export const stopSpeaking = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    currentAudioUrl = null;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

// ✅ Check if currently speaking
export const isSpeaking = (): boolean => {
  const isAudioPlaying = !!(
    currentAudio &&
    !currentAudio.paused &&
    !currentAudio.ended &&
    currentAudio.currentTime > 0
  );
  const isSynthSpeaking =
    "speechSynthesis" in window && window.speechSynthesis.speaking;

  return isAudioPlaying || isSynthSpeaking;
};