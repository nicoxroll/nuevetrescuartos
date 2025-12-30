
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from './types';

const GeminiIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
      fill="currentColor" 
    />
    <circle cx="12" cy="12" r="2" fill="white" />
  </svg>
);

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Saludos, viajero! Soy el **Guardián del Andén**. ¿Buscás alguna recomendación mágica o información sobre nuestras hamburguesas en **nuevetrescuartos**?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userMessageText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      
      if (!apiKey || apiKey === "REPLACE_WITH_YOUR_API_KEY") {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'model', 
            text: '¡Alohomora! Mi conexión con el Ministerio de Magia es inestable en este momento. \n\nSin embargo, puedo decirte que **La Gryffindor** es nuestra hamburguesa más popular hoy. ¿Te gustaría verla en la carta?' 
          }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: newMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `Eres el "Guardián del Andén" de la hamburguesería "nuevetrescuartos" (Estación 9 3/4) en La Plata, Argentina. 
          Tu tono es sabio, misterioso pero muy amable, con referencias constantes al mundo de Harry Potter.
          Conoces el menú a la perfección: 
          - La Gryffindor: Doble carne, triple cheddar, bacon, salsa Fuego de Dragón ($8500).
          - La Slytherin: Brie, rucula, cebolla al malbec ($9200).
          - La Ravenclaw: Cordero, queso azul, peras asadas ($9500).
          - La Hufflepuff: Pollo crispy, palta ($7800).
          - Acompañamientos: Papas Mandrágora y Aros de Quidditch.
          - Postre: Snitch de Oro.
          - Bebida: Cerveza de Mantequilla (sin alcohol).
          Ubicación: Plaza Italia, La Plata. 
          Horarios: 19:30 a 23:30 (hasta las 01:00 los findes).
          Usa Markdown para resaltar nombres de platos o secciones. Mantén las respuestas breves y encantadoras.`,
        },
      });

      const responseText = response.text || 'Mis disculpas, el búho se perdió en el camino. ¿Podrías repetir eso?';
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error('Magic error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: '¡Por las barbas de Merlín! Algo salió mal. Pero no te preocupes, nuestras hamburguesas siguen siendo reales y deliciosas.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative"
      >
        {/* Se eliminó el div de animación animate-ping */}
        {isOpen ? (
          <X className="w-6 h-6 md:w-8 md:h-8" />
        ) : (
          <GeminiIcon className="w-8 h-8 md:w-10 md:h-10 text-black" />
        )}
      </button>

      {/* Ventana de Chat */}
      <div className={`absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[70vh] max-h-[600px] bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-black overflow-hidden flex-shrink-0">
             <img 
                src="https://storage.googleapis.com/pod_public/800webp/85994.webp" 
                alt="Guardian Logo" 
                className="w-full h-full object-cover scale-[1.4]" 
              />
          </div>
          <div>
            <h3 className="text-xl font-pistilli text-white uppercase leading-none">El Guardián</h3>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-industrial">Andén 9 3/4</span>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-white text-black font-medium' 
                : 'bg-zinc-900 border border-white/5 text-gray-300'
              }`}>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-white/5 px-5 py-4 rounded-[1.5rem]">
                <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-3 bg-zinc-900 rounded-2xl p-2 border border-white/5 focus-within:border-white/20 transition-colors"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje mágico..."
              className="flex-grow bg-transparent border-none outline-none text-white px-4 py-2 text-sm font-serif italic"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[8px] uppercase tracking-widest text-gray-700 text-center mt-3 font-industrial">
            Desarrollado con Magia y Tecnología de Vanguardia
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;
