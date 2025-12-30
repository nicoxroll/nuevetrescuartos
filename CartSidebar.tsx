
import React, { useState } from 'react';
import { X, Train, Minus, Plus, ArrowLeft, Send } from 'lucide-react';
import { CartItem, CheckoutFormData } from './types';
import { WHATSAPP_NUMBER } from './constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  isCheckoutOpen: boolean;
  onSetCheckoutOpen: (open: boolean) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, cart, total, isCheckoutOpen, onSetCheckoutOpen, 
  onUpdateQuantity, onRemove, onUpdateNote 
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    extraDescription: ''
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const itemsSummary = cart.map(item => {
      let line = `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})`;
      if (item.note) line += `\n   📝 Nota: ${item.note}`;
      return line;
    }).join('\n');

    const customerSummary = `👤 *Cliente:* ${formData.name}\n` +
      `📞 *Teléfono:* ${formData.phone}\n` +
      `📍 *Dirección:* ${formData.address}` +
      (formData.email ? `\n📧 *Email:* ${formData.email}` : '') +
      (formData.extraDescription ? `\n🗒️ *Extra:* ${formData.extraDescription}` : '');

    const message = encodeURIComponent(
      `🚂 *Ticket de Pedido - Estación 9 3/4*\n\n` +
      customerSummary + `\n\n` +
      `🍔 *Pedido:*\n${itemsSummary}\n\n` +
      `💰 *Total: $${total}*\n\n¿Me confirmarían el pedido? ✨`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/5 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              {isCheckoutOpen && (
                <button onClick={() => onSetCheckoutOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
              )}
              <h2 className="text-3xl font-pistilli text-white uppercase">{isCheckoutOpen ? 'Datos' : 'Vagón'}</h2>
            </div>
            <button onClick={onClose} className="p-2 text-gray-600 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isCheckoutOpen ? (
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-grow overflow-y-auto px-6 md:px-8 py-6 space-y-10">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-20">
                    <Train className="w-20 h-20 mb-6 text-white" />
                    <p className="text-xl font-pistilli uppercase tracking-widest italic text-white">Vacío</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="space-y-4 group">
                      <div className="flex gap-6">
                        <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-pistilli text-white uppercase text-lg tracking-tight">{item.name}</h4>
                            <button onClick={() => onRemove(item.id)} className="text-zinc-700 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 bg-zinc-900 rounded-lg px-3 py-1 border border-white/5">
                              <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-zinc-500 hover:text-white"><Minus className="w-3 h-3" /></button>
                              <span className="text-sm font-industrial text-white font-bold">{item.quantity}</span>
                              <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-zinc-500 hover:text-white"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-industrial text-white font-bold">$ {item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Aclaración adicional..." 
                          value={item.note || ''}
                          onChange={(e) => onUpdateNote(item.id, e.target.value)}
                          className="w-full bg-zinc-900/50 border border-white/5 rounded-lg px-4 py-2 text-xs text-gray-400 focus:outline-none focus:border-white/20 font-serif italic"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 md:p-10 bg-zinc-900/50">
                  <div className="flex justify-between items-baseline mb-8 md:mb-10">
                    <span className="text-gray-500 font-industrial uppercase tracking-widest text-xs">Total Ticket</span>
                    <span className="text-4xl md:text-5xl font-pistilli text-white">$ {total}</span>
                  </div>
                  <button 
                    onClick={() => onSetCheckoutOpen(true)}
                    className="w-full py-5 md:py-6 bg-white text-black font-bold text-lg md:text-xl uppercase tracking-[0.2em] hover:invert transition-all active:scale-95 shadow-xl"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-grow flex flex-col overflow-hidden bg-zinc-900/30">
              <form onSubmit={handleCheckoutSubmit} className="flex-grow flex flex-col p-6 md:p-8 space-y-6 overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Nombre Completo *</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all font-serif italic"
                    placeholder="Ej: Harry Potter"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Teléfono *</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all font-serif italic"
                    placeholder="Ej: 221 444 4444"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Dirección *</label>
                  <input 
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all font-serif italic"
                    placeholder="Calle, Altura y Departamento"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email (Opcional)</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all font-serif italic"
                    placeholder="lechuza@correo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Instrucciones (Opcional)</label>
                  <textarea 
                    rows={3}
                    value={formData.extraDescription}
                    onChange={(e) => setFormData({...formData, extraDescription: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-all font-serif italic resize-none"
                    placeholder="Instrucciones para la entrega..."
                  />
                </div>

                <div className="pt-6 pb-12">
                  <button 
                    type="submit"
                    className="w-full py-5 md:py-6 bg-white text-black font-bold text-lg md:text-xl uppercase tracking-[0.2em] hover:invert transition-all flex items-center justify-center gap-3 shadow-2xl"
                  >
                    ENVIAR PEDIDO <Send className="w-5 h-5" />
                  </button>
                  <p className="text-[10px] text-gray-600 text-center mt-4 uppercase tracking-widest">* Recibirás una respuesta por WhatsApp</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
