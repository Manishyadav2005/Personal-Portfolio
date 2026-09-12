import aira from "@/assets/aira.png";
import { useState, useRef, useEffect } from "react";
import { Menu, ArrowLeft, Mic, Square, SendHorizonal, Trash2 } from "lucide-react";
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

  // ✍️ Track which AI message is currently typing
  const [typingIndex, setTypingIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

        {/* Input Area */}
        <div className="border-t border-white/10 p-4 shrink-0">
          <div className="max-w-4xl mx-auto flex flex-col gap-2.5">

            {/* Controls Row */}
            <div className="flex items-end gap-3">
              {/* 🎙️ Single Unified Voice / Stop Button */}
              <button
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
                    : "Start continuous voice chat"
                }
                className={`p-3 rounded-xl border shrink-0 transition relative ${
                  isContinuousVoice || isSpeakingState
                    ? "bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse"
                    : "bg-zinc-900/80 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:bg-purple-950/40 hover:text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                }`}
              >
                {isContinuousVoice || isSpeakingState ? (
                  <Square size={20} fill="currentColor" />
                ) : (
                  <Mic size={20} />
                )}
              </button>

              {/* Textarea */}
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askAI();
                  }
                }}
                placeholder={
                  loading
                    ? "✨ Thinking..."
                    : isSpeakingState
                    ? "🔊 MS AIRA is speaking..."
                    : isListening || isContinuousVoice
                    ? "🎙️ Listening... Please speak!"
                    : "Ask anything about Manish Yadav... (Click mic to speak)"
                }
                rows={1}
                className={`flex-1 resize-none bg-zinc-900/80 border rounded-xl px-4 py-3 outline-none transition-all overflow-y-auto max-h-40 text-white ${
                  isListening
                    ? "border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)] placeholder:text-purple-300"
                    : isSpeakingState
                    ? "border-green-400/80 shadow-[0_0_15px_rgba(74,222,128,0.25)] placeholder:text-green-300"
                    : loading
                    ? "border-yellow-400/70 shadow-[0_0_15px_rgba(250,204,21,0.25)] placeholder:text-yellow-300 animate-pulse"
                    : "border-purple-500/20 focus:border-purple-500/70 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.1)] placeholder:text-gray-400"
                }`}
              />

              {/* Send */}
              <button
                onClick={() => askAI()}
                title="Send"
                className="bg-purple-600 p-3 rounded-xl hover:bg-purple-700 shrink-0 transition text-white"
              >
                <SendHorizonal size={20} />
              </button>

              {/* Clear */}
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="p-3 rounded-xl bg-zinc-800 border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500 transition shrink-0"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AIChat;