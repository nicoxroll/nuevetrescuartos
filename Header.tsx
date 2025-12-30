
import React, { useState } from 'react';
import { Train, Menu, X } from 'lucide-react';
import { CartItem } from './types';

interface HeaderProps {
  scrolled: boolean;
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrolled, cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Delivery', href: '#delivery' },
    { name: 'Carta', href: '#menu' },
    { name: 'Ubicación', href: '#map' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      if (window.lenis) {
        window.lenis.scrollTo(offsetPosition);
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-[#1a1a1a]/95 backdrop-blur-md h-20 border-b border-white/10 shadow-xl' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center border-2 border-black overflow-hidden shadow-2xl scale-105">
              <img 
                src="https://storage.googleapis.com/pod_public/800webp/85994.webp" 
                alt="9 3/4 Logo" 
                className="w-full h-full object-cover scale-[1.4] origin-center" 
              />
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xl md:text-2xl font-pistilli leading-none tracking-tighter text-white uppercase">ESTACIÓN 9 3/4</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-industrial mt-1">La Plata</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] uppercase tracking-[0.4em] font-industrial text-gray-400 hover:text-white transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className={`group relative p-3 rounded-full transition-all border ${scrolled ? 'bg-zinc-800 border-white/5' : 'bg-transparent border-white/20 hover:bg-white/10'}`}
            >
              <Train className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Hamburger Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[999] bg-zinc-950/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-4xl font-pistilli text-white uppercase italic tracking-tighter transition-all duration-700 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-12 border-t border-white/5 w-24"></div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600 font-industrial">Andén 9 3/4</p>
        </div>
      </div>
    </>
  );
};

export default Header;
