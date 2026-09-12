import aira from "@/assets/aira.png";
import { useState, useRef, useEffect } from "react";
import { Menu, ArrowLeft, Mic, Square, Trash2, Plus, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIChatSidebar from "./AIChatSidebar";
import { speak, stopSpeaking } from "@/utils/speak";
import { GeminiLiveClient } from "@/utils/geminiLiveClient";

const SUGGESTED_QUESTIONS = [
  "Tell me about Manish Yadav",
  "What internships has Manish completed?",
  "What projects has Manish worked on?",
  "What skills does Manish have?",
  "What certifications does Manish hold?",
  "What services does Manish offer?",
];

// ✍️ Typewriter Component — ek ek character karke text dikhata hai
const TypewriterText = ({
  text,
  onDone,
}: {
  text: string;
  onDone?: () => void;
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, 18); // speed: 18ms per character
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="whitespace-pre-wrap break-words">
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-4 bg-purple-400 ml-[2px] animate-pulse align-middle" />
      )}
    </span>
  );
};

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 🎙️ Voice states
  // 🎙️ Continuous Voice conversation states
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [isContinuousVoice, setIsContinuousVoice] = useState(false);
  const isContinuousVoiceRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isLoadingRef = useRef(false);
  const restartTimerRef = useRef<any>(null);

  const recognitionRef = useRef<any>(null);
  const liveClientRef = useRef<GeminiLiveClient | null>(null);

  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const dictationRef = useRef<any>(null);

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🎙️ Single voice typing / dictation
  const startDictation = () => {
    if (isContinuousVoice) {
      stopContinuousVoice();
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice typing is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (dictationRef.current) {
      try { dictationRef.current.abort(); } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    dictationRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.interimResults = true;

    recognition.onstart = () => setIsDictating(true);
    recognition.onresult = (event: any) => {
      let fullText = "";
      for (let i = 0; i < event.results.length; i++) {
        fullText += event.results[i][0].transcript;
      }
      setInput(fullText);
    };
    recognition.onerror = () => setIsDictating(false);
    recognition.onend = () => setIsDictating(false);

    try {
      recognition.start();
    } catch (err) {
      setIsDictating(false);
    }
  };

  const toggleDictation = () => {
    if (isDictating) {
      try { dictationRef.current?.stop(); } catch (e) {}
      setIsDictating(false);
    } else {
      startDictation();
    }
  };

  // When AI finishes speaking, automatically resume listening if continuous voice is on!
  const handleAudioFinished = () => {
    isSpeakingRef.current = false;
    setIsSpeakingState(false);

    if (isContinuousVoiceRef.current && !isLoadingRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = setTimeout(() => {
        if (isContinuousVoiceRef.current && !isSpeakingRef.current && !isLoadingRef.current) {
          startRecognition();
        }
      }, 450); // Small breath pause before turning mic back on
    }
  };

  // Stop continuous voice conversation
  const stopContinuousVoice = () => {
    isContinuousVoiceRef.current = false;
    setIsContinuousVoice(false);
    setIsListening(false);
    clearTimeout(restartTimerRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }

    liveClientRef.current?.stopSpeaking();
    stopSpeaking();
    isSpeakingRef.current = false;
    setIsSpeakingState(false);
  };

  // Start continuous voice conversation
  const startContinuousVoice = () => {
    stopContinuousVoice();
    isContinuousVoiceRef.current = true;
    setIsContinuousVoice(true);
    startRecognition();
  };

  const toggleContinuousVoice = () => {
    if (isContinuousVoiceRef.current) {
      stopContinuousVoice();
    } else {
      startContinuousVoice();
    }
  };

  // Recognition loop
  const startRecognition = () => {
    if (!isContinuousVoiceRef.current || isSpeakingRef.current || isLoadingRef.current) {
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Google Chrome.");
      stopContinuousVoice();
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (!transcript) return;

      setIsListening(false);

      // Check if user said "stop" / "bye"
      const lower = transcript.toLowerCase();
      if (
        lower === "stop" ||
        lower === "bye" ||
        lower === "exit" ||
        lower === "quit" ||
        lower === "band karo" ||
        lower === "ruko" ||
        lower === "chup ho jao"
      ) {
        stopContinuousVoice();
        const isHindiCmd = ["band karo", "ruko", "chup ho jao"].some((k) => lower.includes(k));
        const byeReply = isHindiCmd
          ? "Zaroor! Maine voice conversation band kar diya hai. Khush rahiye! 😊"
          : "Sure! I have stopped the voice conversation. Have a great day! 😊";
        setMessages((prev) => [...prev, `You:${transcript}`, `AI:${byeReply}`]);
        speak(byeReply);
        return;
      }

      askAI(transcript, true);
    };

    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        stopContinuousVoice();
        alert("Microphone permission denied. Please allow microphone access.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // If continuous mode is still active and not speaking, keep listening!
      if (
        isContinuousVoiceRef.current &&
        !isSpeakingRef.current &&
        !isLoadingRef.current
      ) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (
            isContinuousVoiceRef.current &&
            !isSpeakingRef.current &&
            !isLoadingRef.current
          ) {
            startRecognition();
          }
        }, 300);
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.warn("Recognition start error:", err);
    }
  };

  // Initialize Gemini Live Client with AudioPlayer & AudioStreamer
  useEffect(() => {
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (!apiKey) return;

    const client = new GeminiLiveClient(apiKey);
    liveClientRef.current = client;

    // Connect in background so audio is instant
    client.connect().catch((err) => {
      console.warn("Gemini Live connection note:", err);
    });

    client.setOnStatus((status) => {
      if (status === "speaking") {
        isSpeakingRef.current = true;
        setIsSpeakingState(true);
      } else if (status === "idle") {
        isSpeakingRef.current = false;
        setIsSpeakingState(false);
      }
    });

    client.setOnAudioEnded(() => {
      handleAudioFinished();
    });

    return () => {
      client.close();
    };
  }, []);

  // 🔊 MS AIRA welcome voice (click only)
  const speakWelcome = () => {
    setIsSpeakingState(true);
    if (liveClientRef.current && liveClientRef.current.getIsConnected()) {
      liveClientRef.current.sendTextMessage(
        "Hello! Please introduce yourself warmly and sweetly as MS AIRA, proudly stating that you were created by Manish Yadav, and welcome the user to his portfolio."
      );
    } else {
      speak(
        "Hello! I am MS AIRA, proudly created by Manish Yadav. Manish is a passionate and talented software developer specializing in full-stack web development and AI. Welcome to his portfolio! What would you like to know about him today? 😊",
        () => setIsSpeakingState(false)
      );
    }
  };

  // 🧹 Clear chat
  const clearChat = () => {
    setMessages([]);
    setTypingIndex(null);
  };

  // 🎙️ Start / Stop voice input
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
   recognition.onresult = (event: any) => {
  const transcript = event.results[0][0].transcript;
  setIsListening(false);
  askAI(transcript, true); // ← directly bhejo, input mein mat daalo
};
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // 🛑 Stop MS AIRA speaking
  const handleStopSpeaking = () => {
    liveClientRef.current?.stopSpeaking();
    stopSpeaking();
    setIsSpeakingState(false);
    stopContinuousVoice();
  };

  // 🔽 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askAI = async (customQuestion?: string, fromVoice = false) => {
    const question = customQuestion ?? input;
    if (!question.trim()) return;

    // Interrupt any ongoing audio
    liveClientRef.current?.stopSpeaking();
    stopSpeaking();

    isLoadingRef.current = true;
    setLoading(true);

    const updatedMessages = [...messages, `You:${question}`];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const customApi = (import.meta as any).env?.VITE_API_URL;
      const isLocal =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const endpoints = isLocal
        ? [customApi || "http://localhost:3000/api/chat", "https://ai-backend-wine-seven.vercel.app/api/chat"]
        : [
            ...(customApi && !customApi.includes("localhost") ? [customApi] : []),
            "https://ai-backend-wine-seven.vercel.app/api/chat",
          ];

      let replyText = "";
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: question }),
          });
          const data = await res.json();
          if (data && data.reply && !data.reply.includes("technical issue")) {
            replyText = data.reply;
            break;
          } else if (data && data.reply) {
            replyText = data.reply;
          }
        } catch (err) {
          console.warn(`Failed connecting to ${endpoint}:`, err);
        }
      }

      const finalReply =
        replyText ||
        "There seems to be a technical issue right now. Please try again shortly!";
      const newMessages = [...updatedMessages, `AI:${finalReply}`];
      setMessages(newMessages);

      // ✍️ Start typewriter on the latest AI message
      setTypingIndex(newMessages.length - 1);

      // 🔊 Auto-speak using Gemini Live 24kHz AudioPlayer
      if (fromVoice) {
        isLoadingRef.current = false;
        isSpeakingRef.current = true;
        setIsSpeakingState(true);

        if (liveClientRef.current && liveClientRef.current.getIsConnected()) {
          liveClientRef.current.sendTextMessage(question);
        } else {
          speak(finalReply, handleAudioFinished);
        }
      } else {
        isLoadingRef.current = false;
      }
    } catch {
      setMessages((prev) => [...prev, "AI:Something went wrong. Please try again."]);
      isLoadingRef.current = false;
      if (isContinuousVoiceRef.current) {
        handleAudioFinished();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex bg-black text-white overflow-hidden">

      {/* Sidebar */}
      <AIChatSidebar open={open} onClose={() => setOpen(false)} />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">

        {/* Header */}
        <div className="p-4 border-b border-white/10 grid grid-cols-3 items-center shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-gray-300 hover:text-purple-400 transition"
            >
              <Menu size={22} />
            </button>
          </div>
          <div className="flex justify-center">
            <h2 className="font-semibold text-sm md:text-base">MS AIRA 👩‍💻</h2>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-4 py-2 text-sm font-medium text-gray-300 hover:border-purple-500 hover:text-purple-400 hover:bg-zinc-800 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-6 space-y-4">

          {/* Welcome + Suggestions */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
              <img
                src={aira}
                alt="MS AIRA"
                onClick={speakWelcome}
                className="w-40 h-40 rounded-full object-cover cursor-pointer border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-float hover:scale-105 transition"
              />
              <h3 className="text-xl font-semibold text-purple-400">MS AIRA</h3>
              <p className="text-gray-400 max-w-md">Click on me for a quick introduction.</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full">
  {SUGGESTED_QUESTIONS.slice(0, window.innerWidth < 640 ? 4 : 6).map((q) => (
                  <button
                    key={q}
                    onClick={() => askAI(q)}
                    className="text-left px-4 py-3 rounded-xl text-sm bg-zinc-900 border border-white/10 hover:border-purple-500 hover:text-purple-400 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Bubbles */}
          {messages.map((msg, i) => {
            const isUser = msg.startsWith("You:");
            const text = msg.replace("You:", "").replace("AI:", "");
            const isTyping = !isUser && typingIndex === i;

            return (
              <div
                key={i}
                className={`flex w-full items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* 🖼️ AIRA logo — sirf AI messages ke saath, left side */}
                {!isUser && (
                  <img
                    src={aira}
                    alt="MS AIRA"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 shrink-0 mt-1"
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`
                    px-4 py-3 rounded-2xl text-sm
                    max-w-full md:max-w-[70%]
                    break-words
                    ${isUser
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-zinc-800 text-gray-200 rounded-bl-sm"
                    }
                  `}
                >
                  {/* ✍️ Typewriter only on latest AI message */}
                  {isTyping ? (
                    <TypewriterText
                      text={text}
                      onDone={() => setTypingIndex(null)}
                    />
                  ) : (
                    <span className="whitespace-pre-wrap break-words">{text}</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking indicator */}
          {loading && (
            <div className="flex items-end gap-2">
              <img
                src={aira}
                alt="MS AIRA"
                className="w-8 h-8 rounded-full object-cover border-2 border-purple-500 shrink-0"
              />
              <div className="px-4 py-3 rounded-2xl bg-zinc-800 rounded-bl-sm">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area — Gemini-Style Mobile Capsule Card */}
        <div className="border-t border-white/5 p-3 md:p-4 shrink-0 bg-black/95">
          <div className="max-w-3xl mx-auto relative">

            {/* ➕ Quick Questions & Actions Menu Popover */}
            {showQuickMenu && (
              <div className="absolute bottom-[calc(100%+10px)] left-0 w-full max-w-sm bg-[#1e1f20] border border-white/10 rounded-2xl p-3 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Quick Suggestions
                  </span>
                  {messages.length > 0 && (
                    <button
                      onClick={() => {
                        clearChat();
                        setShowQuickMenu(false);
                      }}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                    >
                      <Trash2 size={12} /> Clear chat
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setShowQuickMenu(false);
                        askAI(q);
                      }}
                      className="text-left text-xs md:text-sm text-gray-200 hover:text-white p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 💊 Capsule Pill Input Card (Matches Reference Image) */}
            <div className="relative rounded-[28px] md:rounded-[32px] bg-[#1e1f20] border border-white/10 p-3 px-4 shadow-xl transition-all focus-within:border-white/20 focus-within:bg-[#252728]">

              {/* Top: Input Textarea */}
              <div className="w-full min-h-[38px] flex items-center mb-1">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askAI();
                    }
                  }}
                  placeholder={
                    isDictating
                      ? "Listening to your voice..."
                      : isSpeakingState
                      ? "MS AIRA is speaking..."
                      : isContinuousVoice
                      ? "Continuous voice active... Boliye!"
                      : "Ask anything"
                  }
                  rows={1}
                  className="w-full resize-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[16px] text-white placeholder:text-gray-400 font-normal leading-relaxed overflow-y-auto max-h-36 py-1"
                />
              </div>

              {/* Bottom: Action Buttons Row */}
              <div className="flex items-center justify-between pt-1">
                {/* Left: Plus Action Button */}
                <button
                  type="button"
                  onClick={() => setShowQuickMenu((prev) => !prev)}
                  title="Suggestions and actions"
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition active:scale-95 ${
                    showQuickMenu
                      ? "bg-zinc-600 text-white rotate-45"
                      : "bg-zinc-700/70 hover:bg-zinc-600 text-zinc-300 hover:text-white"
                  }`}
                >
                  <Plus size={18} strokeWidth={2.2} />
                </button>

                {/* Right: Mic Dictation + Blue Live Soundwave / Send Button */}
                <div className="flex items-center gap-2">
                  {/* 🎙️ Mic Button (Speech-to-text dictation) */}
                  <button
                    type="button"
                    onClick={toggleDictation}
                    title={isDictating ? "Stop voice typing" : "Voice typing"}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-95 ${
                      isDictating
                        ? "bg-red-600 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                        : "bg-zinc-700/60 hover:bg-zinc-600 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <Mic size={18} />
                  </button>

                  {/* 🌊 Blue Gemini Live / Continuous Voice / Send Button */}
                  {input.trim().length > 0 ? (
                    <button
                      type="button"
                      onClick={() => askAI()}
                      title="Send message"
                      className="w-9 h-9 rounded-full bg-[#1b72e8] hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center shadow-[0_0_14px_rgba(27,114,232,0.5)] transition"
                    >
                      <ArrowUp size={18} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (isContinuousVoice || isSpeakingState) {
                          handleStopSpeaking();
                        } else {
                          startContinuousVoice();
                        }
                      }}
                      title={
                        isContinuousVoice || isSpeakingState
                          ? "Stop voice conversation"
                          : "Start live voice conversation with MS AIRA"
                      }
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition active:scale-95 shadow-md ${
                        isContinuousVoice || isSpeakingState
                          ? "bg-red-600 hover:bg-red-700 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                          : "bg-[#1b72e8] hover:bg-blue-600 shadow-[0_0_14px_rgba(27,114,232,0.45)]"
                      }`}
                    >
                      {isContinuousVoice || isSpeakingState ? (
                        <Square size={15} fill="currentColor" />
                      ) : (
                        /* Exact 4-bar Gemini Audio Waveform */
                        <div className="flex items-center justify-center gap-[2.5px] h-4">
                          <span className="w-[3px] h-2.5 bg-white rounded-full" />
                          <span className="w-[3px] h-4 bg-white rounded-full" />
                          <span className="w-[3px] h-3 bg-white rounded-full" />
                          <span className="w-[3px] h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIChat;