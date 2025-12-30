
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Train } from 'lucide-react';
import { ChatMessage } from './types';

const MagicIcon = ({ className }: { className?: string }) => (
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
    { role: 'model', text: '¡Saludos! Soy el Guardián del Andén. Nuestras hamburguesas están saliendo más calientes que el aliento de un dragón. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: '¡Por las barbas de Merlín! He recibido tu lechuza. Para una respuesta instantánea sobre tu pedido, te sugiero enviarnos un mensaje por WhatsApp desde el Vagón (Carrito). ¡Nox!' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border-2 border-black"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MagicIcon className="w-8 h-8 text-black" />}
      </button>

      <div className={`absolute bottom-20 right-0 w-[85vw] sm:w-[380px] h-[60vh] max-h-[450px] bg-zinc-950/98 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black">
             <Train className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-lg font-pistilli text-white uppercase leading-none">El Guardián</h3>
            <span className="text-[7px] uppercase tracking-[0.3em] text-gray-500 font-industrial">Soporte Mágico</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs ${
                msg.role === 'user' 
                ? 'bg-white text-black font-medium' 
                : 'bg-zinc-900 border border-white/5 text-gray-300'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/5">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2 bg-zinc-900 rounded-xl p-1 border border-white/5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow bg-transparent border-none outline-none text-white px-3 py-2 text-xs italic"
            />
            <button 
              type="submit"
              className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingChat;
