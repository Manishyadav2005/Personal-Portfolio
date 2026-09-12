import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// 🎙️ Google High-Definition Indian Female Voice TTS Proxy
function googleTTSPlugin() {
  return {
    name: "google-tts-proxy",
    configureServer(server: any) {
      server.middlewares.use("/api/tts", async (req: any, res: any) => {
        try {
          const parsed = new URL(req.url, "http://localhost:8080");
          const text = parsed.searchParams.get("text") || "";
          const lang = parsed.searchParams.get("lang") || "en-IN";

          if (!text.trim()) {
            res.statusCode = 400;
            res.end("Missing text parameter");
            return;
          }

          // Split into safe chunks <= 140 chars at natural punctuation
          const sentences = text.match(/[^.!?,\n]+[.!?,\n]*|\S+/g) || [text];
          const chunks: string[] = [];
          let cur = "";

          for (const s of sentences) {
            if ((cur + " " + s).trim().length <= 140) {
              cur = (cur + " " + s).trim();
            } else {
              if (cur) chunks.push(cur);
              cur = s.trim();
            }
          }
          if (cur) chunks.push(cur);

          const buffers: Buffer[] = [];
          for (const chunk of chunks) {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
              chunk
            )}&tl=${lang}&client=tw-ob`;
            const resp = await fetch(url, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              },
            });
            if (resp.ok) {
              const ab = await resp.arrayBuffer();
              buffers.push(Buffer.from(ab));
            }
          }

          const combined = Buffer.concat(buffers);
          res.setHeader("Content-Type", "audio/mpeg");
          res.setHeader("Content-Length", combined.length);
          res.setHeader("Cache-Control", "public, max-age=86400");
          res.statusCode = 200;
          res.end(combined);
        } catch (err: any) {
          console.error("TTS Proxy error:", err);
          res.statusCode = 500;
          res.end(err?.message || "TTS error");
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  publicDir: "public",

  plugins: [
    react(),
    googleTTSPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
