import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize GoogleGenAI SDK with User-Agent header for telemetry
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Route for Live Chatbot Sandbox
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  try {
    const { messages, systemInstruction, temperature = 0.7, persona = 'PLUG AI Systems Lead' } = req.body;

    const ai = getGeminiClient();

    if (ai) {
      const prompt = Array.isArray(messages)
        ? messages.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n')
        : String(messages);

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || `You are an AI Agent running in the PLUG Agency Sandbox. Persona: ${persona}. Respond succinctly, professionally, and authoritatively as a senior AI systems lead.`,
          temperature: Number(temperature),
        },
      });

      const latencyMs = Date.now() - startTime;
      return res.json({
        text: response.text || 'No response generated.',
        latencyMs,
        tokensUsed: Math.floor((prompt.length + (response.text?.length || 0)) / 4),
        model: 'gemini-3.8-flash',
        status: 'success',
      });
    }

    // High-fidelity fallback response when GEMINI_API_KEY is not set
    const lastUserMsg = Array.isArray(messages) ? messages[messages.length - 1]?.content : String(messages);
    const latencyMs = Date.now() - startTime + 380;

    let replyText = `[PLUG Agent Sandbox - ${persona}]\nAnalyzing query: "${lastUserMsg || 'Hello'}"\n\nOur autonomous agent pipeline has evaluated your inputs. We recommend pairing a high-throughput vector store (pgvector / Qdrant) with low-latency LLM orchestration. PLUG can architect this custom AI workflow within 14 business days.`;

    if (lastUserMsg?.toLowerCase().includes('hello') || lastUserMsg?.toLowerCase().includes('hi')) {
      replyText = `Welcome to the PLUG Live Chatbot Sandbox! I am configured as [${persona}]. Ask me about multi-agent orchestration, custom RAG pipelines, or automated customer support workflows.`;
    } else if (lastUserMsg?.toLowerCase().includes('pricing') || lastUserMsg?.toLowerCase().includes('cost')) {
      replyText = `PLUG Agency delivers fixed-scope AI automation sprints starting from $3,500 for custom agent sandboxes up to enterprise multi-node deployments. Book a 15-minute consultation via our team line: +91 86998 66723.`;
    }

    return res.json({
      text: replyText,
      latencyMs,
      tokensUsed: 142,
      model: 'gemini-3.8-flash (Simulated)',
      status: 'sandbox_demo',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const latencyMs = Date.now() - startTime;
    return res.status(500).json({
      error: error.message || 'Failed to process sandbox query',
      latencyMs,
    });
  }
});

// Start dev server with Vite middleware or serve static dist in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
