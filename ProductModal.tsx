import { X } from "lucide-react";
import React, { useState } from "react";
import { Product } from "./types";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, note: string) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 transition-all duration-700 ease-out">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90dvh] bg-zinc-950 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700 ease-out flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          <div className="w-full md:w-1/2 flex-shrink-0 h-48 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale-[0.3]"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
            <div className="flex-grow space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-pistilli text-white uppercase italic mb-1 tracking-tight">
                  {product.name}
                </h2>
                <p className="text-xl md:text-2xl font-industrial text-gray-400 tracking-wider">
                  $ {product.price}
                </p>
              </div>
              <p className="text-gray-500 font-serif italic leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  Aclaraciones / Notas
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ej: Sin cebolla, papas bien crocantes..."
                  className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-white text-sm focus:outline-none focus:border-white/30 transition-all font-serif italic resize-none h-20 md:h-24"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={() => onAddToCart(product, note)}
                className="w-full py-5 bg-white text-black font-bold text-base md:text-lg uppercase tracking-widest hover:invert transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl"
              >
                Agregar al vagón
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
