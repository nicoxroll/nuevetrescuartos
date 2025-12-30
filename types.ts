
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  featured?: boolean;
}

export type Category = 'burgers' | 'sides' | 'drinks' | 'desserts';

export interface CartItem extends Product {
  quantity: number;
  note?: string;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  extraDescription: string;
}

export interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
}
