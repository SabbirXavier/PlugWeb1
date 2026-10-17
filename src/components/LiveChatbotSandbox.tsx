import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, RefreshCw, Cpu, Gauge, Terminal, Settings, Copy, Check, Sparkles, Sliders, Zap } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  tokens?: number;
  latencyMs?: number;
}

const PERSONAS = [
  {
    id: 'lead-qualifier',
    name: 'Autonomous Lead Qualifier',
    badge: 'Sales & Growth',
    systemPrompt: 'You are an autonomous AI sales assistant for PLUG Agency. Your goal is to qualify prospective clients, gather project budgets, and explain our 6 service pillars concisely.',
  },
  {
    id: 'code-architect',
    name: 'Senior Code Architect',
    badge: 'Technical & Engineering',
    systemPrompt: 'You are a Principal Software Architect at PLUG. Provide technical recommendations on distributed systems, TypeScript microservices, WebGL performance, and vector databases.',
  },
  {
    id: 'performance-marketer',
    name: 'Performance Ad Strategist',
    badge: 'Growth & Ads',
    systemPrompt: 'You are a Performance Marketing Lead at PLUG. Help clients calculate ROAS, structure Meta & Google Ad campaigns, and write conversion-focused creative hooks.',
  },
  {
    id: 'creative-director',
    name: 'Brand & Creative Director',
    badge: 'Design & Visuals',
    systemPrompt: 'You are Creative Director at PLUG. Advise on brand identity systems, kinetic typography, editorial art direction, and 3D visual storytelling.',
  },
];

