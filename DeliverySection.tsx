
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const DeliverySection: React.FC = () => {
  const [isGrayscale, setIsGrayscale] = useState(false);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="delivery" className="py-24 bg-[#121212] relative overflow-hidden border-t border-white/5">
      {/* Elementos decorativos de fondo para integración */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="w-full lg:w-1/2">
            <div 
              className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-pointer"
              onClick={() => setIsGrayscale(!isGrayscale)}
            >
              <img 
                src="https://images.pexels.com/photos/2790396/pexels-photo-2790396.jpeg" 
                alt="Estación de tren" 
                className={`w-full h-full object-contain bg-zinc-900 transition-all duration-1000 transform hover:scale-105 ${isGrayscale ? 'grayscale' : 'grayscale-0'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-12 text-center lg:text-left">
            <div className="space-y-6">
              <h2 className="text-7xl md:text-9xl font-pistilli leading-none text-white uppercase italic tracking-tighter">DELIVERY</h2>
              <div className="h-0.5 w-32 bg-white/20 mx-auto lg:mx-0"></div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-400 text-2xl md:text-3xl leading-relaxed font-serif italic max-w-2xl mx-auto lg:mx-0">
                "El Expreso de Sabor directo a tu puerta."
              </p>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-serif italic max-w-xl mx-auto lg:mx-0">
                Nuestro servicio de entrega atraviesa muros para llegar a vos antes de que se enfríe la poción. Servicio exclusivo en todo el radio de La Plata.
              </p>
            </div>

            <div className="pt-8 max-w-md mx-auto lg:mx-0">
              <button 
                onClick={scrollToMenu}
                className="w-full py-5 md:py-6 bg-white text-black font-bold text-lg md:text-xl uppercase tracking-[0.2em] hover:invert transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4"
              >
                PEDIR AHORA <Send className="w-5 h-5" />
              </button>
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                <span className="h-px w-8 bg-white/10"></span>
                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-industrial">
                  Andén 9 3/4 • Estación La Plata
                </p>
                <span className="h-px w-8 bg-white/10"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
