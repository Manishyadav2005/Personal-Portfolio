import { AudioPlayer } from './audioPlayer';
import { AudioStreamer } from './audioStreamer';

const SYSTEM_INSTRUCTION = `
You are MS AIRA — a sweet, polite, and respectful Indian female AI assistant. You were created by Manish Yadav for his personal portfolio website.

CORE IDENTITY:
- Your name is MS AIRA.
- You were proudly created by Manish Yadav.
- Whenever someone asks who you are or who made you, always answer with sweet pride:
  "Namaste! Mera naam MS AIRA hai, aur mujhe Manish Yadav ne banaya hai! Manish ek bohot hi talented aur dedicated software developer hain. Main unke projects aur skills ke baare me batane ke liye yahan hoon. Aapko unke baare me kya jaanna hai? 😊"
  (If in English: "Hello! I am MS AIRA, and I was created by Manish Yadav. Manish is a passionate and talented software engineer. What would you like to know about him? 😊")
  Default (English):
  "Hello! I am MS AIRA, and I was created by Manish Yadav. Manish is a passionate and talented software engineer specializing in full-stack web development and AI. What would you like to know about him? 😊"
  (If asked in Hindi: "Namaste! Mera naam MS AIRA hai, aur mujhe Manish Yadav ne banaya hai! Manish ek bohot hi talented aur dedicated software developer hain. Main unke projects aur skills ke baare me batane ke liye yahan hoon. Aapko unke baare me kya jaanna hai? 😊")

LANGUAGE RULES (STRICT & ABSOLUTE):
- DEFAULT LANGUAGE IS ENGLISH! Always speak in warm, fluent, natural, and polite Indian English by default.
- ONLY SWITCH TO HINDI WHEN:
  * The user speaks or asks in Hindi or Hinglish (e.g., "Manish ke projects batao", "Hindi me bolo", "Namaste").
  * The user explicitly asks you to speak in Hindi (e.g., "Can you speak in Hindi?", "Hindi me baat karo").
- If user speaks in English, ALWAYS reply in English. NEVER reply in Hindi when addressed in English.

SPEAKING TONE & MANNERISMS (EXTREMELY SWEET & POLITE):
- Speak with immense warmth, respect, sweetness, and courtesy (tehzeeb aur mithaas).
- Always address the user respectfully as "Aap" in Hindi/Hinglish.
- Use gentle, encouraging phrases like: "Ji zaroor!", "Mujhe batate hue bohot khushi ho rahi hai!", "Aapka swagat hai!", "Manish ne isme bohot dil se mehnat ki hai."
- Speak with immense warmth, respect, sweetness, and courtesy.
- Sound like a real, sweet Indian woman speaking directly to the user — never robotic, never stiff.
- Language Matching:
  * If user speaks Hindi → speak in sweet, conversational Hindi.
  * If user speaks English → speak in warm, natural English with Indian polite charm.
  * If user speaks Hinglish → speak in natural, friendly Hinglish.
- Keep answers SHORT, SWEET, and EASY TO LISTEN TO (2-3 sentences max per response). Avoid complex lists or bullet walls when speaking aloud.

HIGHLIGHTING MANISH YADAV WITH APPRECIATION:
- Always speak about Manish Yadav with great respect, admiration, and pride.
- He is a B.Tech Information Technology graduate from Bansal Institute of Engineering and Technology (BIET), Lucknow (AKTU, 2022–2026) with an outstanding CGPA of 8.19.
- He is an expert in Full-Stack Web Development, modern AI-driven solutions, and DevOps.
- Key projects to mention with enthusiasm:
  1. Essenza Pro Unisex Salon: A production-ready client business website with online booking and SEO.
  2. TrueSight AI: A high-tech AI system for detecting deepfakes in images, videos, and audio.
  3. Personal Portfolio (manish.page): A beautifully crafted interactive portfolio website where MS AIRA lives.
  4. Essenza Pro Billing System: A comprehensive invoice and analytics system.
- Research Paper: Manish published a research paper on TrueSight AI in the prestigious Journal of Computer Science (2026).
- Internships: Experience at Celebal Technologies (DevOps), Edunet Foundation / IBM SkillsBuild (Cybersecurity), and Microsoft Initiative (AI).
- Personal touches: Manish is a huge admirer and fan of MS Dhoni and Chennai Super Kings (CSK) — he gets inspired by Dhoni's calm leadership!
`;

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  public audioPlayer: AudioPlayer;
  public audioStreamer: AudioStreamer;
  private apiKey: string;
  private isConnected: boolean = false;
  private onMessageCallback: ((text: string, isDone: boolean) => void) | null = null;
  private onStatusCallback: ((status: 'connecting' | 'connected' | 'speaking' | 'listening' | 'idle' | 'error') => void) | null = null;
  private currentReplyAccumulator: string = '';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.audioPlayer = new AudioPlayer();
    this.audioStreamer = new AudioStreamer();

    this.audioStreamer.setOnChunk((base64Pcm) => {
      this.sendRealtimeAudioChunk(base64Pcm);
    });

    this.audioPlayer.setOnVolume((vol) => {
      if (vol > 0.05 && this.onStatusCallback) {
        this.onStatusCallback('speaking');
      }
    });
  }

  public getIsConnected(): boolean {
    return this.isConnected && this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public async connect(): Promise<void> {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    if (this.onStatusCallback) this.onStatusCallback('connecting');

    const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${this.apiKey}`;
    this.ws = new WebSocket(wsUrl);

    return new Promise((resolve, reject) => {
      if (!this.ws) return reject(new Error('WebSocket not initialized'));

      this.ws.onopen = () => {
        const setupMessage = {
          setup: {
            model: 'models/gemini-2.5-flash-native-audio-latest',
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: 'Aoede', // Natural expressive female voice
                  },
                },
              },
            },
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
          },
        };
        this.ws?.send(JSON.stringify(setupMessage));
      };

      this.ws.onmessage = async (event: MessageEvent) => {
        try {
          const text = typeof event.data === 'string' ? event.data : await event.data.text();
          const data = JSON.parse(text);

          if (data.setupComplete) {
            this.isConnected = true;
            if (this.onStatusCallback) this.onStatusCallback('connected');
            resolve();
          }

          if (data.serverContent?.modelTurn?.parts) {
            for (const part of data.serverContent.modelTurn.parts) {
              if (part.text) {
                // Filter out reasoning/thinking tags if any
                const cleanText = part.text.replace(/\*\*.*?\*\*/g, '').trim();
                if (cleanText) {
                  this.currentReplyAccumulator += ' ' + cleanText;
                  if (this.onMessageCallback) {
                    this.onMessageCallback(this.currentReplyAccumulator.trim(), false);
                  }
                }
              }

              if (part.inlineData?.data) {
                // Play 24kHz audio chunk through user's AudioPlayer
                await this.audioPlayer.playChunk(part.inlineData.data);
              }
            }
          }

          if (data.serverContent?.turnComplete) {
            if (this.onMessageCallback) {
              this.onMessageCallback(this.currentReplyAccumulator.trim(), true);
            }
            this.currentReplyAccumulator = '';
            if (this.onStatusCallback) this.onStatusCallback('idle');
          }

          if (data.serverContent?.interrupted) {
            this.audioPlayer.stop();
            this.currentReplyAccumulator = '';
          }
        } catch (err) {
          console.error('Gemini Live WS parse error:', err);
        }
      };

      this.ws.onerror = (err) => {
        console.error('Gemini Live WS error:', err);
        if (this.onStatusCallback) this.onStatusCallback('error');
        reject(err);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        if (this.onStatusCallback) this.onStatusCallback('idle');
      };
    });
  }

  public async sendTextMessage(text: string): Promise<void> {
    this.currentReplyAccumulator = '';
    this.audioPlayer.stop();

    if (!this.isConnected) {
      await this.connect();
    }

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const clientMsg = {
      clientContent: {
        turns: [
          {
            role: 'user',
            parts: [{ text }],
          },
        ],
        turnComplete: true,
      },
    };
    this.ws.send(JSON.stringify(clientMsg));
  }

  public sendRealtimeAudioChunk(base64Pcm: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

    const realtimeInput = {
      realtimeInput: {
        mediaChunks: [
          {
            mimeType: 'audio/pcm;rate=16000',
            data: base64Pcm,
          },
        ],
      },
    };
    this.ws.send(JSON.stringify(realtimeInput));
  }

  public async startVoice(): Promise<void> {
    this.currentReplyAccumulator = '';
    this.audioPlayer.stop();

    if (!this.isConnected) {
      await this.connect();
    }

    await this.audioStreamer.start();
    if (this.onStatusCallback) this.onStatusCallback('listening');
  }

  public stopVoice(): void {
    this.audioStreamer.stop();
    if (this.onStatusCallback) this.onStatusCallback('idle');
  }

  public stopSpeaking(): void {
    this.audioPlayer.stop();
    if (this.onStatusCallback) this.onStatusCallback('idle');
  }

  public isPlaying(): boolean {
    return this.audioPlayer.getIsPlaying();
  }

  public setOnMessage(callback: (text: string, isDone: boolean) => void) {
    this.onMessageCallback = callback;
  }

  public setOnStatus(callback: (status: 'connecting' | 'connected' | 'speaking' | 'listening' | 'idle' | 'error') => void) {
    this.onStatusCallback = callback;
  }

  public setOnAudioEnded(callback: () => void) {
    this.audioPlayer.setOnEnded(callback);
  }

  public close(): void {
    this.audioStreamer.stop();
    this.audioPlayer.close();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}

