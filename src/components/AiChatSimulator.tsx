import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, CheckCircle } from 'lucide-react';
import { sfx } from '../utils/audio';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiChatSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am PLUG’s autonomous client assistant. Ask me about our 2-week engineering sprints, custom AI workflow automations, or brand creative packages.',
      time: '15:35',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'How do 2-week sprints work?',
    'Can you automate our CRM & support?',
    'What is your website tech stack?',
    'How do I start a project?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    sfx.playClick();

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "We build custom solutions aligned with your commercial goals. Let's schedule a call with our senior partners!";
      const q = query.toLowerCase();

      if (q.includes('sprint') || q.includes('time') || q.includes('fast')) {
        aiResponse = 'PLUG operates on disciplined 2-week production sprints. Every Friday you receive a live staging deployment. No long waiting periods or black-box delays!';
      } else if (q.includes('crm') || q.includes('automation') || q.includes('ai') || q.includes('bot')) {
        aiResponse = 'Our AI team builds autonomous agent loops connecting your CRM (HubSpot, Salesforce, Notion), RAG vector knowledge bases, and customer triage channels to resolve 70%+ of tickets automatically.';
      } else if (q.includes('stack') || q.includes('tech') || q.includes('code') || q.includes('web')) {
        aiResponse = 'Our engineering stack includes React, Next.js, TypeScript, Tailwind CSS, Three.js / WebGL for 3D interactions, and Cloudflare / Vercel edge deployment with sub-100ms response times.';
      } else if (q.includes('start') || q.includes('project') || q.includes('price') || q.includes('cost')) {
        aiResponse = 'You can submit your brief in the "Start a Project" section below or book a call. A senior partner reviews every submission within 24 business hours.';
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-lg flex flex-col justify-between h-[360px] sm:h-[420px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#090a0b] text-[#b8ee00] flex items-center justify-center font-bold text-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-[#090a0b]">PLUG AI Assistant Demo</div>
            <div className="font-mono text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Multi-Agent Loop</span>
            </div>
          </div>
        </div>
        <span className="font-mono text-[10px] bg-[#f4f4f2] text-[#505256] px-2.5 py-1 rounded-md">
          v2.4
        </span>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto my-3 pr-2 space-y-3 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user'
                  ? 'bg-[#090a0b] text-white'
                  : 'bg-[#b8ee00] text-[#090a0b]'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-[#090a0b] text-white rounded-tr-none'
                  : 'bg-[#f4f4f2] text-[#090a0b] border border-black/5 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span className="font-mono text-[9px] opacity-60 block text-right mt-1">{m.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#505256] font-mono italic">
            <Sparkles className="w-3.5 h-3.5 text-[#a5d600] animate-spin" />
            <span>Agent synthesizing response...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts & Input */}
      <div className="pt-2 border-t border-black/[0.08] space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 bg-[#f4f4f2] hover:bg-[#b8ee00]/30 text-[#090a0b] border border-black/5 rounded-lg text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question about PLUG..."
            className="flex-1 h-10 px-3 bg-[#f4f4f2] text-xs font-body text-[#090a0b] placeholder-[#505256]/60 rounded-xl border border-black/10 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            type="submit"
            className="h-10 px-4 bg-[#090a0b] text-[#b8ee00] rounded-xl flex items-center justify-center hover:bg-black transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
