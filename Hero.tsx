
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://media.0221.com.ar/p/a7aff82c9bd709250de67477ba23c4f7/adjuntos/357/imagenes/100/161/0100161528/1400x0/smart/plaza-italia-monumento-aguila2jpg.jpg" 
          className="w-full h-full object-cover grayscale brightness-[0.4]"
          alt="Monumento Águila Plaza Italia"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/30 to-[#121212]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div className="flex items-center justify-center mb-6 select-none animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="text-[10rem] md:text-[18rem] font-pistilli leading-none text-white tracking-tighter drop-shadow-2xl">9</span>
          <div className="flex flex-col items-center justify-center ml-2 md:ml-6">
            <span className="text-5xl md:text-[7rem] font-pistilli leading-none text-white">3</span>
            <div className="w-full h-1.5 md:h-2.5 bg-white my-1 md:my-3 shadow-lg"></div>
            <span className="text-5xl md:text-[7rem] font-pistilli leading-none text-white">4</span>
          </div>
        </div>
        <p className="text-xl md:text-3xl font-industrial uppercase tracking-[1em] text-gray-400 mb-12">
          La Plata
        </p>
        <div className="flex justify-center">
          <a href="#menu" className="group flex flex-col items-center gap-4 text-white/50 hover:text-white transition-colors">
            <span className="text-xs uppercase tracking-[0.3em] font-industrial">Descender al andén</span>
            <div className="w-px h-16 bg-white/20 group-hover:bg-white/50 transition-all"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
