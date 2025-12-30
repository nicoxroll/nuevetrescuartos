
import React, { useState, useMemo, useEffect } from 'react';
import { MENU } from './constants';
import { CartItem, Product, Category } from './types';
import Header from './Header';
import Hero from './Hero';
import DeliverySection from './DeliverySection';
import MenuSection from './MenuSection';
import MapSection from './MapSection';
import Footer from './Footer';
import CartSidebar from './CartSidebar';
import ProductModal from './ProductModal';
import FloatingChat from './FloatingChat';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [scrolled, setScrolled] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product, note: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1, note: note || item.note } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, note }];
    });
    setModalProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const updateNote = (productId: string, note: string) => {
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, note } : item
    ));
  };

  const filteredMenu = useMemo(() => 
    selectedCategory === 'all' ? MENU : MENU.filter(item => item.category === selectedCategory),
  [selectedCategory]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 selection:bg-white selection:text-black">
      <Header 
        scrolled={scrolled} 
        cartCount={cartCount} 
        onOpenCart={() => { setIsCartOpen(true); setIsCheckoutFormOpen(false); }} 
      />
      
      <main>
        <Hero />
        <DeliverySection />
        <MenuSection 
          products={filteredMenu} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
          onOpenProduct={setModalProduct} 
          onAddToCartDirectly={addToCart}
        />
        <MapSection />
      </main>

      <Footer />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={cartTotal}
        isCheckoutOpen={isCheckoutFormOpen}
        onSetCheckoutOpen={setIsCheckoutFormOpen}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onUpdateNote={updateNote}
      />

      {modalProduct && (
        <ProductModal 
          product={modalProduct} 
          onClose={() => setModalProduct(null)} 
          onAddToCart={addToCart} 
        />
      )}

      <FloatingChat />
    </div>
  );
};

export default App;