export const LiveChatbotSandbox: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [systemPrompt, setSystemPrompt] = useState(PERSONAS[0].systemPrompt);
  const [temperature, setTemperature] = useState(0.7);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Welcome to the PLUG Live Chatbot Sandbox! I am configured as [${PERSONAS[0].name}]. Test my response speed, customize my system prompt, or try a sample query below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      latencyMs: 120,
      tokens: 38,
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelectPersona = (p: typeof PERSONAS[0]) => {
    setSelectedPersona(p);
    setSystemPrompt(p.systemPrompt);
    sfx.playClick();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Persona switched to [${p.name}]. System prompt updated. How can I assist you in this sandbox run?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latencyMs: 80,
        tokens: 28,
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    sfx.playClick();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          systemInstruction: systemPrompt,
          temperature,
          persona: selectedPersona.name,
        }),
      });

      const data = await response.json();
      sfx.playLimeHover();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || 'No response returned from model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latencyMs: data.latencyMs || 240,
        tokens: data.tokensUsed || 110,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Sandbox chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Error communicating with sandbox endpoint. Please verify server connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          latencyMs: 0,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    const code = `curl -X POST "${window.location.origin}/api/chat" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [{"role": "user", "content": "What services does PLUG offer?"}],
    "systemInstruction": "${systemPrompt.replace(/"/g, '\\"')}",
    "temperature": ${temperature}
  }'`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    sfx.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-24 px-6 sm:px-10 bg-[var(--color-surface)] border-t border-[var(--color-outline)]" id="chatbot-sandbox">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-outline)]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-muted)] font-semibold mb-2">
              <Cpu className="w-4 h-4 text-[var(--color-electric-lime)]" />
              <span>06. Interactive AI Systems Sandbox</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--color-primary)] tracking-tight">
              Live Chatbot Sandbox Environment
            </h2>
          </div>

          <p className="font-body text-sm sm:text-base text-[var(--color-muted)] max-w-md">
            Test custom AI system prompts, model latency, and multi-agent personas live in our server-side Gemini 3.8 sandbox pipeline.
          </p>
        </div>

        {/* Main Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Persona Config Panel (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Persona Preset Selector */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[var(--color-electric-lime)]" />
                  <span>Select Agent Persona</span>
                </span>
                <span className="font-mono text-[10px] text-[var(--color-muted)]">4 Presets</span>
              </div>

              <div className="space-y-2.5">
                {PERSONAS.map((p) => {
                  const isSelected = selectedPersona.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPersona(p)}
                      onMouseEnter={() => sfx.playLimeHover()}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-[var(--color-surface)] border-transparent shadow-md scale-101'
                          : 'bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-card)] text-[var(--color-primary)] border-[var(--color-outline)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-xs">{p.name}</span>
                        <span
                          className={`font-mono text-[9px] px-2 py-0.5 rounded font-semibold ${
                            isSelected ? 'bg-[var(--color-electric-lime)] text-black' : 'bg-[var(--color-outline)] text-[var(--color-muted)]'
                          }`}
                        >
                          {p.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sandbox Model Parameters */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[var(--color-electric-lime)]" />
                  <span>Model Config</span>
                </span>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="font-mono text-[11px] text-[var(--color-electric-lime)] hover:underline flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>{showSettings ? 'Hide Prompt' : 'Edit Prompt'}</span>
                </button>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-[var(--color-muted)]">
                  <span>Temperature (Creativity)</span>
                  <span className="font-bold text-[var(--color-primary)]">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[var(--color-electric-lime)] cursor-pointer"
                />
              </div>

              {/* System Prompt Customizer */}
              {showSettings && (
                <div className="space-y-2 pt-2 border-t border-[var(--color-outline)] animate-fade-in">
                  <label className="font-mono text-xs font-semibold text-[var(--color-muted)] block">
                    System Instruction
                  </label>
                  <textarea
                    rows={4}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[var(--color-surface-low)] border border-[var(--color-outline)] font-mono text-xs text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-electric-lime)] resize-none"
                  />
                </div>
              )}

              {/* Model & API Telemetry Badge */}
              <div className="pt-3 border-t border-[var(--color-outline)] flex items-center justify-between font-mono text-[11px] text-[var(--color-muted)]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--color-electric-lime)]" />
                  <span>Model: gemini-3.8-flash</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold">● ONLINE</span>
              </div>
            </div>

            {/* API Integration Snippet */}
            <div className="p-5 rounded-2xl bg-[var(--color-primary)] text-[var(--color-surface)] shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[var(--color-electric-lime)]">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>cURL API Integration</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                >
                  {copied ? <Check className="w-3 h-3 text-[var(--color-electric-lime)]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="font-body text-xs text-white/80 leading-relaxed">
                Connect your website or mobile app to PLUG’s server-side Gemini chatbot endpoint using standard JSON POST calls.
              </p>
            </div>
          </div>

          {/* Interactive Live Chat Terminal (Right Column) */}
          <div className="lg:col-span-8 flex flex-col h-[520px] sm:h-[600px] rounded-2xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] shadow-xl overflow-hidden">
            {/* Terminal Header */}
            <div className="p-4 bg-[var(--color-surface-low)] border-b border-[var(--color-outline)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-xs font-bold text-[var(--color-primary)]">
                  PLUG_AGENT_SANDBOX // {selectedPersona.name}
                </span>
              </div>

              <button
                onClick={() => {
                  setMessages([]);
                  sfx.playClick();
                }}
                className="font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] flex items-center gap-1 cursor-pointer"
                title="Clear Chat Stream"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[var(--color-surface-card)]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-semibold text-[var(--color-muted)] uppercase">
                      {m.role === 'user' ? 'You (Client)' : `Agent [${selectedPersona.name}]`}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--color-muted)] opacity-60">{m.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl font-body text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[var(--color-primary)] text-[var(--color-surface)] rounded-br-none shadow-sm'
                        : 'bg-[var(--color-surface-low)] text-[var(--color-primary)] border border-[var(--color-outline)] rounded-bl-none shadow-2xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>

                    {/* Latency & Token Telemetry Footer */}
                    {m.latencyMs !== undefined && (
                      <div className="mt-3 pt-2 border-t border-[var(--color-outline)] flex items-center gap-3 font-mono text-[9px] text-[var(--color-muted)]">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-3 h-3 text-[var(--color-electric-lime)]" />
                          <span>{m.latencyMs}ms latency</span>
                        </span>
                        {m.tokens && <span>~{m.tokens} tokens</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 text-[var(--color-muted)] font-mono text-xs animate-pulse">
                  <Bot className="w-4 h-4 text-[var(--color-electric-lime)] animate-spin" />
                  <span>Agent generating stream response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Quick Prompt Chips */}
            <div className="px-6 py-2.5 bg-[var(--color-surface-low)]/50 border-t border-[var(--color-outline)] flex items-center gap-2 overflow-x-auto">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-electric-lime)] shrink-0" />
              <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase shrink-0 font-bold">Try Prompt:</span>
              {[
                'What are PLUG’s 6 service pillars?',
                'How fast can you deliver an AI automation system?',
                'Can you integrate Gemini API with Next.js?',
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="font-mono text-[11px] bg-[var(--color-surface-card)] hover:bg-[var(--color-electric-lime)] hover:text-black border border-[var(--color-outline)] px-3 py-1 rounded-full text-[var(--color-primary)] whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Message Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-4 bg-[var(--color-surface-low)] border-t border-[var(--color-outline)] flex items-center gap-3"
            >
              <input
                type="text"
                placeholder={`Ask ${selectedPersona.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface-card)] border border-[var(--color-outline)] font-body text-sm text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-electric-lime)] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-electric-lime)] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-102 active:scale-98 disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
