import { motion, useScroll, useTransform } from "framer-motion";
import Isotope from "isotope-layout";
import { Plus } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Category, Product } from "./types";

interface MenuSectionProps {
  products: Product[];
  selectedCategory: Category | "all";
  onSelectCategory: (category: Category | "all") => void;
  onOpenProduct: (product: Product) => void;
  onAddToCartDirectly: (product: Product, note: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProduct,
  onAddToCartDirectly,
}) => {
  const isotopeRef = useRef<HTMLDivElement>(null);
  const isotopeInstance = useRef<Isotope | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const categories: (Category | "all")[] = [
    "all",
    "burgers",
    "sides",
    "drinks",
    "desserts",
  ];

  useEffect(() => {
    if (isotopeRef.current) {
      isotopeInstance.current = new Isotope(isotopeRef.current, {
        itemSelector: ".menu-item",
        layoutMode: "fitRows",
        filter: selectedCategory === "all" ? "*" : `.${selectedCategory}`,
      });
    }

    return () => {
      if (isotopeInstance.current) {
        isotopeInstance.current.destroy();
      }
    };
  }, [products]);

  useEffect(() => {
    if (isotopeInstance.current) {
      const filterValue =
        selectedCategory === "all" ? "*" : `.${selectedCategory}`;
      isotopeInstance.current.arrange({ filter: filterValue });
    }
  }, [selectedCategory]);

  return (
    <section id="menu" ref={sectionRef} className="relative py-24 bg-[#0c0c0c] overflow-hidden w-full">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-5 grayscale pointer-events-none h-[120%] -top-[10%] w-full"
      >
        <img
          src="https://images.pexels.com/photos/933849/pexels-photo-933849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Station background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-9xl font-pistilli mb-8 text-white uppercase italic tracking-tighter">
            Carta
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-10 py-2 font-industrial text-sm font-bold uppercase tracking-[0.3em] transition-all duration-500 ease-out border-b-2 ${
                  selectedCategory === cat
                    ? "border-white text-white"
                    : "border-transparent text-gray-600 hover:text-white hover:border-white/30"
                }`}
              >
                {cat === "all"
                  ? "Ver Todo"
                  : cat === "burgers"
                  ? "Burgers"
                  : cat === "sides"
                  ? "Sides"
                  : cat === "drinks"
                  ? "Drinks"
                  : "Sweets"}
              </button>
            ))}
          </div>
        </div>

        <div ref={isotopeRef} className="menu-container">
          {products.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${item.category} flex gap-8 group cursor-pointer`}
              onClick={() => onOpenProduct(item)}
            >
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
              <div className="flex-grow flex flex-col py-2 border-b border-white/5">
                <div className="flex justify-between items-baseline mb-4">
                  <h4 className="text-2xl font-pistilli uppercase tracking-tight text-white group-hover:text-gray-300 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-xl font-industrial text-gray-400">
                    $ {item.price}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 font-serif italic line-clamp-2">
                  {item.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCartDirectly(item, "");
                  }}
                  className="self-start px-6 py-2 bg-white/5 hover:bg-white hover:text-black border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-white flex items-center gap-3 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" /> AGREGAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
