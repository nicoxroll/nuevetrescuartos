
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        <div className="flex flex-col items-center group">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-2xl overflow-hidden scale-105 mb-4">
            <img 
              src="https://storage.googleapis.com/pod_public/800webp/85994.webp" 
              alt="9 3/4 Logo" 
              className="w-full h-full object-cover scale-[1.4] origin-center" 
            />
          </div>
          <span className="text-4xl font-pistilli text-white leading-none lowercase">nuevetrescuartos</span>
          <span className="text-[10px] uppercase tracking-[0.5em] text-gray-600 mt-2 font-industrial">La Plata</span>
        </div>
        <p className="text-gray-700 text-[10px] uppercase tracking-[0.8em] pt-12 border-t border-white/5">
          TERMINAL CENTRAL • ARGENTINA • 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
