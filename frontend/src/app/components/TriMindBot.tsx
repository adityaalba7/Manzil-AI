import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { requestUnifiedChat } from '../../lib/pythonApi';
import api from '../../lib/api';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function TriMindBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardContext, setDashboardContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch dashboard context once on mount
  useEffect(() => {
    const fetchContext = async () => {
      try {
        const { data } = await api.get('/dashboard');
        setDashboardContext(data.data);
      } catch {
        // silent — chatbot will work without context
      }
    };
    fetchContext();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Only send previous messages as history, current message is sent separately
      const history = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await requestUnifiedChat(text, history, dashboardContext);
      const botMsg: Message = { role: 'model', content: response.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        role: 'model',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      };
      setMessages(prev => [...prev, errorMsg]);
    }
    setIsLoading(false);
  };

  const suggestions = [
    "How am I doing overall?",
    "Where am I overspending?",
    "What should I study today?",
    "Tips for my next interview?",
  ];

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet to-emerald text-white shadow-[0_4px_25px_rgba(91,71,224,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-48px)] bg-surface rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-border-default flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border-default bg-gradient-to-r from-violet/5 to-emerald/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet to-emerald flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-text-primary">Manzil Assistant</h3>
                  <p className="text-[11px] text-emerald font-medium">Powered by Gemini 2.0</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-text-tertiary hover:text-text-primary hover:bg-elevated rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet/10 to-emerald/10 flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-violet" />
                  </div>
                  <h4 className="font-heading font-bold text-text-primary text-lg mb-2">Hey there! 👋</h4>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    I know your study streak, spending habits, and interview scores. Ask me anything!
                  </p>
                  <div className="grid grid-cols-1 gap-2 w-full">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => { setInput(s); }}
                        className="text-left text-sm px-4 py-2.5 rounded-xl border border-border-default bg-primary-bg hover:bg-elevated text-text-secondary hover:text-text-primary transition-colors font-medium"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet to-emerald flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-violet text-white rounded-br-md'
                        : 'bg-primary-bg border border-border-default text-text-primary rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-emerald/20 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-emerald" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet to-emerald flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-primary-bg border border-border-default rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-violet animate-spin" />
                    <span className="text-sm text-text-secondary">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-border-default shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your study, finance, or interviews..."
                  className="flex-1 bg-primary-bg border border-border-default rounded-xl px-4 py-3 text-sm outline-none focus:border-violet transition-colors font-sans text-text-primary placeholder:text-text-tertiary"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-violet text-white px-4 py-3 rounded-xl hover:bg-violet/90 transition-colors disabled:opacity-40 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
